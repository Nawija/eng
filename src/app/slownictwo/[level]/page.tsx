"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { MdOutlineTranslate, MdPlayArrow, MdPause } from "react-icons/md";

interface Word {
    w: string;
    t: string;
    i: string;
    a: string;
}

const getLevelData = async (level: string): Promise<Word[]> => {
    const response = await fetch(`/data/level${level.toUpperCase()}.json`);
    return response.json();
};

const LevelPage = () => {
    const params = useParams();
    const level = params.level as string;
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
            getLevelData(level).then((data) => {
                setWords(data);
                const savedIndex = localStorage.getItem(
                    `currentWordIndex-${level}`
                );
                if (savedIndex !== null) {
                    setCurrentWordIndex(parseInt(savedIndex));
                }

                const savedRemembered = JSON.parse(
                    localStorage.getItem(`rememberedWords-${level}`) || "[]"
                );
                setRememberedWords(savedRemembered);

                const savedDifficult = JSON.parse(
                    localStorage.getItem(`difficultWords-${level}`) || "[]"
                );
                setDifficultWords(savedDifficult);

                const savedDifficultQueue = JSON.parse(
                    localStorage.getItem(`difficultWordsQueue-${level}`) || "[]"
                );
                setDifficultWordsQueue(savedDifficultQueue);
            });
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

    const handleNextWord = () => {
        setShowTranslation(false);
        let nextIndex = (currentWordIndex + 1) % words.length;

        // Filtrujemy zapamiętane słowa
        let attempts = 0;
        while (
            rememberedWords.includes(words[nextIndex].w) &&
            attempts < words.length
        ) {
            nextIndex = (nextIndex + 1) % words.length;
            attempts++;
        }

        // Jeśli wszystkie słowa są zapamiętane, wyświetlamy gratulacje
        if (attempts === words.length) {
            setCurrentWordIndex(-1);
        } else {
            setCurrentWordIndex(nextIndex);
        }
    };

    const handleToggleTranslation = () => {
        setShowTranslation((prevShow) => !prevShow);
    };

    const handleRememberWord = () => {
        const currentWord = words[currentWordIndex].w;
        setRememberedWords([...rememberedWords, currentWord]);
        handleNextWord();
    };

    const handleDifficultWord = () => {
        const currentWord = words[currentWordIndex].w;
        setDifficultWords([...difficultWords, currentWord]);
        setDifficultWordsQueue([
            ...difficultWordsQueue,
            { word: currentWord, timeAdded: new Date().getTime() },
        ]);
        handleNextWord();
    };

    const playAudio = (audioPath: string) => {
        const audio = new Audio(audioPath);
        setIsPlaying(true);
        audio.play();
        audio.onended = () => {
            setIsPlaying(false);
        };
    };

    if (!words.length) {
        return <div>Loading...</div>;
    }

    // Sprawdzenie, czy wszystkie słowa zostały zapamiętane
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
            <div className="bg-white p-12 rounded-xl shadow-lg h-[50vh] inline-flex flex-col items-center justify-between">
                <div>
                    <p className="text-2xl">{currentWord.w}</p>
                    {showTranslation && (
                        <>
                            <p className="text-lg text-gray-600 my-2 border-t">
                                {currentWord.t}
                            </p>
                            <img src={currentWord.i} className="h-44 mt-2" />
                        </>
                    )}
                </div>
                <div className="mt-8 flex justify-center space-x-3">
                    <button
                        onClick={handleToggleTranslation}
                        className="p-2 bg-gradient-to-tr from-blue-500 to-blue-600 text-white rounded-lg shadow-xl"
                    >
                        <MdOutlineTranslate size={22} />
                    </button>
                    <button
                        onClick={() => playAudio(currentWord.a)}
                        className="p-2 bg-gradient-to-tr from-purple-500 to-purple-600 text-white rounded-lg shadow-xl"
                    >
                        {isPlaying ? (
                            <MdPause size={22} />
                        ) : (
                            <MdPlayArrow size={22} />
                        )}
                    </button>
                    <button
                        onClick={handleRememberWord}
                        className="px-4 py-2 bg-gradient-to-tr from-green-500 to-green-600 text-white rounded-lg shadow-xl"
                    >
                        Łatwe
                    </button>
                    <button
                        onClick={handleDifficultWord}
                        className="px-4 py-2 bg-gradient-to-tr from-red-500 to-red-700 text-white rounded-lg shadow-xl"
                    >
                        Trudne
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LevelPage;
