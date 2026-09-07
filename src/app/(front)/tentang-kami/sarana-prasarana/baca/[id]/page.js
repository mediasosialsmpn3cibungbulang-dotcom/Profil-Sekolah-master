import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export default async function Page({ params }) {
  const { id } = await params;
  
  const sarana = await prisma.sarana.findUnique({
    where: { id }
  });

  if (!sarana) {
    notFound();
  }

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
            Sarana dan Prasarana Sekolah
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section style={{ background: 'white', padding: '60px 0 80px 0', minHeight: '600px' }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '40px', fontWeight: 'bold' }}>Sarana dan Prasarana</h1>
          
          <div className="sarana-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px', alignItems: 'flex-start' }}>
            {/* Responsiveness */}
            <style dangerouslySetInnerHTML={{__html: `
              @media (min-width: 992px) {
                .sarana-grid { grid-template-columns: 7fr 5fr !important; }
              }
            `}} />

            {/* Kolom Kiri (Teks & Detail) */}
            <div>
              <h2 style={{ fontSize: '2rem', color: '#0f172a', marginBottom: '20px', fontWeight: 'bold' }}>
                {sarana.title}
              </h2>

              <div style={{ color: '#64748b', lineHeight: '1.8', fontSize: '1.05rem', textAlign: 'justify', marginBottom: '30px' }}>
                {sarana.content ? (
                  <div className="rich-text-content" dangerouslySetInnerHTML={{ __html: sarana.content ? sarana.content.replace(/&nbsp;|\u00A0/g, ' ') : '' }} />
                ) : (
                  <p>Belum ada deskripsi.</p>
                )}
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'center', marginTop: '20px' }}>
                <div>
                  <h6 style={{ color: '#0f172a', margin: '0 0 5px 0', fontWeight: 'bold' }}>Oleh Administrator</h6>
                </div>
                <div>
                  <small style={{ color: '#64748b' }}>
                    Diupload : {new Date(sarana.createdAt).toLocaleDateString("id-ID", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}, pukul {new Date(sarana.createdAt).toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' })}
                  </small>
                </div>
              </div>
            </div>

            {/* Kolom Kanan (Gambar) */}
            <div style={{ textAlign: 'center' }}>
              {sarana.photoUrl ? (
                <img className="zoomable-image" 
                  src={sarana.photoUrl} 
                  alt={sarana.title} 
                  style={{ 
                    width: '100%', 
                    height: 'auto',
                    objectFit: 'cover',
                    border: '5px solid #ccc',
                    background: '#eee',
                    padding: '10px'
                  }}
                />
              ) : (
                <div style={{ padding: '40px', background: '#eee', border: '5px solid #ccc', color: '#94a3b8' }}>
                  <p style={{ margin: 0 }}>Belum ada foto</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
