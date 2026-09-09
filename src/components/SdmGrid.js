'use client';

import { useState } from 'react';
import TeacherProfileModal from '@/components/TeacherProfileModal';

// Grid Guru & Pegawai di halaman Sumber Daya Manusia.
// UI kartu sama persis seperti sebelumnya, hanya saja klik kartu
// membuka popup profil (foto kiri + info kanan), bukan pindah halaman.
// CATATAN: <img> di sini SENGAJA tanpa class "zoomable-image" supaya
// lightbox global tidak ikut terbuka dan hanya popup yang muncul.
export default function SdmGrid({ teachers = [] }) {
  const [selected, setSelected] = useState(null);

  if (teachers.length === 0) {
    return (
      <p style={{ textAlign: 'center', color: '#64748b', gridColumn: '1 / -1' }}>
        Belum ada data guru.
      </p>
    );
  }

  return (
    <>
      <div
        className="content-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '30px',
        }}
      >
        {teachers.map((teacher) => (
          <div
            role="button"
            tabIndex={0}
            onClick={() => setSelected(teacher)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setSelected(teacher);
            }}
            className="guru-card sdm-grid-card"
            key={teacher.id}
            title={`Lihat profil ${teacher.name}`}
          >
            <img
              src={teacher.photoUrl || '/images/guru1.png'}
              alt={teacher.name}
              className="guru-image"
              draggable={false}
            />
            <div className="guru-name-tag">{teacher.name}</div>
          </div>
        ))}
      </div>

      <TeacherProfileModal teacher={selected} onClose={() => setSelected(null)} />

      <style>{`
        .sdm-grid-card img {
          -webkit-user-drag: none;
          pointer-events: none;
        }
      `}</style>
    </>
  );
}
