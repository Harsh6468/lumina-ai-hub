import React, { useState, useEffect, useMemo, useCallback, Suspense, lazy } from "react";
import useRoles from "../hooks/useRoles";
import { CATEGORY_ICONS } from "../constants";
import RagCard from "../components/RagCard";

const NewRoleFormModal = lazy(() => import("../components/NewRoleFormModal"));

const DEBOUNCE_MS = 300;

const Dashboard = ({ onSelectRole, onAddNewRole }) => {
    const { customRoles = [], loading: rolesLoading, loadCustomRoles } = useRoles();

    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [isNewRoleFormVisible, setIsNewRoleFormVisible] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(searchQuery.trim().toLowerCase()), DEBOUNCE_MS);
        return () => clearTimeout(t);
    }, [searchQuery]);

    const categories = useMemo(() => ["All", ...Object.keys(CATEGORY_ICONS)], []);

    const { filteredRolesByCategory, totalResults } = useMemo(() => {
        if (!customRoles || customRoles.length === 0) {
            return { filteredRolesByCategory: {}, totalResults: 0 };
        }

        let filtered = customRoles;

        if (selectedCategory !== "All") {
            filtered = filtered.filter((r) => r.category === selectedCategory);
            if (filtered.length === 0) return { filteredRolesByCategory: {}, totalResults: 0 };
        }

        if (debouncedSearch) {
            const q = debouncedSearch;
            filtered = filtered.filter((role) => {
                const name = (role.name || "").toLowerCase();
                const desc = (role.description || "").toLowerCase();
                const cat = (role.category || "").toLowerCase();
                const prompt = (role.prompt || "").toLowerCase();
                return name.includes(q) || desc.includes(q) || cat.includes(q) || prompt.includes(q);
            });
            if (filtered.length === 0) return { filteredRolesByCategory: {}, totalResults: 0 };
        }

        const grouped = {};
        for (let i = 0; i < filtered.length; i++) {
            const r = filtered[i];
            const cat = r.category || "Uncategorized";
            if (!grouped[cat]) grouped[cat] = [];
            grouped[cat].push(r);
        }

        return { filteredRolesByCategory: grouped, totalResults: filtered.length };
    }, [customRoles, selectedCategory, debouncedSearch]);

    const sortedCategories = useMemo(() => {
        if (!filteredRolesByCategory) return [];
        const categoryOrder = Object.keys(CATEGORY_ICONS);
        return Object.entries(filteredRolesByCategory).sort((a, b) => {
            const ia = categoryOrder.indexOf(a[0]);
            const ib = categoryOrder.indexOf(b[0]);
            if (ia === -1 && ib === -1) return a[0].localeCompare(b[0]);
            if (ia === -1) return 1;
            if (ib === -1) return -1;
            return ia - ib;
        });
    }, [filteredRolesByCategory]);

    const clearFilters = useCallback(() => {
        setSearchQuery("");
        setSelectedCategory("All");
    }, []);

    const handleNewRoleSuggestion = useCallback(() => {
        setIsNewRoleFormVisible(true);
    }, []);

    const handleSubmitNewRole = useCallback(
        (newRoleData) => {
            onAddNewRole?.(newRoleData);
            setIsNewRoleFormVisible(false);
            loadCustomRoles?.();
            console.log("New role submitted:", newRoleData);
        },
        [onAddNewRole, loadCustomRoles]
    );

    const handleCloseForm = useCallback(() => {
        setIsNewRoleFormVisible(false);
    }, []);

    if (rolesLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-amber-400 border-t-transparent mx-auto mb-4" />
                    <div className="text-amber-700 dark:text-amber-300 font-medium">Loading illuminations…</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-amber-50/30 to-orange-50/20 dark:from-gray-900 dark:to-amber-900/10 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-center text-center gap-5 mb-12">
                    <div className="flex items-center justify-center mb-2">
                        <div className="flex items-center justify-center w-15 h-15 bg-linear-to-br from-yellow-400 to-orange-500 rounded-xl shadow-lg">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold bg-linear-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent mb-4">
                        Lumina AI Hub
                    </h1>
                </div>

                {/* Search + Counters */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6">
                        <div className="relative flex-1 max-w-2xl">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search roles by name, description, or prompt..."
                                className="w-full pl-12 pr-10 py-3 bg-white dark:bg-gray-800 border border-amber-200 dark:border-amber-700/50 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white"
                                aria-label="Search roles"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-amber-500 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>

                            {searchQuery && (
                                <button onClick={() => setSearchQuery("")} className="absolute inset-y-0 right-0 pr-3 flex items-center" aria-label="Clear search">
                                    <svg className="h-5 w-5 text-amber-500 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>

                        <div className="text-sm text-amber-700 dark:text-amber-300 whitespace-nowrap font-medium">
                            {totalResults} {totalResults === 1 ? "illumination" : "illuminations"}
                        </div>
                    </div>

                    {/* Category buttons */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${selectedCategory === cat
                                        ? "dark:bg-linear-to-r dark:from-amber-500 dark:to-amber-500 bg-linear-to-r from-amber-100 to-amber-100 text-orange-900 dark:text-amber-950 shadow-lg"
                                        : "bg-white dark:bg-gray-800 border border-amber-200 dark:border-amber-700/50 text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                                    }`}
                                aria-pressed={selectedCategory === cat}
                            >
                                {cat === "All" ? "All Illuminations" : cat}
                            </button>
                        ))}

                        {(searchQuery || selectedCategory !== "All") && (
                            <button onClick={clearFilters} className="px-4 py-2 bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700/50 rounded-lg text-sm font-medium text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-800/40 transition-all duration-200 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Clear
                            </button>
                        )}
                    </div>
                </div>

                {/* Roles listing */}
                {totalResults === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 mx-auto mb-4 bg-linear-to-br from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 rounded-full flex items-center justify-center">
                            <svg className="w-10 h-10 text-amber-400 dark:text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No illuminations found</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">Try adjusting your search or filter criteria</p>
                        <button onClick={clearFilters} className="px-6 py-2 bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-lg transition-all duration-200 shadow-lg shadow-amber-500/25">
                            Show all illuminations
                        </button>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {sortedCategories.map(([category, rolesInCategory]) => (
                            <section key={category} className="scroll-mt-8">
                                {/* Category header */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="flex items-center justify-center w-12 h-12 bg-linear-to-br from-amber-100 to-amber-100 dark:from-amber-500 dark:to-orange-600 rounded-xl shadow-lg">
                                        <span className="text-xl text-white">{CATEGORY_ICONS[category] || category[0]}</span>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-200">{category}</h2>
                                        <p className="text-amber-600 dark:text-amber-400 mt-1">{rolesInCategory.length} {rolesInCategory.length === 1 ? "illumination" : "illuminations"}</p>
                                    </div>
                                </div>

                                {/* Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {rolesInCategory.map((role) => (
                                        <RagCard key={role.id} role={role} onSelect={onSelectRole} searchQuery={debouncedSearch} />
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                )}

                {/* Footer */}
                <div className="text-center mt-16 pt-8 border-t border-amber-200 dark:border-amber-700/30">
                    <p className="text-amber-700 dark:text-amber-300">
                        Need a different illumination?{" "}
                        <button onClick={handleNewRoleSuggestion} className="bg-linear-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent font-medium hover:from-amber-700 hover:to-orange-700 transition-all duration-200">
                            Suggest a new role
                        </button>
                    </p>
                </div>
            </div>

            {/* New Role Modal (lazy loaded) */}
            <Suspense fallback={isNewRoleFormVisible ? <div className="fixed inset-0 flex items-center justify-center z-50"><div className="animate-spin rounded-full h-10 w-10 border-4 border-amber-400 border-t-transparent" /></div> : null}>
                {isNewRoleFormVisible && (
                    <NewRoleFormModal
                        onClose={handleCloseForm}
                        onSubmit={handleSubmitNewRole}
                        availableCategories={Object.keys(CATEGORY_ICONS)}
                    />
                )}
            </Suspense>
        </div>
    );
};

export default Dashboard;
