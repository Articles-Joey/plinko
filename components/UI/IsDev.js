"use client";

import Box from "@mui/material/Box";
import { useEffect, useState } from "react";

export default function IsDev({ className, noOutline, children, inline }) {
    const userReduxState = false;
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);

    if (!children || !userReduxState?.roles?.isDev || !isMounted) return null;

    return (
        <Box className={className} sx={{ display: inline ? "inline-block" : "block", outline: noOutline ? "none" : undefined }}>
            {children}
        </Box>
    );
}
