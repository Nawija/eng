import { useState } from "react";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import CodeAndPreview from "./CodeAndPreview";
import MarkdownClient from "./MarkdownClient";
import { CodeXml, Copy } from "lucide-react";

type MdxType = {
    rawContent: string;
    mdxSource: MDXRemoteSerializeResult;
    category: string;
};

export default function ClientComponent({
    rawContent,
    mdxSource,
    category,
}: MdxType) {
    const [showCode, setShowCode] = useState(false);
    const [copied, setCopied] = useState(false);

    async function copyToClipboard() {
        try {
            await navigator.clipboard.writeText(rawContent);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            alert("Failed to copy!");
        }
    }

    return (
        <section className="border border-gray-300 p-3 rounded-lg space-y-2 w-full">
            <div className="flex items-center justify-between w-full">
                <h2 className="text-sm font-semibold text-gray-400 tracking-widest uppercase">
                    {category}
                </h2>

                <div className="flex items-center gap-2">
                    <button
                        onClick={copyToClipboard}
                        className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs p-2 rounded border border-gray-400 transition-colors"
                    >
                        {copied ? (
                            "Copied!"
                        ) : (
                            <Copy size={16} strokeWidth={2} />
                        )}
                    </button>
                    <button
                        className="p-2 rounded bg-blue-600 text-white hover:bg-blue-700 text-xs cursor-pointer font-semibold transition-colors"
                        onClick={() => setShowCode((prev) => !prev)}
                    >
                        <CodeXml size={16} strokeWidth={3} />
                    </button>
                </div>
            </div>
            <div className="w-full h-full relative p-2">
                {showCode ? (
                    <div className="relative max-h-[60vh] w-[86vw] overflow-y-scroll">
                        <CodeAndPreview code={rawContent} />
                    </div>
                ) : (
                    <MarkdownClient mdxSource={mdxSource} />
                )}
            </div>
        </section>
    );
}
