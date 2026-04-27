export async function analyzeLevelData(level: 'PAUD' | 'SD' | 'SMP', content: string, year: string) {
  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ level, content, year }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: "Gagal memproses data melalui server." }));
      throw new Error(errorData.error || "Gagal memproses data melalui server.");
    }

    return await response.json();
  } catch (error: any) {
    console.error(`Analysis failed for ${level}:`, error);
    throw error;
  }
}
