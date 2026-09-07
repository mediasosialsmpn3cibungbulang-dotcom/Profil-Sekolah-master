import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';
import { unlink } from 'fs/promises';
import path from 'path';

export async function PUT(request, { params }) {
  if (!await isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { id } = await params;
    const { title, description, pembina, jadwal, photoUrl } = await request.json();
    
    const updatedEkskul = await prisma.ekskul.update({
      where: { id },
      data: { title, description, pembina, jadwal, photoUrl }
    });
    
    return NextResponse.json(updatedEkskul);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update ekskul' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  if (!await isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { id } = await params;
    
    // Find the record first to get the image URL
    const record = await prisma.ekskul.findUnique({ where: { id } });
    if (record && record.photoUrl) {
      try {
        const filepath = path.join(process.cwd(), 'public', record.photoUrl);
        await unlink(filepath);
      } catch (err) {
        console.error('Failed to delete image file:', err);
      }
    }

    await prisma.ekskul.delete({
      where: { id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete ekskul' }, { status: 500 });
  }
}
