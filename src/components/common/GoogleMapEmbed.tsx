import React from 'react';
import { MapPin, Phone, Clock, Car, ExternalLink } from 'lucide-react';
import { HotelInfo } from '../../types';

interface GoogleMapEmbedProps {
  hotelInfo?: HotelInfo;
}

export const GoogleMapEmbed: React.FC<GoogleMapEmbedProps> = ({ hotelInfo }) => {
  const address = hotelInfo?.address || '422 Phaya Thai Rd, Ratchathewi, Bangkok 10400, Thailand';
  const phone = hotelInfo?.phone || '+66 2 123 4567';
  const checkIn = hotelInfo?.check_in_time || '14:00';
  const checkOut = hotelInfo?.check_out_time || '12:00';
  const parking = hotelInfo?.parking || 'Free VIP Underground Parking & EV Charging';

  return (
    <div className="bg-nike-canvas dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card p-6 md:p-8 space-y-6">
      
      <div className="flex items-center justify-between border-b border-nike-hairline-soft dark:border-nike-dark-card pb-4">
        <div>
          <h3 className="text-[20px] font-medium text-nike-ink dark:text-white">
            Location & Map
          </h3>
          <p className="text-[14px] text-nike-mute dark:text-nike-stone mt-0.5">Victory Room Hotel</p>
        </div>
        <a
          href="https://maps.google.com/?q=Victory+Room+Bangkok"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-nike-ink dark:bg-white text-white dark:text-nike-ink text-[14px] font-medium px-5 py-2.5 rounded-full flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <ExternalLink className="w-4 h-4" /> Open Maps
        </a>
      </div>

      {/* GOOGLE MAPS IFRAME */}
      <div className="w-full overflow-hidden border border-nike-hairline dark:border-nike-dark-card">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242.19999351021974!2d100.53845303753965!3d13.766815673124919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29fc9a50a3117%3A0xa9ce6fd4e2755f19!2sVictory%20Room!5e0!3m2!1sth!2sth!4v1785481678759!5m2!1sth!2sth"
          width="100%"
          height="450"
          style={{ border: 0, borderRadius: '0px' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          title="Victory Room Google Map Location"
        />
      </div>

      {/* BELOW MAP METADATA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2 text-[14px]">
        
        <div className="flex items-start gap-3 p-4 bg-nike-soft-cloud dark:bg-nike-dark-card">
          <MapPin className="w-5 h-5 text-nike-mute shrink-0 mt-0.5" />
          <div>
            <span className="font-medium text-nike-ink dark:text-white block mb-0.5">Address</span>
            <p className="text-nike-mute dark:text-nike-stone">{address}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-nike-soft-cloud dark:bg-nike-dark-card">
          <Phone className="w-5 h-5 text-nike-mute shrink-0 mt-0.5" />
          <div>
            <span className="font-medium text-nike-ink dark:text-white block mb-0.5">Phone</span>
            <p className="text-nike-mute dark:text-nike-stone">{phone}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-nike-soft-cloud dark:bg-nike-dark-card">
          <Clock className="w-5 h-5 text-nike-mute shrink-0 mt-0.5" />
          <div>
            <span className="font-medium text-nike-ink dark:text-white block mb-0.5">Schedule</span>
            <p className="text-nike-mute dark:text-nike-stone">
              Check-in: <strong className="text-nike-ink dark:text-white">{checkIn}</strong> | Check-out: <strong className="text-nike-ink dark:text-white">{checkOut}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-nike-soft-cloud dark:bg-nike-dark-card sm:col-span-2 lg:col-span-3">
          <Car className="w-5 h-5 text-nike-mute shrink-0 mt-0.5" />
          <div>
            <span className="font-medium text-nike-ink dark:text-white block mb-0.5">Parking & Access</span>
            <p className="text-nike-mute dark:text-nike-stone">{parking}</p>
          </div>
        </div>

      </div>

    </div>
  );
};
