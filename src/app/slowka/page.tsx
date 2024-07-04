// app/page.tsx
'use client';

import { useState } from 'react';
import WordList from './WordList';


interface Word {
  text: string;
  level: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const initialWords: Word[] = [
  { text: 'hello', level: 'A1', difficulty: 'easy' },
  { text: 'world', level: 'A2', difficulty: 'medium' },
  { text: 'learning', level: 'B1', difficulty: 'hard' },
];

export default function HomePage() {
  const [words, setWords] = useState<Word[]>(initialWords);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Learn English Words</h1>
      <WordList words={words} updateWords={setWords} />
    </div>
  );
}
