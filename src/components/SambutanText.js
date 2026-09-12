'use client';

import { useState } from 'react';

// Teks sambutan: di HP dipadatkan + tombol Lihat Selengkapnya,
// di desktop tampil penuh seperti biasa.
export default function SambutanText({ html }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="sambutan-text-wrap">
      <div
        className={`rich-text-content sambutan-clamp${open ? ' open' : ''}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <button
        type="button"
        className="sambutan-more-btn"
        onClick={() => setOpen(!open)}
      >
        {open ? 'Tutup ▲' : 'Lihat Selengkapnya ▼'}
      </button>
      <style>{`
        .sambutan-more-btn { display: none; }
        @media (max-width: 768px) {
          .sambutan-text-wrap { max-width: 100%; overflow: hidden; }
          .sambutan-clamp:not(.open) {
            display: -webkit-box;
            -webkit-line-clamp: 6;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .sambutan-more-btn {
            display: inline-block;
            margin-top: 12px;
            padding: 8px 24px;
            color: #2589ff;
            background: none;
            border: 1px solid #2589ff;
            border-radius: 50px;
            font-weight: bold;
            font-size: 0.9rem;
            cursor: pointer;
          }
        }
      `}</style>
    </div>
  );
}
