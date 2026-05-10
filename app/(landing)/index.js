"use client"
import { Suspense, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

import ArticlesButton from '@/components/UI/Button';
import useFullscreen from '@articles-media/articles-dev-box/useFullscreen';
import { useStore } from '@/hooks/useStore';
import { useWallet } from '@/hooks/useWallet';
import classNames from 'classnames';

// const Ad = dynamic(() => import('components/Ads/Ad'), {
//     ssr: false,
// });
const GameCanvas = dynamic(() => import('@/components/Game/GameCanvas'), {
    ssr: false,
    loading: () => <div className='w-100 h-100 d-flex justify-content-center align-items-center bg-black text-white'>
        <i className="fas fa-spinner fa-spin"></i>
        <span>Loading...</span>
    </div>,
});

import { useOfflineWallet } from '@/hooks/useOfflineWallet';
import { useRedeemBall } from '@/hooks/useRedeemBall';
import RedeemBallButton from '@/components/UI/RedeemBallButton';
import BetAmountButton from '@/components/UI/BetAmountButton';
import { useCameraStore } from '@/hooks/useCameraStore';
import GameMenu from '@articles-media/articles-dev-box/GameMenu';
import GameMenuContent from '@/components/UI/GameMenuContent';
import GamepadHelper from '@/components/Game/GamepadHelper';

const ReturnToLauncherButton = dynamic(() =>
    import('@articles-media/articles-dev-box/ReturnToLauncherButton'),
    { ssr: false }
);

export default function PlinkoPage(props) {

    const redeemBall = useRedeemBall()

    const { wallet } = useWallet()

    const offlineWallet = useOfflineWallet(state => state.wallet);

    const showMenu = useStore(state => state.showMenu);
    const setShowMenu = useStore(state => state.setShowMenu);
    const sceneKey = useStore(state => state.sceneKey);
    const sidebar = useStore(state => state.sidebar);

    return (
        <div
            className={classNames(
                `${process.env.NEXT_PUBLIC_GAME_KEY}-game-page`,
                {
                    'menu-open': showMenu,
                    'fullscreen': useFullscreen().isFullscreen,
                    'show-sidebar': sidebar,
                }
            )}
            id={`${process.env.NEXT_PUBLIC_GAME_KEY}-game-page`}
        >

            <Suspense><GamepadHelper /></Suspense>

            <GameMenu
                useStore={useStore}
                LeftPanelContent={GameMenuContent}
                menuBarConfig={{
                    style: "Corner Button",
                    menuBarButtonPosition: "Left"
                }}
                sidebarConfig={{
                    style: "Floating Panel",
                }}
            />

            <div className="touch-controls-ui">

                {!showMenu && <div className='redeem-buttons'>
                    <RedeemBallButton
                        className={""}
                        redeemBall={redeemBall}
                    />
                    <div className="badge bg-black me-4 ms-1">
                        {wallet?.total} Points
                    </div>

                    <RedeemBallButton
                        className={""}
                        redeemBall={redeemBall}
                        offline={true}
                    />
                    <div className="badge bg-black ms-1">
                        {offlineWallet?.total} Points
                    </div>
                </div>}

                <div className='bet-amount-button'>
                    <BetAmountButton />
                </div>

            </div>

            <div
                className='canvas-wrap'
                id="game-canvas"
            >

                <GameCanvas
                    key={sceneKey}
                />

            </div>

        </div >
    )
}

function LogCameraLocationButton() {

    // const { camera } = useThree();
    const cameraPosition = useCameraStore(state => state.cameraPosition);
    const cameraTarget = useCameraStore(state => state.cameraTarget);

    return (
        <ArticlesButton
            small
            className="w-100"
            onClick={() => {
                console.log("Camera position:", cameraPosition);
                console.log("Camera target:", cameraTarget);
            }}
        >
            <span className='ms-1'>Log Camera Location</span>

        </ArticlesButton>
    )

}