import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Maximize2, Bed, Heart, ArrowRight } from 'lucide-react';
import { Room } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { getWishlist, toggleWishlist } from '../../services/api';
import { toast } from 'sonner';

interface RoomCardProps {
  room: Room;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const [isWishlisted, setIsWishlisted] = useState<boolean>(() => {
    return getWishlist().includes(room.id);
  });

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = toggleWishlist(room.id);
    const inList = updated.includes(room.id);
    setIsWishlisted(inList);
    if (inList) {
      toast.success(`Saved "${room.room_name}" to Wishlist`);
    } else {
      toast.info(`Removed "${room.room_name}" from Wishlist`);
    }
  };

  const getStatusBadge = (status: Room['status']) => {
    switch (status) {
      case 'Available':
        return (
          <span className="text-[12px] font-medium text-nike-success">
            Available
          </span>
        );
      case 'Reserved':
        return (
          <span className="text-[12px] font-medium text-amber-600 dark:text-amber-400">
            Reserved
          </span>
        );
      case 'Full':
      case 'Occupied':
        return (
          <span className="text-[12px] font-medium text-nike-sale">
            Fully Booked
          </span>
        );
      default:
        return (
          <span className="text-[12px] font-medium text-nike-mute">
            {status}
          </span>
        );
    }
  };

  return (
    <Link to={`/rooms/${room.id}`} className="group flex flex-col h-full">
      
      {/* PRODUCT IMAGE — full-bleed on soft-cloud, no radius, no shadow */}
      <div className="relative overflow-hidden aspect-[1/1] bg-nike-soft-cloud dark:bg-nike-dark-elevated">
        <img
          src={room.cover_image || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'}
          alt={room.room_name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* PROMO BADGE — top-left pill */}
        {room.status === 'Available' && (
          <div className="absolute top-3 left-3 bg-nike-canvas/95 backdrop-blur-sm text-nike-ink text-[11px] font-medium px-3 py-1 rounded-full border border-nike-hairline-soft">
            Just In
          </div>
        )}

        {/* WISHLIST — circular icon button */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-nike-canvas/90 backdrop-blur-sm text-nike-ink hover:text-nike-sale transition-colors"
          title="Toggle Wishlist"
        >
          <Heart className={`w-[18px] h-[18px] ${isWishlisted ? 'fill-nike-sale text-nike-sale' : ''}`} />
        </button>
      </div>

      {/* PRODUCT METADATA — no padding, tight 8px gaps */}
      <div className="pt-3 flex-1 flex flex-col justify-between space-y-2">
        
        {/* STATUS */}
        <div className="flex items-center justify-between">
          {getStatusBadge(room.status)}
          <span className="text-[11px] font-medium text-nike-stone">
            Room {room.room_number}
          </span>
        </div>

        {/* PRODUCT NAME — body-strong ink */}
        <h3 className="text-[15px] font-medium text-nike-ink dark:text-white leading-snug line-clamp-1">
          {room.room_name}
        </h3>

        {/* CATEGORY SUBTITLE — caption-md mute */}
        <p className="text-[14px] text-nike-mute dark:text-nike-stone line-clamp-1">
          {room.room_type}
        </p>

        {/* SPECS ROW */}
        <div className="flex items-center gap-4 text-[12px] text-nike-mute dark:text-nike-stone">
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" /> {room.capacity}
          </span>
          <span className="flex items-center gap-1">
            <Maximize2 className="w-3.5 h-3.5" /> {room.size_sqm}m²
          </span>
          <span className="flex items-center gap-1 truncate">
            <Bed className="w-3.5 h-3.5" /> {room.bed_type}
          </span>
        </div>

        {/* PRICE ROW */}
        <div className="pt-1">
          <div className="flex items-baseline justify-between">
            <span className="text-[16px] font-medium text-nike-ink dark:text-white">
              {formatCurrency(room.price)}
              <span className="text-[13px] text-nike-mute font-normal"> /คืน</span>
            </span>
            <span className="text-[11px] font-medium text-nike-success flex items-center gap-1">
              ✓ ยกเลิกฟรี
            </span>
          </div>
          <span className="text-[11px] text-nike-stone block">
            รวมภาษีและค่าธรรมเนียมแล้ว (THB Net)
          </span>
        </div>

        {/* CTA — pill buttons */}
        <div className="flex gap-2 pt-1">
          {room.status === 'Available' ? (
            <Link
              to={`/booking/${room.id}`}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 bg-nike-ink dark:bg-white text-white dark:text-nike-ink text-[14px] font-medium py-3 rounded-full text-center hover:opacity-80 transition-opacity flex items-center justify-center gap-1.5"
            >
              Book Now <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <button
              disabled
              className="flex-1 bg-nike-hairline-soft dark:bg-nike-dark-elevated text-nike-mute text-[14px] font-medium py-3 rounded-full cursor-not-allowed text-center"
            >
              Unavailable
            </button>
          )}
        </div>

      </div>
    </Link>
  );
};
