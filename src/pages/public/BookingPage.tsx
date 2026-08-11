import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Room } from '../../types';
import { getRoomById, createBooking } from '../../services/api';
import { formatCurrency } from '../../utils/formatters';
import { Building2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export const BookingPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    guestName: '',
    guestPhone: '',
    guestEmail: '',
    checkIn: new Date().toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 365 * 86400000).toISOString().split('T')[0], // 1 year lease by default
    guestCount: 1,
    specialRequests: '',
  });

  useEffect(() => {
    if (roomId) {
      getRoomById(roomId).then(res => {
        setRoom(res);
        setLoading(false);
      });
    }
  }, [roomId]);

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
      <Link to={`/rooms/${room.id}`} className="inline-flex items-center gap-2 text-xs font-semibold text-nike-mute hover:text-nike-ink dark:hover:text-white">
        <ArrowLeft className="w-4 h-4" /> Back to Unit Details
      </Link>

      <div className="border-b border-nike-hairline dark:border-nike-dark-card pb-4">
        <h1 className="text-2xl font-bold text-nike-ink dark:text-white flex items-center gap-2">
          <Building2 className="w-6 h-6 text-blue-600" />
          Book Unit {room.roomNumber}
        </h1>
        <p className="text-xs text-nike-mute mt-1">
          {room.roomName} · Floor {room.floor} · Rent: {formatCurrency(room.price)}/month
        </p>
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
              className="w-full px-4 py-2.5 text-xs rounded-xl bg-nike-soft-cloud dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card text-nike-ink dark:text-white focus:outline-none"
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
                className="w-full px-4 py-2.5 text-xs rounded-xl bg-nike-soft-cloud dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card text-nike-ink dark:text-white focus:outline-none"
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
                className="w-full px-4 py-2.5 text-xs rounded-xl bg-nike-soft-cloud dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card text-nike-ink dark:text-white focus:outline-none"
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
                className="w-full px-4 py-2.5 text-xs rounded-xl bg-nike-soft-cloud dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card text-nike-ink dark:text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-nike-ink dark:text-white mb-1">Expected Move-Out Date *</label>
              <input
                type="date"
                required
                value={formData.checkOut}
                onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                className="w-full px-4 py-2.5 text-xs rounded-xl bg-nike-soft-cloud dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card text-nike-ink dark:text-white focus:outline-none"
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
              className="w-full px-4 py-2.5 text-xs rounded-xl bg-nike-soft-cloud dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card text-nike-ink dark:text-white focus:outline-none"
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
