import React, { useState, useMemo } from 'react';

interface BattleshipGameProps {
  userId: string;
  onCompleted?: () => void;
}

// Jogo: Batalha Naval - Lógica, estratégia e coordenadas
export function BattleshipGame({ userId, onCompleted }: BattleshipGameProps) {
  const BOARD_SIZE = 5;
  const SHIPS = 3;

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
    }
  };

  const reset = () => {
    setBoard(generateBoard());
    setGuesses(new Set());
    setHits(0);
    setGameOver(false);
  };

  const getCellStatus = (row: number, col: number) => {
    const key = `${row}-${col}`;
    if (!guesses.has(key)) return 'unknown';
    return board[row][col] ? 'hit' : 'miss';
  };

  return (
    <div className="max-w-2xl">
      <h3 className="text-xl font-semibold text-gray-900 mb-3">Batalha Naval</h3>
      <p className="text-gray-600 mb-6">
        Encontre os {SHIPS} navios escondidos! Clique nas células para atacar.
      </p>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
        <div className="mb-4">
          <div className="text-sm text-gray-600 mb-2">
            Navios encontrados: <strong className="text-purple-600">{hits}/{SHIPS}</strong>
          </div>
          <div className="text-sm text-gray-600 mb-2">
            Tentativas: <strong>{guesses.size}</strong>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-4">
          {/* Header Row */}
          <div className="text-center text-xs font-semibold text-gray-500"></div>
          {Array.from({ length: BOARD_SIZE }, (_, i) => (
            <div key={i} className="text-center text-xs font-semibold text-gray-500">
              {String.fromCharCode(65 + i)}
            </div>
          ))}
          
          {/* Board Rows */}
          {Array.from({ length: BOARD_SIZE }, (_, row) => (
            <React.Fragment key={row}>
              <div className="text-center text-xs font-semibold text-gray-500 flex items-center justify-center">
                {row + 1}
              </div>
              {Array.from({ length: BOARD_SIZE }, (_, col) => {
                const status = getCellStatus(row, col);
                return (
                  <button
                    key={col}
                    onClick={() => handleCellClick(row, col)}
                    disabled={status !== 'unknown' || gameOver}
                    className={`w-12 h-12 rounded border-2 transition-colors ${
                      status === 'hit'
                        ? 'bg-red-500 border-red-600 text-white font-bold'
                        : status === 'miss'
                        ? 'bg-gray-300 border-gray-400 text-gray-600'
                        : 'bg-blue-100 border-blue-300 hover:bg-blue-200'
                    } ${status === 'unknown' && !gameOver ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                  >
                    {status === 'hit' ? '💥' : status === 'miss' ? '✗' : ''}
                  </button>
                );
              })}
            </React.Fragment>
          ))}
        </div>

        {gameOver && (
          <div className="mb-4 p-4 bg-green-50 border-2 border-green-500 rounded-lg text-green-800 text-center font-semibold">
            🎉 Parabéns! Você encontrou todos os navios!
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={reset}
            className="px-5 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Novo Jogo
          </button>
        </div>
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600">
        <strong className="text-purple-600">Habilidade:</strong> Estratégia, Lógica e Coordenadas - Desenvolva pensamento estratégico.
      </div>
    </div>
  );
}

