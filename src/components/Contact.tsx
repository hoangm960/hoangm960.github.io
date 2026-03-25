"use client";

import { motion } from "framer-motion";
import {
    Mail,
    Send,
    MapPin,
} from "lucide-react";
import { SocialIcon } from "@/components/SocialIcon";
import { useState } from "react";

type ContactProps = {
  personalInfo: any;
  socialLinks: any;
};

export function Contact({ personalInfo, socialLinks }: ContactProps) {
  const email = personalInfo?.email || "";
  const location = personalInfo?.location || "";
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
        "idle",
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");
        await new Promise((r) => setTimeout(r, 1500));
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 3000);
    };

    const socials = [
        { icon: "fa-brands:github", href: socialLinks?.github, label: "GitHub" },
        { icon: "fa-brands:linkedin", href: socialLinks?.linkedin, label: "LinkedIn" },
        { icon: "fa-brands:facebook", href: socialLinks?.facebook, label: "Facebook" },
        { icon: "fa-solid:envelope", href: `mailto:${email}`, label: "Email" },
    ];

    return (
        <section
            id="contact"
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
                        Get In Touch
                    </h2>
                    <div className="w-20 h-1 bg-sky-500 rounded-full mx-auto mb-6" />
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Have a project in mind or just want to say hello? My
                        inbox is always open.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-2 space-y-8"
                    >
                        <div className="flex items-start gap-4 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-500/10">
                                <Mail size={22} className="text-sky-500" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                                    Email
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    {email}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-500/10">
                                <MapPin size={22} className="text-sky-500" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                                    Location
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    {location}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            {socials.map(({ icon, href, label }) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -3, scale: 1.05 }}
                                    className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 hover:border-sky-500/50 dark:hover:border-sky-500/50 transition-all duration-200 shadow-sm"
                                    aria-label={label}
                                >
                                    <SocialIcon icon={icon} size={20} />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    <motion.form
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        onSubmit={handleSubmit}
                        className="lg:col-span-3 p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-5"
                    >
                        <div className="grid sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={form.name}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            name: e.target.value,
                                        })
                                    }
                                    placeholder="Your Name"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={form.email}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            email: e.target.value,
                                        })
                                    }
                                    placeholder="your@email.com"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Message
                            </label>
                            <textarea
                                required
                                rows={5}
                                value={form.message}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        message: e.target.value,
                                    })
                                }
                                placeholder="Tell me about your project..."
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all resize-none text-sm"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === "sending"}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-sky-500 hover:bg-sky-600 disabled:bg-sky-400 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/25 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:translate-y-0"
                        >
                            {status === "sending" ? (
                                <>
                                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                                    Sending...
                                </>
                            ) : status === "sent" ? (
                                "Message Sent!"
                            ) : (
                                <>
                                    Send Message
                                    <Send size={16} />
                                </>
                            )}
                        </button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
}
