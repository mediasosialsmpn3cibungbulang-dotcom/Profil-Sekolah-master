import { isAuthenticated } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const achievements = await prisma.achievement.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(achievements);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch achievements' }, { status: 500 });
  }
}

export async function POST(request) {
  if (!await isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    

    const { title, category, studentName, level, imageUrl, description, date } = await request.json();
    const newAchievement = await prisma.achievement.create({
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
    return NextResponse.json(newAchievement);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create achievement' }, { status: 500 });
  }
}
