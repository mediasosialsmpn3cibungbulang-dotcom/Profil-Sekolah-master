# Dokumentasi Server Website SMPN 3 Cibungbulang

> Dokumen ini menjelaskan kondisi server produksi per September 2026.
> **Aturan keras:** dokumen ini ikut ter-commit ke Git — jadi TIDAK BOLEH berisi
> nilai rahasia (isi `JWT_SECRET`, path login admin, password, token tunnel).
> Nilai-nilai itu hanya ada di file lokal server yang di-`.gitignore`.

---

## 1. Identitas Server

| Item | Nilai |
|---|---|
| Fungsi | Server produksi website sekolah (fisik, on-premise di sekolah) |
| Hostname | `DESKTOP-N57DO3D` |
| OS | Microsoft Windows 11 Enterprise (Build 26100) |
| User operasi | `SERVER` (`C:\Users\SERVER`) |
| Lokasi repo | `C:\WEB SEKOLAH\Profil-Sekolah-master` |
| Node.js | v24.20.0 (`C:\Program Files\nodejs`) |
| PM2 | v7.0.4 (global) |
| cloudflared | 2026.8.3 (berjalan sebagai **Windows Service**, auto-start) |

---

## 2. Domain & DNS (JagoanHosting + Cloudflare)

1. **Domain `smpn3-cibungbulang.sch.id` terdaftar/aktif** — panel domain di **JagoanHosting**.
2. **Nameserver domain diarahkan ke Cloudflare** (pengaturan NS di JagoanHosting diganti ke NS Cloudflare).
3. Konsekuensi: DNS publik domain me-resolve ke **IP Anycast Cloudflare**
   (contoh: `104.21.1.177`, `172.67.129.173`, IPv6 `2606:4700:30xx::...`),
   **BUKAN** IP sekolah. IP asli server tidak terekspos ke publik.
4. **HTTPS/SSL** ditangani Cloudflare (edge certificate otomatis, tanpa setting di server).
5. Jika domain expired / NS dikembalikan: website tidak bisa diakses publik walaupun server lokal hidup.

---

## 3. Cloudflare Tunnel (jalur masuk satu-satunya)

- Tidak ada **port-forwarding** di router sekolah dan tidak butuh IP publik statis.
- `cloudflared.exe` berjalan sebagai **Windows Service** bernama `cloudflared`
  (status `RUNNING`, start otomatis saat Windows menyala) dan meneruskan
  trafik `https://smpn3-cibungbulang.sch.id` → `http://localhost:3000`.
- Alur trafik:

```
[ Pengunjung ] --HTTPS--> [ Cloudflare Edge (WAF/DDoS/SSL) ]
                              --Tunnel terenkripsi-->
                         [ cloudflared service ]
                              --localhost:3000-->
                         [ Next.js via PM2 ]
```

- Cek status: `sc query cloudflared` dan `pm2 list`.

---

## 4. Aplikasi Web

| Item | Nilai |
|---|---|
| Framework | Next.js 16.3.4 (App Router), React, Prisma 5.22.0 |
| Mode jalan | Production (`next start`), `NODE_ENV=production`, port `3000` |
| Manajer proses | PM2, nama app **`web-sekolah`**, mode `fork` (lihat `ecosystem.config.js`) |
| Auto-start | `pm2-startup` + `pm2 save` (skrip `setup_server.bat`) |
| Env produksi | `.env.production` di folder repo (**git-ignored**, hanya ada di server). Berisi `JWT_SECRET`. |
| Database | SQLite **`prisma/dev.db`** (**git-ignored** — tidak ikut push!) |
| Skema | `prisma/schema.prisma`; tanpa folder migrasi (perubahan skema via `prisma db push`) |
| Upload gambar | `public/uploads/` (**git-ignored** kecuali `.gitkeep`) |

### Perintah operasional rutin (jalankan di folder repo)

```cmd
git pull origin main
npm run build
pm2 restart web-sekolah
pm2 save
curl -s http://localhost:3000/ -w "HTTP:%{http_code}\n" -o NUL
pm2 logs web-sekolah --lines 20 --nostream
```

### Rollback bila update bermasalah

```cmd
git log --oneline -5
git revert <commit-bermasalah>   (atau: git reset --hard <commit-bagus>)
npm run build
pm2 restart web-sekolah
```

---

## 5. Backup (wajib berkala!)

Database dan foto **tidak ikut ke GitHub**. Kalau harddisk rusak tanpa backup,
data hilang permanen. Cadangkan minimal mingguan:

```cmd
xcopy prisma\dev.db D:\Backup-Web-Sekolah\dev.db-2026-09-09 /Y
xcopy public\uploads D:\Backup-Web-Sekolah\uploads\ /E /Y /I
```

> PENTING: database aktif adalah `prisma/dev.db`. File `dev.db` di root repo
> adalah sisa lama (usang) — jangan di-backup, jangan dipakai.

Ganti `D:\Backup-Web-Sekolah` dengan flashdisk/HDD eksternal.

### Ubah struktur database (bila perlu)

Repo ini tanpa folder migrasi — pakai `db push` (PM2 harus berhenti dulu
karena file Prisma terkunci saat server jalan):

```cmd
pm2 stop web-sekolah
npx prisma db push
npx prisma generate
npm run build
pm2 restart web-sekolah && pm2 save
```

---

## 6. Panel Admin & Keamanan

- Path URL admin **disamarkan** (bukan `/admin` lagi; yang lama 404).
  Nilai path aslinya **hanya disimpan di server** — tanya operator,
  jangan tulis di dokumen/commit/chat publik. Jika bocor, path bisa diacak ulang.
- Sesi login: JWT 8 jam di cookie HttpOnly (nama cookie juga disamarkan),
  password di-hash bcrypt, rate-limit 5x salah/15 menit di `/api/auth/login`.
- `JWT_SECRET` acak 96 hex, hanya di `.env.production` server.
  Menggantinya membuat semua admin logout sekali (harus login ulang).
- Proteksi rute terpusat di `src/proxy.js` (matcher `/<path-admin>/:path*`, `/api/:path*`).
- Penguatan lanjutan yang disarankan: Cloudflare WAF/Access untuk path admin
  (contoh: verifikasi kode email agar guru bisa update dari rumah dengan aman).

---

## 7. Troubleshooting cepat

| Gejala | Cek / aksi |
|---|---|
| Web tidak bisa dibuka publik | `pm2 list` (harus `online`), `sc query cloudflared` (harus `RUNNING`), lalu `pm2 logs web-sekolah --lines 30 --nostream` |
| Error 502/1033 dari Cloudflare | Tunnel putus: restart service `cloudflared` / restart PC server |
| Habis update tidak berubah | Pastikan sudah `npm run build` + `pm2 restart`; hard refresh browser (`Ctrl+F5`) |
| Login admin gagal semua | Cek `.env.production` masih ada; restart PM2 agar env terbaca ulang |
| Disk penuh / DB korup | Restore `dev.db` dari backup terakhir, restart PM2 |

---

*Terakhir disinkronkan: 9 September 2026.*
