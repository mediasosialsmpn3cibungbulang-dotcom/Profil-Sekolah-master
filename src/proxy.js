import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Protect all /operator-8da0c2 routes except /operator-8da0c2/login
  if (pathname.startsWith('/operator-8da0c2') && pathname !== '/operator-8da0c2/login') {
    const token = request.cookies.get('operator_8da0c2_session');
    
    if (!token) {
      // Redirect to login if no session cookie
      const url = request.nextUrl.clone();
      url.pathname = '/operator-8da0c2/login';
      return NextResponse.redirect(url);
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'default_secret_key');
      await jwtVerify(token.value, secret);
    } catch (error) {
      // Redirect to login if token is invalid or expired
      const url = request.nextUrl.clone();
      url.pathname = '/operator-8da0c2/login';
      const response = NextResponse.redirect(url);
      response.cookies.delete('operator_8da0c2_session');
      return response;
    }
  }

  // Redirect root /operator-8da0c2 and /operator-8da0c2/dashboard to /operator-8da0c2/posts to prevent 404
  if (pathname === '/operator-8da0c2' || pathname === '/operator-8da0c2/dashboard') {
    return NextResponse.redirect(new URL('/operator-8da0c2/posts', request.url));
  }

  // Pass-through, tapi untuk API: larang cache (no-store) agar
  // browser/edge tidak menyajikan list lama setelah admin menyimpan data.
  // Tanpa ini, daftar baru & gambar baru kadang baru muncul setelah refresh manual.
  // Kecualikan /api/uploads: ia mengatur cache-nya sendiri
  // (immutable untuk gambar ada, no-store untuk 404).
  if (pathname.startsWith('/api/') && !pathname.startsWith('/api/uploads/')) {
    const response = NextResponse.next();
    response.headers.set('Cache-Control', 'no-store, must-revalidate');
    return response;
  }

  // Pass-through
  return NextResponse.next();
}

// Ensure proxy only runs on necessary paths to save execution time
export const config = {
  matcher: ['/operator-8da0c2/:path*', '/api/:path*'],
};
