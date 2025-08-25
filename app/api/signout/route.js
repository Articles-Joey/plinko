// import { ObjectId } from 'mongodb';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
// import { NextResponse } from 'next/server';
// import clientPromise from '@/util/mongodb';

// This will only work when called on a subdomain, not a partner OAuth application

export async function POST(req) {
    
    cookies().delete('sess');
    return NextResponse.redirect(new URL('/', req.url));

}