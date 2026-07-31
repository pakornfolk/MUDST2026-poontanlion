import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PromptPayQR } from '../../components/common/PromptPayQR';
import { Booking } from '../../types';
import { getBookings, uploadPaymentSlip } from '../../services/api';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { toast } from 'sonner';
import { useAuth } from '../../context/AuthContext';

export const PaymentPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSlipUrl, setSelectedSlipUrl] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!bookingId) return;
    const fetchBooking = async () => {
      const list = await getBookings();
      const found = list.find(b => b.id === bookingId);
      if (found && (!user || (found.user_id !== user.id && found.guest_email !== user.email))) {
        navigate('/user/bookings', { replace: true });
        return;
      }
      setBooking(found || null);
      setLoading(false);
    };
    fetchBooking();
  }, [bookingId, navigate, user]);

  if (loading || !booking) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center text-nike-mute animate-pulse text-[16px]">
        Loading Payment...
      </div>
    );
  }

  const handleSubmitSlip = async () => {
    if (!selectedSlipUrl) {
      toast.error('Please upload a payment slip first');
      return;
    }
    setSubmitting(true);
    try {
      await uploadPaymentSlip(booking.id, selectedSlipUrl);
      toast.success('Payment slip submitted! Awaiting verification.');
      navigate('/user/bookings');
    } catch (err) {
      toast.error('Failed to submit payment slip');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-10 py-10 space-y-8">
      
      <div className="pb-2 text-center">
        <h1 className="text-[28px] md:text-[32px] font-medium text-nike-ink dark:text-white">
          Payment — Booking #{booking.booking_no}
        </h1>
        <p className="text-[14px] text-nike-mute dark:text-nike-stone mt-1">Secure Payment Portal</p>
      </div>

      {/* BOOKING SUMMARY */}
      <div className="bg-nike-canvas dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card p-6 grid grid-cols-1 md:grid-cols-4 gap-4 text-[14px]">
        <div>
          <span className="text-nike-mute block text-[12px]">Guest</span>
          <strong className="text-nike-ink dark:text-white font-medium">{booking.guest_name}</strong>
        </div>
        <div>
          <span className="text-nike-mute block text-[12px]">Suite</span>
          <strong className="text-nike-ink dark:text-white font-medium">{booking.room?.room_name || 'Suite'}</strong>
        </div>
        <div>
          <span className="text-nike-mute block text-[12px]">Dates</span>
          <span className="text-nike-ink dark:text-white font-medium">{formatDate(booking.check_in)} – {formatDate(booking.check_out)}</span>
        </div>
        <div>
          <span className="text-nike-mute block text-[12px]">Total</span>
          <strong className="text-[18px] font-medium text-nike-ink dark:text-white">{formatCurrency(booking.total_price)}</strong>
        </div>
      </div>

      {/* PROMPTPAY QR */}
      <PromptPayQR
        amount={booking.total_price}
        bookingNo={booking.booking_no}
        onSlipSelected={setSelectedSlipUrl}
      />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-nike-hairline dark:border-nike-dark-card">
        <Link to="/user/bookings" className="text-[14px] font-medium text-nike-mute hover:text-nike-ink dark:hover:text-white underline">
          Pay Later
        </Link>

        <button
          onClick={handleSubmitSlip}
          disabled={submitting || !selectedSlipUrl}
          className={`px-8 py-4 text-[14px] font-medium rounded-full transition-opacity ${
            selectedSlipUrl
              ? 'bg-nike-ink dark:bg-white text-white dark:text-nike-ink hover:opacity-80'
              : 'bg-nike-hairline-soft dark:bg-nike-dark-card text-nike-mute cursor-not-allowed'
          }`}
        >
          {submitting ? 'Submitting...' : 'Submit Payment'}
        </button>
      </div>

    </div>
  );
};
