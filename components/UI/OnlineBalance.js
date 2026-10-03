"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useStore } from "@/hooks/useStore";
import useUserToken from '@articles-media/articles-dev-box/useUserToken';
import useUserDetails from '@articles-media/articles-dev-box/useUserDetails';
import ArticlesButton from "@/components/UI/Button";

import Countdown from 'react-countdown';
import { add, differenceInHours, format } from 'date-fns';
import { useWallet } from "@/hooks/useWallet";
import { useEffect, useState } from "react";

export default function OnlineBalance({
    redeemBall,
}) {

    const wallet = useWallet(state => state.wallet);
    const setWallet = useWallet(state => state.setWallet);

    const [expanded, setExpanded] = useState(true);

    const betAmount = useStore(state => state.betAmount);
    const balls = useStore(state => state.balls);

    const {
        data: userToken,
        error: userTokenError,
        isLoading: userTokenLoading,
        mutate: userTokenMutate
    } = useUserToken("3017");

    const {
        data: userDetails,
        error: userDetailsError,
        isLoading: userDetailsLoading,
        mutate: userDetailsMutate
    } = useUserDetails({
        token: userToken
    });

    function getBalance() {
        fetch('/api/user/wallet')
            .then(async (res) => {
                if (!res.ok) {
                    const error = await res.text();
                    throw new Error(error || 'Fetch error');
                }
                return res.json();
            })
            .then(data => {
                console.log(data)
                setWallet(data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {

        if (userDetails?.user_id) {
            getBalance()
        }

    }, [userDetails?.user_id])

    function claim() {
        fetch('/api/user/claim', { method: 'POST' })
            .then(async (res) => {
                if (!res.ok) {
                    const error = await res.text();
                    throw new Error(error || 'Fetch error');
                }
                return res.json();
            })
            .then(data => {
                console.log("Claim Response:", data)
                setWallet({
                    ...wallet,
                    total: wallet.total + 100
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", minWidth: 0, bgcolor: "game.card", border: 1, borderColor: "divider", borderRadius: "0.375rem", backgroundImage: "none", mb: "0.5rem" }}>

            <Box
                sx={{ px: "0.5rem", py: "0.5rem", borderBottom: 1, borderColor: "divider", bgcolor: "rgba(0, 0, 0, 0.03)", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
                onClick={() => setExpanded(!expanded)}

            >

                <Typography component="h6" variant="subtitle2" sx={{ mb: "0" }}>
                    {expanded ? <ExpandMoreIcon sx={{ mr: "0.5rem", verticalAlign: "middle" }} /> : <ChevronRightIcon sx={{ mr: "0.5rem", verticalAlign: "middle" }} />}
                    Online Balance:
                </Typography>

                <Box sx={{ display: "inline-block", px: "0.65em", py: "0.35em", fontSize: "0.75em", fontWeight: 700, lineHeight: 1, textAlign: "center", whiteSpace: "nowrap", verticalAlign: "baseline", borderRadius: "0.375rem", bgcolor: "#212529", color: "#fff", boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.25), 0 2px 3px rgba(0, 0, 0, 0.2)" }}>
                    {wallet?.total}
                </Box>

            </Box>

            {expanded && (
                <>
                    {userDetails?.user_id && <>
                        <Box sx={{ p: "0.5rem", pb: "0" }}>

                            <ArticlesButton
                                sx={{ width: "100%" }}
                                onClick={() => {
                                    redeemBall()
                                }}
                            >
                                <Box component="span">Redeem Ball</Box>
                                <Box component="span" sx={{ ml: "0.5rem", display: "inline-block", px: "0.65em", py: "0.35em", fontSize: "0.75em", fontWeight: 700, lineHeight: 1, textAlign: "center", whiteSpace: "nowrap", verticalAlign: "baseline", borderRadius: "0.375rem", bgcolor: "#212529", color: "#fff", boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.25), 0 2px 3px rgba(0, 0, 0, 0.2)" }}>
                                    -{betAmount} Points
                                </Box>
                            </ArticlesButton>

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
                                    differenceInHours(new Date(), new Date(wallet?.last_claim)) < 24
                                }
                                sx={{ mb: "0.25rem", width: "100%" }}
                                onClick={() => {
                                    claim()
                                }}
                            >
                                Claim 100 Points
                            </ArticlesButton>

                            <Box sx={{ lineHeight: 1.25 }}>
                                {wallet?.last_claim && <Box><Box component="small">Next claim {format(add(new Date(wallet?.last_claim), { hours: 24 }), 'MM/dd/yy hh:mmaa')}</Box></Box>}
                            </Box>

                        </Box>
                    </>}

                    <Box sx={{ px: "0.5rem", py: "0.25rem", borderTop: 1, borderColor: "divider", display: "flex" }}>

                        <ArticlesButton
                            sx={{ flexGrow: 1 }}
                            onClick={() => {
                                if (!userDetails?.user_id) {
                                    window.location.href = `${process.env.NEXT_PUBLIC_LOCAL_ACCOUNTS_ADDRESS}/login?redirect=${encodeURIComponent(window.location.href)}&type=subdomain`;
                                } else {
                                    window.location.href = `/api/signout?redirect=${encodeURIComponent(window.location.href)}&type=subdomain`;
                                }
                            }}
                        >
                            {!userDetails?.user_id ?
                                'Login'
                                :
                                'Logout'
                            }
                        </ArticlesButton>

                        {userDetails?.user_id && <>
                            <ArticlesButton
                                aria-label="Refresh online balance"
                                onClick={() => {
                                    getBalance()
                                }}
                            >
                                <RefreshIcon fontSize="small" />
                            </ArticlesButton>
                        </>}

                    </Box>
                </>
            )}

        </Box>
    )
}
