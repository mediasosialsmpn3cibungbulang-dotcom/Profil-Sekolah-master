import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// Middleware untuk memverifikasi autentikasi admin


export async function GET() {
  try {
    let sejarah = await prisma.sejarah.findFirst();
    if (!sejarah) {
      sejarah = { title: 'Sejarah Sekolah', content: '', photoUrl: '' };
    }
    return NextResponse.json(sejarah);
  } catch (error) {
    console.error('Error fetching sejarah:', error);
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}

export async function POST(request) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { title, content, photoUrl } = data;

    let sejarah = await prisma.sejarah.findFirst();

    if (sejarah) {
      // Update
      sejarah = await prisma.sejarah.update({
        where: { id: sejarah.id },
        data: { title, content, photoUrl },
      });
    } else {
      // Create
      sejarah = await prisma.sejarah.create({
        data: { title, content, photoUrl },
      });
    }

    return NextResponse.json(sejarah);
  } catch (error) {
    console.error('Error saving sejarah:', error);
    return NextResponse.json({ error: 'Gagal menyimpan data' }, { status: 500 });
  }
}
