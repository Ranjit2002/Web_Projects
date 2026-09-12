'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, Mail, Lock, User, Shield, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

export default function LoginPage() {
  const router = useRouter();
  const { login, switchDemoUser } = useAuth();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast('Please provide both email and password', 'error');
      return;
    }

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600)); // smooth experience
    await login(email, password);
    setIsLoading(false);
    toast('Authenticated successfully', 'success');
    router.push('/profile');
  };

  const handleQuickDemo = (userId: string, name: string) => {
    switchDemoUser(userId);
    toast(`Authenticated as ${name}`, 'success');
    router.push('/profile');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-indigo-600 items-center justify-center text-white shadow-xl shadow-indigo-600/30 mb-2">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Access Your Aether Portal</h1>
          <p className="text-xs text-zinc-400">
            Sign in to manage active orders, hardware serials, and address books.
          </p>
        </div>

        {/* Demo Fast Logins */}
        <div className="glass p-4 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 space-y-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300 block">
            Instant Demo Account Access
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('user-001', 'Alex Mercer')}
              className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white border border-white/10 transition-colors flex items-center justify-center gap-1.5"
            >
              <User className="w-3.5 h-3.5 text-indigo-400" />
              Alex (Customer)
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('user-002', 'Elena Rostova')}
              className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white border border-white/10 transition-colors flex items-center justify-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5 text-sky-400" />
              Elena (Admin)
            </button>
          </div>
        </div>

        {/* Main Sign In Form */}
        <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex.mercer@aether.io"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all pt-3"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Sign In to Account <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="text-center pt-2">
            <Link
              href="/auth/register"
              className="text-xs text-zinc-400 hover:text-indigo-300 transition-colors"
            >
              Don&apos;t have an account? Create one now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
