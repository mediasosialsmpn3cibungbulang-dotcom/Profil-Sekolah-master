'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

// Popup profil guru/pegawai: foto full utuh di kiri, info di kanan.
// Dipakai di slider homepage DAN di halaman Sumber Daya Manusia.
// Data (name, subject, additionalRole, description, photoUrl) sudah
// tersedia dari query, jadi tidak perlu fetch lagi.
export default function TeacherProfileModal({ teacher, onClose }) {
  const [mounted, setMounted] = useState(false); // untuk portal (hindari error SSR)

  // Tandai sudah di client agar createPortal aman
  useEffect(() => {
    setMounted(true);
  }, []);

  // Popup terbuka: kunci scroll halaman, tutup pakai Escape
  useEffect(() => {
    if (!teacher) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [teacher, onClose]);

  return (
    <>
      {/* Popup di-portal ke <body> agar backdrop gelap SELAYAR penuh
          (tidak terjebak di dalam section animasi) */}
      {mounted && teacher && createPortal(
        <div className="teacher-modal-backdrop" onClick={onClose}>
          <div
            className="teacher-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`Profil ${teacher.name}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="teacher-modal-close"
              onClick={onClose}
              aria-label="Tutup"
            >
              ✕
            </button>
            <div className="teacher-modal-photo-wrap">
              <img
                src={teacher.photoUrl || '/images/guru1.png'}
                alt={teacher.name}
                className="teacher-modal-photo"
                draggable={false}
              />
            </div>
            <div className="teacher-modal-body">
              <h3 className="teacher-modal-name">{teacher.name}</h3>
              {teacher.subject && (
                <p className="teacher-modal-subject">{teacher.subject}</p>
              )}
              {teacher.additionalRole && (
                <p className="teacher-modal-role">
                  <strong>Jabatan Tambahan:</strong> {teacher.additionalRole}
                </p>
              )}
              {teacher.description && (
                <div
                  className="teacher-modal-bio rich-text-content"
                  dangerouslySetInnerHTML={{
                    __html: teacher.description.replace(/&nbsp;|\u00A0/g, ' '),
                  }}
                />
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
      <style>{`
        /* Popup detail guru: backdrop gelap selayar penuh seperti lightbox.
           Layout MENYAMPING: foto full utuh di kiri, info di kanan.
           Seluruh isi dipaksa muat 1 layar TANPA scroll. */
        .teacher-modal-backdrop {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.85);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
          overflow: hidden;
          animation: teacherModalFadeIn 0.2s ease-out;
        }
        .teacher-modal {
          position: relative;
          width: 100%;
          max-width: 880px;
          height: min(86vh, 640px);
          max-height: 92vh;
          display: flex;
          flex-direction: row;
          overflow: hidden;
          background: #ffffff;
          border: 4px solid #ffffff;
          border-radius: 6px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
          animation: teacherModalScaleIn 0.2s ease-out;
          margin: auto;
        }
        .teacher-modal-close {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.55);
          border: none;
          font-size: 1.1rem;
          line-height: 1;
          cursor: pointer;
          color: #ffffff;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }
        .teacher-modal-close:hover {
          background: #dc3545;
        }
        .teacher-modal-photo-wrap {
          flex: 0 0 42%;
          min-width: 0;
          min-height: 0;
          overflow: hidden;
          background: #ffffff;
        }
        .teacher-modal-photo {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center top;
          display: block;
        }
        .teacher-modal-body {
          flex: 1 1 auto;
          min-width: 0;
          overflow: hidden;
          padding: 30px 32px;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .teacher-modal-name {
          font-size: 1.4rem;
          color: #1e293b;
          margin: 0 0 6px 0;
          font-weight: 600;
        }
        .teacher-modal-subject {
          font-style: italic;
          color: #475569;
          margin: 0 0 12px 0;
          font-size: 1.05rem;
        }
        .teacher-modal-role {
          color: #475569;
          font-size: 0.92rem;
          margin: 0 0 12px 0;
        }
        .teacher-modal-bio {
          color: #475569;
          font-size: 0.92rem;
          line-height: 1.7;
          text-align: center;
          display: -webkit-box;
          -webkit-line-clamp: 12;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .teacher-modal-bio p {
          margin: 0 0 8px 0;
        }
        /* Layar kecil (HP): kembali menumpuk ke bawah */
        @media (max-width: 640px) {
          .teacher-modal {
            flex-direction: column;
            max-width: 420px;
            height: min(90vh, 720px);
          }
          .teacher-modal-photo-wrap {
            flex: 0 0 42%;
          }
          .teacher-modal-photo {
            object-fit: cover;
            object-position: top;
          }
          .teacher-modal-body {
            padding: 16px 20px;
          }
          .teacher-modal-name {
            font-size: 1.1rem;
          }
          .teacher-modal-bio {
            -webkit-line-clamp: 5;
          }
        }
        @keyframes teacherModalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes teacherModalScaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  );
}
