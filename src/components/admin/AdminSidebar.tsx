import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, FileSignature, FileText, Wrench,
  BedDouble, History, Bell, ArrowLeft, Building2, CalendarCheck
} from 'lucide-react';
import { getNotifications, getBookings } from '../../services/api';

export const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const [unreadNotifCount, setUnreadNotifCount] = useState(0);
  const [pendingBookingCount, setPendingBookingCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const notifs = await getNotifications();
        setUnreadNotifCount(notifs.filter(n => !n.isRead).length);

        const bookings = await getBookings();
        setPendingBookingCount(bookings.filter(b => b.status === 'Pending').length);
      } catch (err) {
        console.error('Failed to fetch sidebar counts:', err);
      }
    };
    fetchCounts();
    const interval = setInterval(fetchCounts, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { name: 'Dashboard (24 Units)', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Tenants & Contracts', path: '/admin/tenants', icon: FileSignature },
    { name: 'Utility Bills & Receipts', path: '/admin/utility-bills', icon: FileText },
    { name: 'Maintenance & Supplies', path: '/admin/maintenance', icon: Wrench },
    { name: 'Apartment Units', path: '/admin/rooms', icon: BedDouble },
    { name: 'Booking Requests', path: '/admin/bookings', icon: CalendarCheck, badge: pendingBookingCount },
    { name: 'Activity Log', path: '/admin/activity-log', icon: History },
    { name: 'Notifications', path: '/admin/notifications', icon: Bell, badge: unreadNotifCount },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-64 bg-nike-ink text-white shrink-0 flex flex-col justify-between min-h-screen">

      <div className="p-5 space-y-6">

        <div className="px-2 py-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-600 flex items-center justify-center rounded-lg">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-[14px] font-bold text-white leading-tight">Apartment Management</h2>
              <span className="text-[10px] text-nike-stone leading-none">Admin Control Panel</span>
            </div>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-3 py-2.5 text-[13px] font-medium rounded-xl transition-all ${
                  active
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'text-nike-stone hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${active ? 'text-white' : ''}`} />
                  <span>{item.name}</span>
                </div>

                {Boolean(item.badge && item.badge > 0) && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    active ? 'bg-white text-blue-600' : 'bg-rose-500 text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

      </div>

      <div className="p-5 border-t border-white/10">
        <Link
          to="/"
          className="flex items-center justify-center gap-2 w-full bg-white/10 hover:bg-white/20 text-white text-[13px] font-medium py-2.5 rounded-full transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Public Site
        </Link>
      </div>

    </aside>
  );
};
