import React, { useEffect, useState } from 'react';
import { RoomCard } from '../../components/common/RoomCard';
import { Room } from '../../types';
import { getRooms } from '../../services/api';
import { Building2, Filter } from 'lucide-react';

export const Rooms: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [floorFilter, setFloorFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getRooms();
        setRooms(data);
      } catch (err) {
        console.error('Failed to fetch rooms:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const filteredRooms = rooms.filter(room => {
    if (floorFilter !== 'all' && room.floor.toString() !== floorFilter) return false;
    if (statusFilter !== 'all' && room.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-10 space-y-8">
      {/* HEADER */}
      <div className="border-b border-nike-hairline dark:border-nike-dark-card pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-nike-ink dark:text-white flex items-center gap-2.5">
            <Building2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            Apartment Units Listing (24 Units)
          </h1>
          <p className="text-sm text-nike-mute dark:text-nike-stone mt-1">
            Explore 12 units on Floor 1 and 12 units on Floor 2
          </p>
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-nike-mute dark:text-nike-stone">
            <Filter className="w-4 h-4" /> Filters:
          </div>

          <select
            value={floorFilter}
            onChange={(e) => setFloorFilter(e.target.value)}
            className="px-3 py-2 text-xs font-semibold rounded-xl bg-nike-soft-cloud dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card text-nike-ink dark:text-white focus:outline-none"
          >
            <option value="all">All Floors</option>
            <option value="1">Floor 1 (Units 101-112)</option>
            <option value="2">Floor 2 (Units 201-212)</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs font-semibold rounded-xl bg-nike-soft-cloud dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card text-nike-ink dark:text-white focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
            <option value="Reserved">Reserved</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>
      </div>

      {/* GRID */}
      {loading ? (
        <div className="text-center py-20 text-nike-mute">Loading units...</div>
      ) : filteredRooms.length === 0 ? (
        <div className="text-center py-20 text-nike-mute">No units match the selected filters.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredRooms.map(room => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      )}
    </div>
  );
};
