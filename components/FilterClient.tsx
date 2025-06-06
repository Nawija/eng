"use client";

import { useState } from "react";
import ClientComponent from "./ClientComponent";

type FileType = {
    fileName: string;
    rawContent: string;
    mdxSource: any;
    category: string;
};

export default function FilterClient({
    allFiles,
    categories,
}: {
    allFiles: FileType[];
    categories: string[];
}) {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const filteredFiles = activeCategory
        ? allFiles.filter((f) => f.category === activeCategory)
        : allFiles;

    return (
        <div className="flex items-start justify-start">
            {/* Sidebar */}
            <aside className="sticky top-0 p-3 py-6 pr-0 min-w-44 bg-zinc-800 h-screen overscroll-y-auto">
                <ul>
                    <li
                        className={`cursor-pointer uppercase text-sm font-semibold tracking-widest py-4 pl-6 rounded-l-2xl ${
                            activeCategory === null
                                ? "bg-white text-black"
                                : "text-white"
                        }`}
                        onClick={() => setActiveCategory(null)}
                    >
                        All
                    </li>
                    {categories.map((cat) => (
                        <li
                            key={cat}
                            className={`cursor-pointer uppercase text-sm font-semibold tracking-widest py-4 pl-6 rounded-l-2xl ${
                                activeCategory === cat
                                    ? "bg-white text-black"
                                    : "text-white"
                            }`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Main content */}
            <section className="flex-1 space-y-6 p-6 w-full overflow-hidden">
                {filteredFiles.map(
                    ({ fileName, rawContent, mdxSource, category }) => (
                        <ClientComponent
                            key={fileName}
                            rawContent={rawContent}
                            mdxSource={mdxSource}
                            category={category}
                        />
                    )
                )}
            </section>
        </div>
    );
}
