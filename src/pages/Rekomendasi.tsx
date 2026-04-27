import React from 'react';
import { useApp } from '../lib/context';
import { Lightbulb, CheckCircle2, ChevronRight, Briefcase, Calendar, Users, Target } from 'lucide-react';

export default function RekomendasiView() {
  const { currentLevel, currentYear, data } = useApp();

  const displayData = data[currentYear]?.[currentLevel]?.rekomendasi || [];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-brand-text">Rekomendasi Program Perbaikan</h2>
            <span className="bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
              Tahun {currentYear}
            </span>
          </div>
          <p className="text-brand-text-muted font-medium">Langkah strategis yang direkomendasikan MUTUPONTI AI untuk meningkatkan mutu pendidikan di Kota Pontianak.</p>
        </div>
        <button className="bg-brand-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-brand-primary/20 hover:scale-105 transition-transform whitespace-nowrap">
          <CheckCircle2 size={20} />
          <span>Setujui Semua Program</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {displayData.map((item: any, idx: number) => (
          <div key={idx} className="bg-white rounded-2xl border border-brand-border p-8 hover:border-brand-primary transition-all group flex flex-col md:flex-row gap-8 shadow-sm">
            <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center text-brand-secondary shrink-0 group-hover:scale-110 transition-transform">
              <Lightbulb size={32} />
            </div>

            <div className="flex-1 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h3 className="text-xl font-bold text-brand-text">{item.program}</h3>
                <span className="bg-brand-primary text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Prioritas Tinggi</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-brand-text-muted font-bold text-[10px] uppercase tracking-widest">
                    <Briefcase size={14} />
                    <span>Rencana Kegiatan</span>
                  </div>
                  <p className="text-brand-text text-sm leading-relaxed">
                    {item.kegiatan}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-brand-text-muted font-bold text-[10px] uppercase tracking-widest">
                    <Target size={14} />
                    <span>Target Capaian</span>
                  </div>
                  <p className="text-brand-text text-sm leading-relaxed">
                    {item.target}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-brand-border">
                  <Calendar size={14} className="text-brand-text-muted" />
                  <span className="text-[10px] font-bold text-brand-text-muted">Q3 - Q4 2026</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-brand-border">
                  <Users size={14} className="text-brand-text-muted" />
                  <span className="text-[10px] font-bold text-brand-text-muted">Kepala Bidang Pembinaan</span>
                </div>
                <button className="ml-auto flex items-center gap-1 text-brand-primary font-bold text-sm hover:translate-x-1 transition-transform">
                  Atur Detail Anggaran <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
