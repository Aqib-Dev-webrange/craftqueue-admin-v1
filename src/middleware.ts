import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // const { pathname } = request.nextUrl;
  
  // // Check if user is authenticated (you'd check cookies/tokens here)
  // const isAuthenticated = false; // Replace with actual auth check
  
  // // Protect dashboard routes
  // if (pathname.startsWith('/dashboard') && !isAuthenticated) {
  //   return NextResponse.redirect(new URL('/auth/login', request.url));
  // }
  
  // // Redirect authenticated users away from auth pages
  // if (pathname.startsWith('/auth') && isAuthenticated) {
  //   return NextResponse.redirect(new URL('/dashboard', request.url));
  // }
  
  // return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};