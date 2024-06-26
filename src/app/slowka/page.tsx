"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { WordsCount } from "./[level]/Types";

const levels = ["a1", "a2", "b1", "b2", "c1", "c2"];

const getLevelData = async (level: string) => {
    const response = await fetch(`/data/level${level.toUpperCase()}.json`);
    const data = await response.json();
    return data;
};

const WordPage = () => {
    const [learnedWords, setLearnedWords] = useState<{ [key: string]: number }>(
        {}
    );
    const [totalWordsPerLevel, setTotalWordsPerLevel] = useState<WordsCount>(
        {}
    );
    const [totalLearnedWords, setTotalLearnedWords] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            let total = 0;
            const learnedWordsData: { [key: string]: number } = {};
            const wordsCountData: WordsCount = {};

            for (const level of levels) {
                const data = await getLevelData(level);
                const remembered = JSON.parse(
                    localStorage.getItem(`rememberedWords-${level}`) || "[]"
                );
                learnedWordsData[level] = remembered.length;
                wordsCountData[level] = data.length;
                total += remembered.length;
            }

            setLearnedWords(learnedWordsData);
            setTotalWordsPerLevel(wordsCountData);
            setTotalLearnedWords(total);
        };

        fetchData();
    }, []);

    return (
        <div className="p-12 text-center">
            <h1 className="text-2xl mb-8">Wybierz swój poziom:</h1>
            <h2 className="text-lg mb-2">
                Suma nauczonych słów: {totalLearnedWords}
            </h2>
            <div className="flex items-center flex-wrap justify-center space-y-5 lg:space-y-0 lg:space-x-12 py-12 text-xl">
                {levels.map((level) => {
                    const learnedCount = learnedWords[level] || 0;
                    const totalWords = totalWordsPerLevel[level] || 0;
                    const percentage = totalWords
                        ? Math.round((learnedCount / totalWords) * 100)
                        : 0;

                    return (
                        <Link
                            key={level}
                            href={`/slownictwo/${level}`}
                            className="p-8 border rounded-xl bg-white shadow-lg"
                        >
                            <div className="mb-2">
                                {level.toUpperCase()}
                                <p className="text-sm text-gray-500">
                                    Nauczone słowa: {learnedCount}
                                </p>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-4">
                                <div
                                    className="bg-blue-600 h-4 rounded-full"
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">
                                {percentage}%
                            </p>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default WordPage;
