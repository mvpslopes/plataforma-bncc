import React, { useState } from 'react';

interface GeoboardGameProps {
  userId: string;
  onCompleted?: () => void;
}

// Jogo: Geoboard Digital - Padrões geométricos e visuais
export function GeoboardGame({ userId, onCompleted }: GeoboardGameProps) {
  const BOARD_SIZE = 5;
  const [selectedDots, setSelectedDots] = useState<Set<string>>(new Set());
  const [pattern, setPattern] = useState<Set<string>>(new Set());
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);

  const generatePattern = (lvl: number) => {
    const newPattern = new Set<string>();
    const patternSize = 3 + lvl; // Padrão cresce com o nível
    
    // Gerar padrão simétrico
    for (let i = 0; i < patternSize; i++) {
      const row = Math.floor(Math.random() * BOARD_SIZE);
      const col = Math.floor(Math.random() * BOARD_SIZE);
      newPattern.add(`${row}-${col}`);
      // Adicionar ponto simétrico
      const symRow = BOARD_SIZE - 1 - row;
      const symCol = BOARD_SIZE - 1 - col;
      newPattern.add(`${symRow}-${symCol}`);
    }
    return newPattern;
  };

  const [currentPattern, setCurrentPattern] = useState(() => generatePattern(level));

  const toggleDot = (row: number, col: number) => {
    if (gameOver) return;
    const key = `${row}-${col}`;
    const newSelected = new Set(selectedDots);
    if (newSelected.has(key)) {
      newSelected.delete(key);
    } else {
      newSelected.add(key);
    }
    setSelectedDots(newSelected);
  };

  const verifyPattern = () => {
    const selectedSet = new Set(selectedDots);
    const patternSet = new Set(currentPattern);
    
    const isCorrect = 
      selectedDots.size === currentPattern.size &&
      Array.from(patternSet).every(dot => selectedSet.has(dot));

    if (isCorrect) {
      const newLevel = level + 1;
      setLevel(newLevel);
      setCurrentPattern(generatePattern(newLevel));
      setSelectedDots(new Set());
      
      if (newLevel > 5) {
        setGameOver(true);
        const key = `plataforma-bncc-game-progress-${userId}`;
        const now = new Date().toISOString();
        const prev = JSON.parse(localStorage.getItem(key) || '{}');
        const updated = {
          ...prev,
          geoboard_v1: {
            completed: true,
            last_attempt_at: now,
            attempts: (prev.geoboard_v1?.attempts || 0) + 1,
            level: newLevel,
          },
        };
        localStorage.setItem(key, JSON.stringify(updated));
        
        if (onCompleted) onCompleted();
      }
    }

    return isCorrect;
  };

  const showPattern = () => {
    setPattern(new Set(currentPattern));
    setTimeout(() => setPattern(new Set()), 2000);
  };

  const reset = () => {
    setSelectedDots(new Set());
    setPattern(new Set());
  };

  const isDotSelected = (row: number, col: number) => {
    return selectedDots.has(`${row}-${col}`);
  };

  const isDotInPattern = (row: number, col: number) => {
    return pattern.has(`${row}-${col}`);
  };

  return (
    <div className="max-w-2xl">
      <h3 className="text-xl font-semibold text-gray-900 mb-3">Geoboard Digital</h3>
      <p className="text-gray-600 mb-6">
        Reproduza o padrão geométrico! Nível: <strong className="text-purple-600">{level}</strong>
      </p>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
        <div className="mb-4 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Pontos selecionados: <strong>{selectedDots.size}</strong> / <strong>{currentPattern.size}</strong>
          </div>
          <button
            onClick={showPattern}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
          >
            👁️ Ver Padrão
          </button>
        </div>

        <div className="mb-4 flex justify-center">
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: BOARD_SIZE }, (_, row) =>
              Array.from({ length: BOARD_SIZE }, (_, col) => {
                const selected = isDotSelected(row, col);
                const inPattern = isDotInPattern(row, col);
                return (
                  <button
                    key={`${row}-${col}`}
                    onClick={() => toggleDot(row, col)}
                    disabled={gameOver}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${
                      inPattern
                        ? 'bg-yellow-400 border-yellow-600 animate-pulse'
                        : selected
                        ? 'bg-purple-500 border-purple-700'
                        : 'bg-gray-100 border-gray-300 hover:bg-gray-200'
                    } ${gameOver ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {selected && <span className="text-white text-lg">●</span>}
                  </button>
                );
              })
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={verifyPattern}
            disabled={selectedDots.size === 0 || gameOver}
            className="px-5 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ✓ Verificar
          </button>
          <button
            onClick={reset}
            className="px-5 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
          >
            🔄 Limpar
          </button>
        </div>

        {gameOver && (
          <div className="mt-4 p-4 bg-green-50 border-2 border-green-500 rounded-lg text-green-800 text-center font-semibold">
            🎉 Parabéns! Você completou todos os níveis!
          </div>
        )}
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600">
        <strong className="text-purple-600">Habilidade:</strong> EF01CI01 - Identificar e descrever padrões em sequências simples.
      </div>
    </div>
  );
}

