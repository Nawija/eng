"use client";

import { Copy } from "lucide-react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type CodeAndPreviewProps = {
    code: string;
};

export default function CodeAndPreview({ code }: CodeAndPreviewProps) {
    const [copied, setCopied] = useState(false);

    async function copyToClipboard() {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            alert("Failed to copy!");
        }
    }
    return (
        <div className="mb-6">
            <div className="relative">
                <SyntaxHighlighter
                    language="tsx"
                    style={oneDark}
                    showLineNumbers
                >
                    {code}
                </SyntaxHighlighter>
                <button
                    onClick={copyToClipboard}
                    className="absolute top-2 cursor-pointer right-2 bg-gray-100 hover:bg-gray-200 text-black text-xs p-1.5 rounded"
                >
                    {copied ? "Copied!" : <Copy size={15} />}
                </button>
            </div>
        </div>
    );
}
