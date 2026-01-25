import { ObjectId } from 'mongodb';

import { add, sub } from 'date-fns';

import { NextResponse } from 'next/server';

import clientPromise from '@/util/mongodb';

export async function POST(req) {
    const db = (await clientPromise).db();
    const userId = req.headers.get('x-user-id');

    const body = await req.json();
    const { betAmount } = body;

    // Check wallet
    var result = await db
        .collection("game-plinko-scores")
        .findOne({
            user_id: new ObjectId(userId),
            // $or: [
            //     {
            //         last_claim: {
            //             $lt: sub(new Date(), { days: 1 }),
            //         }
            //     },
            //     {
            //         last_claim: {
            //             $exists: false
            //         }
            //     }
            // ]
        })

    console.log(result)

    // Subtract from wallet
    if (result) {

        const update_result = await db
            .collection("game-plinko-scores")
            .updateOne(
                { user_id: new ObjectId(userId) },
                {
                    $set: { last_play: new Date() },
                    $inc: { total: -betAmount }
                }
            )

        return NextResponse.json({
            ...result,
            total: (result.total - betAmount)
        })

    } else {

        return NextResponse.json('You need to wait 24 hours to claim again.', { status: 400 })

    }
}