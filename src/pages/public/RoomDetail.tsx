import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Room } from '../../types';
import { getRoomById } from '../../services/api';
import { formatCurrency } from '../../utils/formatters';
import { Building2, BedDouble, Maximize2, Check, ArrowLeft, CalendarCheck, Users, ShieldCheck } from 'lucide-react';

export const RoomDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    if (id) {
      getRoomById(id).then(res => {
        setRoom(res);
        if (res) {
          const gallery = typeof res.gallery === 'string'
            ? JSON.parse(res.gallery || '[]')
            : (Array.isArray(res.gallery) ? res.gallery : []);
          setSelectedImage(res.coverImage || gallery[0] || '/rooms/room_standard.png');
        }
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return <div className="text-center py-20 text-nike-mute">Loading unit details...</div>;
  }

  if (!room) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-xl font-bold">Unit Not Found</h2>
        <Link to="/rooms" className="text-blue-600 underline">Back to Units</Link>
      </div>
    );
  }

  const amenitiesList: string[] = typeof room.amenities === 'string'
    ? JSON.parse(room.amenities || '[]')
    : (Array.isArray(room.amenities) ? room.amenities : []);

  const galleryList: string[] = typeof room?.gallery === 'string'
    ? JSON.parse(room.gallery || '[]')
    : (Array.isArray(room?.gallery) ? room.gallery : []);

  const allImages: string[] = Array.from(new Set([room?.coverImage, ...galleryList])).filter((img): img is string => Boolean(img));

  return (
    <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-10 space-y-8">

      <Link to="/rooms" className="inline-flex items-center gap-2 text-xs font-semibold text-nike-mute hover:text-nike-ink dark:hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Units Catalog
      </Link>

      {/* MULTI-PHOTO INTERACTIVE GALLERY */}
      <div className="space-y-3">
        <div className="w-full h-80 md:h-[450px] rounded-2xl overflow-hidden bg-nike-soft-cloud dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card shadow-sm">
          <img
            src={selectedImage || room.coverImage || '/rooms/room_standard.png'}
            alt={room.roomName}
            className="w-full h-full object-cover transition-all duration-300"
          />
        </div>

        {/* THUMBNAIL SELECTOR */}
        {allImages.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {allImages.map((imgUrl, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(imgUrl)}
                className={`w-24 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                  selectedImage === imgUrl ? 'border-blue-600 ring-2 ring-blue-600/30' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={imgUrl} alt={`Thumbnail ${i}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* DETAILS & SPECS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          
          {/* HEADER TITLE */}
          <div className="space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="bg-blue-600 text-white text-xs font-bold px-3.5 py-1 rounded-full">
                Floor {room.floor} · Unit {room.roomNumber}
              </span>
              <span className="bg-nike-soft-cloud dark:bg-nike-dark-elevated text-nike-ink dark:text-white border border-nike-hairline dark:border-nike-dark-card text-xs font-bold px-3 py-1 rounded-full">
                {room.roomType}
              </span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                room.status === 'Available' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
              }`}>
                {room.status}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-nike-ink dark:text-white">{room.roomName}</h1>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-100 leading-relaxed bg-slate-100 dark:bg-slate-800/90 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
              {room.description}
            </p>
          </div>

          {/* KEY SPECS GRID (Bed Type, Capacity, Size) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-slate-100 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-2xl shadow-sm">
            <div className="flex items-center gap-3 p-2">
              <div className="w-10 h-10 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center shrink-0">
                <Maximize2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block uppercase tracking-wider">Room Size</span>
                <span className="font-extrabold text-base text-slate-900 dark:text-white">{room.sizeSqm} m²</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 border-t sm:border-t-0 sm:border-l border-slate-300 dark:border-slate-700 pt-3 sm:pt-0 sm:pl-4">
              <div className="w-10 h-10 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center shrink-0">
                <BedDouble className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block uppercase tracking-wider">Bed Setup</span>
                <span className="font-extrabold text-base text-slate-900 dark:text-white">{room.bedType || 'King Bed'}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 border-t sm:border-t-0 sm:border-l border-slate-300 dark:border-slate-700 pt-3 sm:pt-0 sm:pl-4">
              <div className="w-10 h-10 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block uppercase tracking-wider">Guest Capacity</span>
                <span className="font-extrabold text-base text-slate-900 dark:text-white">Max {room.capacity} Guests</span>
              </div>
            </div>
          </div>

          {/* AMENITIES */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-nike-ink dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" /> Included Unit Amenities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {amenitiesList.map((item: string, i: number) => (
                <div key={i} className="flex items-center gap-2.5 text-xs font-semibold text-slate-800 dark:text-white p-3 bg-slate-100 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-xl shadow-2xs">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* BOOKING SIDEBAR */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 p-6 bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-2xl space-y-6 shadow-md">
            <div>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-300 block uppercase tracking-wider">Monthly Rent Rate</span>
              <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 block mt-1">
                {formatCurrency(room.price)}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-300 block mt-1.5 leading-relaxed">
                Standard monthly lease. Excludes water (18 THB/unit) and electricity (7 THB/unit).
              </span>
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex justify-between">
                <span>Building Common Fee</span>
                <span className="font-bold text-slate-900 dark:text-white">300 THB / mo</span>
              </div>
              <div className="flex justify-between">
                <span>Lease Commitment</span>
                <span className="font-bold text-slate-900 dark:text-white">Monthly / Yearly</span>
              </div>
              <div className="flex justify-between">
                <span>Security Deposit</span>
                <span className="font-bold text-slate-900 dark:text-white">2 Months Rent</span>
              </div>
            </div>

            {room.status === 'Available' ? (
              <Link
                to={`/booking/${room.id}`}
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                <CalendarCheck className="w-5 h-5" /> Book Unit
              </Link>
            ) : (
              <div className="p-3.5 text-center bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold text-xs rounded-xl border border-amber-500/20">
                Currently {room.status}
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};
