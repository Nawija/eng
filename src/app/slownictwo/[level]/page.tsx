"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { ImSpinner2 } from "react-icons/im";
import WordCard from "./WordCard";
import { Word } from "./Types";

const getLevelData = async (level: string): Promise<Word[]> => {
    const response = await fetch(`/data/level${level.toUpperCase()}.json`);
    return response.json();
};

export default function LevelPage() {
    const { level } = useParams<{ level: string }>();
    const [words, setWords] = useState<Word[]>([]);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [showTranslation, setShowTranslation] = useState(false);
    const [rememberedWords, setRememberedWords] = useState<string[]>([]);
    const [difficultWords, setDifficultWords] = useState<string[]>([]);
    const [difficultWordsQueue, setDifficultWordsQueue] = useState<
        { word: string; timeAdded: number }[]
    >([]);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (level) {
            (async () => {
                const data = await getLevelData(level);

                const savedRemembered = JSON.parse(
                    localStorage.getItem(`rememberedWords-${level}`) || "[]"
                );

                setRememberedWords(savedRemembered);

                const filteredData = data.filter(
                    (word) => !savedRemembered.includes(word.w)
                );

                setWords(filteredData);

                const savedIndex = localStorage.getItem(
                    `currentWordIndex-${level}`
                );
                if (savedIndex !== null) {
                    setCurrentWordIndex(parseInt(savedIndex, 10));
                }

                setDifficultWords(
                    JSON.parse(
                        localStorage.getItem(`difficultWords-${level}`) || "[]"
                    )
                );
                setDifficultWordsQueue(
                    JSON.parse(
                        localStorage.getItem(`difficultWordsQueue-${level}`) ||
                            "[]"
                    )
                );
            })();
        }
    }, [level]);

    useEffect(() => {
        if (level) {
            localStorage.setItem(
                `rememberedWords-${level}`,
                JSON.stringify(rememberedWords)
            );
            localStorage.setItem(
                `difficultWords-${level}`,
                JSON.stringify(difficultWords)
            );
            localStorage.setItem(
                `difficultWordsQueue-${level}`,
                JSON.stringify(difficultWordsQueue)
            );
        }
    }, [rememberedWords, difficultWords, difficultWordsQueue, level]);

    useEffect(() => {
        if (level && words.length > 0) {
            localStorage.setItem(
                `currentWordIndex-${level}`,
                currentWordIndex.toString()
            );
        }
    }, [currentWordIndex, level, words]);

    const handleNextWord = useCallback(() => {
        setShowTranslation(false);
        let nextIndex = (currentWordIndex + 1) % words.length;

        let attempts = 0;
        while (
            rememberedWords.includes(words[nextIndex].w) &&
            attempts < words.length
        ) {
            nextIndex = (nextIndex + 1) % words.length;
            attempts++;
        }

        setCurrentWordIndex(attempts === words.length ? -1 : nextIndex);
    }, [currentWordIndex, words, rememberedWords]);

    const handleToggleTranslation = useCallback(() => {
        setShowTranslation((prevShow) => !prevShow);
    }, []);

    const handleRememberWord = useCallback(() => {
        const currentWord = words[currentWordIndex].w;
        setRememberedWords((prev) => [...prev, currentWord]);
        handleNextWord();
    }, [currentWordIndex, words, handleNextWord]);

    const handleDifficultWord = useCallback(() => {
        const currentWord = words[currentWordIndex].w;
        setDifficultWords((prev) => [...prev, currentWord]);
        setDifficultWordsQueue((prev) => [
            ...prev,
            { word: currentWord, timeAdded: Date.now() },
        ]);
        handleNextWord();
    }, [currentWordIndex, words, handleNextWord]);

    const playAudio = useCallback((audioPath: string) => {
        const audio = new Audio(audioPath);
        setIsPlaying(true);
        audio.play();
        audio.onended = () => setIsPlaying(false);
    }, []);

    if (!words.length && rememberedWords.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24">
                <ImSpinner2
                    size={44}
                    className="animate-spin text-emerald-600"
                />
                <span className="mt-4 font-semibold tracking-wider">
                    Loading<span className="text-emerald-600">...</span>
                </span>
            </div>
        );
    }

    if (rememberedWords.length === words.length || currentWordIndex === -1) {
        return (
            <div className="text-emerald-600 text-xl lg:text-4xl flex items-center font-bold justify-center w-full h-[40vh]">
                Gratulacje ukończyłeś poziom 🤩
            </div>
        );
    }

    const currentWord = words[currentWordIndex];

    return (
        <div className="lg:p-12 text-center">
            <h1 className="text-2xl mb-8">Poziom {level.toUpperCase()}</h1>
            <WordCard
                word={currentWord}
                showTranslation={showTranslation}
                isPlaying={isPlaying}
                onToggleTranslation={handleToggleTranslation}
                onPlayAudio={playAudio}
                onRememberWord={handleRememberWord}
                onDifficultWord={handleDifficultWord}
            />
        </div>
    );
}
