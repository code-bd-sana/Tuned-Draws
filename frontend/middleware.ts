import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Temporary Route Interceptor for Tuned Draws
 * 
 * Rules:
 * - Allows root homepage ('/')
 * - Allows all authentication routes ('/login', '/register', '/host/register', etc.)
 * - Allows internal Next.js assets, API endpoints, and static files
 * - Redirects all other pages (competitions, winners, rules, dashboards, etc.) to '/coming-soon'
 */

// Routes allowed to pass through without redirection
const ALLOWED_EXACT_ROUTES = new Set([
  '/',
  '/login',
  '/register',
  '/host/register',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
  '/register/success',
  '/coming-soon',
  '/admin',
]);

// URL path prefixes that must never be redirected
const ALLOWED_PREFIXES = [
  '/api/',
  '/_next/',
  '/images/',
  '/uploads/',
  '/icons/',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Normalize trailing slash (e.g., '/login/' -> '/login')
  const normalizedPath = pathname !== '/' && pathname.endsWith('/') 
    ? pathname.slice(0, -1) 
    : pathname;

  // 1. Allow exact allowed routes
  if (ALLOWED_EXACT_ROUTES.has(normalizedPath)) {
    return NextResponse.next();
  }

  // 2. Allow API endpoints and Next.js internal / static prefixes
  for (const prefix of ALLOWED_PREFIXES) {
    if (normalizedPath.startsWith(prefix)) {
      return NextResponse.next();
    }
  }

  // 3. Allow static asset files by file extension (e.g. .png, .jpg, .svg, .css, .js)
  if (/\.[a-zA-Z0-9]+$/.test(normalizedPath)) {
    return NextResponse.next();
  }

  // 4. Redirect all other pages temporarily to /coming-soon
  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = '/coming-soon';
  redirectUrl.searchParams.set('target', normalizedPath);

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except Next static chunks and optimization files
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
