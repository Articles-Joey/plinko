"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ViewUserModal from "./ViewUserModal";
import ArticlesDate from "./ArticlesDate";
import ArticlesModal from "./ArticlesModal";
import ArticlesButton from "./Button";
import useUserFriends from "@/hooks/useUserFriends";

export default function InviteModal({ show, setShow }) {
    const { data: userFriends } = useUserFriends();
    const [friendsSearch, setFriendsSearch] = useState("");
    const [sentMessages, setSentMessages] = useState([]);

    return (
        <ArticlesModal title="Invite Players" show={Boolean(show)} setShow={setShow} sx={{ p: 0 }}>
            {show?.type ? (
                <Box>
                    <Box sx={{ position: "sticky", top: 0, zIndex: 1, bgcolor: "background.paper", borderBottom: 1, borderColor: "divider", p: 1, display: "flex", justifyContent: "center" }}>
                        <TextField
                            label="Friend Search"
                            placeholder="Display name or username"
                            size="small"
                            value={friendsSearch}
                            onChange={(event) => setFriendsSearch(event.target.value)}
                            sx={{ width: "100%", maxWidth: 250 }}
                        />
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <Box sx={{ display: "flex", flexDirection: "column", width: "50%", p: 1 }}>
                            <Typography>Type</Typography>
                            <Typography sx={{ mb: 1, fontWeight: 700 }}>{show.type}</Typography>
                            <Typography>Game Name</Typography>
                            <Typography sx={{ mb: 1, fontWeight: 700 }}>{show.game_name}</Typography>
                            <Typography>Server Id</Typography>
                            <Typography sx={{ mb: 1, fontWeight: 700 }}>{show.server_id}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", width: "50%", borderLeft: 1, borderColor: "divider", p: 1 }}>
                            <Typography color="text.secondary">Invited Players</Typography>
                            {sentMessages.map((sentUser) => (
                                <Box key={sentUser._id} sx={{ mb: "0.25rem" }}>
                                    <ViewUserModal user_id={sentUser.populated_user._id} populated_user={sentUser.populated_user} />
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    <Box sx={{ borderTop: 1, borderColor: "divider" }}>
                        {userFriends
                            ?.filter((friend) => !friendsSearch || friend.populated_user.display_name?.toLowerCase().includes(friendsSearch.toLowerCase()))
                            .map((friend) => {
                                const sent = sentMessages.some((sentUser) => sentUser._id === friend._id);
                                return (
                                    <Box key={friend._id} sx={{ borderBottom: 1, borderColor: "divider", p: 1, display: "flex", alignItems: "center" }}>
                                        <Box sx={{ ml: 1 }}>
                                            <ViewUserModal user_id={friend.populated_user._id} populated_user={friend.populated_user} />
                                            <Typography sx={{ fontSize: "0.875rem" }}>@{friend.populated_user.username}</Typography>
                                            <Typography sx={{ fontSize: "0.875rem" }}>Added: <ArticlesDate date={friend.date} format="PP" /></Typography>
                                        </Box>
                                        <ArticlesButton
                                            small
                                            sx={{ ml: "auto" }}
                                            disabled={sent}
                                            onClick={() => setSentMessages((previous) => [...previous, { _id: friend._id, populated_user: friend.populated_user }])}
                                        >
                                            {sent ? "Sent" : "Invite"}
                                        </ArticlesButton>
                                    </Box>
                                );
                            })}
                    </Box>
                </Box>
            ) : (
                <Box sx={{ p: 2 }}>Dev Issue</Box>
            )}
        </ArticlesModal>
    );
}
