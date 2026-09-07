import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('admin_session');
    
    if (!token) {
      // Redirect to login if no session cookie
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'default_secret_key');
      await jwtVerify(token.value, secret);
    } catch (error) {
      // Redirect to login if token is invalid or expired
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      const response = NextResponse.redirect(url);
      response.cookies.delete('admin_session');
      return response;
    }
  }

  // Redirect root /admin and /admin/dashboard to /admin/posts to prevent 404
  if (pathname === '/admin' || pathname === '/admin/dashboard') {
    return NextResponse.redirect(new URL('/admin/posts', request.url));
  }

  // Pass-through
  return NextResponse.next();
}

// Ensure proxy only runs on necessary paths to save execution time
export const config = {
  matcher: ['/admin/:path*'],
};
