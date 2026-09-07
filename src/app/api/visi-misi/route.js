import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// Middleware untuk memverifikasi autentikasi admin


export async function GET() {
  try {
    let visimisi = await prisma.visiMisi.findFirst();
    if (!visimisi) {
      visimisi = { 
        visi: "Visi SMP Negeri 3 Cibungbulang",
        misi: "Misi 1\nMisi 2\nMisi 3",
        photoUrl: "" 
      };
    }
    return NextResponse.json(visimisi);
  } catch (error) {
    console.error('Error fetching visi-misi:', error);
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}

export async function POST(request) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { visi, misi, photoUrl } = data;

    let visimisi = await prisma.visiMisi.findFirst();

    if (visimisi) {
      // Update
      visimisi = await prisma.visiMisi.update({
        where: { id: visimisi.id },
        data: { visi, misi, photoUrl },
      });
    } else {
      // Create
      visimisi = await prisma.visiMisi.create({
        data: { visi, misi, photoUrl },
      });
    }

    return NextResponse.json(visimisi);
  } catch (error) {
    console.error('Error saving visi-misi:', error);
    return NextResponse.json({ error: 'Gagal menyimpan data' }, { status: 500 });
  }
}
