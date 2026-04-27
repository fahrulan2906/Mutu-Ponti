import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  // API Route for AI Analysis
  app.post("/api/analyze", async (req, res) => {
    console.log("AI Request received for level:", req.body.level, "Year:", req.body.year);
    const { level, content, year } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("GEMINI_API_KEY not found in environment");
      return res.status(500).json({ error: "Missing GEMINI_API_KEY in environment" });
    }

    try {
      const genAI = new GoogleGenAI({ apiKey });

      const levelDataSchema: any = {
        type: Type.OBJECT,
        properties: {
          dashboard: {
            type: Type.OBJECT,
            properties: {
              dimensions: {
                type: Type.OBJECT,
                properties: {
                  output: { type: Type.NUMBER },
                  proses: { type: Type.NUMBER },
                  input: { type: Type.NUMBER }
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

      console.log(`Calling Gemini API for ${level} (${year}). Content length: ${content.length}`);
      const result = await genAI.models.generateContent({
        model: "gemini-1.5-flash",
        contents: [{
          role: 'user',
          parts: [{
            text: `PERAN: Ahli Statistik & Analis Data Pendidikan (MUTUPONTI AI).
            TUGAS: Lakukan analisis mendalam dan perhitungan statistik dari seluruh baris data rapor pendidikan jenjang ${level} untuk TAHUN ANGGARAN ${year}.
            
            DATA SUMBER (CSV Context): ${content.substring(0, 400000)}
            
            PROTOKOL AKURASI TAHUNAN (${year}):
            1. IDENTIFIKASI DINAMIS: Cari indikator utama meskipun penamaannya sedikit bervariasi (misal: A.1, "01. Kemampuan Literasi", atau "Literasi").
            2. EKSTRAKSI NILAI: Ambil nilai numerik dari kolom "Skor", "Nilai Indikator", "Capaian", atau sejenisnya.
            3. PERHITUNGAN PRIORITAS:
               - Untuk SD/SMP: Fokus pada A.1 (Literasi), A.2 (Numerasi), A.3 (Karakter), D.4 (Keamanan), D.8 (Kebinekaan).
               - Untuk PAUD: Fokus pada D.1 (Perencanaan), D.2 (Proses Belajar), D.3 (Fondasi), E.1 (Sarpras).
            4. INTEGRITY: Jangan membulatkan angka secara berlebihan. Jika angka 65.5, gunakan 65.5. Jangan gunakan data fiktif.
            
            TEMPLATE OUTPUT:
            - dashboard.dimensions: Rata-rata dari indikator level 1 untuk masing-masing dimensi.
            - dashboard.priorities: Nilai eksak dari indikator prioritas di atas.
            - analisis: Rincian setiap indikator yang ditemukan, termasuk rincian level 2 jika tersedia.
            
            Keluaran harus berupa JSON sangat rinci sesuai skema.`
          }]
        }],
        config: {
          responseMimeType: "application/json",
          responseSchema: levelDataSchema,
          temperature: 0.1
        }
      });

      const responseText = result.text;
      console.log("Gemini response text obtained");
      if (!responseText) {
        throw new Error("AI returned an empty response.");
      }
      try {
        const parsed = JSON.parse(responseText);
        res.json(parsed);
      } catch (parseErr) {
        console.error("JSON Parse Error:", parseErr, "Text:", responseText);
        throw new Error("AI returned invalid JSON format.");
      }
    } catch (error: any) {
      console.error("AI Server Error:", error);
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
