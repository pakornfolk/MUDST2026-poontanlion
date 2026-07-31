import { supabase, isSupabaseConfigured } from './supabase';
import { 
  Room, Booking, User, HotelInfo, Review, AppNotification, ActivityLog, 
  SearchFilterState 
} from '../types';
import { 
  INITIAL_ROOMS, INITIAL_BOOKINGS, INITIAL_USERS, 
  INITIAL_HOTEL_INFO, INITIAL_REVIEWS, INITIAL_NOTIFICATIONS, INITIAL_ACTIVITY_LOGS 
} from './mockData';

// Local Storage Keys
const KEYS = {
  ROOMS: 'vr_rooms_v5',
  BOOKINGS: 'vr_bookings_v5',
  USERS: 'vr_users_v5',
  HOTEL: 'vr_hotel_v5',
  REVIEWS: 'vr_reviews_v5',
  NOTIFS: 'vr_notifs_v5',
  LOGS: 'vr_logs_v5',
  WISHLIST: 'vr_wishlist_v5',
};

// Storage Initializer
function getItem<T>(key: string, initial: T): T {
  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(initial));
    return initial;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return initial;
  }
}

function setItem<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}

// ----------------------------------------------------
// ROOMS API
// ----------------------------------------------------
export const getRooms = async (): Promise<Room[]> => {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('rooms')
        .select('*, room_images(image_url, is_cover)')
        .order('room_number', { ascending: true });
      if (!error && data) {
        return data.map((r: any) => ({
          ...r,
          cover_image: r.room_images?.find((img: any) => img.is_cover)?.image_url || r.room_images?.[0]?.image_url || r.cover_image,
          gallery: r.room_images?.map((img: any) => img.image_url) || r.gallery || []
        }));
      }
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to mock');
    }
  }
  return getItem<Room[]>(KEYS.ROOMS, INITIAL_ROOMS);
};

export const getRoomById = async (id: string): Promise<Room | null> => {
  const rooms = await getRooms();
  return rooms.find(r => r.id === id) || null;
};

export const saveRoom = async (roomData: Partial<Room>): Promise<Room> => {
  const rooms = await getRooms();
  let updatedRoom: Room;

  if (roomData.id) {
    const idx = rooms.findIndex(r => r.id === roomData.id);
    if (idx !== -1) {
      rooms[idx] = { ...rooms[idx], ...roomData };
      updatedRoom = rooms[idx];
    } else {
      updatedRoom = { ...INITIAL_ROOMS[0], ...roomData, id: roomData.id } as Room;
      rooms.push(updatedRoom);
    }
  } else {
    updatedRoom = {
      id: 'rm-' + Date.now(),
      room_number: roomData.room_number || '999',
      room_name: roomData.room_name || 'New Luxury Suite',
      room_type: roomData.room_type || 'Deluxe',
      description: roomData.description || '',
      capacity: roomData.capacity || 2,
      price: roomData.price || 5000,
      status: roomData.status || 'Available',
      amenities: roomData.amenities || ['Wi-Fi', 'TV', 'Air Conditioner'],
      size_sqm: roomData.size_sqm || 50,
      bed_type: roomData.bed_type || 'King Bed',
      cover_image: roomData.cover_image || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      gallery: roomData.gallery || ['https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'],
    };
    rooms.push(updatedRoom);
  }

  setItem(KEYS.ROOMS, rooms);
  return updatedRoom;
};

export const deleteRoom = async (id: string): Promise<void> => {
  const rooms = await getRooms();
  const filtered = rooms.filter(r => r.id !== id);
  setItem(KEYS.ROOMS, filtered);
};

// ----------------------------------------------------
// BOOKINGS API
// ----------------------------------------------------
export const getBookings = async (): Promise<Booking[]> => {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*, rooms(*)')
        .order('created_at', { ascending: false });
      if (!error && data) {
        return data.map((booking: any) => ({
          ...booking,
          room: booking.room || booking.rooms,
        }));
      }
    } catch (e) {
      console.warn('Supabase fetch bookings failed');
    }
  }
  return getItem<Booking[]>(KEYS.BOOKINGS, INITIAL_BOOKINGS);
};

export const createBooking = async (bookingData: Omit<Booking, 'id' | 'booking_no' | 'created_at' | 'status'>): Promise<Booking> => {
  const bookings = await getBookings();
  const rooms = await getRooms();
  const targetRoom = rooms.find(r => r.id === bookingData.room_id);

  const newBooking: Booking = {
    ...bookingData,
    id: 'bk-' + Date.now(),
    booking_no: `VR-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`,
    room: targetRoom,
    status: 'Pending',
    created_at: new Date().toISOString(),
  };

  bookings.unshift(newBooking);
  setItem(KEYS.BOOKINGS, bookings);

  // Add Notification for Admin
  addNotification({
    title: '🔔 New Booking Request',
    message: `${newBooking.guest_name} booked ${targetRoom?.room_name || 'a room'} (${newBooking.booking_no})`,
    type: 'info',
  });

  // Log Activity
  logActivity('New Booking Created', `Booking ${newBooking.booking_no} submitted by ${newBooking.guest_name}`);

  return newBooking;
};

export const updateBookingStatus = async (bookingId: string, status: Booking['status'], reason?: string): Promise<Booking | null> => {
  const bookings = await getBookings();
  const rooms = await getRooms();
  const bIndex = bookings.findIndex(b => b.id === bookingId);
  if (bIndex === -1) return null;

  bookings[bIndex].status = status;
  const booking = bookings[bIndex];

  // Business Logic Room Status Updates:
  // Paid -> Room becomes Reserved
  // Cancelled or Rejected -> Room becomes Available
  // Completed -> Room becomes Available
  const roomIndex = rooms.findIndex(r => r.id === booking.room_id);
  if (roomIndex !== -1) {
    if (status === 'Paid') {
      rooms[roomIndex].status = 'Reserved';
    } else if (status === 'Cancelled' || status === 'Rejected') {
      rooms[roomIndex].status = 'Available';
    }
    setItem(KEYS.ROOMS, rooms);
  }

  setItem(KEYS.BOOKINGS, bookings);

  addNotification({
    user_id: booking.user_id,
    title: `Booking Update: ${status}`,
    message: `Your booking ${booking.booking_no} for ${booking.room?.room_name || 'suite'} status changed to: ${status}`,
    type: status === 'Paid' ? 'success' : status === 'Cancelled' || status === 'Rejected' ? 'error' : 'info',
  });

  logActivity('Booking Status Changed', `Booking ${booking.booking_no} set to ${status}`);

  return booking;
};

export const uploadPaymentSlip = async (bookingId: string, slipImageUrl: string): Promise<Booking | null> => {
  const bookings = await getBookings();
  const bIndex = bookings.findIndex(b => b.id === bookingId);
  if (bIndex === -1) return null;

  bookings[bIndex].slip_image = slipImageUrl;
  bookings[bIndex].status = 'Waiting Verification';
  const booking = bookings[bIndex];

  setItem(KEYS.BOOKINGS, bookings);

  addNotification({
    title: '💳 Payment Slip Uploaded',
    message: `${booking.guest_name} uploaded payment slip for booking ${booking.booking_no}`,
    type: 'warning',
  });

  logActivity('Payment Slip Uploaded', `Slip submitted for booking ${booking.booking_no}`);

  return booking;
};

// ----------------------------------------------------
// USERS API
// ----------------------------------------------------
export const getUsers = async (): Promise<User[]> => {
  return getItem<User[]>(KEYS.USERS, INITIAL_USERS);
};

export const updateUserProfile = async (userId: string, data: Partial<User>): Promise<User | null> => {
  const users = await getUsers();
  const index = users.findIndex(u => u.id === userId);
  if (index === -1) return null;

  users[index] = { ...users[index], ...data };
  setItem(KEYS.USERS, users);
  return users[index];
};

export const createUser = async (data: Omit<User, 'id' | 'created_at'>): Promise<User> => {
  const users = await getUsers();
  const newUser: User = {
    ...data,
    id: 'usr-' + Date.now(),
    avatar: data.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
    created_at: new Date().toISOString(),
  };
  users.unshift(newUser);
  setItem(KEYS.USERS, users);
  logActivity('User Account Created', `Admin created new ${newUser.role} user: ${newUser.email}`);
  return newUser;
};

export const deleteUser = async (userId: string): Promise<void> => {
  const users = await getUsers();
  const filtered = users.filter(u => u.id !== userId);
  setItem(KEYS.USERS, filtered);
  logActivity('User Account Deleted', `Admin deleted user ID ${userId}`);
};

// ----------------------------------------------------
// HOTEL INFO API
// ----------------------------------------------------
export const getHotelInfo = async (): Promise<HotelInfo> => {
  return getItem<HotelInfo>(KEYS.HOTEL, INITIAL_HOTEL_INFO);
};

export const updateHotelInfo = async (data: Partial<HotelInfo>): Promise<HotelInfo> => {
  const current = await getHotelInfo();
  const updated = { ...current, ...data };
  setItem(KEYS.HOTEL, updated);
  logActivity('Hotel Info Updated', 'Admin updated hotel contact details and policies');
  return updated;
};

// ----------------------------------------------------
// REVIEWS API
// ----------------------------------------------------
export const getReviews = async (roomId?: string): Promise<Review[]> => {
  const reviews = getItem<Review[]>(KEYS.REVIEWS, INITIAL_REVIEWS);
  if (roomId) return reviews.filter(r => r.room_id === roomId);
  return reviews;
};

export const addReview = async (review: Omit<Review, 'id' | 'created_at'>): Promise<Review> => {
  const reviews = await getReviews();
  const newRev: Review = {
    ...review,
    id: 'rev-' + Date.now(),
    created_at: new Date().toISOString(),
  };
  reviews.unshift(newRev);
  setItem(KEYS.REVIEWS, reviews);
  return newRev;
};

// ----------------------------------------------------
// NOTIFICATIONS API
// ----------------------------------------------------
export const getNotifications = async (): Promise<AppNotification[]> => {
  return getItem<AppNotification[]>(KEYS.NOTIFS, INITIAL_NOTIFICATIONS);
};

export const addNotification = (notif: Omit<AppNotification, 'id' | 'is_read' | 'created_at'>): AppNotification => {
  const notifs = getItem<AppNotification[]>(KEYS.NOTIFS, INITIAL_NOTIFICATIONS);
  const newNotif: AppNotification = {
    ...notif,
    id: 'notif-' + Date.now(),
    is_read: false,
    created_at: new Date().toISOString(),
  };
  notifs.unshift(newNotif);
  setItem(KEYS.NOTIFS, notifs);
  return newNotif;
};

export const markNotificationsRead = async (): Promise<void> => {
  const notifs = await getNotifications();
  const updated = notifs.map(n => ({ ...n, is_read: true }));
  setItem(KEYS.NOTIFS, updated);
};

// ----------------------------------------------------
// ACTIVITY LOGS API
// ----------------------------------------------------
export const getActivityLogs = async (): Promise<ActivityLog[]> => {
  return getItem<ActivityLog[]>(KEYS.LOGS, INITIAL_ACTIVITY_LOGS);
};

export const logActivity = (action: string, details: string, userName = 'Admin'): void => {
  const logs = getItem<ActivityLog[]>(KEYS.LOGS, INITIAL_ACTIVITY_LOGS);
  logs.unshift({
    id: 'act-' + Date.now(),
    user_name: userName,
    action,
    details,
    created_at: new Date().toISOString(),
  });
  setItem(KEYS.LOGS, logs.slice(0, 50)); // Keep latest 50 logs
};

// ----------------------------------------------------
// WISHLIST API
// ----------------------------------------------------
export const getWishlist = (): string[] => {
  return getItem<string[]>(KEYS.WISHLIST, ['rm-101']);
};

export const toggleWishlist = (roomId: string): string[] => {
  const list = getWishlist();
  const exists = list.includes(roomId);
  const updated = exists ? list.filter(id => id !== roomId) : [...list, roomId];
  setItem(KEYS.WISHLIST, updated);
  return updated;
};
