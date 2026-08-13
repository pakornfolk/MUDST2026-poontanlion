import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Search, SlidersHorizontal, RotateCcw, CheckCircle2 } from 'lucide-react';
import { RoomCard } from '../../components/common/RoomCard';
import { Room } from '../../types';
import { getRooms } from '../../services/api';

export const Home: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [floorFilter, setFloorFilter] = useState('all');
  const [roomTypeFilter, setRoomTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('Available'); // default to Available for guests
  const [priceFilter, setPriceFilter] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roomData = await getRooms();
        setRooms(roomData);
      } catch (err) {
        console.error('Failed to load rooms:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleReset = () => {
    setSearchQuery('');
    setFloorFilter('all');
    setRoomTypeFilter('all');
    setStatusFilter('all');
    setPriceFilter('all');
  };

  const filteredRooms = rooms.filter(room => {
    // Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchNum = room.roomNumber.toLowerCase().includes(q);
      const matchName = room.roomName.toLowerCase().includes(q);
      const matchType = room.roomType.toLowerCase().includes(q);
      if (!matchNum && !matchName && !matchType) return false;
    }

    // Floor filter
    if (floorFilter !== 'all' && room.floor.toString() !== floorFilter) return false;

    // Room type filter
    if (roomTypeFilter !== 'all' && room.roomType !== roomTypeFilter) return false;

    // Status filter
    if (statusFilter !== 'all' && room.status !== statusFilter) return false;

    // Price filter
    if (priceFilter === 'under6k' && room.price >= 6000) return false;
    if (priceFilter === '6k-7k' && (room.price < 6000 || room.price > 7000)) return false;
    if (priceFilter === 'above7k' && room.price <= 7000) return false;

    return true;
  });

  const availableCount = rooms.filter(r => r.status === 'Available').length;
  const isFiltered = searchQuery || floorFilter !== 'all' || roomTypeFilter !== 'all' || statusFilter !== 'all' || priceFilter !== 'all';

  return (
    <div className="pb-16 space-y-12">

      {/* HERO SECTION */}
      <section className="relative bg-nike-ink text-white py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/rooms/room_standard.png"
            alt="Victory Apartment"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-600/30 border border-blue-400/30 text-blue-300 px-4 py-1.5 rounded-full text-xs font-semibold">
              <Building2 className="w-4 h-4" /> 24 Modern Apartment Units in Bangkok
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-white drop-shadow-md">
              POONTAN APARTMENT<br />BANGKOK
            </h1>

            <p className="text-base md:text-lg text-slate-200 leading-relaxed">
              Premium 2-floor apartment complex with 24 units. Fully furnished rooms with balcony, air conditioning, water heater, high-speed Wi-Fi, and 24/7 security access.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/rooms"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-full transition-colors flex items-center gap-2"
              >
                Browse All 24 Units <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* REPLACED FEATURES WITH ADVANCED FILTER BAR */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="bg-nike-canvas dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-nike-hairline-soft dark:border-nike-dark-card pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-blue-600/10 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-nike-ink dark:text-white">Unit Search & Filter</h3>
                <p className="text-xs text-slate-500 dark:text-slate-300">Filter across all 24 units by floor, room type, rent price, and occupancy status</p>
              </div>
            </div>

            {isFiltered && (
              <button
                onClick={handleReset}
                className="px-3.5 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-semibold transition-all active:scale-95 flex items-center gap-1.5 shadow-2xs self-start sm:self-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset All Filters
              </button>
            )}
          </div>

          {/* FILTER CONTROLS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            
            {/* Search Input */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider block">Search Unit</label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400 dark:text-slate-400" />
                <input
                  type="text"
                  placeholder="Unit no. or type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs font-medium bg-slate-100 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Floor Select */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider block">Floor Level</label>
              <select
                value={floorFilter}
                onChange={(e) => setFloorFilter(e.target.value)}
                className="w-full px-3 py-2.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-all"
              >
                <option value="all">All Floors (Floor 1 & 2)</option>
                <option value="1">Floor 1 (Units 101–112)</option>
                <option value="2">Floor 2 (Units 201–212)</option>
              </select>
            </div>

            {/* Room Type Select */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider block">Room Type</label>
              <select
                value={roomTypeFilter}
                onChange={(e) => setRoomTypeFilter(e.target.value)}
                className="w-full px-3 py-2.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-all"
              >
                <option value="all">All Room Types</option>
                <option value="Standard Studio">Standard Studio</option>
                <option value="Deluxe Studio">Deluxe Studio</option>
                <option value="1-Bedroom Suite">1-Bedroom Suite</option>
                <option value="Corner Suite">Corner Suite</option>
              </select>
            </div>

            {/* Rent Price Select */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider block">Monthly Rent Rate</label>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full px-3 py-2.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-all"
              >
                <option value="all">All Rent Rates</option>
                <option value="under6k">Under ฿6,000 / month</option>
                <option value="6k-7k">฿6,000 – ฿7,000 / month</option>
                <option value="above7k">Above ฿7,000 / month</option>
              </select>
            </div>

            {/* Availability Status Select */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider block">Occupancy Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-all"
              >
                <option value="all">Show All Statuses</option>
                <option value="Available">Available for Rent</option>
                <option value="Occupied">Currently Occupied</option>
                <option value="Reserved">Reserved</option>
                <option value="Maintenance">Under Maintenance</option>
              </select>
            </div>

          </div>

        </div>
      </section>

      {/* FILTERED ROOMS LISTING */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between pb-6 border-b border-nike-hairline dark:border-nike-dark-card mb-6">
          <div>
            <h2 className="text-2xl font-bold text-nike-ink dark:text-white flex items-center gap-2">
              Apartment Units {statusFilter === 'Available' ? 'Available for Rent' : 'Catalog'}
            </h2>
            <p className="text-xs text-nike-mute dark:text-nike-stone mt-1">
              Showing {filteredRooms.length} of {rooms.length} total units ({availableCount} currently available)
            </p>
          </div>
          <Link to="/rooms" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            View All Units &rarr;
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-16 text-nike-mute">Loading units...</div>
        ) : filteredRooms.length === 0 ? (
          <div className="text-center py-16 bg-nike-canvas dark:bg-nike-dark-elevated rounded-2xl border border-nike-hairline dark:border-nike-dark-card space-y-3">
            <CheckCircle2 className="w-10 h-10 text-nike-mute mx-auto opacity-50" />
            <p className="text-sm font-semibold text-nike-ink dark:text-white">No apartment units match your filter criteria.</p>
            <button
              onClick={handleReset}
              className="text-xs text-blue-600 font-semibold hover:underline"
            >
              Reset filters to see all available units
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredRooms.map(room => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
};
