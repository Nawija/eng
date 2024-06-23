"use client";

import { useState, useEffect } from "react";

interface Video {
    videoUrl: string;
    words: string[];
    correctWord: string;
}

const getVideoData = async (): Promise<Video[]> => {
    const response = await fetch(`/data/videos.json`);
    return response.json();
};

const VideoPage = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [selectedWord, setSelectedWord] = useState<string | null>(null);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        getVideoData().then((data) => {
            setVideos(data);
        });
    }, []);

    const handleNextVideo = () => {
        setSelectedWord(null);
        setShowResult(false);
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    };

    const handleSelectWord = (word: string) => {
        setSelectedWord(word);
        setShowResult(true);
    };

    if (!videos.length) {
        return <div>Loading...</div>;
    }

    const currentVideo = videos[currentVideoIndex];

    return (
        <div className="p-12 text-center">
            <h1 className="text-2xl mb-8">Video {currentVideoIndex + 1}</h1>
            <div className="bg-white p-12 rounded-xl shadow-lg h-[70vh] inline-flex flex-col items-center justify-between">
                <div className="mb-4">
                    <video controls width="500" src={currentVideo.videoUrl} />
                </div>
                <div className="mt-3 lg:mt-8 flex flex-wrap items-center gap-4">
                    {currentVideo.words.map((word) => (
                        <button
                            key={word}
                            onClick={() => handleSelectWord(word)}
                            className={`px-4 py-2 ${
                                selectedWord === word
                                    ? word === currentVideo.correctWord
                                        ? "bg-green-500"
                                        : "bg-red-500"
                                    : "bg-blue-500"
                            } text-white rounded-lg shadow-xl`}
                        >
                            {word}
                        </button>
                    ))}
                </div>
                {showResult && (
                    <div className=" mt-3 lg:mt-8">
                        {selectedWord === currentVideo.correctWord ? (
                            <p className="text-green-500 text-sm">Correct!</p>
                        ) : (
                            <p className="text-red-500 text-sm">
                                Incorrect. The correct word was:{" "}
                                {currentVideo.correctWord}
                            </p>
                        )}
                    </div>
                )}
                <button
                    onClick={handleNextVideo}
                    className="mt-8 px-4 py-2 bg-gradient-to-tr from-yellow-500 to-yellow-600 text-white rounded-lg shadow-xl"
                >
                    Next Video
                </button>
            </div>
        </div>
    );
};

export default VideoPage;
