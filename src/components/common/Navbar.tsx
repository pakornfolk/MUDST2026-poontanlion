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
    <>
      {/* UTILITY BAR */}
      <div className="bg-nike-soft-cloud dark:bg-nike-dark-elevated text-nike-ink dark:text-nike-stone text-[12px] font-medium hidden md:block">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-9 flex items-center justify-between">
          <span className="text-nike-mute dark:text-nike-stone flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5" /> Apartment Management (24 Units)
          </span>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="hover:text-nike-ink dark:hover:text-white transition-colors flex items-center gap-1"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* PRIMARY NAV */}
      <header className="sticky top-0 z-50 bg-nike-canvas dark:bg-nike-dark-surface border-b border-nike-hairline-soft dark:border-nike-dark-elevated transition-colors duration-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-14 flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-8 h-8 bg-blue-600 flex items-center justify-center rounded-lg text-white font-bold text-xs tracking-wider">
              AM
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[15px] tracking-tight text-nike-ink dark:text-white leading-tight">
                Apartment Management
              </span>
              <span className="text-[9px] tracking-wider uppercase text-nike-mute dark:text-nike-stone font-medium leading-none">
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
                className={`text-[15px] font-medium transition-colors py-4 border-b-2 ${
                  isActive(link.path)
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-semibold'
                    : 'border-transparent text-nike-ink dark:text-nike-stone hover:text-nike-mute dark:hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* RIGHT CONTROLS */}
          <div className="hidden md:flex items-center gap-3">
            {location.pathname !== '/login' && location.pathname !== '/register' && (
              <Link
                to="/rooms"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-nike-soft-cloud dark:bg-nike-dark-elevated text-nike-ink dark:text-white hover:bg-nike-hairline-soft transition-colors"
                title="Search Units"
              >
                <Search className="w-[18px] h-[18px]" />
              </Link>
            )}

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                {user?.role === 'admin' ? (
                  <Link
                    to="/admin/dashboard"
                    className="bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-semibold px-4 py-2 rounded-full transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <Shield className="w-4 h-4" /> Admin Panel
                  </Link>
                ) : (
                  <div className="flex items-center gap-2 bg-nike-soft-cloud dark:bg-nike-dark-elevated px-3 py-1.5 rounded-full border border-nike-hairline dark:border-nike-dark-card text-xs font-semibold text-nike-ink dark:text-white">
                    <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>{user?.fullname || 'Customer'}</span>
                  </div>
                )}
                <button
                  onClick={() => { logout(); navigate('/login'); }}
                  className="text-nike-mute hover:text-rose-600 p-2 rounded-full transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-nike-ink dark:bg-white text-white dark:text-nike-ink hover:opacity-90 text-[13px] font-semibold px-4 py-2 rounded-full transition-all flex items-center gap-1.5 shadow-xs"
              >
                <User className="w-3.5 h-3.5" /> Login / Sign Up
              </Link>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 flex items-center justify-center text-nike-ink dark:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* MOBILE DRAWER */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-nike-canvas dark:bg-nike-dark-surface border-t border-nike-hairline-soft dark:border-nike-dark-elevated px-6 pt-4 pb-8 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-[15px] font-medium text-nike-ink dark:text-white py-2.5 ${
                  isActive(link.path) ? 'font-bold text-blue-600' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-nike-hairline-soft">
              {isAuthenticated ? (
                user?.role === 'admin' ? (
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center bg-blue-600 text-white py-2.5 font-semibold text-[14px] rounded-full"
                  >
                    Admin Panel
                  </Link>
                ) : (
                  <div className="flex items-center justify-between bg-nike-soft-cloud dark:bg-nike-dark-elevated p-3 rounded-xl">
                    <span className="text-xs font-semibold text-nike-ink dark:text-white">Hi, {user?.fullname}</span>
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
                  className="block w-full text-center bg-nike-ink dark:bg-white text-white dark:text-nike-ink py-2.5 font-semibold text-[14px] rounded-full"
                >
                  Login / Sign Up
                </Link>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
