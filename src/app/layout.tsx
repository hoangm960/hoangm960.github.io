import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { personalInfo } from "@/lib/data";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: `${personalInfo.name} | Portfolio`,
    description: `Portfolio of ${personalInfo.name} — ${personalInfo.role}. ${personalInfo.tagline}`,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body
                className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#090814] text-zinc-200 antialiased selection:bg-indigo-400 selection:text-slate-950`}
            >
                <main className="flex-1">{children}</main>
                <footer className="py-8 border-t border-indigo-950/80 bg-[#090814]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 text-center">
                        <p className="text-sm text-zinc-400">
                            Designed &amp; Built by{" "}
                            <span className="text-indigo-400 font-medium">
                                {personalInfo.name}
                            </span>
                            {" · "}
                            {new Date().getFullYear()}
                        </p>
                    </div>
                </footer>
            </body>
        </html>
    );
}
