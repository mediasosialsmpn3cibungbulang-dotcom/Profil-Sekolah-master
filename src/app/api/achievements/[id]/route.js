import { isAuthenticated } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

import { unlink } from 'fs/promises';
import path from 'path';

export async function PUT(request, { params }) {
  if (!await isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { id } = await params;
    const { title, category, studentName, level, imageUrl, description, date } = await request.json();
    const updated = await prisma.achievement.update({
      where: { id },
      data: { 
        title, 
        category, 
        studentName, 
        level, 
        imageUrl, 
        description,
        date: date ? new Date(date) : null
      }
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update achievement' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  if (!await isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { id } = await params;
    
    // Find the record first to get the image URL
    const record = await prisma.achievement.findUnique({ where: { id } });
    if (record && record.imageUrl) {
      try {
        const filepath = path.join(process.cwd(), 'public', record.imageUrl);
        await unlink(filepath);
      } catch (err) {
        console.error('Failed to delete image file:', err);
      }
    }

    await prisma.achievement.delete({
      where: { id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete achievement' }, { status: 500 });
  }
}
