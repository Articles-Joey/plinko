"use client";

import Box from "@mui/material/Box";
import { useStore } from "@/hooks/useStore";
import { useWallet } from "@/hooks/useWallet";
import { useOfflineWallet } from "@/hooks/useOfflineWallet";
import { useRedeemBall } from "@/hooks/useRedeemBall";
import useTouchControlsStore from "@/hooks/useTouchControlsStore";
import RedeemBallButton from "./RedeemBallButton";
import BetAmountButton from "./BetAmountButton";

const pointsSx = {
    display: "inline-block",
    fontSize: "0.75rem",
    fontWeight: 700,
    lineHeight: 1,
    px: "0.65em",
    py: "0.35em",
    borderRadius: "0.375rem",
    bgcolor: "#000",
    color: "#fff",
    ml: "0.25rem",
};

export default function TouchControlsOverlay() {
    const redeemBall = useRedeemBall();
    const wallet = useWallet((state) => state.wallet);
    const offlineWallet = useOfflineWallet((state) => state.wallet);
    const showMenu = useStore((state) => state.showMenu);
    const sidebar = useStore((state) => state.sidebar);
    const touchControlsEnabled = useTouchControlsStore((state) => state.enabled);

    if (showMenu || (!touchControlsEnabled && sidebar)) return null;

    return (
        <Box sx={{
            position: "absolute",
            bottom: 10,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "rgba(0, 100, 17, 0.5)",
            borderRadius: "20px",
            p: "0.5rem",
        }}>
            <Box>
                <RedeemBallButton redeemBall={redeemBall} />
                <Box component="span" sx={{ ...pointsSx, mr: "1.5rem" }}>{wallet?.total} Points</Box>
                <RedeemBallButton redeemBall={redeemBall} offline />
                <Box component="span" sx={pointsSx}>{offlineWallet?.total} Points</Box>
            </Box>
            <Box sx={{ position: "absolute", top: -40, left: "50%", transform: "translateX(-50%)" }}>
                <BetAmountButton />
            </Box>
        </Box>
    );
}
