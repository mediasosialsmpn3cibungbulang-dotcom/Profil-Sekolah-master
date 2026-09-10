# Aturan Kerja AI — Website SMPN 3 Cibungbulang

> File ini WAJIB dibaca dan dipatuhi setiap AI yang mengerjakan repo ini.
> Bahasa komunikasi dengan operator: Indonesia, singkat dan jelas.

## 1. Konteks Proyek

- Website profil sekolah: **Next.js 16 (App Router) + Prisma + SQLite (`dev.db`)**.
- Repo lokal: `C:\WEB SEKOLAH\Profil-Sekolah-master`, branch `main`.
- **Mesin ini = server produksi.** PM2 app `web-sekolah` (`next start`, port 3000)
  + `cloudflared` (Windows Service) → `https://smpn3-cibungbulang.sch.id`.
- Dokumen acuan: `PRD.md` (fitur), `Server.md` (server/deploy), `Struktur_Folder.md`.

## 2. Definition of Done — WAJIB setiap ada update kode

Setiap selesai mengubah kode (fitur, fix, keamanan), AI harus menyelesaikan
semua langkah ini dalam SATU sesi, tanpa menunggu disuruh:

1. **Verifikasi build:** `npm run build` harus lolos.
   (`npm run lint` rusak karena `next lint` deprecated — jangan dipakai.)
2. **Update `PRD.md`:** tambahkan entri changelog + sesuaikan bagian yang
   berubah + naikkan versi minor (2.1 → 2.2 → dst.).
3. **Update `Server.md`** bila perubahan menyentuh infra/deploy/keamanan/rute/URL.
4. **Deploy langsung:** `npm run build && pm2 restart web-sekolah && pm2 save`,
   lalu verifikasi `curl http://localhost:3000/` HTTP 200 (+ cek rute terkait,
   mis. rute lama harus 404 bila dihapus).
5. **Commit + push otomatis** ke `origin main` dengan pesan gaya
   `feat:` / `fix:` / `docs:` / `security:` (tanpa konfirmasi ulang —
   ini permintaan tetap operator).

## 3. Larangan Keras (Keamanan)

- **JANGAN PERNAH** menulis nilai rahasia ke file yang ter-commit:
  isi `JWT_SECRET`, path login admin rahasia, password, token tunnel.
  Rahasia hanya boleh ada di file git-ignored di server (mis. `.env.production`).
- Sebelum commit, verifikasi dengan `git status` + `git diff` dan pastikan
  tidak ada file `.env*` ikut ter-stage (`git check-ignore` bila ragu).
- Jangan mengubah/membaca isi secret; cukup cek keberadaannya (SET/UNSET).
- Jangan menebak URL — verifikasi lewat eksekusi (`curl`, baca file).

## 4. Cara Verifikasi Standar

```cmd
npm run build
pm2 restart web-sekolah && pm2 save
sleep 12 && curl -s http://localhost:3000/ -w "HTTP:%{http_code}\n" -o NUL
pm2 logs web-sekolah --lines 10 --nostream
```
