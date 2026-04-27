import React from 'react';
import { useApp } from '../lib/context';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { Scale, TrendingUp, TrendingDown, Minus, Info, Sparkles } from 'lucide-react';

export default function PerbandinganView() {
  const { currentLevel, data } = useApp();
  
  const data2024 = data?.['2024']?.[currentLevel]?.dashboard;
  const data2025 = data?.['2025']?.[currentLevel]?.dashboard;

  const p2024 = data2024?.priorities || [];
  const p2025 = data2025?.priorities || [];

  const hasData = (data2024?.dimensions?.output || 0) > 0 || (data2025?.dimensions?.output || 0) > 0;

  const dimensionData = [
    { name: 'OUTPUT', '2024': data2024?.dimensions?.output || 0, '2025': data2025?.dimensions?.output || 0 },
    { name: 'PROSES', '2024': data2024?.dimensions?.proses || 0, '2025': data2025?.dimensions?.proses || 0 },
    { name: 'INPUT', '2024': data2024?.dimensions?.input || 0, '2025': data2025?.dimensions?.input || 0 },
  ];

  // Robustly Merge indicators from both years
  const allIndicatorIds = Array.from(new Set([
    ...p2024.map(p => p.id),
    ...p2025.map(p => p.id)
  ]));

  const priorityComparison = allIndicatorIds.map(id => {
    const p24 = p2024.find(p => p.id === id);
    const p25 = p2025.find(p => p.id === id);
    const v24 = p24?.value || 0;
    const v25 = p25?.value || 0;
    const name = p25?.name || p24?.name || id;
    const diff = v25 - v24;

    return {
      id,
      name,
      v24,
      v25,
      diff
    };
  });

  const totalImprovement = priorityComparison.reduce((acc, curr) => acc + curr.diff, 0) / (priorityComparison.length || 1);
  const topImprover = [...priorityComparison].sort((a, b) => b.diff - a.diff)[0];
  const biggestDegradation = [...priorityComparison].sort((a, b) => a.diff - b.diff)[0];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Scale className="text-brand-primary" size={24} />
            <h2 className="text-3xl font-black text-brand-text tracking-tight uppercase">Komparasi Mutu Strategis</h2>
          </div>
          <p className="text-brand-text-muted font-medium">Laporan terpadu hasil perbandingan performa Rapor Pendidikan 2024 vs 2025 ({currentLevel}).</p>
        </div>
      </div>

      {!hasData ? (
        <div className="bg-white rounded-3xl p-20 text-center border border-brand-border flex flex-col items-center">
          <Info size={48} className="text-slate-200 mb-4" />
          <h3 className="font-bold text-brand-text">Data Pembanding Belum Lengkap</h3>
          <p className="text-brand-text-muted text-sm mt-1 max-w-md">Silakan unggah data untuk tahun 2024 dan 2025 agar sistem dapat melakukan analisis perbandingan otomatis.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-brand-border shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Rata-rata Pertumbuhan</p>
              <div className="flex items-center gap-3">
                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${totalImprovement >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                  {totalImprovement >= 0 ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
                </div>
                <div>
                  <h3 className={`text-2xl font-black ${totalImprovement >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {totalImprovement >= 0 ? '+' : ''}{totalImprovement.toFixed(1)}%
                  </h3>
                  <p className="text-xs text-brand-text-muted font-bold">Dibandingkan tahun lalu</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-brand-border shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Peningkatan Tertinggi</p>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-brand-primary/5 text-brand-primary flex items-center justify-center">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-brand-text line-clamp-1">{topImprover?.name}</h3>
                  <p className="text-xs text-brand-primary font-black mt-0.5">+{topImprover?.diff.toFixed(1)} Poin</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-brand-border shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Prioritas Pembenahan</p>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <TrendingDown size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-brand-text line-clamp-1">{biggestDegradation?.name}</h3>
                  <p className="text-xs text-amber-600 font-black mt-0.5">{biggestDegradation?.diff.toFixed(1)} Poin</p>
                </div>
              </div>
            </div>
          </div>

          {/* Global Dimensions Comparison Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-[32px] border border-brand-border p-8 shadow-sm">
              <div className="mb-8">
                <h4 className="text-xs font-black text-brand-text uppercase tracking-widest mb-1">Visualisasi Lintasi Tahun</h4>
                <p className="text-[10px] text-brand-text-muted font-bold italic">Perbandingan nilai Output, Proses, dan Input.</p>
              </div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dimensionData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fontWeight: 900, fill: '#64748B' }} 
                    />
                    <YAxis 
                      domain={[0, 100]} 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fontWeight: 700, fill: '#94A3B8' }} 
                    />
                    <Tooltip 
                      cursor={{ fill: '#F8FAFC' }}
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend iconType="circle" />
                    <Bar dataKey="2024" name="Tahun 2024" fill="#E2E8F0" radius={[4, 4, 0, 0]} barSize={40} />
                    <Bar dataKey="2025" name="Tahun 2025" fill="#0284C7" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-brand-sidebar rounded-[32px] p-8 text-white flex flex-col justify-center relative overflow-hidden">
               <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12">
                  <Scale size={120} />
               </div>
               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-300/60 mb-4">Unified AI Comparative Analysis</h4>
               <div className="space-y-6 relative z-10">
                  <p className="text-xl font-bold italic leading-relaxed text-blue-50">
                    "Secara agregat, jenjang {currentLevel} mengalami {totalImprovement >= 0 ? 'kenaikan' : 'penyesuaian'} sebesar {Math.abs(totalImprovement).toFixed(1)}%. Hal ini menunjukkan resiliensi mutu yang {totalImprovement > 5 ? 'sangat progresif' : 'stabil namun perlu atensi pada titik fragil'}."
                  </p>
                  <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                      </div>
                      <span className="text-xs font-bold text-blue-200">Kekuatan Utama: {topImprover?.name} menunjukkan lompatan signifikan.</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                      </div>
                      <span className="text-xs font-bold text-blue-200">Intervensi Diperlukan: {biggestDegradation?.name} memerlukan peninjauan sumber daya kembali.</span>
                    </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Detailed Indicator Comparison Table */}
          <div className="bg-white rounded-3xl border border-brand-border overflow-hidden shadow-sm">
            <div className="bg-slate-50/50 px-8 py-5 border-b border-brand-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TrendingUp size={18} className="text-brand-primary" />
                <h3 className="text-xs font-black text-brand-text uppercase tracking-widest">Detail Perbandingan Parameter</h3>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-black uppercase">
                <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-[#E2E8F0]" /> 2024</div>
                <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-[#0284C7]" /> 2025</div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white border-b border-slate-100">
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Kode & Indikator Mutu</th>
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">2024</th>
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">2025</th>
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Selisih</th>
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Label</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {priorityComparison.map((item, idx) => (
                    <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <span className="text-[10px] font-black text-brand-primary bg-brand-primary/5 px-2 py-1 rounded-md">{item.id}</span>
                          <span className="text-sm font-bold text-brand-text group-hover:text-brand-primary transition-colors">{item.name}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-center text-sm font-bold text-slate-400">{item.v24.toFixed(2)}</td>
                      <td className="px-8 py-5 text-center text-sm font-black text-brand-text">{item.v25.toFixed(2)}</td>
                      <td className="px-8 py-5 text-center">
                        <div className={`inline-flex items-center gap-1 font-black text-xs ${
                          item.diff > 0 ? 'text-emerald-600' : item.diff < 0 ? 'text-red-600' : 'text-slate-400'
                        }`}>
                          {item.diff > 0 ? <TrendingUp size={14} /> : item.diff < 0 ? <TrendingDown size={14} /> : <Minus size={14} />}
                          {Math.abs(item.diff).toFixed(2)}
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                          item.diff > 5 ? 'bg-emerald-50 text-emerald-600' :
                          item.diff > 0 ? 'bg-blue-50 text-blue-600' :
                          item.diff === 0 ? 'bg-slate-50 text-slate-400' :
                          'bg-red-50 text-red-600'
                        }`}>
                          {item.diff > 5 ? 'Sangat Bagus' : 
                           item.diff > 0 ? 'Naik' : 
                           item.diff === 0 ? 'Tetap' : 'Prioritas'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
