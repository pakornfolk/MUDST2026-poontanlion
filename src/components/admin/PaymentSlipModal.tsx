import React from 'react';
import { X, CheckCircle2, XCircle } from 'lucide-react';
import { Booking } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';

interface PaymentSlipModalProps {
  booking?: Booking | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
}

export const PaymentSlipModal: React.FC<PaymentSlipModalProps> = ({
  booking,
  isOpen,
  onClose,
  onApprove,
  onReject,
}) => {
  if (!isOpen || !booking) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-nike-canvas dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card w-full max-w-lg p-6 md:p-8 space-y-6 animate-fadeIn" onClick={e => e.stopPropagation()}>
        
        <div className="flex items-center justify-between border-b border-nike-hairline-soft dark:border-nike-dark-card pb-3">
          <div>
            <h3 className="text-[18px] font-medium text-nike-ink dark:text-white">
              Slip Audit: #{booking.booking_no}
            </h3>
            <p className="text-[13px] text-nike-mute">Guest: {booking.guest_name}</p>
          </div>
          <button onClick={onClose} className="text-nike-mute hover:text-nike-ink dark:hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {booking.slip_image ? (
            <div className="bg-white p-2 border border-nike-hairline max-h-96 overflow-y-auto flex items-center justify-center">
              <img src={booking.slip_image} alt="Payment Slip" className="max-h-80 object-contain" />
            </div>
          ) : (
            <p className="text-[14px] text-nike-mute text-center py-8">No slip image uploaded</p>
          )}

          <div className="grid grid-cols-2 gap-2 text-[13px] bg-nike-soft-cloud dark:bg-nike-dark-card p-4">
            <div>
              <span className="text-nike-mute block text-[11px]">Room Suite</span>
              <span className="font-medium text-nike-ink dark:text-white">{booking.room?.room_name || 'Suite'}</span>
            </div>
            <div>
              <span className="text-nike-mute block text-[11px]">Total Expected</span>
              <span className="font-medium text-nike-ink dark:text-white">{formatCurrency(booking.total_price)}</span>
            </div>
            <div>
              <span className="text-nike-mute block text-[11px]">Dates</span>
              <span className="text-nike-ink dark:text-white">{formatDate(booking.check_in)} – {formatDate(booking.check_out)}</span>
            </div>
            <div>
              <span className="text-nike-mute block text-[11px]">Phone</span>
              <span className="text-nike-ink dark:text-white">{booking.guest_phone}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-2 border-t border-nike-hairline-soft dark:border-nike-dark-card">
          <button
            onClick={onReject}
            className="flex-1 border border-nike-sale text-nike-sale text-[13px] font-medium py-3 rounded-full hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors flex items-center justify-center gap-1.5"
          >
            <XCircle className="w-4 h-4" /> Reject Slip
          </button>

          <button
            onClick={onApprove}
            className="flex-1 bg-nike-ink dark:bg-white text-white dark:text-nike-ink text-[13px] font-medium py-3 rounded-full hover:opacity-80 transition-opacity flex items-center justify-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" /> Approve & Confirm Paid
          </button>
        </div>

      </div>
    </div>
  );
};
