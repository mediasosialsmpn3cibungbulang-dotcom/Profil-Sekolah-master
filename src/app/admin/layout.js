'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const isContentActive = ['/admin/posts', '/admin/achievements', '/admin/teachers', '/admin/sliders', '/admin/sambutan', '/admin/ekskul'].includes(pathname);
  const [isContentMenuOpen, setIsContentMenuOpen] = useState(isContentActive);

  const isTentangKamiActive = ['/admin/sejarah', '/admin/profil', '/admin/visi-misi', '/admin/mars', '/admin/kepala-sekolah', '/admin/kurikulum', '/admin/kesiswaan', '/admin/sarana', '/admin/struktur-organisasi'].includes(pathname);
  const [isTentangKamiMenuOpen, setIsTentangKamiMenuOpen] = useState(isTentangKamiActive);

  // If we are on the login page, don't show the sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
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
              <a href="/admin/dashboard" style={{ 
                display: 'block', padding: '12px 15px', color: pathname === '/admin/dashboard' ? 'white' : '#cbd5e1',
                background: pathname === '/admin/dashboard' ? '#1e293b' : 'transparent',
                borderRadius: '8px', textDecoration: 'none', transition: 'all 0.2s', fontWeight: pathname === '/admin/dashboard' ? 'bold' : 'normal'
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
                    <a href="/admin/posts" style={{ 
                      display: 'block', padding: '10px 15px 10px 30px', color: pathname === '/admin/posts' ? 'white' : '#94a3b8',
                      textDecoration: 'none', transition: 'all 0.2s', fontSize: '0.9rem',
                      fontWeight: pathname === '/admin/posts' ? 'bold' : 'normal',
                      background: pathname === '/admin/posts' ? '#1e293b' : 'transparent'
                    }}>
                      Kelola Berita
                    </a>
                  </li>
                  <li>
                    <a href="/admin/achievements" style={{ 
                      display: 'block', padding: '10px 15px 10px 30px', color: pathname === '/admin/achievements' ? 'white' : '#94a3b8',
                      textDecoration: 'none', transition: 'all 0.2s', fontSize: '0.9rem',
                      fontWeight: pathname === '/admin/achievements' ? 'bold' : 'normal',
                      background: pathname === '/admin/achievements' ? '#1e293b' : 'transparent'
                    }}>
                      Kelola Prestasi
                    </a>
                  </li>
                  <li>
                    <a href="/admin/teachers" style={{ 
                      display: 'block', padding: '10px 15px 10px 30px', color: pathname === '/admin/teachers' ? 'white' : '#94a3b8',
                      textDecoration: 'none', transition: 'all 0.2s', fontSize: '0.9rem',
                      fontWeight: pathname === '/admin/teachers' ? 'bold' : 'normal',
                      background: pathname === '/admin/teachers' ? '#1e293b' : 'transparent'
                    }}>
                      Kelola Guru
                    </a>
                  </li>
                  <li>
                    <a href="/admin/ekskul" style={{ 
                      display: 'block', padding: '10px 15px 10px 30px', color: pathname === '/admin/ekskul' ? 'white' : '#94a3b8',
                      textDecoration: 'none', transition: 'all 0.2s', fontSize: '0.9rem',
                      fontWeight: pathname === '/admin/ekskul' ? 'bold' : 'normal',
                      background: pathname === '/admin/ekskul' ? '#1e293b' : 'transparent'
                    }}>
                      Kelola Ekstrakurikuler
                    </a>
                  </li>
                  <li>
                    <a href="/admin/sliders" style={{ 
                      display: 'block', padding: '10px 15px 10px 30px', color: pathname === '/admin/sliders' ? 'white' : '#94a3b8',
                      textDecoration: 'none', transition: 'all 0.2s', fontSize: '0.9rem',
                      fontWeight: pathname === '/admin/sliders' ? 'bold' : 'normal',
                      background: pathname === '/admin/sliders' ? '#1e293b' : 'transparent'
                    }}>
                      Kelola Banner
                    </a>
                  </li>
                  <li>
                    <a href="/admin/sambutan" style={{ 
                      display: 'block', padding: '10px 15px 10px 30px', color: pathname === '/admin/sambutan' ? 'white' : '#94a3b8',
                      textDecoration: 'none', transition: 'all 0.2s', fontSize: '0.9rem',
                      fontWeight: pathname === '/admin/sambutan' ? 'bold' : 'normal',
                      background: pathname === '/admin/sambutan' ? '#1e293b' : 'transparent'
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
                    <a href="/admin/sejarah" style={{ 
                      display: 'block', padding: '10px 15px 10px 30px', color: pathname === '/admin/sejarah' ? 'white' : '#94a3b8',
                      textDecoration: 'none', transition: 'all 0.2s', fontSize: '0.9rem',
                      fontWeight: pathname === '/admin/sejarah' ? 'bold' : 'normal',
                      background: pathname === '/admin/sejarah' ? '#1e293b' : 'transparent'
                    }}>
                      Kelola Sejarah
                    </a>
                  </li>
                  <li>
                    <a href="/admin/profil" style={{ 
                      display: 'block', padding: '10px 15px 10px 30px', color: pathname === '/admin/profil' ? 'white' : '#94a3b8',
                      textDecoration: 'none', transition: 'all 0.2s', fontSize: '0.9rem',
                      fontWeight: pathname === '/admin/profil' ? 'bold' : 'normal',
                      background: pathname === '/admin/profil' ? '#1e293b' : 'transparent'
                    }}>
                      Kelola Profil
                    </a>
                  </li>
                  <li>
                    <a href="/admin/visi-misi" style={{ 
                      display: 'block', padding: '10px 15px 10px 30px', color: pathname === '/admin/visi-misi' ? 'white' : '#94a3b8',
                      textDecoration: 'none', transition: 'all 0.2s', fontSize: '0.9rem',
                      fontWeight: pathname === '/admin/visi-misi' ? 'bold' : 'normal',
                      background: pathname === '/admin/visi-misi' ? '#1e293b' : 'transparent'
                    }}>
                      Kelola Visi Misi
                    </a>
                  </li>
                  <li>
                    <a href="/admin/mars" style={{ 
                      display: 'block', padding: '10px 15px 10px 30px', color: pathname === '/admin/mars' ? 'white' : '#94a3b8',
                      textDecoration: 'none', transition: 'all 0.2s', fontSize: '0.9rem',
                      fontWeight: pathname === '/admin/mars' ? 'bold' : 'normal',
                      background: pathname === '/admin/mars' ? '#1e293b' : 'transparent'
                    }}>
                      Kelola Mars Sekolah
                    </a>
                  </li>
                  <li>
                    <a href="/admin/kepala-sekolah" style={{ 
                      display: 'block', padding: '10px 15px 10px 30px', color: pathname === '/admin/kepala-sekolah' ? 'white' : '#94a3b8',
                      textDecoration: 'none', transition: 'all 0.2s', fontSize: '0.9rem',
                      fontWeight: pathname === '/admin/kepala-sekolah' ? 'bold' : 'normal',
                      background: pathname === '/admin/kepala-sekolah' ? '#1e293b' : 'transparent'
                    }}>
                      Kelola Kepala Sekolah
                    </a>
                  </li>

                  <li>
                    <a href="/admin/kurikulum" style={{ 
                      display: 'block', padding: '10px 15px 10px 30px', color: pathname === '/admin/kurikulum' ? 'white' : '#94a3b8',
                      textDecoration: 'none', transition: 'all 0.2s', fontSize: '0.9rem',
                      fontWeight: pathname === '/admin/kurikulum' ? 'bold' : 'normal',
                      background: pathname === '/admin/kurikulum' ? '#1e293b' : 'transparent'
                    }}>
                      Kelola Kurikulum
                    </a>
                  </li>
                  <li>
                    <a href="/admin/kesiswaan" style={{ 
                      display: 'block', padding: '10px 15px 10px 30px', color: pathname === '/admin/kesiswaan' ? 'white' : '#94a3b8',
                      textDecoration: 'none', transition: 'all 0.2s', fontSize: '0.9rem',
                      fontWeight: pathname === '/admin/kesiswaan' ? 'bold' : 'normal',
                      background: pathname === '/admin/kesiswaan' ? '#1e293b' : 'transparent'
                    }}>
                      Kelola Kesiswaan
                    </a>
                  </li>
                  <li>
                    <a href="/admin/sarana" style={{ 
                      display: 'block', padding: '10px 15px 10px 30px', color: pathname.startsWith('/admin/sarana') ? 'white' : '#94a3b8',
                      textDecoration: 'none', transition: 'all 0.2s', fontSize: '0.9rem',
                      fontWeight: pathname.startsWith('/admin/sarana') ? 'bold' : 'normal',
                      background: pathname.startsWith('/admin/sarana') ? '#1e293b' : 'transparent'
                    }}>
                      Kelola Sarana & Prasarana
                    </a>
                  </li>
                  <li>
                    <a href="/admin/struktur-organisasi" style={{ 
                      display: 'block', padding: '10px 15px 10px 30px', color: pathname === '/admin/struktur-organisasi' ? 'white' : '#94a3b8',
                      textDecoration: 'none', transition: 'all 0.2s', fontSize: '0.9rem',
                      fontWeight: pathname === '/admin/struktur-organisasi' ? 'bold' : 'normal',
                      background: pathname === '/admin/struktur-organisasi' ? '#1e293b' : 'transparent'
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
