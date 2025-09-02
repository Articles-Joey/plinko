// import { Geist, Geist_Mono } from "next/font/google";

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';

import "bootstrap/dist/css/bootstrap.min.css";

// import "./globals.css";
import "@/styles/index.scss";
import SocketLogicHandler from "@/components/SocketLogicHandler";
import LayoutClient from './layout-client';

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "Race Game",
  description: "Race to the finish line by strategically picking your moves and outsmarting your opponents.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <head>
        
        <link
          rel="stylesheet"
          href={`${process.env.NEXT_PUBLIC_CDN}fonts/fontawsome/css/all.min.css`}
        />

      </head>

      <body
      // className={`${geistSans.variable} ${geistMono.variable}`}
      >

        <LayoutClient />

        <SocketLogicHandler />

        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
