import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { QrCode, Upload } from 'lucide-react';
import { Booking } from '../../types';
import { getBookings, updateBookingStatus } from '../../services/api';
import { formatCurrency, formatDate, getPromptPayQRUrl } from '../../utils/formatters';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';

export const BookingHistory: React.FC = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [qrModalBooking, setQrModalBooking] = useState<Booking | null>(null);

  const fetchUserBookings = async () => {
    const list = await getBookings();
    const mine = list.filter(b => b.user_id === user?.id || b.guest_email === user?.email);
    setBookings(mine);
  };

  useEffect(() => { fetchUserBookings(); }, [user]);

  const handleCancelBooking = async (bookingId: string) => {
    if (window.confirm('Cancel this booking?')) {
      await updateBookingStatus(bookingId, 'Cancelled');
      toast.info('Booking cancelled');
      fetchUserBookings();
    }
  };

  const filteredBookings = bookings.filter(b => activeTab === 'ALL' ? true : b.status.toUpperCase() === activeTab);
  const tabs = ['ALL', 'PAID', 'WAITING VERIFICATION', 'PENDING', 'COMPLETED', 'CANCELLED'];

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-10 space-y-8">
      
      <div className="pb-2">
        <h1 className="text-[32px] font-medium text-nike-ink dark:text-white">Booking History</h1>
        <p className="text-[14px] text-nike-mute dark:text-nike-stone mt-1">Your reservations</p>
      </div>

      {/* FILTER CHIPS */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-[13px] font-medium rounded-full whitespace-nowrap transition-colors ${
              activeTab === tab
                ? 'bg-nike-ink text-white dark:bg-white dark:text-nike-ink'
                : 'bg-nike-soft-cloud text-nike-mute dark:bg-nike-dark-elevated dark:text-nike-stone hover:text-nike-ink dark:hover:text-white'
            }`}>
            {tab}
          </button>
        ))}
      </div>

      {filteredBookings.length === 0 ? (
        <div className="bg-nike-canvas dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card p-12 text-center space-y-3">
          <p className="text-[16px] font-medium text-nike-ink dark:text-white">No bookings found</p>
          <Link to="/rooms" className="inline-block bg-nike-ink dark:bg-white text-white dark:text-nike-ink px-6 py-3 rounded-full text-[14px] font-medium hover:opacity-80">
            Book a Suite
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map(b => (
            <div key={b.id} className="bg-nike-canvas dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-nike-hairline-soft dark:border-nike-dark-card pb-3">
                <div>
                  <span className="text-[12px] text-nike-mute block">Booking Reference</span>
                  <span className="text-[16px] font-medium text-nike-ink dark:text-white">{b.booking_no}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 text-[12px] font-medium rounded-full ${
                    b.status === 'Paid' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                    b.status === 'Waiting Verification' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' :
                    b.status === 'Cancelled' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                    'bg-nike-soft-cloud text-nike-mute dark:bg-nike-dark-card'
                  }`}>
                    {b.status}
                  </span>
                  <button onClick={() => setQrModalBooking(b)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-nike-soft-cloud dark:bg-nike-dark-card text-nike-ink dark:text-white hover:bg-nike-hairline-soft transition-colors"
                    title="View QR">
                    <QrCode className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-[14px]">
                <div>
                  <span className="text-nike-mute block text-[12px]">Suite</span>
                  <strong className="text-nike-ink dark:text-white font-medium">{b.room?.room_name || 'Suite'}</strong>
                </div>
                <div>
                  <span className="text-nike-mute block text-[12px]">Dates</span>
                  <span className="text-nike-ink dark:text-white">{formatDate(b.check_in)} → {formatDate(b.check_out)}</span>
                </div>
                <div>
                  <span className="text-nike-mute block text-[12px]">Guests</span>
                  <span className="text-nike-ink dark:text-white">{b.guest_count}</span>
                </div>
                <div>
                  <span className="text-nike-mute block text-[12px]">Total</span>
                  <strong className="text-[16px] font-medium text-nike-ink dark:text-white">{formatCurrency(b.total_price)}</strong>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                {(b.status === 'Pending' || b.status === 'Waiting Verification') && (
                  <Link to={`/payment/${b.id}`}
                    className="bg-nike-ink dark:bg-white text-white dark:text-nike-ink text-[13px] font-medium px-4 py-2 rounded-full hover:opacity-80 flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5" /> Upload Slip
                  </Link>
                )}
                {b.status !== 'Cancelled' && b.status !== 'Completed' && (
                  <button onClick={() => handleCancelBooking(b.id)}
                    className="border border-nike-sale text-nike-sale text-[13px] font-medium px-4 py-2 rounded-full hover:bg-red-50 dark:hover:bg-red-950/30">
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* QR MODAL */}
      {qrModalBooking && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setQrModalBooking(null)}>
          <div className="bg-nike-canvas dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card p-8 max-w-sm w-full text-center space-y-4" onClick={e => e.stopPropagation()}>
            <span className="text-[14px] text-nike-mute block">Booking Pass</span>
            <h3 className="text-[18px] font-medium text-nike-ink dark:text-white">{qrModalBooking.booking_no}</h3>
            <div className="p-4 bg-white border border-nike-hairline inline-block">
              <img src={getPromptPayQRUrl(qrModalBooking.total_price, qrModalBooking.booking_no)} alt="QR" className="w-48 h-48 object-contain" />
            </div>
            <p className="text-[13px] text-nike-mute">Show at reception upon check-in.</p>
            <button onClick={() => setQrModalBooking(null)} className="w-full bg-nike-ink dark:bg-white text-white dark:text-nike-ink py-3 rounded-full text-[14px] font-medium hover:opacity-80">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
