// Urutan prestasi: tingkat tertinggi dulu (paling atas/kiri),
// lalu tanggal kegiatan terbaru. Dipakai beranda & halaman prestasi.

// Prioritas NAIK = tingkat makin tinggi (angka kecil = paling atas)
const LEVEL_RANK = [
  [/internasional/i, 0],
  [/nasional/i, 1],
  [/provinsi/i, 2],
  [/kabupaten|kota/i, 3],
  [/kecamatan|kecamatan/i, 4],
  [/sekolah|gugus/i, 5],
];

export function achievementRank(level) {
  const s = String(level || '').trim();
  for (const [re, rank] of LEVEL_RANK) {
    if (re.test(s)) return rank;
  }
  return 6; // tingkat tak dikenal/tanpa tingkat: paling bawah
}

function eventTime(a) {
  const d = a.date ? new Date(a.date).getTime() : NaN;
  if (!Number.isNaN(d)) return d;
  return new Date(a.createdAt).getTime() || 0;
}

export function sortAchievements(list = []) {
  return [...list].sort((a, b) => {
    const r = achievementRank(a.level) - achievementRank(b.level);
    if (r !== 0) return r;
    return eventTime(b) - eventTime(a); // terbaru dulu
  });
}
