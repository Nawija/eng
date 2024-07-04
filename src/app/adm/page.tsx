// app/admin/page.tsx
'use client';

import { useState } from 'react';
import AddWordForm from './AddWordForm';
import WordList from '../slowka/WordList';

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

export default function AdminPage() {
  const [words, setWords] = useState<Word[]>(initialWords);

  const addWord = (text: string, level: string) => {
    setWords((prevWords) => [...prevWords, { text, level, difficulty: 'medium' }]);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <AddWordForm onAddWord={addWord} />
      <WordList words={words} updateWords={setWords} />
    </div>
  );
}
