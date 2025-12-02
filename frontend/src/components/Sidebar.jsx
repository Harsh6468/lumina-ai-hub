import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { Home, MessageSquare, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

export default function Sidebar({ currentPage, setCurrentPage }) {
    const [isOpen, setIsOpen] = useState(true);

    const menuItems = [
        { id: "dashboard", label: "Dashboard", icon: <Home size={18} /> },
        { id: "chats", label: "Chats", icon: <MessageSquare size={18} /> },
    ];

    return (
        <div
            className={`relative flex flex-col h-screen border-r
            bg-white dark:bg-gray-900
            border-gray-200 dark:border-gray-700
            transition-all duration-300 ease-in-out
            ${isOpen ? "w-64" : "w-20"}`}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="absolute top-3.5 -right-4 border rounded-2xl z-50 
                bg-white dark:bg-gray-800 
                border-gray-300 dark:border-gray-600
                text-gray-600 dark:text-gray-300
                transform transition-transform duration-300 hover:scale-110"
            >
                {isOpen ? <ChevronLeft size={30} /> : <ChevronRight size={30} />}
            </button>

            {/* Header with Lumina Logo */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                    {/* Lumina Logo */}
                    <div className="flex items-center justify-center w-10 h-10 bg-linear-to-br from-yellow-400 to-orange-500 rounded-xl shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                    </div>
                    <h1
                        className={`text-lg font-bold whitespace-nowrap overflow-hidden
                            bg-linear-to-r from-amber-600 to-orange-600 
                            dark:from-amber-400 dark:to-orange-400
                            bg-clip-text text-transparent
                            transition-all duration-300 ease-in-out
                            ${isOpen
                                ? "opacity-100 translate-x-0 w-auto"
                                : "opacity-0 -translate-x-2 w-0"
                            }`}
                        style={{
                            transitionDelay: isOpen ? '200ms' : '0ms',
                            transitionProperty: 'opacity, transform, width'
                        }}
                    >
                        Lumina
                    </h1>
                </div>
            </div>

            {/* Menu */}
            <nav className="flex-1 p-2 space-y-1">
                {menuItems.map((item, index) => (
                    <button
                        key={item.id}
                        onClick={() => setCurrentPage(item.id)}
                        className={`flex items-center w-full rounded-lg text-left p-3
                            transition-all duration-300 ease-in-out group
                            ${currentPage === item.id
                                ? "bg-amber-50 dark:bg-amber-900/20 shadow-md border border-amber-200 dark:border-amber-700/50 text-amber-700 dark:text-amber-300"
                                : "text-gray-700 dark:text-gray-300 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
                            }`}
                    >
                        <div
                            className={`flex justify-center items-center min-w-9 transition-all duration-300 ease-in-out
                            ${currentPage === item.id
                                    ? "text-amber-600 dark:text-amber-400"
                                    : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200"
                                }
                            ${isOpen ? "ml-1" : "ml-0"}`}
                        >
                            {item.icon}
                        </div>
                        <span
                            className={`whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out
                                ${isOpen
                                    ? "opacity-100 translate-x-0 w-auto"
                                    : "opacity-0 -translate-x-2 w-0"
                                }`}
                            style={{
                                transitionDelay: isOpen ? `${index * 80 + 200}ms` : `${index * 50}ms`,
                                transitionProperty: 'opacity, transform, width'
                            }}
                        >
                            {item.label}
                        </span>
                    </button>
                ))}
            </nav>

            <div className="p-4">
                <ThemeToggle />
            </div>
        </div>
    );
}