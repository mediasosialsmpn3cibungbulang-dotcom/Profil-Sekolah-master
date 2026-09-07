'use client';

import { useRef } from 'react';
import Link from 'next/link';

export default function NewsSlider({ posts }) {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 400; // amount to scroll per click
      sliderRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  if (posts.length === 0) {
    return <p style={{ textAlign: 'center', color: '#64748b' }}>Belum ada pengumuman.</p>;
  }

  return (
    <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto', padding: '0 60px' }}>
      
      {/* Left Arrow */}
      <button 
        onClick={() => scroll('left')}
        style={{
          position: 'absolute', left: '0', top: '50%', transform: 'translateY(-50%)', zIndex: 2,
          width: '50px', height: '50px', borderRadius: '50%', background: '#ff6b35', color: 'white', 
          border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.5rem', flexShrink: 0, boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}
        aria-label="Scroll left"
      >
        ←
      </button>

      {/* Slider Container */}
      <div 
        ref={sliderRef}
        style={{
          display: 'flex',
          overflowX: 'auto',
          gap: '30px',
          padding: '20px 0',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none', /* Firefox */
          msOverflowStyle: 'none', /* IE/Edge */
          width: '100%'
        }}
        className="hide-scrollbar"
      >
        {posts.map(post => (
          <div key={post.id} className="slider-card" style={{
            background: '#f1f5f9',
            borderRadius: '16px',
            scrollSnapAlign: 'start',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
          }}>
            <div style={{ padding: '30px', flex: 1 }}>
              <h3 style={{ fontSize: '1.3rem', color: '#0f3a54', marginBottom: '15px', lineHeight: '1.4' }}>
                {post.title}
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6' }}>
                {(() => {
                  const plainText = post.content.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').trim();
                  return plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText;
                })()}
              </p>
            </div>
            
            {/* White Bottom Bar */}
            <div style={{ background: 'white', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link href={`/berita/${post.id}`} style={{
                background: '#ffb703',
                color: '#1e293b',
                padding: '10px 25px',
                borderRadius: '30px',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                textDecoration: 'none'
              }}>
                Selengkapnya
              </Link>
              
              <div style={{ color: '#2185ff', fontSize: '4rem', lineHeight: '0.5', fontFamily: 'Georgia, serif', fontWeight: 'bold' }}>
                ”
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button 
        onClick={() => scroll('right')}
        style={{
          position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)', zIndex: 2,
          width: '50px', height: '50px', borderRadius: '50%', background: '#ff6b35', color: 'white', 
          border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.5rem', flexShrink: 0, boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}
        aria-label="Scroll right"
      >
        →
      </button>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .slider-card {
          flex: 0 0 calc(50% - 15px);
        }
        @media (max-width: 768px) {
          .slider-card {
            flex: 0 0 100%;
          }
        }
      `}</style>
    </div>
  );
}
