"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SyncIcon from "@mui/icons-material/Sync";
import Logo from "@/app/icon.png";
import { useStore } from "@/hooks/useStore";
import { useRedeemBall } from "@/hooks/useRedeemBall";
import ArticlesButton from "./Button";
import DropdownMenu from "./DropdownMenu";
import BetAmountButton from "./BetAmountButton";
import OfflineBalance from "./OfflineBalance";
import OnlineBalance from "./OnlineBalance";
import GameMenuPrimaryButtonGroup from "@articles-media/articles-dev-box/GameMenuPrimaryButtonGroup";

const ReturnToLauncherButton = dynamic(() => import("@articles-media/articles-dev-box/ReturnToLauncherButton"), { ssr: false });
const cameraLocations = [
    { name: "Default", position: [0, 20, 180], flatPosition: [100, 100, 100] },
    { name: "Birds Eye View", position: [0, 20, 180], flatPosition: [0, 120, 0] },
    { name: "Boardwalk", position: [0.68, -89.63, 50.77], flatPosition: [0, 55, 95] },
    { name: "Ships View", position: [-0.49, -77.43, -25.66], flatPosition: [0, 30, -120] },
    { name: "Rooftop Camera", position: [-42.58, -123.81, 97.85] },
];

export default function GameMenuContent() {
    const redeemBall = useRedeemBall();
    const setTeleportLocation = useStore((state) => state.setTeleportLocation);
    const setTeleportTarget = useStore((state) => state.setTeleportTarget);
    const setTeleportZoom = useStore((state) => state.setTeleportZoom);
    const setShowMenu = useStore((state) => state.setShowMenu);
    const reloadScene = useStore((state) => state.reloadScene);
    const controlType = useStore((state) => state.controlType);
    const setControlType = useStore((state) => state.setControlType);
    const sceneOrientation = useStore((state) => state.sceneOrientation);
    const toggleSceneOrientation = useStore((state) => state.toggleSceneOrientation);
    const setSceneOrientation = useStore((state) => state.setSceneOrientation);

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ p: "1rem" }}>
                <Box sx={{ display: "flex", alignItems: "end", justifyContent: "center", mb: "0.5rem" }}>
                    <Image src={Logo.src} alt="Plinko Logo" width={50} height={50} />
                    <Typography component="h1" variant="h4" sx={{ ml: "8px" }}>{process.env.NEXT_PUBLIC_GAME_NAME}</Typography>
                </Box>
                <Box sx={{ mb: "1rem", display: "flex", flexWrap: "wrap" }}>
                    <GameMenuPrimaryButtonGroup useStore={useStore} useRouter={useRouter} type="GameMenu" LeaveGameOverride={<></>} />
                    <ArticlesButton small sx={{ width: "50%" }} onClick={reloadScene}>Reload Game</ArticlesButton>
                    <GameMenuPrimaryButtonGroup useStore={useStore} useRouter={useRouter} type="Landing" SettingsOverride={<></>} />
                    <Box sx={{ width: "50%" }}>
                        <DropdownMenu
                            sx={{ width: "100%" }}
                            title={<Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}><CameraAltIcon fontSize="small" />Camera</Box>}
                        >
                            {(closeMenu) => cameraLocations.map((location) => (
                                <MenuItem
                                    key={location.name}
                                    onClick={() => {
                                        if (sceneOrientation === "Flat") {
                                            setTeleportLocation(location.flatPosition);
                                            if (location.name === "Rooftop Camera") {
                                                setTeleportTarget([180.9748986487864, 54.748483681556614, 93.92405204637862]);
                                                setTeleportZoom(0.1);
                                            } else {
                                                setTeleportTarget([0, 0, 0]);
                                                setTeleportZoom(170);
                                            }
                                        } else {
                                            setTeleportLocation(location.position);
                                            setTeleportTarget([0, 0, 0]);
                                            setTeleportZoom(170);
                                        }
                                        closeMenu();
                                        setShowMenu(false);
                                    }}
                                >
                                    {location.name}
                                </MenuItem>
                            ))}
                        </DropdownMenu>
                    </Box>
                    <ArticlesButton
                        small
                        sx={{ width: "50%" }}
                        startIcon={<SyncIcon />}
                        onClick={() => {
                            if (controlType === "Orbit") {
                                setControlType("FPS");
                                setSceneOrientation("Flat");
                                setTimeout(() => setTeleportLocation([-42.58, -123.81, 97.85]), 1000);
                            } else {
                                setControlType("Orbit");
                            }
                        }}
                    >
                        <Box component="span" sx={{ fontSize: "0.65rem" }}>Control: {controlType}</Box>
                    </ArticlesButton>
                    <ArticlesButton small sx={{ width: "50%" }} disabled={controlType === "FPS"} onClick={toggleSceneOrientation} startIcon={<SyncIcon />}>
                        <Box component="span" sx={{ fontSize: "0.65rem" }}>Scene: {sceneOrientation}</Box>
                    </ArticlesButton>
                </Box>
                <Box sx={{ mb: "0.5rem" }}><BetAmountButton /></Box>
                <OnlineBalance redeemBall={redeemBall} />
                <OfflineBalance />
                <ReturnToLauncherButton />
            </Box>
        </Box>
    );
}
