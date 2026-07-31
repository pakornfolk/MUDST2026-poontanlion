import React, { useEffect, useState } from 'react';
import { Plus, Edit3, Trash2, Search } from 'lucide-react';
import { Room, RoomStatus } from '../../types';
import { getRooms, saveRoom, deleteRoom as apiDeleteRoom } from '../../services/api';
import { formatCurrency } from '../../utils/formatters';
import { RoomModal } from '../../components/admin/RoomModal';
import { toast } from 'sonner';

export const RoomManagement: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const fetchRooms = async () => {
    const list = await getRooms();
    setRooms(list);
    applyFilters(list, searchQuery, statusFilter);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const applyFilters = (list: Room[], query: string, status: string) => {
    let result = [...list];
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(r => r.room_name.toLowerCase().includes(q) || r.room_number.includes(q) || r.room_type.toLowerCase().includes(q));
    }
    if (status !== 'All') {
      result = result.filter(r => r.status === status);
    }
    setFilteredRooms(result);
  };

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    applyFilters(rooms, q, statusFilter);
  };

  const handleStatusFilterChange = (st: string) => {
    setStatusFilter(st);
    applyFilters(rooms, searchQuery, st);
  };

  const handleQuickStatusChange = async (roomId: string, newStatus: RoomStatus) => {
    await saveRoom({ id: roomId, status: newStatus });
    toast.success(`Updated room status to ${newStatus}`);
    fetchRooms();
  };

  const handleDelete = async (roomId: string, roomNo: string) => {
    if (window.confirm(`Are you sure you want to delete Room ${roomNo}?`)) {
      await apiDeleteRoom(roomId);
      toast.info(`Deleted Room ${roomNo}`);
      fetchRooms();
    }
  };

  const handleSaveModal = async (roomData: Partial<Room>) => {
    await saveRoom(roomData);
    toast.success(roomData.id ? 'Room updated successfully' : 'New room created');
    fetchRooms();
  };

  return (
    <div className="space-y-8 pb-10">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-nike-hairline dark:border-nike-dark-card pb-4">
        <div>
          <h1 className="text-[28px] font-medium text-nike-ink dark:text-white">
            Room Inventory
          </h1>
          <p className="text-[14px] text-nike-mute dark:text-nike-stone mt-0.5">
            Manage rooms, status, pricing, and amenities
          </p>
        </div>

        <button
          onClick={() => { setSelectedRoom(null); setModalOpen(true); }}
          className="bg-nike-ink dark:bg-white text-white dark:text-nike-ink text-[14px] font-medium px-6 py-3 rounded-full hover:opacity-80 transition-opacity flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add New Room
        </button>
      </div>

      {/* CONTROLS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2 relative">
          <Search className="w-4 h-4 text-nike-mute absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => handleSearchChange(e.target.value)}
            placeholder="Search by room name, number, or category..."
            className="w-full pl-10 p-3 bg-nike-soft-cloud dark:bg-nike-dark-card border-0 text-nike-ink dark:text-white text-[14px] rounded-[24px] focus:outline-none focus:ring-2 focus:ring-nike-ink"
          />
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={e => handleStatusFilterChange(e.target.value)}
            className="w-full p-3 bg-nike-soft-cloud dark:bg-nike-dark-card border-0 text-nike-ink dark:text-white text-[14px] rounded-[24px] focus:outline-none focus:ring-2 focus:ring-nike-ink appearance-none cursor-pointer"
          >
            <option value="All">All Room Statuses</option>
            <option value="Available">Available</option>
            <option value="Reserved">Reserved</option>
            <option value="Full">Full</option>
            <option value="Occupied">Occupied</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-nike-canvas dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card overflow-x-auto">
        <table className="w-full text-left border-collapse text-[14px]">
          <thead>
            <tr className="border-b border-nike-hairline-soft dark:border-nike-dark-card text-nike-mute dark:text-nike-stone font-medium text-[13px]">
              <th className="p-4">No.</th>
              <th className="p-4">Room Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price / Night</th>
              <th className="p-4">Capacity</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-nike-hairline-soft dark:divide-nike-dark-card">
            {filteredRooms.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-nike-mute">
                  No rooms found matching query
                </td>
              </tr>
            ) : (
              filteredRooms.map(room => (
                <tr key={room.id} className="hover:bg-nike-soft-cloud dark:hover:bg-nike-dark-card/50 transition-colors">
                  <td className="p-4 font-medium text-nike-ink dark:text-white">
                    {room.room_number}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={room.cover_image} alt="" className="w-10 h-10 object-cover bg-nike-soft-cloud" />
                      <span className="font-medium text-nike-ink dark:text-white">{room.room_name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-nike-mute dark:text-nike-stone">{room.room_type}</td>
                  <td className="p-4 font-medium text-nike-ink dark:text-white">
                    {formatCurrency(room.price)}
                  </td>
                  <td className="p-4 text-nike-mute dark:text-nike-stone">{room.capacity} Guests ({room.size_sqm} m²)</td>
                  <td className="p-4">
                    <select
                      value={room.status}
                      onChange={e => handleQuickStatusChange(room.id, e.target.value as RoomStatus)}
                      className={`p-1.5 text-[12px] font-medium rounded-full border-0 focus:outline-none cursor-pointer ${
                        room.status === 'Available' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        room.status === 'Reserved' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' :
                        'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }`}
                    >
                      <option value="Available">Available</option>
                      <option value="Reserved">Reserved</option>
                      <option value="Full">Full</option>
                      <option value="Occupied">Occupied</option>
                      <option value="Maintenance">Maintenance</option>
                    </select>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => { setSelectedRoom(room); setModalOpen(true); }}
                      className="p-2 text-nike-mute hover:text-nike-ink dark:hover:text-white transition-colors"
                      title="Edit Room"
                    >
                      <Edit3 className="w-4 h-4 inline" />
                    </button>
                    <button
                      onClick={() => handleDelete(room.id, room.room_number)}
                      className="p-2 text-nike-sale hover:opacity-80 transition-opacity"
                      title="Delete Room"
                    >
                      <Trash2 className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <RoomModal
        room={selectedRoom}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveModal}
      />

    </div>
  );
};
