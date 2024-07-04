// components/LevelSelector.tsx
'use client';

interface LevelSelectorProps {
  selectedLevel: string;
  onLevelChange: (level: string) => void;
}

export default function LevelSelector({ selectedLevel, onLevelChange }: LevelSelectorProps) {
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">Select Level:</label>
      <select
        value={selectedLevel}
        onChange={(e) => onLevelChange(e.target.value)}
        className="block w-full p-2 border border-gray-300 rounded"
      >
        {levels.map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>
    </div>
  );
}
