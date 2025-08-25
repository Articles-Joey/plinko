// import { useOfflineWallet } from "@/hooks/useOfflineWallet";
import { useStore } from "@/hooks/useStore";
// import ArticlesSignInButton from "../ArticlesSignInButton";
import useUserToken from "@/hooks/user/useUserToken";
import useUserDetails from "@/hooks/user/useUserDetails";
import ArticlesButton from "@/components/UI/Button";

import Countdown from 'react-countdown';
import { add, differenceInHours, format } from 'date-fns';
import { useWallet } from "@/hooks/useWallet";
import { useEffect } from "react";
import axios from "axios";

export default function OnlineBalance({
    redeemBall,
}) {

    const wallet = useWallet(state => state.wallet);
    const setWallet = useWallet(state => state.setWallet);

    const balls = useStore(state => state.balls);

    const {
        data: userToken,
        error: userTokenError,
        isLoading: userTokenLoading,
        mutate: userTokenMutate
    } = useUserToken();

    const {
        data: userDetails,
        error: userDetailsError,
        isLoading: userDetailsLoading,
        mutate: userDetailsMutate
    } = useUserDetails({
        token: userToken
    });

    function getBalance() {
        axios.get('/api/user/wallet')
            .then(response => {
                console.log(response.data)

                setWallet(response.data)
                // setLastClaim(response.data.last_claim)

            })
            .catch(response => {
                console.log(response.data)
            })
    }

    useEffect(() => {

        if (userDetails?.user_id) {
            getBalance()
        }

    }, [userDetails?.user_id])

    return (
        <div className="card card-articles card-sm mb-2">

            <div className="card-header py-2 d-flex justify-content-between">

                <h6 className='mb-0'>Online Balance:</h6>

                <div className="badge bg-dark shadow-articles">
                    {wallet?.total}
                </div>

            </div>

            <div className="card-body pb-0">

                {/* <div className='text-center mb-2'>
                                            <ArticlesButton
                                                small
                                                className=""
                                            >
                                                Change Bet
                                            </ArticlesButton>
                                        </div> */}

                <ArticlesButton
                    className="w-100"
                    onClick={() => {
                        redeemBall()
                    }}
                >
                    <span>Redeem Ball</span>
                    <span className="ms-2 badge bg-dark shadow-articles">
                        -10 Points
                    </span>
                </ArticlesButton>

                <div className="small text-center">
                    {`${balls.length || 0} Active Balls`}
                </div>

            </div>

            <hr className="my-1" />

            <div className="card-body pt-1">

                <div className="small d-flex justify-content-between">

                    <h6 className='mb-0'>Next Claim</h6>

                    <div className="badge bg-dark shadow-articles">
                        {/* <div><small>{format(new Date(), 'MM/dd/yy hh:mmaa')}</small></div> */}
                        {wallet?.last_claim && <Countdown daysInHours={true} date={add(new Date(wallet.last_claim), { hours: 24 })} />}
                    </div>

                </div>

                <div><small>One claim per 24 hours</small></div>

                {/* <div>+100 points</div> */}
                <ArticlesButton
                    disabled={
                        differenceInHours(new Date(), new Date(wallet?.last_claim)) < 24
                    }
                    className="mb-1 w-100"
                    onClick={() => {
                        claim()
                    }}
                >
                    Claim 100 Points
                </ArticlesButton>

                <div className='lh-sm'>
                    {wallet?.last_claim && <div className='l'><small>Next claim {format(add(new Date(wallet?.last_claim), { hours: 24 }), 'MM/dd/yy hh:mmaa')}</small></div>}
                </div>

            </div>

            <div className="card-footer d-flex">

                <ArticlesButton
                    className={"flex-grow-1"}
                    onClick={() => {
                        if (!userDetails?.user_id) {
                            window.location.href = `${process.env.NEXT_PUBLIC_LOCAL_ACCOUNTS_ADDRESS}/login?redirect=${encodeURIComponent(window.location.href)}&type=subdomain`;
                        } else {
                            fetch('/api/signout', { method: 'POST' })
                                .then(() => {
                                    window.location.reload();
                                });
                        }
                    }}
                >
                    {!userDetails?.user_id ?
                        'Login'
                        :
                        'Logout'
                    }
                </ArticlesButton>

                <ArticlesButton
                    className={""}
                    onClick={() => {
                       getBalance()
                    }}
                >
                    <i className="fad fa-redo me-0"></i>
                </ArticlesButton>

            </div>

        </div>
    )
}