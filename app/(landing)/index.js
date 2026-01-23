"use client"
import { Suspense, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

import axios from 'axios'

// import { useSelector, useDispatch } from 'react-redux';

import { useHotkeys } from 'react-hotkeys-hook';

import Logo from '@/app/icon.png';

// import GameScoreboard from '@/components/Game/GameScoreboard'

// import ROUTES from '@/components/constants/routes';

// import Countdown from 'react-countdown';
// import { add, differenceInHours, format } from 'date-fns';

import ArticlesButton from '@/components/UI/Button';
import useFullscreen from '@/hooks/useFullScreen';
import { useStore } from '@/hooks/useStore';
// import Link from 'next/link';
// import NoSessionCard from '@/components/user/NoSessionCard';
import { useWallet } from '@/hooks/useWallet';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import OfflineBalance from '@/components/UI/OfflineBalance';
import OnlineBalance from '@/components/UI/OnlineBalance';
import classNames from 'classnames';
// import { useThree } from '@react-three/fiber';

// const Ad = dynamic(() => import('components/Ads/Ad'), {
//     ssr: false,
// });

const GameCanvas = dynamic(() => import('@/components/Game/GameCanvas'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
});

import GameScoreboard from '@articles-media/articles-dev-box/GameScoreboard';
import Ad from '@articles-media/articles-dev-box/Ad';

import useUserDetails from '@articles-media/articles-dev-box/useUserDetails';
import useUserToken from '@articles-media/articles-dev-box/useUserToken';

import { GamepadKeyboard, PieMenu } from '@articles-media/articles-gamepad-helper';
import { useOfflineWallet } from '@/hooks/useOfflineWallet';

const ReturnToLauncherButton = dynamic(() =>
    import('@articles-media/articles-dev-box/ReturnToLauncherButton'),
    { ssr: false }
);

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
            <span className="ms-2 badge bg-dark shadow-articles">
                -10 Points
            </span>
        </ArticlesButton>
    )
}

export default function PlinkoPage(props) {

    const {
        data: userToken,
        error: userTokenError,
        isLoading: userTokenLoading,
        mutate: userTokenMutate
    } = useUserToken(
        "3017"
    );

    const {
        data: userDetails,
        error: userDetailsError,
        isLoading: userDetailsLoading,
        mutate: userDetailsMutate
    } = useUserDetails({
        token: userToken
    });

    // const [wallet, setWallet] = useState({
    //     total: 0
    // })

    const { wallet, setWallet } = useWallet()

    const offlineWallet = useOfflineWallet(state => state.wallet);
    const setOfflineWallet = useOfflineWallet(state => state.setWallet);

    // const teleportLocation = useStore(state => state.teleportLocation)
    const setTeleportLocation = useStore(state => state.setTeleportLocation)

    // const darkMode = useStore(state => state.darkMode)
    // const setDarkMode = useStore(state => state.setDarkMode)

    // const theme = useStore(state => state.theme);
    // const setTheme = useStore(state => state.setTheme);
    const darkMode = useStore(state => state.darkMode)
    const toggleDarkMode = useStore(state => state.toggleDarkMode)

    const menuOpen = useStore(state => state.menuOpen)
    const setMenuOpen = useStore(state => state.setMenuOpen)

    const showSidebar = useStore(state => state.showSidebar);
    const setShowSidebar = useStore(state => state.setShowSidebar);

    // const { 
    //     balls, 
    //     removeBall, 
    //     addBall 
    // } = useStore()

    const balls = useStore(state => state.balls);
    // const removeBall = useStore(state => state.removeBall);
    const addBall = useStore(state => state.addBall);
    const debug = useStore(state => state.debug);
    const setDebug = useStore(state => state.setDebug);

    // const [lastClaim, setLastClaim] = useState(null)

    const { isFullscreen, requestFullscreen, exitFullscreen } = useFullscreen();

    // const userReduxState = useSelector((state) => state.auth.user_details)
    const userReduxState = false

    // const [menuOpen, setMenuOpen] = useState(false)

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
            setOfflineWallet({
                ...wallet,
                total: (wallet?.total || 0) - 10
            })

        } else {

            axios.post(
                process.env.NODE_ENV === 'production' ?
                    'https://articles.media/api/user/community/games/plinko/ball/redeem'
                    :
                    'http://localhost:3001/api/user/community/games/plinko/ball/redeem'
                ,
                {

                },
                {
                    headers: {
                        "x-articles-api-key": userToken
                    }
                }
            )
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

    return (
        <div
            className={
                classNames(
                    'plinko-game-page',
                    { 'show-sidebar': showSidebar }
                )
            }
            id={'plinko-game'}
        >

            <Suspense>
                {/* <GamepadKeyboard
                    disableToggle={true}
                    active={nicknameKeyboard}
                    onFinish={(text) => {
                        console.log("FINISH KEYBOARD", text)
                        useStore.getState().setNickname(text);
                        useStore.getState().setNicknameKeyboard(false);
                    }}
                    onCancel={(text) => {
                        console.log("CANCEL KEYBOARD", text)
                        // useStore.getState().setNickname(text);
                        useStore.getState().setNicknameKeyboard(false);
                    }}
                /> */}
                <PieMenu
                    options={[
                        {
                            label: 'Settings',
                            icon: 'fad fa-cog',
                            callback: () => {
                                setShowSettingsModal(prev => !prev)
                            }
                        },
                        {
                            label: 'Go Back',
                            icon: 'fad fa-arrow-left',
                            callback: () => {
                                window.history.back()
                            }
                        },
                        {
                            label: 'Credits',
                            icon: 'fad fa-info-circle',
                            callback: () => {
                                setShowCreditsModal(true)
                            }
                        },
                        {
                            label: 'Game Launcher',
                            icon: 'fad fa-gamepad',
                            callback: () => {
                                window.location.href = 'https://games.articles.media';
                            }
                        },
                        {
                            label: `${darkMode ? "Light" : "Dark"} Mode`,
                            icon: 'fad fa-palette',
                            callback: () => {
                                toggleDarkMode()
                            }
                        },
                        {
                            label: `Redeem Online Ball`,
                            icon: 'fad fa-palette',
                            callback: () => {
                                redeemBall()
                            }
                        },
                        {
                            label: `Redeem Offline Ball`,
                            icon: 'fad fa-palette',
                            callback: () => {
                                addBall('Offline')
                                setOfflineWallet({
                                    ...offlineWallet,
                                    total: (offlineWallet?.total || 0) - 10
                                })
                                // redeemBall(true)
                            }
                        }
                    ]}
                    onFinish={(event) => {
                        console.log("Event", event)
                        if (event.callback) {
                            event.callback()
                        }
                    }}
                />
            </Suspense>

            <div className={`menu-floating-button`}>

            </div>

            <div className={`menu-card ${menuOpen && 'show'} ${showSidebar ? 'sidebar' : 'no-sidebar'}`}>

                <div className='wrap'>

                    <div className='w-100 mb-0'>
                        <div style={{ display: 'flex', alignItems: 'end' }} className='mb-1'>
                            <Image src={Logo.src} alt="Plinko Logo" width={50} height={50} />
                            <h1 style={{ marginBottom: 0, marginLeft: '8px' }}>Plinko</h1>
                        </div>
                        <p>Welcome to the Plinko game! Drop your chips and see where they land.</p>
                    </div>

                    <div className='mb-3 d-flex flex-wrap'>

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

                        <div className='w-50'>
                            <DropdownButton
                                variant="articles w-100"
                                size='sm'
                                id="dropdown-basic-button"
                                className="dropdown-articles"
                                title={
                                    <span>
                                        <i className="fad fa-camera"></i>
                                        <span>Camera </span>
                                        {/* <span>{debug ? 'On' : 'Off'}</span> */}
                                    </span>
                                }
                            >

                                <div style={{ maxHeight: '600px', overflowY: 'auto', width: '200px' }}>

                                    {[
                                        {
                                            name: 'Birds Eye View',
                                            position: [0, 20, 180]
                                        },
                                        {
                                            name: 'Boardwalk',
                                            position: [.68, -89.63, 50.77]
                                        },
                                        {
                                            name: 'Ships View',
                                            position: [-0.49, -77.43, -25.66],
                                        },
                                        {
                                            name: 'Rooftops',
                                            position: [-42.58, -123.81, 97.85]
                                        }
                                    ]
                                        .map(location =>
                                            <Dropdown.Item
                                                key={location.name}
                                                onClick={() => {
                                                    // setDebug(location.name)
                                                    console.log(location)
                                                    // const { camera } = useThree();
                                                    // camera.position.set(...location.position);
                                                    // camera.lookAt(0, 0, 0);

                                                    setTeleportLocation(location.position);
                                                    setMenuOpen(false)
                                                }}
                                                className="d-flex justify-content-between"
                                            >
                                                {location.name}
                                            </Dropdown.Item>
                                        )}

                                </div>

                            </DropdownButton>
                        </div>

                        <div className='w-50'>
                            <ArticlesButton
                                small
                                // id="toggle-sidebar-button"
                                className="w-100"
                                onClick={() => {
                                    toggleDarkMode()
                                }}
                            >

                                <i className="fas fa-bars" style={{ transform: 'rotate(90deg)' }}></i>
                                <span>Sidebar: {showSidebar ? 'On' : 'Off'}</span>

                            </ArticlesButton>
                            {/* <DropdownButton
                                variant="articles w-100"
                                size='sm'
                                id="dropdown-basic-button"
                                className="dropdown-articles"
                                title={
                                    <span>
                                        <i className="fad fa-eyedropper"></i>
                                        <span>Dark Mode: {darkMode ? 'Dark' : 'Light'}</span>
                                    </span>
                                }
                            >

                                <div style={{ maxHeight: '600px', overflowY: 'auto', width: '200px' }}>

                                    {[
                                        true, false
                                    ]
                                        .map(location =>
                                            <Dropdown.Item
                                                key={location}
                                                onClick={() => {
                                                    toggleDarkMode()
                                                }}
                                                className="d-flex justify-content-between"
                                            >
                                                {location ? 'Dark' : 'Light'}
                                            </Dropdown.Item>
                                        )}

                                </div>

                            </DropdownButton> */}
                        </div>

                        <ArticlesButton
                            small
                            id="toggle-sidebar-button"
                            className="w-50"
                            onClick={() => {
                                setShowSidebar(!showSidebar)
                            }}
                        >

                            <i className="fas fa-bars" style={{ transform: 'rotate(90deg)' }}></i>
                            <span>Sidebar: {showSidebar ? 'On' : 'Off'}</span>

                            <div id='size-warning' className="ms-2 badge bg-danger shadow-articles">
                                Screen too small!
                            </div>

                        </ArticlesButton>

                    </div>

                    {/* <NoSessionCard
                        text={'Please sign in to access a user balance and have your score on the leaderboard.'}
                        className="mb-2"
                        autoShow
                    /> */}

                    <OnlineBalance
                        redeemBall={redeemBall}
                    />

                    <OfflineBalance
                    // redeemBall={redeemBall}
                    />

                    {/* TODO */}
                    {/* <GameScoreboard game="Plinko" /> */}

                    <Link
                        href="https://github.com/Articles-Joey/plinko"
                        className="w-50"
                        target='_blank'
                        rel="noopener noreferrer"
                    >
                        <ArticlesButton
                            small
                            className="w-100 mb-2"
                            onClick={() => {
                                reloadScene()
                            }}
                        >
                            <i className="fab fa-github"></i>
                            <span>GitHub</span>
                        </ArticlesButton>
                    </Link>

                    <ReturnToLauncherButton />

                </div>

            </div>

            <div className="menu-bar">

                <ArticlesButton
                    active={menuOpen}
                    onClick={() => {
                        setMenuOpen(!menuOpen)
                    }}
                    className='d-flex px-1 pe-2'
                >
                    <div
                        style={{
                            rotate: menuOpen ? '0deg' : '180deg',
                            transitionDuration: '200ms'
                        }}
                    >
                        <i className="fas fa-arrow-down mx-2"></i>
                    </div>
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