import React, { useState } from 'react';
import { Upload, FileUp, CheckCircle, AlertCircle, Loader2, Sparkles, Baby, School, GraduationCap } from 'lucide-react';
import { useApp } from '../lib/context';
import { analyzeLevelData } from '../lib/gemini';
import { ZeroData } from '../lib/constants';
import { motion } from 'motion/react';
import * as XLSX from 'xlsx';

export default function UploadView() {
  const { data: allData, setData, currentYear, setCurrentYear } = useApp();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  // Track files for each year independently
  const [filesByYear, setFilesByYear] = useState<{ [year: string]: { [level: string]: File | null } }>({
    '2024': { PAUD: null, SD: null, SMP: null },
    '2025': { PAUD: null, SD: null, SMP: null }
  });

  const files = filesByYear[currentYear] || { PAUD: null, SD: null, SMP: null };

  const handleFileChange = (level: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFilesByYear(prev => ({
        ...prev,
        [currentYear]: {
          ...prev[currentYear],
          [level]: file
        }
      }));
      setSuccess(false);
      setError('');
    }
  };

  const removeFile = (level: string) => {
    setFilesByYear(prev => ({
      ...prev,
      [currentYear]: {
        ...prev[currentYear],
        [level]: null
      }
    }));
  };

  const readFileContent = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const bstr = event.target?.result;
          const workbook = XLSX.read(bstr, { type: 'binary' });
          let fullText = "";
          workbook.SheetNames.forEach(sheetName => {
            const worksheet = workbook.Sheets[sheetName];
            fullText += XLSX.utils.sheet_to_csv(worksheet);
          });
          resolve(fullText);
        } catch (e) {
          reject(new Error(`Gagal membaca file ${file.name}.`));
        }
      };
      reader.onerror = () => reject(new Error(`Gagal mengunggah ${file.name}.`));
      reader.readAsBinaryString(file);
    });
  };

  const startAnalysis = async () => {
    const uploadedLevels = Object.keys(files).filter(k => files[k] !== null) as ('PAUD' | 'SD' | 'SMP')[];
    if (uploadedLevels.length === 0) {
      setError('Silakan pilih minimal satu file untuk dianalisis.');
      return;
    }

    setIsUploading(true);
    setSuccess(false);
    setError('');

    try {
      // Menjalankan analisis untuk setiap jenjang secara paralel guna meningkatkan kecepatan
      const analysisPromises = uploadedLevels.map(async (level) => {
        const file = files[level]!;
        const content = await readFileContent(file);
        const result = await analyzeLevelData(level, content, currentYear);
        return { level, result };
      });

      const results = await Promise.all(analysisPromises);
      
      const newAppData = JSON.parse(JSON.stringify(allData[currentYear] || ZeroData));
      let hasValidResult = false;

      results.forEach(({ level, result }) => {
        if (result && Object.keys(result).length > 1) {
          newAppData[level] = { ...ZeroData[level], ...result };
          hasValidResult = true;
        }
      });

      if (hasValidResult) {
        setData(currentYear, newAppData);
        setSuccess(true);
      } else {
        throw new Error("AI gagal memproses data. Pastikan file berisi Rapor Pendidikan yang valid.");
      }
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat sinkronisasi data.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleYearChange = (year: string) => {
    setCurrentYear(year);
    setSuccess(false);
    setError('');
  };

  const levels = [
    { id: 'PAUD', label: 'PAUD / TK', icon: Baby, color: 'border-pink-200' },
    { id: 'SD', label: 'Sekolah Dasar (SD)', icon: School, color: 'border-red-200' },
    { id: 'SMP', label: 'Sekolah Menengah Pertama (SMP)', icon: GraduationCap, color: 'border-blue-200' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-brand-primary/5 px-4 py-2 rounded-full mb-4">
          <Sparkles size={14} className="text-brand-sky" />
          <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">Multi-Year & Multi-Level Insight</span>
        </div>
        <h2 className="text-3xl font-black text-brand-text tracking-tight uppercase">Pusat Unggah {currentYear}</h2>
        <p className="text-brand-text-muted font-medium mt-2">Unggah file Rapor Pendidikan secara terpisah untuk setiap jenjang pada tahun {currentYear}.</p>
        
        {/* Year Selector */}
        <div className="mt-8 flex justify-center">
          <div className="bg-slate-100 p-1 rounded-2xl flex gap-1">
            {['2024', '2025'].map(year => (
              <button
                key={year}
                onClick={() => handleYearChange(year)}
                className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  currentYear === year 
                    ? 'bg-white text-brand-primary shadow-sm' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Tahun {year}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {levels.map((lvl) => (
          <div key={lvl.id} className={`bg-white rounded-3xl p-8 border border-brand-border flex flex-col items-center text-center shadow-sm relative overflow-hidden group hover:border-brand-primary transition-all ${files[lvl.id] ? 'bg-blue-50/30' : ''}`}>
            {files[lvl.id] && (
              <div className="absolute top-4 right-4 text-emerald-500">
                <CheckCircle size={24} />
              </div>
            )}
            
            <div className={`p-6 rounded-2xl bg-brand-bg text-brand-primary mb-6 transition-transform group-hover:scale-110`}>
              <lvl.icon size={32} />
            </div>

            <h3 className="font-extrabold text-brand-text mb-2 uppercase tracking-tighter">{lvl.label}</h3>
            
            {!files[lvl.id] ? (
              <>
                <p className="text-[10px] text-brand-text-muted uppercase font-bold tracking-widest mb-6">Belum Ada File</p>
                <label className="w-full cursor-pointer">
                  <input type="file" className="hidden" onChange={(e) => handleFileChange(lvl.id, e)} disabled={isUploading} />
                  <div className="bg-white border-2 border-dashed border-slate-200 py-4 rounded-2xl text-[11px] font-black text-brand-text-muted hover:border-brand-primary hover:text-brand-primary transition-all">
                    PILIH FILE .XLSX
                  </div>
                </label>
              </>
            ) : (
              <div className="w-full">
                <div className="bg-white border border-brand-primary/20 rounded-2xl p-4 mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <FileUp size={16} className="text-brand-primary shrink-0" />
                    <span className="text-[11px] font-bold text-brand-text truncate">{files[lvl.id]!.name}</span>
                  </div>
                  <button onClick={() => removeFile(lvl.id)} className="text-red-400 hover:text-red-600 transition-colors">
                    <AlertCircle size={16} />
                  </button>
                </div>
                <p className="text-[9px] text-emerald-600 font-bold uppercase tracking-widest">Siap Analisis</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-6 pt-6">
        <button
          onClick={startAnalysis}
          disabled={isUploading || Object.values(files).every(f => f === null)}
          className={`px-16 py-5 rounded-2xl font-black text-white shadow-2xl flex items-center gap-4 transition-all ${
            isUploading || Object.values(files).every(f => f === null)
              ? 'bg-slate-300 shadow-none cursor-not-allowed'
              : 'bg-brand-primary shadow-brand-primary/30 hover:scale-105 active:scale-95'
          }`}
        >
          {isUploading ? <Loader2 size={24} className="animate-spin" /> : <Sparkles size={24} />}
          <span className="uppercase tracking-widest text-lg">
            {isUploading ? 'Menganalisis Global...' : 'Mulai Analisis Sistem Terintegrasi'}
          </span>
        </button>

        {isUploading && (
          <p className="text-[10px] font-black text-brand-primary animate-pulse uppercase tracking-[0.2em]">
            MUTUPONTI AI sedang mengolah data terfragmentasi menjadi wawasan strategis...
          </p>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600">
            <AlertCircle size={18} />
            <span className="text-xs font-bold">{error}</span>
          </div>
        )}

        {success && (
          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-3 text-emerald-700">
            <CheckCircle size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">SINKRONISASI BERHASIL! DATA TERDISTRIBUSI KE SELURUH JENJANG.</span>
          </div>
        )}
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 opacity-60">
        {[
          { label: 'Pemisahan Jenjang', desc: 'Data PAUD, SD, dan SMP kini dikelola secara terpisah untuk akurasi maksimal.' },
          { label: 'Analisis Tunggal', desc: 'Proses sekali untuk sinkronisasi seluruh ekosistem pendidikan.' },
          { label: 'Wawasan Terpadu', desc: 'AI mendeteksi korelasi antara capaian dasar dan menengah.' }
        ].map(card => (
          <div key={card.label} className="bg-white p-6 rounded-2xl border border-brand-border">
            <h4 className="font-bold text-brand-text text-[11px] mb-1 uppercase tracking-tighter">{card.label}</h4>
            <p className="text-[10px] text-brand-text-muted leading-relaxed font-medium">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
