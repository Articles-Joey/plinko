"use client";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import PaymentsIcon from "@mui/icons-material/Payments";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArticlesButton from "./Button";
import DropdownMenu from "./DropdownMenu";
import { useOfflineWallet } from "@/hooks/useOfflineWallet";
import { useStore } from "@/hooks/useStore";
import { useWallet } from "@/hooks/useWallet";

const amounts = [1, 5, 10, 50, 100, 250, 500, 1000, 2500, 5000];

export default function BetAmountButton() {
    const offlineWallet = useOfflineWallet((state) => state.wallet);
    const onlineWallet = useWallet((state) => state.wallet);
    const betAmount = useStore((state) => state.betAmount);
    const setBetAmount = useStore((state) => state.setBetAmount);

    return (
        <DropdownMenu
            sx={{ width: "100%" }}
            title={<Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}><PaymentsIcon fontSize="small" />Bet: {betAmount}</Box>}
        >
            {(closeMenu) => [
                <Box key="custom" component="li" sx={{ p: "0.5rem", display: "flex" }}>
                    <TextField
                        type="number"
                        placeholder="Custom"
                        size="small"
                        value={betAmount}
                        sx={{ mr: "0.25rem" }}
                        slotProps={{ htmlInput: { "aria-label": "Custom bet amount" } }}
                        onChange={(event) => {
                            const value = parseInt(event.target.value);
                            if (!isNaN(value)) setBetAmount(value);
                            else if (event.target.value === "") setBetAmount("");
                        }}
                    />
                    <ArticlesButton aria-label="Decrease bet amount" sx={{ px: "0.5rem", minWidth: 0 }} onClick={() => setBetAmount(Math.max(1, (parseInt(betAmount) || 0) - 1))}>
                        <ArrowDropDownIcon />
                    </ArticlesButton>
                    <ArticlesButton aria-label="Increase bet amount" sx={{ px: "0.5rem", minWidth: 0 }} onClick={() => setBetAmount((parseInt(betAmount) || 0) + 1)}>
                        <ArrowDropUpIcon />
                    </ArticlesButton>
                </Box>,
                <Divider key="divider" />,
                ...amounts
                    .filter((amount) => (offlineWallet?.total || onlineWallet?.total || 0) >= amount)
                    .map((amount) => (
                        <MenuItem key={amount} onClick={() => { setBetAmount(amount); closeMenu(); }}>
                            ${new Intl.NumberFormat("en-US").format(amount)}
                        </MenuItem>
                    )),
            ]}
        </DropdownMenu>
    );
}
