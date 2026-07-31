import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarCheck, Heart, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Booking } from '../../types';
import { getBookings, getWishlist } from '../../services/api';
import { formatCurrency, formatDate } from '../../utils/formatters';

export const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const allBookings = await getBookings();
      const myBookings = allBookings.filter(b => b.user_id === user?.id || b.guest_email === user?.email);
      setUserBookings(myBookings);
      setWishlistCount(getWishlist().length);
    };
    fetchData();
  }, [user]);

  const activeBookings = userBookings.filter(b => b.status === 'Paid' || b.status === 'Waiting Verification' || b.status === 'Pending');

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-10 space-y-8">
      
      {/* USER HEADER */}
      <div className="bg-nike-ink text-white p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img src={user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'} alt="" className="w-16 h-16 rounded-full object-cover" />
          <div>
            <span className="text-[12px] text-nike-stone block">Guest Dashboard</span>
            <h1 className="text-[24px] font-medium">{user?.fullname}</h1>
            <p className="text-[13px] text-nike-stone">{user?.email} · {user?.phone}</p>
          </div>
        </div>
        <Link to="/user/profile" className="bg-white text-nike-ink text-[14px] font-medium px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity">
          Edit Profile
        </Link>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-nike-soft-cloud dark:bg-nike-dark-elevated p-6 space-y-2">
          <CalendarCheck className="w-6 h-6 text-nike-ink dark:text-white" />
          <span className="text-[12px] text-nike-mute block">Total Bookings</span>
          <span className="text-[28px] font-medium text-nike-ink dark:text-white">{userBookings.length}</span>
        </div>
        <div className="bg-nike-soft-cloud dark:bg-nike-dark-elevated p-6 space-y-2">
          <CalendarCheck className="w-6 h-6 text-nike-success" />
          <span className="text-[12px] text-nike-mute block">Active</span>
          <span className="text-[28px] font-medium text-nike-success">{activeBookings.length}</span>
        </div>
        <div className="bg-nike-soft-cloud dark:bg-nike-dark-elevated p-6 space-y-2">
          <Heart className="w-6 h-6 text-nike-sale" />
          <span className="text-[12px] text-nike-mute block">Wishlist</span>
          <span className="text-[28px] font-medium text-nike-ink dark:text-white">{wishlistCount}</span>
        </div>
      </div>

      {/* RECENT BOOKINGS */}
      <div className="bg-nike-canvas dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-nike-hairline-soft dark:border-nike-dark-card pb-3">
          <h3 className="text-[16px] font-medium text-nike-ink dark:text-white">Recent Reservations</h3>
          <Link to="/user/bookings" className="text-[14px] font-medium text-nike-ink dark:text-white underline">
            View All ({userBookings.length})
          </Link>
        </div>

        {userBookings.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <p className="text-[14px] text-nike-mute">No bookings yet</p>
            <Link to="/rooms" className="inline-block bg-nike-ink dark:bg-white text-white dark:text-nike-ink px-6 py-3 rounded-full text-[14px] font-medium hover:opacity-80">
              Browse Rooms
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {userBookings.slice(0, 3).map(b => (
              <div key={b.id} className="p-4 bg-nike-soft-cloud dark:bg-nike-dark-card flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[14px] font-medium text-nike-ink dark:text-white block">{b.booking_no}</span>
                  <strong className="text-[15px] text-nike-ink dark:text-white block">{b.room?.room_name || 'Suite'}</strong>
                  <span className="text-[13px] text-nike-mute">{formatDate(b.check_in)} – {formatDate(b.check_out)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[15px] font-medium text-nike-ink dark:text-white">{formatCurrency(b.total_price)}</span>
                  <span className={`px-3 py-1 text-[12px] font-medium rounded-full ${
                    b.status === 'Paid' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                    b.status === 'Waiting Verification' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' :
                    'bg-nike-soft-cloud text-nike-mute dark:bg-nike-dark-elevated'
                  }`}>
                    {b.status}
                  </span>
                  <Link to={`/payment/${b.id}`} className="bg-nike-ink dark:bg-white text-white dark:text-nike-ink px-3 py-1.5 rounded-full text-[12px] font-medium hover:opacity-80">
                    Manage
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
