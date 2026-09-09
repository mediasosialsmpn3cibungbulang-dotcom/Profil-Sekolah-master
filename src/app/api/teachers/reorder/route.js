import { isAuthenticated } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// Menyimpan urutan guru hasil drag-and-drop dari halaman admin.
// Body: { ids: ["uuid-1", "uuid-2", ...] } dari atas ke bawah.
export async function PUT(request) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { ids } = await request.json();
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    await prisma.$transaction(
      ids.map((id, index) =>
        prisma.teacher.update({
          where: { id },
          data: { sortOrder: index + 1 },
        })
      )
    );

    return NextResponse.json({ success: true, message: 'Urutan guru berhasil disimpan' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save order' }, { status: 500 });
  }
}
