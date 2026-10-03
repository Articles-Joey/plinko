"use client";

import { PieMenu } from "@articles-media/articles-gamepad-helper";
import Box from "@mui/material/Box";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InfoIcon from "@mui/icons-material/Info";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import PaletteIcon from "@mui/icons-material/Palette";
import PublicIcon from "@mui/icons-material/Public";
import SignalWifiOffIcon from "@mui/icons-material/SignalWifiOff";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useStore } from "@/hooks/useStore";
import { useRedeemBall } from "@/hooks/useRedeemBall";

export default function GamepadHelper() {
    const setShowSettingsModal = useStore((state) => state.setShowSettingsModal);
    const setShowCreditsModal = useStore((state) => state.setShowCreditsModal);
    const darkMode = useStore((state) => state.darkMode);
    const toggleDarkMode = useStore((state) => state.toggleDarkMode);
    const betAmount = useStore((state) => state.betAmount);
    const setBetAmount = useStore((state) => state.setBetAmount);
    const redeemBall = useRedeemBall();

    const options = [
        { label: "Settings", Icon: SettingsIcon, callback: () => setShowSettingsModal(!useStore.getState().showSettingsModal) },
        { label: "Go Back", Icon: ArrowBackIcon, callback: () => window.history.back() },
        { label: "Credits", Icon: InfoIcon, callback: () => setShowCreditsModal(true) },
        { label: "Game Launcher", Icon: SportsEsportsIcon, callback: () => { window.location.href = "https://games.articles.media"; } },
        { label: `${darkMode ? "Light" : "Dark"} Mode`, Icon: PaletteIcon, callback: toggleDarkMode },
        { label: "Redeem Online Ball", Icon: PublicIcon, callback: () => redeemBall() },
        { label: "Redeem Offline Ball", Icon: SignalWifiOffIcon, callback: () => redeemBall(true) },
        { label: "Decrease Bet Amount", Icon: RemoveIcon, callback: () => { if (betAmount - 10 >= 1) setBetAmount(betAmount - 10); } },
        { label: "Increase Bet Amount", Icon: AddIcon, callback: () => setBetAmount(betAmount + 10) },
    ];

    return (
        <PieMenu
            menuItemRadius={160}
            options={options.map(({ label, Icon, callback }) => ({
                label: (
                    <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}>
                        <Icon fontSize="small" />
                        {label}
                    </Box>
                ),
                callback,
            }))}
            onFinish={(event) => event.callback?.()}
        />
    );
}
