"use client";

import { ExternalLink, FolderGit2 } from "lucide-react";
import type { Project } from "@/lib/data";
import { SocialIcon } from "@/components/SocialIcon";

export type DomainFilter = "all" | "web" | "ai" | "systems";

export function getProjectDomain(project: Project): DomainFilter {
    const stack = project.techStack.join(" ").toLowerCase();
    const desc = project.description.toLowerCase();
    if (
        stack.includes("esp32") ||
        stack.includes("freertos") ||
        stack.includes("c++") ||
        stack.includes("posix") ||
        stack.includes("antlr4") ||
        stack.includes("arduino")
    ) {
        return "systems";
    }
    if (
        stack.includes("langgraph") ||
        stack.includes("gemini") ||
        stack.includes("mediapipe") ||
        stack.includes("scipy") ||
        desc.includes("agent")
    ) {
        return "ai";
    }
    return "web";
}

export const domainLabels: Record<DomainFilter, string> = {
    all: "All Systems",
    web: "Web & Full-Stack",
    ai: "AI & DSP",
    systems: "Embedded & Systems",
};

export function formatShortPeriod(start: string, end?: string) {
    const fmt = (s: string) => {
        if (!s || s === "present") return "Present";
        const [y, m] = s.split("-");
        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        return `${months[parseInt(m, 10) - 1] || m} ${y}`;
    };
    return `${fmt(start)} — ${fmt(end || "present")}`;
}

type ProjectsProps = {
    projects: Project[];
    filteredProjects: Project[];
    domain: DomainFilter;
    onDomainChange: (domain: DomainFilter) => void;
    selectedProjectId: string | null;
    onSelectProject: (id: string | null) => void;
};

export function Projects({
    projects,
    filteredProjects,
    domain,
    onDomainChange,
    selectedProjectId,
    onSelectProject,
}: ProjectsProps) {
    return (
        <section id="projects" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-indigo-950/80">
                <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
                        01 / Case Studies
                    </span>
                    <h2 className="text-xl font-bold text-white">
                        Select a Project to Inspect
                    </h2>
                    <p className="text-xs text-zinc-400 mt-0.5">
                        Click any card below to load its full engineering
                        breakdown into the left panel.
                    </p>
                </div>

                {/* Domain Filter Pills */}
                <div className="flex flex-wrap gap-1.5">
                    {(
                        [
                            {
                                id: "all",
                                label: `All (${projects.length})`,
                            },
                            {
                                id: "web",
                                label: "Web & Full-Stack",
                            },
                            { id: "ai", label: "AI & DSP" },
                            {
                                id: "systems",
                                label: "Embedded & Systems",
                            },
                        ] as const
                    ).map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => onDomainChange(tab.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                                domain === tab.id
                                    ? "bg-indigo-400 text-slate-950 font-semibold shadow-sm"
                                    : "bg-[#121126]/65 text-zinc-400 hover:bg-[#161430] border border-indigo-950/80"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* 2-Column Compact Selector Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {filteredProjects.map((project) => {
                    const isSelected = selectedProjectId === project._id;
                    const globalIdx = projects.findIndex(
                        (p) => p._id === project._id,
                    );

                    return (
                        <div
                            key={project._id}
                            role="button"
                            tabIndex={0}
                            onClick={() =>
                                onSelectProject(isSelected ? null : project._id)
                            }
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    onSelectProject(
                                        isSelected ? null : project._id,
                                    );
                                }
                            }}
                            className={`group text-left rounded-2xl p-5 border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-4 ${
                                isSelected
                                    ? "bg-indigo-950/45 border-indigo-400 ring-1 ring-indigo-400/50 shadow-lg shadow-indigo-950/40"
                                    : "bg-[#121126]/65 hover:bg-[#161430] border-indigo-950/80"
                            }`}
                        >
                            <div className="space-y-2.5">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-400 font-semibold">
                                        <FolderGit2 size={14} />#
                                        {String(globalIdx + 1).padStart(2, "0")}
                                    </span>
                                    {isSelected ? (
                                        <span className="px-2 py-0.5 rounded-full bg-indigo-400 text-slate-950 text-[10px] font-mono font-bold">
                                            ← Inspecting
                                        </span>
                                    ) : (
                                        <span className="text-[11px] font-mono text-zinc-500 group-hover:text-indigo-300 transition-colors">
                                            {formatShortPeriod(
                                                project.startDate,
                                                project.endDate,
                                            )}
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                                    {project.name}
                                </h3>

                                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                                    {project.description}
                                </p>
                            </div>

                            <div className="pt-3 border-t border-indigo-950/80 flex items-center justify-between gap-2">
                                <div className="flex flex-wrap gap-1">
                                    {project.techStack.slice(0, 3).map((t) => (
                                        <span
                                            key={t}
                                            className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#090814] text-zinc-300 border border-indigo-950/90"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                    {project.techStack.length > 3 && (
                                        <span className="px-1.5 py-0.5 text-[10px] font-mono text-zinc-500">
                                            +{project.techStack.length - 3}
                                        </span>
                                    )}
                                </div>

                                <div
                                    className="flex items-center gap-2 shrink-0"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="GitHub Repository"
                                        className="text-zinc-400 hover:text-indigo-300 transition-colors"
                                    >
                                        <SocialIcon
                                            icon="fa-brands:github"
                                            size={14}
                                        />
                                    </a>
                                    {project.liveUrl && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title="Live Demo"
                                            className="text-indigo-400 hover:text-indigo-300 transition-colors"
                                        >
                                            <ExternalLink size={14} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
