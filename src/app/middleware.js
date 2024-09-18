// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
    const authUser = req.cookies.get('authUser')?.value;

    if (authUser) {
        const user = JSON.parse(authUser);
        req.headers.set('Authorization', `Bearer ${user.token}`);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/api/:path*'], // Apply middleware to API routes
};
