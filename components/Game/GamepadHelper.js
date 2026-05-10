import { GamepadKeyboard, PieMenu } from '@articles-media/articles-gamepad-helper';

import { useStore } from "@/hooks/useStore"

export default function GamepadHelper() {

    const setShowSettingsModal = useStore(state => state.setShowSettingsModal)
    const setShowCreditsModal = useStore(state => state.setShowCreditsModal)
    const setShowInfoModal = useStore(state => state.setShowInfoModal)

    const darkMode = useStore(state => state.darkMode)
    const toggleDarkMode = useStore(state => state.toggleDarkMode)

    const betAmount = useStore(state => state.betAmount);
    const setBetAmount = useStore(state => state.setBetAmount);

    return (
        <>
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
                menuItemRadius={160}
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
                            // addBall({
                            //     type: "Offline"
                            // })
                            // setOfflineWallet({
                            //     ...offlineWallet,
                            //     total: (offlineWallet?.total || 0) - 10
                            // })
                            redeemBall(true)
                        }
                    },
                    {
                        label: `Decrease Bet Amount`,
                        icon: 'fad fa-palette',
                        callback: () => {
                            if (betAmount - 10 >= 1) {
                                setBetAmount(betAmount - 10)
                            }
                        }
                    },
                    {
                        label: `Increase Bet Amount`,
                        icon: 'fad fa-palette',
                        callback: () => {
                            setBetAmount(betAmount + 10)
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
        </>
    )
}