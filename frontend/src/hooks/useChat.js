import { useEffect, useState } from "react";
import { sendChat } from "../api/chatAPI";

const useChat = (selectedRole) => {
    const storageKey = `chat_${selectedRole?.id || "default"}`;
    const [messages, setMessages] = useState(() => {
        const saved = localStorage.getItem(storageKey);
        return saved ? JSON.parse(saved) : [];
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(messages));
    }, [messages, storageKey]);

    const sendMessage = async (userMessage) => {
        if (!selectedRole) return alert("Please select a role first!");
        setLoading(true);

        const newMessage = { role: "user", content: userMessage };
        setMessages((prev) => [...prev, newMessage]);

        try {

            const content = await sendChat({
                messages: [
                    { role: "system", content: selectedRole.prompt },
                        ...messages,
                        newMessage,
                    ],
                });

            const botMessage = { role: "assistant", content: content };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Chat error:", error);
        } finally {
            setLoading(false);
        }
    };

    return { messages, sendMessage, loading, setMessages };
}
export default useChat;