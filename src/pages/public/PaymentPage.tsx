import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Booking } from '../../types';
import { getBookings } from '../../services/api';
import { formatCurrency } from '../../utils/formatters';
import { CheckCircle2, Building2, ArrowLeft } from 'lucide-react';

export const PaymentPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (bookingId) {
      getBookings().then(all => {
        const match = all.find(b => b.id === bookingId);
        setBooking(match || null);
        setLoading(false);
      });
    }
  }, [bookingId]);

  if (loading) {
    return <div className="text-center py-20 text-nike-mute">Loading booking confirmation...</div>;
  }

  if (!booking) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold">Booking Request Not Found</h2>
        <Link to="/rooms" className="text-blue-600 underline">Back to Units</Link>
      </div>
    );
  }

  return (
    <div className="max-w-[700px] mx-auto px-6 py-12 space-y-8 text-center">
      <div className="w-16 h-16 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-nike-ink dark:text-white">
          Application Submitted Successfully!
        </h1>
        <p className="text-xs text-nike-mute dark:text-nike-stone">
          Reference Number: <strong className="text-nike-ink dark:text-white">{booking.bookingNo}</strong>
        </p>
      </div>

      <div className="bg-nike-canvas dark:bg-nike-dark-card p-6 border border-nike-hairline dark:border-nike-dark-card rounded-2xl text-left space-y-4 text-xs">
        <h3 className="font-bold text-sm text-nike-ink dark:text-white border-b border-nike-hairline pb-2 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-blue-600" /> Application Summary
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-nike-stone block">Applicant Name</span>
            <span className="font-semibold text-nike-ink dark:text-white">{booking.guestName}</span>
          </div>
          <div>
            <span className="text-nike-stone block">Unit Number</span>
            <span className="font-semibold text-nike-ink dark:text-white">Unit {booking.roomNumber || 'Assigned'}</span>
          </div>
          <div>
            <span className="text-nike-stone block">Contact Phone</span>
            <span className="font-semibold text-nike-ink dark:text-white">{booking.guestPhone}</span>
          </div>
          <div>
            <span className="text-nike-stone block">Contact Email</span>
            <span className="font-semibold text-nike-ink dark:text-white">{booking.guestEmail}</span>
          </div>
          <div>
            <span className="text-nike-stone block">Move-in Date</span>
            <span className="font-semibold text-nike-ink dark:text-white">{booking.checkIn}</span>
          </div>
          <div>
            <span className="text-nike-stone block">Move-out Date</span>
            <span className="font-semibold text-nike-ink dark:text-white">{booking.checkOut}</span>
          </div>
          <div>
            <span className="text-nike-stone block">Monthly Rent Rate</span>
            <span className="font-bold text-blue-600 dark:text-blue-400">{formatCurrency(booking.totalPrice)}</span>
          </div>
          <div>
            <span className="text-nike-stone block">Application Status</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 border border-amber-500/20 inline-block mt-0.5">
              {booking.status}
            </span>
          </div>
        </div>
      </div>

      <p className="text-xs text-nike-stone">
        The apartment admin will review your application and contact you via phone or email for contract signing.
      </p>

      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold text-xs rounded-full hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home Page
        </Link>
      </div>
    </div>
  );
};
