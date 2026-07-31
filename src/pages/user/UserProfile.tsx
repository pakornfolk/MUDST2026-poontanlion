import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Save } from 'lucide-react';

export const UserProfile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [fullname, setFullname] = useState(user?.fullname || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUser({ fullname, email, phone, avatar });
  };

  const inputClass = "w-full p-3 bg-nike-soft-cloud dark:bg-nike-dark-card border-0 text-nike-ink dark:text-white text-[14px] rounded-[24px] focus:outline-none focus:ring-2 focus:ring-nike-ink";

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 space-y-8">
      <div className="pb-2">
        <h1 className="text-[28px] font-medium text-nike-ink dark:text-white">Edit Profile</h1>
        <p className="text-[14px] text-nike-mute mt-1">Guest Account Settings</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-nike-canvas dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card p-8 space-y-6">
        
        <div className="flex flex-col items-center space-y-3">
          <img src={avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'} alt="" className="w-24 h-24 rounded-full object-cover" />
          <div className="w-full max-w-md">
            <label className="block font-medium text-[14px] mb-1.5 text-center text-nike-ink dark:text-white">Avatar URL</label>
            <input type="url" value={avatar} onChange={e => setAvatar(e.target.value)} className={inputClass + " text-center"} />
          </div>
        </div>

        <div>
          <label className="block font-medium text-[14px] mb-1.5 text-nike-ink dark:text-white">Full Name</label>
          <input type="text" required value={fullname} onChange={e => setFullname(e.target.value)} className={inputClass} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-[14px] mb-1.5 text-nike-ink dark:text-white">Email</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block font-medium text-[14px] mb-1.5 text-nike-ink dark:text-white">Phone</label>
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className={inputClass} />
          </div>
        </div>

        <div>
          <label className="block font-medium text-[14px] mb-1.5 text-nike-ink dark:text-white">New Password (optional)</label>
          <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="••••••••" className={inputClass} />
        </div>

        <button type="submit" className="w-full bg-nike-ink dark:bg-white text-white dark:text-nike-ink text-[14px] font-medium py-4 rounded-full hover:opacity-80 transition-opacity flex items-center justify-center gap-2">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </form>
    </div>
  );
};
