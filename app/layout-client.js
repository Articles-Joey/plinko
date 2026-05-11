"use client"
import { Suspense } from 'react';

import packageInfo from '@/package.json';

import { useStore } from '@/hooks/useStore';
import { useAudioStore } from '@/hooks/useAudioStore';
import useTouchControlsStore from '@/hooks/useTouchControlsStore';
import { useSocketStore } from '@/hooks/useSocketStore';

import DarkModeHandler from "@articles-media/articles-dev-box/DarkModeHandler";
import GlobalBody from '@articles-media/articles-dev-box/GlobalBody';
// import ToontownModeHandler from '@articles-media/articles-dev-box/ToontownModeHandler';
import GlobalClientModals from '@articles-media/articles-dev-box/GlobalClientModals';
import ArticlesButton from '@/components/UI/Button';
import ControlsPanel from '@/components/UI/ControlsPanel';
import { useControlsStore } from '@/hooks/useControlsStore';

// import ModelCacheDebug from '@/components/UI/ModelCacheDebug';

export default function LayoutClient({ children }) {

    // const theme = useStore(state => state.theme);
    // const hasHydrated = useStore(state => state._hasHydrated)
    // const darkMode = useStore(state => state.darkMode)
    // const setDarkMode = useStore(state => state.setDarkMode)

    // useEffect(() => {

    //     if (!hasHydrated) return;

    //     if (theme == null) {
    //         const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    //         useStore.getState().setTheme(prefersDark ? "Dark" : "Light");
    //     }

    //     if (theme == "Dark") {
    //         document.body.setAttribute("data-bs-theme", 'dark');
    //     } else {
    //         document.body.setAttribute("data-bs-theme", 'light');
    //     }

    // }, [theme, hasHydrated]);

    const sceneOrientation = useStore(state => state.sceneOrientation);
    const setSceneOrientation = useStore(state => state.setSceneOrientation);

    return (
        <>
            <GlobalBody />
            <DarkModeHandler
                useStore={useStore}
            />
            <Suspense>
                <GlobalClientModals
                    useStore={useStore}
                    useAudioStore={useAudioStore}
                    useTouchControlsStore={useTouchControlsStore}
                    // useSocketStore={useSocketStore}
                    packageInfo={packageInfo}
                    settingsModalConfig={{
                        tabs: {
                            'Graphics': {
                                darkMode: true,
                                landingAnimation: true,
                                children: <>
                                    <div className="">
                                        <div className="">Scene Orientation</div>
                                        <div className="d-flex align-items-center">
                                            <ArticlesButton
                                                className=""
                                                small
                                                active={sceneOrientation == "Flat"}
                                                onClick={() => {
                                                    setSceneOrientation("Flat");
                                                }}
                                            >
                                                Flat
                                            </ArticlesButton>
                                            <ArticlesButton
                                                className=""
                                                small
                                                active={sceneOrientation == "Upright"}
                                                onClick={() => {
                                                    setSceneOrientation("Upright");
                                                }}
                                            >
                                                Upright
                                            </ArticlesButton>
                                        </div>
                                        <div className="small mt-2">
                                            {`SceneOrientation changes the orientation of the game scene to suit your preference.`}
                                        </div>
                                    </div>
                                </>
                            },
                            'Audio': {
                                sliders: [
                                    ...useAudioStore.getState().audioSettings ?
                                        Object.keys(useAudioStore.getState().audioSettings).filter(key => key !== "enabled").map(key => ({
                                            key,
                                            label: key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                                        }))
                                        :
                                        [],
                                ]
                            },
                            'Controls': {
                                touchControls: true,
                                ControlsPanel: <ControlsPanel />
                                // TODO - Fix controls
                                // defaultKeyBindings: [
                                //     {
                                //         action: 'Redeem Online Ball',
                                //         defaultKeyboardKey: '1'
                                //     },
                                //     {
                                //         action: 'Claim Online Points',
                                //         defaultKeyboardKey: '2'
                                //     },
                                //     {
                                //         action: 'Redeem Offline Ball',
                                //         defaultKeyboardKey: '3'
                                //     },
                                //     {
                                //         action: 'Claim Offline Points',
                                //         defaultKeyboardKey: '4'
                                //     },
                                // ]
                            },
                            // 'Multiplayer': {
                            //     serverUrl: true,
                            // },
                            'Other': {
                                // toontownMode: true,
                            },
                            'Debug': {
                                children: <>
                                    {/* <ModelCacheDebug /> */}
                                </>,
                            }
                        },
                        reset: () => {
                            console.log("123?")
                            useControlsStore.getState().resetControls();
                            useAudioStore.getState().resetAudioSettings();
                        }
                    }}
                    infoModalConfig={{
                        previewImage: "img/preview.png",
                    }}
                />
            </Suspense>
        </>
    );
}
