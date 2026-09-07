import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// In-memory simple rate limiter
const rateLimitMap = new Map();

export async function POST(request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    
    // Check rate limit: max 5 failed attempts per 15 minutes
    const limitInfo = rateLimitMap.get(ip) || { count: 0, lastAttempt: Date.now() };
    const timeSinceLastAttempt = Date.now() - limitInfo.lastAttempt;
    
    // Reset if more than 15 minutes have passed
    if (timeSinceLastAttempt > 15 * 60 * 1000) {
      limitInfo.count = 0;
    }
    
    if (limitInfo.count >= 5) {
      return NextResponse.json({ success: false, message: 'Terlalu banyak percobaan. Silakan coba lagi dalam 15 menit.' }, { status: 429 });
    }

    const { username, password } = await request.json();

    // Find admin user in database
    const admin = await prisma.admin.findUnique({
      where: { username }
    });

    if (!admin) {
      // Increment failed attempt
      limitInfo.count += 1;
      limitInfo.lastAttempt = Date.now();
      rateLimitMap.set(ip, limitInfo);
      return NextResponse.json({ success: false, message: 'Kredensial tidak valid' }, { status: 401 });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (isPasswordValid) {
      // Reset rate limit on success
      rateLimitMap.delete(ip);

      // Create JWT payload
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'default_secret_key');
      const alg = 'HS256';
      
      const jwt = await new SignJWT({ user: username, role: 'admin' })
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime('8h') // Expires in 8 hours
        .sign(secret);

      const response = NextResponse.json({ success: true, message: 'Login successful' }, { status: 200 });
      
      const isHttps = request.headers.get('x-forwarded-proto') === 'https';

      // Set HttpOnly cookie
      response.cookies.set({
        name: 'admin_session',
        value: jwt,
        httpOnly: true,
        path: '/',
        secure: isHttps,
        sameSite: 'lax',
        maxAge: 60 * 60 * 8 // 8 hours
      });

      return response;
    }

    // Increment failed attempt for invalid password
    limitInfo.count += 1;
    limitInfo.lastAttempt = Date.now();
    rateLimitMap.set(ip, limitInfo);
    return NextResponse.json({ success: false, message: 'Kredensial tidak valid' }, { status: 401 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
