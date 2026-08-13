import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Sun, Moon, Shield, Menu, X, Building2, LogOut, Search, User
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Available Units', path: '/rooms' },
  ];



  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-nike-dark-surface/95 backdrop-blur-md border-b border-slate-200 dark:border-nike-dark-elevated transition-colors duration-200 shadow-2xs">

      {/* UTILITY BAR */}
      <div className="bg-slate-100/90 dark:bg-nike-dark-elevated text-slate-700 dark:text-nike-stone text-[12px] font-medium border-b border-slate-200/70 dark:border-nike-dark-card hidden md:block">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-8 flex items-center justify-between">
          <span className="text-slate-600 dark:text-nike-stone flex items-center gap-1.5 font-medium">
            <Building2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Apartment Management System (24 Units)
          </span>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-slate-500 dark:text-slate-400 text-[11px]">Bangkok · 24/7 Security & Support</span>
          </div>
        </div>
      </div>

      {/* PRIMARY NAV */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2.5 group shrink-0 bg-slate-900 dark:bg-slate-950 px-3.5 py-1.5 rounded-xl shadow-xs">
          <div className="w-8 h-8 bg-blue-600 flex items-center justify-center rounded-lg text-white font-extrabold text-xs tracking-wider group-hover:bg-blue-500 transition-colors">
            PA
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[15px] tracking-tight text-white leading-tight pb-2">
              Poontan Apartment
            </span>
            <span className="text-[10px] tracking-wider uppercase text-white font-medium opacity-90 leading-none">
              Bangkok · Unit Rentals
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-[15px] font-medium transition-all py-2 border-b-2 ${isActive(link.path)
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'border-transparent text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white'
                }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* RIGHT CONTROLS */}
        <div className="hidden md:flex items-center gap-3">

          {/* ALWAYS STICKY THEME TOGGLE BUTTON */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold shadow-2xs transition-all active:scale-95 bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300/80 dark:bg-slate-800/90 dark:hover:bg-slate-700 dark:text-slate-100 dark:border-slate-700"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Light</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-600 fill-indigo-600/20" />
                <span>Dark</span>
              </>
            )}
          </button>

          {location.pathname !== '/login' && location.pathname !== '/register' && (
            <Link
              to="/rooms"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-nike-dark-elevated dark:text-white dark:hover:bg-slate-800 transition-colors"
              title="Search Units"
            >
              <Search className="w-4 h-4" />
            </Link>
          )}

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              {user?.role === 'admin' ? (
                <Link
                  to="/admin/dashboard"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-semibold px-5 py-2.5 rounded-full transition-all flex items-center gap-2 shadow-sm shrink-0"
                >
                  <Shield className="w-4 h-4" /> Admin Panel
                </Link>
              ) : (
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-nike-dark-elevated px-4 py-2 rounded-full border border-slate-200 dark:border-nike-dark-card text-xs font-semibold text-slate-800 dark:text-white">
                  <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>{user?.fullname || 'Customer'}</span>
                </div>
              )}
              <button
                onClick={() => { logout(); navigate('/login'); }}
                className="text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 p-2 rounded-full transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-semibold px-5 py-2.5 rounded-full transition-all flex items-center gap-2 shadow-sm shrink-0"
            >
              <User className="w-4 h-4" /> Login / Sign Up
            </Link>
          )}
        </div>

        {/* MOBILE MENU CONTROLS */}
        <div className="flex items-center gap-2 md:hidden">
          {/* MOBILE THEME SWITCHER */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-100 dark:border-slate-700 active:scale-95 transition-all"
            title="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 fill-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600 fill-indigo-600/20" />
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-nike-dark-surface border-t border-slate-200 dark:border-nike-dark-elevated px-6 pt-4 pb-8 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block text-[15px] font-medium text-slate-800 dark:text-white py-2 ${isActive(link.path) ? 'font-bold text-blue-600' : ''
                }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="flex items-center justify-between py-3 border-t border-b border-slate-200 dark:border-slate-800">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Theme Mode</span>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-300 dark:border-slate-700"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400 fill-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>

          <div className="pt-2">
            {isAuthenticated ? (
              user?.role === 'admin' ? (
                <Link
                  to="/admin/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center bg-blue-600 text-white py-2.5 font-semibold text-[14px] rounded-full shadow-xs"
                >
                  Admin Panel
                </Link>
              ) : (
                <div className="flex items-center justify-between bg-slate-100 dark:bg-nike-dark-elevated p-3 rounded-xl">
                  <span className="text-xs font-semibold text-slate-800 dark:text-white">Hi, {user?.fullname}</span>
                  <button
                    onClick={() => { logout(); setMobileMenuOpen(false); navigate('/login'); }}
                    className="text-xs text-rose-600 font-semibold"
                  >
                    Sign Out
                  </button>
                </div>
              )
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-2.5 font-semibold text-[14px] rounded-full shadow-xs"
              >
                Login / Sign Up
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
