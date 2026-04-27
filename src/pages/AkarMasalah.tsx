import React from 'react';
import { useApp } from '../lib/context';
import { AlertTriangle, HelpCircle, ArrowRight, Zap, Target } from 'lucide-react';

export default function AkarMasalahView() {
  const { currentLevel, currentYear, data } = useApp();
  
  const displayData = data[currentYear]?.[currentLevel]?.akarMasalah || [];

  return (
    <div className="space-y-10">
      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-2xl font-bold text-brand-text">Identifikasi Akar Masalah AI</h2>
          <span className="bg-amber-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
            Tahun {currentYear}
          </span>
        </div>
        <p className="text-brand-text-muted font-medium">Berdasarkan analisis rapor pendidikan, MUTUPONTI AI merangkum tantangan utama yang perlu segera ditangani.</p>
      </div>

      <div className="space-y-6">
        {displayData.map((item: any, idx: number) => (
          <div key={idx} className="bg-white rounded-2xl border border-brand-border overflow-hidden flex flex-col md:flex-row shadow-sm">
            <div className="md:w-1/3 bg-slate-50 p-8 border-r border-brand-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-50 p-2 rounded-xl text-red-600">
                  <AlertTriangle size={20} />
                </div>
                <h4 className="text-[10px] font-bold text-brand-text-muted uppercase tracking-widest">Identitas Masalah</h4>
              </div>
              <h3 className="text-lg font-bold text-brand-text">{item.indikator}</h3>
            </div>
            
            <div className="flex-1 p-8 grid grid-cols-1 md:grid-cols-2 gap-8 relative">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-brand-text-muted font-bold text-[10px] uppercase tracking-widest">
                  <HelpCircle size={14} />
                  <span>Deskripsi Masalah</span>
                </div>
                <p className="text-brand-text font-medium leading-relaxed italic border-l-4 border-brand-secondary/20 pl-4 text-sm">
                  "{item.masalah}"
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-brand-text-muted font-bold text-[10px] uppercase tracking-widest">
                  <Zap size={14} />
                  <span>Faktor Penyumbang Utama</span>
                </div>
                <p className="text-brand-text font-medium leading-relaxed text-sm">
                  {item.faktor}
                </p>
              </div>

              <div className="absolute right-8 bottom-8 text-brand-primary/5">
                <Target size={64} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-2xl flex items-start gap-4">
        <AlertTriangle className="text-yellow-600 mt-1" size={20} />
        <div>
          <h4 className="text-yellow-900 font-bold text-sm">Catatan Penting</h4>
          <p className="text-yellow-800 text-xs mt-1 leading-relaxed">
            Data akar masalah ini dihasilkan melalui pemodelan pola Gemini AI. Disarankan untuk tetap melakukan verifikasi lapangan melalui pengawas sekolah dan kepala sekolah sebelum mengambil kebijakan strategis.
          </p>
        </div>
      </div>
    </div>
  );
}
