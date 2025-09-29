import { ObjectId } from 'mongodb';

import { NextResponse } from 'next/server';

import clientPromise from '@/util/mongodb';
// import { cookies } from 'next/headers';
import verifySession from '@/util/verifySession';

export async function GET(req) {

    const db = (await clientPromise).db();
    const userId = req.headers.get('x-user-id');

    // const cookieStore = await cookies();
    // const session_token = cookieStore.get('sess')?.value

    // const userDetails = await verifySession()
    // if ( !userDetails ) {
    //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // } else {
    //     console.log("userDetails", userDetails)
    // }

    // console.log("userId", userId)
    // console.log("session_token", session_token)

    // const endpoint =
    //     (process.env.NODE_ENV == "development" ?
    //         'http://localhost:3012'
    //         :
    //         'https://accounts.articles.media'
    //     )
    //     +
    //     `/api/auth/session?token=${encodeURIComponent(session_token)}`;

    // const response = await fetch(endpoint);
    // const data = await response.json();

    // console.log(data, session_token)

    // Check last claim date
    var result = await db
        .collection("game-plinko-scores")
        .findOne({
            user_id: new ObjectId(userId),
        })

    return NextResponse.json(result)
}