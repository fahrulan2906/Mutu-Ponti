import React from 'react';
import { useApp } from '../lib/context';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { 
  Filter, 
  Printer, 
  ChevronDown, 
  LineChart, 
  Download, 
  BarChart3, 
  Cpu, 
  Package, 
  Star,
  Sparkles,
  Info
} from 'lucide-react';

export default function DashboardView() {
  const { currentLevel, currentYear, data } = useApp();
  
  const displayData = data[currentYear]?.[currentLevel]?.dashboard;

  const chartData = displayData ? [
    { name: 'OUTPUT', value: displayData.dimensions?.output || 0, color: '#0284C7', desc: 'Dimensi A (Hasil)' },
    { name: 'PROSES', value: displayData.dimensions?.proses || 0, color: '#10B981', desc: 'Dimensi D (Proses)' },
    { name: 'INPUT', value: displayData.dimensions?.input || 0, color: '#EA580C', desc: 'Dimensi C & E' },
  ] : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <span className="bg-brand-primary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
          Data Tahun {currentYear}
        </span>
      </div>
      {!displayData ? (
        <div className="flex flex-col items-center justify-center p-20 text-center bg-white rounded-3xl border border-[#E0E4E9]">
          <Info size={48} className="text-[#9CA3AF] mb-4" />
          <h3 className="text-lg font-bold text-[#111827]">Belum Ada Data</h3>
          <p className="text-[#6B7280] text-sm max-w-sm mt-2">Silakan unggah dokumen rapor pendidikan di menu Upload terlebih dahulu untuk sinkronisasi sistem.</p>
        </div>
      ) : (
        <>
          {/* Dimension Cards & Visualization */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Output Card */}
              <div className="bg-gradient-to-br from-[#0284C7] to-[#38BDF8] p-8 rounded-[32px] text-white shadow-xl shadow-blue-500/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform">
                  <BarChart3 size={100} strokeWidth={1} />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 opacity-80">Output</p>
                <h3 className="text-6xl font-black mb-4 tracking-tighter">{(displayData.dimensions?.output || 0).toFixed(2)}</h3>
                <p className="text-sm font-bold opacity-90 mb-6">Capaian Siswa</p>
                <span className="inline-block bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black leading-none italic">Dimensi A (Hasil)</span>
              </div>

              {/* Proses Card */}
              <div className="bg-gradient-to-br from-[#10B981] to-[#6EE7B7] p-8 rounded-[32px] text-white shadow-xl shadow-emerald-500/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform">
                  <Cpu size={100} strokeWidth={1} />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 opacity-80">Proses & Iklim</p>
                <h3 className="text-6xl font-black mb-4 tracking-tighter">{(displayData.dimensions?.proses || 0).toFixed(2)}</h3>
                <p className="text-sm font-bold opacity-90 mb-6">Kualitas & Lingkungan</p>
                <span className="inline-block bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black leading-none italic">Dimensi D (Proses)</span>
              </div>

              {/* Input Card */}
              <div className="bg-gradient-to-br from-[#EA580C] to-[#FDBA74] p-8 rounded-[32px] text-white shadow-xl shadow-orange-500/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform">
                  <Package size={100} strokeWidth={1} />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 opacity-80">Input & Tata Kelola</p>
                <h3 className="text-6xl font-black mb-4 tracking-tighter">{(displayData.dimensions?.input || 0).toFixed(2)}</h3>
                <p className="text-sm font-bold opacity-90 mb-6">GTK & Fasilitas</p>
                <span className="inline-block bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black leading-none uppercase italic">Dimensi C & E (Sumber Daya)</span>
              </div>
            </div>

            {/* Visualisasi Bar Chart */}
            <div className="bg-white rounded-[32px] border border-brand-border p-8 shadow-sm flex flex-col justify-between">
              <div className="mb-6">
                <h4 className="text-xs font-black text-brand-text uppercase tracking-widest mb-1">Visualisasi Pilar Mutu</h4>
                <p className="text-[10px] text-brand-text-muted font-bold italic">Perbandingan antara Input, Proses, dan Output pendidikan.</p>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 9, fontWeight: 900, fill: '#64748B' }} 
                    />
                    <YAxis 
                      domain={[0, 100]} 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 9, fontWeight: 700, fill: '#94A3B8' }} 
                    />
                    <Tooltip 
                      cursor={{ fill: '#F8FAFC' }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-xl">
                              <p className="text-[10px] font-black text-brand-primary uppercase mb-1">{data.name}</p>
                              <p className="text-xl font-black text-brand-text mb-1">{data.value.toFixed(2)}</p>
                              <p className="text-[9px] font-bold text-brand-text-muted italic">{data.desc}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar 
                      dataKey="value" 
                      radius={[8, 8, 0, 0]} 
                      barSize={40}
                      animationDuration={1500}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Prioritas Section */}
          <div className="bg-white rounded-[32px] border border-brand-border p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-8 border-b border-slate-100 pb-4">
              <Star className="text-orange-400 fill-orange-400" size={18} />
              <h3 className="text-sm font-black text-brand-text tracking-tight uppercase">
                {currentLevel === 'PAUD' 
                  ? 'Indikator Prioritas PAUD (Proses & Sumber Daya)' 
                  : 'Indikator Prioritas Dasmen (Literasi, Numerasi, Karakter & Iklim)'}
              </h3>
            </div>

            <div className={`grid grid-cols-1 sm:grid-cols-2 ${currentLevel === 'PAUD' ? 'lg:grid-cols-4' : 'lg:grid-cols-5'} gap-4 pt-4`}>
              {displayData.priorities?.map((item: any) => (
                <div key={item.id} className="bg-white border border-slate-200 rounded-3xl p-5 flex flex-col items-center group hover:border-brand-primary transition-all hover:shadow-xl hover:shadow-brand-primary/5 relative">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#334155] text-white text-[10px] font-black px-4 py-1 rounded shadow-sm group-hover:bg-brand-primary transition-colors">
                    {item.id}
                  </span>
                  <div className={`w-full py-5 rounded-2xl flex items-center justify-center mb-5 transition-all ${
                    item.value > 70 ? 'bg-[#059669]' : 'bg-[#FBBF24]'
                  }`}>
                    <span className="text-4xl font-black text-white tracking-tighter">{(item.value || 0).toFixed(2)}</span>
                  </div>
                  <p className="text-[11px] font-extrabold text-[#64748B] text-center leading-tight uppercase group-hover:text-brand-text transition-colors">
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Decision Panel */}
          <div className="bg-white p-8 rounded-[32px] border border-brand-border shadow-sm flex flex-col lg:flex-row items-center gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
              <Sparkles size={120} />
            </div>
            <div className="w-16 h-16 rounded-3xl bg-brand-primary/10 flex items-center justify-center shrink-0">
              <Sparkles className="text-brand-primary" size={32} />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-black text-brand-primary uppercase tracking-[0.2em] mb-2">MUTUPONTI AI Analysis</h4>
              <p className="text-lg font-bold text-brand-text italic leading-relaxed">
                "{displayData.summary || "Siapkan diri untuk transformasi pendidikan. AI sedang merumuskan strategi terbaik berdasarkan data Anda."}"
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
