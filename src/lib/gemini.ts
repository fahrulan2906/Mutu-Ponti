import { GoogleGenAI, Type } from "@google/genai";

const MODEL_NAME = "gemini-3.1-flash-lite-preview";
let aiInstance: any = null;

function getAI() {
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
  }
  return aiInstance;
}

export async function analyzeLevelData(level: 'PAUD' | 'SD' | 'SMP', content: string, year: string) {
  const levelDataSchema = {
    type: Type.OBJECT,
    properties: {
      dashboard: {
        type: Type.OBJECT,
        properties: {
          dimensions: {
            type: Type.OBJECT,
            properties: {
              output: { type: Type.NUMBER, description: "Dimensi A (Hasil)" },
              proses: { type: Type.NUMBER, description: "Dimensi D (Proses)" },
              input: { type: Type.NUMBER, description: "Dimensi C & E (Sumber Daya)" }
            }
          },
          priorities: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                name: { type: Type.STRING },
                value: { type: Type.NUMBER }
              }
            }
          },
          summary: { type: Type.STRING }
        }
      },
      analisis: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            prioritas: { type: Type.STRING },
            indikator: { type: Type.STRING },
            capaian: { type: Type.STRING },
            delta: { type: Type.STRING },
            kategori: { type: Type.STRING }
          }
        }
      },
      akarMasalah: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            indikator: { type: Type.STRING },
            masalah: { type: Type.STRING },
            faktor: { type: Type.STRING }
          }
        }
      },
      rekomendasi: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            program: { type: Type.STRING },
            kegiatan: { type: Type.STRING },
            target: { type: Type.STRING }
          }
        }
      }
    }
  };

  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `PERAN: Ahli Statistik & Analis Data Pendidikan (MUTUPONTI AI).
      TUGAS: Lakukan analisis mendalam dan perhitungan statistik dari seluruh baris data rapor pendidikan jenjang ${level} untuk TAHUN ANGGARAN ${year}.
      
      DATA SUMBER (Text/CSV Context): ${content.substring(0, 120000)}
      
      PROTOKOL AKURASI TAHUNAN (${year}):
      1. ANALISIS KOMPREHENSIF: Anda harus memindai SETIAP BARIS dalam file. Jangan mengabaikan data apapun.
      2. PERHITUNGAN DETAIL: Semua angka yang muncul di dashboard HARUS merupakan hasil perhitungan riil dari data ${year}. Jika data berbeda dari tahun lain, hasil HARUS mencerminkan perbedaan tersebut.
      3. ZERO TOLERANCE: Dilarang keras mengarang atau menggunakan data statis. Gunakan 0 jika data tidak ditemukan dalam file.
      
      STARK REQUIREMENT PER JENJANG:
      - JENJANG PAUD: Prioritas Dashboard HARUS (D.1 Perencanaan, D.2 Proses Belajar, D.3 Kemampuan Fondasi, E.1 Sarpras). Dimensi Output (A) WAJIB 0.
      - JENJANG SD/SMP: Prioritas Dashboard HARUS (A.1 Literasi, A.2 Numerasi, A.3 Karakter, D.4 Keamanan, D.8 Kebinekaan).
      
      TABEL ANALISIS: Isi array 'analisis' dengan data ${year} yang mencakup prioritas, indikator, capaian, delta (pertumbuhan), dan kategori.
      
      TEMPLATE OUTPUT:
      - dashboard.dimensions: Rata-rata dari indikator level 1 untuk masing-masing dimensi.
      - dashboard.priorities: Nilai eksak dari indikator prioritas di atas.
      - analisis: Rincian setiap indikator yang ditemukan, termasuk delta (jika ada data perbandingan di file) dan kategori (Baik/Cukup/Kurang).
      
      Keluaran harus berupa JSON sangat rinci sesuai skema.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: levelDataSchema
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error(`AI Analysis failed for ${level}:`, error);
    return null;
  }
}
