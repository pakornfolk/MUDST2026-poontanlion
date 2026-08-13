import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, FileSignature, FileText, Wrench,
  BedDouble, History, Bell, ArrowLeft, Building2, CalendarCheck,
  Sun, Moon, Menu, X
} from 'lucide-react';
import { getNotifications, getBookings } from '../../services/api';
import { useTheme } from '../../context/ThemeContext';

export const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [unreadNotifCount, setUnreadNotifCount] = useState(0);
  const [pendingBookingCount, setPendingBookingCount] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

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
    const interval = setInterval(fetchCounts, 10000);
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
    <>
      {/* MOBILE TOP BAR (Visible only on screens < md) */}
      <header className="md:hidden sticky top-0 z-40 bg-slate-900 text-white px-4 py-3 border-b border-slate-800 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-blue-600 flex items-center justify-center rounded-lg">
            <Building2 className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-white leading-tight">Poontan Apartment</h2>
            <span className="text-[10px] text-slate-400 leading-none">Admin Control Panel</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-800 text-amber-400 active:scale-95"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400 fill-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg bg-slate-800 text-white active:scale-95 border border-slate-700"
            aria-label="Toggle Admin Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* MOBILE SCROLLABLE TAB STRIP (For quick 1-tap navigation on mobile) */}
      <nav className="md:hidden bg-slate-950 px-3 py-2 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none z-30">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg shrink-0 transition-all ${
                active
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.name.split(' ')[0]}</span>
              {Boolean(item.badge && item.badge > 0) && (
                <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* MOBILE DRAWER OVERLAY (When Hamburger menu is open) */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex flex-col">
          <div className="bg-slate-900 text-white p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-blue-600 flex items-center justify-center rounded-lg">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-sm">Admin Navigation Menu</span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-full bg-slate-800 text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 space-y-2 overflow-y-auto flex-1 bg-slate-950">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-xl transition-all ${
                    active
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </div>
                  {Boolean(item.badge && item.badge > 0) && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-500 text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="pt-4 border-t border-slate-800 space-y-2">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold py-3 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Customer Website
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* DESKTOP SIDEBAR (Visible only on screens >= md) */}
      <aside className="hidden md:flex w-64 bg-slate-900 text-white shrink-0 flex-col justify-between min-h-screen border-r border-slate-800">
        <div className="p-5 space-y-6">
          <div className="px-2 py-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-blue-600 flex items-center justify-center rounded-lg shadow-xs">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-[14px] font-bold text-white leading-tight">Poontan Apartment</h2>
                <span className="text-[10px] text-slate-400 leading-none">Admin Control Panel</span>
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
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
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

        <div className="p-5 border-t border-slate-800 space-y-3">
          <button
            onClick={toggleTheme}
            className="flex items-center justify-between w-full bg-slate-800 hover:bg-slate-700 text-white text-[13px] font-medium px-3.5 py-2.5 rounded-xl transition-colors active:scale-98 border border-slate-700"
          >
            <span className="flex items-center gap-2">
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400 fill-amber-400" /> : <Moon className="w-4 h-4 text-indigo-300" />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </span>
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-700">
              {theme}
            </span>
          </button>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full bg-slate-800 hover:bg-slate-700 text-white text-[13px] font-medium py-2.5 rounded-full transition-colors border border-slate-700"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Public Site
          </Link>
        </div>
      </aside>
    </>
  );
};
