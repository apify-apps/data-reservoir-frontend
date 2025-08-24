import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { Route } from 'next';
import { NextResponse } from 'next/server';

const notProtectedRoute = createRouteMatcher(['/login(.*)', '/']);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()

  if (!userId && !notProtectedRoute(req)) {
    return NextResponse.redirect(new URL('/login' satisfies Route, req.url));
  }
  else if (userId && notProtectedRoute(req)) {
    return NextResponse.redirect(new URL('/dashboard' satisfies Route, req.url));
  }

  const r = NextResponse.next({ ...req, headers: {} });
  r.cookies.set('QueryParam', req.nextUrl.search.slice(1));
  return r;

}, {
  afterSignInUrl: '/dashboard',
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};