import { isAuthenticated } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export const dynamic = 'force-dynamic';
import { cookies } from 'next/headers';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category'); // GURU | PEGAWAI | null = semua
    const where = category === 'GURU' || category === 'PEGAWAI' ? { category } : {};
    const teachers = await prisma.teacher.findMany({
      where,
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }]
    });
    return NextResponse.json(teachers);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch teachers' }, { status: 500 });
  }
}

export async function POST(request) {
  if (!await isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    

    const { name, subject, photoUrl, description, education, experience, additionalRole, category, instagram, tiktok, email } = await request.json();
    // Guru baru selalu di urutan paling bawah
    const last = await prisma.teacher.findFirst({ orderBy: { sortOrder: 'desc' } });
    const newTeacher = await prisma.teacher.create({
      data: { name, subject, photoUrl, description, education, experience, additionalRole, category: category === 'PEGAWAI' ? 'PEGAWAI' : 'GURU', instagram: instagram || null, tiktok: tiktok || null, email: email || null, sortOrder: (last?.sortOrder ?? 0) + 1 }
    });
    return NextResponse.json(newTeacher);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create teacher' }, { status: 500 });
  }
}
