import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/api/clerk-webhook',
  '/api/drive-activity/notification',
])

const isIgnoredRoute = createRouteMatcher([
  '/api/auth/callback/discord',
  '/api/auth/callback/notion',
  '/api/auth/callback/slack',
  '/api/flow',
  '/api/cron/wait',
])

export default clerkMiddleware(async (auth, req) => {
  if (isIgnoredRoute(req)) return
  if (!isPublicRoute(req)) await auth.protect()
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}