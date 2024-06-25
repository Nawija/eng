export type Word = {
    w: string;
    t: string;
    a: string;
};
export type WordCardProps = {
    word: Word;
    showTranslation: boolean;
    isPlaying: boolean;
    onToggleTranslation: () => void;
    onPlayAudio: (audioPath: string) => void;
    onRememberWord: () => void;
    onDifficultWord: () => void;
};

export type WordsCount = {
    [key: string]: number;
};
