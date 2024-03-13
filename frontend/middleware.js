import { NextResponse } from 'next/server'

export function middleware(request) {
    const pathname = request.nextUrl.pathname

    const token = request.cookies.get('refresh_token')
    if (pathname.startsWith('/login')) {
        if (token) {
            return NextResponse.redirect(new URL('/courses', request.url))
        }
    }
    else if (pathname.startsWith('/signup')) {
        if (token) {
            return NextResponse.redirect(new URL('/courses', request.url))
        }
    }
    else {
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }
}
