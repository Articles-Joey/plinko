"use client"
import { useStore } from '@/hooks/useStore';
import { useWallet } from '@/hooks/useWallet';

import { useOfflineWallet } from '@/hooks/useOfflineWallet';
import { useRedeemBall } from '@/hooks/useRedeemBall';
import RedeemBallButton from '@/components/UI/RedeemBallButton';
import BetAmountButton from '@/components/UI/BetAmountButton';
import useTouchControlsStore from '@/hooks/useTouchControlsStore';

export default function TouchControlsOverlay() {

    const redeemBall = useRedeemBall()

    const { wallet } = useWallet()

    const offlineWallet = useOfflineWallet(state => state.wallet);

    const showMenu = useStore(state => state.showMenu);

    const sidebar = useStore(state => state.sidebar);

    const touchControlsEnabled = useTouchControlsStore(state => state.enabled);

    return (
        <>
            {(
                !showMenu
                &&
                (touchControlsEnabled || !sidebar)
            ) &&
                <div className="touch-controls-ui">
                    <>

                        <div className='redeem-buttons'>
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
                        </div>

                        <div className='bet-amount-button'>
                            <BetAmountButton />
                        </div>

                    </>
                </div>
            }
        </>
    )

}