import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';

export const revalidate = 60; // Disable cache for demo purposes

export default async function Page() {
  const kepsek = await prisma.kepalaSekolah.findFirst();

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
            Kepala Sekolah
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section style={{ background: 'white', padding: '60px 0 80px 0', minHeight: '600px' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '40px', fontWeight: '400' }}>
            {kepsek?.title || 'Kepala Sekolah'}
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }} className="kepsek-grid">
            {/* Responsiveness */}
            <style dangerouslySetInnerHTML={{__html: `
              @media (min-width: 992px) {
                .kepsek-grid { grid-template-columns: 2fr 1.5fr !important; }
              }
            `}} />

            {/* Kolom Teks */}
            <div style={{ color: '#64748b', lineHeight: '1.8', fontSize: '1.05rem', textAlign: 'justify' }}>
              {kepsek?.content ? (
                <div className="rich-text-content" dangerouslySetInnerHTML={{ __html: kepsek.content ? kepsek.content.replace(/&nbsp;|\u00A0/g, ' ') : '' }} />
              ) : (
                <p>Belum ada data sejarah kepemimpinan yang dimasukkan.</p>
              )}
              
              <div style={{ marginTop: '40px' }}>
                <h3 style={{ color: '#64748b', fontSize: '1.2rem', marginBottom: '20px', fontWeight: '400' }}>
                  Profil Kepala Sekolah
                </h3>
                
                <table style={{ width: '100%', marginBottom: '20px', fontSize: '1.05rem' }}>
                  <tbody>
                    <tr>
                      <td style={{ width: '150px', paddingBottom: '10px' }}>Nama</td>
                      <td style={{ paddingBottom: '10px' }}>: {kepsek?.nama || '-'}</td>
                    </tr>
                    <tr>
                      <td style={{ paddingBottom: '10px' }}>Pendidikan</td>
                      <td style={{ paddingBottom: '10px' }}>: {kepsek?.pendidikan || '-'}</td>
                    </tr>
                    <tr>
                      <td style={{ paddingBottom: '10px', verticalAlign: 'top' }}>Jenjang Karier</td>
                      <td style={{ paddingBottom: '10px', verticalAlign: 'top' }}>:</td>
                    </tr>
                  </tbody>
                </table>
                
                {kepsek?.karir && (
                  <div className="rich-text-content" dangerouslySetInnerHTML={{ __html: kepsek.karir ? kepsek.karir.replace(/&nbsp;|\u00A0/g, ' ') : '' }} />
                )}
              </div>
            </div>

            {/* Kolom Foto Grid */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                display: 'inline-block',
                background: '#e2e8f0',
                padding: '10px',
                border: '5px solid #cbd5e1',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                width: '100%'
              }}>
                <Image className="zoomable-image" 
                  src={kepsek?.photoUrl || "/images/slide1.png"} 
                  alt="Galeri Kepala Sekolah" 
                  width={400} height={400}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </main>
  );
}
