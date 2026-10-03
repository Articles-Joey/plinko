"use client";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import LinkIcon from "@mui/icons-material/Link";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useEffect, useState } from "react";

import ArticlesModal from "./ArticlesModal";

import ViewUserModal from "@/components/UI/ViewUserModal"
const games = []

import IsDev from "@/components/UI/IsDev";

const registeredGames = [
    'Four Frogs',
    'Race Game',
    'Eager Eagle',
    'Plinko',
    'Battle Trap',
    'Blackjack',
    'Ping Pong',
    'Tower Blocks',
    'Assets Gallery',
    'Tic Tac Toe',
    'Ocean Rings',
    'Maze',
    'School Run'
]

export default function GameInfoModal({
    show,
    setShow,
    credits
}) {

    const [showModal, setShowModal] = useState(true)

    const userReduxState = false

    const [showVideo, setShowVideo] = useState()

    useEffect(() => {

        if (!show.item) {
            setShow({
                ...show,
                item: games.find(game_obj => game_obj.name == show.game)
            })
        }

    }, [])

    return (
        <>

            <ArticlesModal
                title="Game Info"
                show={Boolean(show) && showModal}
                setShow={(visible) => { setShow(visible); setShowModal(true); }}
                sx={{ p: 0 }}
            >

                    {!registeredGames.includes(show.game) &&
                        <IsDev>
                            <Box sx={{ p: "1rem" }}>

                                {userReduxState?.roles?.isDev &&
                                    <Box sx={{ bgcolor: "#f8f9fa", border: 1, borderColor: "divider", p: "0.25rem" }}>
                                        Global game info modal does not have this game registered.
                                    </Box>
                                }

                            </Box>
                        </IsDev>
                    }

                    <Box sx={{ p: "1rem" }}>

                        <Box sx={{ fontWeight: 700, mb: "0.5rem" }}>
                            {show.game || 'No game property provided'}
                        </Box>

                        <Box>
                            {show?.item?.short_description}
                        </Box>

                    </Box>

                    <Divider />

                    {show?.item?.welcome &&
                        <Box sx={{ p: "1rem", py: "0.5rem", borderBottom: 1, borderColor: "divider" }}>

                            <b>Welcome to {show?.item?.name}</b>
                            <Box component="p" sx={{ fontSize: "0.875em", mb: "0.5rem" }}>
                                {show?.item?.welcome?.preview_text}
                            </Box>

                            <Box sx={{ position: "relative", width: "100%", "& > *": { position: "absolute", inset: 0, width: "100%", height: "100%" }, aspectRatio: "16 / 9" }}>
                                <img src={show?.item?.welcome?.preview_gif} alt="" />
                            </Box>

                        </Box>
                    }

                    <Divider />

                    {show.game == 'Battle Trap' &&
                        <Box sx={{ p: "1rem", py: "0.25rem" }}>

                            <Box sx={{ mb: "1rem" }}>
                                <b>Credits</b>
                            </Box>

                            <Box sx={{ display: "flex", alignItems: "center", mb: "1rem" }}>

                                <Box sx={{ mr: "1rem" }}>
                                    <LinkIcon sx={{ fontSize: "2rem" }} />
                                </Box>

                                <Box>
                                    <ViewUserModal
                                        user_id={"5e90cc96579a17440c5d7d52"}
                                        dangerousPopulate
                                    />
                                    <Box>Developer</Box>
                                </Box>

                            </Box>

                            <Box sx={{ display: "flex", alignItems: "center", mb: "1rem" }}>

                                <Box sx={{ mr: "1rem" }}>
                                    <LinkIcon sx={{ fontSize: "2rem" }} />
                                </Box>

                                <Box>
                                    <Box sx={{ fontWeight: 700 }}>Articles Media</Box>
                                    <Box>Publisher</Box>
                                </Box>

                            </Box>

                            <Box sx={{ display: "flex", mb: "1rem" }}>

                                <Box sx={{ mr: "1rem" }}>
                                    <LinkIcon sx={{ fontSize: "2rem" }} />
                                </Box>

                                <Box>
                                    <Box component="a" href="https://sketchfab.com/3d-models/low-poly-chopper-aec69c979166446eb2c8e1503f570d26" target='_blank' rel="noreferrer" sx={{ fontWeight: 700 }}>sketchfab.com/ArtyomOganesyan</Box>
                                    <Box sx={{ fontSize: "0.875em", color: "text.secondary" }}>Used for</Box>
                                    <ul>
                                        <li>Low Poly Chopper</li>
                                    </ul>
                                </Box>

                            </Box>

                            <Box sx={{ display: "flex", mb: "1rem" }}>

                                <Box sx={{ mr: "1rem" }}>
                                    <LinkIcon sx={{ fontSize: "2rem" }} />
                                </Box>

                                <Box>
                                    <Box component="a" href="https://sketchfab.com/supakorn.pim" target='_blank' rel="noreferrer" sx={{ fontWeight: 700 }}>sketchfab.com/supakorn.pim</Box>
                                    <Box sx={{ fontSize: "0.875em", color: "text.secondary" }}>Used for</Box>
                                    <ul>
                                        <li>Low Poly Scooter</li>
                                    </ul>
                                </Box>

                            </Box>

                            <Box sx={{ display: "flex", mb: "1rem" }}>

                                <Box sx={{ mr: "1rem" }}>
                                    <LinkIcon sx={{ fontSize: "2rem" }} />
                                </Box>

                                <Box>
                                    <Box component="a" href="https://sketchfab.com/1-3D.com" target='_blank' rel="noreferrer" sx={{ fontWeight: 700 }}>sketchfab.com/1-3D.com</Box>
                                    <Box sx={{ fontSize: "0.875em", color: "text.secondary" }}>Used for</Box>
                                    <ul>
                                        <li>Low Poly Tricycle</li>
                                    </ul>
                                </Box>

                            </Box>

                            <Box sx={{ display: "flex", mb: "1rem" }}>

                                <Box sx={{ mr: "1rem" }}>
                                    <LinkIcon sx={{ fontSize: "2rem" }} />
                                </Box>

                                <Box>
                                    <Box component="a" href="https://sketchfab.com/BeastSri" target='_blank' rel="noreferrer" sx={{ fontWeight: 700 }}>sketchfab.com/BeastSri</Box>
                                    <Box sx={{ fontSize: "0.875em", color: "text.secondary" }}>Used for</Box>
                                    <ul>
                                        <li>Low Poly Unicycle</li>
                                    </ul>
                                </Box>

                            </Box>

                            <Box sx={{ display: "flex", mb: "1rem" }}>

                                <Box sx={{ mr: "1rem" }}>
                                    <LinkIcon sx={{ fontSize: "2rem" }} />
                                </Box>

                                <Box>
                                    <Box component="a" href="https://sketchfab.com/SebastianScaini" target='_blank' rel="noreferrer" sx={{ fontWeight: 700 }}>sketchfab.com/SebastianScaini</Box>
                                    <Box sx={{ fontSize: "0.875em", color: "text.secondary" }}>Used for</Box>
                                    <ul>
                                        <li>Toilet Tricycle</li>
                                    </ul>
                                </Box>

                            </Box>

                        </Box>
                    }

                    {show?.item?.inspiration &&
                        <Box sx={{ p: "1rem", borderBottom: 1, borderColor: "divider" }}>
                            <Box sx={{ mb: "0.5rem", fontWeight: 700 }}>Inspiration</Box>
                            <Box>{show?.item?.inspiration?.text}</Box>
                            {show?.item?.inspiration?.video &&
                                <Box sx={{ position: "relative" }}>

                                    {!showVideo &&
                                        <Box
                                            sx={{ position: "absolute", inset: 0, zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                                            onClick={() => {
                                                setShowVideo(true)
                                            }}
                                        >
                                            <Box><YouTubeIcon sx={{ color: "red", fontSize: "4rem" }} /></Box>
                                            <Box>Play Video</Box>
                                        </Box>
                                    }

                                    <Box  sx={{ position: "relative", width: "100%", "& > *": { position: "absolute", inset: 0, width: "100%", height: "100%" }, aspectRatio: "16 / 9", bgcolor: "#212529", color: "#fff" }}>

                                        {showVideo ?
                                            <iframe
                                                width="100%"
                                                height="100%"
                                                src={`https://www.youtube.com/embed/${show?.item?.inspiration?.video}?autoplay=1&mute=1`}
                                                title="YouTube video player"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                allowFullScreen
                                            ></iframe>
                                            :
                                            <>

                                            </>
                                        }

                                    </Box>

                                </Box>
                            }
                        </Box>
                    }

                    {show?.item?.attributions &&
                        <Box sx={{ p: "1rem" }}>
                            <Box sx={{ mb: "0.5rem", fontWeight: 700 }}>Attributions</Box>
                            <Box>{show?.item?.attributions}</Box>
                        </Box>
                    }

                </ArticlesModal>
        </>
    )

}
