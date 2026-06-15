import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Protects everything except landing page and authentication paths
const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)'])

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) {
    auth().protect() // Fix: Added parenthesis here for Clerk v5
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.[^?]+$|api/auth).*)',
    '/(api|trpc)(.*)',
  ],
}