import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  LineChart, Line
} from 'recharts';

export const Initial2024 = {
  PAUD: {
    dashboard: {
      dimensions: { output: 0, proses: 68.45, input: 62.12 },
      priorities: [
        { id: 'D.1', name: 'Perencanaan untuk Proses Pembelajaran yang efektif', value: 65.20 },
        { id: 'D.2', name: 'Proses belajar yang sesuai bagi anak usia dini', value: 72.15 },
        { id: 'D.3', name: 'Pembelajaran yang membangun kemampuan fondasi', value: 58.40 },
        { id: 'E.1', name: 'Indeks ketersediaan Sarana Prasarana Esensial', value: 70.05 },
      ],
      summary: "Capaian PAUD tahun 2024 menunjukkan fokus pada proses belajar, namun sarana esensial masih memerlukan peningkatan merata."
    },
    analisis: [], akarMasalah: [], rekomendasi: []
  },
  SD: {
    dashboard: {
      dimensions: { output: 62.45, proses: 71.20, input: 65.80 },
      priorities: [
        { id: 'A.1', name: 'Kemampuan Literasi', value: 64.20 },
        { id: 'A.2', name: 'Kemampuan Numerasi', value: 52.15 },
        { id: 'A.3', name: 'Karakter', value: 68.40 },
        { id: 'D.4', name: 'Iklim Keamanan', value: 85.05 },
        { id: 'D.8', name: 'Iklim Kebhinekaan', value: 90.12 },
      ],
      summary: "Tahun 2024, jenjang SD unggul dalam iklim keamanan dan kebinekaan, namun numerasi masih menjadi tantangan utama."
    },
    analisis: [], akarMasalah: [], rekomendasi: []
  },
  SMP: {
    dashboard: {
      dimensions: { output: 68.12, proses: 75.40, input: 70.25 },
      priorities: [
        { id: 'A.1', name: 'Kemampuan Literasi', value: 72.45 },
        { id: 'A.2', name: 'Kemampuan Numerasi', value: 58.12 },
        { id: 'A.3', name: 'Karakter', value: 71.20 },
        { id: 'D.4', name: 'Iklim Keamanan', value: 82.35 },
        { id: 'D.8', name: 'Iklim Kebhinekaan', value: 88.50 },
      ],
      summary: "Siswa SMP menunjukkan literasi yang cukup baik di 2024, dengan dukungan iklim sekolah yang inklusif."
    },
    analisis: [], akarMasalah: [], rekomendasi: []
  }
};

export const Initial2025 = {
  PAUD: {
    dashboard: {
      dimensions: { output: 0, proses: 72.12, input: 68.45 },
      priorities: [
        { id: 'D.1', name: 'Perencanaan untuk Proses Pembelajaran yang efektif', value: 71.45 },
        { id: 'D.2', name: 'Proses belajar yang sesuai bagi anak usia dini', value: 75.80 },
        { id: 'D.3', name: 'Pembelajaran yang membangun kemampuan fondasi', value: 64.20 },
        { id: 'E.1', name: 'Indeks ketersediaan Sarana Prasarana Esensial', value: 74.15 },
      ],
      summary: "Estimasi 2025 menunjukkan tren positif pada perencanaan pembelajaran seiring dengan pelatihan guru yang masif."
    },
    analisis: [], akarMasalah: [], rekomendasi: []
  },
  SD: {
    dashboard: {
      dimensions: { output: 67.85, proses: 74.30, input: 69.15 },
      priorities: [
        { id: 'A.1', name: 'Kemampuan Literasi', value: 70.12 },
        { id: 'A.2', name: 'Kemampuan Numerasi', value: 58.45 },
        { id: 'A.3', name: 'Karakter', value: 72.10 },
        { id: 'D.4', name: 'Iklim Keamanan', value: 88.20 },
        { id: 'D.8', name: 'Iklim Kebhinekaan', value: 92.45 },
      ],
      summary: "Tahun 2025 diproyeksikan adanya kenaikan pada literasi dan numerasi melalui program penguatan kurikulum merdeka."
    },
    analisis: [], akarMasalah: [], rekomendasi: []
  },
  SMP: {
    dashboard: {
      dimensions: { output: 71.40, proses: 78.15, input: 73.50 },
      priorities: [
        { id: 'A.1', name: 'Kemampuan Literasi', value: 76.20 },
        { id: 'A.2', name: 'Kemampuan Numerasi', value: 64.15 },
        { id: 'A.3', name: 'Karakter', value: 75.80 },
        { id: 'D.4', name: 'Iklim Keamanan', value: 85.12 },
        { id: 'D.8', name: 'Iklim Kebhinekaan', value: 90.35 },
      ],
      summary: "Performa SMP 2025 diperkirakan meningkat, didorong oleh efektivitas komunitas belajar di tingkat kota."
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
