import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default async function EkskulDetail({ params }) {
  const { id } = await params;
  
  const ekskul = await prisma.ekskul.findUnique({
    where: { id }
  });

  if (!ekskul) {
    notFound();
  }

  return (
    <main style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Jumbotron/Header Style */}
      <div style={{
        background: 'linear-gradient(rgba(0, 0, 0, .4), rgba(0, 0, 0, .4)), url(/images/slide1.png) center center no-repeat',
        backgroundSize: 'cover',
        height: '250px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '40px'
      }}>
        <h1 style={{ color: 'white', fontSize: '2.5rem', textTransform: 'uppercase', textShadow: '2px 2px 4px rgba(0,0,0,0.5)', textAlign: 'center', padding: '0 20px' }}>
          Detail Ekstrakurikuler
        </h1>
      </div>

      <div className="container" style={{ padding: '60px 0' }}>
        <h2 style={{ fontSize: '2.2rem', color: '#0f3a54', marginBottom: '40px', fontWeight: '600' }}>
          Ekstrakurikuler
        </h2>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '50px' }}>
          
          {/* Kolom Kiri: Teks */}
          <div style={{ flex: '2', minWidth: '300px' }}>
            <h3 style={{ 
              fontSize: '1.8rem', 
              color: '#0f3a54', 
              marginBottom: '15px', 
              fontWeight: '600',
              borderBottom: '1px solid #e2e8f0',
              paddingBottom: '15px'
            }}>
              {ekskul.title}
            </h3>
            
            <p style={{ color: '#1E90FF', fontWeight: 'bold', fontSize: '1.1rem', margin: '20px 0 10px 0' }}>
              Pembina : {ekskul.pembina || '-'}
            </p>
            {ekskul.jadwal && (
              <p style={{ color: '#64748b', fontWeight: 'bold', fontSize: '1rem', margin: '0 0 25px 0' }}>
                Jadwal : {ekskul.jadwal}
              </p>
            )}
            
            <div 
              className="rich-text-content"
              dangerouslySetInnerHTML={{ __html: (ekskul.description || '').replace(/&nbsp;|\u00A0/g, ' ') }}
            />

            <div style={{ marginTop: '50px' }}>
              <Link href="/ekskul" style={{ color: '#1E90FF', textDecoration: 'none', fontWeight: '600' }}>
                &larr; Kembali ke Daftar Ekstrakurikuler
              </Link>
            </div>
          </div>

          {/* Kolom Kanan: Foto */}
          <div style={{ flex: '1', minWidth: '300px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
            <div style={{ 
              border: '15px solid #cbd5e1', // Thick grey border resembling the reference
              background: 'white',
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
              width: '100%',
              maxWidth: '400px'
            }}>
              <Image className="zoomable-image" 
                src={ekskul.photoUrl || '/images/slide1.png'} 
                alt={ekskul.title} 
                width={400} height={400}
                style={{ width: '100%', display: 'block', height: 'auto', minHeight: '300px', objectFit: 'cover' }} 
              />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
