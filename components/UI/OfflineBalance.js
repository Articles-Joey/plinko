"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArticlesButton from "./Button"
import { useStore } from "@/hooks/useStore"
import { useOfflineWallet } from "@/hooks/useOfflineWallet"
import { add, differenceInHours, format } from "date-fns"
import Countdown from "react-countdown"
import RedeemBallButton from "./RedeemBallButton"
import { useState } from "react"

export default function OfflineBalance() {

    const balls = useStore(state => state.balls);
    const resetBalls = useStore(state => state.resetBalls);
    const addBall = useStore(state => state.addBall);
    const setBetAmount = useStore(state => state.setBetAmount);

    const wallet = useOfflineWallet(state => state.wallet);
    const setWallet = useOfflineWallet(state => state.setWallet);
    const lastClaim = useOfflineWallet(state => state.lastClaim);
    const setLastClaim = useOfflineWallet(state => state.setLastClaim);

    const [expanded, setExpanded] = useState(true);

    const betAmount = useStore(state => state.betAmount);

    function redeemBall(offline) {

        addBall({
            type: "Offline"
        })
        setWallet({
            ...wallet,
            total: (wallet?.total || 0) - betAmount
        })

    }

    function claim() {

        setWallet({
            ...wallet,
            total: (wallet?.total || 0) + 100
        })

        setLastClaim(new Date())

    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", minWidth: 0, bgcolor: "game.card", border: 1, borderColor: "divider", borderRadius: "0.375rem", backgroundImage: "none", mb: "0.5rem" }}>

            <Box
                sx={{ px: "0.5rem", py: "0.5rem", borderBottom: 1, borderColor: "divider", bgcolor: "rgba(0, 0, 0, 0.03)", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
                onClick={() => setExpanded(!expanded)}

            >

                <Typography component="h6" variant="subtitle2" sx={{ mb: "0" }}>
                    {expanded ? <ExpandMoreIcon sx={{ mr: "0.5rem", verticalAlign: "middle" }} /> : <ChevronRightIcon sx={{ mr: "0.5rem", verticalAlign: "middle" }} />}
                    Offline Balance:
                </Typography>

                <Box sx={{ display: "inline-block", px: "0.65em", py: "0.35em", fontSize: "0.75em", fontWeight: 700, lineHeight: 1, textAlign: "center", whiteSpace: "nowrap", verticalAlign: "baseline", borderRadius: "0.375rem", bgcolor: "#212529", color: "#fff", boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.25), 0 2px 3px rgba(0, 0, 0, 0.2)" }}>
                    {wallet?.total}
                </Box>

            </Box>

            {expanded && (
                <>
                    <Box sx={{ p: "0.5rem", pb: "0", pt: "0.25rem" }}>

                        <Box sx={{ fontSize: "0.875em", textAlign: "center" }}>
                            {`Offline Play`}
                        </Box>

                        <RedeemBallButton
                            sx={{ width: "100%" }}
                            redeemBall={redeemBall}
                            offline={true}
                            sidebar={true}
                        />

                        <Box sx={{ fontSize: "0.875em", textAlign: "center" }}>
                            {`${balls.length || 0} Active Balls`}
                        </Box>

                    </Box>

                    <Divider sx={{ my: "0.25rem" }} />

                    <Box sx={{ p: "0.5rem", pt: "0.25rem" }}>

                        <Box sx={{ fontSize: "0.875em", display: "flex", justifyContent: "space-between" }}>

                            <Typography component="h6" variant="subtitle2" sx={{ mb: "0" }}>Next Claim</Typography>

                            <Box sx={{ display: "inline-block", px: "0.65em", py: "0.35em", fontSize: "0.75em", fontWeight: 700, lineHeight: 1, textAlign: "center", whiteSpace: "nowrap", verticalAlign: "baseline", borderRadius: "0.375rem", bgcolor: "#212529", color: "#fff", boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.25), 0 2px 3px rgba(0, 0, 0, 0.2)" }}>

                                {wallet?.last_claim && <Countdown daysInHours={true} date={add(new Date(wallet.last_claim), { hours: 24 })} />}
                            </Box>

                        </Box>

                        <Box><Box component="small">One claim per 24 hours</Box></Box>

                        <ArticlesButton
                            disabled={
                                (differenceInHours(new Date(), new Date(lastClaim)) < 24)
                                &&
                                lastClaim
                            }
                            sx={{ mb: "0.25rem", width: "100%" }}
                            onClick={() => {
                                claim()
                            }}
                        >
                            Claim 100 Points
                        </ArticlesButton>

                        <Box sx={{ lineHeight: 1.25 }}>
                            <Box>
                                <Box component="small">
                                    <Box component="span">Next claim: </Box>
                                    {lastClaim ? format(add(new Date(lastClaim), { hours: 24 }), 'MM/dd/yy hh:mmaa') : 'Ready'}
                                </Box>
                            </Box>
                        </Box>

                    </Box>

                    <Box sx={{ px: "0.5rem", py: "0.25rem", borderTop: 1, borderColor: "divider", display: "flex", justifyContent: "center" }}>

                        <ArticlesButton
                            variant="link"
                            sx={{ color: "text.primary" }}

                            onClick={() => {
                                setLastClaim(null)
                                setWallet({
                                    ...wallet,
                                    total: 100
                                })
                                resetBalls()
                                setBetAmount(10)
                            }}
                        >
                            Reset
                        </ArticlesButton>

                    </Box>
                </>
            )}

        </Box>
    )
}
