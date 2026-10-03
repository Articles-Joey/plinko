"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import useFullscreen from "@articles-media/articles-dev-box/useFullscreen";
import GameMenu from "@articles-media/articles-dev-box/GameMenu";
import { useStore } from "@/hooks/useStore";
import GameMenuContent from "@/components/UI/GameMenuContent";
import GamepadHelper from "@/components/Game/GamepadHelper";
import TouchControlsOverlay from "@/components/UI/TouchControlsOverlay";

const GameCanvas = dynamic(() => import("@/components/Game/GameCanvas"), {
    ssr: false,
    loading: () => (
        <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", gap: 1, bgcolor: "#000", color: "#fff" }}>
            <CircularProgress size={20} color="inherit" />
            <Typography>Loading...</Typography>
        </Box>
    ),
});

export default function PlinkoPage() {
    const hasHydrated = useStore((state) => state._hasHydrated);
    const showMenu = useStore((state) => state.showMenu);
    const sceneKey = useStore((state) => state.sceneKey);
    const sidebar = useStore((state) => state.sidebar);
    const { isFullscreen } = useFullscreen();

    return (
        <Box
            id={`${process.env.NEXT_PUBLIC_GAME_KEY}-game-page`}
            className={[
                `${process.env.NEXT_PUBLIC_GAME_KEY}-game-page`,
                showMenu && "menu-open",
                isFullscreen && "fullscreen",
                sidebar && "show-sidebar",
            ].filter(Boolean).join(" ")}
            sx={{ position: "relative", display: "flex" }}
        >
            <Suspense><GamepadHelper /></Suspense>
            <GameMenu
                useStore={useStore}
                LeftPanelContent={GameMenuContent}
                menuBarConfig={{ style: "Corner Button", menuBarButtonPosition: "Left" }}
                sidebarConfig={{ style: "Floating Panel" }}
            />
            <Box
                id="game-canvas"
                sx={{
                    position: "relative",
                    width: "100vw",
                    height: "100vh",
                    "& canvas": { position: "absolute", width: "100%", height: "100%", left: 0, top: 0 },
                }}
            >
                <TouchControlsOverlay />
                {hasHydrated && <GameCanvas key={sceneKey} />}
            </Box>
        </Box>
    );
}
