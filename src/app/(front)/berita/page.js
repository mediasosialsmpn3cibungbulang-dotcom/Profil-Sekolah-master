import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';

export const revalidate = 60;

export default async function Page() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main>
      {/* Jumbotron/Header Style */}
      <div style={{
        background: 'linear-gradient(rgba(0, 0, 0, .2), rgba(0, 0, 0, .2)), url(/images/slide1.png) center center no-repeat',
        backgroundSize: 'cover',
        height: '270px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <h1 style={{ color: 'white', fontSize: '3rem', textTransform: 'uppercase', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          Berita
        </h1>
      </div>

      <div className="container" style={{ paddingBottom: '80px', paddingTop: '60px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '40px'
        }}>
          {posts.length === 0 ? (
            <p style={{ color: '#64748b', gridColumn: '1 / -1', textAlign: 'center' }}>Belum ada berita atau kegiatan.</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} style={{ display: 'flex', flexDirection: 'column' }}>
                {/* Image Section */}
                <div style={{ 
                  width: '100%', 
                  height: '240px', 
                  border: '5px solid #ccc',
                  marginBottom: '20px',
                  overflow: 'hidden'
                }}>
                  <Image className="zoomable-image" 
                    src={post.imageUrl || '/images/slide1.png'} 
                    alt={post.title} 
                    width={400} 
                    height={300}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }} 
                  />
                </div>
                
                {/* Content Section */}
                <div>
                  <h3 style={{ 
                    fontSize: '1.4rem', 
                    color: '#0f3a54', 
                    marginBottom: '15px', 
                    lineHeight: '1.4',
                    fontWeight: '600'
                  }}>
                    {post.title}
                  </h3>
                  
                  <p style={{ 
                    color: '#777', 
                    fontSize: '0.95rem', 
                    lineHeight: '1.7', 
                    marginBottom: '20px',
                    textAlign: 'justify'
                  }}>
                    {(() => {
                      const plainText = post.content.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').trim();
                      return plainText.length > 180 ? plainText.substring(0, 180) + '...' : plainText;
                    })()}
                  </p>
                  
                  {/* Read More Button */}
                  <div style={{ marginBottom: '15px' }}>
                    <Link href={`/berita/${post.id}`} style={{
                      display: 'inline-block',
                      backgroundColor: '#ffc107', // Yellow color from reference
                      color: '#000',
                      padding: '8px 20px',
                      borderRadius: '20px',
                      fontSize: '0.95rem',
                      fontWeight: '600',
                      textDecoration: 'none'
                    }}>
                      Read More
                    </Link>
                  </div>
                  
                  {/* Meta (Author and Date) */}
                  <div>
                    <Link href="#" style={{ 
                      color: '#2185ff', 
                      textDecoration: 'none', 
                      fontSize: '0.9rem',
                      display: 'block',
                      marginBottom: '5px'
                    }}>
                      Oleh Administrator
                    </Link>
                    <span style={{ color: '#999', fontSize: '0.85rem' }}>
                      {new Intl.DateTimeFormat('id-ID', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      }).format(new Date(post.createdAt))}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
