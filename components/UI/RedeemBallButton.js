"use client";

import PublicIcon from "@mui/icons-material/Public";
import SignalWifiOffIcon from "@mui/icons-material/SignalWifiOff";
import { useStore } from "@/hooks/useStore";
import { useWallet } from "@/hooks/useWallet";
import { useOfflineWallet } from "@/hooks/useOfflineWallet";
import ArticlesButton from "./Button";

export default function RedeemBallButton({ className, sx, redeemBall, offline, sidebar }) {
    const betAmount = useStore((state) => state.betAmount);
    const onlineWallet = useWallet((state) => state.wallet);
    const offlineWallet = useOfflineWallet((state) => state.wallet);
    const isDisabled = offline ? offlineWallet.total < betAmount : onlineWallet.total < betAmount;

    return (
        <ArticlesButton
            className={className}
            sx={sx}
            small
            disabled={isDisabled}
            onClick={() => redeemBall(Boolean(offline))}
            startIcon={sidebar ? undefined : offline ? <SignalWifiOffIcon /> : <PublicIcon />}
        >
            {sidebar ? "Redeem Ball" : offline ? "Offline" : "Online"}
        </ArticlesButton>
    );
}
