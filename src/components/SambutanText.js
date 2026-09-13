// Teks sambutan: di HP dipadatkan 6 baris + tombol menuju halaman
// sambutan lengkap; di desktop tampil penuh seperti biasa.
import Link from 'next/link';

export default function SambutanText({ html }) {
  return (
    <div className="sambutan-text-wrap">
      <div
        className="rich-text-content sambutan-clamp"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <Link
        href="/tentang-kami/sambutan-kepala-sekolah"
        className="sambutan-more-btn"
      >
        Lihat Selengkapnya ▼
      </Link>
      <style>{`
        .sambutan-more-btn { display: none; }
        @media (max-width: 768px) {
          .sambutan-text-wrap { max-width: 100%; overflow: hidden; }
          .sambutan-clamp {
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
            text-decoration: none;
          }
        }
      `}</style>
    </div>
  );
}
