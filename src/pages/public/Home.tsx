import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Tag } from 'lucide-react';
import { RoomSearchCard } from '../../components/user/RoomSearchCard';
import { RoomCard } from '../../components/common/RoomCard';
import { GoogleMapEmbed } from '../../components/common/GoogleMapEmbed';
import { Room, SearchFilterState, Review } from '../../types';
import { getRooms, getReviews } from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';
import { RoomCardSkeleton } from '../../components/common/SkeletonLoader';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const roomData = await getRooms();
      const reviewData = await getReviews();
      setRooms(roomData);
      setReviews(reviewData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSearch = (filters: SearchFilterState) => {
    navigate('/rooms', { state: { filters } });
  };

  const featuredRooms = rooms.slice(0, 4);
  const todayAvailableRooms = rooms.filter(r => r.status === 'Available');

  return (
    <div className="pb-section">
      
      {/* ════════════════════════════════════════════════════
          CAMPAIGN HERO — Full-bleed photography with Bebas Neue headline
          ════════════════════════════════════════════════════ */}
      <section className="relative bg-nike-ink overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=80"
            alt="Hotel campaign"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-20 md:py-32 lg:py-36">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[13px] font-medium">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>คะแนนทำเลที่ตั้ง 8.4 · คู่รักชอบเป็นพิเศษ (สำหรับการเข้าพัก 2 คน)</span>
            </div>
            
            <h1 className="text-campaign-sm md:text-campaign-md lg:text-campaign text-white font-display tracking-tight leading-none">
              VICTORY ROOM<br />BANGKOK
            </h1>
            
            <p className="text-[15px] md:text-[17px] font-light text-white/90 max-w-2xl leading-relaxed">
              ให้บริการห้องพักพร้อมเครื่องปรับอากาศและห้องน้ำแบบส่วนตัว ใกล้สยามดิสคัฟเวอรี่ (2.7 กม.), ศูนย์การค้ามาบุญครอง (3 กม.) และสยามพารากอน (3.1 กม.) ฟรี Wi-Fi ปลอดบุหรี่ พร้อมบริการทำความสะอาดรายวัน
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/rooms"
                className="bg-white text-nike-ink text-[14px] font-medium px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                จองห้องพักตอนนี้ <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/about"
                className="bg-transparent border border-white/50 hover:border-white text-white text-[14px] font-medium px-8 py-3.5 rounded-full transition-colors"
              >
                ดูรายละเอียดที่พัก
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SEARCH ROOM CARD — overlapping hero
          ════════════════════════════════════════════════════ */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 -mt-8 relative z-20">
        <RoomSearchCard onSearch={handleSearch} />
      </section>

      {/* ════════════════════════════════════════════════════
          FEATURED ROOMS — 4-up product grid
          ════════════════════════════════════════════════════ */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 pt-section">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6">
          <div>
            <h2 className="text-[24px] md:text-[32px] font-medium text-nike-ink dark:text-white">
              {t('featuredRoomsTitle')}
            </h2>
          </div>
          <Link
            to="/rooms"
            className="mt-3 md:mt-0 text-[14px] font-medium text-nike-ink dark:text-white underline flex items-center gap-1"
          >
            View All ({rooms.length})
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <RoomCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredRooms.map(room => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}
      </section>

      {/* ════════════════════════════════════════════════════
          PROMOTIONS — Clean flat cards with pill badges
          ════════════════════════════════════════════════════ */}
      <section className="bg-nike-soft-cloud dark:bg-nike-dark-elevated py-section mt-section">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="mb-8">
            <h2 className="text-[24px] md:text-[32px] font-medium text-nike-ink dark:text-white">
              {t('promotionsTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="bg-nike-canvas dark:bg-nike-dark-card p-6 space-y-4 relative">
              <div className="absolute top-4 right-4">
                <span className="bg-nike-ink text-white text-[12px] font-medium px-3 py-1 rounded-full">
                  10% OFF
                </span>
              </div>
              <Tag className="w-5 h-5 text-nike-ink dark:text-white" />
              <h3 className="text-[16px] font-medium text-nike-ink dark:text-white">Early Bird Escape</h3>
              <p className="text-[14px] text-nike-mute dark:text-nike-stone leading-relaxed">
                Book 14 days in advance and receive 10% discount on all Deluxe and Executive Suites.
              </p>
              <div className="pt-1 text-[13px] text-nike-ink dark:text-white">
                Code: <span className="bg-nike-soft-cloud dark:bg-nike-dark-elevated px-3 py-1 font-medium">VICTORY10</span>
              </div>
            </div>

            <div className="bg-nike-canvas dark:bg-nike-dark-card p-6 space-y-4 relative">
              <div className="absolute top-4 right-4">
                <span className="bg-nike-ink text-white text-[12px] font-medium px-3 py-1 rounded-full">
                  20% OFF
                </span>
              </div>
              <Tag className="w-5 h-5 text-nike-ink dark:text-white" />
              <h3 className="text-[16px] font-medium text-nike-ink dark:text-white">Luxury Staycation</h3>
              <p className="text-[14px] text-nike-mute dark:text-nike-stone leading-relaxed">
                Stay 3 nights or more in Presidential Penthouse or Pool Villa to unlock 20% discount.
              </p>
              <div className="pt-1 text-[13px] text-nike-ink dark:text-white">
                Code: <span className="bg-nike-soft-cloud dark:bg-nike-dark-elevated px-3 py-1 font-medium">LUXURY20</span>
              </div>
            </div>

            <div className="bg-nike-canvas dark:bg-nike-dark-card p-6 space-y-4 relative">
              <div className="absolute top-4 right-4">
                <span className="bg-nike-success text-white text-[12px] font-medium px-3 py-1 rounded-full">
                  ฿500 OFF
                </span>
              </div>
              <Tag className="w-5 h-5 text-nike-ink dark:text-white" />
              <h3 className="text-[16px] font-medium text-nike-ink dark:text-white">Welcome Gift</h3>
              <p className="text-[14px] text-nike-mute dark:text-nike-stone leading-relaxed">
                New guests receive instant 500 THB deduction upon booking confirmation.
              </p>
              <div className="pt-1 text-[13px] text-nike-ink dark:text-white">
                Code: <span className="bg-nike-soft-cloud dark:bg-nike-dark-elevated px-3 py-1 font-medium">WELCOME500</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          TODAY AVAILABLE ROOMS
          ════════════════════════════════════════════════════ */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 pt-section">
        <div className="pb-6">
          <h2 className="text-[24px] md:text-[32px] font-medium text-nike-ink dark:text-white">
            {t('availableToday')}
          </h2>
          <p className="text-[14px] text-nike-mute dark:text-nike-stone mt-1">
            {todayAvailableRooms.length} rooms available for instant booking
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {todayAvailableRooms.map(room => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          GUEST REVIEWS
          ════════════════════════════════════════════════════ */}
      <section className="bg-nike-soft-cloud dark:bg-nike-dark-elevated py-section mt-section">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="pb-6">
            <h2 className="text-[24px] md:text-[32px] font-medium text-nike-ink dark:text-white">
              {t('customerReviews')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map(rev => (
              <div key={rev.id} className="bg-nike-canvas dark:bg-nike-dark-card p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[15px] text-nike-ink dark:text-white">{rev.user_name}</span>
                  <div className="flex text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-[14px] text-nike-mute dark:text-nike-stone italic leading-relaxed">
                  "{rev.comment}"
                </p>
                <span className="text-[12px] text-nike-stone block">
                  {new Date(rev.created_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          GOOGLE MAP
          ════════════════════════════════════════════════════ */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 pt-section">
        <GoogleMapEmbed />
      </section>

    </div>
  );
};
