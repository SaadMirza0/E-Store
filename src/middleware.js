import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Public paths that don't require authentication
  const publicPaths = ['/login', '/register', '/forgot-password'];
  
  // Get the token and user role from cookies
  const token = request.cookies.get('token')?.value;
  const userRole = request.cookies.get('userRole')?.value;

  // Redirect to login if accessing protected routes without authentication
  if (!token && !publicPaths.includes(pathname)) {
    const url = new URL('/login', request.url);
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users away from login/register pages
  if (token && publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Protect admin routes
  if (pathname.startsWith('/admin') && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Configure the middleware to run on specific routes
export const config = {
  matcher: [
    '/account/:path*',
    '/admin/:path*',
    '/login',
    '/register',
    '/forgot-password'
  ]
}; 