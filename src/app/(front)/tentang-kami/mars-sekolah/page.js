import { prisma } from '@/lib/prisma';

export const revalidate = 60; // Disable cache for demo purposes

export default async function Page() {
  const mars = await prisma.mars.findFirst();

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
            {mars?.title || "Mars Sekolah"}
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section style={{ background: 'white', padding: '60px 0 80px 0', minHeight: '600px' }}>
        <div className="container">
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }} className="mars-grid">
            {/* Responsiveness */}
            <style dangerouslySetInnerHTML={{__html: `
              @media (min-width: 992px) {
                .mars-grid { grid-template-columns: 2fr 1fr !important; }
              }
              .video-container {
                position: relative;
                padding-bottom: 56.25%; /* 16:9 aspect ratio */
                height: 0;
                overflow: hidden;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                margin-bottom: 30px;
              }
              .video-container iframe {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border: 0;
              }
            `}} />

            {/* Kolom Kiri: Video & Lirik */}
            <div>
              <h2 style={{ fontSize: '2.2rem', color: '#0f172a', marginBottom: '30px', fontWeight: '400' }}>
                {mars?.title || "Mars SMP Negeri 3 Cibungbulang"}
              </h2>
              
              <div className="video-container">
                {(() => {
                  let videoUrl = mars?.videoUrl || "https://www.youtube.com/embed/2LhVa_2f_2Q?si=M_7BdcuuTaulaO9T";
                  try {
                    if (videoUrl.includes("youtube.com/watch")) {
                      const urlParams = new URLSearchParams(new URL(videoUrl).search);
                      const v = urlParams.get("v");
                      if (v) videoUrl = `https://www.youtube.com/embed/${v}`;
                    } else if (videoUrl.includes("youtu.be/")) {
                      const id = videoUrl.split("youtu.be/")[1].split("?")[0];
                      if (id) videoUrl = `https://www.youtube.com/embed/${id}`;
                    }
                  } catch (e) {
                    // ignore URL parsing errors and fallback to original
                  }
                  
                  return (
                    <iframe 
                      src={videoUrl} 
                      title="YouTube video player" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      referrerPolicy="strict-origin-when-cross-origin" 
                      allowFullScreen
                    ></iframe>
                  );
                })()}
              </div>

              {mars?.content && (
                <div style={{ color: '#475569', lineHeight: '1.8', fontSize: '1.1rem', padding: '20px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ color: '#1e293b', marginBottom: '15px' }}>Lirik:</h4>
                  <div className="rich-text-content" dangerouslySetInnerHTML={{ __html: mars.content ? mars.content.replace(/&nbsp;|\u00A0/g, ' ') : '' }} />
                </div>
              )}
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
                <img className="zoomable-image" 
                  src={mars?.photoUrl || "/images/slide1.png"} 
                  alt="Sekolah" 
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
