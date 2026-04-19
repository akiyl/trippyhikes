import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import NavBar from "./components/nav";
import NavBar from "@/components/ui/nav";
import { Playfair_Display, Inter } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const inter = Inter({
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "TrekToHim - Your Ultimate Hiking Companion",
  description:
    "Discover breathtaking trails, plan your perfect trek, and explore the world with TrekToHim. Your adventure starts here!",
  icons: [{ rel: "icon", url: "/t2h.jpg" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <NavBar />

        <div className="">
          {/* <div className="fixed w-full h-full bg-black/15 backdrop:filter backdrop-blur-xs pointer-none:"></div> */}
          {children}
        </div>
      </body>
    </html>
  );
}
