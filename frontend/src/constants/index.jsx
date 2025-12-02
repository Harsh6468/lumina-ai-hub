import React, { useState, useEffect, useRef, Children, isValidElement } from "react";
import { CodeBlock } from "../utils/helper";

export const CATEGORY_ICONS = {
    "General": "🌟",
    "Health & Wellness": "🩺",
    "Education & Learning": "🎓",
    "Technology & Development": "💻",
    "Business & Productivity": "💼",
    "Creative & Personal Growth": "✍️",
    "Home & Lifestyle": "🏠",
    "Finance & Legal": "💰",
    "Gaming & Entertainment": "🎮",
    "Travel & Adventure": "✈️",
    "Music & Arts": "🎵",
    "Science & Research": "🔬",
    "Social & Communication": "👥",
    "Sustainability": "🌱",
    "Personal Development": "🧠"
};

export const BASE_URL = "https://lumina-ai-hub.onrender.com";

export const MarkdownComponents = {
    h1: (props) => <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-4 mb-2 " {...props} />,
    h2: (props) => <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-4 mb-2 " {...props} />,
    h3: (props) => <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-3 mb-2 " {...props} />,
    h4: (props) => <h4 className="text-base font-bold text-gray-900 dark:text-white mt-3 mb-1 " {...props} />,

    p: (props) => {
        const hasBlockElements = React.Children.toArray(props.children).some(child => {
            if (React.isValidElement(child)) {
                const elementType = child.type;
                if (typeof elementType === 'function') {
                    return elementType === CodeBlock;
                }
                return ['div', 'table', 'ul', 'ol', 'blockquote', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(elementType);
            }
            return false;
        });

        if (hasBlockElements) {
            return <div className="my-2" {...props} />;
        }

        return <p className="my-2 text-gray-900 dark:text-gray-100 leading-relaxed " {...props} />;
    },

    ul: (props) => <ul className="my-2 ml-4 list-disc space-y-1 " {...props} />,
    ol: (props) => <ol className="my-2 ml-4 list-decimal space-y-1 " {...props} />,
    li: (props) => <li className="text-gray-900 dark:text-gray-100 " {...props} />,

    a: (props) => (
        <a
            className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 underline transition-colors "
            target="_blank"
            rel="noopener noreferrer"
            {...props}
        />
    ),

    blockquote: (props) => (
        <blockquote
            className="border-l-4 border-amber-400 dark:border-amber-500 pl-4 my-4 italic text-gray-700 dark:text-gray-300 bg-amber-50 dark:bg-amber-900/20 py-2 "
            {...props}
        />
    ),

    table: (props) => (
        <div className="overflow-x-auto my-4 " onContextMenu={(e) => e.preventDefault()}>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg " {...props} />
        </div>
    ),
    thead: (props) => <thead className="bg-gray-50 dark:bg-gray-800 " {...props} />,
    tbody: (props) => <tbody className="divide-y divide-gray-200 dark:divide-gray-700 " {...props} />,
    tr: (props) => <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 " {...props} />,
    th: (props) => (
        <th
            className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 "
            {...props}
        />
    ),
    td: (props) => (
        <td
            className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 "
            {...props}
        />
    ),

    code: CodeBlock,

    strong: (props) => <strong className="font-bold text-gray-900 dark:text-white " {...props} />,
    em: (props) => <em className="italic text-gray-700 dark:text-gray-300 " {...props} />,

    hr: (props) => <hr className="my-4 border-gray-300 dark:border-gray-600 " {...props} />,

    pre: ({ children, ...props }) => {
        return <div {...props}>{children}</div>;
    },
};
