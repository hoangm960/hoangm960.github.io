"use client";

import { useState } from "react";
import { Mail, Send } from "lucide-react";
import type { PersonalInfo, SocialLink } from "@/lib/data";

type ContactProps = {
    personalInfo: PersonalInfo;
    socialLinks?: SocialLink[];
};

export function Contact({ personalInfo }: ContactProps) {
    const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
    const [form, setForm] = useState({ name: "", email: "", message: "" });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("sending");
        setTimeout(() => {
            setStatus("sent");
            setForm({ name: "", email: "", message: "" });
            setTimeout(() => setStatus("idle"), 2500);
        }, 700);
    };

    return (
        <section id="contact" className="space-y-6 pb-16">
            <div className="pb-4 border-b border-indigo-950/80">
                <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
                    03 / Dispatch
                </span>
                <h2 className="text-xl font-bold text-white">
                    Start a Conversation
                </h2>
            </div>

            <form
                onSubmit={handleSubmit}
                className="p-6 rounded-2xl bg-[#121126]/65 border border-indigo-950/80 space-y-4"
            >
                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                            NAME
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
                            placeholder="Jane Doe"
                            className="w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none bg-[#090814] border-indigo-950 text-white focus:border-indigo-400"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                            EMAIL
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
                            placeholder="jane@company.com"
                            className="w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none bg-[#090814] border-indigo-950 text-white focus:border-indigo-400"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                        MESSAGE
                    </label>
                    <textarea
                        required
                        rows={3}
                        value={form.message}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                message: e.target.value,
                            })
                        }
                        placeholder="Tell me about the role or engineering challenge..."
                        className="w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none resize-none bg-[#090814] border-indigo-950 text-white focus:border-indigo-400"
                    />
                </div>
                <div className="flex items-center justify-between gap-4 pt-1">
                    <span className="text-xs text-zinc-400 inline-flex items-center gap-1.5">
                        <Mail size={14} className="text-indigo-400" />
                        Direct: {personalInfo.email}
                    </span>
                    <button
                        type="submit"
                        disabled={status === "sending"}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-400 hover:bg-indigo-300 text-slate-950 font-semibold text-xs transition-all cursor-pointer"
                    >
                        <Send size={14} />
                        {status === "sending"
                            ? "Sending..."
                            : status === "sent"
                              ? "Dispatched!"
                              : "Send Message"}
                    </button>
                </div>
            </form>
        </section>
    );
}
