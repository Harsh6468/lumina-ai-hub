import { useMemo } from 'react';

const RagCard = ({ role, onSelect, searchQuery = '' }) => {
    const highlightText = (text, query) => {
        if (!query.trim()) return text;

        const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        const parts = text.split(regex);

        return parts.map((part, index) =>
            query.toLowerCase().includes(part.toLowerCase()) && part.trim() !== '' ? (
                <mark key={index} className="bg-amber-200 dark:bg-amber-600 text-gray-900 dark:text-white px-1 rounded font-medium">
                    {part}
                </mark>
            ) : part
        );
    };

    const highlightedName = useMemo(() =>
        highlightText(role.name, searchQuery),
        [role.name, searchQuery]
    );

    const highlightedDescription = useMemo(() =>
        highlightText(role.description, searchQuery),
        [role.description, searchQuery]
    );

    const cardBaseClasses = "bg-white dark:bg-gray-800 shadow-md hover:shadow-xl hover:shadow-amber-500/20 dark:hover:shadow-amber-800/40 transform transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] border-2 border-amber-100 dark:border-amber-900/50";

    return (
        <button
            onClick={() => onSelect(role)}
            className={`w-full text-left p-6 rounded-2xl ${cardBaseClasses} ${role.color}`}
        >
            <div className="flex flex-col gap-4">
                <div className="flex items-start gap-4">
                    <div className="shrink-0">
                        <div className="w-14 h-14 rounded-xl bg-linear-to-br from-amber-100 to-amber-100 dark:from-amber-500 dark:to-orange-600 flex items-center justify-center text-2xl border-2 border-amber-300 dark:border-amber-600 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            {role.emoji}
                        </div>
                    </div>

                    <div className="flex-1 min-w-0 pt-1">
                        <h3 className="font-extrabold text-gray-900 dark:text-white text-xl mb-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
                            {highlightedName}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed truncate-2-lines">
                            {highlightedDescription}
                        </p>
                    </div>
                </div>

                <div className="mt-2 pt-3 border-t border-amber-100 dark:border-amber-800/50">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-xs font-semibold text-amber-700 dark:text-amber-300 shadow-sm border border-amber-200 dark:border-amber-700/50">
                        <svg className="w-3 h-3 fill-current text-amber-500 dark:text-amber-400" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Lumina Assistant
                    </span>
                </div>
            </div>
        </button>
    );
}

export default RagCard;