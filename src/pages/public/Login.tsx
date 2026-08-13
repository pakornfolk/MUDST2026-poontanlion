import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, LogIn } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      if (res.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/rooms');
      }
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white dark:bg-nike-dark-card border border-slate-200 dark:border-slate-700 p-8 rounded-3xl space-y-6 shadow-md">
        
        <div className="text-center space-y-2">
          <div className="flex items-center gap-3 justify-center mb-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-sm tracking-wider shadow-xs">
              AM
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Apartment Management
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Apartment Management System</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-800 dark:text-white mb-1">Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 dark:text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-800 dark:text-white mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 dark:text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2.5 text-sm"
          >
            <LogIn className="w-4 h-4" />
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};
