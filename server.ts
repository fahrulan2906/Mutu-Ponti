import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  // API Analysis Endpoint (Server-side for security and reliability)
  app.post("/api/analyze", async (req, res) => {
    const { level, content, year } = req.body;
    
    // Get and sanitize API Key (Only available on server)
    const apiKey = (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY ||"").trim().replace(/["'']/g, '');

    if (!apiKey) {
      console.error("[AI SERVICE] Missing API Key. Pastikan GEMINI_API_KEY sudah ditambahkan di Vercel Environment Variables.")
      return res.status(500).json({ error: "API Key Gemini tidak ditemukan di server. Silahkan cek pengaturan di Vercel." });
    }
console.log("[AI SERVICE] Gemini API Key berhasil dimuat (panjang:",api.Key.length, ")");
    try {
      const ai = new GoogleGenerativeAI({ apiKey });
      
      // Data optimization
      const lines = content.split('\n');
      const filteredLines = lines
        .map((l: string) => l.trim())
        .filter((l: string) => l.length > 0 && (l.includes(',') || l.includes(';')))
        .slice(0, 500); 
      
      const optimizedContent = filteredLines.join('\n');
      if (filteredLines.length < 2) throw new Error("Data CSV terlalu singkat atau tidak valid.");

      const prompt = `ANDA: Pakar Analisis Rapor Pendidikan Indonesia.
        TUGAS: Analisis Data CSV Rapor Pendidikan Jenjang ${level} Tahun ${year}.
        
        DATA RAW (CSV):
        ${optimizedContent}
        
        SYARAT EKSTRAKSI KETAT (CRITICAL):
        1. PAUD POLICY (MANDATORY): Pada jenjang PAUD, banyak indikator yang bernilai 0. Jika di CSV nilai tertulis "0", "0.0", "-", atau kosong, maka NILAI DI JSON HARUS TETAP 0. JANGAN melakukan halusinasi, estimasi, atau pengisian nilai otomatis.
        2. IDENTIFIKASI KOLOM: CSV ini menggunakan pemisah ',' atau ';'. Cari kolom: 'Indikator', 'Skor', 'Nilai Indikator', atau 'Capaian'.
        3. PRIORITAS ${level}:
           - Jika SMP/SD (Dasmen), wajib cari data untuk 5 Indikator: 
             1. 'Kemampuan Literasi', 
             2. 'Kemampuan Numerasi', 
             3. 'Karakter', 
             4. 'Iklim Keamanan' (atau 'Iklim Keamanan Satuan Pendidikan'), 
             5. 'Iklim Kebhinekaan' (atau 'Iklim Kebhinekaan').
           - Jika PAUD, wajib cari data untuk 4 Indikator: 
             1. 'Perencanaan untuk Proses Pembelajaran yang efektif' (D.1), 
             2. 'Proses belajar yang sesuai bagi anak usia dini' (D.2), 
             3. 'Pembelajaran yang membangun kemampuan fondasi' (D.3), 
             4. 'Indeks ketersediaan Sarana Prasarana Esensial' (E.1).
        4. DASHBOARD: Hitung rata-rata dimensi (0-100). Jika data 0, rata-rata dimensi tersebut harus 0.
        5. NILAI PRIORITAS: Pastikan 'priorities' di JSON berisi tepat item-item di atas sesuai jenjangnya. Gunakan nama indikator yang persis sama seperti instruksi nomor 3 (misalnya pakai 'Iklim Keamanan' dan 'Iklim Kebhinekaan').
        6. COCOKKAN NAMA: Jika kolom indikator mengandung kata kunci di atas (seperti 'Literasi' saja atau 'Numerasi' saja), anggap itu cocok. JANGAN salah mengambil sub-indikator.
        
        WAJIB OUTPUT JSON VALID DENGAN SKEMA:
        {
          "dashboard": {
            "dimensions": { "output": number, "proses": number, "input": number },
            "priorities": [ { "id": string, "name": string, "value": number } ],
            "summary": string
          },
          "analisis": [ { "prioritas": string, "indikator": string, "capaian": string, "delta": string, "kategori": string } ],
          "akarMasalah": [ { "indikator": string, "masalah": string, "faktor": string } ],
          "rekomendasi": [ { "program": string, "kegiatan": string, "target": string } ]
        }`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const text = (response.text || "").trim().replace(/```json\n?|```/g, "").trim();
      res.json(JSON.parse(text));
    } catch (error: any) {
      console.error("[AI SERVICE] Error:", error);
      res.status(500).json({ error: error.message || "Gagal memproses data melalui AI." });
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
