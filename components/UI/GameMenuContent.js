"use client"
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { Dropdown, DropdownButton } from 'react-bootstrap'

import Logo from '@/app/icon.png'

import { useStore } from '@/hooks/useStore'
import { useRedeemBall } from '@/hooks/useRedeemBall'

import ArticlesButton from '@/components/UI/Button'
import BetAmountButton from '@/components/UI/BetAmountButton'
import OfflineBalance from '@/components/UI/OfflineBalance'
import OnlineBalance from '@/components/UI/OnlineBalance'

import GameMenuPrimaryButtonGroup from '@articles-media/articles-dev-box/GameMenuPrimaryButtonGroup';
import useFullscreen from '@articles-media/articles-dev-box/useFullscreen'
const ReturnToLauncherButton = dynamic(() =>
    import('@articles-media/articles-dev-box/ReturnToLauncherButton'),
    { ssr: false }
)

export default function GameMenuContent() {

    const redeemBall = useRedeemBall()

    const setTeleportLocation = useStore(state => state.setTeleportLocation)
    const setTeleportTarget = useStore(state => state.setTeleportTarget)
    const setTeleportZoom = useStore(state => state.setTeleportZoom)

    const setShowSettingsModal = useStore(state => state.setShowSettingsModal)

    const darkMode = useStore(state => state.darkMode)
    const toggleDarkMode = useStore(state => state.toggleDarkMode)

    const showMenu = useStore(state => state.showMenu);
    const setShowMenu = useStore(state => state.setShowMenu);
    const reloadScene = useStore(state => state.reloadScene);
    const controlType = useStore(state => state.controlType);
    const setControlType = useStore(state => state.setControlType);

    const sidebar = useStore(state => state.sidebar);
    const setSidebar = useStore(state => state.setSidebar);

    const sceneOrientation = useStore(state => state.sceneOrientation);
    const toggleSceneOrientation = useStore(state => state.toggleSceneOrientation);
    const setSceneOrientation = useStore(state => state.setSceneOrientation);

    const debug = useStore(state => state.debug);
    const setDebug = useStore(state => state.setDebug);

    const { isFullscreen, requestFullscreen, exitFullscreen } = useFullscreen();

    return (
        <div
            className={`w-100`}
        >

            <div className='p-3'>

                <div className='w-100 mb-0'>
                    <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'center' }} className='mb-2'>
                        <Image src={Logo.src} alt="Plinko Logo" width={50} height={50} />
                        <h1 style={{ marginBottom: 0, marginLeft: '8px' }}>
                            {process.env.NEXT_PUBLIC_GAME_NAME}
                        </h1>
                    </div>
                    {/* <p>Welcome to the Plinko game! Drop your chips and see where they land.</p> */}
                </div>

                <div className='mb-3 d-flex flex-wrap'>

                    <GameMenuPrimaryButtonGroup
                        useStore={useStore}
                        type="GameMenu"
                        LeaveGameOverride={<></>}
                    />

                    <ArticlesButton
                        small
                        className="w-50"
                        onClick={() => {
                            reloadScene()
                        }}
                    >
                        <span>Reload Game</span>
                    </ArticlesButton>

                    <GameMenuPrimaryButtonGroup
                        useStore={useStore}
                        type="Landing"
                        SettingsOverride={<></>}
                        // LeaveGameOverride={<></>}
                    />

                    <div className='w-50 d-none'>
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
                                        name: 'Default',
                                        position: [0, 20, 180],
                                        flatPosition: [100, 100, 100],
                                    },
                                    {
                                        name: 'Birds Eye View',
                                        position: [0, 20, 180],
                                        flatPosition: [
                                            0, 120, 0
                                        ],
                                    },
                                    {
                                        name: 'Boardwalk',
                                        position: [.68, -89.63, 50.77],
                                        flatPosition: [
                                            0, 55, 95
                                        ],
                                    },
                                    {
                                        name: 'Ships View',
                                        position: [-0.49, -77.43, -25.66],
                                        flatPosition: [
                                            0, 30, -120
                                        ],
                                    },
                                    {
                                        name: 'Rooftop Camera',
                                        position: [-42.58, -123.81, 97.85],
                                        // flatPosition:
                                        //     // [
                                        //     //     106.83795890985124,
                                        //     //     78.22706590907961,
                                        //     //     111.65203399505641
                                        //     // ]
                                        //     [
                                        //     180.9748986487864,
                                        //     54.748483681556614,
                                        //     93.92405204637862
                                        //     ],
                                    }
                                ]
                                    .map(location =>
                                        <Dropdown.Item
                                            key={location.name}
                                            onClick={() => {
                                                console.log(location)

                                                if (sceneOrientation === 'Flat') {

                                                    setTeleportLocation(location.flatPosition)

                                                    if (location.name === 'Rooftop Camera') {
                                                        setTeleportTarget([
                                                            180.9748986487864,
                                                            54.748483681556614,
                                                            93.92405204637862
                                                        ])
                                                        setTeleportZoom(0.1)
                                                    } else {
                                                        setTeleportTarget([0, 0, 0])
                                                        setTeleportZoom(170)
                                                    }

                                                } else {

                                                    setTeleportLocation(location.position);
                                                    setTeleportTarget([0, 0, 0])
                                                    setTeleportZoom(170)

                                                }

                                                setShowMenu(false)
                                            }}
                                            className="d-flex justify-content-between"
                                        >
                                            {location.name}
                                        </Dropdown.Item>
                                    )}

                            </div>

                        </DropdownButton>
                    </div>

                    <ArticlesButton
                        small
                        // id="toggle-sidebar-button"
                        className="w-50"
                        onClick={() => {
                            // toggleDarkMode()
                            // toggleSceneOrientation()
                            if (controlType == "Orbit") {

                                setControlType("FPS")

                                setSceneOrientation("Flat")

                                setTimeout(() => {
                                    setTeleportLocation([-42.58, -123.81, 97.85])
                                }, 1000)

                            } else {

                                setControlType("Orbit")

                            }
                        }}
                    >
                        <i className='fad fa-sync-alt'></i>
                        <span
                            style={{
                                fontSize: '0.65rem'
                            }}
                        >
                            {/* Orientation:  */}
                            Control: {controlType}
                        </span>
                        {/* <i className="fas fa-bars" style={{ transform: 'rotate(90deg)' }}></i> */}
                        {/* {darkMode ?
                                <i className="fad fa-sun"></i>
                                :
                                <i className="fad fa-moon"></i>
                            }
                            <span className='ms-2'>{darkMode ? 'Light' : 'Dark'} Mode</span> */}

                    </ArticlesButton>

                    {/* <LogCameraLocationButton /> */}

                    {/* <ArticlesButton
                        small
                        id="toggle-sidebar-button"
                        className="w-50"
                        onClick={() => {
                            setSidebar(!sidebar)
                        }}
                    >

                        <i className="fas fa-bars" style={{ transform: 'rotate(90deg)' }}></i>
                        <span>Sidebar: {sidebar ? 'On' : 'Off'}</span>

                        <div id='size-warning' className="ms-2 badge bg-danger shadow-articles">
                            Screen too small!
                        </div>

                    </ArticlesButton> */}

                    <ArticlesButton
                        small
                        // id="toggle-sidebar-button"
                        className="w-50"
                        disabled={controlType == "FPS"}
                        onClick={() => {
                            // toggleDarkMode()
                            toggleSceneOrientation()
                        }}
                    >
                        <i className='fad fa-sync-alt'></i>
                        <span
                            style={{
                                fontSize: '0.65rem'
                            }}
                        >
                            {/* Orientation:  */}
                            Scene: {sceneOrientation}
                        </span>
                        {/* <i className="fas fa-bars" style={{ transform: 'rotate(90deg)' }}></i> */}
                        {/* {darkMode ?
                                <i className="fad fa-sun"></i>
                                :
                                <i className="fad fa-moon"></i>
                            }
                            <span className='ms-2'>{darkMode ? 'Light' : 'Dark'} Mode</span> */}

                    </ArticlesButton>

                </div>

                {/* <NoSessionCard
                        text={'Please sign in to access a user balance and have your score on the leaderboard.'}
                        className="mb-2"
                        autoShow
                    /> */}

                <div className='mb-2'><BetAmountButton /></div>

                <OnlineBalance
                    redeemBall={redeemBall}
                />

                <OfflineBalance
                // redeemBall={redeemBall}
                />

                {/* TODO */}
                {/* <GameScoreboard game="Plinko" /> */}

                <div className='d-flex flex-wrap'>
                    {/* <GameMenuPrimaryButtonGroup
                        useStore={useStore}
                        type="Landing"
                        SettingsOverride={<></>}
                        // LeaveGameOverride={<></>}
                    /> */}
                </div>

                <ReturnToLauncherButton />

            </div>

        </div >
    )

}