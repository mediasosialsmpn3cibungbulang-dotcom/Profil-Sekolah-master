import { prisma } from '@/lib/prisma';
import ImageSlider from '@/components/ImageSlider';
import NewsSlider from '@/components/NewsSlider';
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
    take: 4
  });

  // Helper colors for achievement cards based on index
  const borderColors = ['#2563eb', '#16a34a', '#d97706', '#9333ea', '#db2777'];

  return (
    <main className="container" style={{ paddingBottom: '0' }}>
      
      {/* Slider / Hero goes first now */}
      <ImageSlider sliders={sliders} />


      <ScrollAnimation animation="fade-up">
        <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '2.5rem', color: '#1e293b', letterSpacing: '-0.05em', marginBottom: '15px' }}>Selamat Datang di SMPN 3 Cibungbulang</h1>
          <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
            Melalui website ini kami berharap dapat memberikan pelayanan informasi yang lebih baik dan cepat kepada seluruh warga sekolah dan masyarakat pada umumnya.
          </p>
        </div>
      </ScrollAnimation>

      <ScrollAnimation animation="fade-up">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#0f172a' }}>Tentang SMPN 3 Cibungbulang</h2>
        </div>
      </ScrollAnimation>

      {/* 4 Features Grid - Circle Organic Design */}
      <section className="features-grid" style={{ marginBottom: '80px' }}>
        <ScrollAnimation animation="fade-up" delay={100}>
          <div className="feature-card">
            <div className="feature-circle">🏫</div>
            <h3 className="feature-title">Fasilitas</h3>
            <p className="feature-desc">Fasilitas lengkap & modern di seluruh lingkungan sekolah.</p>
          </div>
        </ScrollAnimation>
        
        <ScrollAnimation animation="fade-up" delay={200}>
          <div className="feature-card">
            <div className="feature-circle" style={{ background: '#dcfce7', color: '#16a34a' }}>🏅</div>
            <h3 className="feature-title" style={{ color: '#16a34a' }}>Prestasi</h3>
            <p className="feature-desc">Sekolah berprestasi tinggi dalam bidang akademik dan non-akademik.</p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="fade-up" delay={300}>
          <div className="feature-card">
            <div className="feature-circle" style={{ background: '#fef3c7', color: '#d97706' }}>🎨</div>
            <h3 className="feature-title" style={{ color: '#d97706' }}>Ekskul</h3>
            <p className="feature-desc">Berbagai kegiatan ekstrakurikuler untuk pengembangan bakat.</p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="fade-up" delay={400}>
          <div className="feature-card">
            <div className="feature-circle" style={{ background: '#e0e7ff', color: '#4f46e5' }}>👥</div>
            <h3 className="feature-title" style={{ color: '#4f46e5' }}>SDM</h3>
            <p className="feature-desc">Guru profesional yang siap mendidik komunitas belajar unggul.</p>
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

      {/* Guru dan Pegawai - Solid Tag Layout */}
      <section style={{ borderTop: '1px solid #f1f5f9', paddingTop: '60px' }}>
        <ScrollAnimation animation="fade-up">
          <h2 className="section-title" style={{ color: '#1e293b' }}>Guru dan Pegawai</h2>
        </ScrollAnimation>
        
        <div className="content-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          
          {teachers.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#64748b', gridColumn: '1 / -1' }}>Belum ada data guru.</p>
          ) : (
            teachers.map((teacher, index) => (
              <ScrollAnimation animation="fade-up" delay={(index + 1) * 100} key={teacher.id}>
                {/* Updated link to match the requested route */}
                <Link href={`/sdm/lihat/${teacher.id}/detail`} className="guru-card">
                  <Image src={teacher.photoUrl || '/images/guru1.png'} alt={teacher.name} className="guru-image zoomable-image" width={300} height={300} />
                  <div className="guru-name-tag">
                    {teacher.name}
                  </div>
                </Link>
              </ScrollAnimation>
            ))
          )}

        </div>
        
        <ScrollAnimation animation="fade-up">
          <div style={{ textAlign: 'center', marginBottom: '80px', marginTop: '30px' }}>
            <Link href="/sdm" style={{ background: '#dc3545', color: 'white', padding: '10px 30px', borderRadius: '50px', textDecoration: 'none', fontWeight: 'normal', display: 'inline-block' }}>More</Link>
          </div>
        </ScrollAnimation>
      </section>

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
    </main>
  );
}
