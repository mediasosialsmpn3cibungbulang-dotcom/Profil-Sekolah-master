import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';

export const dynamic = 'force-dynamic';



export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const sarana = await prisma.sarana.findUnique({
      where: { id },
    });
    if (!sarana) {
      return NextResponse.json({ error: 'Sarana not found' }, { status: 404 });
    }
    return NextResponse.json(sarana);
  } catch (error) {
    console.error("Error fetching Sarana:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const data = await request.json();
    const { title, content, photoUrl } = data;

    const sarana = await prisma.sarana.update({
      where: { id },
      data: { title, content, photoUrl },
    });

    return NextResponse.json(sarana, { status: 200 });
  } catch (error) {
    console.error("Error updating Sarana:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    await prisma.sarana.delete({
      where: { id },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting Sarana:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
