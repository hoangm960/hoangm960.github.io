import { useState, useMemo } from "react";
import Image from "next/image";
import { Project, ProjectInput, uploadProjectImage } from "@/lib/db";
import { SortableList } from "./SortableList";
import { EditableCard } from "./EditableCard";
import { FormInput } from "./FormInput";

type SortOption = "newest" | "oldest" | "manual";

interface PendingProject {
    data: Partial<Project>;
    imageFile?: File | null;
}

interface ProjectsSectionProps {
    projects: Project[];
    onUpdate: (id: string, data: Partial<Project>) => Promise<void>;
    onCreate: (data: ProjectInput) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
    onReorder: (items: Project[]) => void;
}

function parseDate(dateStr: string): number {
    const [year, month] = dateStr.split("-").map(Number);
    return year * 12 + (month || 1);
}

function parseEndDate(dateStr: string): number {
    if (dateStr === "present") return Infinity;
    if (!dateStr) return 0;
    const [year, month] = dateStr.split("-").map(Number);
    return year * 12 + (month || 1);
}

function formatDate(dateStr: string): string {
    if (dateStr === "present") return "Present";
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthName = monthNames[parseInt(month, 10) - 1] || "";
    return `${monthName} ${year}`;
}

export function ProjectsSection({
    projects,
    onUpdate,
    onCreate,
    onDelete,
    onReorder,
}: ProjectsSectionProps) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState<Partial<Project>>({});
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [sortBy, setSortBy] = useState<SortOption>("newest");
    const [pendingSortBy, setPendingSortBy] = useState<SortOption | null>(null);
    const [pendingChanges, setPendingChanges] = useState<Record<string, PendingProject>>({});
    const [pendingOrder, setPendingOrder] = useState<Record<string, number>>({});
    const [localProjects, setLocalProjects] = useState<Project[]>([]);
    const [saving, setSaving] = useState(false);

    const activeSortBy = pendingSortBy ?? sortBy;
    const displayProjects = localProjects.length > 0 ? localProjects : projects;

    const sortedProjects = useMemo(() => {
        const sorted = [...displayProjects];
        if (activeSortBy === "newest") {
            sorted.sort((a, b) => parseEndDate(b.endDate) - parseEndDate(a.endDate));
        } else if (activeSortBy === "oldest") {
            sorted.sort((a, b) => parseEndDate(a.endDate) - parseEndDate(b.endDate));
        }
        return sorted;
    }, [displayProjects, activeSortBy]);

    const hasChanges = Object.keys(pendingChanges).length > 0 || Object.keys(pendingOrder).length > 0 || pendingSortBy !== null;

    function handleSortChange(newSort: SortOption) {
        // Sort and update order field on each project
        const sorted = [...displayProjects].map((project, index) => ({
            ...project,
            order: index,
        }));
        
        if (newSort === "newest") {
            sorted.sort((a, b) => parseEndDate(b.endDate) - parseEndDate(a.endDate));
        } else if (newSort === "oldest") {
            sorted.sort((a, b) => parseEndDate(a.endDate) - parseEndDate(b.endDate));
        }
        
        // Update order field to match new positions
        const reordered = sorted.map((project, index) => ({
            ...project,
            order: index,
        }));
        
        const newOrder: Record<string, number> = {};
        reordered.forEach((project, index) => {
            newOrder[project._id] = index;
        });
        
        setPendingSortBy(newSort);
        setPendingOrder(newOrder);
        setLocalProjects(reordered);
    }

    function handleEdit(project: Project) {
        setEditingId(project._id);
        setForm(project);
        setImageFile(null);
    }

    function handleCancel() {
        if (editingId) {
            setPendingChanges((prev) => {
                const updated = { ...prev };
                delete updated[editingId];
                return updated;
            });
        }
        setEditingId(null);
        setForm({});
        setImageFile(null);
    }

    function handleDelete(id: string) {
        onDelete(id);
        setPendingChanges((prev) => {
            const updated = { ...prev };
            delete updated[id];
            return updated;
        });
    }

    function handleAdd() {
        onCreate({
            name: "New Project",
            description: "",
            imageUrl: "",
            techStack: [],
            githubUrl: "",
            liveUrl: "",
            startDate: "2025-01",
            endDate: "present",
            order: projects.length,
        });
    }

    function updateForm(field: keyof Project, value: string | string[]) {
        setForm((prev) => ({ ...prev, [field]: value }));
        setPendingChanges((prev) => ({
            ...prev,
            [editingId!]: {
                data: { ...prev[editingId!]?.data, [field]: value },
                imageFile: prev[editingId!]?.imageFile || imageFile,
            },
        }));
    }

    function handleImageChange(file: File | null) {
        setImageFile(file);
        setPendingChanges((prev) => ({
            ...prev,
            [editingId!]: {
                data: prev[editingId!]?.data || form,
                imageFile: file,
            },
        }));
    }

    async function handleSaveAll() {
        setSaving(true);
        try {
            // Save order changes first
            for (const [id, order] of Object.entries(pendingOrder)) {
                await onUpdate(id, { order });
            }
            // Save data changes
            for (const [id, pending] of Object.entries(pendingChanges)) {
                const updatedData = { ...pending.data };
                if (pending.imageFile) {
                    updatedData.image = await uploadProjectImage(id, pending.imageFile);
                }
                await onUpdate(id, updatedData);
            }
            // Commit sort change
            if (pendingSortBy) {
                setSortBy(pendingSortBy);
            }
            setPendingChanges({});
            setPendingOrder({});
            setPendingSortBy(null);
            setLocalProjects([]);
            setEditingId(null);
            setForm({});
            setImageFile(null);
        } catch (err) {
            console.error(err);
            alert("Error saving");
        }
        setSaving(false);
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={handleAdd}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    Add Project
                </button>
                <div className="flex gap-2 items-center">
                    <select
                        value={activeSortBy}
                        onChange={(e) => handleSortChange(e.target.value as SortOption)}
                        className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="manual">Manual Order</option>
                    </select>
                    <button
                        onClick={handleSaveAll}
                        disabled={!hasChanges || saving}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>

            <SortableList
                items={sortedProjects}
                onReorder={(items) => {
                    const reordered = items.map((item, index) => ({
                        ...item,
                        order: index,
                    }));
                    setLocalProjects(reordered);
                    const newOrder: Record<string, number> = {};
                    reordered.forEach((item, index) => {
                        newOrder[item._id] = index;
                    });
                    setPendingOrder(newOrder);
                }}
                saveOnReorder={false}
            >
                {(project) => (
                    <EditableCard
                        id={project._id}
                        isEditing={editingId === project._id}
                        onEdit={() => handleEdit(project)}
                        onDelete={() => handleDelete(project._id)}
                        onSave={() => {
                            // No-op - save is handled by section-level button
                        }}
                        onCancel={handleCancel}
                        viewContent={
                            <div className="flex gap-3 items-start">
                                {project.image && (
                                    <div className="relative w-20 h-15 shrink-0">
                                        <Image
                                            src={project.image}
                                            alt={project.name}
                                            fill
                                            loading="eager"
                                            className="object-cover rounded"
                                        />
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold">{project.name}</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                                        {project.description?.slice(0, 50)}...
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                        {formatDate(project.startDate)} - {formatDate(project.endDate)}
                                    </p>
                                </div>
                            </div>
                        }
                        editContent={
                            <>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
                                        Project Image
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
                                        className="block w-full"
                                    />
                                    {(form.image || imageFile) && (
                                        <div className="relative mt-2 w-28 h-20">
                                            <Image
                                                src={imageFile ? URL.createObjectURL(imageFile) : form.image || ""}
                                                alt="Project"
                                                fill
                                                className="object-cover rounded"
                                            />
                                        </div>
                                    )}
                                </div>
                                <FormInput
                                    label="Project Name"
                                    placeholder="Enter project name"
                                    value={form.name || ""}
                                    onChange={(v) => updateForm("name", v)}
                                />
                                <FormInput
                                    type="textarea"
                                    label="Description"
                                    placeholder="Describe the project"
                                    value={form.description || ""}
                                    onChange={(v) => updateForm("description", v)}
                                />
                                <FormInput
                                    label="Tech Stack"
                                    placeholder="React, TypeScript, Node.js (comma separated)"
                                    value={form.techStack?.join(", ") || ""}
                                    onChange={(v) =>
                                        updateForm(
                                            "techStack",
                                            v.split(",").map((s) => s.trim()),
                                        )
                                    }
                                />
                                <FormInput
                                    label="GitHub URL"
                                    placeholder="https://github.com/username/repo"
                                    value={form.githubUrl || ""}
                                    onChange={(v) => updateForm("githubUrl", v)}
                                />
                                <FormInput
                                    label="Live URL"
                                    placeholder="https://yourproject.com"
                                    value={form.liveUrl || ""}
                                    onChange={(v) => updateForm("liveUrl", v)}
                                />
                                <FormInput
                                    type="month"
                                    label="Start Date"
                                    value={form.startDate || ""}
                                    onChange={(v) => updateForm("startDate", v)}
                                />
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
                                        End Date
                                    </label>
                                    <div className="flex items-center gap-2 mb-2">
                                        <input
                                            type="checkbox"
                                            id={`end-present-${project._id}`}
                                            checked={form.endDate === "present"}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    updateForm("endDate", "present");
                                                } else {
                                                    updateForm("endDate", "");
                                                }
                                            }}
                                            className="w-4 h-4"
                                        />
                                        <label htmlFor={`end-present-${project._id}`} className="text-sm text-slate-600 dark:text-slate-400">
                                            I currently work here
                                        </label>
                                    </div>
                                    <input
                                        type="month"
                                        value={form.endDate === "present" ? "" : form.endDate || ""}
                                        onChange={(v) => updateForm("endDate", v.target.value)}
                                        disabled={form.endDate === "present"}
                                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                    />
                                </div>
                            </>
                        }
                    />
                )}
            </SortableList>
        </div>
    );
}
