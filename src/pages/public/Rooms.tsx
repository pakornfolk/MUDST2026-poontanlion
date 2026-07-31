import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { RoomCard } from '../../components/common/RoomCard';
import { RoomSearchCard } from '../../components/user/RoomSearchCard';
import { RoomCardSkeleton } from '../../components/common/SkeletonLoader';
import { Room, SearchFilterState } from '../../types';
import { getRooms } from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';

export const Rooms: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const [allRooms, setAllRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState<'price-asc' | 'price-desc' | 'capacity'>('price-asc');

  const initialFilters: Partial<SearchFilterState> = location.state?.filters || {};

  useEffect(() => {
    const fetchRooms = async () => {
      const data = await getRooms();
      setAllRooms(data);
      applyFilterLogic(data, initialFilters);
      setLoading(false);
    };
    fetchRooms();
  }, []);

  const applyFilterLogic = (roomsList: Room[], filters: Partial<SearchFilterState>) => {
    let result = [...roomsList];

    if (filters.availableOnly) {
      result = result.filter(r => r.status === 'Available');
    }

    if (filters.roomType && filters.roomType !== 'All') {
      result = result.filter(r => r.room_type === filters.roomType);
    }

    if (filters.guests) {
      result = result.filter(r => r.capacity >= (filters.guests || 1));
    }

    if (filters.maxPrice) {
      result = result.filter(r => r.price <= (filters.maxPrice || 30000));
    }

    // Apply Sorting
    if (sortOption === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'capacity') {
      result.sort((a, b) => b.capacity - a.capacity);
    }

    setFilteredRooms(result);
  };

  const handleSearch = (filters: SearchFilterState) => {
    applyFilterLogic(allRooms, filters);
  };

  const handleSortChange = (option: 'price-asc' | 'price-desc' | 'capacity') => {
    setSortOption(option);
    const sorted = [...filteredRooms];
    if (option === 'price-asc') sorted.sort((a, b) => a.price - b.price);
    if (option === 'price-desc') sorted.sort((a, b) => b.price - a.price);
    if (option === 'capacity') sorted.sort((a, b) => b.capacity - a.capacity);
    setFilteredRooms(sorted);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-10 space-y-8">
      
      {/* PAGE HEADER */}
      <div className="pb-2">
        <h1 className="text-[32px] md:text-[40px] font-medium text-nike-ink dark:text-white">
          {t('rooms')}
        </h1>
        <p className="text-[14px] text-nike-mute dark:text-nike-stone mt-1">Victory Room Hotel Accommodations</p>
      </div>

      {/* FILTER SEARCH */}
      <RoomSearchCard onSearch={handleSearch} initialFilters={initialFilters} />

      {/* RESULTS HEADER & SORTING */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-nike-soft-cloud dark:bg-nike-dark-elevated p-4 text-[14px]">
        <span className="font-medium text-nike-ink dark:text-white">
          {filteredRooms.length} of {allRooms.length} rooms
        </span>
        
        <div className="flex items-center gap-3">
          <span className="text-nike-mute dark:text-nike-stone font-medium">Sort By:</span>
          <select
            value={sortOption}
            onChange={(e) => handleSortChange(e.target.value as any)}
            className="bg-nike-canvas dark:bg-nike-dark-card text-nike-ink dark:text-white font-medium p-2 border border-nike-hairline dark:border-nike-dark-card rounded-full px-4 text-[13px] focus:outline-none"
          >
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="capacity">Guest Capacity</option>
          </select>
        </div>
      </div>

      {/* ROOMS GRID — 3-up */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <RoomCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredRooms.length === 0 ? (
        <div className="bg-nike-canvas dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card p-12 text-center space-y-4">
          <p className="text-[18px] font-medium text-nike-ink dark:text-white">
            No rooms match your criteria
          </p>
          <p className="text-[14px] text-nike-mute dark:text-nike-stone">
            Try adjusting your dates, guest count, or price range.
          </p>
          <button
            onClick={() => applyFilterLogic(allRooms, { availableOnly: false, roomType: 'All', maxPrice: 30000 })}
            className="bg-nike-ink dark:bg-white text-white dark:text-nike-ink text-[14px] font-medium px-6 py-3 rounded-full hover:opacity-80 transition-opacity"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      )}

    </div>
  );
};
