import { isAuthenticated } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const sambutan = await prisma.sambutan.findFirst();
    return NextResponse.json(sambutan || {});
  } catch (error) {
    console.error("Error fetching sambutan:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  if (!await isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const data = await request.json();
    
    // Check if a record already exists
    const existing = await prisma.sambutan.findFirst();
    
    if (existing) {
      // Update existing
      const updated = await prisma.sambutan.update({
        where: { id: existing.id },
        data: {
          title: data.title,
          content: data.content,
          photoUrl: data.photoUrl
        }
      });
      return NextResponse.json(updated);
    } else {
      // Create new
      const created = await prisma.sambutan.create({
        data: {
          title: data.title,
          content: data.content,
          photoUrl: data.photoUrl
        }
      });
      return NextResponse.json(created, { status: 201 });
    }
  } catch (error) {
    console.error("Error saving sambutan:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
