import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const revalidate = 60; // Disable cache for demo purposes

export default async function Page() {
  const profil = await prisma.profil.findFirst();

  return (
    <main style={{ paddingBottom: '0', background: '#f8f9fa' }}>
      {/* Banner / Hero Section */}
      <section style={{ 
        position: 'relative', 
        height: '250px', 
        background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)), url("${profil?.photoUrl || '/images/slide1.png'}") center/cover`,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        borderBottom: '3px solid #1E90FF'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: '2', width: '100%', display: 'flex', alignItems: 'center' }}>
          <h1 style={{ color: 'white', fontSize: '2.5rem', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.8)', zIndex: 3 }}>
            {profil?.title || 'Profil Sekolah'}
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section style={{ background: 'white', padding: '60px 0 80px 0', minHeight: '600px' }}>
        <div className="container">
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }} className="profil-grid">
            {/* Responsiveness */}
            <style dangerouslySetInnerHTML={{__html: `
              @media (min-width: 992px) {
                .profil-grid { grid-template-columns: 1fr 1fr !important; }
              }
              .profil-card-bg {
                position: relative;
                padding: 40px;
                background: url('${profil?.photoUrl || '/images/slide1.png'}') center/cover;
              }
              .profil-card-bg::before {
                content: '';
                position: absolute;
                top: 0; left: 0; right: 0; bottom: 0;
                background: rgba(255,255,255,0.7);
                backdrop-filter: blur(2px);
              }
              .profil-card-content {
                position: relative;
                background: rgba(255,255,255,0.95);
                border: 3px solid #d1d5db;
                padding: 30px;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
              }
              .profil-info-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 15px;
              }
              .profil-info-box {
                border: 1px solid #cbd5e1;
                text-align: center;
                padding: 15px 10px;
                background: white;
              }
              .profil-info-title {
                font-size: 0.75rem;
                color: #64748b;
                text-transform: uppercase;
                margin-bottom: 5px;
                letter-spacing: 0.05em;
              }
              .profil-info-value {
                font-size: 0.95rem;
                color: #0f172a;
                font-weight: 700;
              }
            `}} />

            {/* Kolom Judul Kiri */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <h2 style={{ fontSize: '2.5rem', color: '#0f172a', fontWeight: '400' }}>
                {profil?.title || 'Profil Sekolah'}
              </h2>
            </div>

            {/* Kolom Card Kanan */}
            <div className="profil-card-bg">
              <div className="profil-card-content">
                <h3 style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: '900', color: '#0f172a', marginBottom: '25px', letterSpacing: '2px' }}>
                  {profil?.schoolName || 'SMP NEGERI 3 CIBUNGBULANG'}
                </h3>

                <div className="profil-info-grid">
                  <div className="profil-info-box">
                    <div className="profil-info-title">Status</div>
                    <div className="profil-info-value">{profil?.status || '-'}</div>
                  </div>
                  <div className="profil-info-box">
                    <div className="profil-info-title">Tahun Berdiri</div>
                    <div className="profil-info-value">{profil?.tahunBerdiri || '-'}</div>
                  </div>
                  <div className="profil-info-box">
                    <div className="profil-info-title">Branding</div>
                    <div className="profil-info-value">{profil?.branding || '-'}</div>
                  </div>
                  <div className="profil-info-box">
                    <div className="profil-info-title">Waktu Belajar</div>
                    <div className="profil-info-value">{profil?.waktuBelajar || '-'}</div>
                  </div>
                  <div className="profil-info-box">
                    <div className="profil-info-title">Kurikulum</div>
                    <div className="profil-info-value">{profil?.kurikulum || '-'}</div>
                  </div>
                  <div className="profil-info-box">
                    <div className="profil-info-title">Kemitraan</div>
                    <div className="profil-info-value">{profil?.kemitraan || '-'}</div>
                  </div>
                  <div className="profil-info-box">
                    <div className="profil-info-title">Jumlah Rombel</div>
                    <div className="profil-info-value">{profil?.jumlahRombel || '-'}</div>
                  </div>
                  <div className="profil-info-box">
                    <div className="profil-info-title">Program Unggulan</div>
                    <div className="profil-info-value">{profil?.programUnggulan || '-'}</div>
                  </div>
                  <div className="profil-info-box" style={{ gridColumn: '1 / -1' }}>
                    <div className="profil-info-title">Kepala Sekolah</div>
                    <div className="profil-info-value">{profil?.kepalaSekolah || '-'}</div>
                  </div>
                </div>

              </div>
            </div>
            
          </div>
        </div>
      </section>
    </main>
  );
}
