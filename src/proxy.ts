// define protected routes => e.g. /admin

import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ['/profile', '/post/create', '/post/edit'];

export async function proxy(request: NextRequest) {
    const pathName = request.nextUrl.pathname;

    const session = await getSessionCookie(request);

    const isProtectedRoute = protectedRoutes.some(route => pathName.startsWith(route));

    if (isProtectedRoute && !session) {
        // redirect the user to the auth page bc the user isn't logged in

        return NextResponse.redirect(new URL('/auth', request.url));
    };

    // If user is already logged in and user is accessing auth route, then redirect to homepage
    if(pathName === '/auth' && session) {
        return NextResponse.redirect(new URL('/', request.url));
    };

    return NextResponse.next();
}

export const config = {
    matcher : ['/profile/:path*', '/post/create', '/post/edit/:path*', '/auth']
}