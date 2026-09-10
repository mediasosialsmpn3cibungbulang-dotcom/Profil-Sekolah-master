'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const isContentActive = ['/operator-8da0c2/posts', '/operator-8da0c2/achievements', '/operator-8da0c2/teachers', '/operator-8da0c2/sliders', '/operator-8da0c2/sambutan', '/operator-8da0c2/ekskul'].includes(pathname);
  const [isContentMenuOpen, setIsContentMenuOpen] = useState(isContentActive);

  const isTentangKamiActive = ['/operator-8da0c2/sejarah', '/operator-8da0c2/profil', '/operator-8da0c2/visi-misi', '/operator-8da0c2/mars', '/operator-8da0c2/kurikulum', '/operator-8da0c2/kesiswaan', '/operator-8da0c2/sarana', '/operator-8da0c2/struktur-organisasi'].includes(pathname);
  const [isTentangKamiMenuOpen, setIsTentangKamiMenuOpen] = useState(isTentangKamiActive);

  // If we are on the login page, don't show the sidebar
  if (pathname === '/operator-8da0c2/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/operator-8da0c2/login');
    router.refresh();
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'var(--font-family)', background: '#f8fafc' }}>
      
      {/* Sidebar */}
      <aside style={{ width: '260px', background: '#0f172a', color: 'white', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '30px 20px', borderBottom: '1px solid #1e293b' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#f8fafc', margin: 0 }}>
            SMPN 3 Cibungbulang
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '5px 0 0 0' }}>Admin Panel</p>
        </div>
        
        <nav style={{ flex: 1, padding: '20px' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: '10px' }}>
              <a href="/operator-8da0c2/dashboard" style={{ 
                display: 'block', padding: '12px 15px', color: pathname === '/operator-8da0c2/dashboard' ? 'white' : '#cbd5e1',
                background: pathname === '/operator-8da0c2/dashboard' ? '#1e293b' : 'transparent',
                borderRadius: '8px', textDecoration: 'none', transition: 'all 0.2s', fontWeight: pathname === '/operator-8da0c2/dashboard' ? 'bold' : 'normal'
              }}>
                Dashboard
              </a>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <div 
                onClick={() => setIsContentMenuOpen(!isContentMenuOpen)}
                style={{ 
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '12px 15px', color: isContentActive ? 'white' : '#cbd5e1',
                  background: isContentActive && !isContentMenuOpen ? '#1e293b' : 'transparent',
                  borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s', fontWeight: isContentActive ? 'bold' : 'normal'
                }}>
                <span>Kelola Konten Beranda</span>
                <span style={{ transform: isContentMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>▼</span>
              </div>
              
              {/* Dropdown Items */}
              <div style={{ 
                maxHeight: isContentMenuOpen ? '300px' : '0', 
                overflow: 'hidden', 
                transition: 'max-height 0.3s ease-in-out',
                background: '#0b1120',
                borderRadius: '8px',
                marginTop: isContentMenuOpen ? '5px' : '0'
              }}>
                <ul style={{ listStyle: 'none', padding: '10px 0', margin: 0 }}>
                  <li>
                    <a href="/operator-8da0c2/posts" style={{ 
                      display: 'block', padding: '10px 15px 10px 30px', color: pathname === '/operator-8da0c2/posts' ? 'white' : '#94a3b8',
                      textDecoration: 'none', transition: 'all 0.2s', fontSize: '0.9rem',
                      fontWeight: pathname === '/operator-8da0c2/posts' ? 'bold' : 'normal',
                      background: pathname === '/operator-8da0c2/posts' ? '#1e293b' : 'transparent'
                    }}>
                      Kelola Berita
                    </a>
                  </li>
                  <li>
                    <a href="/operator-8da0c2/achievements" style={{ 
                      display: 'block', padding: '10px 15px 10px 30px', color: pathname === '/operator-8da0c2/achievements' ? 'white' : '#94a3b8',
                      textDecoration: 'none', transition: 'all 0.2s', fontSize: '0.9rem',
                      fontWeight: pathname === '/operator-8da0c2/achievements' ? 'bold' : 'normal',
                      background: pathname === '/operator-8da0c2/achievements' ? '#1e293b' : 'transparent'
                    }}>
                      Kelola Prestasi
                    </a>
                  </li>
                  <li>
                    <a href="/operator-8da0c2/teachers" style={{ 
                      display: 'block', padding: '10px 15px 10px 30px', color: pathname === '/operator-8da0c2/teachers' ? 'white' : '#94a3b8',
                      textDecoration: 'none', transition: 'all 0.2s', fontSize: '0.9rem',
                      fontWeight: pathname === '/operator-8da0c2/teachers' ? 'bold' : 'normal',
                      background: pathname === '/operator-8da0c2/teachers' ? '#1e293b' : 'transparent'
                    }}>
                      Kelola Guru
                    </a>
                  </li>
                  <li>
                    <a href="/operator-8da0c2/ekskul" style={{ 
                      display: 'block', padding: '10px 15px 10px 30px', color: pathname === '/operator-8da0c2/ekskul' ? 'white' : '#94a3b8',
                      textDecoration: 'none', transition: 'all 0.2s', fontSize: '0.9rem',
                      fontWeight: pathname === '/operator-8da0c2/ekskul' ? 'bold' : 'normal',
                      background: pathname === '/operator-8da0c2/ekskul' ? '#1e293b' : 'transparent'
                    }}>
                      Kelola Ekstrakurikuler
                    </a>
                  </li>
                  <li>
                    <a href="/operator-8da0c2/sliders" style={{ 
                      display: 'block', padding: '10px 15px 10px 30px', color: pathname === '/operator-8da0c2/sliders' ? 'white' : '#94a3b8',
                      textDecoration: 'none', transition: 'all 0.2s', fontSize: '0.9rem',
                      fontWeight: pathname === '/operator-8da0c2/sliders' ? 'bold' : 'normal',
                      background: pathname === '/operator-8da0c2/sliders' ? '#1e293b' : 'transparent'
                    }}>
                      Kelola Banner
                    </a>
                  </li>
                  <li>
                    <a href="/operator-8da0c2/sambutan" style={{ 
                      display: 'block', padding: '10px 15px 10px 30px', color: pathname === '/operator-8da0c2/sambutan' ? 'white' : '#94a3b8',
                      textDecoration: 'none', transition: 'all 0.2s', fontSize: '0.9rem',
                      fontWeight: pathname === '/operator-8da0c2/sambutan' ? 'bold' : 'normal',
                      background: pathname === '/operator-8da0c2/sambutan' ? '#1e293b' : 'transparent'
                    }}>
                      Kelola Sambutan
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            
            {/* Kelola Konten Tentang Kami */}
            <li style={{ marginBottom: '10px' }}>
              <div 
                onClick={() => setIsTentangKamiMenuOpen(!isTentangKamiMenuOpen)}
                style={{ 
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '12px 15px', color: isTentangKamiActive ? 'white' : '#cbd5e1',
                  background: isTentangKamiActive && !isTentangKamiMenuOpen ? '#1e293b' : 'transparent',
                  borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s', fontWeight: isTentangKamiActive ? 'bold' : 'normal'
                }}>
                <span>Kelola Tentang Kami</span>
                <span style={{ transform: isTentangKamiMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>▼</span>
              </div>
              
              {/* Dropdown Items */}
              <div style={{ 
                maxHeight: isTentangKamiMenuOpen ? '600px' : '0', 
                overflow: 'hidden', 
                transition: 'max-height 0.3s ease-in-out',
                background: '#0b1120',
                borderRadius: '8px',
                marginTop: isTentangKamiMenuOpen ? '5px' : '0'
              }}>
                <ul style={{ listStyle: 'none', padding: '10px 0', margin: 0 }}>
                  <li>
                    <a href="/operator-8da0c2/sejarah" style={{ 
                      display: 'block', padding: '10px 15px 10px 30px', color: pathname === '/operator-8da0c2/sejarah' ? 'white' : '#94a3b8',
                      textDecoration: 'none', transition: 'all 0.2s', fontSize: '0.9rem',
                      fontWeight: pathname === '/operator-8da0c2/sejarah' ? 'bold' : 'normal',
                      background: pathname === '/operator-8da0c2/sejarah' ? '#1e293b' : 'transparent'
                    }}>
                      Kelola Sejarah
                    </a>
                  </li>
                  <li>
                    <a href="/operator-8da0c2/profil" style={{ 
                      display: 'block', padding: '10px 15px 10px 30px', color: pathname === '/operator-8da0c2/profil' ? 'white' : '#94a3b8',
                      textDecoration: 'none', transition: 'all 0.2s', fontSize: '0.9rem',
                      fontWeight: pathname === '/operator-8da0c2/profil' ? 'bold' : 'normal',
                      background: pathname === '/operator-8da0c2/profil' ? '#1e293b' : 'transparent'
                    }}>
                      Kelola Profil
                    </a>
                  </li>
                  <li>
                    <a href="/operator-8da0c2/visi-misi" style={{ 
                      display: 'block', padding: '10px 15px 10px 30px', color: pathname === '/operator-8da0c2/visi-misi' ? 'white' : '#94a3b8',
                      textDecoration: 'none', transition: 'all 0.2s', fontSize: '0.9rem',
                      fontWeight: pathname === '/operator-8da0c2/visi-misi' ? 'bold' : 'normal',
                      background: pathname === '/operator-8da0c2/visi-misi' ? '#1e293b' : 'transparent'
                    }}>
                      Kelola Visi Misi
                    </a>
                  </li>
                  <li>
                    <a href="/operator-8da0c2/mars" style={{ 
                      display: 'block', padding: '10px 15px 10px 30px', color: pathname === '/operator-8da0c2/mars' ? 'white' : '#94a3b8',
                      textDecoration: 'none', transition: 'all 0.2s', fontSize: '0.9rem',
                      fontWeight: pathname === '/operator-8da0c2/mars' ? 'bold' : 'normal',
                      background: pathname === '/operator-8da0c2/mars' ? '#1e293b' : 'transparent'
                    }}>
                      Kelola Mars Sekolah
                    </a>
                  </li>

                  <li>
                    <a href="/operator-8da0c2/kurikulum" style={{ 
                      display: 'block', padding: '10px 15px 10px 30px', color: pathname === '/operator-8da0c2/kurikulum' ? 'white' : '#94a3b8',
                      textDecoration: 'none', transition: 'all 0.2s', fontSize: '0.9rem',
                      fontWeight: pathname === '/operator-8da0c2/kurikulum' ? 'bold' : 'normal',
                      background: pathname === '/operator-8da0c2/kurikulum' ? '#1e293b' : 'transparent'
                    }}>
                      Kelola Kurikulum
                    </a>
                  </li>
                  <li>
                    <a href="/operator-8da0c2/kesiswaan" style={{ 
                      display: 'block', padding: '10px 15px 10px 30px', color: pathname === '/operator-8da0c2/kesiswaan' ? 'white' : '#94a3b8',
                      textDecoration: 'none', transition: 'all 0.2s', fontSize: '0.9rem',
                      fontWeight: pathname === '/operator-8da0c2/kesiswaan' ? 'bold' : 'normal',
                      background: pathname === '/operator-8da0c2/kesiswaan' ? '#1e293b' : 'transparent'
                    }}>
                      Kelola Kesiswaan
                    </a>
                  </li>
                  <li>
                    <a href="/operator-8da0c2/sarana" style={{ 
                      display: 'block', padding: '10px 15px 10px 30px', color: pathname.startsWith('/operator-8da0c2/sarana') ? 'white' : '#94a3b8',
                      textDecoration: 'none', transition: 'all 0.2s', fontSize: '0.9rem',
                      fontWeight: pathname.startsWith('/operator-8da0c2/sarana') ? 'bold' : 'normal',
                      background: pathname.startsWith('/operator-8da0c2/sarana') ? '#1e293b' : 'transparent'
                    }}>
                      Kelola Sarana & Prasarana
                    </a>
                  </li>
                  <li>
                    <a href="/operator-8da0c2/struktur-organisasi" style={{ 
                      display: 'block', padding: '10px 15px 10px 30px', color: pathname === '/operator-8da0c2/struktur-organisasi' ? 'white' : '#94a3b8',
                      textDecoration: 'none', transition: 'all 0.2s', fontSize: '0.9rem',
                      fontWeight: pathname === '/operator-8da0c2/struktur-organisasi' ? 'bold' : 'normal',
                      background: pathname === '/operator-8da0c2/struktur-organisasi' ? '#1e293b' : 'transparent'
                    }}>
                      Kelola Struktur Organisasi
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
        
        <div style={{ padding: '20px', borderTop: '1px solid #1e293b' }}>
          <a href="/" style={{ display: 'block', color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem', marginBottom: '15px' }}>
            &larr; Ke Halaman Utama
          </a>
          <button 
            onClick={handleLogout}
            style={{ 
              width: '100%', padding: '10px', background: '#ef4444', color: 'white', 
              border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.target.style.background = '#dc2626'}
            onMouseOut={(e) => e.target.style.background = '#ef4444'}
          >
            Logout
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {children}
        </div>
      </main>
      
    </div>
  );
}
