import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, BedDouble, CalendarCheck, CreditCard, Users, 
  Building2, BarChart3, Bell, History, ArrowLeft 
} from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

export const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const { unreadCount } = useNotifications();

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Rooms', path: '/admin/rooms', icon: BedDouble },
    { name: 'Bookings', path: '/admin/bookings', icon: CalendarCheck },
    { name: 'Payments', path: '/admin/payments', icon: CreditCard },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Hotel Info', path: '/admin/hotel-info', icon: Building2 },
    { name: 'Reports', path: '/admin/reports', icon: BarChart3 },
    { name: 'Activity Log', path: '/admin/activity-log', icon: History },
    { name: 'Notifications', path: '/admin/notifications', icon: Bell, badge: unreadCount },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-60 bg-nike-ink text-white shrink-0 flex flex-col justify-between min-h-screen">
      
      <div className="p-5 space-y-6">
        
        <div className="px-2 py-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-white flex items-center justify-center">
              <span className="font-display text-lg text-nike-ink leading-none">V</span>
            </div>
            <div>
              <h2 className="text-[14px] font-medium text-white leading-tight">Victory Room Hotel</h2>
              <span className="text-[10px] text-nike-stone leading-none">Admin Console</span>
            </div>
          </div>
        </div>

        <nav className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-3 py-2.5 text-[13px] font-medium rounded-lg transition-colors ${
                  active
                    ? 'bg-white text-nike-ink'
                    : 'text-nike-stone hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${active ? 'text-nike-ink' : ''}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && item.badge > 0 ? (
                  <span className="bg-nike-sale text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                    {item.badge}
                  </span>
                ) : null}
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
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Site
        </Link>
      </div>

    </aside>
  );
};
