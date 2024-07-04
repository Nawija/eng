// components/AddWordForm.tsx
'use client';

import { useState } from 'react';
import LevelSelector from '../slowka/LevelSelector';

interface AddWordFormProps {
  onAddWord: (word: string, level: string) => void;
}

export default function AddWordForm({ onAddWord }: AddWordFormProps) {
  const [word, setWord] = useState('');
  const [level, setLevel] = useState('A1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (word) {
      onAddWord(word, level);
      setWord('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded mb-4">
      <h2 className="text-lg font-bold mb-2">Add New Word</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Word:</label>
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <LevelSelector selectedLevel={level} onLevelChange={setLevel} />
      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
        Add Word
      </button>
    </form>
  );
}
