import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
  
  response.cookies.set({
    name: 'operator_8da0c2_session',
    value: '',
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    expires: new Date(0) // Expire immediately
  });

  return response;
}
