import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import ScrollAnimation from '@/components/ScrollAnimation';

export const revalidate = 60; // Disable cache for demo purposes

export default async function Page() {
  const achievements = await prisma.achievement.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const borderColors = ['#2563eb', '#16a34a', '#d97706', '#9333ea', '#db2777'];

  return (
    <main className="container" style={{ paddingBottom: '80px', paddingTop: '40px' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#1e293b', borderBottom: '3px solid #f1f5f9', paddingBottom: '10px', display: 'inline-block' }}>
          Daftar Prestasi
        </h1>
        <p style={{ marginTop: '10px', color: '#64748b', fontSize: '1.1rem' }}>
          Berbagai pencapaian membanggakan yang diraih oleh siswa-siswi SMPN 3 Cibungbulang di berbagai bidang.
        </p>
      </header>
      
      <section>
        <div className="content-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {achievements.length === 0 ? (
            <p style={{ color: '#64748b', gridColumn: '1 / -1' }}>Belum ada data prestasi.</p>
          ) : (
            achievements.map((ach, index) => (
              <ScrollAnimation animation="fade-up" delay={(index % 4) * 150} key={ach.id}>
                <Link href={`/prestasi/${ach.id}`} className="prestasi-card" style={{ height: '100%' }}>
                  <div className="prestasi-image-wrapper" style={{ borderBottomColor: borderColors[index % borderColors.length] }}>
                    <Image className="zoomable-image" src={ach.imageUrl || '/images/prestasi1.png'} alt={ach.title} width={400} height={300} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                      {ach.date && (
                        <tr>
                          <td>Tanggal</td>
                          <td>{new Date(ach.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </Link>
              </ScrollAnimation>
            ))
          )}
        </div>
      </section>
    </main>
  );
}