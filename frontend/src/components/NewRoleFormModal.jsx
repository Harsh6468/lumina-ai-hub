import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useRoles from "../hooks/useRoles";

const DEFAULT_COLOR =
    "border-green-300 dark:border-green-700/50 hover:border-green-400 dark:hover:border-green-600";

const NewRoleFormModal = ({ onClose, onSubmit, availableCategories }) => {
    const [loading, setLoading] = useState(false);
    const { addNewRole } = useRoles();
    const [newRole, setNewRole] = useState({
        name: "",
        category: "",
        emoji: "🌟",
        description: "",
        prompt: "",
        color: DEFAULT_COLOR,
    });

    const emojiSuggestions = [
        "🌟",
        "⚡",
        "🚀",
        "💡",
        "🎯",
        "🧠",
        "💼",
        "❤️",
        "🤖",
        "📚",
        "🎨",
        "🔧",
    ];

    const colorOptions = [
        {
            value: DEFAULT_COLOR,
            label: "Green",
            preview: "bg-green-400",
        },
        {
            value:
                "border-blue-300 dark:border-blue-700/50 hover:border-blue-400 dark:hover:border-blue-600",
            label: "Blue",
            preview: "bg-blue-400",
        },
        {
            value:
                "border-purple-300 dark:border-purple-700/50 hover:border-purple-400 dark:hover:border-purple-600",
            label: "Purple",
            preview: "bg-purple-400",
        },
        {
            value:
                "border-amber-300 dark:border-amber-700/50 hover:border-amber-400 dark:hover:border-amber-600",
            label: "Amber",
            preview: "bg-amber-400",
        },
        {
            value:
                "border-pink-300 dark:border-pink-700/50 hover:border-pink-400 dark:hover:border-pink-600",
            label: "Pink",
            preview: "bg-pink-400",
        },
        {
            value:
                "border-indigo-300 dark:border-indigo-700/50 hover:border-indigo-400 dark:hover:border-indigo-600",
            label: "Indigo",
            preview: "bg-indigo-400",
        },
    ];

    // Escape key closes modal
    useEffect(() => {
        const onEsc = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onEsc);
        return () => window.removeEventListener("keydown", onEsc);
    }, [onClose]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRole((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        if (!newRole.name.trim()) return "Please enter a role name.";
        if (!newRole.category.trim()) return "Please select a category.";
        if (!newRole.description.trim()) return "Description is required.";
        if (!newRole.prompt.trim()) return "Role prompt cannot be empty.";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errorMessage = validateForm();
        if (errorMessage) {
            toast.error(errorMessage);
            return;
        }

        setLoading(true);

        const rolePayload = {
            id: `custom-${Date.now()}`,
            ...newRole,
            color: newRole.color || DEFAULT_COLOR,
        };

        try {
            const savedRole = await addNewRole(rolePayload);

            toast.success("New role created successfully!");

            onSubmit?.(savedRole);
            onClose();
        } catch (err) {
            toast.error("Failed to create role. Try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setNewRole({
            name: "",
            category: "",
            emoji: "🌟",
            description: "",
            prompt: "",
            color: DEFAULT_COLOR,
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-amber-800 dark:text-amber-200">
                        Create New Illumination
                    </h3>
                    <button
                        onClick={resetForm}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        {/* Name + Category */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Role Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={newRole.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border rounded-lg"
                                    required
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Category *
                                </label>
                                <select
                                    name="category"
                                    value={newRole.category}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border rounded-lg"
                                >
                                    <option value="">Select a category</option>
                                    {availableCategories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        {/* Emoji + Color */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Emoji */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Emoji</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="text"
                                        name="emoji"
                                        value={newRole.emoji}
                                        onChange={handleInputChange}
                                        className="w-20 px-4 py-3 text-2xl text-center bg-white dark:bg-gray-700 border rounded-lg"
                                    />

                                    <div className="flex flex-wrap gap-2">
                                        {emojiSuggestions.map((emoji) => (
                                            <button
                                                key={emoji}
                                                type="button"
                                                onClick={() =>
                                                    setNewRole((prev) => ({ ...prev, emoji }))
                                                }
                                                className={`text-2xl p-2 rounded-lg ${newRole.emoji === emoji
                                                        ? "bg-amber-100 dark:bg-amber-900/50"
                                                        : "bg-gray-100 dark:bg-gray-700"
                                                    }`}
                                            >
                                                {emoji}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Color */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Color Theme
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {colorOptions.map((c) => (
                                        <button
                                            type="button"
                                            key={c.value}
                                            onClick={() =>
                                                setNewRole((prev) => ({ ...prev, color: c.value }))
                                            }
                                            className={`flex items-center gap-2 px-3 py-2 rounded-lg ${newRole.color === c.value
                                                    ? "ring-2 ring-amber-500"
                                                    : "bg-gray-100 dark:bg-gray-700"
                                                }`}
                                        >
                                            <div className={`w-4 h-4 rounded-full ${c.preview}`} />
                                            <span>{c.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Description *
                            </label>
                            <textarea
                                name="description"
                                value={newRole.description}
                                onChange={handleInputChange}
                                rows="2"
                                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border rounded-lg"
                            />
                        </div>

                        {/* Prompt */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Role Prompt *
                            </label>
                            <textarea
                                name="prompt"
                                value={newRole.prompt}
                                onChange={handleInputChange}
                                rows="8"
                                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border rounded-lg font-mono text-sm"
                                required
                            />
                        </div>

                        {/* Submit */}
                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <button
                                type="button"
                                className="px-6 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
                                onClick={resetForm}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-3 bg-linear-to-r from-amber-500 to-orange-500 text-white rounded-lg shadow-lg"
                            >
                                {loading ? "Creating..." : "Create Illumination"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewRoleFormModal;
