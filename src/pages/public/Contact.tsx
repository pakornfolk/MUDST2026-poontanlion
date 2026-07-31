import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { GoogleMapEmbed } from '../../components/common/GoogleMapEmbed';
import { toast } from 'sonner';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Thank you! Our concierge will respond shortly.');
    setName(''); setEmail(''); setPhone(''); setMessage('');
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-10 space-y-10">
      
      <div className="pb-2">
        <h1 className="text-[32px] md:text-[40px] font-medium text-nike-ink dark:text-white">Contact Us</h1>
        <p className="text-[14px] text-nike-mute dark:text-nike-stone mt-1">Concierge & Guest Support</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* CONTACT INFO — dark card */}
        <div className="lg:col-span-5 bg-nike-ink text-white p-8 space-y-6">
          <h3 className="text-[20px] font-medium">We're at your service 24/7</h3>
          <p className="text-[14px] text-nike-stone leading-relaxed">
            Whether inquiring about VIP penthouse reservations, airport transfers, or private events, our hospitality specialists are ready to assist.
          </p>

          <div className="space-y-4 pt-4 border-t border-white/10 text-[14px]">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-nike-stone shrink-0 mt-0.5" />
              <div>
                <strong className="block font-medium">Address</strong>
                <span className="text-nike-stone">422 Phaya Thai Rd, Bangkok 10400</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-nike-stone shrink-0 mt-0.5" />
              <div>
                <strong className="block font-medium">Phone</strong>
                <span className="text-nike-stone">+66 2 123 4567</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-nike-stone shrink-0 mt-0.5" />
              <div>
                <strong className="block font-medium">Email</strong>
                <span className="text-nike-stone">booking@victoryroom.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="lg:col-span-7 bg-nike-canvas dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card p-8 space-y-5">
          <h3 className="text-[18px] font-medium text-nike-ink dark:text-white">Send a Message</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium text-[14px] mb-1.5 text-nike-ink dark:text-white">Full Name</label>
              <input type="text" required value={name} onChange={e => setName(e.target.value)}
                className="w-full p-3 bg-nike-soft-cloud dark:bg-nike-dark-card border-0 text-nike-ink dark:text-white text-[14px] rounded-[24px] focus:outline-none focus:ring-2 focus:ring-nike-ink" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-[14px] mb-1.5 text-nike-ink dark:text-white">Email</label>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full p-3 bg-nike-soft-cloud dark:bg-nike-dark-card border-0 text-nike-ink dark:text-white text-[14px] rounded-[24px] focus:outline-none focus:ring-2 focus:ring-nike-ink" />
              </div>
              <div>
                <label className="block font-medium text-[14px] mb-1.5 text-nike-ink dark:text-white">Phone</label>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                  className="w-full p-3 bg-nike-soft-cloud dark:bg-nike-dark-card border-0 text-nike-ink dark:text-white text-[14px] rounded-[24px] focus:outline-none focus:ring-2 focus:ring-nike-ink" />
              </div>
            </div>

            <div>
              <label className="block font-medium text-[14px] mb-1.5 text-nike-ink dark:text-white">Message</label>
              <textarea rows={4} required value={message} onChange={e => setMessage(e.target.value)} placeholder="How may we assist you?"
                className="w-full p-3 bg-nike-soft-cloud dark:bg-nike-dark-card border-0 text-nike-ink dark:text-white text-[14px] rounded-none focus:outline-none focus:ring-2 focus:ring-nike-ink" />
            </div>

            <button type="submit" className="bg-nike-ink dark:bg-white text-white dark:text-nike-ink text-[14px] font-medium py-3.5 px-8 rounded-full hover:opacity-80 transition-opacity flex items-center gap-2">
              <Send className="w-4 h-4" /> Send Message
            </button>
          </form>
        </div>

      </div>

      <GoogleMapEmbed />
    </div>
  );
};
