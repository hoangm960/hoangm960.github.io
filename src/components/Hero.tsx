"use client";

import { HeroContent } from "./HeroContent";

type HeroProps = {
  personalInfo: {
    name?: string;
    avatar?: string | null;
    role?: string;
    tagline?: string;
  } | null;
};

export function Hero({ personalInfo }: HeroProps) {
    return (
        <section id="hero" className="min-h-screen flex items-center justify-center relative">
            <HeroContent personalInfo={personalInfo} />
        </section>
    );
}
