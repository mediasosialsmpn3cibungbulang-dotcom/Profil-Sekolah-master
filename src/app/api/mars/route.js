import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// Middleware untuk memverifikasi autentikasi admin


export async function GET() {
  try {
    let mars = await prisma.mars.findFirst();
    if (!mars) {
      mars = { 
        title: "Mars Sekolah",
        videoUrl: "",
        content: "",
        photoUrl: "" 
      };
    }
    return NextResponse.json(mars);
  } catch (error) {
    console.error('Error fetching mars:', error);
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}

export async function POST(request) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { title, videoUrl, content, photoUrl } = data;

    let mars = await prisma.mars.findFirst();

    if (mars) {
      // Update
      mars = await prisma.mars.update({
        where: { id: mars.id },
        data: { title, videoUrl, content, photoUrl },
      });
    } else {
      // Create
      mars = await prisma.mars.create({
        data: { title, videoUrl, content, photoUrl },
      });
    }

    return NextResponse.json(mars);
  } catch (error) {
    console.error('Error saving mars:', error);
    return NextResponse.json({ error: 'Gagal menyimpan data' }, { status: 500 });
  }
}
