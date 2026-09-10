export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Jangan index API internal.
        // (Path admin TIDAK ditulis di sini agar tetap rahasia.)
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://smpn3-cibungbulang.sch.id/sitemap.xml',
  };
}
