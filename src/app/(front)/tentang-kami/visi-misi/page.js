import { prisma } from '@/lib/prisma';
import Image from 'next/image';

export const revalidate = 60; // Disable cache for demo purposes

export default async function Page() {
  const visimisi = await prisma.visiMisi.findFirst();

  // Misi and Visi are now HTML strings

  return (
    <main style={{ paddingBottom: '0', background: '#f8f9fa' }}>
      {/* Banner / Hero Section */}
      <section style={{ 
        position: 'relative', 
        height: '250px', 
        background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)), url("/images/slide1.png") center/cover`,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        borderBottom: '3px solid #1E90FF'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: '2', width: '100%', display: 'flex', alignItems: 'center' }}>
          <h1 style={{ color: 'white', fontSize: '2.5rem', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.8)', zIndex: 3 }}>
            Visi dan Misi
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section style={{ background: 'white', padding: '60px 0 80px 0', minHeight: '600px' }}>
        <div className="container">
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }} className="visi-misi-grid">
            {/* Responsiveness */}
            <style dangerouslySetInnerHTML={{__html: `
              @media (min-width: 992px) {
                .visi-misi-grid { grid-template-columns: 2fr 1fr !important; }
              }
              .misi-list {
                padding-left: 20px;
              }
              .misi-list li {
                margin-bottom: 12px;
                line-height: 1.7;
                color: #475569;
              }
            `}} />

            {/* Kolom Kiri: Teks Visi Misi */}
            <div>
              <h2 style={{ fontSize: '2.2rem', color: '#0f172a', marginBottom: '30px', fontWeight: '400' }}>
                Visi dan Misi Sekolah
              </h2>
              
              <div style={{ color: '#475569', lineHeight: '1.8', fontSize: '1.05rem', marginBottom: '40px' }}>
                {visimisi?.visi ? (
                  <div className="rich-text-content" dangerouslySetInnerHTML={{ __html: visimisi.visi ? visimisi.visi.replace(/&nbsp;|\u00A0/g, ' ') : '' }} />
                ) : (
                  <p>
                    Visi SMP Negeri 3 Cibungbulang adalah mewujudkan siswa unggul, ramah lingkungan, berpijak pada kearifan lokal, bermutu global dan berkarakter Pancasila.
                  </p>
                )}
              </div>

              <div style={{ color: '#475569', lineHeight: '1.8', fontSize: '1.05rem' }}>
                <p style={{ marginBottom: '15px' }}>Misi SMP Negeri 3 Cibungbulang sebagai berikut:</p>
                {visimisi?.misi ? (
                  <div className="rich-text-content" dangerouslySetInnerHTML={{ __html: visimisi.misi ? visimisi.misi.replace(/&nbsp;|\u00A0/g, ' ') : '' }} />
                ) : (
                  <ol className="misi-list">
                    <li>Mengembangkan berbagai kegiatan peningkatan kompetensi peserta didik dalam bidang akademik dan nonakademik.</li>
                    <li>Melaksanakan kegiatan pembelajaran yang efektif yaitu pembelajaran yang aktif, produktif, kreatif, inovatif, menyenangkan dan bermakna.</li>
                    <li>Meningkatkan gerakan literasi sekolah yang dapat mengarahkan warga sekolah untuk menjadi warga yang cinta baca, cinta menulis dan cinta mencipta.</li>
                    <li>Mengembangkan perencanaan pembelajaran dan penilaian berbasis Higher Order Thinking Skill (HOTS) dan Life Skill.</li>
                  </ol>
                )}
              </div>
            </div>

            {/* Kolom Kanan: Foto Sekolah */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
              <div style={{
                background: '#e2e8f0',
                padding: '12px',
                border: '6px solid #cbd5e1',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                width: '100%',
                maxWidth: '350px'
              }}>
                <Image className="zoomable-image" 
                  src={visimisi?.photoUrl || "/images/slide1.png"} 
                  alt="Sekolah" 
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
