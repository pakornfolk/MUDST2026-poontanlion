import React, { useState } from 'react';
import { Search, Calendar, Users, Filter } from 'lucide-react';
import { SearchFilterState } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { formatCurrency } from '../../utils/formatters';

interface RoomSearchCardProps {
  onSearch: (filters: SearchFilterState) => void;
  initialFilters?: Partial<SearchFilterState>;
}

export const RoomSearchCard: React.FC<RoomSearchCardProps> = ({ onSearch, initialFilters }) => {
  const { t } = useLanguage();

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(initialFilters?.checkIn || today);
  const [checkOut, setCheckOut] = useState(initialFilters?.checkOut || tomorrow);
  const [guests, setGuests] = useState(initialFilters?.guests || 2);
  const [roomType, setRoomType] = useState(initialFilters?.roomType || 'All');
  const [maxPrice, setMaxPrice] = useState(initialFilters?.maxPrice || 25000);
  const [availableOnly, setAvailableOnly] = useState(initialFilters?.availableOnly ?? true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      checkIn,
      checkOut,
      guests,
      roomType,
      minPrice: 0,
      maxPrice,
      availableOnly,
    });
  };

  return (
    <div className="bg-nike-canvas dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card p-6 md:p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="flex items-center justify-between border-b border-nike-hairline-soft dark:border-nike-dark-card pb-3">
          <span className="text-[14px] font-medium text-nike-ink dark:text-white flex items-center gap-2">
            <Filter className="w-4 h-4" /> {t('searchRooms')}
          </span>
          <label className="flex items-center gap-2 text-[13px] text-nike-mute dark:text-nike-stone cursor-pointer">
            <input
              type="checkbox"
              checked={availableOnly}
              onChange={(e) => setAvailableOnly(e.target.checked)}
              className="accent-nike-ink w-4 h-4 rounded"
            />
            <span>Available only</span>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* CHECK IN */}
          <div>
            <label className="block text-[12px] font-medium text-nike-mute dark:text-nike-stone mb-1.5 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {t('checkIn')}
            </label>
            <input
              type="date"
              min={today}
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-nike-soft-cloud dark:bg-nike-dark-card text-nike-ink dark:text-white text-[14px] p-3 rounded-[24px] border-0 focus:outline-none focus:ring-2 focus:ring-nike-ink"
            />
          </div>

          {/* CHECK OUT */}
          <div>
            <label className="block text-[12px] font-medium text-nike-mute dark:text-nike-stone mb-1.5 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {t('checkOut')}
            </label>
            <input
              type="date"
              min={checkIn || today}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-nike-soft-cloud dark:bg-nike-dark-card text-nike-ink dark:text-white text-[14px] p-3 rounded-[24px] border-0 focus:outline-none focus:ring-2 focus:ring-nike-ink"
            />
          </div>

          {/* GUESTS */}
          <div>
            <label className="block text-[12px] font-medium text-nike-mute dark:text-nike-stone mb-1.5 flex items-center gap-1">
              <Users className="w-3.5 h-3.5" /> {t('guests')}
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full bg-nike-soft-cloud dark:bg-nike-dark-card text-nike-ink dark:text-white text-[14px] p-3 rounded-[24px] border-0 focus:outline-none focus:ring-2 focus:ring-nike-ink appearance-none cursor-pointer"
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
          </div>

          {/* ROOM TYPE */}
          <div>
            <label className="block text-[12px] font-medium text-nike-mute dark:text-nike-stone mb-1.5">
              {t('roomType')}
            </label>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full bg-nike-soft-cloud dark:bg-nike-dark-card text-nike-ink dark:text-white text-[14px] p-3 rounded-[24px] border-0 focus:outline-none focus:ring-2 focus:ring-nike-ink appearance-none cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="Deluxe">Deluxe Suite</option>
              <option value="Executive Suite">Executive Suite</option>
              <option value="Presidential Suite">Presidential Penthouse</option>
              <option value="Family Suite">Family Suite</option>
              <option value="Villa">Pool Villa</option>
            </select>
          </div>

          {/* SEARCH BUTTON — primary pill CTA */}
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-nike-ink dark:bg-white text-white dark:text-nike-ink text-[14px] font-medium py-3 rounded-full flex items-center justify-center gap-2 hover:opacity-80 transition-opacity active:tap-collapse"
            >
              <Search className="w-4 h-4" /> {t('searchNow')}
            </button>
          </div>

        </div>

        {/* PRICE RANGE SLIDER */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px]">
          <div className="w-full sm:w-1/2 flex items-center gap-3">
            <span className="text-[13px] font-medium text-nike-mute dark:text-nike-stone whitespace-nowrap">
              Max Price: {formatCurrency(maxPrice)}
            </span>
            <input
              type="range"
              min="2000"
              max="30000"
              step="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-nike-ink cursor-pointer"
            />
          </div>

          <div className="text-[12px] text-nike-mute dark:text-nike-stone">
            Instant Confirmation & Free Cancellation up to 24 Hours
          </div>
        </div>

      </form>
    </div>
  );
};
