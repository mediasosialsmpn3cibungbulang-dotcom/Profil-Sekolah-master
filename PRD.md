# Product Requirements Document (PRD)
**Project Name:** Website Profil Sekolah Resmi (SMPN 3 Cibungbulang)  
**Version:** 2.0 (Production Ready - Fully Deployed Architecture)  
**Status:** Complete & Production Tested  

---

## 1. Pendahuluan
Website profil resmi **SMPN 3 Cibungbulang** dibangun sebagai gerbang informasi publik, transparansi institusi, dan pusat publikasi digital sekolah. Sistem mencakup **Portal Publik (Frontend)** berkinerja tinggi dengan estetika modern (*Soft UI* & tipografi bersih) serta **Panel Administrator (CMS Backend)** mandiri yang memungkinkan staf sekolah mengelola seluruh konten website secara dinamis dan *real-time*.

---

## 2. Objektif Utama
- **Digitalisasi Informasi & Branding Sekolah:** Menyajikan profil lengkap, visi misi, sejarah, program unggulan, mars sekolah, dan kurikulum dalam format yang menarik bagi siswa, wali murid, dan masyarakat.
- **Transparansi SDM & Prestasi:** Direktori digital tenaga pendidik/pegawai (SDM), sarana prasarana, serta pencapaian prestasi akademik dan non-akademik siswa.
- **Kemandirian Pengelolaan Konten (No-Code CMS):** Admin sekolah dapat mengubah foto, teks, berita, ekskul, struktur organisasi, hingga banner tanpa perlu menyentuh kode program.
- **Efisiensi & Kedaulatan Data:** Berjalan di atas server fisik lokal sekolah menggunakan database SQLite tanpa ketergantungan biaya hosting bulanan, terhubung ke domain resmi `.sch.id` melalui Cloudflare Tunnel.

---

## 3. Arsitektur & Teknologi (Tech Stack)

### 3.1. Pondasi Sistem
- **Next.js (App Router - Turbopack):** Framework fullstack React modern untuk *server-side rendering* (SSR) dan *incremental static regeneration* (ISR) kilat.
- **React.js & Vanilla CSS (`global.css`):** Antarmuka responsif tanpa beban framework CSS eksternal berat, memastikan kecepatan muat (*load time*) optimal di semua perangkat (Desktop, Tablet, HP).

### 3.2. Basis Data & ORM
- **SQLite (`dev.db`):** Basis data relasional berbasis file tunggal yang ringan, aman, dan mudah di-backup.
- **Prisma ORM (`@prisma/client`):** Lapisan abstraksi database dengan skema terstruktur dan proteksi bawaan dari serangan *SQL Injection*.

### 3.3. Pengolahan Media & Editor
- **Sharp (`sharp`):** Pemrosesan gambar otomatis di sisi server. Setiap foto yang diunggah dikompresi, disesuaikan resolusinya (maks. 1920px), dan diubah menjadi format modern `.webp` berukuran ringan.
- **React Quill (`react-quill-new`):** Rich Text Editor berbasis WYSIWYG untuk penulisan artikel, biografi, dan deskripsi berformat rapi (Bold, Italic, List, Alignment).
- **Global Lightbox (`GlobalLightbox.js`):** Fitur pratinjau dan *zoom* gambar layar penuh interaktif di seluruh halaman website.

### 3.4. Keamanan & Autentikasi
- **Next.js Middleware (`src/middleware.js`):** Proteksi rute router terpusat yang memverifikasi sesi JWT pada semua akses `/admin/*` dan me-redirect otomatis pengguna tak terotorisasi.
- **Bcrypt.js (`bcryptjs`):** Enkripsi *hashing* satu arah untuk kata sandi administrator.
- **Jose JWT (`jose`):** Tiket otentikasi sesi berbasis *HttpOnly Cookie* yang aman dari serangan XSS.
- **In-Memory Rate Limiting:** Proteksi *brute-force* pada endpoint `/api/auth/login` (maks. 5 kali percobaan gagal per 15 menit).
- **Toast Notification UI (`Toast.js`):** Notifikasi in-app modern menggantikan seluruh dialog browser bawaan (*alert localhost*).

---

## 4. Struktur Fitur & Modul

### 4.1. Halaman Publik (Frontend)
1. **Beranda (`/`)**:
   - Dynamic Hero Banner Slider (mengambil data dari CMS).
   - Sambutan Singkat Kepala Sekolah & Profil Utama.
   - Papan Prestasi Siswa Terkini.
   - Daftar Cuplikan Tenaga Pendidik & Pegawai.
   - Slider Berita & Kegiatan Sekolah Terbaru.
   - Footer informatif dengan integrasi Google Maps, jam kerja, kontak, dan tautan media sosial.
2. **Tentang Kami**:
   - **Sambutan Kepala Sekolah (`/tentang-kami/sambutan-kepala-sekolah`)**
   - **Sejarah Sekolah (`/tentang-kami/sejarah-sekolah`)**
   - **Profil Sekolah (`/tentang-kami/profil-sekolah`)** (Grid identitas sekolah, NPSN, akreditasi, rombel, dll).
   - **Visi & Misi (`/tentang-kami/visi-misi`)**
   - **Mars Sekolah (`/tentang-kami/mars-sekolah`)** (Video player sematan YouTube + Lirik Mars).
   - **Kepala Sekolah (`/tentang-kami/kepala-sekolah`)** (Biografi, riwayat karir, dan pendidikan).
   - **Kurikulum (`/tentang-kami/kurikulum`)**
   - **Kesiswaan (`/tentang-kami/kesiswaan`)**
   - **Sarana & Prasarana (`/tentang-kami/sarana-prasarana` & `/tentang-kami/sarana-prasarana/baca/[id]`)**
   - **Struktur Organisasi (`/tentang-kami/struktur-organisasi`)** (Bagan organisasi dengan zoomable lightbox).
   - **Sumber Daya Manusia (`/tentang-kami/sumber-daya-manusia` & `/sdm/lihat/[id]/[slug]`)**
3. **Prestasi Siswa (`/prestasi` & `/prestasi/[id]`)**: Katalog pencapaian lomba siswa dengan detail liputan dan foto.
4. **Ekstrakurikuler (`/ekskul` & `/ekskul/[id]`)**: Direktori kegiatan ekskul lengkap dengan nama pembina, jadwal, dan galeri kegiatan.
5. **Berita & Kegiatan (`/berita` & `/berita/[id]`)**: Portal artikel berita sekolah dengan pencarian dan pagination.

---

### 4.2. Panel Administrator (CMS Backend `/admin`)
Panel admin memiliki tata letak sidebar responsif dengan navigasi terstruktur:

1. **Dashboard (`/admin/dashboard`)**: Ringkasan statistik konten dan status sistem.
2. **Kelola Konten Beranda & Informasi Utama**:
   - **Kelola Banner Slider (`/admin/sliders`)**: Tambah/ubah foto banner beranda beserta urutan tampilnya.
   - **Kelola Berita (`/admin/posts`)**: Editor CRUD berita lengkap dengan Rich Text dan upload gambar.
   - **Kelola Prestasi (`/admin/achievements`)**: Manajemen prestasi siswa (kategori, nama siswa, tingkat kejuaraan).
   - **Kelola Data Guru (`/admin/teachers`)**: Manajemen data tenaga pendidik dan kependidikan.
   - **Kelola Ekstrakurikuler (`/admin/ekskul`)**: Manajemen kegiatan ekskul dan jadwal.
   - **Kelola Sambutan (`/admin/sambutan`)**: Pengaturan foto dan sambutan Kepala Sekolah.
3. **Kelola Menu Tentang Kami**:
   - **Kelola Sejarah (`/admin/sejarah`)**
   - **Kelola Profil (`/admin/profil`)**
   - **Kelola Visi Misi (`/admin/visi-misi`)**
   - **Kelola Mars (`/admin/mars`)**
   - **Kelola Kepala Sekolah (`/admin/kepala-sekolah`)**
   - **Kelola Kurikulum (`/admin/kurikulum`)**
   - **Kelola Kesiswaan (`/admin/kesiswaan`)**
   - **Kelola Sarana Prasarana (`/admin/sarana` & `/admin/sarana/form`)**
   - **Kelola Struktur Organisasi (`/admin/struktur-organisasi`)**

---

## 5. Alur Deployment & Operasional Server Sekolah

```
[ Pengunjung di Internet ]
           │ (HTTPS)
           ▼
[ Domain sch.id (JagoanHosting) ] ──(Nameserver)──► [ Cloudflare Edge / WAF / Anti-DDoS ]
                                                                 │ (Encrypted Tunnel)
                                                                 ▼
                                                    [ PC Server Sekolah (Windows) ]
                                                    - PM2 Service (Port 3000)
                                                    - SQLite Database (dev.db)
                                                    - Media Folder (/public/uploads)
```

1. **Build Produksi:** `npm run build` mengompilasi seluruh 38 rute statis & dinamis serta 17 REST API endpoint.
2. **Jalankan Server:** `npm start` atau `pm2 start npm --name "web-sekolah" -- start`.
3. **Koneksi Tunnel:** `cloudflared tunnel run --url http://localhost:3000 server-sekolah`.

---

## 6. Standar Keamanan & Pemeliharaan
- **Zero Port-Forwarding:** Tidak ada port router yang dibuka ke publik; lalu lintas diarahkan eksklusif via Cloudflare Tunnel.
- **Penyimpanan Upload Aman:** Validasi MIME-type ketat hanya untuk berkas gambar (`image/*`) dengan batas ukuran 20MB.
- **Pembersihan Rutin:** Script pemeliharaan dan berkas uji coba (*scratch files*) dieksklusi secara ketat melalui `.gitignore`.

---
*Dokumen ini diperbarui dan disahkan untuk implementasi produksi Website Profil SMPN 3 Cibungbulang.*
