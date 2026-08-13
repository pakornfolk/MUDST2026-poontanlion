import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Room } from '../../types';
import { getRoomById, createBooking } from '../../services/api';
import { formatCurrency } from '../../utils/formatters';
import { Building2, ArrowLeft, CheckCircle2, Maximize2, BedDouble, Users } from 'lucide-react';
import { toast } from 'sonner';

import { useAuth } from '../../context/AuthContext';

export const BookingPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    guestName: user?.fullname || '',
    guestEmail: user?.email || '',
    guestPhone: user?.phone || '',
    checkIn: new Date().toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    guestCount: 1,
    specialRequests: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please login to book a room');
      navigate('/login');
      return;
    }

    if (roomId) {
      getRoomById(roomId).then((res) => {
        setRoom(res);
        setLoading(false);
      });
    }
  }, [roomId, isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.guestName || !formData.guestPhone || !formData.guestEmail) {
      toast.error('Please fill in all contact information');
      return;
    }

    setSubmitting(true);
    try {
      const res = await createBooking({
        roomId: room?.id || roomId,
        roomNumber: room?.roomNumber,
        guestName: formData.guestName,
        guestPhone: formData.guestPhone,
        guestEmail: formData.guestEmail,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        guestCount: formData.guestCount,
        totalPrice: room?.price || 5500,
        specialRequests: formData.specialRequests,
      });

      toast.success(`Booking request submitted! Reference No: ${res.bookingNo}`);
      navigate('/payment/' + res.id);
    } catch (err: any) {
      toast.error(err.message || 'Failed to submit booking');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-nike-mute">Loading unit details...</div>;
  }

  if (!room) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold">Unit Not Found</h2>
        <Link to="/rooms" className="text-blue-600 underline">Back to Units</Link>
      </div>
    );
  }

  return (
    <div className="max-w-[800px] mx-auto px-6 py-10 space-y-8">
      <Link to={`/rooms/${room.id}`} className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Unit Details
      </Link>

      {/* HIGH CONTRAST UNIT OVERVIEW CARD */}
      <div className="bg-slate-100 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 p-6 rounded-3xl space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-block bg-blue-600 text-white text-xs font-bold px-3.5 py-1 rounded-full mb-2">
              Floor {room.floor} · Unit {room.roomNumber}
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Building2 className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              {room.roomName}
            </h1>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider block">Monthly Rent</span>
            <span className="text-2xl md:text-3xl font-extrabold text-blue-600 dark:text-blue-400 block mt-0.5">
              {formatCurrency(room.price)}<span className="text-xs font-medium text-slate-500 dark:text-slate-300">/mo</span>
            </span>
          </div>
        </div>

        {/* DESCRIPTION BOX */}
        <p className="text-xs md:text-sm font-medium text-slate-800 dark:text-slate-100 leading-relaxed bg-white dark:bg-slate-900/80 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700">
          {room.description}
        </p>

        {/* SPECS PILLS */}
        <div className="flex flex-wrap gap-2 pt-1 text-xs">
          <span className="bg-white dark:bg-slate-900/80 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-2xs">
            <Maximize2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> {room.sizeSqm} m²
          </span>
          <span className="bg-white dark:bg-slate-900/80 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-2xs">
            <BedDouble className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" /> {room.bedType || 'Queen Bed'}
          </span>
          <span className="bg-white dark:bg-slate-900/80 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-2xs">
            <Users className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" /> Max {room.capacity} Guests
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-nike-canvas dark:bg-nike-dark-card p-6 border border-nike-hairline dark:border-nike-dark-card rounded-2xl space-y-6">
        <div className="space-y-4">
          <h3 className="font-bold text-sm uppercase tracking-wider text-nike-stone">Guest Contact Info</h3>

          <div>
            <label className="block text-xs font-semibold text-nike-ink dark:text-white mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={formData.guestName}
              onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
              placeholder="e.g. John Doe"
              className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-nike-ink dark:text-white mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                value={formData.guestPhone}
                onChange={(e) => setFormData({ ...formData, guestPhone: e.target.value })}
                placeholder="081-234-5678"
                className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-nike-ink dark:text-white mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={formData.guestEmail}
                onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })}
                placeholder="john.doe@example.com"
                className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-nike-hairline dark:border-nike-dark-elevated">
          <h3 className="font-bold text-sm uppercase tracking-wider text-nike-stone">Lease Term Details</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-nike-ink dark:text-white mb-1">Proposed Move-In Date *</label>
              <input
                type="date"
                required
                value={formData.checkIn}
                onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-nike-ink dark:text-white mb-1">Expected Move-Out Date *</label>
              <input
                type="date"
                required
                value={formData.checkOut}
                onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-nike-ink dark:text-white mb-1">Additional Notes / Special Requests</label>
            <textarea
              rows={3}
              value={formData.specialRequests}
              onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
              placeholder="e.g., Request parking space, 1-year agreement prefered"
              className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2"
        >
          <CheckCircle2 className="w-5 h-5" />
          {submitting ? 'Submitting Booking...' : 'Submit Booking'}
        </button>
      </form>
    </div>
  );
};
