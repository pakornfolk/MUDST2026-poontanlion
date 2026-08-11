import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-nike-ink text-white border-t border-nike-dark-card mt-auto">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-blue-600 flex items-center justify-center rounded-lg text-white font-bold text-xs tracking-wider">
                AM
              </div>
              <span className="font-bold text-lg text-white">Apartment Management</span>
            </div>
            <p className="text-xs text-nike-stone leading-relaxed">
              Modern 24-unit apartment building in Bangkok. Professional management, clean amenities, and 24/7 security.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Contact Info</h4>
            <ul className="space-y-2 text-xs text-nike-stone">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span>422 Phaya Thai Rd, Ratchathewi, Bangkok 10400</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>+66 2 123 4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>admin@apartmentmanagement.com</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs text-nike-stone">
              <li><Link to="/" className="hover:text-white transition-colors">Home Page</Link></li>
              <li><Link to="/rooms" className="hover:text-white transition-colors">Available Units</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-nike-stone gap-2">
          <span>&copy; 2026 Apartment Management Bangkok. All rights reserved.</span>
          <span>Semester DevOps Project</span>
        </div>
      </div>
    </footer>
  );
};
