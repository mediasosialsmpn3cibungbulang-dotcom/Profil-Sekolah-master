import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default async function AchievementDetail({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;
  
  if (!id) {
    notFound();
  }

  const ach = await prisma.achievement.findUnique({
    where: { id }
  });

  if (!ach) {
    notFound();
  }

  return (
    <>
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
        padding: '60px 20px',
        textAlign: 'center',
        color: 'white',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0, letterSpacing: '-0.05em' }}>
          Prestasi Siswa
        </h1>
        <p style={{ fontSize: '1.1rem', marginTop: '10px', opacity: 0.9 }}>
          Prestasi siswa terbaru baik bidang akademik maupun bidang non akademik.
        </p>
      </div>

      <main className="container" style={{ padding: '60px 20px', minHeight: '60vh' }}>
        
        {/* Back Link */}
        <div style={{ marginBottom: '30px' }}>
          <Link href="/" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.95rem' }}>
            &larr; Kembali ke Beranda
          </Link>
        </div>

        {/* Two-Column Layout */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '40px',
          alignItems: 'start'
        }}>
          
          {/* Left Column: Image */}
          {ach.imageUrl ? (
            <div style={{ 
              borderRadius: '12px', 
              overflow: 'hidden', 
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
              border: '1px solid #e2e8f0',
              background: 'white',
              padding: '10px'
            }}>
              <Image className="zoomable-image" 
                src={ach.imageUrl} 
                alt={ach.title} 
                width={800} height={600}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
              />
            </div>
          ) : (
            <div style={{ 
              borderRadius: '12px', 
              background: '#f1f5f9', 
              height: '400px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#94a3b8',
              border: '1px dashed #cbd5e1'
            }}>
              Tidak ada gambar
            </div>
          )}

          {/* Right Column: Details */}
          <div style={{ padding: '10px 0' }}>
            <h2 style={{ fontSize: '2.2rem', color: '#0f172a', marginBottom: '25px', lineHeight: '1.3' }}>
              {ach.title}
            </h2>
            
            <div style={{ background: '#f8fafc', padding: '25px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '30px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px 0', color: '#64748b', fontWeight: 'bold', width: '35%' }}>Nama Siswa/Tim</td>
                    <td style={{ padding: '12px 0', color: '#0f172a', fontWeight: '600' }}>{ach.studentName}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px 0', color: '#64748b', fontWeight: 'bold' }}>Kategori</td>
                    <td style={{ padding: '12px 0', color: '#0f172a', fontWeight: '600' }}>{ach.category}</td>
                  </tr>
                  {ach.date && (
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '12px 0', color: '#64748b', fontWeight: 'bold' }}>Tanggal</td>
                      <td style={{ padding: '12px 0', color: '#0f172a', fontWeight: '600' }}>{new Date(ach.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                    </tr>
                  )}
                  <tr>
                    <td style={{ padding: '12px 0', color: '#64748b', fontWeight: 'bold' }}>Tingkat</td>
                    <td style={{ padding: '12px 0', color: '#0f172a', fontWeight: '600' }}>{ach.level}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ color: '#475569', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '30px' }}>
              {ach.description ? (
                <div 
                  className="rich-text-content" 
                  dangerouslySetInnerHTML={{ __html: ach.description.replace(/&nbsp;|\u00A0/g, ' ') }} 
                />
              ) : (
                <>
                  <p>
                    Alhamdulillah, selamat dan sukses atas pencapaian prestasi <strong>{ach.title}</strong> yang diraih oleh <strong>{ach.studentName}</strong> di tingkat <strong>{ach.level}</strong> untuk kategori <strong>{ach.category}</strong>.
                  </p>
                  <p style={{ marginTop: '15px' }}>
                    Semoga prestasi ini menjadi motivasi bagi siswa-siswi lainnya untuk terus berkarya dan mengharumkan nama sekolah.
                  </p>
                </>
              )}
            </div>

            <div style={{ 
              marginTop: '40px', 
              paddingTop: '20px', 
              borderTop: '1px solid #e2e8f0', 
              color: '#94a3b8', 
              fontSize: '0.85rem' 
            }}>
              Oleh Administrator | Diupload : {new Date(ach.createdAt).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
