// components/WordList.tsx
'use client';

import { useState, useEffect } from 'react';
import WordCard from './WordCard';
import LevelSelector from './LevelSelector';

interface Word {
  text: string;
  level: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface WordListProps {
  words: Word[];
  updateWords: (words: Word[]) => void;
}

export default function WordList({ words = [], updateWords }: WordListProps) {
  const [selectedLevel, setSelectedLevel] = useState('A1');
  const [filteredWords, setFilteredWords] = useState<Word[]>([]);

  useEffect(() => {
    if (Array.isArray(words)) {
      setFilteredWords(words.filter(word => word.level === selectedLevel));
    } else {
      setFilteredWords([]); // Domyślna wartość, jeśli `words` nie jest tablicą
    }
  }, [selectedLevel, words]);

  const handleMark = (index: number, difficulty: 'easy' | 'medium' | 'hard') => {
    const newWords = words.map((word, i) => (
      i === index ? { ...word, difficulty } : word
    ));
    updateWords(newWords);
  };

  return (
    <div>
      <LevelSelector selectedLevel={selectedLevel} onLevelChange={setSelectedLevel} />
      {filteredWords.length === 0 ? (
        <p>No words for this level.</p>
      ) : (
        filteredWords.map((word, index) => (
          <WordCard
            key={index}
            word={word.text}
            onMark={(difficulty) => handleMark(index, difficulty)}
          />
        ))
      )}
    </div>
  );
}
