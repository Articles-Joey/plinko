"use client"
import { Suspense, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

import axios from 'axios'

// import { useSelector, useDispatch } from 'react-redux';

import { useHotkeys } from 'react-hotkeys-hook';

// import GameScoreboard from '@/components/Game/GameScoreboard'

// import ROUTES from '@/components/constants/routes';

import Countdown from 'react-countdown';
import { add, differenceInHours, format } from 'date-fns';

import ArticlesButton from '@/components/UI/Button';
import useFullscreen from '@/hooks/useFullScreen';
import { useStore } from '@/hooks/useStore';
// import Link from 'next/link';
// import NoSessionCard from '@/components/user/NoSessionCard';
import { useWallet } from '@/hooks/useWallet';
import { Dropdown, DropdownButton } from 'react-bootstrap';

// const Ad = dynamic(() => import('components/Ads/Ad'), {
//     ssr: false,
// });

const GameCanvas = dynamic(() => import('@/components/Game/GameCanvas'), {
    ssr: false,
});

function RedeemBallButton({
    className,
    redeemBall
}) {
    return (
        <ArticlesButton
            className={className}
            onClick={() => {
                redeemBall(true)
            }}
        >
            <span>Redeem Ball</span>
            <span className="ms-2 badge bg-articles-secondary shadow-articles">
                -10 Points
            </span>
        </ArticlesButton>
    )
}

export default function PlinkoPage(props) {

    // const [wallet, setWallet] = useState({
    //     total: 0
    // })

    const { wallet, setWallet } = useWallet()

    // const { 
    //     balls, 
    //     removeBall, 
    //     addBall 
    // } = useStore()

    const {
        balls, 
        // removeBall, 
        addBall,
        debug,
        setDebug
    } = useStore(state => ({
        balls: state.balls,
        // removeBall: state.removeBall,
        addBall: state.addBall,
        debug: state.debug,
        setDebug: state.setDebug
    }));

    // const [lastClaim, setLastClaim] = useState(null)

    const { isFullscreen, requestFullscreen, exitFullscreen } = useFullscreen();

    // const userReduxState = useSelector((state) => state.auth.user_details)
    const userReduxState = false

    const [menuOpen, setMenuOpen] = useState(false)

    const [sceneKey, setSceneKey] = useState(0);
    const reloadScene = () => {
        setSceneKey((prevKey) => prevKey + 1);
    };

    useHotkeys('Space', (event) => {

        if (userReduxState._id) {
            redeemBall()
            console.log("Online redeem")
        } else {
            redeemBall(true)
            console.log("Offline redeem")
        }

    }, [userReduxState]);

    function redeemBall(offline) {

        if (offline) {

            addBall()
            setWallet({
                ...wallet,
                total: (wallet?.total || 0) - 10
            })

        } else {

            axios.post('/api/user/community/games/plinko/ball/redeem')
                .then(response => {

                    console.log(response.data)
                    setWallet({
                        ...wallet,
                        total: response.data.total
                    })
                    addBall()

                })
                .catch(response => {
                    console.log(response.data)
                })

        }

    }

    function claim() {

        axios.post('/api/user/community/games/plinko/claim')
            .then(response => {

                console.log(response.data)
                setWallet({
                    ...wallet,
                    total: response.data.total + 100
                })

                // const tempBoard = leaderboard.map(obj => obj.user_id == session.user._id ? { ...obj, total: wallet, last_play: new Date() } : obj)
                // setLeaderboard(tempBoard)

                // setLastClaim(new Date())
                // setLeaderboard(response.data)
            })
            .catch(response => {
                console.log(response.data)
            })

    }

    function getBalance() {
        axios.get('/api/user/community/games/plinko/wallet')
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

        if (userReduxState._id) {
            getBalance()
        }

    }, [userReduxState._id])

    return (
        <div className='plinko-game-page' id={'plinko-game'}>

            <div className={`menu-card ${menuOpen && 'show'}`}>

                <div className='mb-2 d-flex flex-wrap'>

                    {/* <Link href={ROUTES.GAMES} className='w-50'>
                        <ArticlesButton
                            small
                            className="w-100"
                        >
                            <i className="fad fa-sign-out fa-rotate-180"></i>
                            <span>Leave Game</span>
                        </ArticlesButton>
                    </Link> */}

                    <ArticlesButton
                        small
                        className="w-50"
                        active={isFullscreen}
                        onClick={() => {
                            if (isFullscreen) {
                                exitFullscreen()
                            } else {
                                requestFullscreen('plinko-game')
                            }
                        }}
                    >
                        {isFullscreen && <span>Exit </span>}
                        {!isFullscreen && <span><i className='fad fa-expand'></i></span>}
                        <span>Fullscreen</span>
                    </ArticlesButton>

                    <ArticlesButton
                        small
                        className="w-50"
                        onClick={() => {
                            reloadScene()
                        }}
                    >
                        <span>Reload Game</span>
                    </ArticlesButton>

                    <div className='w-50'>
                        <DropdownButton
                            variant="articles w-100"
                            size='sm'
                            id="dropdown-basic-button"
                            className="dropdown-articles"
                            title={
                                <span>
                                    <i className="fad fa-bug"></i>
                                    <span>Debug </span>
                                    <span>{debug ? 'On' : 'Off'}</span>
                                </span>
                            }
                        >

                            <div style={{ maxHeight: '600px', overflowY: 'auto', width: '200px' }}>

                                {[
                                    false,
                                    true
                                ]
                                    .map(location =>
                                        <Dropdown.Item
                                            key={location}
                                            onClick={() => {
                                                setDebug(location)
                                            }}
                                            className="d-flex justify-content-between"
                                        >
                                            {location ? 'True' : 'False'}
                                        </Dropdown.Item>
                                    )}

                            </div>

                        </DropdownButton>
                    </div>

                </div>

                {/* <NoSessionCard
                    text={'Please sign in to access a user balance and have your score on the leaderboard.'}
                    className="mb-2"
                    autoShow
                /> */}

                {!userReduxState?._id &&
                    <div className="card card-articles card-sm mb-2">

                        <div className="card-header py-2 d-flex justify-content-between">

                            <h6 className='mb-0'>Balance:</h6>

                            <div className="badge bg-articles-secondary shadow-articles">
                                {wallet?.total}
                            </div>

                        </div>

                        <div className="card-body">

                            <div className="small text-center">
                                {`Offline Play - Resets on tab close`}
                            </div>

                            <RedeemBallButton
                                className={"w-100"}
                                redeemBall={redeemBall}
                            />

                            <div className="small text-center">
                                {`${balls.length || 0} Active Balls`}
                            </div>

                        </div>

                    </div>
                }

                {userReduxState?._id && <>
                    <div className="card card-articles card-sm mb-2">

                        <div className="card-header py-2 d-flex justify-content-between">

                            <h6 className='mb-0'>Balance:</h6>

                            <div className="badge bg-articles-secondary shadow-articles">
                                {wallet?.total || 0}
                            </div>

                        </div>

                        <div className="card-body">

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
                                <span className="ms-2 badge bg-articles-secondary shadow-articles">
                                    -10 Points
                                </span>
                            </ArticlesButton>

                            <div className="small text-center">
                                {`${balls.length || 0} Active Balls`}
                            </div>

                        </div>

                    </div>

                    <div className="card card-articles card-sm mb-2">

                        <div className="card-header py-2 d-flex justify-content-between">

                            <h6 className='mb-0'>Next Claim</h6>

                            <div className="badge bg-articles-secondary shadow-articles">
                                {/* <div><small>{format(new Date(), 'MM/dd/yy hh:mmaa')}</small></div> */}
                                {wallet?.last_claim && <Countdown daysInHours={true} date={add(new Date(wallet.last_claim), { hours: 24 })} />}
                            </div>

                        </div>

                        <div className="card-body p-2">

                            <div><small>One claim per 24 hours</small></div>

                            {/* <div>+100 points</div> */}
                            <ArticlesButton
                                disabled={differenceInHours(new Date(), new Date(wallet?.last_claim)) < 24}
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

                    </div>
                </>}

                {/* TODO */}
                {/* <GameScoreboard game="Plinko" /> */}

            </div>

            <div className="menu-bar">

                <ArticlesButton
                    active={menuOpen}
                    onClick={() => {
                        setMenuOpen(!menuOpen)
                    }}
                >
                    Menu
                </ArticlesButton>

                <div className="badge bg-black">
                    {wallet?.total} Points
                </div>

                {/* <ArticlesButton
                    onClick={() => {
                        setMenuOpen(!menuOpen)
                    }}
                >
                    Claim Points
                </ArticlesButton> */}

                <RedeemBallButton
                    className={""}
                    redeemBall={redeemBall}
                />

            </div>

            <div className='game-content'>

                <div className='canvas-three-wrap'>
                    <Suspense>
                        <GameCanvas
                            key={sceneKey}
                            setWallet={setWallet}
                        />
                    </Suspense>
                </div>

            </div>

            {/* <Ad section={"Games"} section_id={'Plinko'} /> */}

        </div>
    )
}