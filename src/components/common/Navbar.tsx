import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Sun, Moon, Globe, Heart, Bell, User as UserIcon, LogOut, 
  Shield, Menu, X, Volume2, VolumeX, ChevronDown, Search 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useNotifications } from '../../context/NotificationContext';
import { getWishlist } from '../../services/api';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, role, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { notifications, unreadCount, soundEnabled, setSoundEnabled, markAllRead } = useNotifications();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const wishlistCount = getWishlist().length;

  const navLinks = [
    { name: t('home'), path: '/' },
    { name: t('rooms'), path: '/rooms' },
    { name: t('about'), path: '/about' },
    { name: t('contact'), path: '/contact' },
    { name: t('faq'), path: '/faq' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* UTILITY BAR — Nike-style top strip */}
      <div className="bg-nike-soft-cloud dark:bg-nike-dark-elevated text-nike-ink dark:text-nike-stone text-[12px] font-medium hidden md:block">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-9 flex items-center justify-between">
          <span className="text-nike-mute dark:text-nike-stone">Victory Room Hotel</span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLanguage(language === 'en' ? 'th' : 'en')}
              className="flex items-center gap-1 hover:text-nike-ink dark:hover:text-white transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'EN' : 'TH'}</span>
            </button>
            <span className="text-nike-hairline">|</span>
            <button
              onClick={toggleTheme}
              className="hover:text-nike-ink dark:hover:text-white transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
            <span className="text-nike-hairline">|</span>
            <Link to="/contact" className="hover:text-nike-ink dark:hover:text-white transition-colors">Help</Link>
            {!user && (
              <>
                <span className="text-nike-hairline">|</span>
                <Link to="/register" className="hover:text-nike-ink dark:hover:text-white transition-colors">Join Us</Link>
                <span className="text-nike-hairline">|</span>
                <Link to="/login" className="hover:text-nike-ink dark:hover:text-white transition-colors">Sign In</Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* PRIMARY NAV — Nike 56px height, ink on canvas */}
      <header className="sticky top-0 z-50 bg-nike-canvas dark:bg-nike-dark-surface border-b border-nike-hairline-soft dark:border-nike-dark-elevated transition-colors duration-200" style={{ boxShadow: 'inset 0 -1px 0 var(--tw-border-opacity, 1) #e5e5e5' }}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-14 flex items-center justify-between">
          
          {/* LOGO — Minimal monochrome lockup */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-8 h-8 bg-nike-ink dark:bg-white flex items-center justify-center rounded-none">
              <span className="font-display text-xl text-white dark:text-nike-ink leading-none">V</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[15px] tracking-tight text-nike-ink dark:text-white leading-tight">
                Victory Room Hotel
              </span>
              <span className="text-[9px] tracking-wider uppercase text-nike-mute dark:text-nike-stone font-medium leading-none">
                Bangkok
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV LINKS — centered, body-strong weight */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[15px] font-medium transition-colors py-4 border-b-2 ${
                  isActive(link.path)
                    ? 'border-nike-ink dark:border-white text-nike-ink dark:text-white'
                    : 'border-transparent text-nike-ink dark:text-nike-stone hover:text-nike-mute dark:hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* RIGHT CONTROLS */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* SEARCH PILL ICON */}
            <Link
              to="/rooms"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-nike-soft-cloud dark:bg-nike-dark-elevated text-nike-ink dark:text-white hover:bg-nike-hairline-soft transition-colors"
              title="Search Rooms"
            >
              <Search className="w-[18px] h-[18px]" />
            </Link>

            {/* WISHLIST ICON */}
            <Link
              to="/wishlist"
              className="relative w-10 h-10 flex items-center justify-center rounded-full bg-nike-soft-cloud dark:bg-nike-dark-elevated text-nike-ink dark:text-white hover:bg-nike-hairline-soft transition-colors"
              title="Wishlist"
            >
              <Heart className="w-[18px] h-[18px]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-nike-ink dark:bg-white text-white dark:text-nike-ink text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* NOTIFICATION BELL DROPDOWN */}
            <div className="relative">
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="relative w-10 h-10 flex items-center justify-center rounded-full bg-nike-soft-cloud dark:bg-nike-dark-elevated text-nike-ink dark:text-white hover:bg-nike-hairline-soft transition-colors"
              >
                <Bell className="w-[18px] h-[18px]" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-nike-sale text-white text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-nike-canvas dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card rounded-none z-50 p-5">
                  <div className="flex items-center justify-between border-b border-nike-hairline-soft dark:border-nike-dark-card pb-3 mb-3">
                    <span className="font-medium text-[14px] text-nike-ink dark:text-white flex items-center gap-1.5">
                      <Bell className="w-4 h-4" /> Alerts ({unreadCount})
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSoundEnabled(!soundEnabled)}
                        className="text-nike-mute hover:text-nike-ink dark:hover:text-white"
                        title={soundEnabled ? 'Disable sound' : 'Enable sound'}
                      >
                        {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                      </button>
                      {unreadCount > 0 && (
                        <button onClick={markAllRead} className="text-[12px] text-nike-ink dark:text-white underline font-medium">
                          Mark read
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="max-h-60 overflow-y-auto space-y-2 text-left">
                    {notifications.length === 0 ? (
                      <p className="text-[13px] text-nike-mute text-center py-4">No notifications yet</p>
                    ) : (
                      notifications.slice(0, 5).map(n => (
                        <div
                          key={n.id}
                          className={`p-3 text-[13px] border-l-2 ${
                            n.is_read ? 'border-nike-hairline bg-nike-soft-cloud dark:bg-nike-dark-card' : 'border-nike-ink bg-white dark:bg-nike-dark-surface'
                          }`}
                        >
                          <p className="font-medium text-nike-ink dark:text-white">{n.title}</p>
                          <p className="text-nike-mute dark:text-nike-stone mt-0.5">{n.message}</p>
                          <span className="text-[11px] text-nike-stone mt-1 block">
                            {new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      ))
                    )}
                  </div>

                  {role === 'admin' && (
                    <Link
                      to="/admin/notifications"
                      onClick={() => setNotifDropdownOpen(false)}
                      className="block text-center text-[13px] font-medium text-nike-ink dark:text-white mt-3 pt-3 border-t border-nike-hairline-soft dark:border-nike-dark-card underline"
                    >
                      View Notification Center
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* USER PROFILE MENU */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 rounded-full bg-nike-soft-cloud dark:bg-nike-dark-elevated px-3 py-1.5 hover:bg-nike-hairline-soft dark:hover:bg-nike-dark-card transition-colors"
                >
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                  alt={user.fullname}
                  className="w-7 h-7 rounded-full object-cover"
                />
                <span className="text-[13px] font-medium text-nike-ink dark:text-white max-w-[100px] truncate">
                  {user.fullname.split(' ')[0]}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-nike-mute" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-nike-canvas dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card z-50 py-2">
                    <div className="px-4 py-2.5 border-b border-nike-hairline-soft dark:border-nike-dark-card">
                      <p className="text-[13px] font-medium text-nike-ink dark:text-white">{user.fullname}</p>
                      <p className="text-[11px] text-nike-mute dark:text-nike-stone truncate">{user.email}</p>
                    </div>
                    {role === 'admin' ? (
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-[13px] font-medium text-nike-ink dark:text-white hover:bg-nike-soft-cloud dark:hover:bg-nike-dark-card"
                      >
                        <Shield className="w-4 h-4" /> Admin Dashboard
                      </Link>
                    ) : (
                      <>
                        <Link
                          to="/user/dashboard"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-[13px] font-medium text-nike-ink dark:text-white hover:bg-nike-soft-cloud dark:hover:bg-nike-dark-card"
                        >
                          <UserIcon className="w-4 h-4" /> Dashboard
                        </Link>
                        <Link
                          to="/user/bookings"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-[13px] font-medium text-nike-ink dark:text-white hover:bg-nike-soft-cloud dark:hover:bg-nike-dark-card"
                        >
                          {t('myBookings')}
                        </Link>
                      </>
                    )}
                    <Link
                      to="/user/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-[13px] font-medium text-nike-ink dark:text-white hover:bg-nike-soft-cloud dark:hover:bg-nike-dark-card"
                    >
                      {t('profile')}
                    </Link>
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        logout();
                        navigate('/login');
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-[13px] font-medium text-nike-sale hover:bg-red-50 dark:hover:bg-red-950/30 text-left border-t border-nike-hairline-soft dark:border-nike-dark-card"
                    >
                      <LogOut className="w-4 h-4" /> {t('logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-nike-ink dark:bg-white text-white dark:text-nike-ink hover:opacity-80 text-[14px] font-medium px-6 py-2.5 rounded-full transition-opacity"
              >
                {t('login')}
              </Link>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setLanguage(language === 'en' ? 'th' : 'en')}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-nike-soft-cloud dark:bg-nike-dark-elevated text-[12px] font-medium text-nike-ink dark:text-white"
            >
              {language === 'en' ? 'EN' : 'TH'}
            </button>
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-nike-soft-cloud dark:bg-nike-dark-elevated text-nike-ink dark:text-white"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 flex items-center justify-center text-nike-ink dark:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* MOBILE DRAWER — full-height left slide-in */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-nike-canvas dark:bg-nike-dark-surface border-t border-nike-hairline-soft dark:border-nike-dark-elevated px-6 pt-4 pb-8 space-y-1 animate-fadeIn">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-[16px] font-medium text-nike-ink dark:text-white py-3 border-b border-nike-hairline-soft dark:border-nike-dark-elevated ${
                  isActive(link.path) ? 'border-b-2 border-nike-ink dark:border-white' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4">
              {user ? (
                <div className="space-y-2">
                  <Link
                    to={role === 'admin' ? '/admin/dashboard' : '/user/dashboard'}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center bg-nike-ink dark:bg-white text-white dark:text-nike-ink py-3 font-medium text-[14px] rounded-full"
                  >
                    {role === 'admin' ? 'Admin Dashboard' : 'User Dashboard'}
                  </Link>
                  <button
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="block w-full text-center border border-nike-sale text-nike-sale py-3 font-medium text-[14px] rounded-full"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center bg-nike-ink dark:bg-white text-white dark:text-nike-ink py-3 font-medium text-[14px] rounded-full"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
