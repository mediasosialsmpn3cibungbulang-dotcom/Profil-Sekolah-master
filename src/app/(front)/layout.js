import Link from 'next/link';
import GlobalLightbox from '@/components/GlobalLightbox';

export default function FrontLayout({ children }) {
  return (
    <>
      <GlobalLightbox />
      <nav className="navbar">
        <div className="container nav-container">
          <Link href="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'inherit', zIndex: 1001 }}>
            <img src="/images/Logo.png" alt="Logo SMPN 3 Cibungbulang" style={{ height: '40px', width: 'auto' }} />
            <h2 style={{ margin: 0, fontSize: 'inherit', color: 'inherit' }}>SMPN 3 Cibungbulang</h2>
          </Link>

          <input type="checkbox" id="nav-toggle" className="nav-toggle" />
          <label htmlFor="nav-toggle" className="nav-toggle-label">
            <span></span>
            <span></span>
            <span></span>
          </label>

          <ul className="nav-menu">
            <li className="nav-item"><a href="/" className="nav-link">Home</a></li>

            <li className="nav-item">
              <input type="checkbox" id="dd-tentang" className="dd-toggle" />
              <label htmlFor="dd-tentang" className="nav-link dd-label">Tentang Kami ▾</label>
              <ul className="dropdown-menu">
                <li><a href="/tentang-kami/sambutan-kepala-sekolah" className="dropdown-item">Sambutan Kepala Sekolah</a></li>
                <li><a href="/tentang-kami/sejarah-sekolah" className="dropdown-item">Sejarah Sekolah</a></li>
                <li><a href="/tentang-kami/profil-sekolah" className="dropdown-item">Profil Sekolah</a></li>
                <li><a href="/tentang-kami/visi-misi" className="dropdown-item">Visi Misi Sekolah</a></li>
                <li><a href="/tentang-kami/mars-sekolah" className="dropdown-item">Mars Sekolah</a></li>

                <li><a href="/tentang-kami/kurikulum" className="dropdown-item">Kurikulum</a></li>
                <li><a href="/tentang-kami/kesiswaan" className="dropdown-item">Kesiswaan</a></li>
                <li><a href="/tentang-kami/sarana-prasarana" className="dropdown-item">Sarana dan Prasarana</a></li>
                <li><a href="/tentang-kami/struktur-organisasi" className="dropdown-item">Struktur Organisasi</a></li>
                <li><a href="/tentang-kami/sumber-daya-manusia" className="dropdown-item">Sumber Daya Manusia</a></li>
              </ul>
            </li>
            <li className="nav-item"><a href="/prestasi" className="nav-link">Prestasi</a></li>
            <li className="nav-item"><a href="/ekskul" className="nav-link">Ekskul</a></li>
            <li className="nav-item"><a href="/berita" className="nav-link">Berita & Kegiatan</a></li>

            <li className="nav-item">
              <input type="checkbox" id="dd-link" className="dd-toggle" />
              <label htmlFor="dd-link" className="nav-link dd-label">Link ▾</label>
              <ul className="dropdown-menu">
                <li><a href="https://www.instagram.com/smpn3cibungbulang_official" target="_blank" rel="noopener noreferrer" className="dropdown-item">Instagram Sekolah</a></li>
                <li><a href="https://www.facebook.com/smpn3cibungbulang" target="_blank" rel="noopener noreferrer" className="dropdown-item">Facebook Sekolah</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>

      {children}

      <footer style={{ background: '#2185ff', color: 'white', padding: '60px 0 20px 0', marginTop: '60px' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'space-between', marginBottom: '40px' }}>
          {/* Left Side: Kontak & Socials */}
          <div style={{ flex: '1', minWidth: '300px' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', fontWeight: 'bold' }}>Kontak</h3>
            <p style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '15px', lineHeight: '1.5' }}>
              <span style={{ fontSize: '1.2rem', marginTop: '3px' }}>📍</span>
              <span>CMX4+5VX, Cijujung, Kec. Cibungbulang,<br />Kabupaten Bogor, Jawa Barat 16630</span>
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
              <span style={{ fontSize: '1.2rem' }}>📞</span> (+ 62) 895-6267-54135
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px' }}>
              <span style={{ fontSize: '1.2rem' }}>✉️</span> smpntigacibungbulangk@gmail.com
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <a href="https://www.instagram.com/smpn3cibungbulang_official" target="_blank" rel="noopener noreferrer">
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" alt="Instagram" style={{ width: '40px', height: '40px', background: 'white', borderRadius: '8px', padding: '2px' }} />
              </a>
              <a href="https://www.facebook.com/smpn3cibungbulang" target="_blank" rel="noopener noreferrer">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" style={{ width: '40px', height: '40px', background: 'white', borderRadius: '8px', padding: '2px' }} />
              </a>
            </div>
          </div>

          {/* Right Side: Map */}
          <div style={{ flex: '2', minWidth: '300px' }}>
            <iframe
              src="https://maps.google.com/maps?q=SMPN%203%20Cibungbulang,%20Cijujung,%20Kec.%20Cibungbulang,%20Kabupaten%20Bogor,%20Jawa%20Barat%2016630&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="250"
              style={{ border: 0, borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div className="container" style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
          <p>&copy; smpn3-cibungbulang.sch.id. All Right Reserved.</p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="/" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
            <a href="/tentang-kami/sumber-daya-manusia" style={{ color: 'white', textDecoration: 'none' }}>SDM</a>
            <a href="/berita" style={{ color: 'white', textDecoration: 'none' }}>Berita dan Kegiatan</a>
          </div>
        </div>
      </footer>
    </>
  );
}
