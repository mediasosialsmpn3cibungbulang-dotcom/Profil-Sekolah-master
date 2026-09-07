import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';

export const dynamic = 'force-dynamic';



export async function GET() {
  try {
    const kepsek = await prisma.kepalaSekolah.findFirst();
    return NextResponse.json(kepsek || {});
  } catch (error) {
    console.error("Error fetching Kepala Sekolah:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { title, content, nama, pendidikan, karir, photoUrl } = data;

    let kepsek = await prisma.kepalaSekolah.findFirst();

    if (kepsek) {
      kepsek = await prisma.kepalaSekolah.update({
        where: { id: kepsek.id },
        data: { title, content, nama, pendidikan, karir, photoUrl },
      });
    } else {
      kepsek = await prisma.kepalaSekolah.create({
        data: { title, content, nama, pendidikan, karir, photoUrl },
      });
    }

    return NextResponse.json(kepsek, { status: 200 });
  } catch (error) {
    console.error("Error updating Kepala Sekolah:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
