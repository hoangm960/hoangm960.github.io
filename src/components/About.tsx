"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { urlFor } from "@/lib/sanity";

type AboutProps = {
  personalInfo: any;
};

export function About({ personalInfo }: AboutProps) {
  const aboutImageUrl = personalInfo?.aboutImage 
    ? (personalInfo.aboutImage._type === 'image' ? urlFor(personalInfo.aboutImage).url() : personalInfo.aboutImage)
    : "";
  const bio = personalInfo?.bio || "";
  const location = personalInfo?.location || "";
  const stats = personalInfo?.stats || { yearsExperience: 0, projectsCompleted: 0, cupsOfCoffee: 0 };
  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
            About Me
          </h2>
          <div className="w-20 h-1 bg-sky-500 rounded-full mb-12" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-sky-100 to-blue-100 dark:from-slate-800 dark:to-slate-700 aspect-square max-w-md mx-auto">
              <Image
                src={aboutImageUrl || "/avatar-alt.jpg"}
                alt={personalInfo?.name || "About"}
                fill
                className="object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sky-500/10 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-4">
              <MapPin size={16} className="text-sky-500" />
              <span>{location}</span>
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none">
              {bio.split("\n\n").map((paragraph: string, i: number) => (
                <p key={i} className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6">
              {[
                { label: "Years Exp.", value: stats.yearsExperience },
                { label: "Projects", value: stats.projectsCompleted },
                { label: "Coffees", value: `${stats.cupsOfCoffee}+` },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-sky-500">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
