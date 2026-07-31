import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Users, Tag, Check, ArrowRight } from 'lucide-react';
import { Room, Booking } from '../../types';
import { getRoomById, createBooking } from '../../services/api';
import { formatCurrency, formatDate, calculateNights } from '../../utils/formatters';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';

export const BookingPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [guestCount, setGuestCount] = useState(2);
  const [guestName, setGuestName] = useState(user?.fullname || '');
  const [guestPhone, setGuestPhone] = useState(user?.phone || '081-234-5678');
  const [guestEmail, setGuestEmail] = useState(user?.email || 'guest@example.com');
  const [specialRequests, setSpecialRequests] = useState('');

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);

  useEffect(() => {
    if (!roomId) return;
    const fetchRoom = async () => {
      const data = await getRoomById(roomId);
      setRoom(data);
      setLoading(false);
    };
    fetchRoom();
  }, [roomId]);

  if (loading || !room) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 py-20 text-center text-nike-mute animate-pulse text-[16px]">
        Loading...
      </div>
    );
  }

  const nights = calculateNights(checkIn, checkOut);
  const rawSubtotal = room.price * nights;

  let discountAmount = 0;
  if (appliedPromo) {
    discountAmount = appliedPromo.discount;
  }

  const totalPrice = Math.max(0, rawSubtotal - discountAmount);

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'VICTORY10') {
      const disc = Math.round(rawSubtotal * 0.10);
      setAppliedPromo({ code: 'VICTORY10', discount: disc });
      toast.success('Applied 10% Early Bird Discount!');
    } else if (code === 'LUXURY20') {
      const disc = Math.round(rawSubtotal * 0.20);
      setAppliedPromo({ code: 'LUXURY20', discount: disc });
      toast.success('Applied 20% Luxury Staycation Discount!');
    } else if (code === 'WELCOME500') {
      setAppliedPromo({ code: 'WELCOME500', discount: 500 });
      toast.success('Applied ฿500 Welcome Gift!');
    } else {
      toast.error('Invalid Promo Code');
    }
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestPhone || !guestEmail) {
      toast.error('Please complete all guest details');
      return;
    }
    if (checkIn < today || checkOut <= checkIn) {
      toast.error('Please select valid check-in and check-out dates');
      return;
    }
    if (guestCount < 1 || guestCount > room.capacity) {
      toast.error('This room accommodates up to ' + room.capacity + ' guests');
      return;
    }
    if (room.status !== 'Available') {
      toast.error('This room is currently unavailable');
      return;
    }

    try {
      const newBooking = await createBooking({
        user_id: user?.id || 'usr-customer-01',
        room_id: room.id,
        check_in: checkIn,
        check_out: checkOut,
        guest_count: guestCount,
        total_price: totalPrice,
        discount_amount: discountAmount,
        promo_code: appliedPromo?.code,
        guest_name: guestName,
        guest_phone: guestPhone,
        guest_email: guestEmail,
        special_requests: specialRequests,
      });

      toast.success(`Booking ${newBooking.booking_no} created!`);
      navigate(`/payment/${newBooking.id}`);
    } catch (err) {
      toast.error('Failed to create booking');
    }
  };

  const inputClass = "w-full p-3 bg-nike-soft-cloud dark:bg-nike-dark-card border-0 text-nike-ink dark:text-white text-[14px] rounded-[24px] focus:outline-none focus:ring-2 focus:ring-nike-ink";

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-10 space-y-8">
      
      <div className="pb-2">
        <h1 className="text-[32px] font-medium text-nike-ink dark:text-white">Complete Your Booking</h1>
        <p className="text-[14px] text-nike-mute dark:text-nike-stone mt-1">Victory Room Hotel Reservation</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT: BOOKING FORM */}
        <form onSubmit={handleSubmitBooking} className="lg:col-span-7 space-y-6">
          
          {/* STEP 1 */}
          <div className="bg-nike-canvas dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card p-6 space-y-4">
            <h3 className="text-[16px] font-medium text-nike-ink dark:text-white border-b border-nike-hairline-soft dark:border-nike-dark-card pb-3">
              1. Dates & Guests
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[12px] font-medium text-nike-mute mb-1.5 flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Check-in</label>
                <input type="date" min={today} required value={checkIn} onChange={e => setCheckIn(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-nike-mute mb-1.5 flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Check-out</label>
                <input type="date" min={checkIn || today} required value={checkOut} onChange={e => setCheckOut(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-nike-mute mb-1.5 flex items-center gap-1"><Users className="w-3.5 h-3.5" /> Guests</label>
                <select value={guestCount} onChange={e => setGuestCount(Number(e.target.value))} className={inputClass + " appearance-none cursor-pointer"}>
                  {Array.from({ length: room.capacity }).map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="bg-nike-canvas dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card p-6 space-y-4">
            <h3 className="text-[16px] font-medium text-nike-ink dark:text-white border-b border-nike-hairline-soft dark:border-nike-dark-card pb-3">
              2. Guest Information
            </h3>
            <div>
              <label className="block font-medium text-[14px] mb-1.5 text-nike-ink dark:text-white">Full Name</label>
              <input type="text" required value={guestName} onChange={e => setGuestName(e.target.value)} className={inputClass} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-[14px] mb-1.5 text-nike-ink dark:text-white">Phone</label>
                <input type="tel" required value={guestPhone} onChange={e => setGuestPhone(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className="block font-medium text-[14px] mb-1.5 text-nike-ink dark:text-white">Email</label>
                <input type="email" required value={guestEmail} onChange={e => setGuestEmail(e.target.value)} className={inputClass} />
              </div>
            </div>
            <div>
              <label className="block font-medium text-[14px] mb-1.5 text-nike-ink dark:text-white">Special Requests</label>
              <textarea rows={2} value={specialRequests} onChange={e => setSpecialRequests(e.target.value)} placeholder="e.g. High floor, late check-in..."
                className="w-full p-3 bg-nike-soft-cloud dark:bg-nike-dark-card border-0 text-nike-ink dark:text-white text-[14px] focus:outline-none focus:ring-2 focus:ring-nike-ink" />
            </div>
          </div>

          {/* PROMO CODE */}
          <div className="bg-nike-canvas dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card p-6 space-y-3">
            <span className="text-[14px] font-medium text-nike-ink dark:text-white flex items-center gap-1.5"><Tag className="w-4 h-4" /> Promo Code</span>
            <div className="flex gap-2">
              <input type="text" value={promoCode} onChange={e => setPromoCode(e.target.value)} placeholder="Try VICTORY10 or LUXURY20"
                className="flex-1 p-3 bg-nike-soft-cloud dark:bg-nike-dark-card border-0 text-nike-ink dark:text-white text-[14px] rounded-[24px] uppercase focus:outline-none focus:ring-2 focus:ring-nike-ink" />
              <button type="button" onClick={handleApplyPromo}
                className="bg-nike-ink dark:bg-white text-white dark:text-nike-ink px-6 py-3 rounded-full text-[14px] font-medium hover:opacity-80 transition-opacity">
                Apply
              </button>
            </div>
            {appliedPromo && (
              <p className="text-[13px] font-medium text-nike-success flex items-center gap-1">
                <Check className="w-4 h-4" /> {appliedPromo.code} applied (−{formatCurrency(appliedPromo.discount)})
              </p>
            )}
          </div>

          <button type="submit"
            className="w-full bg-nike-ink dark:bg-white text-white dark:text-nike-ink text-[14px] font-medium py-4 rounded-full hover:opacity-80 transition-opacity flex items-center justify-center gap-2">
            Continue to Payment <ArrowRight className="w-4 h-4" />
          </button>

        </form>

        {/* RIGHT: SUMMARY CARD */}
        <div className="lg:col-span-5">
          <div className="bg-nike-canvas dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card p-6 md:p-8 space-y-6 sticky top-20">
            
            <div className="border-b border-nike-hairline-soft dark:border-nike-dark-card pb-4">
              <span className="text-[12px] text-nike-mute block">Selected</span>
              <h3 className="text-[18px] font-medium text-nike-ink dark:text-white mt-1">{room.room_name}</h3>
              <span className="text-[13px] text-nike-mute">Room {room.room_number} · {room.room_type}</span>
            </div>

            <div className="aspect-[16/10] bg-nike-soft-cloud overflow-hidden">
              <img src={room.cover_image} alt="" className="w-full h-full object-cover" />
            </div>

            <div className="space-y-2 text-[14px] border-b border-nike-hairline-soft dark:border-nike-dark-card pb-4">
              <div className="flex justify-between">
                <span className="text-nike-mute">Check-in</span>
                <span className="font-medium text-nike-ink dark:text-white">{formatDate(checkIn)} (14:00)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-nike-mute">Check-out</span>
                <span className="font-medium text-nike-ink dark:text-white">{formatDate(checkOut)} (12:00)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-nike-mute">Duration</span>
                <span className="font-medium text-nike-ink dark:text-white">{nights} {nights === 1 ? 'Night' : 'Nights'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-nike-mute">Guests</span>
                <span className="font-medium text-nike-ink dark:text-white">{guestCount}</span>
              </div>
            </div>

            <div className="space-y-2 text-[14px]">
              <div className="flex justify-between">
                <span className="text-nike-mute">Rate/Night</span>
                <span className="text-nike-ink dark:text-white">{formatCurrency(room.price)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-nike-mute">Subtotal</span>
                <span className="text-nike-ink dark:text-white">{formatCurrency(rawSubtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-nike-success font-medium">
                  <span>Discount</span>
                  <span>−{formatCurrency(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[18px] font-medium pt-3 border-t border-nike-hairline-soft dark:border-nike-dark-card">
                <span className="text-nike-ink dark:text-white">Total</span>
                <span className="text-nike-ink dark:text-white">{formatCurrency(totalPrice)}</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
