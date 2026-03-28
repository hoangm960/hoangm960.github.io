"use client";

import { useState } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import {
    updatePersonalInfo,
    updateProject,
    createProject,
    deleteProject,
    updateSkillCategory,
    createSkillCategory,
    deleteSkillCategory,
    updateSocialLink,
    createSocialLink,
    deleteSocialLink,
} from "@/lib/db";
import { AuthScreen } from "@/components/admin/AuthScreen";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminTabs } from "@/components/admin/AdminTabs";
import { PersonalInfoForm } from "@/components/admin/PersonalInfoForm";
import { ProjectsSection } from "@/components/admin/ProjectsSection";
import { SkillsSection } from "@/components/admin/SkillsSection";
import { SocialLinksSection } from "@/components/admin/SocialLinksSection";

type Tab = "personal" | "projects" | "skills" | "social";

export default function AdminPage() {
    const {
        user,
        loading,
        isAllowed,
        personalInfo,
        projects,
        skillCategories,
        socialLinks,
        signIn,
        signOut,
        reloadData,
    } = useAdminAuth();

    const [activeTab, setActiveTab] = useState<Tab>("personal");

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    if (!user || !isAllowed) {
        return <AuthScreen onSignIn={signIn} />;
    }

    return (
        <>
            <AdminHeader email={user.email || ""} onSignOut={signOut} />

            <div className="max-w-7xl mx-auto px-4 py-6">
                <AdminTabs activeTab={activeTab} onTabChange={setActiveTab} />

                {activeTab === "personal" && (
                    <PersonalInfoForm
                        key={personalInfo?.name || "personal"}
                        data={personalInfo}
                        userId={user.uid}
                        onUpdate={async (data) => {
                            await updatePersonalInfo(data);
                            reloadData();
                        }}
                    />
                )}

                {activeTab === "projects" && (
                    <ProjectsSection
                        projects={projects}
                        onUpdate={async (id, data) => {
                            await updateProject(id, data);
                            reloadData();
                        }}
                        onCreate={async (data) => {
                            await createProject(data);
                            reloadData();
                        }}
                        onDelete={async (id) => {
                            await deleteProject(id);
                            reloadData();
                        }}
                        onReorder={() => {}}
                    />
                )}

                {activeTab === "skills" && (
                    <SkillsSection
                        categories={skillCategories}
                        onUpdate={async (id, data) => {
                            await updateSkillCategory(id, data);
                            reloadData();
                        }}
                        onCreate={async (data) => {
                            await createSkillCategory(data);
                            reloadData();
                        }}
                        onDelete={async (id) => {
                            await deleteSkillCategory(id);
                            reloadData();
                        }}
                        onReorder={() => {}}
                    />
                )}

                {activeTab === "social" && (
                    <SocialLinksSection
                        links={socialLinks}
                        onUpdate={async (platform, data) => {
                            await updateSocialLink(platform, data);
                            reloadData();
                        }}
                        onCreate={async (data) => {
                            await createSocialLink(data);
                            reloadData();
                        }}
                        onDelete={async (platform) => {
                            await deleteSocialLink(platform);
                            reloadData();
                        }}
                        onReorder={() => {}}
                    />
                )}
            </div>
        </>
    );
}
