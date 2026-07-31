import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.success('Password reset link sent to your email');
  };

  return (
    <div className="max-w-md mx-auto px-6 py-16 space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-[24px] font-medium text-nike-ink dark:text-white">Reset Password</h1>
        <p className="text-[14px] text-nike-mute dark:text-nike-stone">Enter your email to receive reset instructions</p>
      </div>

      {sent ? (
        <div className="bg-nike-canvas dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card p-8 text-center space-y-4">
          <CheckCircle2 className="w-12 h-12 text-nike-success mx-auto" />
          <h3 className="text-[16px] font-medium text-nike-ink dark:text-white">Reset Link Sent</h3>
          <p className="text-[14px] text-nike-mute dark:text-nike-stone leading-relaxed">
            We've sent recovery instructions to <strong className="text-nike-ink dark:text-white">{email}</strong>.
          </p>
          <Link to="/login" className="inline-block bg-nike-ink dark:bg-white text-white dark:text-nike-ink px-6 py-3 rounded-full text-[14px] font-medium hover:opacity-80">
            Back to Sign In
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-nike-canvas dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card p-6 space-y-5">
          <div>
            <label className="block font-medium text-[14px] mb-1.5 text-nike-ink dark:text-white">Email Address</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="john@example.com"
              className="w-full p-3 bg-nike-soft-cloud dark:bg-nike-dark-card border-0 text-nike-ink dark:text-white text-[14px] rounded-[24px] focus:outline-none focus:ring-2 focus:ring-nike-ink" />
          </div>

          <button type="submit" className="w-full bg-nike-ink dark:bg-white text-white dark:text-nike-ink text-[14px] font-medium py-4 rounded-full hover:opacity-80 transition-opacity flex items-center justify-center gap-2">
            Send Reset Link <ArrowRight className="w-4 h-4" />
          </button>

          <div className="text-center pt-3 border-t border-nike-hairline-soft dark:border-nike-dark-card text-[14px]">
            <Link to="/login" className="text-nike-mute hover:text-nike-ink dark:hover:text-white font-medium">← Back to Sign In</Link>
          </div>
        </form>
      )}
    </div>
  );
};
