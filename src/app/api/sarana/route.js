import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';

export const dynamic = 'force-dynamic';



export async function GET() {
  try {
    const sarana = await prisma.sarana.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(sarana);
  } catch (error) {
    console.error("Error fetching Sarana:", error);
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

    const sarana = await prisma.sarana.create({
      data: { title, content, photoUrl },
    });

    return NextResponse.json(sarana, { status: 201 });
  } catch (error) {
    console.error("Error creating Sarana:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
