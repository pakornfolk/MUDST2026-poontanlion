import React from 'react';
import { Link } from 'react-router-dom';
import { Room } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { CheckCircle2, BedDouble, Maximize2 } from 'lucide-react';

export const RoomCard: React.FC<{ room: Room }> = ({ room }) => {
  const isAvailable = room.status === 'Available';

  return (
    <div className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group shadow-2xs">
      <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-900">
        <img
          src={room.coverImage || '/rooms/room_standard.png'}
          alt={room.roomName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-2xs">
            Floor {room.floor} · Unit {room.roomNumber}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className={`text-[11px] font-bold px-3 py-1 rounded-full shadow-2xs ${
            isAvailable ? 'bg-emerald-500 text-white' : room.status === 'Reserved' ? 'bg-amber-500 text-white' : 'bg-rose-500 text-white'
          }`}>
            {room.status}
          </span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white line-clamp-1">
              {room.roomName}
            </h3>
          </div>
          <p className="text-xs font-medium text-slate-600 dark:text-slate-200 line-clamp-2 leading-relaxed">
            {room.description}
          </p>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-700 dark:text-slate-200 mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
            <span className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> {room.sizeSqm} sqm
            </span>
            <span className="flex items-center gap-1.5">
              <BedDouble className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" /> {room.bedType}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div>
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider block">Monthly Rent</span>
            <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
              {formatCurrency(room.price)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/rooms/${room.id}`}
              className="px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white transition-all shadow-2xs"
            >
              Details
            </Link>
            {isAvailable && (
              <Link
                to={`/booking/${room.id}`}
                className="px-3.5 py-2 text-xs font-bold rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-xs"
              >
                Book
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
