"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowLeft,
    ArrowUpRight,
    Check,
    ChevronDown,
    ChevronUp,
    Copy,
    ExternalLink,
    MapPin,
    MousePointerClick,
    X,
} from "lucide-react";
import type {
    PersonalInfo,
    Project,
    SkillCategory,
    SocialLink,
} from "@/lib/data";
import { SocialIcon } from "@/components/SocialIcon";
import {
    domainLabels,
    formatShortPeriod,
    getProjectDomain,
} from "@/components/Projects";

type SidebarPaneProps = {
    personalInfo: PersonalInfo;
    projects: Project[];
    skillCategories: SkillCategory[];
    socialLinks: SocialLink[];
    selectedProject: Project | null;
    onSelectProject: (id: string | null) => void;
    onStepProject: (direction: -1 | 1) => void;
    defaultInspectId: string | null;
};

const platformIcons: Record<string, string> = {
    github: "fa-brands:github",
    linkedin: "fa-brands:linkedin",
    facebook: "fa-brands:facebook",
};

export function SidebarPane({
    personalInfo,
    projects,
    skillCategories,
    socialLinks,
    selectedProject,
    onSelectProject,
    onStepProject,
    defaultInspectId,
}: SidebarPaneProps) {
    const [copied, setCopied] = useState(false);

    const earliestYear = projects.reduce((minYear, p) => {
        const year = parseInt(p.startDate.split("-")[0], 10);
        return Number.isNaN(year) ? minYear : Math.min(minYear, year);
    }, new Date().getFullYear());
    const yearsCoding = Math.max(1, new Date().getFullYear() - earliestYear);
    const totalProjects = projects.length;
    const totalTechnologies = skillCategories.reduce(
        (sum, category) => sum + category.skills.length,
        0,
    );

    const handleCopyEmail = () => {
        navigator.clipboard?.writeText(personalInfo.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            <aside className="lg:col-span-5 lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col lg:justify-between py-10 lg:py-14 border-b lg:border-b-0 border-indigo-950/80 overflow-y-auto">
                <AnimatePresence mode="wait">
                    {!selectedProject ? (
                        <motion.div
                            key="profile-pane"
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -12 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col justify-between h-full gap-8"
                        >
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-indigo-400/40 shrink-0">
                                        <Image
                                            src={personalInfo.avatar}
                                            alt={personalInfo.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                                            {personalInfo.name}
                                        </h1>
                                        <p className="text-sm font-medium text-indigo-400">
                                            {personalInfo.role}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-sm text-zinc-300 leading-relaxed">
                                    {personalInfo.tagline}
                                </p>

                                <p className="text-xs text-zinc-400 leading-relaxed border-l-2 border-indigo-950/80 pl-3.5">
                                    {personalInfo.bio}
                                </p>

                                {/* Auto-Computed Stats Strip */}
                                <div className="grid grid-cols-3 gap-2.5 pt-1">
                                    <div className="px-3 py-2.5 rounded-xl bg-[#121126]/65 border border-indigo-950/80">
                                        <div className="text-lg font-bold text-white font-mono">
                                            {yearsCoding}+
                                        </div>
                                        <div className="text-[11px] text-zinc-400">
                                            Years Coding
                                        </div>
                                    </div>
                                    <div className="px-3 py-2.5 rounded-xl bg-[#121126]/65 border border-indigo-950/80">
                                        <div className="text-lg font-bold text-indigo-400 font-mono">
                                            {totalProjects}
                                        </div>
                                        <div className="text-[11px] text-zinc-400">
                                            Key Projects
                                        </div>
                                    </div>
                                    <div className="px-3 py-2.5 rounded-xl bg-[#121126]/65 border border-indigo-950/80">
                                        <div className="text-lg font-bold text-white font-mono">
                                            {totalTechnologies}
                                        </div>
                                        <div className="text-[11px] text-zinc-400">
                                            Technologies
                                        </div>
                                    </div>
                                </div>

                                {/* Interactive Inspector Prompt */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        onSelectProject(defaultInspectId)
                                    }
                                    className="w-full text-left p-3.5 rounded-xl bg-indigo-500/12 hover:bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-between gap-3 transition-all cursor-pointer group"
                                >
                                    <div className="flex items-center gap-2.5">
                                        <MousePointerClick
                                            size={16}
                                            className="text-indigo-400 shrink-0"
                                        />
                                        <div>
                                            <div className="text-xs font-semibold text-indigo-400">
                                                Interactive Project Inspector
                                            </div>
                                            <div className="text-[11px] text-zinc-400">
                                                Select any project on the right
                                                (or click here) to inspect its
                                                full architecture in this pane.
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-xs font-mono text-indigo-400 group-hover:translate-x-0.5 transition-transform shrink-0">
                                        Inspect →
                                    </span>
                                </button>

                                {/* Section Jump Nav */}
                                <nav
                                    aria-label="In-page jump links"
                                    className="hidden lg:flex flex-col space-y-2 pt-1 text-xs font-mono tracking-wider uppercase"
                                >
                                    <a
                                        href="#projects"
                                        className="group flex items-center gap-3 text-zinc-400 hover:text-indigo-300 transition-colors py-1"
                                    >
                                        <span className="h-px w-8 bg-current opacity-40 group-hover:w-14 group-hover:opacity-100 transition-all" />
                                        01 · Projects ({totalProjects})
                                    </a>
                                    <a
                                        href="#skills"
                                        className="group flex items-center gap-3 text-zinc-400 hover:text-indigo-300 transition-colors py-1"
                                    >
                                        <span className="h-px w-8 bg-current opacity-40 group-hover:w-14 group-hover:opacity-100 transition-all" />
                                        02 · Technical Stack (
                                        {skillCategories.length} Domains)
                                    </a>
                                    <a
                                        href="#contact"
                                        className="group flex items-center gap-3 text-zinc-400 hover:text-indigo-300 transition-colors py-1"
                                    >
                                        <span className="h-px w-8 bg-current opacity-40 group-hover:w-14 group-hover:opacity-100 transition-all" />
                                        03 · Direct Dispatch
                                    </a>
                                </nav>
                            </div>

                            {/* Bottom Sticky Contact & Socials */}
                            <div className="space-y-4">
                                <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#121126]/65 border border-indigo-950/80">
                                        <MapPin
                                            size={13}
                                            className="text-indigo-400"
                                        />
                                        {personalInfo.location}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={handleCopyEmail}
                                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#121126]/65 hover:bg-[#161430] border border-indigo-950/80 text-zinc-300 transition-colors cursor-pointer"
                                    >
                                        {copied ? (
                                            <>
                                                <Check
                                                    size={13}
                                                    className="text-indigo-400"
                                                />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <Copy
                                                    size={13}
                                                    className="text-indigo-400"
                                                />
                                                {personalInfo.email}
                                            </>
                                        )}
                                    </button>
                                </div>

                                <div className="flex items-center gap-3">
                                    {socialLinks.map((link) => (
                                        <a
                                            key={link.platform}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={link.title}
                                            className="p-2.5 rounded-xl bg-[#121126]/65 hover:bg-indigo-500/20 border border-indigo-950/80 text-zinc-400 hover:text-indigo-300 transition-all"
                                        >
                                            <SocialIcon
                                                icon={
                                                    platformIcons[
                                                        link.platform
                                                    ] || "fa-solid:link"
                                                }
                                                size={18}
                                            />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        /* INSPECTOR MODE IN STICKY LEFT PANE */
                        <motion.div
                            key={`inspector-${selectedProject._id}`}
                            initial={{ opacity: 0, x: 12 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 12 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col justify-between h-full gap-6 p-5 sm:p-6 rounded-3xl bg-[#121126]/95 border border-indigo-500/45 shadow-2xl shadow-indigo-950/40"
                        >
                            <div className="space-y-5">
                                {/* Top Inspector Control Bar */}
                                <div className="flex items-center justify-between gap-2 pb-3 border-b border-indigo-950/80">
                                    <button
                                        type="button"
                                        onClick={() => onSelectProject(null)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1b1936] hover:bg-[#252249] text-xs font-semibold text-indigo-400 transition-colors cursor-pointer"
                                    >
                                        <ArrowLeft size={14} />
                                        Back to Profile
                                        <span className="hidden sm:inline-block ml-1 px-1.5 py-0.5 rounded bg-[#090814] text-[10px] font-mono text-zinc-400">
                                            Esc
                                        </span>
                                    </button>

                                    <div className="flex items-center gap-1.5">
                                        <span className="text-xs font-mono text-zinc-400 mr-1">
                                            #
                                            {String(
                                                projects.findIndex(
                                                    (p) =>
                                                        p._id ===
                                                        selectedProject._id,
                                                ) + 1,
                                            ).padStart(2, "0")}{" "}
                                            /{" "}
                                            {String(projects.length).padStart(
                                                2,
                                                "0",
                                            )}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => onStepProject(-1)}
                                            title="Previous project (↑)"
                                            className="p-1.5 rounded-lg bg-[#1b1936] hover:bg-[#252249] text-zinc-200 transition-colors cursor-pointer"
                                        >
                                            <ChevronUp size={15} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => onStepProject(1)}
                                            title="Next project (↓)"
                                            className="p-1.5 rounded-lg bg-[#1b1936] hover:bg-[#252249] text-zinc-200 transition-colors cursor-pointer"
                                        >
                                            <ChevronDown size={15} />
                                        </button>
                                    </div>
                                </div>

                                {/* Project Title & Metadata */}
                                <div>
                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                        <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/12 border border-indigo-500/30 text-indigo-400 text-[11px] font-mono">
                                            {
                                                domainLabels[
                                                    getProjectDomain(
                                                        selectedProject,
                                                    )
                                                ]
                                            }
                                        </span>
                                        <span className="text-xs font-mono text-zinc-400">
                                            {formatShortPeriod(
                                                selectedProject.startDate,
                                                selectedProject.endDate,
                                            )}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                                        {selectedProject.name}
                                    </h2>
                                </div>

                                {/* Conditional Project Preview Image */}
                                {selectedProject.image && (
                                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-indigo-950/80 bg-[#090814]">
                                        <Image
                                            src={selectedProject.image}
                                            alt={selectedProject.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}

                                {/* Full Architectural Writeup */}
                                <div className="space-y-2">
                                    <div className="text-[11px] font-mono uppercase tracking-wider text-indigo-400">
                                        Architecture &amp; Engineering Summary
                                    </div>
                                    <p className="text-sm text-zinc-300 leading-relaxed">
                                        {selectedProject.description}
                                    </p>
                                </div>

                                {/* Full Tech Stack */}
                                <div className="space-y-2">
                                    <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                                        Technology Stack (
                                        {selectedProject.techStack.length})
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {selectedProject.techStack.map(
                                            (tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#090814] text-indigo-400 border border-indigo-500/30"
                                                >
                                                    {tech}
                                                </span>
                                            ),
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Inspector Bottom CTA Bar */}
                            <div className="pt-4 border-t border-indigo-950/80 flex flex-wrap items-center justify-between gap-3">
                                <div className="flex items-center gap-2.5">
                                    <a
                                        href={selectedProject.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-400 hover:bg-indigo-300 text-slate-950 font-bold text-xs transition-colors"
                                    >
                                        <SocialIcon
                                            icon="fa-brands:github"
                                            size={14}
                                        />
                                        View Source
                                        <ArrowUpRight size={14} />
                                    </a>
                                    {selectedProject.liveUrl && (
                                        <a
                                            href={selectedProject.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#1b1936] hover:bg-[#252249] text-zinc-200 font-semibold text-xs border border-indigo-950/80 transition-colors"
                                        >
                                            <ExternalLink size={14} />
                                            Live Demo
                                        </a>
                                    )}
                                </div>

                                <span className="text-[11px] font-mono text-zinc-500 hidden sm:inline">
                                    ↑ / ↓ to cycle
                                </span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </aside>

            {/* Mobile/Tablet Inspector Drawer (<lg viewports) */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                        className="lg:hidden fixed inset-x-3 bottom-4 z-40 p-5 rounded-3xl bg-[#121126]/95 backdrop-blur-md border border-indigo-500/45 shadow-2xl shadow-indigo-950/40 max-h-[75vh] overflow-y-auto space-y-4"
                    >
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-mono text-indigo-400 font-semibold">
                                {formatShortPeriod(
                                    selectedProject.startDate,
                                    selectedProject.endDate,
                                )}
                            </span>
                            <button
                                type="button"
                                onClick={() => onSelectProject(null)}
                                className="p-1.5 rounded-xl bg-[#1b1936] text-zinc-200"
                                aria-label="Close inspector"
                            >
                                <X size={16} />
                            </button>
                        </div>
                        <h3 className="text-xl font-bold text-white">
                            {selectedProject.name}
                        </h3>
                        <p className="text-xs text-zinc-300 leading-relaxed">
                            {selectedProject.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                            {selectedProject.techStack.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-2 py-0.5 rounded-md text-[11px] bg-[#090814] text-indigo-400 border border-indigo-500/30"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                        <div className="flex items-center gap-2.5 pt-2">
                            <a
                                href={selectedProject.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-400 text-slate-950 font-bold text-xs"
                            >
                                <SocialIcon
                                    icon="fa-brands:github"
                                    size={13}
                                />
                                Source
                            </a>
                            {selectedProject.liveUrl && (
                                <a
                                    href={selectedProject.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1b1936] text-zinc-200 font-semibold text-xs"
                                >
                                    <ExternalLink size={13} />
                                    Live Demo
                                </a>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
