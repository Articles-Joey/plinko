"use client";

import { Suspense } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import packageInfo from "@/package.json";
import { useStore } from "@/hooks/useStore";
import { useAudioStore } from "@/hooks/useAudioStore";
import useTouchControlsStore from "@/hooks/useTouchControlsStore";
import { useControlsStore } from "@/hooks/useControlsStore";
import DarkModeHandler from "@articles-media/articles-dev-box/DarkModeHandler";
import GlobalBody from "@articles-media/articles-dev-box/GlobalBody";
import GlobalClientModals from "@articles-media/articles-dev-box/GlobalClientModals";
import ArticlesButton from "@/components/UI/Button";
import ControlsPanel from "@/components/UI/ControlsPanel";
import HotkeyHandler from '@articles-media/articles-dev-box/HotkeyHandler';

export default function LayoutClient() {
    const sceneOrientation = useStore((state) => state.sceneOrientation);
    const setSceneOrientation = useStore((state) => state.setSceneOrientation);
    const audioSettings = useAudioStore((state) => state.audioSettings);

    return (
        <>
            <GlobalBody />
            <DarkModeHandler useStore={useStore} />
            <Suspense>
                <HotkeyHandler useStore={useStore} useHotkeys={useHotkeys} />
                <GlobalClientModals
                    useStore={useStore}
                    useAudioStore={useAudioStore}
                    useTouchControlsStore={useTouchControlsStore}
                    packageInfo={packageInfo}
                    settingsModalConfig={{
                        tabs: {
                            Graphics: {
                                darkMode: true,
                                landingAnimation: true,
                                children: (
                                    <Box>
                                        <Typography>Scene Orientation</Typography>
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            {["Flat", "Upright"].map((orientation) => (
                                                <ArticlesButton
                                                    key={orientation}
                                                    small
                                                    active={sceneOrientation === orientation}
                                                    onClick={() => setSceneOrientation(orientation)}
                                                >
                                                    {orientation}
                                                </ArticlesButton>
                                            ))}
                                        </Box>
                                        <Typography sx={{ fontSize: "0.875rem", mt: 1 }}>
                                            Scene orientation changes the orientation of the game scene to suit your preference.
                                        </Typography>
                                    </Box>
                                ),
                            },
                            Audio: {
                                sliders: Object.keys(audioSettings || {})
                                    .filter((key) => key !== "enabled")
                                    .map((key) => ({
                                        key,
                                        label: key.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
                                    })),
                            },
                            Controls: {
                                touchControls: true,
                                ControlsPanel: <ControlsPanel />,
                            },
                            Other: {},
                            Debug: { children: <></> },
                        },
                        reset: () => {
                            useControlsStore.getState().resetControls();
                            useAudioStore.getState().resetAudioSettings();
                        },
                    }}
                    infoModalConfig={{ previewImage: "img/preview.png" }}
                />
            </Suspense>
        </>
    );
}
