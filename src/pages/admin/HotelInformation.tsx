import React, { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import { HotelInfo } from '../../types';
import { getHotelInfo, updateHotelInfo } from '../../services/api';
import { toast } from 'sonner';

export const HotelInformation: React.FC = () => {
  const [hotel, setHotel] = useState<HotelInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfo = async () => {
      const data = await getHotelInfo();
      setHotel(data);
      setLoading(false);
    };
    fetchInfo();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hotel) return;
    await updateHotelInfo(hotel);
    toast.success('Hotel information updated successfully!');
  };

  if (loading || !hotel) {
    return <div className="p-10 text-nike-mute animate-pulse text-[14px]">Loading...</div>;
  }

  const inputClass = "w-full p-3 bg-nike-soft-cloud dark:bg-nike-dark-card border-0 text-nike-ink dark:text-white text-[14px] rounded-[24px] focus:outline-none focus:ring-2 focus:ring-nike-ink";

  return (
    <div className="max-w-4xl space-y-8 pb-10">
      
      <div className="border-b border-nike-hairline dark:border-nike-dark-card pb-4">
        <h1 className="text-[28px] font-medium text-nike-ink dark:text-white">
          Hotel Information & Policies
        </h1>
        <p className="text-[14px] text-nike-mute dark:text-nike-stone mt-0.5">
          Manage contact info, check-in schedules, location details, and property rules
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-nike-canvas dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card p-8 space-y-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[14px] font-medium text-nike-ink dark:text-white mb-1.5">Hotel Name</label>
            <input type="text" value={hotel.hotel_name} onChange={e => setHotel({ ...hotel, hotel_name: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-[14px] font-medium text-nike-ink dark:text-white mb-1.5">Phone Number</label>
            <input type="tel" value={hotel.phone} onChange={e => setHotel({ ...hotel, phone: e.target.value })} className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[14px] font-medium text-nike-ink dark:text-white mb-1.5">Email Address</label>
            <input type="email" value={hotel.email} onChange={e => setHotel({ ...hotel, email: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-[14px] font-medium text-nike-ink dark:text-white mb-1.5">Parking Details</label>
            <input type="text" value={hotel.parking} onChange={e => setHotel({ ...hotel, parking: e.target.value })} className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[14px] font-medium text-nike-ink dark:text-white mb-1.5">Check-in Time</label>
            <input type="text" value={hotel.check_in_time} onChange={e => setHotel({ ...hotel, check_in_time: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-[14px] font-medium text-nike-ink dark:text-white mb-1.5">Check-out Time</label>
            <input type="text" value={hotel.check_out_time} onChange={e => setHotel({ ...hotel, check_out_time: e.target.value })} className={inputClass} />
          </div>
        </div>

        <div>
          <label className="block text-[14px] font-medium text-nike-ink dark:text-white mb-1.5">Address</label>
          <input type="text" value={hotel.address} onChange={e => setHotel({ ...hotel, address: e.target.value })} className={inputClass} />
        </div>

        <div>
          <label className="block text-[14px] font-medium text-nike-ink dark:text-white mb-1.5">Property Description</label>
          <textarea rows={3} value={hotel.description || ''} onChange={e => setHotel({ ...hotel, description: e.target.value })} className="w-full p-3 bg-nike-soft-cloud dark:bg-nike-dark-card border-0 text-nike-ink dark:text-white text-[14px] focus:outline-none focus:ring-2 focus:ring-nike-ink rounded-none" />
        </div>

        <div>
          <label className="block text-[14px] font-medium text-nike-ink dark:text-white mb-1.5">Property Policies</label>
          <textarea rows={3} value={hotel.policies} onChange={e => setHotel({ ...hotel, policies: e.target.value })} className="w-full p-3 bg-nike-soft-cloud dark:bg-nike-dark-card border-0 text-nike-ink dark:text-white text-[14px] focus:outline-none focus:ring-2 focus:ring-nike-ink rounded-none" />
        </div>

        <button type="submit" className="bg-nike-ink dark:bg-white text-white dark:text-nike-ink text-[14px] font-medium px-8 py-3.5 rounded-full hover:opacity-80 transition-opacity flex items-center gap-2">
          <Save className="w-4 h-4" /> Save Information
        </button>

      </form>

    </div>
  );
};
