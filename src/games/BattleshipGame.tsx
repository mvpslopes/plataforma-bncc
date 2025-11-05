import React, { useState, useMemo } from 'react';

interface BattleshipGameProps {
  userId: string;
  onCompleted?: () => void;
}

// Jogo: Batalha Naval - Lógica, estratégia e coordenadas
export function BattleshipGame({ userId, onCompleted }: BattleshipGameProps) {
  const BOARD_SIZE = 6;
  const SHIPS = 4;

  const generateBoard = () => {
    const board = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(false));
    let shipsPlaced = 0;
    
    while (shipsPlaced < SHIPS) {
      const row = Math.floor(Math.random() * BOARD_SIZE);
      const col = Math.floor(Math.random() * BOARD_SIZE);
      if (!board[row][col]) {
        board[row][col] = true;
        shipsPlaced++;
      }
    }
    return board;
  };

  const [board, setBoard] = useState<boolean[][]>(() => generateBoard());
  const [guesses, setGuesses] = useState<Set<string>>(new Set());
  const [hits, setHits] = useState<number>(0);
  const [gameOver, setGameOver] = useState(false);
  const [lastHit, setLastHit] = useState<{row: number, col: number} | null>(null);
  const [lastMiss, setLastMiss] = useState<{row: number, col: number} | null>(null);

  const handleCellClick = (row: number, col: number) => {
    if (gameOver) return;
    const key = `${row}-${col}`;
    if (guesses.has(key)) return;

    const newGuesses = new Set(guesses);
    newGuesses.add(key);
    setGuesses(newGuesses);

    if (board[row][col]) {
      const newHits = hits + 1;
      setHits(newHits);
      setLastHit({ row, col });
      setLastMiss(null);
      
      if (newHits === SHIPS) {
        setGameOver(true);
        
        const key = `plataforma-bncc-game-progress-${userId}`;
        const now = new Date().toISOString();
        const prev = JSON.parse(localStorage.getItem(key) || '{}');
        const updated = {
          ...prev,
          battleship_v1: {
            completed: true,
            last_attempt_at: now,
            attempts: (prev.battleship_v1?.attempts || 0) + 1,
            total_guesses: newGuesses.size,
          },
        };
        localStorage.setItem(key, JSON.stringify(updated));
        
        if (onCompleted) onCompleted();
      }
    } else {
      setLastMiss({ row, col });
      setLastHit(null);
    }
  };

  const reset = () => {
    setBoard(generateBoard());
    setGuesses(new Set());
    setHits(0);
    setGameOver(false);
    setLastHit(null);
    setLastMiss(null);
  };

  const getCellStatus = (row: number, col: number) => {
    const key = `${row}-${col}`;
    if (!guesses.has(key)) return 'unknown';
    return board[row][col] ? 'hit' : 'miss';
  };

  const isRecentlyHit = (row: number, col: number) => {
    return lastHit && lastHit.row === row && lastHit.col === col;
  };

  const isRecentlyMissed = (row: number, col: number) => {
    return lastMiss && lastMiss.row === row && lastMiss.col === col;
  };

  return (
    <div className="max-w-2xl">
      <h3 className="text-xl font-semibold text-gray-900 mb-3">Batalha Naval</h3>
      <p className="text-gray-600 mb-6">
        Encontre os {SHIPS} navios escondidos! Clique nas células para atacar.
      </p>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Navios encontrados: <strong className="text-purple-600">{hits}/{SHIPS}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <span className="text-sm text-gray-700">Tentativas: <strong>{guesses.size}</strong></span>
            </div>
          </div>
          {!gameOver && (
            <div className="text-sm text-blue-600 font-medium">
              💡 Dica: Use coordenadas para estratégia!
            </div>
          )}
        </div>

        <div className="flex justify-center mb-6">
          <div className="relative">
            {/* Legenda superior */}
            <div className="grid grid-cols-7 gap-1 mb-1">
              <div></div>
              {Array.from({ length: BOARD_SIZE }, (_, i) => (
                <div key={i} className="text-center text-sm font-bold text-blue-700 w-12">
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            
            {/* Tabuleiro */}
            <div className="grid grid-cols-7 gap-1">
              {/* Legenda lateral e células */}
              {Array.from({ length: BOARD_SIZE }, (_, row) => (
                <React.Fragment key={row}>
                  <div className="text-center text-sm font-bold text-blue-700 flex items-center justify-center w-8">
                    {row + 1}
                  </div>
                  {Array.from({ length: BOARD_SIZE }, (_, col) => {
                    const status = getCellStatus(row, col);
                    const isRecentHit = isRecentlyHit(row, col);
                    const isRecentMiss = isRecentlyMissed(row, col);
                    
                    return (
                      <button
                        key={col}
                        onClick={() => handleCellClick(row, col)}
                        disabled={status !== 'unknown' || gameOver}
                        className={`w-12 h-12 rounded-lg border-2 transition-all duration-200 relative ${
                          status === 'hit'
                            ? 'bg-red-500 border-red-700 shadow-lg animate-pulse'
                            : status === 'miss'
                            ? 'bg-gray-200 border-gray-400'
                            : 'bg-blue-100 border-blue-300 hover:bg-blue-200 hover:scale-105 hover:shadow-md'
                        } ${status === 'unknown' && !gameOver ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                        title={status === 'unknown' ? `${String.fromCharCode(65 + col)}${row + 1}` : ''}
                      >
                        {status === 'hit' && (
                          <span className="text-2xl">🚢</span>
                        )}
                        {status === 'miss' && (
                          <span className="text-gray-400 text-xl">✕</span>
                        )}
                        {status === 'unknown' && (
                          <span className="text-blue-400 text-xs">🌊</span>
                        )}
                        {isRecentHit && (
                          <div className="absolute inset-0 bg-yellow-400 rounded-lg animate-ping opacity-75"></div>
                        )}
                        {isRecentMiss && (
                          <div className="absolute inset-0 bg-blue-300 rounded-lg animate-ping opacity-50"></div>
                        )}
                      </button>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {gameOver && (
          <div className="mb-4 p-4 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-500 rounded-lg text-green-800 text-center font-semibold animate-bounce">
            <div className="text-2xl mb-2">🎉 Parabéns!</div>
            <div>Você encontrou todos os {SHIPS} navios em {guesses.size} tentativas!</div>
          </div>
        )}

        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg"
          >
            🔄 Novo Jogo
          </button>
        </div>
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600">
        <strong className="text-purple-600">Habilidade:</strong> Estratégia, Lógica e Coordenadas - Desenvolva pensamento estratégico e uso de coordenadas.
      </div>
    </div>
  );
}
