"use client";

import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import B from "@articles-media/articles-gamepad-helper/dist/img/Xbox UI/B.svg";
import { useStore } from "@/hooks/useStore";
import { useAudioStore } from "@/hooks/useAudioStore";
import { useControlsStore } from "@/hooks/useControlsStore";
import { useModalNavigation } from "@/hooks/useModalNavigation";
import ArticlesModal from "./ArticlesModal";
import ArticlesButton from "./Button";
import ControlsPanel from "./ControlsPanel";

export default function SettingsModal({ show = true, setShow }) {
    const [showModal, setShowModal] = useState(true);
    const [tab, setTab] = useState("Graphics");
    const darkMode = useStore((state) => state.darkMode);
    const toggleDarkMode = useStore((state) => state.toggleDarkMode);
    const graphicsQuality = useStore((state) => state.graphicsQuality);
    const setGraphicsQuality = useStore((state) => state.setGraphicsQuality);
    const sceneOrientation = useStore((state) => state.sceneOrientation);
    const setSceneOrientation = useStore((state) => state.setSceneOrientation);
    const audioSettings = useAudioStore((state) => state.audioSettings);
    const setAudioSettings = useAudioStore((state) => state.setAudioSettings);
    const elementsRef = useRef([]);
    useModalNavigation(elementsRef, () => setShowModal(false));

    return (
        <ArticlesModal
            title="Game Settings"
            show={show && showModal}
            centered={false}
            setShow={(visible) => { setShow(visible); setShowModal(true); }}
            sx={{ p: 0 }}
            footerOverride={(setOpen) => (
                <>
                    <ArticlesButton
                        ref={(element) => { elementsRef.current[0] = element; }}
                        variant="outline-dark"
                        onClick={() => setOpen(false)}
                        startIcon={<Box component="img" src={B.src} alt="" sx={{ width: 24 }} />}
                    >
                        Close
                    </ArticlesButton>
                    <ArticlesButton
                        ref={(element) => { elementsRef.current[1] = element; }}
                        variant="outline-danger"
                        sx={{ ml: 2 }}
                        onClick={() => {
                            useControlsStore.getState().resetControls();
                            useAudioStore.getState().resetAudioSettings();
                        }}
                    >
                        Reset
                    </ArticlesButton>
                </>
            )}
        >
            <Tabs value={tab} onChange={(_, value) => setTab(value)} aria-label="Game settings">
                {["Graphics", "Controls", "Audio"].map((item) => <Tab key={item} value={item} label={item} />)}
            </Tabs>
            <Divider />
            <Box sx={{ p: 1 }}>
                {tab === "Graphics" && (
                    <>
                        <FormControlLabel control={<Switch checked={Boolean(darkMode)} onChange={toggleDarkMode} />} label="Dark Mode" />
                        <Typography sx={{ fontSize: "0.875rem", mt: 1 }}>Dark Mode changes the game's color scheme to be easier on the eyes in low light environments.</Typography>
                        <Divider sx={{ my: 1 }} />
                        <Typography>Graphics Quality</Typography>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            {["Low", "Medium", "High"].map((quality) => (
                                <ArticlesButton key={quality} small active={graphicsQuality === quality} onClick={() => setGraphicsQuality(quality)}>{quality}</ArticlesButton>
                            ))}
                        </Box>
                        <Typography sx={{ fontSize: "0.875rem", mt: 1 }}>Graphics Quality changes the quality of the game's graphics to suit your preference.</Typography>
                        <Divider sx={{ my: 1 }} />
                        <Typography>Scene Orientation</Typography>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            {["Flat", "Upright"].map((orientation) => (
                                <ArticlesButton key={orientation} small active={sceneOrientation === orientation} onClick={() => setSceneOrientation(orientation)}>{orientation}</ArticlesButton>
                            ))}
                        </Box>
                        <Typography sx={{ fontSize: "0.875rem", mt: 1 }}>Scene orientation changes the orientation of the game scene to suit your preference.</Typography>
                    </>
                )}
                {tab === "Controls" && <ControlsPanel />}
                {tab === "Audio" && ["game_volume", "music_volume"].map((key) => (
                    <Box key={key}>
                        <Typography id={key}>{key === "game_volume" ? "Game Volume" : "Music Volume"}</Typography>
                        <Slider
                            aria-labelledby={key}
                            value={audioSettings[key]}
                            min={0}
                            max={100}
                            onChange={(_, value) => setAudioSettings({ ...audioSettings, [key]: value })}
                        />
                    </Box>
                ))}
            </Box>
        </ArticlesModal>
    );
}
