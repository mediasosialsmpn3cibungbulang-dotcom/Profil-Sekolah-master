import { isAuthenticated } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { unlink } from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const data = await request.json();
    const updatedSlider = await prisma.slider.update({
      where: { id },
      data: {
        imageUrl: data.imageUrl,
        caption: data.caption,
        isActive: data.isActive,
        order: data.order !== undefined ? parseInt(data.order) : undefined,
      }
    });
    return NextResponse.json(updatedSlider);
  } catch (error) {
    console.error("Error updating slider:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  if (!await isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  try {
    const { id } = await params;
    const record = await prisma.slider.findUnique({ where: { id } });
    if (record && record.imageUrl) {
      try {
        const filepath = path.join(process.cwd(), 'public', record.imageUrl);
        await unlink(filepath);
      } catch (err) {
        console.error('Failed to delete image file:', err);
      }
    }

    await prisma.slider.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Slider deleted successfully' });
  } catch (error) {
    console.error("Error deleting slider:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
