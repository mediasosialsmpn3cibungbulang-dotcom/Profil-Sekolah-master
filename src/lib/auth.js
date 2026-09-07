import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export async function isAuthenticated() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_session');
    
    if (!token) return false;

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'default_secret_key');
    await jwtVerify(token.value, secret);
    
    return true;
  } catch (error) {
    return false;
  }
}
