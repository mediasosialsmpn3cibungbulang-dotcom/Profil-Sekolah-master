import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';

export const dynamic = 'force-dynamic';



export async function GET() {
  try {
    const struktur = await prisma.strukturOrganisasi.findFirst();
    return NextResponse.json(struktur || {});
  } catch (error) {
    console.error("Error fetching Struktur Organisasi:", error);
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

    let struktur = await prisma.strukturOrganisasi.findFirst();

    if (struktur) {
      struktur = await prisma.strukturOrganisasi.update({
        where: { id: struktur.id },
        data: { title, content, photoUrl },
      });
    } else {
      struktur = await prisma.strukturOrganisasi.create({
        data: { title, content, photoUrl },
      });
    }

    return NextResponse.json(struktur, { status: 200 });
  } catch (error) {
    console.error("Error updating Struktur Organisasi:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
