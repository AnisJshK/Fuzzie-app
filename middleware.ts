import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
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
  if (isIgnoredRoute(req)) return NextResponse.next()
  if (!isPublicRoute(req)) {
    const {userId} = await auth()

    if(!userId){
      const isApiRoute = req.nextUrl.pathname.startsWith('/api')
      if(isApiRoute){
        return NextResponse.json({
          error:'Unauthorized'
        },{
          status:401
        })
      }
      await auth.protect()
    }
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}