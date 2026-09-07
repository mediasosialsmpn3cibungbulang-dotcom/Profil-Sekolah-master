import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export const revalidate = 60; // Disable cache for demo purposes

export default async function GuruDetail({ params }) {
  const resolvedParams = await params;
  const teacherId = parseInt(resolvedParams.slug, 10);

  if (isNaN(teacherId)) {
    return notFound();
  }

  const teacher = await prisma.teacher.findUnique({
    where: { id: teacherId }
  });

  if (!teacher) {
    return notFound();
  }

  return (
    <main className="container" style={{ paddingBottom: '80px' }}>
      <header className="page-header" style={{ marginBottom: '40px' }}>
        <h1 className="page-title">Profil Pendidik</h1>
        <p>SDM Unggul SMPN 3 Cibungbulang</p>
      </header>

      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '40px', background: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}>
        
        <div style={{ flex: '0 0 300px' }}>
          <Image 
            src={teacher.photoUrl || "/images/guru1.png"} 
            alt={teacher.name} 
            width={400} height={400}
            style={{ width: '100%', height: 'auto', borderRadius: '12px', objectFit: 'cover', objectPosition: 'top', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
          />
        </div>
        
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h2 style={{ fontSize: '2.2rem', color: 'var(--primary-color)', marginBottom: '10px' }}>{teacher.name}</h2>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--accent-color)', marginBottom: '20px', fontWeight: '500' }}>{teacher.subject}</h3>
          
          <p style={{ color: '#475569', lineHeight: '1.8', marginBottom: '20px', whiteSpace: 'pre-wrap' }}>
            {teacher.description || 'Guru unggulan SMPN 3 Cibungbulang yang berdedikasi tinggi dalam mendidik siswa-siswi.'}
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
            <div style={{ background: '#f1f5f9', padding: '15px', borderRadius: '8px' }}>
              <p style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>Pendidikan Terakhir</p>
              <p style={{ fontWeight: '600', color: 'var(--primary-color)' }}>{teacher.education || '-'}</p>
            </div>
            <div style={{ background: '#f1f5f9', padding: '15px', borderRadius: '8px' }}>
              <p style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>Masa Bakti</p>
              <p style={{ fontWeight: '600', color: 'var(--primary-color)' }}>{teacher.experience || '-'}</p>
            </div>
            <div style={{ background: '#f1f5f9', padding: '15px', borderRadius: '8px', gridColumn: '1 / -1' }}>
              <p style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>Jabatan Tambahan</p>
              <p style={{ fontWeight: '600', color: 'var(--primary-color)' }}>{teacher.additionalRole || '-'}</p>
            </div>
          </div>
          
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
            <a href="/" style={{ color: 'var(--accent-color)', textDecoration: 'none', fontWeight: 'bold' }}>❮ Kembali ke Beranda</a>
          </div>
        </div>
      </div>
    </main>
  );
}
