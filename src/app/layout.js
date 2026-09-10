import './global.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  metadataBase: new URL('https://smpn3-cibungbulang.sch.id'),
  title: {
    default: 'SMPN 3 Cibungbulang',
    template: '%s | SMPN 3 Cibungbulang',
  },
  description:
    'Website resmi SMP Negeri 3 Cibungbulang, Kabupaten Bogor — profil sekolah, visi misi, guru dan tenaga pendidik, prestasi siswa, ekstrakurikuler, serta berita dan kegiatan sekolah.',
  keywords: [
    'SMPN 3 Cibungbulang',
    'SMP Negeri 3 Cibungbulang',
    'sekolah Cibungbulang',
    'SMP Bogor',
    'profil sekolah',
    'prestasi siswa',
    'ekstrakurikuler',
    'visi misi sekolah',
  ],
  authors: [{ name: 'SMPN 3 Cibungbulang' }],
  creator: 'SMPN 3 Cibungbulang',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/images/Logo.png', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://smpn3-cibungbulang.sch.id',
    siteName: 'SMPN 3 Cibungbulang',
    title: 'SMPN 3 Cibungbulang',
    description:
      'Profil, guru dan tenaga pendidik, prestasi, ekstrakurikuler, berita dan kegiatan SMP Negeri 3 Cibungbulang.',
    images: [{ url: '/images/Logo.png', width: 512, height: 512, alt: 'Logo SMPN 3 Cibungbulang' }],
  },
  twitter: {
    card: 'summary',
    title: 'SMPN 3 Cibungbulang',
    description: 'Profil, prestasi, ekstrakurikuler, berita dan kegiatan SMP Negeri 3 Cibungbulang.',
  },
  robots: {
    index: true,
    follow: true,
  },
  // TODO (Search Console): setelah dapat kode verifikasi dari Google,
  // tambahkan: verification: { google: 'KODE_VERIFIKASI' },
};

const schoolJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'School',
  name: 'SMP Negeri 3 Cibungbulang',
  alternateName: 'SMPN 3 Cibungbulang',
  url: 'https://smpn3-cibungbulang.sch.id',
  logo: 'https://smpn3-cibungbulang.sch.id/images/Logo.png',
  description:
    'SMP Negeri 3 Cibungbulang — sekolah menengah pertama di Kecamatan Cibungbulang, Kabupaten Bogor, Jawa Barat.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Cibungbulang',
    addressRegion: 'Jawa Barat',
    addressCountry: 'ID',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={inter.className}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
