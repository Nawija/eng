"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type CodeAndPreviewProps = {
    code: string;
};

export default function CodeAndPreview({ code }: CodeAndPreviewProps) {
    return (
        <div className="relative">
            <SyntaxHighlighter language="tsx" style={oneDark} showLineNumbers>
                {code}
            </SyntaxHighlighter>
        </div>
    );
}
