"use client";

import { useState } from "react";
import ClientComponent from "./ClientComponent";
import { ArrowBigRight } from "lucide-react";
import React from 'react';

type FileType = {
    fileName: string;
    rawContent: string;
    compiledContent: React.ReactNode;
    frontMatter: Record<string, unknown>;
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
    const [showSidebar, setShowSidebar] = useState<boolean>(true);

    const filteredFiles = activeCategory
        ? allFiles.filter((f) => f.category === activeCategory)
        : allFiles;

    return (
        <div className="flex items-start justify-start relative">
            {/* Sidebar */}
            <aside
                className={`transform transition-transform duration-300 ease-in-out h-screen bg-gradient-to-bl from-gray-700 to-zinc-800 p-3 py-6 pr-0 fixed w-[11rem] top-0 z-[999] ${
                    showSidebar ? "translate-x-0 " : "-translate-x-full"
                }`}
            >
                {/* Toggle button */}
                <button
                    onClick={() => setShowSidebar((prev) => !prev)}
                    className={`absolute top-2 rounded-full cursor-pointer z-20 bg-zinc-500 text-white p-2 shadow-md hover:bg-zinc-600 transition-all ${
                        showSidebar ? "-right-4 rotate-180" : "-right-6"
                    }`}
                >
                    <ArrowBigRight size={20} />
                </button>
                <ul>
                    <li
                        className={`cursor-pointer uppercase text-sm font-semibold tracking-widest py-4 pl-6 rounded-l-2xl transition-colors ${
                            activeCategory === null
                                ? "bg-[#ebebeb] text-black"
                                : "text-white hover:text-gray-300"
                        }`}
                        onClick={() => setActiveCategory(null)}
                    >
                        All
                    </li>
                    {categories.map((cat) => (
                        <li
                            key={cat}
                            className={`cursor-pointer uppercase text-sm font-semibold tracking-widest py-4 pl-6 rounded-l-2xl transition-colors ${
                                activeCategory === cat
                                    ? "bg-[#ebebeb] text-black"
                                    : "text-white hover:text-gray-300"
                            }`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Main content */}
            <section
                className={`space-y-6 p-6 overflow-hidden transition-all duration-300 ${
                    showSidebar
                        ? "w-screen sm:w-[calc(100vw-11rem)] sm:ml-[11rem]"
                        : "w-screen"
                }`}
            >
                {filteredFiles.map(
                    ({ fileName, rawContent, compiledContent, frontMatter, category }) => (
                        <ClientComponent
                            key={fileName + category}
                            rawContent={rawContent}
                            compiledContent={compiledContent}
                            frontMatter={frontMatter}
                            category={category}
                        />
                    )
                )}
            </section>
        </div>
    );
}