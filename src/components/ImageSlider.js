"use client";
import { useState, useEffect } from 'react';

const defaultSlides = [
  { id: 1, src: '/images/slide1.png', caption: 'Fasilitas Sekolah yang Modern dan Nyaman' },
  { id: 2, src: '/images/slide2.png', caption: 'Kegiatan Belajar Mengajar yang Interaktif' },
  { id: 3, src: '/images/slide3.png', caption: 'Mendukung Pengembangan Minat dan Bakat Siswa' },
];

export default function ImageSlider({ sliders }) {
  const [current, setCurrent] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use dynamic sliders if available, otherwise fallback to default
  const activeSlides = sliders && sliders.length > 0 
    ? sliders.map(s => ({ id: s.id, src: s.imageUrl, caption: s.caption }))
    : defaultSlides;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === activeSlides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [activeSlides.length]);

  return (
    <div className="slider-container" style={{ position: 'relative', width: '100%', height: '500px', overflow: 'hidden', borderRadius: '16px', marginTop: '30px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
      {activeSlides.map((slide, index) => (
        <div 
          key={slide.id}
          onClick={() => setIsModalOpen(true)}
          title="Klik untuk memperbesar gambar"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: index === current ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
            backgroundImage: `url(${slide.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            cursor: 'zoom-in'
          }}
        >
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(15, 23, 42, 0.7)', padding: '20px', color: 'white', textAlign: 'center' }}>
            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600 }}>{slide.caption}</h2>
          </div>
        </div>
      ))}
      <button 
        onClick={() => setCurrent(current === 0 ? activeSlides.length - 1 : current - 1)}
        style={{ position: 'absolute', top: '50%', left: '20px', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.3)', border: 'none', color: 'white', fontSize: '2rem', cursor: 'pointer', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        ❮
      </button>
      <button 
        onClick={() => setCurrent(current === activeSlides.length - 1 ? 0 : current + 1)}
        style={{ position: 'absolute', top: '50%', right: '20px', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.3)', border: 'none', color: 'white', fontSize: '2rem', cursor: 'pointer', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        ❯
      </button>
      <div style={{ position: 'absolute', bottom: '80px', left: '0', right: '0', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        {activeSlides.map((_, index) => (
          <div 
            key={index} 
            onClick={() => setCurrent(index)}
            style={{ width: '12px', height: '12px', borderRadius: '50%', background: index === current ? 'white' : 'rgba(255,255,255,0.5)', cursor: 'pointer' }}
          />
        ))}
      </div>
      {/* Image Modal Overlay */}
      {isModalOpen && (
        <div 
          onClick={() => setIsModalOpen(false)}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.85)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            cursor: 'zoom-out',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes scaleIn {
              from { transform: scale(0.95); opacity: 0; }
              to { transform: scale(1); opacity: 1; }
            }
          `}</style>
          
          <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh', animation: 'scaleIn 0.2s ease-out' }}>
            <button 
              onClick={(e) => { e.stopPropagation(); setIsModalOpen(false); }}
              style={{
                position: 'absolute',
                top: '-40px',
                right: '0',
                background: 'transparent',
                border: 'none',
                color: 'white',
                fontSize: '35px',
                cursor: 'pointer',
                fontWeight: 'bold',
                padding: '0 10px',
                lineHeight: '1'
              }}
              title="Tutup"
            >
              &times;
            </button>
            <img 
              src={activeSlides[current].src} 
              alt={activeSlides[current].caption} 
              style={{
                maxWidth: '100%',
                maxHeight: '85vh',
                objectFit: 'contain',
                border: '4px solid white',
                borderRadius: '4px',
                backgroundColor: 'white',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.2)'
              }}
              onClick={(e) => e.stopPropagation()} 
            />
          </div>
        </div>
      )}
    </div>
  );
}
