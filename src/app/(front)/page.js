import { prisma } from '@/lib/prisma';
import ImageSlider from '@/components/ImageSlider';
import NewsSlider from '@/components/NewsSlider';
import TeacherSlider from '@/components/TeacherSlider';
import ScrollAnimation from '@/components/ScrollAnimation';
import Link from 'next/link';
import Image from 'next/image';

export const revalidate = 60; // Disable cache for demo purposes so admin changes show immediately

export default async function Home() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10 // Increased to allow slider demonstration
  });

  const achievements = await prisma.achievement.findMany({
    orderBy: { createdAt: 'desc' },
    take: 3
  });

  const sliders = await prisma.slider.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' }
  });

  const sambutan = await prisma.sambutan.findFirst();

  const teachers = await prisma.teacher.findMany({
    where: { category: 'GURU' },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
  });

  const staff = await prisma.teacher.findMany({
    where: { category: 'PEGAWAI' },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
  });

  // Helper colors for achievement cards based on index
  const borderColors = ['#2563eb', '#16a34a', '#d97706', '#9333ea', '#db2777'];

  return (
    <main className="container" style={{ paddingBottom: '0' }}>
      
      {/* Slider / Hero goes first now */}
      <ImageSlider sliders={sliders} />


      <ScrollAnimation animation="fade-up">
        <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '60px' }}>
          <h1 className="welcome-title" style={{ fontSize: '2.5rem', color: '#1e293b', letterSpacing: '-0.05em', marginBottom: '15px' }}>Selamat Datang di SMPN 3 Cibungbulang</h1>
          <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
            Melalui website ini kami berharap dapat memberikan pelayanan informasi yang lebih baik dan cepat kepada seluruh warga sekolah dan masyarakat pada umumnya.
          </p>
        </div>
      </ScrollAnimation>

      {/* Berita dan Kegiatan - Quote Style Layout */}
      <section style={{ borderTop: '1px solid #f1f5f9', paddingTop: '60px', marginBottom: '80px' }} id="berita">
        <ScrollAnimation animation="fade-up">
          <h2 className="section-title" style={{ color: '#1e293b' }}>Berita & Kegiatan</h2>
        </ScrollAnimation>
        
        <ScrollAnimation animation="fade-in" delay={150}>
          <NewsSlider posts={posts} />
        </ScrollAnimation>
        
        <ScrollAnimation animation="fade-up">
          <div style={{ textAlign: 'center', marginBottom: '20px', marginTop: '40px' }}>
            <Link href="/berita" style={{ color: '#2589ff', textDecoration: 'none', fontWeight: 'bold' }}>Lihat Selengkapnya ❯</Link>
          </div>
        </ScrollAnimation>
      </section>

      {/* Sambutan Kepala Sekolah - Organic Layout */}
      <section className="flex-section" style={{ marginBottom: '80px', borderTop: '1px solid #f1f5f9', paddingTop: '60px' }}>
        <div className="flex-image">
          <ScrollAnimation animation="slide-left">
            <div style={{ padding: '8px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <Image src={sambutan?.photoUrl || "/images/kepsek.png"} alt="Kepala Sekolah" width={400} height={400} className="zoomable-image" style={{ width: '100%', height: 'auto', borderRadius: '8px', display: 'block' }} />
            </div>
          </ScrollAnimation>
        </div>
        <div className="flex-content">
          <ScrollAnimation animation="slide-right">
            <h2 style={{ fontSize: '2rem', color: '#1e293b', marginBottom: '20px' }}>{sambutan?.title || 'Sambutan Kepala Sekolah'}</h2>
            
            {sambutan?.content ? (
              <div className="rich-text-content" dangerouslySetInnerHTML={{ __html: sambutan.content.replace(/&nbsp;|\u00A0/g, ' ') }} />
            ) : (
              <>
                <p style={{ color: '#475569', marginBottom: '15px', fontSize: '0.95rem' }}>
                  <em>Bismillahirrahmanirrahim</em>
                </p>
                <p style={{ color: '#475569', marginBottom: '15px', fontSize: '0.95rem' }}>
                  <em>Assalamu&apos;alaikum Warahmatullahi Wabarakatuh</em>
                </p>
                <p style={{ color: '#475569', marginBottom: '15px', lineHeight: '1.8', fontSize: '0.95rem', textAlign: 'justify' }}>
                  Puji syukur kami panjatkan kehadirat Allah SWT atas limpahan rahmat-Nya sehingga SMP NEGERI 3 CIBUNGBULANG dapat menyajikan website sekolah.
                </p>
              </>
            )}
          </ScrollAnimation>
        </div>
      </section>

      {/* Guru - Slider */}
      <section style={{ borderTop: '1px solid #f1f5f9', paddingTop: '60px' }}>
        <ScrollAnimation animation="fade-up">
          <h2 className="section-title" style={{ color: '#1e293b' }}>Guru</h2>
        </ScrollAnimation>
        
        <ScrollAnimation animation="fade-in" delay={150}>
          <TeacherSlider teachers={teachers} autoPlayInterval={3000} />
        </ScrollAnimation>
      </section>

      {/* Tenaga Pendidik - Slider */}
      <section style={{ borderTop: '1px solid #f1f5f9', paddingTop: '60px' }}>
        <ScrollAnimation animation="fade-up">
          <h2 className="section-title" style={{ color: '#1e293b' }}>Tenaga Pendidik</h2>
        </ScrollAnimation>
        
        <ScrollAnimation animation="fade-in" delay={150}>
          <TeacherSlider teachers={staff} autoPlayInterval={3000} />
        </ScrollAnimation>
      </section>

      {/* Prestasi Siswa - Tabular Meta Layout */}
      <section style={{ borderTop: '1px solid #f1f5f9', paddingTop: '60px' }}>
        <ScrollAnimation animation="fade-up">
          <h2 className="section-title" style={{ color: '#1e293b' }}>Prestasi Siswa</h2>
        </ScrollAnimation>
        <div className="content-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          
          {achievements.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#64748b', gridColumn: '1 / -1' }}>Belum ada data prestasi.</p>
          ) : (
            achievements.map((ach, index) => (
              <ScrollAnimation animation="fade-up" delay={index * 150} key={ach.id}>
                <Link href={`/prestasi/${ach.id}`} className="prestasi-card" style={{ height: '100%' }}>
                  <div className="prestasi-image-wrapper" style={{ borderBottomColor: borderColors[index % borderColors.length] }}>
                    <Image src={ach.imageUrl || '/images/prestasi1.png'} alt={ach.title} width={400} height={300} className="zoomable-image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <h3 className="prestasi-title">{ach.title}</h3>
                  <table className="prestasi-meta-table">
                    <tbody>
                      <tr>
                        <td style={{ width: '40%' }}>Kategori</td>
                        <td>{ach.category}</td>
                      </tr>
                      <tr>
                        <td>Oleh</td>
                        <td>{ach.studentName}</td>
                      </tr>
                      <tr>
                        <td>Tingkat</td>
                        <td>{ach.level}</td>
                      </tr>
                    </tbody>
                  </table>
                </Link>
              </ScrollAnimation>
            ))
          )}

        </div>
        <ScrollAnimation animation="fade-up">
          <div style={{ textAlign: 'center', marginBottom: '80px', marginTop: '30px' }}>
            <Link href="/prestasi" style={{ color: '#2589ff', textDecoration: 'none', fontWeight: 'bold' }}>Lihat Selengkapnya ❯</Link>
          </div>
        </ScrollAnimation>
      </section>
    </main>
  );
}
