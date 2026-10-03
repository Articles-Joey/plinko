"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import ArticlesButton from "@/components/UI/Button";

export default function NotFound() {
    return (
        <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", textAlign: "center" }}>
            <Box component="img" src="/img/preview.png" alt="Not Found" sx={{ width: "100%", maxWidth: 300, mb: "1rem" }} />
            <Typography component="h1" variant="h3">404 - Page Not Found</Typography>
            <Typography sx={{ my: 2 }}>Sorry, the page you are looking for does not exist.</Typography>
            <ArticlesButton component={Link} href="/">Return Home</ArticlesButton>
        </Container>
    );
}
