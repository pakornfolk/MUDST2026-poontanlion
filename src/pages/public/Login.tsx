import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-nike-canvas dark:bg-nike-dark-card border border-nike-hairline dark:border-nike-dark-card p-8 rounded-3xl space-y-6 shadow-sm">
        
        <div className="text-center space-y-2">
          <div className="flex items-center gap-3 justify-center mb-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-sm tracking-wider">
              AM
            </div>
            <h2 className="text-2xl font-bold text-nike-ink dark:text-white">
              Apartment Management
            </h2>
          </div>
          <p className="text-xs text-nike-stone">Apartment Management System</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-nike-ink dark:text-white mb-1">Username / Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-nike-stone absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-nike-soft-cloud dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card text-nike-ink dark:text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-nike-ink dark:text-white mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-nike-stone absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-nike-soft-cloud dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card text-nike-ink dark:text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-[11px] text-blue-600 dark:text-blue-400">
            <strong>Default Credentials:</strong><br />
            Username: <code className="bg-blue-500/20 px-1 rounded">admin</code> | Password: <code className="bg-blue-500/20 px-1 rounded">admin</code>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 text-xs"
          >
            <LogIn className="w-4 h-4" />
            {loading ? 'Authenticating...' : 'Sign In to Admin Panel'}
          </button>
        </form>

      </div>
    </div>
  );
};
