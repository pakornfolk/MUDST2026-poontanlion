import React, { useEffect, useState } from 'react';
import { CreditCard, Eye, CheckCircle2, XCircle } from 'lucide-react';
import { Booking } from '../../types';
import { getBookings, updateBookingStatus } from '../../services/api';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { PaymentSlipModal } from '../../components/admin/PaymentSlipModal';
import { toast } from 'sonner';

export const PaymentManagement: React.FC = () => {
  const [pendingPayments, setPendingPayments] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [slipModalOpen, setSlipModalOpen] = useState(false);

  const fetchPendingPayments = async () => {
    const list = await getBookings();
    const pending = list.filter(b => b.status === 'Waiting Verification');
    setPendingPayments(pending);
    setLoading(false);
  };

  useEffect(() => {
    fetchPendingPayments();
  }, []);

  const handleApprove = async (bookingId: string) => {
    await updateBookingStatus(bookingId, 'Paid');
    toast.success('Payment verified & approved!');
    fetchPendingPayments();
  };

  const handleReject = async (bookingId: string) => {
    await updateBookingStatus(bookingId, 'Rejected');
    toast.error('Payment rejected');
    fetchPendingPayments();
  };

  return (
    <div className="space-y-8 pb-10">
      
      <div className="border-b border-nike-hairline dark:border-nike-dark-card pb-4">
        <h1 className="text-[28px] font-medium text-nike-ink dark:text-white">
          Payment Slip Verifications
        </h1>
        <p className="text-[14px] text-nike-mute dark:text-nike-stone mt-0.5">
          Audit guest PromptPay transfer slips and verify room reservations
        </p>
      </div>

      {pendingPayments.length === 0 ? (
        <div className="bg-nike-canvas dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card p-12 text-center space-y-2">
          <CreditCard className="w-8 h-8 text-nike-mute mx-auto mb-2" />
          <h3 className="text-[16px] font-medium text-nike-ink dark:text-white">No Pending Payment Slips</h3>
          <p className="text-[14px] text-nike-mute">All uploaded payment slips have been verified and processed.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pendingPayments.map(b => (
            <div key={b.id} className="bg-nike-canvas dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-nike-hairline-soft dark:border-nike-dark-card pb-3">
                <span className="text-[15px] font-medium text-nike-ink dark:text-white">{b.booking_no}</span>
                <span className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 text-[12px] font-medium px-3 py-1 rounded-full">
                  Waiting Verification
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-[14px]">
                <div>
                  <span className="text-nike-mute text-[12px] block">Guest Name</span>
                  <strong className="text-nike-ink dark:text-white font-medium">{b.guest_name}</strong>
                </div>
                <div>
                  <span className="text-nike-mute text-[12px] block">Amount Due</span>
                  <strong className="text-nike-ink dark:text-white font-medium">{formatCurrency(b.total_price)}</strong>
                </div>
                <div>
                  <span className="text-nike-mute text-[12px] block">Suite</span>
                  <span className="text-nike-ink dark:text-white">{b.room?.room_name || 'Suite'}</span>
                </div>
                <div>
                  <span className="text-nike-mute text-[12px] block">Dates</span>
                  <span className="text-nike-ink dark:text-white">{formatDate(b.check_in)} – {formatDate(b.check_out)}</span>
                </div>
              </div>

              {b.slip_image && (
                <div className="pt-2">
                  <button
                    onClick={() => { setSelectedBooking(b); setSlipModalOpen(true); }}
                    className="w-full bg-nike-soft-cloud dark:bg-nike-dark-card text-nike-ink dark:text-white text-[13px] font-medium py-2.5 rounded-full flex items-center justify-center gap-1.5 hover:bg-nike-hairline-soft transition-colors"
                  >
                    <Eye className="w-4 h-4" /> View Payment Slip Image
                  </button>
                </div>
              )}

              <div className="flex gap-2 pt-2 border-t border-nike-hairline-soft dark:border-nike-dark-card">
                <button
                  onClick={() => handleApprove(b.id)}
                  className="flex-1 bg-nike-ink dark:bg-white text-white dark:text-nike-ink text-[13px] font-medium py-3 rounded-full hover:opacity-80 transition-opacity flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" /> Approve Payment
                </button>
                <button
                  onClick={() => handleReject(b.id)}
                  className="flex-1 border border-nike-sale text-nike-sale text-[13px] font-medium py-3 rounded-full hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors flex items-center justify-center gap-1.5"
                >
                  <XCircle className="w-4 h-4" /> Reject Slip
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <PaymentSlipModal
        booking={selectedBooking}
        isOpen={slipModalOpen}
        onClose={() => setSlipModalOpen(false)}
        onApprove={async () => {
          if (selectedBooking) {
            await handleApprove(selectedBooking.id);
            setSlipModalOpen(false);
          }
        }}
        onReject={async () => {
          if (selectedBooking) {
            await handleReject(selectedBooking.id);
            setSlipModalOpen(false);
          }
        }}
      />

    </div>
  );
};
