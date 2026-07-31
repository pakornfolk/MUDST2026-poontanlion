import React, { useEffect, useState } from 'react';
import { Search, Eye } from 'lucide-react';
import { Booking } from '../../types';
import { getBookings, updateBookingStatus } from '../../services/api';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { PaymentSlipModal } from '../../components/admin/PaymentSlipModal';
import { toast } from 'sonner';

export const BookingManagement: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const [slipModalOpen, setSlipModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const fetchBookings = async () => {
    const list = await getBookings();
    setBookings(list);
    applyFilter(list, searchQuery, statusFilter);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const applyFilter = (list: Booking[], q: string, st: string) => {
    let result = [...list];
    if (q.trim()) {
      const query = q.toLowerCase();
      result = result.filter(b => b.booking_no.toLowerCase().includes(query) || b.guest_name.toLowerCase().includes(query) || b.guest_phone.includes(query));
    }
    if (st !== 'All') {
      result = result.filter(b => b.status === st);
    }
    setFilteredBookings(result);
  };

  const handleStatusUpdate = async (bookingId: string, status: Booking['status']) => {
    await updateBookingStatus(bookingId, status);
    toast.success(`Booking status updated to ${status}`);
    fetchBookings();
  };

  return (
    <div className="space-y-8 pb-10">
      
      {/* HEADER */}
      <div className="border-b border-nike-hairline dark:border-nike-dark-card pb-4">
        <h1 className="text-[28px] font-medium text-nike-ink dark:text-white">
          Booking Management
        </h1>
        <p className="text-[14px] text-nike-mute dark:text-nike-stone mt-0.5">
          View, verify payment slips, approve or cancel guest reservations
        </p>
      </div>

      {/* SEARCH AND FILTERS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2 relative">
          <Search className="w-4 h-4 text-nike-mute absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); applyFilter(bookings, e.target.value, statusFilter); }}
            placeholder="Search by booking no, guest name, or phone..."
            className="w-full pl-10 p-3 bg-nike-soft-cloud dark:bg-nike-dark-card border-0 text-nike-ink dark:text-white text-[14px] rounded-[24px] focus:outline-none focus:ring-2 focus:ring-nike-ink"
          />
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={e => { setStatusFilter(e.target.value); applyFilter(bookings, searchQuery, e.target.value); }}
            className="w-full p-3 bg-nike-soft-cloud dark:bg-nike-dark-card border-0 text-nike-ink dark:text-white text-[14px] rounded-[24px] focus:outline-none focus:ring-2 focus:ring-nike-ink appearance-none cursor-pointer"
          >
            <option value="All">All Booking Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Waiting Verification">Waiting Verification</option>
            <option value="Paid">Paid</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-nike-canvas dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card overflow-x-auto">
        <table className="w-full text-left border-collapse text-[14px]">
          <thead>
            <tr className="border-b border-nike-hairline-soft dark:border-nike-dark-card text-nike-mute dark:text-nike-stone font-medium text-[13px]">
              <th className="p-4">Booking No</th>
              <th className="p-4">Guest Info</th>
              <th className="p-4">Suite</th>
              <th className="p-4">Check-in / Out</th>
              <th className="p-4">Total Price</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-nike-hairline-soft dark:divide-nike-dark-card">
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-nike-mute">
                  No bookings found
                </td>
              </tr>
            ) : (
              filteredBookings.map(b => (
                <tr key={b.id} className="hover:bg-nike-soft-cloud dark:hover:bg-nike-dark-card/50 transition-colors">
                  <td className="p-4 font-medium text-nike-ink dark:text-white">
                    {b.booking_no}
                  </td>
                  <td className="p-4">
                    <div>
                      <span className="font-medium text-nike-ink dark:text-white block">{b.guest_name}</span>
                      <span className="text-[12px] text-nike-mute">{b.guest_phone} · {b.guest_email}</span>
                    </div>
                  </td>
                  <td className="p-4 text-nike-mute dark:text-nike-stone">
                    {b.room?.room_name || 'Suite'}
                  </td>
                  <td className="p-4 text-nike-mute dark:text-nike-stone">
                    {formatDate(b.check_in)} – {formatDate(b.check_out)}
                  </td>
                  <td className="p-4 font-medium text-nike-ink dark:text-white">
                    {formatCurrency(b.total_price)}
                  </td>
                  <td className="p-4">
                    <select
                      value={b.status}
                      onChange={e => handleStatusUpdate(b.id, e.target.value as Booking['status'])}
                      className={`p-1.5 text-[12px] font-medium rounded-full border-0 focus:outline-none cursor-pointer ${
                        b.status === 'Paid' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        b.status === 'Waiting Verification' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' :
                        b.status === 'Cancelled' || b.status === 'Rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                        'bg-nike-soft-cloud text-nike-mute dark:bg-nike-dark-card'
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Waiting Verification">Waiting Verification</option>
                      <option value="Paid">Paid</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {b.slip_image && (
                      <button
                        onClick={() => { setSelectedBooking(b); setSlipModalOpen(true); }}
                        className="px-3 py-1.5 bg-nike-soft-cloud dark:bg-nike-dark-card text-nike-ink dark:text-white rounded-full text-[12px] font-medium hover:bg-nike-hairline-soft transition-colors inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" /> Slip
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <PaymentSlipModal
        booking={selectedBooking}
        isOpen={slipModalOpen}
        onClose={() => setSlipModalOpen(false)}
        onApprove={async () => {
          if (selectedBooking) {
            await handleStatusUpdate(selectedBooking.id, 'Paid');
            setSlipModalOpen(false);
          }
        }}
        onReject={async () => {
          if (selectedBooking) {
            await handleStatusUpdate(selectedBooking.id, 'Rejected');
            setSlipModalOpen(false);
          }
        }}
      />

    </div>
  );
};
