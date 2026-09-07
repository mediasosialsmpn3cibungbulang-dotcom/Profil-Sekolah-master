import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const revalidate = 60;

export default async function Page({ params }) {
  const { id } = await params;
  
  // Ambil data dari database berdasarkan ID
  const teacher = await prisma.teacher.findUnique({
    where: { id }
  });

  if (!teacher) {
    notFound();
  }


  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .page-header-sdm {
          background: linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url('/images/slide1.png') center center no-repeat;
          height: 300px;
          background-size: cover;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 60px;
          border-radius: 0 0 24px 24px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        .page-header-sdm .title-container {
          text-align: center;
          padding: 0 20px;
        }
        .page-header-sdm h2 {
          color: white;
          font-size: 3rem;
          font-weight: 700;
          margin: 0;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }
        .page-header-sdm p {
          color: #e2e8f0;
          font-size: 1.1rem;
          margin-top: 10px;
          max-width: 600px;
          text-shadow: 0 1px 2px rgba(0,0,0,0.5);
        }
        .svg-shapes {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: auto;
          margin-bottom: -2px; /* overlap border */
        }
        @media only screen and (max-width: 768px) {
          .page-header-sdm {height:160px;}   
        }
        @media only screen and (max-width: 500px) {
          .page-header-sdm {height:120px;}   
        }
      `}} />

      <div className="page-header-sdm">
        <div className="title-container">
          <h2>Profil Pegawai</h2>
        </div>
      </div>

      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 15px', marginBottom: '80px' }}>
        
        <div style={{ marginBottom: '30px' }}>
          <Link href="/tentang-kami/sumber-daya-manusia" style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '10px 20px', background: '#f1f5f9', color: '#475569', 
            borderRadius: '50px', textDecoration: 'none', fontWeight: '600',
            transition: 'background 0.2s ease'
          }}>
            <span style={{ fontSize: '1.2rem' }}>←</span> Kembali ke Direktori
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px', background: '#ffffff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }} className="sdm-detail-grid">
          {/* Use standard CSS for grid responsivenes to match Bootstrap row/col-lg-8/4 */}
          <style dangerouslySetInnerHTML={{__html: `
            @media (min-width: 992px) {
              .sdm-detail-grid { grid-template-columns: 2fr 1fr !important; }
            }
          `}} />
          
          <div style={{ animation: 'fade-up 0.5s ease-out' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#1e293b', fontWeight: '700' }}>{teacher.name}</h2>
            
            
            <div style={{ padding: '24px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', color: '#475569', fontSize: '1.1rem', lineHeight: '1.8' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#1e293b', marginBottom: '10px' }}>Peran & Tanggung Jawab</h3>
              <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>
                {teacher.subject} {teacher.additionalRole ? `sekaligus ${teacher.additionalRole}` : ''}
              </p>
              {teacher.description && (
                <div 
                  className="rich-text-content"
                  dangerouslySetInnerHTML={{ __html: teacher.description.replace(/&nbsp;|\u00A0/g, ' ') }} 
                />
              )}
            </div>
          </div>

          <div style={{ textAlign: 'center', animation: 'fade-up 0.8s ease-out', display: 'flex', justifyContent: 'center' }}>
            <div style={{ 
              width: '100%', maxWidth: '350px', height: '450px',
              borderRadius: '16px', overflow: 'hidden',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}>
              <img className="zoomable-image" 
                src={teacher.photoUrl || '/images/guru1.png'} 
                alt={teacher.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
