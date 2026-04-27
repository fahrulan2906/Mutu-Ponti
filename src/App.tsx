import React, { useState } from 'react';
import { useApp } from './lib/context';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  FileText, 
  AlertTriangle, 
  Lightbulb, 
  Printer, 
  Upload, 
  ChevronRight,
  LogOut,
  Building2,
  School,
  GraduationCap,
  Baby,
  BarChart3
} from 'lucide-react';
import DashboardView from './pages/Dashboard';
import AnalisisView from './pages/Analisis';
import PerbandinganView from './pages/Perbandingan';
import AkarMasalahView from './pages/AkarMasalah';
import RekomendasiView from './pages/Rekomendasi';
import ReportView from './pages/Report';
import UploadView from './pages/Upload';
import Login from './pages/Login';

export default function App() {
  const { user, setUser, currentLevel, setCurrentLevel, activeTab, setActiveTab, currentYear, setCurrentYear } = useApp();

  if (!user) {
    return <Login onLogin={(u) => setUser(u)} />;
  }

  const levels = [
    { id: 'PAUD', label: 'PAUD/TK', icon: Baby },
    { id: 'SD', label: 'SD', icon: School },
    { id: 'SMP', label: 'SMP', icon: GraduationCap },
  ];

  const menuItems = [
    { id: 'upload', label: 'Upload Data', icon: Upload },
    { id: 'dashboard', label: 'Dashboard Mutu', icon: LayoutDashboard },
    { id: 'analisis', label: 'Analisis Capaian', icon: FileText },
    { id: 'perbandingan', label: 'Perbandingan Data', icon: BarChart3 },
    { id: 'masalah', label: 'Akar Masalah', icon: AlertTriangle },
    { id: 'rekomendasi', label: 'Rekomendasi', icon: Lightbulb },
    { id: 'cetak', label: 'Cetak Laporan', icon: Printer },
  ];

  return (
    <div className="min-h-screen bg-brand-bg flex font-sans">
      {/* Sidebar */}
      <aside className="w-[240px] bg-brand-sidebar border-r border-brand-border flex flex-col fixed h-full z-20">
        <div className="p-6 border-b border-white/10">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Building2 size={24} className="text-brand-sky" />
              <h1 className="text-xl font-extrabold text-brand-sky tracking-wider">MUTU PONTI</h1>
            </div>
            <p className="text-[8px] text-white/50 font-bold uppercase tracking-tight leading-tight">Monitoring Unggul Terintegrasi, untuk Pendidikan yang Optimal, Nilai yang Terukur, dan Inovatif</p>
          </div>
        </div>

        <nav className="flex-1 px-4 pt-6 space-y-1">
          {menuItems.map((item, index) => (
            <React.Fragment key={item.id}>
              {index === 2 && <div className="text-[10px] uppercase text-slate-500 mt-6 mb-2 ml-4 font-bold tracking-widest">Analisis & Perencanaan</div>}
              {index === 6 && <div className="text-[10px] uppercase text-slate-500 mt-6 mb-2 ml-4 font-bold tracking-widest">Dokumentasi</div>}
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  activeTab === item.id 
                    ? 'bg-brand-secondary text-white shadow-lg shadow-blue-500/20' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon size={18} className={activeTab === item.id ? 'text-white' : 'text-slate-500 group-hover:text-white'} />
                <span className="font-semibold text-[13px]">{item.label}</span>
              </button>
            </React.Fragment>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 bg-white/5 m-4 rounded-xl">
          <div className="mb-3 px-2">
            <p className="text-[10px] text-white/40 font-bold uppercase">Sesi Aktif</p>
            <p className="text-sm font-bold text-white uppercase">{user?.name}</p>
          </div>
          <button 
            onClick={() => setUser(null)}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={18} />
            <span className="font-bold text-xs">LOGOUT</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-[240px] flex flex-col min-h-screen">
          {/* Header */}
        <header className="fixed top-0 right-0 left-[240px] h-[60px] bg-white border-b border-brand-border flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-6">
            <div className={`transition-all duration-300 ${activeTab === 'upload' ? 'opacity-0 invisible scale-95' : 'opacity-100 visible scale-100'}`}>
              <div className="flex bg-brand-bg p-1 rounded-full border border-brand-border">
                {levels.map((lvl) => (
                  <button
                    key={lvl.id}
                    onClick={() => setCurrentLevel(lvl.id as any)}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-all text-[11px] font-bold ${
                      currentLevel === lvl.id 
                        ? 'bg-brand-primary text-white shadow-sm' 
                        : 'text-brand-text-muted hover:text-brand-text'
                    }`}
                  >
                    <lvl.icon size={12} />
                    {lvl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Global Year Switcher */}
            <div className={`transition-all duration-300 ${activeTab === 'upload' || activeTab === 'perbandingan' ? 'opacity-0 invisible scale-95' : 'opacity-100 visible scale-100'}`}>
              <div className="flex bg-slate-100 p-1 rounded-full border border-slate-200">
                {['2024', '2025'].map(year => (
                  <button
                    key={year}
                    onClick={() => setCurrentYear(year)}
                    className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest transition-all ${
                      currentYear === year 
                        ? 'bg-white text-brand-primary shadow-sm' 
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {activeTab === 'upload' && (
              <div className="flex items-center gap-2 text-[10px] font-bold text-brand-primary bg-brand-primary/5 px-3 py-1.5 rounded-full">
                <Building2 size={12} />
                INTEGRASI DATA GLOBAL
              </div>
            )}
            <div className="text-right">
              <p className="text-[13px] font-bold text-brand-text">Pusat Data & Informasi</p>
              <button 
                onClick={() => setUser(null)}
                className="text-[10px] font-black text-red-500 hover:text-red-600 transition-colors uppercase tracking-widest"
              >
                Logout
              </button>
            </div>
            <div className="h-8 w-8 rounded-full bg-brand-sky flex items-center justify-center text-white font-extrabold text-xs">
              {user?.name?.[0]}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <section className="pt-20 px-8 pb-12 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab === 'upload' ? 'upload' : activeTab + currentLevel + currentYear}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'upload' && <UploadView />}
              {activeTab === 'dashboard' && <DashboardView />}
              {activeTab === 'analisis' && <AnalisisView />}
              {activeTab === 'perbandingan' && <PerbandinganView />}
              {activeTab === 'masalah' && <AkarMasalahView />}
              {activeTab === 'rekomendasi' && <RekomendasiView />}
              {activeTab === 'cetak' && <ReportView />}
            </motion.div>
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
}
