import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';

export const dynamic = 'force-dynamic';



export async function GET() {
  try {
    const kurikulum = await prisma.kurikulum.findFirst();
    return NextResponse.json(kurikulum || {});
  } catch (error) {
    console.error("Error fetching Kurikulum:", error);
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

    let kurikulum = await prisma.kurikulum.findFirst();

    if (kurikulum) {
      kurikulum = await prisma.kurikulum.update({
        where: { id: kurikulum.id },
        data: { title, content, photoUrl },
      });
    } else {
      kurikulum = await prisma.kurikulum.create({
        data: { title, content, photoUrl },
      });
    }

    return NextResponse.json(kurikulum, { status: 200 });
  } catch (error) {
    console.error("Error updating Kurikulum:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
