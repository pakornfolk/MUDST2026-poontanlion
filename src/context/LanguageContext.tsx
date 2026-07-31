import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'th';

const translations = {
  en: {
    // Nav
    home: 'Home',
    rooms: 'Rooms & Suites',
    about: 'About Us',
    contact: 'Contact',
    faq: 'FAQ',
    myBookings: 'My Bookings',
    wishlist: 'Wishlist',
    dashboard: 'Dashboard',
    adminPanel: 'Admin Panel',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    profile: 'Profile',
    // Hero & Home
    heroTitle: 'THE PINNACLE OF URBAN ELEGANCE',
    heroSub: 'Immerse yourself in world-class architecture, refined comfort, and tailored hospitality at Victory Room.',
    searchRooms: 'Search Available Suites',
    checkIn: 'Check-in Date',
    checkOut: 'Check-out Date',
    guests: 'Guests',
    roomType: 'Room Category',
    priceRange: 'Max Price per Night',
    searchNow: 'SEARCH ROOMS',
    featuredRoomsTitle: 'FEATURED ACCOMMODATIONS',
    featuredRoomsSub: 'Handcrafted luxury spaces engineered for rest and indulgence',
    promotionsTitle: 'EXCLUSIVITIES & PROMOTIONS',
    availableToday: 'AVAILABLE TODAY',
    customerReviews: 'GUEST EXPERIENCES',
    locationTitle: 'OUR LOCATION',
    // Room Specs & Badges
    night: 'night',
    nights: 'nights',
    perNight: '/ night',
    capacity: 'Capacity',
    size: 'Size',
    bed: 'Bed',
    bookNow: 'BOOK NOW',
    viewDetail: 'VIEW DETAILS',
    available: 'Available',
    reserved: 'Reserved',
    full: 'Full',
    occupied: 'Occupied',
    // Buttons
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save Changes',
    submit: 'Submit',
    apply: 'Apply',
  },
  th: {
    // Nav
    home: 'หน้าแรก',
    rooms: 'ห้องพักและซูท',
    about: 'เกี่ยวกับเรา',
    contact: 'ติดต่อเรา',
    faq: 'คำถามที่พบบ่อย',
    myBookings: 'การจองของฉัน',
    wishlist: 'รายการโปรด',
    dashboard: 'แดชบอร์ด',
    adminPanel: 'ผู้ดูแลระบบ',
    login: 'เข้าสู่ระบบ',
    register: 'สมัครสมาชิก',
    logout: 'ออกจากระบบ',
    profile: 'โปรไฟล์',
    // Hero & Home
    heroTitle: 'ที่สุดแห่งความหรูหราเหนือระดับใจกลางเมือง',
    heroSub: 'สัมผัสประสบการณ์การพักผ่อนระดับเวิลด์คลาส ดีไซน์ทันสมัย และการบริการที่เป็นเลิศที่ Victory Room',
    searchRooms: 'ค้นหาห้องพักว่าง',
    checkIn: 'วันเช็คอิน',
    checkOut: 'วันเช็คเอาท์',
    guests: 'จำนวนผู้เข้าพัก',
    roomType: 'ประเภทห้องพัก',
    priceRange: 'ราคาสูงสุด/คืน',
    searchNow: 'ค้นหาห้องพัก',
    featuredRoomsTitle: 'ห้องพักแนะนำพิเศษ',
    featuredRoomsSub: 'ออกแบบอย่างพิถีพิถันเพื่อการพักผ่อนอย่างเหนือระดับ',
    promotionsTitle: 'โปรโมชั่นพิเศษ',
    availableToday: 'ห้องว่างพร้อมเข้าพักวันนี้',
    customerReviews: 'ความประทับใจจากผู้เข้าพัก',
    locationTitle: 'ทำเลที่ตั้งโรงแรม',
    // Room Specs & Badges
    night: 'คืน',
    nights: 'คืน',
    perNight: '/ คืน',
    capacity: 'รองรับ',
    size: 'ขนาด',
    bed: 'เตียง',
    bookNow: 'จองห้องพักนี้',
    viewDetail: 'ดูรายละเอียด',
    available: 'ว่าง',
    reserved: 'จองแล้ว',
    full: 'เต็ม',
    occupied: 'มีผู้เข้าพัก',
    // Buttons
    cancel: 'ยกเลิก',
    confirm: 'ยืนยัน',
    save: 'บันทึกการเปลี่ยนแปลง',
    submit: 'ส่งข้อมูล',
    apply: 'ใช้งาน',
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['en']) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('vr_lang') as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('vr_lang', lang);
  };

  const t = (key: keyof typeof translations['en']): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
