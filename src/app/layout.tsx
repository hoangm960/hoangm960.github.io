import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getPersonalInfo } from "@/lib/db";

export const revalidate = 86400;

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
    try {
        const personalInfo = await getPersonalInfo();
        return {
            title: `${personalInfo.name} | Portfolio`,
            description: `Portfolio of ${personalInfo.name} — ${personalInfo.role}. ${personalInfo.tagline}`,
        };
    } catch {
        return {
            title: "Portfolio",
            description: "My portfolio website",
        };
    }
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    let name = "";
    try {
        const personalInfo = await getPersonalInfo();
        name = personalInfo.name;
    } catch {
        name = "Developer";
    }

    return (
        <html lang="en" className="dark">
            <body
                className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white antialiased transition-colors duration-300`}
            >
                <main className="flex-1">{children}</main>
                <footer className="py-8 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Designed &amp; Built by{" "}
                            <span className="text-sky-500 font-medium">
                                {name}
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
