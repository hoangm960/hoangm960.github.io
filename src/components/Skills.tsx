"use client";

import { Icon } from "@iconify/react";
import { Sparkles } from "lucide-react";
import type { SkillCategory } from "@/lib/data";

type SkillsProps = {
    skillCategories: SkillCategory[];
};

export function Skills({ skillCategories }: SkillsProps) {
    return (
        <section id="skills" className="space-y-6">
            <div className="pb-4 border-b border-indigo-950/80">
                <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
                    02 / Capabilities
                </span>
                <h2 className="text-xl font-bold text-white">
                    Technical Stack by Layer
                </h2>
            </div>

            <div className="space-y-4">
                {skillCategories.map((category) => (
                    <div
                        key={category._id}
                        className="p-4 rounded-2xl bg-[#121126]/65 border border-indigo-950/80 flex flex-col sm:flex-row sm:items-start gap-4"
                    >
                        <div className="sm:w-40 shrink-0">
                            <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
                                {category.name}
                            </span>
                            <p className="text-[11px] text-zinc-500 mt-0.5">
                                {category.skills.length} tools
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {category.skills.map((skill) => (
                                <span
                                    key={skill.name}
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#090814] border border-indigo-950/90 text-xs text-zinc-300"
                                >
                                    {skill.icon ? (
                                        <Icon
                                            icon={skill.icon}
                                            className="text-sm shrink-0"
                                        />
                                    ) : (
                                        <Sparkles
                                            size={12}
                                            className="text-indigo-400 shrink-0"
                                        />
                                    )}
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
