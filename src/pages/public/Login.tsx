import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, User as UserIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useLanguage();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      const cleanInput = email.toLowerCase().trim();
      if (cleanInput.includes('admin') || cleanInput === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-16 space-y-8">
      
      <div className="text-center space-y-3">
        <div className="w-10 h-10 bg-nike-ink dark:bg-white text-white dark:text-nike-ink flex items-center justify-center mx-auto">
          <span className="font-display text-2xl leading-none">V</span>
        </div>
        <h1 className="text-[24px] font-medium text-nike-ink dark:text-white">
          Sign In
        </h1>
        <p className="text-[14px] text-nike-mute dark:text-nike-stone">
          Enter your username / email and password
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-nike-canvas dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card p-6 space-y-5">
        
        <div>
          <label className="block font-medium text-[14px] mb-1.5 text-nike-ink dark:text-white">Email / Username</label>
          <div className="relative">
            <UserIcon className="w-4 h-4 text-nike-mute absolute left-3.5 top-3.5" />
            <input
              type="text"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin or name@example.com"
              className="w-full pl-10 p-3 bg-nike-soft-cloud dark:bg-nike-dark-card border-0 text-nike-ink dark:text-white text-[14px] rounded-[24px] focus:outline-none focus:ring-2 focus:ring-nike-ink"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium text-[14px] mb-1.5 text-nike-ink dark:text-white">Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-nike-mute absolute left-3.5 top-3.5" />
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 p-3 bg-nike-soft-cloud dark:bg-nike-dark-card border-0 text-nike-ink dark:text-white text-[14px] rounded-[24px] focus:outline-none focus:ring-2 focus:ring-nike-ink"
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-[13px]">
          <label className="flex items-center gap-2 cursor-pointer text-nike-mute dark:text-nike-stone">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
              className="accent-nike-ink w-4 h-4"
            />
            <span>Remember Me</span>
          </label>
          <Link to="/forgot-password" className="text-nike-ink dark:text-white underline font-medium">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-nike-ink dark:bg-white text-white dark:text-nike-ink text-[14px] font-medium py-4 rounded-full hover:opacity-80 transition-opacity flex items-center justify-center gap-2"
        >
          {loading ? 'Authenticating...' : 'Sign In'} <ArrowRight className="w-4 h-4" />
        </button>

        <div className="text-center pt-3 border-t border-nike-hairline-soft dark:border-nike-dark-card text-[14px]">
          <span className="text-nike-mute">Don't have an account? </span>
          <Link to="/register" className="text-nike-ink dark:text-white font-medium underline">
            Join Us
          </Link>
        </div>

      </form>

    </div>
  );
};
