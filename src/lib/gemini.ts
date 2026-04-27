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
      const errorData = await response.json();
      throw new Error(errorData.error || "Gagal memproses data melalui server.");
    }

    return await response.json();
  } catch (error) {
    console.error(`API Analysis failed for ${level}:`, error);
    return null;
  }
}
