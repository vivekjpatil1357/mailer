import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('auth-token')?.value;
  let isAuthenticated = false;

  if (token) {
    try {
      jwt.verify(token, JWT_SECRET);
      isAuthenticated = true;
    } catch (err) {
      // Token is invalid or expired
      isAuthenticated = false;
    }
  }

  // Pass authentication status to the page component
  const res = NextResponse.next();
  res.headers.set('x-is-authenticated', String(isAuthenticated));
  
  return res;
}

export const config = {
  matcher: '/',
};
