import React, { useRef, useState } from 'react';
import { useApp } from '../lib/context';
import { Printer, Download, FileCheck, Building2, Loader2 } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import * as XLSX from 'xlsx';

export default function ReportView() {
  const { currentLevel, currentYear, data } = useApp();
  const reportRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = () => {
    console.log("Starting PDF generation...");
    setIsGenerating(true);
    const element = reportRef.current;
    if (!element) {
      console.error("Report element not found");
      setIsGenerating(false);
      return;
    }

    const fileName = `Laporan_Rapor_Pendidikan_${currentLevel}_${currentYear}.pdf`;

    const opt: any = {
      margin: [10, 10, 10, 10],
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true, 
        logging: true,
        letterRendering: true
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Use simple promise-based API
    const pdfWorker = html2pdf().from(element).set(opt);
    
    pdfWorker.save()
      .then(() => {
        console.log("PDF successfully saved");
        setIsGenerating(false);
      })
      .catch((err: any) => {
        console.error('PDF Generation Error:', err);
        setIsGenerating(false);
      });
  };

  const handleDownloadExcel = () => {
    const yearData = data[currentYear]?.[currentLevel];
    if (!yearData) return;

    const reportData = [
      ["LAPORAN ANALISIS RAPOR PENDIDIKAN KOTA PONTIANAK"],
      [`Jenjang: ${currentLevel} | Tahun Anggaran: ${currentYear}`],
      [""],
      ["I. RINGKASAN CAPAIAN MUTU"],
      [yearData.dashboard?.summary || "-"],
      [""],
      ["II. AKAR MASALAH STRATEGIS"],
      ["Indikator", "Masalah", "Faktor"],
      ...(yearData.akarMasalah || []).map((item: any) => [
        item.indikator, item.masalah, item.faktor
      ]),
      [""],
      ["III. REKOMENDASI INTERVENSI"],
      ["Program Unggulan", "Kegiatan", "Target"],
      ...(yearData.rekomendasi || []).map((item: any) => [
        item.program, item.kegiatan, item.target
      ])
    ];

    const ws = XLSX.utils.aoa_to_sheet(reportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Laporan Mutu");
    XLSX.writeFile(wb, `Laporan_Rapor_Pendidikan_${currentLevel}_${currentYear}.xlsx`);
  };

  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-brand-text">Pratinjau & Cetak Laporan</h2>
          <p className="text-brand-text-muted font-medium">Laporan resmi analisis mutu pendidikan Kota Pontianak.</p>
        </div>
        <div className="flex gap-4 print:hidden">
          <button 
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            className="bg-brand-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-brand-primary/20 hover:bg-brand-primary/90 transition-all font-sans disabled:opacity-50"
          >
            {isGenerating ? <Loader2 size={20} className="animate-spin" /> : <Printer size={20} />}
            <span>{isGenerating ? 'Memproses...' : 'Cetak PDF'}</span>
          </button>
          <button 
            onClick={handleDownloadExcel}
            className="bg-white border border-brand-border text-brand-text-muted px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-colors font-sans"
          >
            <Download size={20} />
            <span>XLSX</span>
          </button>
        </div>
      </div>

      <div className="flex justify-center bg-slate-200 p-8 -mx-8 sm:rounded-none lg:rounded-3xl shadow-inner min-h-[1000px] print:bg-white print:p-0 print:shadow-none font-sans">
        <div 
          ref={reportRef}
          className="bg-white w-full max-w-[800px] px-16 py-20 shadow-2xl print:shadow-none relative overflow-hidden ring-1 ring-slate-300"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] rotate-[-45deg] pointer-events-none select-none">
            <Building2 size={600} />
          </div>

          <div className="flex items-center justify-center gap-8 border-b-4 border-slate-900 pb-6 mb-10 text-center relative z-10">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/6/64/Logo_Kota_Pontianak.png" 
              alt="Logo Pemerintah Kota Pontianak"
              className="h-28 w-auto object-contain"
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
            />
            <div>
              <h1 className="text-xl font-bold uppercase text-slate-800">Pemerintah Kota Pontianak</h1>
              <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900">Dinas Pendidikan dan Kebudayaan</h2>
              <p className="text-sm font-bold text-slate-700 italic">Mencerdaskan Kehidupan Bangsa</p>
              <p className="text-xs font-medium mt-1 text-slate-600">Jln. Letjend Sutoyo No. 12, Pontianak, Kalimantan Barat</p>
              <p className="text-xs font-medium text-slate-600">Telepon: (0561) 7323xx | Website: dindik.pontianak.go.id</p>
            </div>
          </div>

          <div className="text-center mb-12 relative z-10">
            <h3 className="text-lg font-bold underline uppercase">Laporan Analisis Rapor Pendidikan</h3>
            <p className="text-sm font-bold mt-1">Jenjang: {currentLevel} | Tahun Anggaran {currentYear}</p>
            <p className="text-xs text-[#6B7280] mt-1">Ref: MUTUPONTI/RPT/{currentLevel}/{currentYear}/001</p>
          </div>

          <div className="space-y-10 relative z-10">
            <section>
              <h4 className="text-sm font-black border-b border-gray-300 pb-1 mb-4 flex items-center gap-2">
                <FileCheck size={16} /> I. RINGKASAN CAPAIAIN MUTU
              </h4>
              <p className="text-sm leading-relaxed text-justify text-gray-700">
                {data[currentYear]?.[currentLevel]?.dashboard?.summary || "Belum ada rangkuman analisis untuk jenjang ini."}
              </p>
            </section>

            <section>
              <h4 className="text-sm font-black border-b border-gray-300 pb-1 mb-4">II. AKAR MASALAH STRATEGIS</h4>
              <ul className="space-y-4">
                {(data[currentYear]?.[currentLevel]?.akarMasalah || []).length > 0 ? (
                  data[currentYear][currentLevel].akarMasalah.map((item: any, i: number) => (
                    <li key={i} className="text-sm">
                      <p className="font-bold">- {item.indikator}: {item.masalah}</p>
                      <p className="text-gray-600 pl-4">Faktor: {item.faktor}</p>
                    </li>
                  ))
                ) : (
                  <p className="text-xs italic text-gray-400">Belum ada identifikasi akar masalah.</p>
                )}
              </ul>
            </section>

            <section>
              <h4 className="text-sm font-black border-b border-gray-300 pb-1 mb-4">III. REKOMENDASI INTERVENSI</h4>
              <table className="w-full text-xs border border-gray-400">
                <thead>
                  <tr className="bg-gray-100 italic">
                    <th className="border border-gray-400 p-2 text-left">Program Unggulan</th>
                    <th className="border border-gray-400 p-2 text-left">Kegiatan & Target</th>
                  </tr>
                </thead>
                <tbody>
                  {(data[currentYear]?.[currentLevel]?.rekomendasi || []).length > 0 ? (
                    data[currentYear][currentLevel].rekomendasi.map((item: any, i: number) => (
                      <tr key={i}>
                        <td className="border border-gray-400 p-2 font-bold">{item.program}</td>
                        <td className="border border-gray-400 p-2">
                          <p>{item.kegiatan}</p>
                          <p className="mt-1 font-bold text-[10px] text-blue-700">Target: {item.target}</p>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2} className="border border-gray-400 p-4 text-center italic text-gray-400">Belum ada rekomendasi program.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </section>
          </div>

          <div className="mt-20 flex justify-end relative z-10">
            <div className="text-center w-64">
              <p className="text-sm mb-20 text-slate-800">Pontianak, {currentDate}</p>
              <p className="text-sm font-bold underline text-slate-900">Fahrulan Rozali, M.Pd.</p>
              <p className="text-xs text-slate-700 font-bold mt-1">NIP. 19850629 200902 1 001</p>
              <p className="text-[10px] text-slate-400 mt-6 italic uppercase leading-tight">Laporan ini sah dan dihasilkan secara otomatis melalui sistem analisis MUTUPONTI AI</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
