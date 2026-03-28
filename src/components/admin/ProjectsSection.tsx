import { useState } from "react";
import Image from "next/image";
import { Project, ProjectInput, uploadProjectImage } from "@/lib/db";
import { SortableList } from "./SortableList";
import { EditableCard } from "./EditableCard";
import { FormInput } from "./FormInput";

interface ProjectsSectionProps {
    projects: Project[];
    onUpdate: (id: string, data: Partial<Project>) => Promise<void>;
    onCreate: (data: ProjectInput) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
    onReorder: (items: Project[]) => void;
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

    async function handleSave(id: string) {
        const updatedForm = { ...form };
        if (imageFile) {
            updatedForm.image = await uploadProjectImage(id, imageFile);
        }
        await onUpdate(id, updatedForm);
        setEditingId(null);
        setForm({});
        setImageFile(null);
    }

    async function handleAdd() {
        await onCreate({
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
    }

    return (
        <div>
            <button
                onClick={handleAdd}
                className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
                Add Project
            </button>

            <SortableList
                items={projects}
                onReorder={onReorder}
                onUpdateOrder={async (id, order) => {
                    await onUpdate(id, { order });
                }}
            >
                {(project) => (
                    <EditableCard
                        id={project._id}
                        isEditing={editingId === project._id}
                        onEdit={() => {
                            setEditingId(project._id);
                            setForm(project);
                        }}
                        onDelete={() => onDelete(project._id)}
                        onSave={() => handleSave(project._id)}
                        onCancel={() => {
                            setEditingId(null);
                            setForm({});
                            setImageFile(null);
                        }}
                        viewContent={
                            <>
                                <h3 className="font-semibold">{project.name}</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {project.description?.slice(0, 50)}...
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                    {project.startDate} - {project.endDate}
                                </p>
                            </>
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
                                        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                                        className="block w-full"
                                    />
                                    {(form.image || imageFile) && (
                                        <Image
                                            src={imageFile ? URL.createObjectURL(imageFile) : form.image || ""}
                                            alt="Project"
                                            width={120}
                                            height={80}
                                            className="mt-2 object-cover rounded"
                                        />
                                    )}
                                </div>
                                <FormInput
                                    placeholder="Name"
                                    value={form.name || ""}
                                    onChange={(v) => updateForm("name", v)}
                                />
                                <FormInput
                                    type="textarea"
                                    placeholder="Description"
                                    value={form.description || ""}
                                    onChange={(v) => updateForm("description", v)}
                                />
                                <FormInput
                                    placeholder="Tech Stack (comma separated)"
                                    value={form.techStack?.join(", ") || ""}
                                    onChange={(v) =>
                                        updateForm(
                                            "techStack",
                                            v.split(",").map((s) => s.trim()),
                                        )
                                    }
                                />
                                <FormInput
                                    placeholder="GitHub URL"
                                    value={form.githubUrl || ""}
                                    onChange={(v) => updateForm("githubUrl", v)}
                                />
                                <FormInput
                                    placeholder="Live URL"
                                    value={form.liveUrl || ""}
                                    onChange={(v) => updateForm("liveUrl", v)}
                                />
                                <FormInput
                                    placeholder="Start Date"
                                    value={form.startDate || ""}
                                    onChange={(v) => updateForm("startDate", v)}
                                />
                                <FormInput
                                    placeholder="End Date"
                                    value={form.endDate || ""}
                                    onChange={(v) => updateForm("endDate", v)}
                                />
                            </>
                        }
                    />
                )}
            </SortableList>
        </div>
    );
}
