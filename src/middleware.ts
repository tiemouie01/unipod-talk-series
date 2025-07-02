import type { NextRequest } from 'next/server'
import {NextResponse} from 'next/server'
import { getSessionCookie } from "better-auth/cookies";
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const userSession = getSessionCookie(request)
    if(!userSession){
        return NextResponse.redirect(new URL('/auth', request.url))
    }
}
 
export const config = {
  matcher: '/admin/:path*',
}