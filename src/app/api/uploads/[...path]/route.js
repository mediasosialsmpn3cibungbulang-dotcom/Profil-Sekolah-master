import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

const MIME_TYPES = {
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

function notFound() {
  // no-store agar 404 TIDAK di-cache: saat file-nya muncul sedetik kemudian,
  // request berikutnya langsung 200 tanpa perlu restart server.
  return new NextResponse('Image not found', {
    status: 404,
    headers: { 'Cache-Control': 'no-store, must-revalidate' },
  });
}

// Melayani /uploads/<nama-file> langsung dari disk setiap request,
// sehingga foto yang baru diunggah admin langsung tampil tanpa restart.
export async function GET(request, context) {
  try {
    const params = context?.params
      ? await context.params
      : {};
    const segments = params?.path || [];
    const filename = Array.isArray(segments)
      ? segments[segments.length - 1]
      : segments;

    if (!filename || typeof filename !== 'string') return notFound();
    // Tolak path traversal & karakter berbahaya
    if (
      filename.includes('..') ||
      filename.includes('/') ||
      filename.includes('\\')
    ) {
      return notFound();
    }
    if (!/\.(webp|jpe?g|png|gif|avif|svg|ico)$/i.test(filename)) {
      return notFound();
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const filepath = path.join(uploadDir, filename);
    // Pastikan tetap di dalam folder uploads
    if (!filepath.startsWith(uploadDir)) return notFound();

    const data = await readFile(filepath);
    const ext = path.extname(filename).toLowerCase();

    return new NextResponse(data, {
      status: 200,
      headers: {
        'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Length': String(data.length),
      },
    });
  } catch (error) {
    return notFound();
  }
}
