import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const revalidate = 60;

export default async function Page() {
  const saranaList = await prisma.sarana.findMany({
    orderBy: { createdAt: 'asc' }
  });

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
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
            {saranaList.length > 0 ? (
              saranaList.map((item) => (
                <div key={item.id} className="sarana-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px', alignItems: 'center' }}>
                  {/* Responsiveness */}
                  <style dangerouslySetInnerHTML={{__html: `
                    @media (min-width: 992px) {
                      .sarana-grid { grid-template-columns: 7fr 5fr !important; }
                    }
                  `}} />

                  {/* Kolom Kiri (Teks & Tombol) */}
                  <div>
                    <h2 style={{ fontSize: '2rem', color: '#0f172a', marginBottom: '20px', fontWeight: 'bold' }}>
                      {item.title}
                    </h2>

                    <div style={{ color: '#64748b', lineHeight: '1.8', fontSize: '1.05rem', textAlign: 'justify', marginBottom: '20px' }}>
                      {item.content ? (
                        <p>{item.content.length > 250 ? item.content.substring(0, 250) + '...' : item.content}</p>
                      ) : (
                        <p>Belum ada deskripsi.</p>
                      )}
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'center' }}>
                      <Link href={`/tentang-kami/sarana-prasarana/baca/${item.id}`} style={{
                        background: '#1E90FF', color: 'white', padding: '12px 30px', 
                        borderRadius: '30px', textDecoration: 'none', fontWeight: 'bold',
                        textAlign: 'center', display: 'inline-block'
                      }}>
                        Read More
                      </Link>
                      
                      <div>
                        <h6 style={{ color: '#1E90FF', margin: '0 0 5px 0', fontWeight: 'bold' }}>Administrator</h6>
                        <small style={{ color: '#64748b' }}>
                          {new Date(item.createdAt).toLocaleDateString("id-ID", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}, pukul {new Date(item.createdAt).toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' })}
                        </small>
                      </div>
                    </div>
                  </div>

                  {/* Kolom Kanan (Gambar) */}
                  <div style={{ textAlign: 'center' }}>
                    {item.photoUrl ? (
                      <img className="zoomable-image" 
                        src={item.photoUrl} 
                        alt={item.title} 
                        style={{ 
                          width: '100%', 
                          height: '240px',
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
              ))
            ) : (
              <p style={{ color: '#64748b' }}>Belum ada fasilitas sarana yang ditambahkan.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
