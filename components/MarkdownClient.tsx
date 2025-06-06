"use client";

import React from 'react';

type MarkdownClientProps = {
    compiledContent: React.ReactNode;
    className?: string;
};

export default function MarkdownClient({
    compiledContent,
    className = "",
}: MarkdownClientProps) {
    return (
        <div className={`prose prose-sm max-w-none ${className}`}>
            {compiledContent}
        </div>
    );
}