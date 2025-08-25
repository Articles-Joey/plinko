import { ObjectId } from 'mongodb';

import { NextResponse } from 'next/server';

import clientPromise from '@/util/mongodb';
import { cookies } from 'next/headers';

export async function GET(req) {

    const db = (await clientPromise).db();
    const userId = req.headers.get('x-user-id');

    const cookieStore = await cookies();

    const session_token = cookieStore.get('sess')?.value

    const endpoint = `http://localhost:3012/api/auth/session?token=${encodeURIComponent(session_token)}`;
    const response = await fetch(endpoint);
    const data = await response.json();

    console.log(data, session_token)

    // Check last claim date
    var result = await db
        .collection("game-plinko-scores")
        .findOne({
            user_id: new ObjectId(data.user_id),
        })

    return NextResponse.json(result)
}