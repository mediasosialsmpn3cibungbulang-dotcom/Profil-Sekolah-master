import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export const revalidate = 60; // Disable cache for demo purposes

export default async function BeritaDetail({ params }) {
  const { id } = await params;

  // Fetch the post from DB
  const post = await prisma.post.findUnique({
    where: { id: id }
  });

  if (!post) {
    notFound();
  }

  // Format date
  const dateFormatted = new Date(post.createdAt).toLocaleString('id-ID', {
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  // No longer splitting by newline, we expect HTML content from Quill

  return (
    <main style={{ paddingBottom: '0', background: '#fafafa' }}>
      {/* Banner / Hero Section */}
      <section style={{ 
        position: 'relative', 
        height: '250px', 
        background: 'linear-gradient(rgba(37, 99, 235, 0.85), rgba(30, 64, 175, 0.9)), url("/images/slide1.png") center/cover',
        display: 'flex',
        alignItems: 'center',
        padding: '0 5%',
        borderBottom: '4px solid #ffb703'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: '2' }}>
          <h1 style={{ color: 'white', fontSize: '2.5rem', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            Berita dan Kegiatan Sekolah
          </h1>
        </div>
        {/* Decorative elements to mimic the patterned banner from the screenshot */}
        <div style={{ position: 'absolute', right: '10%', top: '20%', opacity: 0.2 }}>
          <svg width="120" height="120" viewBox="0 0 100 100"><rect x="10" y="10" width="40" height="40" fill="white" transform="rotate(45 30 30)"/><rect x="50" y="10" width="40" height="40" fill="#ffb703" transform="rotate(45 70 30)"/></svg>
        </div>
      </section>

      {/* Main Content Container */}
      <section className="container" style={{ padding: '60px 0 100px 0' }}>
        <div style={{ background: 'white', padding: '50px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          
          <h2 style={{ fontSize: '1.2rem', color: '#64748b', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Berita & Kegiatan Sekolah
          </h2>
          <h1 style={{ fontSize: '2.2rem', color: '#1e3a8a', marginBottom: '20px', lineHeight: '1.3' }}>
            {post.title}
          </h1>
          
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '40px', borderBottom: '1px solid #e2e8f0', paddingBottom: '20px' }}>
            {post.title}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '50px' }}>
            
            {/* Text Content - Left */}
            <div 
              className="rich-text-content"
              style={{ flex: '1', minWidth: '300px', color: '#475569', lineHeight: '1.8', fontSize: '1.05rem' }}
              dangerouslySetInnerHTML={{ __html: post.content ? post.content.replace(/&nbsp;|\u00A0/g, ' ') : '' }}
            />


            {/* Image Content - Right */}
            <div style={{ flex: '0 0 350px' }}>
              <div style={{ 
                border: '8px solid #f1f5f9', 
                padding: '4px', 
                background: 'white',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
              }}>
                <Image className="zoomable-image" 
                  src={post.imageUrl || '/images/slide1.png'} 
                  alt={post.title} 
                  width={800} height={600}
                  style={{ width: '100%', height: 'auto', display: 'block', aspectRatio: '3/4', objectFit: 'cover' }}
                />
              </div>
            </div>
            
          </div>

          {/* Footer Metadata */}
          <div style={{ 
            marginTop: '60px', 
            borderTop: '1px solid #e2e8f0', 
            paddingTop: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <div style={{ fontWeight: 'bold', color: '#0f172a' }}>Oleh Administrator</div>
            <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Diunggah : {dateFormatted}</div>
          </div>

        </div>
      </section>
    </main>
  );
}
