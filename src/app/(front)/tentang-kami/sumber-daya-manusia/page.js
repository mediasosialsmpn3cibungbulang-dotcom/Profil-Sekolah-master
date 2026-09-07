import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const revalidate = 60;

export default async function Page() {
  const teachers = await prisma.teacher.findMany();

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
          <h2>Guru dan Pegawai</h2>
          <p>Mengenal lebih dekat para pendidik dan tenaga kependidikan berdedikasi tinggi di sekolah kami.</p>
        </div>
      </div>

      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 15px', marginBottom: '80px' }}>
        <div className="content-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '30px' }}>
          {teachers.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#64748b', gridColumn: '1 / -1' }}>Belum ada data guru.</p>
          ) : (
            teachers.map((teacher) => (
              <Link href={`/tentang-kami/sumber-daya-manusia/baca/${teacher.id}`} className="guru-card" key={teacher.id}>
                <img src={teacher.photoUrl || '/images/guru1.png'} alt={teacher.name} className="guru-image zoomable-image" />
                <div className="guru-name-tag">
                  {teacher.name}
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
}
