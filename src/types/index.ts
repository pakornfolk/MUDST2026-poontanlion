export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  fullname: string;
  email: string;
  password?: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  created_at?: string;
}

export type RoomType = 'Deluxe' | 'Executive Suite' | 'Presidential Suite' | 'Family Suite' | 'Villa';
export type RoomStatus = 'Available' | 'Reserved' | 'Full' | 'Occupied' | 'Maintenance';

export interface RoomImage {
  id: string;
  room_id: string;
  image_url: string;
  is_cover: boolean;
  display_order?: number;
}

export interface Room {
  id: string;
  room_number: string;
  room_name: string;
  room_type: RoomType;
  description: string;
  capacity: number;
  price: number;
  status: RoomStatus;
  amenities: string[];
  size_sqm: number;
  bed_type: string;
  cover_image?: string;
  gallery?: string[];
  created_at?: string;
}

export type BookingStatus = 'Pending' | 'Waiting Verification' | 'Paid' | 'Completed' | 'Cancelled' | 'Rejected';

export interface Booking {
  id: string;
  booking_no: string;
  user_id: string;
  room_id: string;
  room?: Room;
  check_in: string;
  check_out: string;
  guest_count: number;
  total_price: number;
  discount_amount?: number;
  promo_code?: string;
  guest_name: string;
  guest_phone: string;
  guest_email: string;
  special_requests?: string;
  status: BookingStatus;
  created_at: string;
  slip_image?: string;
}

export type PaymentStatus = 'Pending' | 'Approved' | 'Rejected';

export interface Payment {
  id: string;
  booking_id: string;
  slip_image: string;
  payment_date: string;
  payment_status: PaymentStatus;
  created_at?: string;
}

export interface AppNotification {
  id: string;
  user_id?: string;
  title: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  is_read: boolean;
  created_at: string;
}

export interface HotelInfo {
  id: string;
  hotel_name: string;
  address: string;
  phone: string;
  email: string;
  google_map_embed: string;
  google_map_link: string;
  check_in_time: string;
  check_out_time: string;
  parking: string;
  policies: string;
  rating?: string;
  description?: string;
}

export interface Review {
  id: string;
  room_id: string;
  user_id: string;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  user_id?: string;
  user_name?: string;
  action: string;
  details: string;
  created_at: string;
}

export interface SearchFilterState {
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: string;
  minPrice: number;
  maxPrice: number;
  availableOnly: boolean;
}
