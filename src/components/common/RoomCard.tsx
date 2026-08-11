import React from 'react';
import { Link } from 'react-router-dom';
import { Room } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { CheckCircle2, BedDouble, Maximize2 } from 'lucide-react';

export const RoomCard: React.FC<{ room: Room }> = ({ room }) => {
  const isAvailable = room.status === 'Available';

  return (
    <div className="bg-nike-canvas dark:bg-nike-dark-card border border-nike-hairline dark:border-nike-dark-card rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group">
      <div className="relative h-48 overflow-hidden bg-nike-soft-cloud dark:bg-nike-dark-elevated">
        <img
          src={room.coverImage || '/rooms/room_standard.png'}
          alt={room.roomName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-nike-ink/80 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
            Floor {room.floor} · Unit {room.roomNumber}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
            isAvailable ? 'bg-emerald-500 text-white' : room.status === 'Reserved' ? 'bg-amber-500 text-white' : 'bg-rose-500 text-white'
          }`}>
            {room.status}
          </span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="font-bold text-base text-nike-ink dark:text-white line-clamp-1">
              {room.roomName}
            </h3>
          </div>
          <p className="text-xs text-nike-mute dark:text-nike-stone line-clamp-2 leading-relaxed">
            {room.description}
          </p>

          <div className="flex items-center gap-4 text-xs text-nike-stone mt-3 pt-3 border-t border-nike-hairline dark:border-nike-dark-elevated">
            <span className="flex items-center gap-1">
              <Maximize2 className="w-3.5 h-3.5 text-blue-500" /> {room.sizeSqm} sqm
            </span>
            <span className="flex items-center gap-1">
              <BedDouble className="w-3.5 h-3.5 text-blue-500" /> {room.bedType}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div>
            <span className="text-[11px] text-nike-stone block">Monthly Rent</span>
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {formatCurrency(room.price)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/rooms/${room.id}`}
              className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-nike-soft-cloud dark:bg-nike-dark-elevated hover:bg-nike-hairline text-nike-ink dark:text-white transition-colors"
            >
              Details
            </Link>
            {isAvailable && (
              <Link
                to={`/booking/${room.id}`}
                className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-xs"
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
