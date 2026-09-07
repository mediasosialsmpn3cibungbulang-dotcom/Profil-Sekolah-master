import { isAuthenticated } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const sliders = await prisma.slider.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(sliders);
  } catch (error) {
    console.error("Error fetching sliders:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  if (!await isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const data = await request.json();
    const newSlider = await prisma.slider.create({
      data: {
        imageUrl: data.imageUrl,
        caption: data.caption,
        isActive: data.isActive !== undefined ? data.isActive : true,
        order: data.order !== undefined ? parseInt(data.order) : 0,
      }
    });
    return NextResponse.json(newSlider, { status: 201 });
  } catch (error) {
    console.error("Error creating slider:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
