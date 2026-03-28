"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

type Skill = {
  name: string;
  icon: string | null;
  bgColor: string | null;
  textColor: string | null;
};

type SkillCategory = {
  _id: string;
  name: string;
  skills: Skill[];
};

type SkillsProps = {
  skillCategories: SkillCategory[];
};

function SkillIcon({ skill }: { skill: Skill }) {
    if (skill.icon) {
        return (
            <div
                className="w-11 h-11 flex items-center justify-center shrink-0"
                title={skill.name}
            >
                <Icon icon={skill.icon} className="text-[28px]" />
            </div>
        );
    }

    const initials = skill.name
        .split(/[\s\/\-]/)
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
            style={{ backgroundColor: skill.bgColor || "#64748b", color: skill.textColor || "#ffffff" }}
            title={skill.name}
        >
            {initials}
        </div>
    );
}

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.04 }}
            className="group flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200 cursor-default"
        >
            <div className="transition-transform duration-200 group-hover:scale-110">
                <SkillIcon skill={skill} />
            </div>
            <span className="text-xs text-center font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors leading-tight max-w-full">
                {skill.name}
            </span>
        </motion.div>
    );
}

export function Skills({ skillCategories }: SkillsProps) {
    return (
        <section id="skills" className="py-24 bg-white dark:bg-slate-900">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                        Skills &amp; Technologies
                    </h2>
                    <div className="w-20 h-1 bg-sky-500 rounded-full mx-auto mb-6" />
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        The tools and technologies I use to bring ideas to life.
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {skillCategories.map((category, catIndex) => (
                        <motion.div
                            key={category._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{
                                duration: 0.5,
                                delay: catIndex * 0.07,
                            }}
                            className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700"
                        >
                            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-5 uppercase tracking-wider flex items-center gap-2">
                                <span className="w-5 h-0.5 bg-sky-500 rounded-full shrink-0" />
                                {category.name}
                            </h3>

                            <div className="grid grid-cols-3 gap-1">
                                {category.skills.map((skill, skillIndex) => (
                                    <SkillCard
                                        key={skill.name}
                                        skill={skill}
                                        index={skillIndex}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
