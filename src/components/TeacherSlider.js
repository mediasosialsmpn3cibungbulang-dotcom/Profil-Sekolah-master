'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import TeacherProfileModal from '@/components/TeacherProfileModal';

// Slider Guru & Tenaga Pendidik ala SMAKBO:
// - Tanpa tombol "More", semua data bisa di-slide kanan/kiri
// - UI kartu (guru-card) tidak diubah sama sekali
// - Ada dots pagination + auto slide tiap beberapa detik
export default function TeacherSlider({ teachers = [], autoPlayInterval = 3000 }) {
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [selected, setSelected] = useState(null); // guru yang dibuka di popup
  const pausedRef = useRef(false);
  const dragRef = useRef({ active: false, startX: 0, startScroll: 0, moved: false });
  const justDragged = useRef(false);

  const setPaused = (val) => {
    pausedRef.current = val;
    setIsPaused(val);
  };

  const getStep = useCallback(() => {
    const el = sliderRef.current;
    if (!el || !el.firstChild) return 300;
    const card = el.firstChild;
    const gap = 30; // sama dengan gap container
    return card.getBoundingClientRect().width + gap;
  }, []);

  const scrollToIndex = useCallback((index) => {
    const el = sliderRef.current;
    if (!el) return;
    const step = getStep();
    const maxScroll = el.scrollWidth - el.clientWidth;
    let target = index * step;
    if (target > maxScroll) target = maxScroll;
    if (target < 0) target = 0;
    el.scrollTo({ left: target, behavior: 'smooth' });
    setActiveIndex(index);
  }, [getStep]);

  const scroll = (direction) => {
    const el = sliderRef.current;
    if (!el) return;
    const step = getStep();
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (direction === 'left') {
      if (el.scrollLeft <= 10) {
        // loop ke paling kanan biar muter terus
        el.scrollTo({ left: maxScroll, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: -step, behavior: 'smooth' });
      }
    } else {
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
        // sudah mentok kanan -> balik ke awal
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: step, behavior: 'smooth' });
      }
    }
    // reset timer auto slide setelah interaksi manual
    setPaused(true);
    setTimeout(() => setPaused(false), 5000);
  };

  const handleScroll = () => {
    const el = sliderRef.current;
    if (!el) return;
    const step = getStep();
    if (step === 0) return;
    const index = Math.round(el.scrollLeft / step);
    const clamped = Math.max(0, Math.min(index, teachers.length - 1));
    setActiveIndex((prev) => (prev === clamped ? prev : clamped));
  };

  // Drag pakai mouse: tahan-klik lalu seret kanan/kiri (cepat, bisa loncat banyak kartu).
  // Di HP/tablet tetap pakai swipe bawaan browser (tidak diganggu).
  // PENTING: pointer capture HANYA dipasang setelah terbukti menyeret,
  // supaya klik biasa tetap mendarat di kartu dan popup bisa terbuka.
  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    const el = sliderRef.current;
    if (!el) return;
    dragRef.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false, captured: false };
    setDragging(true);
    setPaused(true);
    window.addEventListener('pointerup', endDrag);
    window.addEventListener('pointercancel', endDrag);
  };

  const onPointerMove = (e) => {
    const d = dragRef.current;
    if (!d.active) return;
    const el = sliderRef.current;
    if (!el) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 8) {
      d.moved = true;
      if (!d.captured) {
        d.captured = true;
        try { e.currentTarget.setPointerCapture(e.pointerId); } catch (err) { /* abaikan */ }
      }
    }
    if (d.moved) el.scrollLeft = d.startScroll - dx;
  };

  const endDrag = () => {
    const d = dragRef.current;
    if (!d.active) return;
    d.active = false;
    setDragging(false);
    window.removeEventListener('pointerup', endDrag);
    window.removeEventListener('pointercancel', endDrag);
    if (d.moved) justDragged.current = true; // supaya lepas-drag tidak membuka popup
    setTimeout(() => setPaused(false), 2000);
  };

  // Kalau habis drag (bukan klik), batalkan navigasi ke halaman detail guru
  const onClickCapture = (e) => {
    if (justDragged.current) {
      justDragged.current = false;
      e.preventDefault();
      e.stopPropagation();
    }
  };

  // Popup terbuka: pause auto slide slider
  const closeModal = useCallback(() => setSelected(null), []);

  useEffect(() => {
    if (!selected) return;
    setPaused(true);
    return () => {
      setPaused(false);
    };
  }, [selected]);

  // Auto slide setiap `autoPlayInterval` ms, pause saat hover/sentuh
  useEffect(() => {
    if (!teachers || teachers.length <= 1) return;
    const timer = setInterval(() => {
      if (pausedRef.current) return;
      const el = sliderRef.current;
      if (!el) return;
      const step = getStep();
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else if (maxScroll <= 0) {
        return;
      } else {
        el.scrollBy({ left: step, behavior: 'smooth' });
      }
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [teachers.length, autoPlayInterval, getStep]);

  if (!teachers || teachers.length === 0) {
    return <p style={{ textAlign: 'center', color: '#64748b' }}>Belum ada data guru.</p>;
  }

  const arrowStyle = (pos) => ({
    position: 'absolute',
    [pos]: '0',
    top: '40%',
    transform: 'translateY(-50%)',
    zIndex: 2,
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    background: 'white',
    color: '#1e293b',
    border: '1px solid #e2e8f0',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '10px' }}>
      <div
        style={{ position: 'relative', padding: '0 54px' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setTimeout(() => setPaused(false), 3000)}
      >
        {/* Panah kiri */}
        <button onClick={() => scroll('left')} style={arrowStyle('left')} aria-label="Geser kiri">
          ❮
        </button>

        {/* Track slider */}
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={onClickCapture}
          className="hide-scrollbar teacher-track"
          style={{
            display: 'flex',
            overflowX: 'auto',
            gap: '30px',
            padding: '20px 4px 10px 4px',
            scrollSnapType: dragging ? 'none' : 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            width: '100%',
            WebkitOverflowScrolling: 'touch',
            cursor: dragging ? 'grabbing' : 'grab',
            userSelect: dragging ? 'none' : 'auto',
          }}
        >
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              role="button"
              tabIndex={0}
              onClick={() => setSelected(teacher)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setSelected(teacher);
              }}
              className="guru-card teacher-slide"
              style={{ scrollSnapAlign: 'start' }}
              title={`Lihat profil ${teacher.name}`}
            >
              <Image
                src={teacher.photoUrl || '/images/guru1.png'}
                alt={teacher.name}
                className="guru-image zoomable-image"
                width={300}
                height={300}
                draggable={false}
              />
              <div className="guru-name-tag">{teacher.name}</div>
            </div>
          ))}
        </div>

        {/* Panah kanan */}
        <button onClick={() => scroll('right')} style={arrowStyle('right')} aria-label="Geser kanan">
          ❯
        </button>
      </div>

      {/* Dots pagination ala SMAKBO */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          marginTop: '18px',
          marginBottom: '60px',
          padding: '0 20px',
        }}
      >
        {teachers.map((t, index) => (
          <button
            key={t.id}
            onClick={() => scrollToIndex(index)}
            aria-label={`Ke guru ${index + 1}`}
            style={{
              width: '9px',
              height: '9px',
              borderRadius: '50%',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              background: index === activeIndex ? '#2589ff' : '#cbd5e1',
              transition: 'background 0.3s ease, transform 0.3s ease',
              transform: index === activeIndex ? 'scale(1.25)' : 'scale(1)',
            }}
          />
        ))}
      </div>

      {/* Popup profil guru (komponen bersama dengan halaman SDM) */}
      <TeacherProfileModal teacher={selected} onClose={closeModal} />
      <style>{`
        .teacher-track::-webkit-scrollbar {
          display: none;
        }
        .teacher-track {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .teacher-slide {
          flex: 0 0 calc(25% - 22.5px);
          max-width: calc(25% - 22.5px);
        }
        .teacher-slide img {
          -webkit-user-drag: none;
          pointer-events: none;
        }
        @media (max-width: 1024px) {
          .teacher-slide {
            flex: 0 0 calc(33.333% - 20px);
            max-width: calc(33.333% - 20px);
          }
        }
        @media (max-width: 768px) {
          .teacher-slide {
            flex: 0 0 calc(50% - 15px);
            max-width: calc(50% - 15px);
          }
        }
        @media (max-width: 480px) {
          .teacher-slide {
            flex: 0 0 100%;
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
