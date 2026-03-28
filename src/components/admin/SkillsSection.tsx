import { useState } from "react";
import { Icon } from "@iconify/react";
import { SkillCategory, SkillCategoryInput, Skill } from "@/lib/db";
import { SortableList } from "./SortableList";
import { EditableCard } from "./EditableCard";
import { FormInput } from "./FormInput";

interface SkillsSectionProps {
    categories: SkillCategory[];
    onUpdate: (id: string, data: Partial<SkillCategory>) => Promise<void>;
    onCreate: (data: SkillCategoryInput) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
    onReorder: (items: SkillCategory[]) => void;
}

type SkillDisplayMode = "icon" | "color";

interface SkillEditorProps {
    skill: Skill;
    onChange: (skill: Skill) => void;
    onRemove: () => void;
    isNew?: boolean;
}

function SkillEditor({ skill, onChange, onRemove, isNew }: SkillEditorProps) {
    const [mode, setMode] = useState<SkillDisplayMode>(
        skill.icon ? "icon" : "color"
    );

    const handleModeChange = (newMode: SkillDisplayMode) => {
        setMode(newMode);
        if (newMode === "icon") {
            onChange({ ...skill, icon: "devicon:react", bgColor: null, textColor: null });
        } else if (newMode === "color") {
            onChange({ ...skill, icon: null, bgColor: "#3b82f6", textColor: "#ffffff" });
        }
    };

    return (
        <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-700 rounded">
            <input
                type="text"
                value={skill.name}
                onChange={(e) => onChange({ ...skill, name: e.target.value })}
                placeholder="Skill name"
                className="flex-1 px-2 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
            <div className="flex items-center gap-1 text-xs">
                <label className="flex items-center gap-1 cursor-pointer">
                    <input
                        type="radio"
                        name={`mode-${skill.name}-${isNew}`}
                        checked={mode === "icon"}
                        onChange={() => handleModeChange("icon")}
                        className="w-3 h-3"
                    />
                    Icon
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                    <input
                        type="radio"
                        name={`mode-${skill.name}-${isNew}`}
                        checked={mode === "color"}
                        onChange={() => handleModeChange("color")}
                        className="w-3 h-3"
                    />
                    Color
                </label>
            </div>
            {mode === "icon" && (
                <input
                    type="text"
                    value={skill.icon || ""}
                    onChange={(e) => onChange({ ...skill, icon: e.target.value })}
                    placeholder="icon:name"
                    className="w-32 px-2 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
            )}
            {mode === "color" && (
                <>
                    <input
                        type="color"
                        value={skill.bgColor || "#3b82f6"}
                        onChange={(e) => onChange({ ...skill, bgColor: e.target.value })}
                        className="w-8 h-8 rounded cursor-pointer"
                        title="Background color"
                    />
                    <input
                        type="text"
                        value={skill.bgColor || "#3b82f6"}
                        onChange={(e) => {
                            const val = e.target.value;
                            if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
                                onChange({ ...skill, bgColor: val });
                            }
                        }}
                        placeholder="#000000"
                        className="w-20 px-2 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        title="Paste hex code"
                    />
                    <input
                        type="color"
                        value={skill.textColor || "#ffffff"}
                        onChange={(e) => onChange({ ...skill, textColor: e.target.value })}
                        className="w-8 h-8 rounded cursor-pointer"
                        title="Text color"
                    />
                    <input
                        type="text"
                        value={skill.textColor || "#ffffff"}
                        onChange={(e) => {
                            const val = e.target.value;
                            if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
                                onChange({ ...skill, textColor: val });
                            }
                        }}
                        placeholder="#ffffff"
                        className="w-20 px-2 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        title="Paste hex code"
                    />
                </>
            )}
            <button
                type="button"
                onClick={onRemove}
                className="px-2 py-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded"
            >
                ×
            </button>
        </div>
    );
}

interface SkillViewProps {
    skill: Skill;
}

function SkillView({ skill }: SkillViewProps) {
    if (skill.icon) {
        return (
            <div className="flex items-center gap-1 px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-full">
                <Icon icon={skill.icon} className="text-base" />
                <span className="text-xs">{skill.name}</span>
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
        <div className="flex items-center gap-1 px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-full">
            <div
                className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold"
                style={{ backgroundColor: skill.bgColor || "#3b82f6", color: skill.textColor || "#ffffff" }}
            >
                {initials}
            </div>
            <span className="text-xs">
                {skill.name}
            </span>
        </div>
    );
}

export function SkillsSection({
    categories,
    onUpdate,
    onCreate,
    onDelete,
    onReorder,
}: SkillsSectionProps) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState<Partial<SkillCategory>>({});
    const [pendingChanges, setPendingChanges] = useState<Record<string, Partial<SkillCategory>>>({});
    const [pendingOrder, setPendingOrder] = useState<Record<string, number>>({});
    const [localCategories, setLocalCategories] = useState<SkillCategory[]>([]);
    const [saving, setSaving] = useState(false);

    const displayCategories = localCategories.length > 0 ? localCategories : categories;

    const hasChanges = Object.keys(pendingChanges).length > 0 || Object.keys(pendingOrder).length > 0;

    function handleEdit(cat: SkillCategory) {
        setEditingId(cat._id);
        setForm({ ...cat });
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
            name: "New Category",
            order: categories.length,
            skills: [],
        });
    }

    function updateForm(field: keyof SkillCategory, value: unknown) {
        const updated = { ...form, [field]: value };
        setForm(updated);
        setPendingChanges((prev) => ({
            ...prev,
            [editingId!]: updated,
        }));
    }

    function addSkill() {
        const currentSkills = form.skills || [];
        const updatedSkills = [...currentSkills, { name: "", icon: null, bgColor: null, textColor: null }];
        updateForm("skills", updatedSkills);
    }

    function updateSkill(index: number, updatedSkill: Skill) {
        const currentSkills = form.skills || [];
        const newSkills = [...currentSkills];
        newSkills[index] = updatedSkill;
        updateForm("skills", newSkills);
    }

    function removeSkill(index: number) {
        const currentSkills = form.skills || [];
        const updatedSkills = currentSkills.filter((_, i) => i !== index);
        updateForm("skills", updatedSkills);
    }

    async function handleSaveAll() {
        setSaving(true);
        try {
            // Save order changes first
            for (const [id, order] of Object.entries(pendingOrder)) {
                await onUpdate(id, { order });
            }
            // Save data changes
            for (const [id, data] of Object.entries(pendingChanges)) {
                await onUpdate(id, data);
            }
            setPendingChanges({});
            setPendingOrder({});
            setLocalCategories([]);
            setEditingId(null);
            setForm({});
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
                    Add Category
                </button>
                <button
                    onClick={handleSaveAll}
                    disabled={!hasChanges || saving}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </div>

            <SortableList
                items={displayCategories}
                onReorder={(items) => {
                    setLocalCategories(items);
                    const newOrder: Record<string, number> = {};
                    items.forEach((item, index) => {
                        newOrder[item._id] = index;
                    });
                    setPendingOrder(newOrder);
                }}
                saveOnReorder={false}
            >
                {(cat) => (
                    <EditableCard
                        id={cat._id}
                        isEditing={editingId === cat._id}
                        onEdit={() => handleEdit(cat)}
                        onDelete={() => handleDelete(cat._id)}
                        onSave={() => {}}
                        onCancel={handleCancel}
                        viewContent={
                            <div>
                                <h3 className="font-semibold text-lg mb-2">{cat.name}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {cat.skills.map((skill, idx) => (
                                        <SkillView key={idx} skill={skill} />
                                    ))}
                                </div>
                            </div>
                        }
                        editContent={
                            <>
                                <FormInput
                                    placeholder="Category Name"
                                    value={form.name || ""}
                                    onChange={(v) => updateForm("name", v)}
                                />
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Skills
                                    </label>
                                    {(form.skills || cat.skills).map((skill, idx) => (
                                        <SkillEditor
                                            key={idx}
                                            skill={skill}
                                            onChange={(updated) => updateSkill(idx, updated)}
                                            onRemove={() => removeSkill(idx)}
                                            isNew={!skill.name}
                                        />
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addSkill}
                                        className="text-sm text-sky-600 hover:underline"
                                    >
                                        + Add Skill
                                    </button>
                                </div>
                            </>
                        }
                    />
                )}
            </SortableList>
        </div>
    );
}
