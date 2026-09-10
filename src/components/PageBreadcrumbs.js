// Breadcrumb terstruktur (schema.org) agar Google memahami hierarki halaman.
// Membantu kelayakan sitelink di hasil pencarian. Komponen server-safe.
const BASE = 'https://smpn3-cibungbulang.sch.id';

export default function PageBreadcrumbs({ trail = [] }) {
  const items = [{ name: 'Beranda', url: `${BASE}/` }, ...trail];
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
