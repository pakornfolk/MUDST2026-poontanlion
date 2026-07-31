import { Room, HotelInfo, User, Booking, AppNotification, Review, ActivityLog } from '../types';

export const INITIAL_HOTEL_INFO: HotelInfo = {
  id: 'hotel-01',
  hotel_name: 'Victory Room Hotel',
  address: '422 Phaya Thai Rd, Ratchathewi, Bangkok 10400, Thailand',
  phone: '+66 2 123 4567',
  email: 'booking@victoryroom.com',
  google_map_embed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242.19999351021974!2d100.53845303753965!3d13.766815673124919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29fc9a50a3117%3A0xa9ce6fd4e2755f19!2sVictory%20Room!5e0!3m2!1sth!2sth!4v1785481678759!5m2!1sth!2sth" width="100%" height="450" style="border:0;border-radius:16px;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>',
  google_map_link: 'https://maps.google.com/?q=Victory+Room+Bangkok',
  check_in_time: '14:00',
  check_out_time: '12:00',
  parking: 'บริการอินเทอร์เน็ตไร้สาย (Wi-Fi) ฟรี · ห้องปลอดบุหรี่ · บริการทำความสะอาดรายวัน',
  policies: 'ที่พักนี้ปลอดบุหรี่ทั่วบริเวณ กรุณาแสดงบัตรประชาชนหรือพาสปอร์ตขณะเช็คอิน เช็คอินได้ตั้งแต่ 14:00 น. เช็คเอาท์ก่อน 12:00 น.',
  rating: '8.4 / 10 (คู่รักชอบทำเลที่ตั้งนี้เป็นพิเศษ สำหรับการเข้าพัก 2 คน)',
  description: 'Victory Room ให้บริการห้องพักพร้อมเครื่องปรับอากาศและห้องน้ำแบบส่วนตัว โดยตั้งอยู่ในกรุงเทพมหานคร ห่างจากสยามดิสคัฟเวอรี่ ไม่เกิน 2.7 กม. และห่างจากศูนย์การค้ามาบุญครอง ไม่เกิน 3 กม. โฮสเทลพร้อมอินเทอร์เน็ตไร้สาย (WiFi) ฟรีนี้ตั้งอยู่ห่างจากพิพิธภัณฑ์บ้านไทย จิม ทอมป์สัน ประมาณ 3.3 กม. นอกจากนี้ยังอยู่ห่างจากเกษรพลาซ่า 3.3 กม. ที่พักนี้ปลอดบุหรี่และมีทำเลที่ตั้งอยู่ห่างจากสยามพารากอน 3.1 กม. ที่ Victory Room ห้องพักทั้งหมดประกอบด้วยโต๊ะ โทรทัศน์จอแบน และห้องน้ำแบบส่วนตัว เซ็นทรัลเวิลด์พลาซ่า อยู่ห่างจากที่พักนี้ 3.5 กม. ส่วนซีไลฟ์ แบงคอก โอเชียน เวิลด์ อยู่ห่างออกไป 3.8 กม. สนามบินนานาชาติดอนเมือง อยู่ห่างจากที่พัก 22 กม.'
};

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-admin-01',
    fullname: 'Victory Admin',
    email: 'admin@victoryroom.com',
    password: 'admin',
    phone: '081-999-8888',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    role: 'admin',
    created_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'usr-customer-01',
    fullname: 'John Doe',
    email: 'john.doe@example.com',
    password: 'user123password',
    phone: '081-234-5678',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    role: 'user',
    created_at: '2026-02-15T00:00:00Z',
  },
  {
    id: 'usr-customer-02',
    fullname: 'Jane Smith',
    email: 'jane.smith@example.com',
    password: 'user123password',
    phone: '089-876-5432',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    role: 'user',
    created_at: '2026-03-10T00:00:00Z',
  }
];

export const INITIAL_ROOMS: Room[] = [
  {
    id: 'rm-101',
    room_number: '101',
    room_name: 'ห้องเตียงใหญ่ (Standard Double Room)',
    room_type: 'Deluxe',
    description: 'ห้องเตียงใหญ่ 1 เตียงใหญ่ พร้อมเครื่องปรับอากาศ, ห้องน้ำส่วนตัว, โทรทัศน์จอแบน, ฟรีอินเทอร์เน็ตไร้สาย (WiFi), ฝักบัว, ห้องสุขา, โต๊ะทำงาน, กระดาษชำระ และของใช้ในห้องน้ำ ราคารวมภาษีและค่าธรรมเนียมแล้ว ยกเลิกฟรี',
    capacity: 2,
    price: 940,
    status: 'Available',
    amenities: ['Wi-Fi', 'Air Conditioner', 'Private Bathroom', 'TV', 'Desk', 'Shower', 'Toiletries', 'Free Cancellation'],
    size_sqm: 24,
    bed_type: '1 เตียงใหญ่ (1 Double Bed)',
    cover_image: '/rooms/room_bed.png',
    gallery: [
      '/rooms/room_bed.png',
      '/rooms/room_tv_desk.png',
      '/rooms/room_bathroom.png',
      '/rooms/room_view.png',
    ]
  },
  {
    id: 'rm-102',
    room_number: '102',
    room_name: 'ห้องเตียงใหญ่พร้อมระเบียง (Deluxe Double with Balcony)',
    room_type: 'Deluxe',
    description: 'ห้องเตียงใหญ่พร้อมระเบียงส่วนตัว 1 เตียงใหญ่ เครื่องปรับอากาศ ห้องน้ำส่วนตัว โต๊ะทำงาน โทรทัศน์จอแบน ตู้เย็น และบริการ Wi-Fi ฟรี ราคารวมภาษีแล้ว ยกเลิกฟรี',
    capacity: 2,
    price: 1050,
    status: 'Available',
    amenities: ['Wi-Fi', 'Air Conditioner', 'Private Bathroom', 'TV', 'Desk', 'Refrigerator', 'Balcony', 'Free Cancellation'],
    size_sqm: 28,
    bed_type: '1 เตียงใหญ่ (1 Double Bed)',
    cover_image: '/rooms/room_balcony.png',
    gallery: [
      '/rooms/room_balcony.png',
      '/rooms/room_bed.png',
      '/rooms/room_tv_desk.png',
      '/rooms/room_bathroom.png',
    ]
  },
  {
    id: 'rm-201',
    room_number: '201',
    room_name: 'ห้องเตียงเดี่ยวคู่ (Superior Twin Room)',
    room_type: 'Executive Suite',
    description: 'ห้องพัก 2 เตียงเดี่ยว พร้อมเครื่องปรับอากาศ ห้องน้ำส่วนตัว โต๊ะทำงาน โทรทัศน์จอแบน ฟรี Wi-Fi ปลอดบุหรี่',
    capacity: 2,
    price: 1120,
    status: 'Available',
    amenities: ['Wi-Fi', 'Air Conditioner', 'Private Bathroom', 'TV', 'Desk', 'Shower', 'Toiletries', 'Free Cancellation'],
    size_sqm: 30,
    bed_type: '2 เตียงเดี่ยว (2 Single Beds)',
    cover_image: '/rooms/room_view.png',
    gallery: [
      '/rooms/room_view.png',
      '/rooms/room_tv_desk.png',
      '/rooms/room_bathroom.png',
    ]
  },
  {
    id: 'rm-202',
    room_number: '202',
    room_name: 'ห้องพักสำหรับครอบครัว (Family Suite)',
    room_type: 'Family Suite',
    description: 'ห้องพักครอบครัวขนาดใหญ่ สำหรับ 4 ท่าน เตียงคู่ 2 เตียงใหญ่ พร้อมเครื่องปรับอากาศ ห้องน้ำส่วนตัว สมาร์ททีวี และตู้เย็น',
    capacity: 4,
    price: 1650,
    status: 'Reserved',
    amenities: ['Wi-Fi', 'Air Conditioner', 'Private Bathroom', 'TV', 'Desk', 'Refrigerator', 'Free Cancellation'],
    size_sqm: 45,
    bed_type: '2 เตียงใหญ่ (2 Double Beds)',
    cover_image: '/rooms/room_tv_desk.png',
    gallery: [
      '/rooms/room_tv_desk.png',
      '/rooms/room_bed.png',
      '/rooms/room_balcony.png',
      '/rooms/room_bathroom.png',
    ]
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk-1001',
    booking_no: 'VR-202608-1001',
    user_id: 'usr-customer-01',
    room_id: 'rm-101',
    room: INITIAL_ROOMS[0],
    check_in: '2026-08-25',
    check_out: '2026-08-28',
    guest_count: 2,
    total_price: 2820,
    discount_amount: 282,
    promo_code: 'VICTORY10',
    guest_name: 'John Doe',
    guest_phone: '081-234-5678',
    guest_email: 'john.doe@example.com',
    special_requests: 'ขอห้องพักชั้นบน บรรยากาศเงียบสงบ เช็คอินประมาณ 15:00 น.',
    status: 'Paid',
    created_at: '2026-07-30T14:35:00Z',
    slip_image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'bk-1002',
    booking_no: 'VR-202608-1002',
    user_id: 'usr-customer-02',
    room_id: 'rm-202',
    room: INITIAL_ROOMS[3],
    check_in: '2026-09-01',
    check_out: '2026-09-03',
    guest_count: 4,
    total_price: 3300,
    discount_amount: 0,
    guest_name: 'Jane Smith',
    guest_phone: '089-876-5432',
    guest_email: 'jane.smith@example.com',
    special_requests: 'การเข้าพักสำหรับครอบครัว ขอหมอนและผ้าเช็ดตัวเพิ่มเติม',
    status: 'Waiting Verification',
    created_at: '2026-07-31T09:15:00Z',
    slip_image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    room_id: 'rm-101',
    user_id: 'usr-customer-01',
    user_name: 'John & Companion',
    rating: 5,
    comment: 'ราคา THB 940 รวมภาษีคุ้มค่ามากๆ ทำเลดีเยี่ยม ให้คะแนน 8.4 เดินทางไปสยาม สยามพารากอน สะดวกมาก ห้องน้ำส่วนตัวและแอร์เย็นดีมาก',
    created_at: '2026-07-15T10:20:00Z'
  },
  {
    id: 'rev-02',
    room_id: 'rm-102',
    user_id: 'usr-customer-02',
    user_name: 'Jane S.',
    rating: 5,
    comment: 'ยกเลิกฟรี สะดวกสบายมาก ไม่ต้องกังวลเรื่องการเดินทาง มี Wi-Fi ฟรี รวดเร็ว มีบริการทำความสะอาดรายวัน',
    created_at: '2026-07-18T14:45:00Z'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-01',
    title: '🔔 New Booking Received',
    message: 'John Doe booked ห้องเตียงใหญ่ (Standard Double Room) (VR-202608-1001)',
    type: 'info',
    is_read: false,
    created_at: '2026-07-30T14:35:00Z'
  },
  {
    id: 'notif-02',
    title: '💳 Payment Slip Uploaded',
    message: 'Jane Smith uploaded payment slip for booking VR-202608-1002',
    type: 'warning',
    is_read: false,
    created_at: '2026-07-31T09:15:00Z'
  }
];

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'act-01',
    user_name: 'Victory Admin',
    action: 'Room Rates Updated',
    details: 'Updated room rate for ห้องเตียงใหญ่ to THB 940 (Net inclusive of taxes and fees) with Free Cancellation option',
    created_at: '2026-07-31T15:50:00Z'
  }
];
