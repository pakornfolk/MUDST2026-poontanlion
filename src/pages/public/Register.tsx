import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, User, Phone, UserPlus } from 'lucide-react';
import { toast } from 'sonner';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    const res = await register(fullname, email, password, phone);
    setLoading(false);

    if (res.success) {
      toast.success('Account created successfully!');
      navigate('/rooms');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white dark:bg-nike-dark-card border border-slate-200 dark:border-slate-700 p-8 rounded-3xl space-y-6 shadow-md">
        
        <div className="text-center space-y-2">
          <div className="flex items-center gap-3 justify-center mb-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-sm tracking-wider shadow-xs">
              AM
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Create Account
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Sign up to browse and book apartment units</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-800 dark:text-white mb-1">Full Name *</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 dark:text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-800 dark:text-white mb-1">Email Address *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 dark:text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-800 dark:text-white mb-1">Phone Number</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 dark:text-slate-400 absolute left-3.5 top-3" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="081-234-5678"
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-800 dark:text-white mb-1">Password *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 dark:text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Choose a password"
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-800 dark:text-white mb-1">Confirm Password *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 dark:text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2.5 text-sm"
          >
            <UserPlus className="w-4 h-4" />
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Log In
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};
