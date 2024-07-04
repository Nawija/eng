// components/WordCard.tsx
"use client";

import { useState } from "react";

interface WordCardProps {
    word: string;
    onMark: (difficulty: "easy" | "medium" | "hard") => void;
}

export default function WordCard({ word, onMark }: WordCardProps) {
    return (
        <div className="bg-white shadow p-4 rounded mb-4">
            <h2 className="text-lg font-bold mb-2">{word}</h2>
            <div className="flex space-x-4">
                <button
                    onClick={() => onMark("easy")}
                    className="bg-green-500 text-white py-2 px-4 rounded"
                >
                    Easy
                </button>
                <button
                    onClick={() => onMark("medium")}
                    className="bg-yellow-500 text-white py-2 px-4 rounded"
                >
                    Medium
                </button>
                <button
                    onClick={() => onMark("hard")}
                    className="bg-red-500 text-white py-2 px-4 rounded"
                >
                    Hard
                </button>
            </div>
        </div>
    );
}
