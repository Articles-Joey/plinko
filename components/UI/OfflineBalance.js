// import { useWallet } from "@/hooks/useWallet"
import ArticlesButton from "./Button"
import { useStore } from "@/hooks/useStore"
import { useOfflineWallet } from "@/hooks/useOfflineWallet"
import { add, differenceInHours, format } from "date-fns"
import Countdown from "react-countdown"
import RedeemBallButton from "./RedeemBallButton"

// function RedeemBallButton({
//     className,
//     redeemBall,
//     disabled
// }) {

//     const betAmount = useStore(state => state.betAmount);

//     return (
//         <ArticlesButton
//             className={className}
//             disabled={disabled}
//             onClick={() => {
//                 redeemBall(true)
//             }}
//         >
//             <span>Redeem Ball</span>
//             <span className="ms-2 badge bg-dark shadow-articles">
//                 -{betAmount} Points
//             </span>
//         </ArticlesButton>
//     )
// }

export default function OfflineBalance({

}) {

    // const { 
    //     wallet, 
    //     setWallet,
    //     setLastClaim,
    //     lastClaim
    // } = useOfflineWallet()

    const balls = useStore(state => state.balls);
    const resetBalls = useStore(state => state.resetBalls);
    const addBall = useStore(state => state.addBall);
    const setBetAmount = useStore(state => state.setBetAmount);

    const wallet = useOfflineWallet(state => state.wallet);
    const setWallet = useOfflineWallet(state => state.setWallet);
    const lastClaim = useOfflineWallet(state => state.lastClaim);
    const setLastClaim = useOfflineWallet(state => state.setLastClaim);

    const betAmount = useStore(state => state.betAmount);

    function redeemBall(offline) {

        addBall({
            type: "Offline"
        })
        setWallet({
            ...wallet,
            total: (wallet?.total || 0) - betAmount
        })

    }

    function claim() {

        setWallet({
            ...wallet,
            total: (wallet?.total || 0) + 100
        })

        setLastClaim(new Date())

    }

    return (
        <div className="card card-articles card-sm mb-2">

            <div className="card-header py-2 d-flex justify-content-between">

                <h6 className='mb-0'>Offline Balance:</h6>

                <div className="badge bg-dark shadow-articles">
                    {wallet?.total}
                </div>

            </div>

            <div className="card-body pb-0 pt-1">

                <div className="small text-center">
                    {`Offline Play`}
                </div>

                <RedeemBallButton
                    className={"w-100"}
                    redeemBall={redeemBall}
                    offline={true}
                    sidebar={true}
                />

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
                        (differenceInHours(new Date(), new Date(lastClaim)) < 24)
                        &&
                        lastClaim
                    }
                    className="mb-1 w-100"
                    onClick={() => {
                        claim()
                    }}
                >
                    Claim 100 Points
                </ArticlesButton>

                <div className='lh-sm'>
                    <div className='l'>
                        <small>
                            <span>Next claim: </span>
                            {lastClaim ? format(add(new Date(lastClaim), { hours: 24 }), 'MM/dd/yy hh:mmaa') : 'Ready'}
                        </small>
                    </div>
                </div>

            </div>

            <div className="card-footer py-1 d-flex justify-content-center">

                <button
                    className='btn btn-link'
                    onClick={() => {
                        setLastClaim(null)
                        setWallet({
                            ...wallet,
                            total: 100
                        })
                        resetBalls()
                        setBetAmount(10)
                    }}
                >
                    Reset
                </button>

            </div>

        </div>
    )
}