/** @type {import('next').NextConfig} */
const nextConfig = {
  // Mengizinkan akses HMR Next.js dari jaringan lokal (HP/Device lain)
  allowedDevOrigins: ['192.168.0.87', '192.168.1.33', '192.168.2.3'],
  // Jangan cache 404 untuk file upload baru (gambar berita/guru/dll),
  // agar foto yang baru diunggah admin langsung tampil tanpa restart server.
  async headers() {
    return [
      {
        source: '/uploads/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
  // Alihkan /uploads/* ke API dinamis agar foto baru langsung tampil
  // tanpa restart server (404 memakai no-store, tidak di-cache).
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/uploads/:path*', destination: '/api/uploads/:path*' },
      ],
    };
  },
};

export default nextConfig;
