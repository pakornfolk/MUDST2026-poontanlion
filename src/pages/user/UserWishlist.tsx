import React, { useEffect, useState } from 'react';
import { RoomCard } from '../../components/common/RoomCard';
import { Room } from '../../types';
import { getRooms, getWishlist } from '../../services/api';
import { Link } from 'react-router-dom';

export const UserWishlist: React.FC = () => {
  const [wishlistRooms, setWishlistRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      const all = await getRooms();
      const savedIds = getWishlist();
      setWishlistRooms(all.filter(r => savedIds.includes(r.id)));
      setLoading(false);
    };
    fetchWishlist();
  }, []);

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-10 space-y-8">
      <div className="pb-2">
        <h1 className="text-[32px] font-medium text-nike-ink dark:text-white">
          Wishlist ({wishlistRooms.length})
        </h1>
        <p className="text-[14px] text-nike-mute dark:text-nike-stone mt-1">Your saved favorites</p>
      </div>

      {wishlistRooms.length === 0 ? (
        <div className="bg-nike-canvas dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card p-12 text-center space-y-3">
          <p className="text-[16px] font-medium text-nike-ink dark:text-white">Your wishlist is empty</p>
          <Link to="/rooms" className="inline-block bg-nike-ink dark:bg-white text-white dark:text-nike-ink px-6 py-3 rounded-full text-[14px] font-medium hover:opacity-80">
            Browse Rooms
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlistRooms.map(room => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      )}
    </div>
  );
};
