import { isAuthenticated } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

import { unlink } from 'fs/promises';
import path from 'path';

export async function PUT(request, { params }) {
  if (!await isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { id } = await params;
    const { name, subject, photoUrl, description, education, experience, additionalRole } = await request.json();
    const updated = await prisma.teacher.update({
      where: { id },
      data: { name, subject, photoUrl, description, education, experience, additionalRole }
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update teacher' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  if (!await isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { id } = await params;
    
    // Find the record first to get the image URL
    const record = await prisma.teacher.findUnique({ where: { id } });
    if (record && record.photoUrl) {
      try {
        const filepath = path.join(process.cwd(), 'public', record.photoUrl);
        await unlink(filepath);
      } catch (err) {
        console.error('Failed to delete image file:', err);
      }
    }

    await prisma.teacher.delete({
      where: { id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete teacher' }, { status: 500 });
  }
}
