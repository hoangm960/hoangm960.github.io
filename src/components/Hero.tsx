"use client";

import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Laptop3D } from "./Laptop3D";
import { HeroContent } from "./HeroContent";

type HeroProps = {
  personalInfo: any;
  socialLinks: any;
};

export function Hero({ personalInfo, socialLinks }: HeroProps) {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const section = document.getElementById("hero");
            if (!section) return;

            const rect = section.getBoundingClientRect();
            const progress = -rect.top / rect.height;

            setScrollProgress(progress);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section id="hero" className="relative h-[600vh]">
            <div className="sticky top-0 h-screen">
                <Canvas
                    camera={{ position: [5, 5, 5], fov: 45 }}
                    gl={{ antialias: true, alpha: true }}
                >
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[5, 5, 5]} intensity={1} />
                    <Environment preset="city" />

                    <Suspense fallback={null}>
                        <Laptop3D scrollProgress={scrollProgress} />
                    </Suspense>
                </Canvas>

                <div
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-400 ${
                        scrollProgress > 0.6 ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                >
                    <HeroContent personalInfo={personalInfo} />
                </div>
            </div>
        </section>
    );
}
