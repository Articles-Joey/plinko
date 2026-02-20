import { ObjectId } from 'mongodb';

import { add, sub } from 'date-fns';

import { NextResponse } from 'next/server';

import clientPromise from '@/util/mongodb';

export async function POST(req) {
    const db = (await clientPromise).db();
    const userId = req.headers.get('x-user-id');

    const { score, ball_key, betAmount } = await req.json();

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

    // Add to wallet
    if (result) {

        let calculatedScore = (betAmount || 10) * score

        const update_result = await db
            .collection("game-plinko-scores")
            .updateOne(
                { user_id: new ObjectId(userId) },
                {
                    $set: { last_play: new Date() },
                    $inc: { total: calculatedScore }
                }
            )

        return NextResponse.json({
            ...result,
            total: (result.total + calculatedScore)
        })

    } else {

        return NextResponse.json('You need to wait 24 hours to claim again.', { status: 400 })

    }
}