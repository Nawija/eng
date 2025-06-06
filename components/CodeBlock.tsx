"use client";

import { Copy } from "lucide-react";
import { useState } from "react";

export default function CodeBlock({
    code,
    language,
}: {
    code: string;
    language?: string;
}) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative bg-gray-900 text-white rounded-xl p-4 mb-4 shadow-md">
            <pre className="overflow-x-auto text-sm">
                <code className={`language-${language}`}>{code}</code>
            </pre>
            
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 text-sm text-white bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
            >
                {copied ? "Skopiowano!" : <Copy size={16} />}
            </button>
        </div>
    );
}
