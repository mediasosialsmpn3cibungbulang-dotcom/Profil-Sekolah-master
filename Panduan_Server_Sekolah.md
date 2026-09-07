# Panduan Publikasi & Pembuatan Server Website Sekolah

Panduan ini berisi langkah-langkah lengkap dari awal hingga akhir untuk mengubah komputer lokal/laptop di sekolah menjadi server *hosting* sungguhan untuk website **SMPN 3 Cibungbulang** menggunakan teknologi **Cloudflare Tunnel**.

---

## TAHAP 1: Persiapan Domain
Langkah pertama adalah membeli "alamat" untuk website Bapak.

1. Beli nama domain resmi sekolah (contoh: `smpn3cibungbulang.sch.id`) di penyedia terpercaya seperti **Rumahweb**, **Niagahoster**, atau **IDCloudHost**.
2. Siapkan dan unggah persyaratan resmi:
   - KTP Kepala Sekolah / Penanggung Jawab.
   - Surat Permohonan Resmi dari Kepala Sekolah (menggunakan Kop Surat & stempel).
   - Surat/SK Pendirian Sekolah.
3. Tunggu 1-2 hari kerja hingga pihak PANDI memverifikasi dan mengaktifkan domain tersebut.
4. Setelah aktif, **buat akun Cloudflare** gratis di `dash.cloudflare.com`.
5. Masukkan nama domain Bapak ke Cloudflare, lalu ikuti instruksi untuk mengubah "Name Server (NS)" di pengaturan Rumahweb/Niagahoster agar mengarah ke Cloudflare.

---

## TAHAP 2: Menyiapkan Komputer Server (Di Sekolah)
Siapkan satu komputer/laptop di tata usaha atau ruang server sekolah yang akan selalu menyala (standby) saat jam kerja, atau dibiarkan menyala 24 jam dengan koneksi internet yang stabil.

### A. Pastikan Website dalam Mode "Produksi" (Cepat & Ringan)
Saat ini Bapak masih menjalankan website menggunakan mode `npm run dev` (Mode Pengembangan). Mode ini lambat dan tidak cocok untuk disebarkan ke publik. Untuk publikasi, kita harus "membungkus" website ini.

1. Buka Terminal di komputer server Bapak.
2. Hentikan dulu program yang sedang berjalan dengan menekan `Ctrl + C`.
3. Jalankan perintah ini untuk membangun versi publik:
   ```bash
   npm run build
   ```
4. Setelah selesai dan berhasil (muncul tulisan *Route*, *Size*, dsb), jalankan perintah ini untuk menyalakan server produksi:
   ```bash
   npm start
   ```
*(Ingat: Perintah `npm start` inilah yang akan terus dijalankan di komputer server sekolah nantinya. JANGAN ditutup terminalnya).*

---

## TAHAP 3: Menghubungkan Komputer ke Domain (Cloudflare Tunnel)
Ini adalah keajaiban teknologinya. Kita akan menyambungkan komputer lokal sekolah Bapak langsung ke internet global (ke domain `.sch.id` Bapak) tanpa memerlukan *IP Publik statis* atau setting *port forwarding* di router IndiHome/Biznet sekolah.

1. Download dan Install aplikasi **cloudflared** (Cloudflare Tunnel) di komputer server sekolah.
2. Buka Terminal baru (biarkan terminal `npm start` tadi tetap berjalan di jendela lain).
3. Jalankan perintah untuk login ke Cloudflare:
   ```bash
   cloudflared tunnel login
   ```
   *(Sebuah jendela browser akan terbuka, silakan pilih domain sekolah Bapak yang sudah didaftarkan di Tahap 1).*
4. Buat lorong/tunnel baru khusus untuk sekolah:
   ```bash
   cloudflared tunnel create server-sekolah
   ```
5. Hubungkan lalu lintas dari domain Bapak agar masuk ke aplikasi Next.js (yang berjalan di `http://localhost:3000`):
   ```bash
   cloudflared tunnel route dns server-sekolah smpn3cibungbulang.sch.id
   ```
6. Terakhir, nyalakan lorong/tunnel tersebut agar siap menerima pengunjung dari internet:
   ```bash
   cloudflared tunnel run --url http://localhost:3000 server-sekolah
   ```

**🎉 SELESAI!**
Sekarang, jika ada siswa atau orang tua yang membuka `https://smpn3cibungbulang.sch.id` di HP mereka masing-masing, sistem Cloudflare akan diam-diam mengambil datanya langsung dari komputer lokal di ruang TU sekolah Bapak!

---

## TAHAP 4: Keamanan Tambahan (Opsional tapi Sangat Disarankan)
Karena komputer server Bapak terhubung langsung ke internet, Bapak bisa menggunakan fitur gratis **Cloudflare Zero Trust (WAF)** untuk memblokir peretas:

- Bapak bisa mengatur di Cloudflare agar halaman `smpn3cibungbulang.sch.id/admin` **HANYA BISA DIBUKA** jika pengguna tersebut terkoneksi ke WiFi Sekolah. 
- Jika ada peretas dari luar negeri mencoba membuka halaman `/admin`, mereka akan langsung diblokir oleh "satpam" Cloudflare sebelum menyentuh komputer Bapak.

---
*Dokumen ini dibuat otomatis sebagai pegangan teknis Administrator IT SMPN 3 Cibungbulang.*
