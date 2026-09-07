import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const revalidate = 60; // Disable cache for demo purposes

export default async function Page() {
  const kurikulum = await prisma.kurikulum.findFirst();

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
            Kurikulum
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section style={{ background: 'white', padding: '60px 0 80px 0', minHeight: '600px' }}>
        <div className="container">
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px', alignItems: 'center' }} className="kurikulum-grid">
            {/* Responsiveness */}
            <style dangerouslySetInnerHTML={{__html: `
              @media (min-width: 992px) {
                .kurikulum-grid { grid-template-columns: 7fr 5fr !important; }
              }
            `}} />

            {/* Kolom Teks (Kiri) */}
            <div>
              <h1 style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '30px', fontWeight: 'bold' }}>
                {kurikulum?.title || 'Kurikulum'}
              </h1>

              <div style={{ color: '#64748b', lineHeight: '1.8', fontSize: '1.05rem', textAlign: 'justify' }}>
                {kurikulum?.content ? (
                  <div className="rich-text-content" dangerouslySetInnerHTML={{ __html: kurikulum.content ? kurikulum.content.replace(/&nbsp;|\u00A0/g, ' ') : '' }} />
                ) : (
                  <p>Belum ada data kurikulum yang dimasukkan.</p>
                )}
              </div>
            </div>

            {/* Kolom Foto (Kanan) */}
            <div style={{ textAlign: 'center' }}>
              {kurikulum?.photoUrl ? (
                <div style={{ background: '#f8f9fa', padding: '15px', display: 'inline-block', width: '100%' }}>
                  <img className="zoomable-image" 
                    src={kurikulum.photoUrl} 
                    alt="Bagan Kurikulum" 
                    style={{ 
                      width: '100%', 
                      height: '300px',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                </div>
              ) : (
                <div style={{ padding: '40px', background: '#f1f5f9', color: '#94a3b8', borderRadius: '8px', border: '2px dashed #cbd5e1' }}>
                  <p style={{ fontSize: '1.2rem', margin: 0 }}>Belum ada gambar kurikulum yang diunggah.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
