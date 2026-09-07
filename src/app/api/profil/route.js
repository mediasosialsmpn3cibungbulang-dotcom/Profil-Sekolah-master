import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// Middleware untuk memverifikasi autentikasi admin


export async function GET() {
  try {
    let profil = await prisma.profil.findFirst();
    if (!profil) {
      profil = { 
        title: "Profil Sekolah",
        schoolName: "SMP NEGERI 3 CIBUNGBULANG",
        status: "TERAKREDITASI A (UNGGUL)",
        tahunBerdiri: "2005",
        branding: "SEKOLAH RAMAH ANAK",
        waktuBelajar: "5 HARI (SENIN - JUMAT)",
        kurikulum: "MERDEKA",
        kemitraan: "DALAM NEGERI",
        jumlahRombel: "24 ROMBEL",
        programUnggulan: "TAHFIDZ",
        kepalaSekolah: "KEPALA SEKOLAH, S.PD.",
        photoUrl: "" 
      };
    }
    return NextResponse.json(profil);
  } catch (error) {
    console.error('Error fetching profil:', error);
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}

export async function POST(request) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { 
      title, schoolName, status, tahunBerdiri, branding, 
      waktuBelajar, kurikulum, kemitraan, jumlahRombel, 
      programUnggulan, kepalaSekolah, photoUrl 
    } = data;

    let profil = await prisma.profil.findFirst();

    if (profil) {
      // Update
      profil = await prisma.profil.update({
        where: { id: profil.id },
        data: { 
          title, schoolName, status, tahunBerdiri, branding, 
          waktuBelajar, kurikulum, kemitraan, jumlahRombel, 
          programUnggulan, kepalaSekolah, photoUrl 
        },
      });
    } else {
      // Create
      profil = await prisma.profil.create({
        data: { 
          title, schoolName, status, tahunBerdiri, branding, 
          waktuBelajar, kurikulum, kemitraan, jumlahRombel, 
          programUnggulan, kepalaSekolah, photoUrl 
        },
      });
    }

    return NextResponse.json(profil);
  } catch (error) {
    console.error('Error saving profil:', error);
    return NextResponse.json({ error: 'Gagal menyimpan data' }, { status: 500 });
  }
}
