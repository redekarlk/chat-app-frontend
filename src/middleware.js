


import { NextResponse } from 'next/server';

const PUBLIC_ROUTES = ['/', '/auth'];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get('token')?.value;

  console.log('Path:', pathname);
  console.log('Token:', token);

  // Skip static, Next.js internals, etc.
  if (
    PUBLIC_ROUTES.includes(pathname) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.match(/\.(.*)$/)
  ) {
    return NextResponse.next();
  }

  // No token — force login
  if (!token) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  // Has token but visiting public route — redirect to profile
  if (token && PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next|static|favicon.ico|.*\\..*).*)',
  ],
};
