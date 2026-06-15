import { clerkMiddleware } from '@clerk/nextjs/server'

// This creates a completely stable production authentication shield
export default clerkMiddleware()

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.[^?]*\\.)[0-9a-zA-Z-]*)$',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}