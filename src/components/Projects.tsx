"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { SocialIcon } from "@/components/SocialIcon";
import { projects } from "@/lib/data";

const fallbackColors = [
    "bg-sky-200 dark:bg-sky-800",
    "bg-emerald-200 dark:bg-emerald-800",
    "bg-amber-200 dark:bg-amber-800",
    "bg-rose-200 dark:bg-rose-800",
    "bg-violet-200 dark:bg-violet-800",
    "bg-cyan-200 dark:bg-cyan-800",
    "bg-orange-200 dark:bg-orange-800",
    "bg-fuchsia-200 dark:bg-fuchsia-800",
];

const getFallbackColor = (id: number) =>
    fallbackColors[id % fallbackColors.length];

const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function Projects() {
    return (
        <section
            id="projects"
            className="py-24 bg-slate-50 dark:bg-slate-800/50"
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                        Projects
                    </h2>
                    <div className="w-20 h-1 bg-sky-500 rounded-full mx-auto mb-6" />
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        A selection of projects I&apos;ve worked on. Each one
                        represents a unique challenge and a chance to learn
                        something new.
                    </p>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-60px" }}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            variants={item}
                            className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-sky-500/50 dark:hover:border-sky-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/10 hover:-translate-y-1 flex flex-col"
                        >
                            <div
                                className={`relative aspect-video overflow-hidden ${project.image ? "" : getFallbackColor(project.id)}`}
                            >
                                {project.image ? (
                                    <>
                                        <Image
                                            src={project.image}
                                            alt={project.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </>
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-4xl font-bold text-slate-600 dark:text-slate-300">
                                            {project.name
                                                .split(" ")
                                                .map((w) => w[0])
                                                .join("")}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="p-5 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                        <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors leading-tight">
                                            {project.name}
                                        </h3>
                                    </div>
                                    {project.period && (
                                        <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">
                                            {project.period}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mb-4 line-clamp-4">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        {project.techStack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-500/20"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-700">
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                                    >
                                        <SocialIcon
                                            icon="fa-brands:github"
                                            size={14}
                                        />
                                        Code
                                    </a>
                                    {project.liveUrl && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                                        >
                                            <ExternalLink size={14} />
                                            Demo
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
