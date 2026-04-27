import React from 'react';
import { useApp } from '../lib/context';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip as RechartsTooltip
} from 'recharts';
import { Search, Filter, ArrowUpRight, ArrowDownRight, Layers, Target, UserCheck, Settings, Sparkles } from 'lucide-react';

export default function AnalisisView() {
  const { currentLevel, currentYear, data } = useApp();
  const displayData = data[currentYear]?.[currentLevel]?.analisis || [];
  const dashboardData = data[currentYear]?.[currentLevel]?.dashboard;

  const radarData = dashboardData?.priorities?.map(p => ({
    subject: p.id,
    A: p.value,
    fullMark: 100,
    name: p.name
  })) || [];

  // Group indicators based on prefix
  const groups = [
    { title: 'Kualitas Output (A)', icon: Target, prefix: 'A.' },
    { title: 'Kualitas Proses (D)', icon: Settings, prefix: 'D.' },
    { title: 'Kualitas Input (E)', icon: UserCheck, prefix: 'E.' },
    { title: 'Indikator Lainnya', icon: Layers, prefix: 'OTHER' },
  ].filter(group => !(currentLevel === 'PAUD' && group.prefix === 'A.'));

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Target className="text-brand-primary" size={20} />
            <h2 className="text-2xl font-bold text-brand-text">Indikator Prioritas {currentLevel}</h2>
            <span className="ml-2 bg-brand-primary/10 text-brand-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-brand-primary/20">
              Tahun {currentYear}
            </span>
          </div>
          <p className="text-brand-text-muted font-medium">Analisis capaian berbasis standar prioritas {currentLevel === 'PAUD' ? 'PAUD' : 'Dasmen'}.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Cari indikator..." 
              className="bg-white border border-brand-border pl-10 pr-4 py-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-primary/10 w-full md:w-64"
            />
          </div>
          <button className="bg-white border border-brand-border flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-brand-text-muted hover:bg-slate-50 transition-colors">
            <Filter size={16} />
            Filter
          </button>
        </div>
      </div>

      {displayData.length === 0 ? (
        <div className="bg-white rounded-3xl p-20 text-center border border-brand-border flex flex-col items-center">
          <Layers size={48} className="text-slate-200 mb-4" />
          <h3 className="font-bold text-brand-text">Data Belum Tersedia</h3>
          <p className="text-brand-text-muted text-sm mt-1">Silakan unggah data rapor pendidikan di menu Upload Pusat.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Radar Visualization Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-3xl border border-brand-border p-8 shadow-sm flex flex-col sm:flex-row items-center gap-8">
              <div className="w-full sm:w-1/2 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid stroke="#E2E8F0" />
                    <PolarAngleAxis 
                      dataKey="subject" 
                      tick={{ fontSize: 10, fontWeight: 900, fill: '#64748B' }}
                    />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <RechartsTooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-xl max-w-xs">
                              <p className="text-[10px] font-black text-brand-primary uppercase mb-1">{data.subject}</p>
                              <p className="text-xl font-black text-brand-text mb-1">{data.A.toFixed(2)}</p>
                              <p className="text-[9px] font-bold text-brand-text-muted leading-tight">{data.name}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Radar
                      name="Skor Indikator"
                      dataKey="A"
                      stroke="#0284C7"
                      strokeWidth={3}
                      fill="#38BDF8"
                      fillOpacity={0.4}
                      animationDuration={2000}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full sm:w-1/2 space-y-4">
                <div className="bg-brand-primary/5 p-6 rounded-2xl border border-brand-primary/10">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles size={16} className="text-brand-primary" />
                    <h4 className="text-xs font-black text-brand-text uppercase tracking-widest">Radar Mutu</h4>
                  </div>
                  <p className="text-[11px] text-brand-text-muted leading-relaxed font-medium italic">
                    Grafik jaring laba-laba di samping memvisualisasikan persebaran kekuatan mutu {currentLevel}. Sisi yang menjorok keluar menunjukkan keunggulan, sementara sisi yang ke dalam menunjukkan area yang membutuhkan intervensi strategis segera.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {radarData.map(p => (
                    <div key={p.subject} className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 flex items-center gap-2">
                      <span className="text-[9px] font-black text-brand-primary">{p.subject}</span>
                      <span className="text-[9px] font-bold text-brand-text truncate max-w-[80px]">{p.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-3xl p-8 text-white flex flex-col justify-between shadow-xl">
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 opacity-50">Kesimpulan AI</h4>
                <p className="text-lg font-bold italic leading-relaxed text-blue-100">
                  "{dashboardData?.summary || "Analisis sedang disempurnakan..."}"
                </p>
              </div>
              <div className="pt-8 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <Target size={20} className="text-blue-400" />
                </div>
                <p className="text-[9px] font-bold text-slate-400 leading-tight">
                  Sistem mengevaluasi {displayData.length} indikator rinci untuk menghasilkan peta mutu ini.
                </p>
              </div>
            </div>
          </div>

          {groups.map((group) => {
            let groupData = [];
            if (group.prefix === 'OTHER') {
              groupData = displayData.filter((item: any) => 
                !item.prioritas?.startsWith('A.') && 
                !item.prioritas?.startsWith('D.') && 
                !item.prioritas?.startsWith('E.')
              );
            } else {
              groupData = displayData.filter((item: any) => 
                item.prioritas?.startsWith(group.prefix) || 
                (group.prefix === 'A.' && !item.prioritas?.includes('.')) // Fallback for simple data
              );
            }

            if (groupData.length === 0) return null;

            return (
              <div key={group.title} className="bg-white rounded-2xl border border-brand-border overflow-hidden shadow-sm">
                <div className="bg-slate-50 px-8 py-4 border-b border-brand-border flex items-center gap-3">
                  <group.icon size={18} className="text-brand-primary" />
                  <h3 className="text-sm font-bold text-brand-text uppercase tracking-wider">{group.title}</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-white border-b border-slate-100">
                        <th className="px-8 py-4 text-[10px] font-bold text-brand-text-muted uppercase tracking-wider w-1/2">Indikator Prioritas</th>
                        <th className="px-8 py-4 text-[10px] font-bold text-brand-text-muted uppercase tracking-wider text-center">Capaian</th>
                        <th className="px-8 py-4 text-[10px] font-bold text-brand-text-muted uppercase tracking-wider text-center">Delta</th>
                        <th className="px-8 py-4 text-[10px] font-bold text-brand-text-muted uppercase tracking-wider text-right">Label</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {groupData.map((item: any, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-8 py-5">
                            <div className="flex flex-col">
                              <span className="text-[10px] font-bold text-brand-primary mb-1">{item.prioritas}</span>
                              <span className="text-sm font-bold text-brand-text group-hover:text-brand-primary transition-colors">{item.indikator}</span>
                            </div>
                          </td>
                          <td className="px-8 py-5 text-center">
                            <span className="text-sm font-black text-brand-text">{item.capaian}</span>
                          </td>
                          <td className="px-8 py-5 text-center">
                            <div className="flex items-center justify-center gap-1">
                              {item.delta?.includes('+') ? (
                                <ArrowUpRight className="text-emerald-500" size={14} />
                              ) : item.delta?.includes('-') ? (
                                <ArrowDownRight className="text-red-500" size={14} />
                              ) : null}
                              <span className={`text-xs font-bold ${
                                item.delta?.includes('+') ? 'text-emerald-600' : 
                                item.delta?.includes('-') ? 'text-red-600' : 'text-slate-400'
                              }`}>
                                {item.delta || '0%'}
                              </span>
                            </div>
                          </td>
                          <td className="px-8 py-5 text-right">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                              item.kategori === 'Sangat Baik' || item.kategori?.includes('Naik') ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                              item.kategori === 'Baik' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                              item.kategori === 'Cukup' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                              'bg-red-50 text-red-600 border border-red-100'
                            }`}>
                              {item.kategori}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
