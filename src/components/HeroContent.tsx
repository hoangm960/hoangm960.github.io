"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { urlFor } from "@/lib/sanity";

type HeroContentProps = {
  personalInfo: any;
};

export function HeroContent({ personalInfo }: HeroContentProps) {
  const avatarUrl = personalInfo?.avatar 
    ? (personalInfo.avatar._type === 'image' ? urlFor(personalInfo.avatar).url() : personalInfo.avatar)
    : "";
    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex flex-col items-center text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
            >
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-sky-500/30 shadow-2xl bg-slate-200 dark:bg-slate-700">
                    <Image
                        src={avatarUrl || "/avatar.jpg"}
                        alt={personalInfo?.name || "Avatar"}
                        fill
                        className="object-cover"
                        loading="eager"
                    />
                </div>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight"
            >
                Hi{" "}
                <motion.span
                    animate={{
                        rotate: [0, 20, -20, 10, -10, 0],
                        scale: [1, 1.2, 1, 1.2, 1],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 3,
                        ease: "easeInOut",
                    }}
                    className="inline-block"
                >
                    👋
                </motion.span>
                , I&apos;m{" "}
                <span className="text-sky-500">{personalInfo.name}</span>
            </motion.h1>

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl sm:text-2xl font-semibold text-slate-600 dark:text-slate-300 mb-6"
            >
                {personalInfo.role}
            </motion.h2>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed"
            >
                {personalInfo.tagline}
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
            >
                <a
                    href="#projects"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/25 hover:-translate-y-0.5"
                >
                    View Projects
                    <ArrowRight size={18} />
                </a>
                <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-semibold hover:border-sky-500 hover:text-sky-500 dark:hover:border-sky-400 dark:hover:text-sky-400 transition-all duration-300 hover:-translate-y-0.5"
                >
                    Contact Me
                </a>
            </motion.div>
        </div>
    );
}
