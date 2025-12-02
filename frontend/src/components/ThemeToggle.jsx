import { useTheme } from "../hooks/useTheme";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <>
            <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="fixed bottom-20 right-6 z-50 
                            p-3 rounded-full shadow-lg 
                            border border-gray-300 dark:border-gray-700 
                            bg-white dark:bg-gray-800 
                            text-gray-800 dark:text-gray-200 
                            hover:scale-110 transition-transform duration-200"
            >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
        </>
    );
}
