import Image from 'next/image';
import { prisma } from '@/lib/prisma';

export const revalidate = 60; // Disable cache for demo purposes

export default async function Page() {
  const sambutan = await prisma.sambutan.findFirst();

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
            Sambutan Kepala Sekolah
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section style={{ background: 'white', padding: '60px 0 80px 0', minHeight: '600px' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.2rem', color: '#0f172a', marginBottom: '40px', fontWeight: '500' }}>
            {sambutan?.title || 'Sambutan Kepala Sekolah'}
          </h2>
          
          <div style={{ position: 'relative' }}>
            
            {/* Image Floating Right */}
            <div style={{ 
              float: 'right', 
              marginLeft: '40px', 
              marginBottom: '20px',
              width: '400px',
              border: '8px solid #cccccc',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <img className="zoomable-image" 
                src={sambutan?.photoUrl || "/images/kepsek.png"} 
                alt="Kepala Sekolah" 
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>

            {/* Text Flowing */}
            <div className="rich-text-content">
              {sambutan?.content ? (
                <div dangerouslySetInnerHTML={{ __html: sambutan.content.replace(/&nbsp;|\u00A0/g, ' ') }} />
              ) : (
                <>
                  <p style={{ marginBottom: '20px' }}>
                    Bismillahirrahmanirrahim
                  </p>
                  <p style={{ marginBottom: '20px' }}>
                    Assalamu&apos;alaikum Warahmatullahi Wabarakatuh
                  </p>
                  <p style={{ marginBottom: '20px' }}>
                    Puji syukur kami panjatkan kehadirat Allah SWT atas limpahan rahmat-Nya sehingga SMP NEGERI 3 CIBUNGBULANG dapat menyajikan website sekolah. Kemajuan teknologi dan tuntutan kebutuhan masyarakat dalam era informasi digital seperti saat ini menuntut SMP NEGERI 3 CIBUNGBULANG untuk dapat memberdayakan teknologi informasi dan komunikasi dalam memberikan layanan publik kepada masyarakat.
                  </p>
                  <p style={{ marginBottom: '20px' }}>
                    Kehadiran website diharapkan dapat meningkatkan Kredibilitas atau kepercayaan masyarakat terhadap sekolah juga sebagai media informasi lembaga, sebagai media untuk publikasi prestasi. Di samping itu dengan adanya web juga dapat memperkenalkan fasilitas sekolah, media promosi dan media informasi kelulusan.
                  </p>
                  <p style={{ marginBottom: '20px' }}>
                    Tampilan profil sekolah mulai dari visi, misi, sejarah singkat, galeri, dan yang terpenting adalah untuk mempererat tali silaturahmi antara guru, siswa, dan alumni dalam sebuah kanal forum pada website portal sekolah.
                  </p>
                  <p style={{ marginBottom: '30px' }}>
                    Semoga dengan kehadiran web ini akan terjalin informasi dan komunikasi dengan cepat sehingga dapat mengikuti perkembangan dalam pengetahuan yang berkembang.
                  </p>
                  <p style={{ marginBottom: '20px' }}>
                    Terimakasih.
                  </p>
                  <p>
                    Wassalamu&apos;alaikum. Warahmatullahi Wabarakatuh.
                  </p>
                </>
              )}
            </div>
            
            <div style={{ clear: 'both' }}></div>
          </div>
        </div>
      </section>
    </main>
  );
}