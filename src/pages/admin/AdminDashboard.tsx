import React, { useEffect, useState } from 'react';
import { 
  BedDouble, CheckCircle2, BookmarkCheck, Users, 
  DollarSign, TrendingUp, Calendar 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, Legend 
} from 'recharts';
import { Room, Booking } from '../../types';
import { getRooms, getBookings } from '../../services/api';
import { formatCurrency } from '../../utils/formatters';

const REVENUE_DATA = [
  { month: 'Jan', revenue: 450000 },
  { month: 'Feb', revenue: 520000 },
  { month: 'Mar', revenue: 610000 },
  { month: 'Apr', revenue: 580000 },
  { month: 'May', revenue: 720000 },
  { month: 'Jun', revenue: 840000 },
  { month: 'Jul', revenue: 950000 },
];

const TREND_DATA = [
  { day: 'Mon', bookings: 4 },
  { day: 'Tue', bookings: 7 },
  { day: 'Wed', bookings: 5 },
  { day: 'Thu', bookings: 9 },
  { day: 'Fri', bookings: 14 },
  { day: 'Sat', bookings: 18 },
  { day: 'Sun', bookings: 12 },
];

const COLORS = ['#007d48', '#f59e0b', '#d30005', '#111111'];

export const AdminDashboard: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setRooms(await getRooms());
      setBookings(await getBookings());
    };
    fetchData();
  }, []);

  const totalRooms = rooms.length;
  const availableRooms = rooms.filter(r => r.status === 'Available').length;
  const reservedRooms = rooms.filter(r => r.status === 'Reserved').length;
  const occupiedRooms = rooms.filter(r => r.status === 'Occupied' || r.status === 'Full').length;
  const todayBookings = bookings.filter(b => b.created_at?.startsWith(new Date().toISOString().split('T')[0])).length || bookings.length;
  
  const monthlyRevenue = bookings
    .filter(b => b.status === 'Paid')
    .reduce((sum, b) => sum + b.total_price, 0) || 385000;
    
  const annualRevenue = monthlyRevenue * 12;

  const occupancyPieData = [
    { name: 'Available', value: availableRooms || 3 },
    { name: 'Reserved', value: reservedRooms || 1 },
    { name: 'Occupied', value: occupiedRooms || 1 },
  ];

  return (
    <div className="space-y-8 pb-10">
      
      {/* HEADER */}
      <div className="border-b border-nike-hairline dark:border-nike-dark-card pb-4">
        <h1 className="text-[28px] font-medium text-nike-ink dark:text-white">
          Admin Dashboard
        </h1>
        <p className="text-[14px] text-nike-mute dark:text-nike-stone mt-0.5">
          Hotel Executive Analytics & Inventory Overview
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-nike-soft-cloud dark:bg-nike-dark-elevated p-5 space-y-2">
          <div className="flex items-center justify-between text-nike-mute">
            <span className="text-[12px] font-medium">Total Rooms</span>
            <BedDouble className="w-5 h-5 text-nike-ink dark:text-white" />
          </div>
          <span className="text-[28px] font-medium text-nike-ink dark:text-white block">{totalRooms}</span>
          <span className="text-[12px] text-nike-stone block">Total inventory</span>
        </div>

        <div className="bg-nike-soft-cloud dark:bg-nike-dark-elevated p-5 space-y-2">
          <div className="flex items-center justify-between text-nike-success">
            <span className="text-[12px] font-medium">Available</span>
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <span className="text-[28px] font-medium text-nike-success block">{availableRooms}</span>
          <span className="text-[12px] text-nike-stone block">Ready for instant booking</span>
        </div>

        <div className="bg-nike-soft-cloud dark:bg-nike-dark-elevated p-5 space-y-2">
          <div className="flex items-center justify-between text-amber-600">
            <span className="text-[12px] font-medium">Reserved</span>
            <BookmarkCheck className="w-5 h-5" />
          </div>
          <span className="text-[28px] font-medium text-amber-600 dark:text-amber-400 block">{reservedRooms}</span>
          <span className="text-[12px] text-nike-stone block">Confirmed reservations</span>
        </div>

        <div className="bg-nike-soft-cloud dark:bg-nike-dark-elevated p-5 space-y-2">
          <div className="flex items-center justify-between text-nike-sale">
            <span className="text-[12px] font-medium">Occupied</span>
            <Users className="w-5 h-5" />
          </div>
          <span className="text-[28px] font-medium text-nike-sale block">{occupiedRooms}</span>
          <span className="text-[12px] text-nike-stone block">Currently checked in</span>
        </div>

        <div className="bg-nike-soft-cloud dark:bg-nike-dark-elevated p-5 space-y-2">
          <div className="flex items-center justify-between text-nike-ink dark:text-white">
            <span className="text-[12px] font-medium">Today's Bookings</span>
            <Calendar className="w-5 h-5 text-nike-mute" />
          </div>
          <span className="text-[28px] font-medium text-nike-ink dark:text-white block">{todayBookings}</span>
          <span className="text-[12px] text-nike-stone block">Reservations processed today</span>
        </div>

        <div className="bg-nike-soft-cloud dark:bg-nike-dark-elevated p-5 space-y-2">
          <div className="flex items-center justify-between text-nike-success">
            <span className="text-[12px] font-medium">Monthly Revenue</span>
            <DollarSign className="w-5 h-5" />
          </div>
          <span className="text-[24px] font-medium text-nike-success block">{formatCurrency(monthlyRevenue)}</span>
          <span className="text-[12px] text-nike-stone block">+14.2% vs last month</span>
        </div>

        <div className="bg-nike-soft-cloud dark:bg-nike-dark-elevated p-5 space-y-2 sm:col-span-2">
          <div className="flex items-center justify-between text-nike-ink dark:text-white">
            <span className="text-[12px] font-medium">Annual Revenue Projection</span>
            <TrendingUp className="w-5 h-5 text-nike-mute" />
          </div>
          <span className="text-[28px] font-medium text-nike-ink dark:text-white block">{formatCurrency(annualRevenue)}</span>
          <span className="text-[12px] text-nike-stone block">Forecast based on current occupancy performance</span>
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <div className="lg:col-span-8 bg-nike-canvas dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card p-6 space-y-4">
          <h3 className="text-[16px] font-medium text-nike-ink dark:text-white">
            Monthly Revenue Performance (THB)
          </h3>
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_DATA}>
                <XAxis dataKey="month" stroke="#707072" fontSize={12} />
                <YAxis stroke="#707072" fontSize={12} />
                <Tooltip formatter={(val: any) => formatCurrency(Number(val))} />
                <Bar dataKey="revenue" fill="#111111" radius={[0, 0, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 bg-nike-canvas dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card p-6 space-y-4">
          <h3 className="text-[16px] font-medium text-nike-ink dark:text-white">
            Room Status Distribution
          </h3>
          <div className="h-72 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={occupancyPieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {occupancyPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend formatter={(value) => <span className="text-[12px] font-medium text-nike-mute">{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-12 bg-nike-canvas dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card p-6 space-y-4">
          <h3 className="text-[16px] font-medium text-nike-ink dark:text-white">
            Daily Booking Volume Trend
          </h3>
          <div className="h-60 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={TREND_DATA}>
                <XAxis dataKey="day" stroke="#707072" fontSize={12} />
                <YAxis stroke="#707072" fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="bookings" stroke="#111111" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
