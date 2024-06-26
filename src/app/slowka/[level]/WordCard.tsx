import { MdOutlineTranslate, MdPlayArrow, MdPause } from "react-icons/md";
import { WordCardProps } from "./Types";

export default function WordCard({
    word,
    showTranslation,
    isPlaying,
    onToggleTranslation,
    onPlayAudio,
    onRememberWord,
    onDifficultWord,
}: WordCardProps) {
    return (
        <div className="bg-white p-12 rounded-xl shadow-lg h-[40vh] inline-flex flex-col items-center justify-between">
            <div>
                <p className="text-2xl">{word.w}</p>
                {showTranslation && (
                    <>
                        <p className="text-lg text-gray-600 my-2 border-t">
                            {word.t}
                        </p>
                    </>
                )}
            </div>
            <div className="mt-8 flex justify-center space-x-3">
                <button
                    onClick={onToggleTranslation}
                    className="p-2 bg-gradient-to-tr from-blue-500 to-blue-600 text-white rounded-lg shadow-xl"
                >
                    <MdOutlineTranslate size={22} />
                </button>
                <button
                    onClick={() => onPlayAudio(word.a)}
                    className="p-2 bg-gradient-to-tr from-purple-500 to-purple-600 text-white rounded-lg shadow-xl"
                >
                    {isPlaying ? (
                        <MdPause size={22} />
                    ) : (
                        <MdPlayArrow size={22} />
                    )}
                </button>
                <button
                    onClick={onRememberWord}
                    className="px-4 py-2 bg-gradient-to-tr from-green-500 to-green-600 text-white rounded-lg shadow-xl"
                >
                    Łatwe
                </button>
                <button
                    onClick={onDifficultWord}
                    className="px-4 py-2 bg-gradient-to-tr from-red-500 to-red-700 text-white rounded-lg shadow-xl"
                >
                    Trudne
                </button>
            </div>
        </div>
    );
}
