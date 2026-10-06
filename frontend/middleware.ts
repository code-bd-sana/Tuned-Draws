import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Tuned Draws Next.js Route Middleware
 */
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except Next static chunks and optimization files
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
