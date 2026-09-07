import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';

export const revalidate = 60; // Disable cache for demo purposes

export default async function Page() {
  const sejarah = await prisma.sejarah.findFirst();

  return (
    <main style={{ paddingBottom: '0', background: '#f8f9fa' }}>
      {/* Banner / Hero Section */}
      <section style={{
        position: 'relative',
        height: '250px',
        background: 'linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)), url("/images/slide1.png") center/cover',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        borderBottom: '3px solid #1E90FF'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: '2', width: '100%', display: 'flex', alignItems: 'center' }}>
          <h1 style={{ color: 'white', fontSize: '2.5rem', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.8)', zIndex: 3 }}>
            Sejarah Sekolah
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section style={{ background: 'white', padding: '60px 0 80px 0', minHeight: '600px' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '40px', fontWeight: '400' }}>
            {sejarah?.title || 'Sejarah Sekolah'}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }} className="sejarah-grid">
            {/* Responsiveness */}
            <style dangerouslySetInnerHTML={{
              __html: `
              @media (min-width: 992px) {
                .sejarah-grid { grid-template-columns: 2fr 1fr !important; }
              }
            `}} />

            {/* Kolom Teks Sejarah */}
            <div style={{ color: '#64748b', lineHeight: '1.8', fontSize: '1.05rem', textAlign: 'justify' }}>
              {sejarah?.content ? (
                <div className="rich-text-content" dangerouslySetInnerHTML={{ __html: sejarah.content ? sejarah.content.replace(/&nbsp;|\u00A0/g, ' ') : '' }} />
              ) : (
                <p>Belum ada data sejarah yang dimasukkan.</p>
              )}
            </div>

            {/* Kolom Foto Sejarah */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                display: 'inline-block',
                background: '#e2e8f0',
                padding: '10px',
                border: '5px solid #cbd5e1',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}>
                <Image className="zoomable-image"
                  src={sejarah?.photoUrl || "/images/slide1.png"}
                  alt="Sejarah Sekolah"
                  width={400} height={400}
                  style={{ width: '100%', maxWidth: '400px', height: 'auto', display: 'block' }}
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
