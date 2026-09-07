@echo off
title Setup Server Fisik Sekolah
echo ========================================================
echo   MENYIAPKAN SERVER FISIK WEBSITE SEKOLAH (PM2 & FIREWALL)
echo ========================================================
echo.

:: 1. Membuka Port 3000 di Windows Firewall
echo [1/3] Membuka port 3000 di Windows Firewall...
netsh advfirewall firewall add rule name="Web Sekolah HTTP (3000)" dir=in action=allow protocol=TCP localport=3000 >nul 2>&1
if %errorlevel% equ 0 (
    echo    [OK] Port 3000 berhasil dibuka di Firewall!
) else (
    echo    [PERINGATAN] Gagal membuka firewall. Pastikan klik kanan dan Run as administrator.
)

:: 2. Menginstall pm2-windows-startup
echo.
echo [2/3] Memasang fitur auto-start PM2 saat Windows dinyalakan...
call npm install -g pm2-windows-startup
call pm2-startup install

:: 3. Menyimpan konfigurasi PM2
echo.
echo [3/3] Menyimpan proses web-sekolah ke PM2...
call pm2 save

echo.
echo ========================================================
echo   SELESAI! Server sudah siap berjalan otomatis.
echo   Silakan coba tes akses dari HP: http://192.168.1.152:3000
echo ========================================================
pause
