import React, { useEffect, useState } from 'react';
import { Booking } from '../../types';
import { getBookings } from '../../services/api';
import { formatCurrency, formatDate } from '../../utils/formatters';

export const ReportsPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      setBookings(await getBookings());
    };
    fetchReports();
  }, []);

  const paidBookings = bookings.filter(b => b.status === 'Paid');
  const totalRevenue = paidBookings.reduce((sum, b) => sum + b.total_price, 0);

  return (
    <div className="space-y-8 pb-10">
      
      <div className="border-b border-nike-hairline dark:border-nike-dark-card pb-4">
        <h1 className="text-[28px] font-medium text-nike-ink dark:text-white">
          Financial Reports
        </h1>
        <p className="text-[14px] text-nike-mute dark:text-nike-stone mt-0.5">
          Audited booking records and revenue calculations
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-nike-soft-cloud dark:bg-nike-dark-elevated p-5 space-y-1">
          <span className="text-[12px] text-nike-mute block font-medium">Total Bookings Recorded</span>
          <span className="text-[28px] font-medium text-nike-ink dark:text-white">{bookings.length}</span>
        </div>
        <div className="bg-nike-soft-cloud dark:bg-nike-dark-elevated p-5 space-y-1">
          <span className="text-[12px] text-nike-mute block font-medium">Paid Bookings</span>
          <span className="text-[28px] font-medium text-nike-success">{paidBookings.length}</span>
        </div>
        <div className="bg-nike-soft-cloud dark:bg-nike-dark-elevated p-5 space-y-1">
          <span className="text-[12px] text-nike-mute block font-medium">Verified Revenue</span>
          <span className="text-[28px] font-medium text-nike-ink dark:text-white">{formatCurrency(totalRevenue)}</span>
        </div>
      </div>

      <div className="bg-nike-canvas dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card overflow-x-auto">
        <table className="w-full text-left border-collapse text-[14px]">
          <thead>
            <tr className="border-b border-nike-hairline-soft dark:border-nike-dark-card text-nike-mute dark:text-nike-stone font-medium text-[13px]">
              <th className="p-4">Booking No</th>
              <th className="p-4">Guest</th>
              <th className="p-4">Check-in</th>
              <th className="p-4">Check-out</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-nike-hairline-soft dark:divide-nike-dark-card">
            {bookings.map(b => (
              <tr key={b.id} className="hover:bg-nike-soft-cloud dark:hover:bg-nike-dark-card/50 transition-colors">
                <td className="p-4 font-medium text-nike-ink dark:text-white">{b.booking_no}</td>
                <td className="p-4 text-nike-ink dark:text-white">{b.guest_name}</td>
                <td className="p-4 text-nike-mute dark:text-nike-stone">{formatDate(b.check_in)}</td>
                <td className="p-4 text-nike-mute dark:text-nike-stone">{formatDate(b.check_out)}</td>
                <td className="p-4 font-medium text-nike-ink dark:text-white">{formatCurrency(b.total_price)}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 text-[12px] font-medium rounded-full ${
                    b.status === 'Paid' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-nike-soft-cloud text-nike-mute'
                  }`}>
                    {b.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
