import React, { useState, useEffect, useRef } from "react";
import { ClipboardCopy, Check, Send, Trash2 } from "lucide-react";
import useChat from "../hooks/useChat";
import { clearRoleHistory, MessageContent } from "../utils/helper"


const ChatBox = ({ selectedRole }) => {
    const { messages, sendMessage, loading, setMessages } = useChat(selectedRole);
    const [input, setInput] = useState("");
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const endOfMessagesRef = useRef(null);
    const textareaRef = useRef(null);

    useEffect(() => {
        if (endOfMessagesRef.current) {
            endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, loading]);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
        }
    }, [input]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        await sendMessage(input);
        setInput("");
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }
    };

    const handleCopy = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 1500);
    };

    const handleClearHistory = () => {
        if (messages.length === 0) return;
        setShowClearConfirm(true);
    };

    const confirmClearHistory = () => {
        clearRoleHistory(selectedRole.id);
        setShowClearConfirm(false);
        setMessages([]);
    };

    const cancelClearHistory = () => {
        setShowClearConfirm(false);
    };

    useEffect(() => {
        setShowClearConfirm(false);
    }, [selectedRole]);

    if (!selectedRole)
        return (
            <div className="flex-1 flex items-center justify-center bg-linear-to-br from-amber-50/30 to-orange-50/20 dark:from-gray-900 dark:to-amber-900/10">
                <div className="text-center p-8">
                    <div className="flex items-center justify-center mx-auto mb-4 w-20 h-20 bg-linear-to-br from-yellow-400 to-orange-500 rounded-xl shadow-lg">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold bg-linear-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent mb-2">
                        Welcome to Lumina
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md">
                        Select an AI assistant from the sidebar to start a conversation and illuminate your path.
                    </p>
                </div>
            </div>
        );

    return (
        <div className="flex flex-col h-full bg-linear-to-br from-amber-50/20 to-orange-50/10 dark:from-gray-900 dark:to-amber-900/10 transition-colors">
            {/* Chat Header */}
            <div className="p-4 border-b border-amber-200 dark:border-amber-700/30 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <div className="flex items-center gap-3 relative">
                    <div className="w-10 h-10 bg-linear-to-br from-amber-100 to-orange-100 dark:from-amber-500 dark:to-orange-600 rounded-xl shadow-md flex items-center justify-center">
                        <span className="text-lg text-white">{selectedRole.emoji}</span>
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-900 dark:text-white">
                            {selectedRole.name}
                        </h2>
                        <p className="text-sm text-amber-600 dark:text-amber-400">
                            {selectedRole.description}
                        </p>
                    </div>
                    
                    {/* Clear History Button */}
                    <div className="absolute right-0">
                        {messages.length > 0 && !showClearConfirm && (
                            <button 
                                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-amber-300 dark:border-amber-600 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-all duration-200 text-sm font-medium cursor-pointer shadow-sm"
                                onClick={handleClearHistory}
                                title="Clear conversation history"
                            >
                                <Trash2 size={16} />
                                Clear History
                            </button>
                        )}
                        
                        {/* Confirmation Dialog */}
                        {showClearConfirm && (
                            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-amber-200 dark:border-amber-700 rounded-lg p-2 shadow-lg">
                                <span className="text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                    Clear all messages?
                                </span>
                                <button 
                                    className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm transition-colors cursor-pointer"
                                    onClick={confirmClearHistory}
                                >
                                    Yes
                                </button>
                                <button 
                                    className="px-2 py-1 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 rounded text-sm transition-colors cursor-pointer"
                                    onClick={cancelClearHistory}
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center text-gray-500 dark:text-gray-400">
                            <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                                <Send size={24} className="text-amber-500 dark:text-amber-400" />
                            </div>
                            <p className="text-lg font-medium text-amber-600 dark:text-amber-400 mb-2">
                                Start a conversation with {selectedRole.name}
                            </p>
                            <p className="text-sm">
                                Send a message to begin chatting with your {selectedRole.name.toLowerCase()} assistant.
                            </p>
                        </div>
                    </div>
                ) : (
                    messages.map((msg, i) => {
                        const isUser = msg.role === "user";
                        return (
                            <div
                                key={i}
                                className={`flex ${isUser ? "justify-end" : "justify-start"
                                    }`}
                            >
                                <div
                                    className={`group relative px-4 py-1 rounded-2xl text-sm leading-relaxed wrap-break-word shadow-sm transition-all duration-200  ${isUser
                                        ? "bg-linear-to-r from-amber-200 to-amber-200 dark:bg-linear-to-r dark:from-amber-500 dark:to-orange-500 dark:text-white max-w-[75%] shadow-amber-500/25"
                                        : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 max-w-[75%] border border-amber-100 dark:border-amber-900/50 shadow-md"
                                        }`}
                                    onContextMenu={(e) => e.preventDefault()}
                                >
                                    {/* Message content with React Markdown */}
                                    <MessageContent content={msg.content} />

                                    {/* Copy button (only for assistant messages) */}
                                    {!isUser && (
                                        <button
                                            onClick={() => handleCopy(msg.content, i)}
                                            className={`absolute top-2 right-2 hidden group-hover:flex items-center gap-1 text-xs transition-all duration-200 ${copiedIndex === i ? "text-amber-600 dark:text-amber-400" : "text-amber-500 dark:text-amber-500 hover:text-amber-600 dark:hover:text-amber-400"}`}
                                            title="Copy entire message (including table markdown)"
                                        >
                                            {copiedIndex === i ? (
                                                <>
                                                    <Check size={16} />
                                                    <span className="text-xs">Copied</span>
                                                </>
                                            ) : (
                                                <ClipboardCopy size={16} />
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}

                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-white dark:bg-gray-800 border border-amber-100 dark:border-amber-900/50 p-4 rounded-2xl shadow-md max-w-[75%] ">
                            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 italic">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                                Thinking...
                            </div>
                        </div>
                    </div>
                )}

                {/* Scroll target */}
                <div ref={endOfMessagesRef} />
            </div>

            {/* Input Bar */}
            <form
                onSubmit={handleSend}
                className="p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm flex gap-3 border-t border-amber-200 dark:border-amber-700/30"
            >
                <div className="flex-1 relative">
                    <textarea
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        disabled={loading}
                        rows={1}
                        className="w-full p-3 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 outline-none border border-amber-200 dark:border-amber-700/50 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400 resize-none overflow-y-auto"
                        style={{
                            maxHeight: '120px',
                            scrollbarWidth: 'thin',
                            scrollbarColor: 'rgb(252 211 77) transparent'
                        }}
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-3 bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl transition-all duration-200 shadow-lg shadow-amber-500/25 hover:shadow-amber-600/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium self-end"
                    disabled={loading || !input.trim()}
                >
                    <Send size={18} />
                    Send
                </button>
            </form>
        </div>
    );
}
export default ChatBox;