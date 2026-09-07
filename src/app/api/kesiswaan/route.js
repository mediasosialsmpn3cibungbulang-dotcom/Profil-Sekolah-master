import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';

export const dynamic = 'force-dynamic';



export async function GET() {
  try {
    const kesiswaan = await prisma.kesiswaan.findFirst();
    return NextResponse.json(kesiswaan || {});
  } catch (error) {
    console.error("Error fetching Kesiswaan:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { title, content, photoUrl } = data;

    let kesiswaan = await prisma.kesiswaan.findFirst();

    if (kesiswaan) {
      kesiswaan = await prisma.kesiswaan.update({
        where: { id: kesiswaan.id },
        data: { title, content, photoUrl },
      });
    } else {
      kesiswaan = await prisma.kesiswaan.create({
        data: { title, content, photoUrl },
      });
    }

    return NextResponse.json(kesiswaan, { status: 200 });
  } catch (error) {
    console.error("Error updating Kesiswaan:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
