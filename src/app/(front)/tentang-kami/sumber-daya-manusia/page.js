import { prisma } from '@/lib/prisma';
import TeacherSlider from '@/components/TeacherSlider';

export const revalidate = 60;

export default async function Page() {
  const teachers = await prisma.teacher.findMany({
    where: { category: 'GURU' },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
  });

  const staff = await prisma.teacher.findMany({
    where: { category: 'PEGAWAI' },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
  });

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

      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 15px', marginBottom: '20px' }}>
        <h2 className="section-title" style={{ color: '#1e293b' }}>Guru</h2>
        <TeacherSlider teachers={teachers} autoPlayInterval={3000} />
      </div>

      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 15px', marginBottom: '80px' }}>
        <h2 className="section-title" style={{ color: '#1e293b' }}>Pegawai</h2>
        <TeacherSlider teachers={staff} autoPlayInterval={3000} />
      </div>
    </>
  );
}
