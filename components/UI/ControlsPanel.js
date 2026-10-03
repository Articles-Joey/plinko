"use client";

import Box from "@mui/material/Box";
import { useState, useEffect, useCallback } from 'react';
import ArticlesButton from "./Button";
import { useControlsStore } from '@/hooks/useControlsStore';

const ACTIONS = [
    { action: 'Redeem Online Ball' },
    { action: 'Claim Online Points' },
    { action: 'Redeem Offline Ball' },
    { action: 'Claim Offline Points' },
];

export default function ControlsPanel() {
    const mappings = useControlsStore((s) => s.mappings);
    const setMapping = useControlsStore((s) => s.setMapping);
    const clearMapping = useControlsStore((s) => s.clearMapping);

    const [listening, setListening] = useState(null); // action name being rebound

    const startListening = (action) => setListening(action);
    const cancelListening = () => setListening(null);

    const handleKeyDown = useCallback((e) => {
        if (!listening) return;
        e.preventDefault();
        if (e.key === 'Escape') {
            cancelListening();
            return;
        }

        if (e.key.toLowerCase() === 'r') {
            alert("'R' is reserved for Reload Scene and cannot be rebound.");
            return;
        }

        setMapping(listening, e.key);
        setListening(null);
    }, [listening, setMapping]);

    useEffect(() => {
        if (!listening) return;
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [listening, handleKeyDown]);

    return (
        <Box sx={{ border: 1, borderColor: "divider", p: "0", mb: "1rem" }}>
            {listening && (
                <Box
                    sx={{"p":"0.5rem","textAlign":"center","fontSize":"0.875em", cursor: "pointer"}}

                    onClick={cancelListening}
                >
                    Press any key for <strong>{listening}</strong> &mdash; or click here to cancel
                </Box>
            )}
            {ACTIONS.map(({ action }) => {
                const key = mappings[action];
                const isListening = listening === action;
                return (
                    <Box key={action}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: 1, borderColor: "divider", p: "0.25rem" }}>

                            <Box>
                                <Box>{action}</Box>
                            </Box>

                            <Box sx={{"display":"flex","alignItems":"center", gap: "0.25rem"}}>

                                <Box sx={{ display: "inline-block", px: "0.65em", py: "0.35em", fontSize: "0.75em", fontWeight: 700, lineHeight: 1, borderRadius: "0.375rem", mr: "0.25rem", bgcolor: isListening ? "warning.main" : "primary.main", color: "#212529", "&:hover": { filter: "brightness(0.9)" } }}>
                                    {isListening ? '...' : (key ?? 'None')}
                                </Box>

                                {key && !isListening && (
                                    <ArticlesButton
                                        small
                                        onClick={() => clearMapping(action)}
                                    >
                                        Clear
                                    </ArticlesButton>
                                )}

                                <ArticlesButton
                                    small
                                    active={isListening}
                                    onClick={() => isListening ? cancelListening() : startListening(action)}
                                >
                                    {isListening ? 'Cancel' : 'Change Key'}
                                </ArticlesButton>

                            </Box>
                        </Box>
                    </Box>
                );
            })}
        </Box>
    );
}
