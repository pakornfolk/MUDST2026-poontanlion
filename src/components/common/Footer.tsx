import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Car, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-nike-canvas dark:bg-nike-dark-surface border-t border-nike-hairline dark:border-nike-dark-elevated text-nike-mute dark:text-nike-stone transition-colors duration-200">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-section">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* COL 1: RESOURCES */}
          <div>
            <h4 className="font-medium text-[15px] text-nike-ink dark:text-white mb-5">
              Resources
            </h4>
            <ul className="space-y-3 text-[14px]">
              <li>
                <Link to="/" className="hover:text-nike-ink dark:hover:text-white transition-colors">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/rooms" className="hover:text-nike-ink dark:hover:text-white transition-colors">
                  {t('rooms')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-nike-ink dark:hover:text-white transition-colors">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-nike-ink dark:hover:text-white transition-colors">
                  {t('faq')}
                </Link>
              </li>
            </ul>
          </div>

          {/* COL 2: HELP */}
          <div>
            <h4 className="font-medium text-[15px] text-nike-ink dark:text-white mb-5">
              Help
            </h4>
            <ul className="space-y-3 text-[14px]">
              <li>
                <Link to="/contact" className="hover:text-nike-ink dark:hover:text-white transition-colors">
                  {t('contact')}
                </Link>
              </li>
              <li>
                <span className="hover:text-nike-ink cursor-pointer transition-colors">Booking Support</span>
              </li>
              <li>
                <span className="hover:text-nike-ink cursor-pointer transition-colors">Cancellation Policy</span>
              </li>
              <li>
                <span className="hover:text-nike-ink cursor-pointer transition-colors">Payment Methods</span>
              </li>
            </ul>
          </div>

          {/* COL 3: ACCOMMODATIONS */}
          <div>
            <h4 className="font-medium text-[15px] text-nike-ink dark:text-white mb-5">
              Accommodations
            </h4>
            <ul className="space-y-3 text-[14px]">
              <li className="hover:text-nike-ink dark:hover:text-white cursor-pointer transition-colors">Deluxe Skyline Suite</li>
              <li className="hover:text-nike-ink dark:hover:text-white cursor-pointer transition-colors">Executive Horizon Suite</li>
              <li className="hover:text-nike-ink dark:hover:text-white cursor-pointer transition-colors">Presidential Penthouse</li>
              <li className="hover:text-nike-ink dark:hover:text-white cursor-pointer transition-colors">Family Sanctuary</li>
              <li className="hover:text-nike-ink dark:hover:text-white cursor-pointer transition-colors">Royal Pool Villa</li>
            </ul>
          </div>

          {/* COL 4: CONTACT */}
          <div>
            <h4 className="font-medium text-[15px] text-nike-ink dark:text-white mb-5">
              Victory Room Hotel
            </h4>
            <ul className="space-y-3 text-[14px]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-nike-mute shrink-0 mt-0.5" />
                <span>422 Phaya Thai Rd, Ratchathewi, Bangkok 10400</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-nike-mute shrink-0" />
                <span>+66 2 123 4567</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-nike-mute shrink-0" />
                <span>booking@victoryroom.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-nike-mute shrink-0" />
                <span>Check-in: 14:00 | Check-out: 12:00</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Car className="w-4 h-4 text-nike-mute shrink-0" />
                <span>Free VIP Parking & EV Chargers</span>
              </li>
              <li className="pt-1">
                <a
                  href="https://maps.google.com/?q=Victory+Room+Bangkok"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[14px] font-medium text-nike-ink dark:text-white underline"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Open Google Maps
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM FINE-PRINT ROW — 9px utility text */}
        <div className="mt-12 pt-6 border-t border-nike-hairline dark:border-nike-dark-elevated flex flex-col md:flex-row items-center justify-between text-[11px] text-nike-stone">
          <p>© {new Date().getFullYear()} Victory Room Hotel Management System. All Rights Reserved.</p>
          <div className="flex gap-6 mt-3 md:mt-0">
            <span className="hover:text-nike-ink dark:hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-nike-ink dark:hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-nike-ink dark:hover:text-white cursor-pointer transition-colors">Cookie Preferences</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
