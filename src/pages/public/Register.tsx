import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await register(fullname, email, phone, password);
    setLoading(false);
    if (result.success) {
      navigate('/user/dashboard');
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-16 space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-[24px] font-medium text-nike-ink dark:text-white">Join Us</h1>
        <p className="text-[14px] text-nike-mute dark:text-nike-stone">Create your Victory Room Hotel account</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-nike-canvas dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card p-6 space-y-4">
        <div>
          <label className="block font-medium text-[14px] mb-1.5 text-nike-ink dark:text-white">Full Name</label>
          <input type="text" required value={fullname} onChange={e => setFullname(e.target.value)} placeholder="John Doe"
            className="w-full p-3 bg-nike-soft-cloud dark:bg-nike-dark-card border-0 text-nike-ink dark:text-white text-[14px] rounded-[24px] focus:outline-none focus:ring-2 focus:ring-nike-ink" />
        </div>
        <div>
          <label className="block font-medium text-[14px] mb-1.5 text-nike-ink dark:text-white">Email Address</label>
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="john@example.com"
            className="w-full p-3 bg-nike-soft-cloud dark:bg-nike-dark-card border-0 text-nike-ink dark:text-white text-[14px] rounded-[24px] focus:outline-none focus:ring-2 focus:ring-nike-ink" />
        </div>
        <div>
          <label className="block font-medium text-[14px] mb-1.5 text-nike-ink dark:text-white">Phone Number</label>
          <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} placeholder="081-234-5678"
            className="w-full p-3 bg-nike-soft-cloud dark:bg-nike-dark-card border-0 text-nike-ink dark:text-white text-[14px] rounded-[24px] focus:outline-none focus:ring-2 focus:ring-nike-ink" />
        </div>
        <div>
          <label className="block font-medium text-[14px] mb-1.5 text-nike-ink dark:text-white">Password</label>
          <input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
            className="w-full p-3 bg-nike-soft-cloud dark:bg-nike-dark-card border-0 text-nike-ink dark:text-white text-[14px] rounded-[24px] focus:outline-none focus:ring-2 focus:ring-nike-ink" />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-nike-ink dark:bg-white text-white dark:text-nike-ink text-[14px] font-medium py-4 rounded-full hover:opacity-80 transition-opacity flex items-center justify-center gap-2"
        >
          {loading ? 'Creating Account...' : 'Create Account'} <ArrowRight className="w-4 h-4" />
        </button>

        <div className="text-center pt-3 border-t border-nike-hairline-soft dark:border-nike-dark-card text-[14px]">
          <span className="text-nike-mute">Already registered? </span>
          <Link to="/login" className="text-nike-ink dark:text-white font-medium underline">Sign In</Link>
        </div>
      </form>
    </div>
  );
};
