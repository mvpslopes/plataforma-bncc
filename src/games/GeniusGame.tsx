import React, { useState, useEffect, useRef } from 'react';

interface GeniusGameProps {
  userId: string;
  onCompleted?: () => void;
}

type Color = 'red' | 'blue' | 'green' | 'yellow';

// Jogo: Genius (Simon Says) - Memória e sequência
export function GeniusGame({ userId, onCompleted }: GeniusGameProps) {
  const COLORS: Color[] = ['red', 'blue', 'green', 'yellow'];
  const [sequence, setSequence] = useState<Color[]>([]);
  const [playerSequence, setPlayerSequence] = useState<Color[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShowing, setIsShowing] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [activeColor, setActiveColor] = useState<Color | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const playSound = (color: Color) => {
    // Simular som com feedback visual
    setActiveColor(color);
    setTimeout(() => setActiveColor(null), 300);
  };

  const startNewGame = () => {
    const firstColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    setSequence([firstColor]);
    setPlayerSequence([]);
    setCurrentLevel(1);
    setGameOver(false);
    setIsPlaying(true);
    setIsShowing(true);
    playSequence([firstColor]);
  };

  const playSequence = (seq: Color[]) => {
    setIsShowing(true);
    let index = 0;
    
    const playNext = () => {
      if (index < seq.length) {
        playSound(seq[index]);
        index++;
        timeoutRef.current = setTimeout(playNext, 600);
      } else {
        setIsShowing(false);
        setPlayerSequence([]);
      }
    };
    
    playNext();
  };

  const addToSequence = () => {
    const newColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    const newSequence = [...sequence, newColor];
    setSequence(newSequence);
    playSequence(newSequence);
  };

  const handleColorClick = (color: Color) => {
    if (isShowing || gameOver) return;

    playSound(color);
    const newPlayerSequence = [...playerSequence, color];
    setPlayerSequence(newPlayerSequence);

    // Verificar se está correto
    const expectedColor = sequence[newPlayerSequence.length - 1];
    if (color !== expectedColor) {
      setGameOver(true);
      
      const key = `plataforma-bncc-game-progress-${userId}`;
      const now = new Date().toISOString();
      const prev = JSON.parse(localStorage.getItem(key) || '{}');
      const updated = {
        ...prev,
        genius_v1: {
          completed: false,
          last_attempt_at: now,
          attempts: (prev.genius_v1?.attempts || 0) + 1,
          best_level: Math.max(prev.genius_v1?.best_level || 0, currentLevel),
        },
      };
      localStorage.setItem(key, JSON.stringify(updated));
      return;
    }

    // Se completou a sequência
    if (newPlayerSequence.length === sequence.length) {
      const newLevel = currentLevel + 1;
      setCurrentLevel(newLevel);
      setPlayerSequence([]);
      
      if (newLevel > 5) {
        const key = `plataforma-bncc-game-progress-${userId}`;
        const now = new Date().toISOString();
        const prev = JSON.parse(localStorage.getItem(key) || '{}');
        const updated = {
          ...prev,
          genius_v1: {
            completed: true,
            last_attempt_at: now,
            attempts: (prev.genius_v1?.attempts || 0) + 1,
            best_level: newLevel,
          },
        };
        localStorage.setItem(key, JSON.stringify(updated));
        
        if (onCompleted) onCompleted();
      } else {
        setTimeout(() => {
          addToSequence();
        }, 500);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getColorClass = (color: Color) => {
    const baseClasses = 'w-24 h-24 rounded-lg border-2 transition-all cursor-pointer';
    const colorClasses = {
      red: activeColor === color
        ? 'bg-red-600 border-red-800 shadow-lg scale-105'
        : 'bg-red-400 border-red-600 hover:bg-red-500',
      blue: activeColor === color
        ? 'bg-blue-600 border-blue-800 shadow-lg scale-105'
        : 'bg-blue-400 border-blue-600 hover:bg-blue-500',
      green: activeColor === color
        ? 'bg-green-600 border-green-800 shadow-lg scale-105'
        : 'bg-green-400 border-green-600 hover:bg-green-500',
      yellow: activeColor === color
        ? 'bg-yellow-500 border-yellow-700 shadow-lg scale-105'
        : 'bg-yellow-400 border-yellow-600 hover:bg-yellow-500',
    };
    return `${baseClasses} ${colorClasses[color]} ${isShowing || gameOver ? 'opacity-50 cursor-not-allowed' : ''}`;
  };

  return (
    <div className="max-w-2xl">
      <h3 className="text-xl font-semibold text-gray-900 mb-3">Genius</h3>
      <p className="text-gray-600 mb-6">
        Memorize a sequência de cores e repita! Nível: <strong className="text-purple-600">{currentLevel}</strong>
      </p>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
        {!isPlaying && !gameOver && (
          <div className="text-center mb-6">
            <button
              onClick={startNewGame}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors text-lg"
            >
              Iniciar Jogo
            </button>
          </div>
        )}

        {(isPlaying || gameOver) && (
          <>
            <div className="grid grid-cols-2 gap-4 mb-6 max-w-xs mx-auto">
              <button
                onClick={() => handleColorClick('red')}
                disabled={isShowing || gameOver}
                className={getColorClass('red')}
              />
              <button
                onClick={() => handleColorClick('blue')}
                disabled={isShowing || gameOver}
                className={getColorClass('blue')}
              />
              <button
                onClick={() => handleColorClick('green')}
                disabled={isShowing || gameOver}
                className={getColorClass('green')}
              />
              <button
                onClick={() => handleColorClick('yellow')}
                disabled={isShowing || gameOver}
                className={getColorClass('yellow')}
              />
            </div>

            {gameOver && (
              <div className="mb-4 p-4 bg-red-50 border-2 border-red-500 rounded-lg text-red-800 text-center font-semibold">
                💥 Game Over! Você alcançou o nível {currentLevel}.
              </div>
            )}

            {isShowing && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-300 rounded-lg text-blue-800 text-center text-sm">
                👀 Observe a sequência...
              </div>
            )}

            <div className="flex gap-3 justify-center">
              <button
                onClick={startNewGame}
                className="px-5 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                {gameOver ? 'Jogar Novamente' : 'Reiniciar'}
              </button>
            </div>
          </>
        )}
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600">
        <strong className="text-purple-600">Habilidade:</strong> Memória e Sequenciamento - Desenvolva atenção e memória de curto prazo.
      </div>
    </div>
  );
}

