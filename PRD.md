# Product Requirements Document (PRD)
**Project Name:** Website Profil Sekolah Resmi (SMPN 3 Cibungbulang)  
**Version:** 2.13 (Header SDM Mobile)  
**Status:** Complete & Production Tested  

**Changelog v2.13 (Sep 2026):** Header halaman SDM di HP dibuat fleksibel
(tinggi otomatis + judul 1.5rem) agar judul panjang "Guru dan Tenaga
Pendidik" tidak meluber.

**Changelog v2.12 (Sep 2026):** Perbaikan mobile — tombol hamburger yang
mati dihidupkan kembali (menu navigasi HP kini bisa dibuka); sidebar & form admin
menumpuk rapi di layar kecil; seluruh judul halaman mengecil otomatis di HP.

**Changelog v2.11 (Sep 2026):** Breadcrumb terstruktur (schema.org
BreadcrumbList) di 4 halaman kunci (Prestasi, Ekskul, SDM, Visi Misi) untuk
membantu kelayakan sitelink Google.

**Changelog v2.10 (Sep 2026):** Judul homepage (dan OG/Twitter) dipendekkan
menjadi "SMPN 3 Cibungbulang" agar tampil rapi di hasil Google.

**Changelog v2.9 (Sep 2026):** Favicon resmi dari logo sekolah
(`favicon.ico` multi-resolusi 16/32/48 + `apple-touch-icon.png`) agar ikon
logo tampil di tab browser dan hasil Google, bukan ikon globe generik.

**Changelog v2.8 (Sep 2026):** Fondasi SEO — metadata global (title template,
deskripsi, keywords, OpenGraph, canonical), metadata per halaman
(Prestasi, Ekskul, Berita, SDM, Visi Misi), `sitemap.xml` dinamis (rute
statis + ID berita/prestasi/ekskul/guru/sarana), `robots.txt`, dan
JSON-LD schema.org `School`. Langkah lanjutan (di luar kode): daftarkan
domain di Google Search Console + submit sitemap.

**Changelog v2.7 (Sep 2026):** Seluruh tulisan "Pegawai" di semua halaman diganti menjadi "Tenaga Pendidik" (homepage, SDM, profil, panel admin). Nilai kategori data (GURU/PEGAWAI) tidak berubah.

**Changelog v2.6 (Sep 2026):** Ikon sosmed di popup profil selalu tampil
ber tiga; yang belum diisi link-nya tampil redup dan tidak bisa diklik.

**Changelog v2.5 (Sep 2026):** Field baru `Teacher.instagram/tiktok/email`;
form Kelola Guru & Kelola Pegawai ada isian Media Sosial (opsional, terima
username atau link); popup profil menampilkan ikon hitam elegan (IG, TikTok,
email) yang bisa diklik bila datanya diisi.

**Changelog v2.4 (Sep 2026):** Halaman Sumber Daya Manusia disamakan persis
dengan beranda (2 slider Guru + Pegawai: panah, drag, dots, auto-slide,
popup profil); komponen `SdmGrid` yang tak terpakai dihapus.

**Changelog v2.3 (Sep 2026):** Data SDM dipisah kategori `GURU`/`PEGAWAI`
(field baru `Teacher.category`); beranda kini punya 2 slider
(**Guru** 29 orang + **Pegawai** 7 orang); panel admin dipecah menjadi
**Kelola Guru** dan **Kelola Pegawai** (API dukung filter `?category=`).

**Changelog v2.2 (Sep 2026):** Halaman publik `/tentang-kami/kepala-sekolah`,
panel `Kelola Kepala Sekolah`, dan API `/api/kepala-sekolah` dihapus
(kepala sekolah sudah terwakili di Sambutan Kepala Sekolah); link navbar &
sidebar dibersihkan.

**Changelog v2.1 (Sep 2026):** Beranda Guru menjadi slider ala SMAKBO (panah, drag,
dots, auto-slide, tanpa tombol More); klik foto membuka popup profil
(`TeacherProfileModal`: foto utuh + info kanan, muat 1 layar); halaman SDM memakai
popup yang sama dan rute `.../sumber-daya-manusia/baca/[id]` dihapus; path `/admin`
disamarkan + `JWT_SECRET` produksi acak + nama cookie session disamarkan.

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
- **Slider & Popup Guru (`TeacherSlider.js`, `TeacherProfileModal.js`, `SdmGrid.js`):** Galeri guru geser kanan/kiri + drag (desktop) / swipe (HP) dengan dots dan auto-slide; klik foto membuka popup profil (foto utuh + nama, jabatan/mapel, jabatan tambahan, biografi) yang di-portal ke `<body>` agar backdrop gelap selayar penuh. Dipakai di beranda dan halaman SDM.

### 3.4. Keamanan & Autentikasi
- **Next.js Proxy (`src/proxy.js`):** Proteksi rute router terpusat yang memverifikasi sesi JWT pada semua akses panel admin dan me-redirect otomatis pengguna tak terotorisasi.
- **Path Admin Disamarkan:** URL panel admin BUKAN `/admin` (yang lama 404). Nilai path asli hanya ada di server, tidak ditulis di dokumen/repo.
- **Bcrypt.js (`bcryptjs`):** Enkripsi *hashing* satu arah untuk kata sandi administrator.
- **Jose JWT (`jose`):** Tiket otentikasi sesi berbasis *HttpOnly Cookie* (nama cookie disamarkan) yang aman dari serangan XSS; ditandatangani `JWT_SECRET` acak yang hanya tersimpan di `.env.production` server (git-ignored, tidak ikut ke GitHub).
- **In-Memory Rate Limiting:** Proteksi *brute-force* pada endpoint `/api/auth/login` (maks. 5 kali percobaan gagal per 15 menit).
- **Toast Notification UI (`Toast.js`):** Notifikasi in-app modern menggantikan seluruh dialog browser bawaan (*alert localhost*).

---

## 4. Struktur Fitur & Modul

### 4.1. Halaman Publik (Frontend)
1. **Beranda (`/`)**:
   - Dynamic Hero Banner Slider (mengambil data dari CMS).
   - Sambutan Singkat Kepala Sekolah & Profil Utama.
   - Papan Prestasi Siswa Terkini.
   - **Guru & Tenaga Pendidik: 2 slider terpisah** — section **Guru** dan section
     **Tenaga Pendidik** (masing-masing: panah, tahan-seret/drag, dots, auto-slide
     tiap 3 detik); klik foto membuka **popup profil** (foto utuh + nama,
     jabatan/mapel, jabatan tambahan, biografi), tanpa tombol More.
     Kategori tersimpan di field `Teacher.category` (`GURU`/`PEGAWAI`).
   - Slider Berita & Kegiatan Sekolah Terbaru.
   - Footer informatif dengan integrasi Google Maps, jam kerja, kontak, dan tautan media sosial.
2. **Tentang Kami**:
   - **Sambutan Kepala Sekolah (`/tentang-kami/sambutan-kepala-sekolah`)**
   - **Sejarah Sekolah (`/tentang-kami/sejarah-sekolah`)**
   - **Profil Sekolah (`/tentang-kami/profil-sekolah`)** (Grid identitas sekolah, NPSN, akreditasi, rombel, dll).
   - **Visi & Misi (`/tentang-kami/visi-misi`)**
    - **Mars Sekolah (`/tentang-kami/mars-sekolah`)** (Video player sematan YouTube + Lirik Mars).
    - **Kurikulum (`/tentang-kami/kurikulum`)**
   - **Kesiswaan (`/tentang-kami/kesiswaan`)**
   - **Sarana & Prasarana (`/tentang-kami/sarana-prasarana` & `/tentang-kami/sarana-prasarana/baca/[id]`)**
   - **Struktur Organisasi (`/tentang-kami/struktur-organisasi`)** (Bagan organisasi dengan zoomable lightbox).
    - **Sumber Daya Manusia (`/tentang-kami/sumber-daya-manusia`)**: Kembaran
      beranda — 2 slider **Guru** + **Tenaga Pendidik** (panah, drag, dots, auto-slide,
      popup profil). Rute detail `.../sumber-daya-manusia/baca/[id]` sudah
      **dihapus**.
    - **Direktori SDM alternatif (`/sdm` & `/sdm/lihat/[id]/[slug]`)**: Grid + halaman detail profil (tetap dipertahankan).
3. **Prestasi Siswa (`/prestasi` & `/prestasi/[id]`)**: Katalog pencapaian lomba siswa dengan detail liputan dan foto.
4. **Ekstrakurikuler (`/ekskul` & `/ekskul/[id]`)**: Direktori kegiatan ekskul lengkap dengan nama pembina, jadwal, dan galeri kegiatan.
5. **Berita & Kegiatan (`/berita` & `/berita/[id]`)**: Portal artikel berita sekolah dengan pencarian dan pagination.

---

### 4.2. Panel Administrator (CMS Backend — path URL dirahasiakan, bukan `/admin`)
Panel admin memiliki tata letak sidebar responsif dengan navigasi terstruktur
(seluruh sub-path di bawah path admin rahasia, mis. `<rahasia>/login`,
`<rahasia>/posts`, dst.):

1. **Dashboard (`/<path-admin>/dashboard`)**: Ringkasan statistik konten dan status sistem.
2. **Kelola Konten Beranda & Informasi Utama**:
   - **Kelola Banner Slider (`/<path-admin>/sliders`)**: Tambah/ubah foto banner beranda beserta urutan tampilnya.
   - **Kelola Berita (`/<path-admin>/posts`)**: Editor CRUD berita lengkap dengan Rich Text dan upload gambar.
   - **Kelola Prestasi (`/<path-admin>/achievements`)**: Manajemen prestasi siswa (kategori, nama siswa, tingkat kejuaraan).
   - **Kelola Data Guru (`/<path-admin>/teachers`)**: Manajemen tenaga pendidik (kategori `GURU`).
   - **Kelola Data Tenaga Pendidik (`/<path-admin>/staff`)**: Manajemen tenaga kependidikan/TU/operator (kategori `PEGAWAI`).
   - **Kelola Ekstrakurikuler (`/<path-admin>/ekskul`)**: Manajemen kegiatan ekskul dan jadwal.
   - **Kelola Sambutan (`/<path-admin>/sambutan`)**: Pengaturan foto dan sambutan Kepala Sekolah.
3. **Kelola Menu Tentang Kami**:
   - **Kelola Sejarah (`/<path-admin>/sejarah`)**
   - **Kelola Profil (`/<path-admin>/profil`)**
   - **Kelola Visi Misi (`/<path-admin>/visi-misi`)**
   - **Kelola Mars (`/<path-admin>/mars`)**
   - **Kelola Kurikulum (`/<path-admin>/kurikulum`)**
   - **Kelola Kesiswaan (`/<path-admin>/kesiswaan`)**
   - **Kelola Sarana Prasarana (`/<path-admin>/sarana` & `/<path-admin>/sarana/form`)**
   - **Kelola Struktur Organisasi (`/<path-admin>/struktur-organisasi`)**

---

## 5. Alur Deployment & Operasional Server Sekolah

```
[ Pengunjung di Internet ]
           │ (HTTPS)
           ▼
[ Domain smpn3-cibungbulang.sch.id ]
   (terdaftar via JagoanHosting, nameserver diarahkan ke Cloudflare)
           ▼
[ Cloudflare Edge / WAF / Anti-DDoS / SSL ]
           │ (Tunnel terenkripsi, tanpa port-forwarding)
           ▼
[ PC Server Sekolah — Windows 11 (DESKTOP-N57DO3D) ]
- cloudflared sebagai Windows Service → http://localhost:3000
- PM2 app "web-sekolah" (Next.js production, port 3000)
- SQLite Database (dev.db, git-ignored — wajib backup manual)
- Media Folder (/public/uploads, git-ignored)
- Env produksi (.env.production berisi JWT_SECRET, git-ignored)
```

1. **Update kode:** `git pull origin main` di `C:\WEB SEKOLAH\Profil-Sekolah-master`.
2. **Build Produksi:** `npm run build` mengompilasi seluruh rute & REST API endpoint.
3. **Jalankan Ulang:** `pm2 restart web-sekolah && pm2 save`.
4. **Verifikasi:** `curl http://localhost:3000/` harus HTTP 200; cek `pm2 logs web-sekolah`.
5. Detail lengkap server, backup, rollback & troubleshooting: lihat `Server.md`.

---

## 6. Standar Keamanan & Pemeliharaan
- **Zero Port-Forwarding:** Tidak ada port router yang dibuka ke publik; lalu lintas diarahkan eksklusif via Cloudflare Tunnel (service Windows, auto-start).
- **Rahasia Tidak Di-commit:** `JWT_SECRET`, path admin, `dev.db`, dan `public/uploads` di-`.gitignore`; hanya ada di server. Mengganti `JWT_SECRET` membuat semua sesi admin logout sekali.
- **Penyimpanan Upload Aman:** Validasi MIME-type ketat hanya untuk berkas gambar (`image/*`) dengan batas ukuran 20MB.
- **Backup Wajib Berkala:** Database & foto tidak ikut ke GitHub — salin `dev.db` + `public/uploads` ke media eksternal minimal mingguan (prosedur di `Server.md`).
- **Pembersihan Rutin:** Script pemeliharaan dan berkas uji coba (*scratch files*) dieksklusi secara ketat melalui `.gitignore`.

---
*Dokumen ini diperbarui dan disahkan untuk implementasi produksi Website Profil SMPN 3 Cibungbulang.*
