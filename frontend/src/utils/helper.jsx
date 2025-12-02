import { useState } from "react";
import { ClipboardCopy, Check } from "lucide-react";
import { MarkdownComponents } from "../constants";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

export const clearRoleHistory = (key) => {
    console.log(`chat_${key}`)
    localStorage.removeItem(`chat_${key}`);
};

export const clearAllHistory = () => {
    localStorage.clear();
};

export const CodeBlock = ({ className, children }) => {
    const [copied, setCopied] = useState(false);
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : 'text';
    const code = String(children).replace(/\n$/, '');

    const isInline = !className || !match;
    // console.log('CodeBlock props:', { inline, isInline, className, children: String(children).substring(0, 50) });

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (isInline) {
        return (
            <code className="inline-code bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-1.5 py-0.5 rounded text-sm font-mono border border-amber-200 dark:border-amber-800">
                {children}
            </code>
        );
    }

    return (
        <div className="code-block-wrapper my-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="code-header flex justify-between items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <span className="text-xs font-mono text-gray-600 dark:text-gray-400 uppercase">
                    {language}
                </span>
                <button
                    onClick={handleCopy}
                    className="copy-code-btn flex items-center gap-1 px-2 py-1 text-xs text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                    {copied ? (
                        <>
                            <Check size={12} />
                            Copied
                        </>
                    ) : (
                        <>
                            <ClipboardCopy size={12} />
                            Copy
                        </>
                    )}
                </button>
            </div>
            <SyntaxHighlighter
                style={typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? oneDark : oneLight}
                language={language}
                PreTag="div"
                className="rounded-none"
                customStyle={{
                    margin: 0,
                    padding: '1rem',
                    background: 'transparent',
                    fontSize: '0.875rem',
                }}
                codeTagProps={{
                    style: {
                        fontFamily: 'monospace',
                    }
                }}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    );
};

export const MessageContent = ({ content }) => {
    return (
        <div
            className="prose dark:prose-invert prose-p:my-2 prose-headings:mt-4 prose-headings:mb-2 max-w-none "
            onContextMenu={(e) => e.preventDefault()}
        >
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={MarkdownComponents}
                rehypePlugins={[]}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};
