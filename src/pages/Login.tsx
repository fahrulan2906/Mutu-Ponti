import React, { useState } from 'react';
import { LogIn, Lock, User, Building2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Login({ onLogin }: { onLogin: (user: any) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isSpecialUser = username.toLowerCase() === 'fahrulan' || username === 'fahrulanrozali562@dinas.belajar.id';
    if (isSpecialUser && password === '12345@@') {
      onLogin({ name: 'Fahrulan', role: 'admin' });
    } else {
      setError('Username atau password salah.');
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 blur-3xl rounded-full -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-primary/5 blur-3xl rounded-full -ml-48 -mb-48" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-3xl shadow-2xl shadow-blue-900/5 p-10 relative z-10 border border-brand-border">
          <div className="flex flex-col items-center mb-10">
            <div className="bg-brand-primary p-4 rounded-2xl text-brand-sky mb-6 shadow-xl shadow-brand-primary/20">
              <Building2 size={32} />
            </div>
            <h2 className="text-3xl font-black text-brand-primary text-center tracking-tighter">MUTUPONTI</h2>
            <p className="text-brand-text-muted text-[10px] font-bold mt-2 text-center max-w-[280px] uppercase tracking-widest leading-normal">
              Monitoring Unggul Terintegrasi, untuk Pendidikan yang Optimal, Nilai yang Terukur, dan Inovatif
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-brand-text-muted uppercase tracking-widest ml-1">Username Pengguna</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-brand-bg border border-brand-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all text-sm font-semibold"
                  placeholder="Username"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-brand-text-muted uppercase tracking-widest ml-1">Kata Sandi</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-brand-bg border border-brand-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all text-sm font-semibold"
                  placeholder="Password"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0, y: -5 }} 
                animate={{ opacity: 1, y: 0 }}
                className="text-red-600 text-xs font-bold text-center bg-red-50 py-2 rounded-lg border border-red-100"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-primary/20 transition-all flex items-center justify-center gap-2 group"
            >
              <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
              <span>MASUK APLIKASI</span>
            </button>
          </form>

          <p className="mt-10 text-center text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em]">
            Pusat Data dan Informasi Pendidikan
          </p>
        </div>
      </motion.div>
    </div>
  );
}
