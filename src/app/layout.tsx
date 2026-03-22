import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
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

const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('portfolio-theme');
    var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white antialiased transition-colors duration-300`}
      >
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="py-8 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Designed &amp; Built by{" "}
                <span className="text-sky-500 font-medium">{personalInfo.name}</span>
                {" · "}
                {new Date().getFullYear()}
              </p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
