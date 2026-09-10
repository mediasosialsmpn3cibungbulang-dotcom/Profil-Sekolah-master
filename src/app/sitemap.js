import { prisma } from '@/lib/prisma';

export const revalidate = 3600; // regenerate tiap 1 jam

const BASE = 'https://smpn3-cibungbulang.sch.id';

const staticRoutes = [
  '',
  '/berita',
  '/prestasi',
  '/ekskul',
  '/sdm',
  '/tentang-kami/profil-sekolah',
  '/tentang-kami/sejarah-sekolah',
  '/tentang-kami/visi-misi',
  '/tentang-kami/mars-sekolah',
  '/tentang-kami/sambutan-kepala-sekolah',
  '/tentang-kami/kurikulum',
  '/tentang-kami/kesiswaan',
  '/tentang-kami/sarana-prasarana',
  '/tentang-kami/struktur-organisasi',
  '/tentang-kami/sumber-daya-manusia',
];

export default async function sitemap() {
  const now = new Date();

  const urls = staticRoutes.map((path) => ({
    url: `${BASE}${path || '/'}`,
    lastModified: now,
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1 : 0.8,
  }));

  try {
    const [posts, achievements, ekskuls, teachers, saranas] = await Promise.all([
      prisma.post.findMany({ select: { id: true, updatedAt: true } }),
      prisma.achievement.findMany({ select: { id: true, updatedAt: true } }),
      prisma.ekskul.findMany({ select: { id: true, updatedAt: true } }),
      prisma.teacher.findMany({ select: { id: true, updatedAt: true } }),
      prisma.sarana.findMany({ select: { id: true, updatedAt: true } }),
    ]);

    for (const p of posts) {
      urls.push({ url: `${BASE}/berita/${p.id}`, lastModified: p.updatedAt, changeFrequency: 'monthly', priority: 0.6 });
    }
    for (const a of achievements) {
      urls.push({ url: `${BASE}/prestasi/${a.id}`, lastModified: a.updatedAt, changeFrequency: 'monthly', priority: 0.6 });
    }
    for (const e of ekskuls) {
      urls.push({ url: `${BASE}/ekskul/${e.id}`, lastModified: e.updatedAt, changeFrequency: 'monthly', priority: 0.6 });
    }
    for (const t of teachers) {
      urls.push({ url: `${BASE}/sdm/lihat/${t.id}/detail`, lastModified: t.updatedAt, changeFrequency: 'monthly', priority: 0.5 });
    }
    for (const s of saranas) {
      urls.push({ url: `${BASE}/tentang-kami/sarana-prasarana/baca/${s.id}`, lastModified: s.updatedAt, changeFrequency: 'monthly', priority: 0.5 });
    }
  } catch (err) {
    // Gagal baca DB: tetap kembalikan rute statis agar /sitemap.xml hidup
    console.error('sitemap db error:', err?.message);
  }

  return urls;
}
