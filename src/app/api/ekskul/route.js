import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const ekskuls = await prisma.ekskul.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(ekskuls);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch ekskul' }, { status: 500 });
  }
}

export async function POST(request) {
  if (!await isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { title, description, pembina, jadwal, photoUrl } = await request.json();
    const newEkskul = await prisma.ekskul.create({
      data: { title, description, pembina, jadwal, photoUrl }
    });
    return NextResponse.json(newEkskul);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create ekskul' }, { status: 500 });
  }
}
