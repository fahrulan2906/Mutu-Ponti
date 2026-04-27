import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  LineChart, Line
} from 'recharts';

export const Initial2024 = {
  PAUD: {
    dashboard: {
      dimensions: { output: 0, proses: 64.18, input: 5.68 },
      priorities: [
        { id: 'D.1', name: 'Perencanaan untuk Proses Pembelajaran yang efektif', value: 51.58 },
        { id: 'D.2', name: 'Proses belajar yang sesuai bagi anak usia dini', value: 65.54 },
        { id: 'D.3', name: 'Pembelajaran yang membangun kemampuan fondasi', value: 75.43 },
        { id: 'E.1', name: 'Indeks ketersediaan Sarana Prasarana Esensial', value: 5.68 },
      ],
      summary: "Capaian PAUD Kota Pontianak 2024 menunjukkan kekuatan pada pembelajaran fondasi, namun sarana prasarana esensial masih sangat rendah."
    },
    analisis: [], akarMasalah: [], rekomendasi: []
  },
  SD: {
    dashboard: {
      dimensions: { output: 66.35, proses: 72.48, input: 70.84 },
      priorities: [
        { id: 'A.1', name: 'Kemampuan Literasi', value: 78.89 },
        { id: 'A.2', name: 'Kemampuan Numerasi', value: 62.44 },
        { id: 'A.3', name: 'Karakter', value: 57.71 },
        { id: 'D.4', name: 'Iklim Keamanan', value: 72.48 },
        { id: 'D.8', name: 'Iklim Kebhinekaan', value: 70.84 },
      ],
      summary: "Tahun 2024, jenjang SD Kota Pontianak memiliki literasi yang baik (78.89), namun karakter dan numerasi masih di level sedang."
    },
    analisis: [], akarMasalah: [], rekomendasi: []
  },
  SMP: {
    dashboard: {
      dimensions: { output: 72.91, proses: 70.30, input: 78.04 },
      priorities: [
        { id: 'A.1', name: 'Kemampuan Literasi', value: 81.76 },
        { id: 'A.2', name: 'Kemampuan Numerasi', value: 72.20 },
        { id: 'A.3', name: 'Karakter', value: 64.78 },
        { id: 'D.4', name: 'Iklim Keamanan', value: 70.30 },
        { id: 'D.8', name: 'Iklim Kebhinekaan', value: 78.04 },
      ],
      summary: "SMP Kota Pontianak 2024 menunjukkan performa literasi yang kuat (81.76) didukung oleh iklim kebhinekaan yang sangat baik."
    },
    analisis: [], akarMasalah: [], rekomendasi: []
  }
};

export const Initial2025 = {
  PAUD: {
    dashboard: {
      dimensions: { output: 0, proses: 65.74, input: 18.06 },
      priorities: [
        { id: 'D.1', name: 'Perencanaan untuk Proses Pembelajaran yang efektif', value: 52.43 },
        { id: 'D.2', name: 'Proses belajar yang sesuai bagi anak usia dini', value: 62.40 },
        { id: 'D.3', name: 'Pembelajaran yang membangun kemampuan fondasi', value: 82.38 },
        { id: 'E.1', name: 'Indeks ketersediaan Sarana Prasarana Esensial', value: 18.06 },
      ],
      summary: "Proyeksi PAUD 2025 menunjukkan peningkatan signifikan pada pembelajaran fondasi dan sarana esensial."
    },
    analisis: [], akarMasalah: [], rekomendasi: []
  },
  SD: {
    dashboard: {
      dimensions: { output: 65.05, proses: 79.10, input: 71.62 },
      priorities: [
        { id: 'A.1', name: 'Kemampuan Literasi', value: 78.33 },
        { id: 'A.2', name: 'Kemampuan Numerasi', value: 59.93 },
        { id: 'A.3', name: 'Karakter', value: 56.90 },
        { id: 'D.4', name: 'Iklim Keamanan', value: 79.10 },
        { id: 'D.8', name: 'Iklim Kebhinekaan', value: 71.62 },
      ],
      summary: "Tahun 2025, SD Kota Pontianak diprediksi mengalami peningkatan signifikan pada iklim keamanan sekolah."
    },
    analisis: [], akarMasalah: [], rekomendasi: []
  },
  SMP: {
    dashboard: {
      dimensions: { output: 77.03, proses: 86.06, input: 81.33 },
      priorities: [
        { id: 'A.1', name: 'Kemampuan Literasi', value: 86.28 },
        { id: 'A.2', name: 'Kemampuan Numerasi', value: 79.70 },
        { id: 'A.3', name: 'Karakter', value: 65.11 },
        { id: 'D.4', name: 'Iklim Keamanan', value: 86.06 },
        { id: 'D.8', name: 'Iklim Kebhinekaan', value: 81.33 },
      ],
      summary: "Proforma SMP 2025 diperkirakan meningkat pesat terutama pada kemampuan literasi dan iklim sekolah."
    },
    analisis: [], akarMasalah: [], rekomendasi: []
  }
};

export const ZeroData = {
  PAUD: {
    dashboard: {
      dimensions: {
        output: 0,
        proses: 0,
        input: 0
      },
      priorities: [
        { id: 'D.1', name: 'Perencanaan untuk Proses Pembelajaran yang efektif', value: 0 },
        { id: 'D.2', name: 'Proses belajar yang sesuai bagi anak usia dini', value: 0 },
        { id: 'D.3', name: 'Pembelajaran yang membangun kemampuan fondasi', value: 0 },
        { id: 'E.1', name: 'Indeks ketersediaan Sarana Prasarana Esensial', value: 0 },
      ],
      summary: "Silakan unggah data untuk memulai analisis AI."
    },
    analisis: [],
    akarMasalah: [],
    rekomendasi: []
  },
  SD: {
    dashboard: {
      dimensions: {
        output: 0,
        proses: 0,
        input: 0
      },
      priorities: [
        { id: 'A.1', name: 'Kemampuan Literasi', value: 0 },
        { id: 'A.2', name: 'Kemampuan Numerasi', value: 0 },
        { id: 'A.3', name: 'Karakter', value: 0 },
        { id: 'D.4', name: 'Iklim Keamanan', value: 0 },
        { id: 'D.8', name: 'Iklim Kebhinekaan', value: 0 },
      ],
      summary: "Silakan unggah data untuk memulai analisis AI."
    },
    analisis: [],
    akarMasalah: [],
    rekomendasi: []
  },
  SMP: {
    dashboard: {
      dimensions: {
        output: 0,
        proses: 0,
        input: 0
      },
      priorities: [
        { id: 'A.1', name: 'Kemampuan Literasi', value: 0 },
        { id: 'A.2', name: 'Kemampuan Numerasi', value: 0 },
        { id: 'A.3', name: 'Karakter', value: 0 },
        { id: 'D.4', name: 'Iklim Keamanan', value: 0 },
        { id: 'D.8', name: 'Iklim Kebhinekaan', value: 0 },
      ],
      summary: "Silakan unggah data untuk memulai analisis AI."
    },
    analisis: [],
    akarMasalah: [],
    rekomendasi: []
  }
};

export const DashboardMock = {
  PAUD: {
    scores: [
      { name: 'Literasi Sejak Dini', value: 65, fullMark: 100 },
      { name: 'Numerasi Sejak Dini', value: 45, fullMark: 100 },
      { name: 'Indeks Inklusivitas', value: 80, fullMark: 100 },
      { name: 'Kepemimpinan Instruksional', value: 70, fullMark: 100 },
      { name: 'Refleksi Guru', value: 90, fullMark: 100 },
    ],
    summary: "Capaian PAUD di Pontianak menunjukkan kekuatan dalam refleksi guru namun perlu peningkatan substansial di bidang numerasi awal."
  },
  SD: {
    scores: [
      { name: 'Literasi', value: 78, fullMark: 100 },
      { name: 'Numerasi', value: 52, fullMark: 100 },
      { name: 'Iklim Keamanan', value: 85, fullMark: 100 },
      { name: 'Kualitas Pembelajaran', value: 68, fullMark: 100 },
      { name: 'Iklim Kebhinekaan', value: 92, fullMark: 100 },
    ],
    summary: "Jenjang SD menunjukkan tingkat kebhinekaan yang sangat tinggi, namun tantangan besar masih ada pada kompetensi numerasi siswa."
  },
  SMP: {
    scores: [
      { name: 'Literasi', value: 82, fullMark: 100 },
      { name: 'Numerasi', value: 60, fullMark: 100 },
      { name: 'Iklim Keamanan', value: 88, fullMark: 100 },
      { name: 'Metode Pembelajaran', value: 75, fullMark: 100 },
      { name: 'Kemandirian', value: 80, fullMark: 100 },
    ],
    summary: "SMP di Kota Pontianak secara konsisten unggul dalam literasi, tetapi integrasi IT dalam numerasi perlu diperkuat."
  }
};

export const AnalysisTable = [
  { level: 'PAUD', indikator: 'Fasilitas Sanitasi', capaian: '85%', kategori: 'Baik' },
  { level: 'SD', indikator: 'Kompetensi GTK', capaian: '72%', kategori: 'Cukup' },
  { level: 'SMP', indikator: 'Akses Internet', capaian: '95%', kategori: 'Sangat Baik' },
];
