import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Chats from "./pages/Chats";

export default function App() {
    const [currentPage, setCurrentPage] = useState("dashboard");
    const [selectedRole, setSelectedRole] = useState(null);

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />

            <main className="flex-1 overflow-y-auto">
                {currentPage === "dashboard" && (
                    <Dashboard onSelectRole={(role) => {
                        setSelectedRole(role);
                        setCurrentPage("chats");
                    }} />
                )}

                {currentPage === "chats" && <Chats selectedRole={selectedRole} />}
            </main>
        </div>
    );
}
