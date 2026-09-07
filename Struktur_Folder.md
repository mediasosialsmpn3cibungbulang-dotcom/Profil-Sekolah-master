# Struktur Folder & File Proyek Website SMPN 3 Cibungbulang

Berikut adalah peta struktur utama dari direktori proyek website sekolah yang dibangun menggunakan **Next.js (App Router)** dan **Prisma ORM**. Beberapa folder bawaan sistem (seperti `node_modules` dan `.next`) tidak dijabarkan secara detail karena di-generate otomatis oleh sistem.

```text
📁 Profil Sekolah/
│
├── 📁 prisma/                 # Konfigurasi Database (Backend)
│   ├── 📄 schema.prisma       # Struktur tabel database (Models)
│   ├── 📄 dev.db              # File database utama SQLite (Semua data tersimpan di sini)
│   └── 📄 seed_admin.js       # Script untuk membuat akun Admin pertama kali
│
├── 📁 public/                 # File Statis Publik
│   └── 📁 images/             # Tempat penyimpanan foto/gambar upload dan logo
│       ├── Logo.png
│       ├── slide1.png
│       └── ...
│
├── 📁 src/                    # KODE UTAMA APLIKASI
│   │
│   ├── 📁 app/                # Sistem Routing Next.js (Setiap folder otomatis jadi URL)
│   │   │
│   │   ├── 📁 (front)/        # HALAMAN PUBLIK (Dilihat oleh Pengunjung)
│   │   │   ├── 📄 layout.js   # Layout utama publik (termasuk Navbar & Footer)
│   │   │   ├── 📄 page.js     # Halaman Utama (Beranda / Home)
│   │   │   ├── 📁 berita/     # Halaman daftar & detail Berita
│   │   │   ├── 📁 ekskul/     # Halaman Ekstrakurikuler
│   │   │   ├── 📁 prestasi/   # Halaman Prestasi Siswa
│   │   │   └── 📁 tentang-kami/ # Halaman Visi Misi, Sejarah, Sambutan, dll.
│   │   │
│   │   ├── 📁 admin/          # HALAMAN PANEL ADMIN (Hanya bisa diakses jika Login)
│   │   │   ├── 📄 layout.js   # Layout khusus admin (Sidebar Menu)
│   │   │   ├── 📄 page.js     # Dashboard Admin (Ringkasan Total Data)
│   │   │   ├── 📁 login/      # Halaman Login Administrator
│   │   │   ├── 📁 berita/     # Pengelolaan (CRUD) Berita
│   │   │   ├── 📁 ekskul/     # Pengelolaan Ekstrakurikuler
│   │   │   ├── 📁 guru/       # Pengelolaan Tenaga Pendidik
│   │   │   ├── 📁 pengaturan/ # Pengelolaan Visi Misi, Sejarah, Sambutan, dll.
│   │   │   └── 📁 prestasi/   # Pengelolaan Prestasi
│   │   │
│   │   ├── 📁 api/            # BACKEND ENDPOINTS (Jalur Pengolahan Data)
│   │   │   ├── 📁 auth/       # API untuk sistem Login & Logout (JWT)
│   │   │   ├── 📁 berita/     # API untuk menarik/simpan data ke dev.db (Tabel Post)
│   │   │   ├── 📁 upload/     # API untuk menangani upload gambar ke folder public
│   │   │   └── 📁 ... (API lainnya menyesuaikan fitur)
│   │   │
│   │   ├── 📄 global.css      # File CSS Utama (Semua warna, desain, ukuran diatur di sini)
│   │   └── 📄 layout.js       # Root Layout (Kerangka dasar HTML keseluruhan)
│   │
│   ├── 📁 components/         # KOMPONEN UI YANG BISA DIGUNAKAN BERULANG (Reusable)
│   │   ├── 📄 ImageSlider.js  # Komponen Slider Foto di Beranda
│   │   ├── 📄 NewsSlider.js   # Komponen Carousel Berita
│   │   └── 📄 ScrollAnimation.js # Komponen Efek Animasi saat di-scroll
│   │
│   ├── 📁 lib/                # KODE BANTUAN (Utility)
│   │   └── 📄 prisma.js       # Konektor utama antara Next.js dengan Database Prisma
│   │
│   └── 📄 proxy.js            # Middleware/Proxy khusus untuk mengecek tiket Login (JWT) di rute /admin
│
├── 📄 .env                    # Variabel Rahasia (seperti JWT_SECRET untuk keamanan Kunci Login)
├── 📄 .gitignore              # Daftar file yang tidak akan di-upload ke GitHub
├── 📄 jsconfig.json           # Konfigurasi path mapping Javascript (mengizinkan import pakai "@/")
├── 📄 next.config.mjs         # Konfigurasi sistem mesin Next.js
├── 📄 package.json            # Daftar daftar library/modul npm yang dipakai (seperti prisma, jose, bcrypt)
├── 📄 PRD.md                  # Dokumen Persyaratan Produk (Spesifikasi Website)
└── 📄 Panduan_Server_Sekolah.md # Panduan langkah publikasi server & domain
```

### Keterangan Singkat Pola Kerja:
1. Saat pengunjung membuka web, sistem **Routing (`src/app/(front)`)** akan dipanggil.
2. Jika butuh data (seperti daftar berita), sistem memanggil **API (`src/app/api`)**.
3. API kemudian menggunakan **Prisma (`src/lib/prisma.js`)** untuk mengambil data secara aman dari **Database (`prisma/dev.db`)**.
4. Desain dan tata letak seluruhnya diatur secara terpusat melalui **Vanilla CSS (`src/app/global.css`)**.
