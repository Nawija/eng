"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const levels = ["a1", "a2", "b1", "b2", "c1", "c2"];

const WordPage = () => {
    const [learnedWords, setLearnedWords] = useState<{ [key: string]: number }>(
        {}
    );
    const [totalLearnedWords, setTotalLearnedWords] = useState(0);

    useEffect(() => {
        let total = 0;
        const learnedWordsData: { [key: string]: number } = {};

        levels.forEach((level) => {
            const remembered = JSON.parse(
                localStorage.getItem(`rememberedWords-${level}`) || "[]"
            );
            learnedWordsData[level] = remembered.length;
            total += remembered.length;
        });

        setLearnedWords(learnedWordsData);
        setTotalLearnedWords(total);
    }, []);

    return (
        <div className="p-12 text-center">
            <h1 className="text-2xl mb-8">Wybierz swój poziom:</h1>
            <h2 className="text-lg mb-2">
                Suma nauczonych słów: {totalLearnedWords}
            </h2>
            <div className="flex items-center flex-wrap justify-center space-y-5 lg:space-y-0 lg:space-x-12 py-12 text-xl">
                {levels.map((level) => (
                    <Link
                        key={level}
                        href={`/slownictwo/${level}`}
                        className="p-8 border rounded-xl bg-white shadow-lg"
                    >
                        {level.toUpperCase()}
                        <p className="text-sm text-gray-500">
                            Nauczone słowa: {learnedWords[level] || 0}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default WordPage;
