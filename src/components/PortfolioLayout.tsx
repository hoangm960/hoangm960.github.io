"use client";

import { useState, useEffect, useCallback } from "react";
import type {
    PersonalInfo,
    Project,
    SkillCategory,
    SocialLink,
} from "@/lib/data";
import { SidebarPane } from "@/components/SidebarPane";
import {
    Projects,
    getProjectDomain,
    type DomainFilter,
} from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";

type PortfolioLayoutProps = {
    personalInfo: PersonalInfo;
    projects: Project[];
    skillCategories: SkillCategory[];
    socialLinks: SocialLink[];
};

export function PortfolioLayout({
    personalInfo,
    projects,
    skillCategories,
    socialLinks,
}: PortfolioLayoutProps) {
    const [domain, setDomain] = useState<DomainFilter>("all");
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
        null,
    );

    const filteredProjects = projects.filter((p) =>
        domain === "all" ? true : getProjectDomain(p) === domain,
    );

    const selectedProject =
        projects.find((p) => p._id === selectedProjectId) ?? null;

    const currentFilteredIndex = selectedProject
        ? filteredProjects.findIndex((p) => p._id === selectedProject._id)
        : -1;

    const stepProject = useCallback(
        (direction: -1 | 1) => {
            if (filteredProjects.length === 0) return;
            if (currentFilteredIndex === -1) {
                setSelectedProjectId(filteredProjects[0]._id);
                return;
            }
            const nextIndex =
                (currentFilteredIndex + direction + filteredProjects.length) %
                filteredProjects.length;
            setSelectedProjectId(filteredProjects[nextIndex]._id);
        },
        [currentFilteredIndex, filteredProjects],
    );

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement | null;
            if (
                target &&
                (target.tagName === "INPUT" ||
                    target.tagName === "TEXTAREA" ||
                    target.tagName === "SELECT" ||
                    target.isContentEditable)
            ) {
                return;
            }
            if (e.key === "Escape" && selectedProjectId) {
                setSelectedProjectId(null);
            } else if (e.key === "ArrowUp" && selectedProjectId) {
                e.preventDefault();
                stepProject(-1);
            } else if (e.key === "ArrowDown" && selectedProjectId) {
                e.preventDefault();
                stepProject(1);
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [selectedProjectId, stepProject]);

    return (
        <div className="min-h-screen bg-[#090814] text-zinc-200 selection:bg-indigo-400 selection:text-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
                <div className="lg:grid lg:grid-cols-12 lg:gap-12">
                    <SidebarPane
                        personalInfo={personalInfo}
                        projects={projects}
                        skillCategories={skillCategories}
                        socialLinks={socialLinks}
                        selectedProject={selectedProject}
                        onSelectProject={setSelectedProjectId}
                        onStepProject={stepProject}
                        defaultInspectId={
                            filteredProjects[0]?._id ??
                            projects[0]?._id ??
                            null
                        }
                    />

                    <div className="lg:col-span-7 py-10 lg:py-14 space-y-20">
                        <Projects
                            projects={projects}
                            filteredProjects={filteredProjects}
                            domain={domain}
                            onDomainChange={setDomain}
                            selectedProjectId={selectedProjectId}
                            onSelectProject={setSelectedProjectId}
                        />
                        <Skills skillCategories={skillCategories} />
                        <Contact
                            personalInfo={personalInfo}
                            socialLinks={socialLinks}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
