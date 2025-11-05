import React, { useState, useMemo } from 'react';

interface SudokuGameProps {
  userId: string;
  onCompleted?: () => void;
}

// Jogo: Sudoku para Crianças - Lógica numérica
export function SudokuGame({ userId, onCompleted }: SudokuGameProps) {
  const SIZE = 4; // 4x4 para crianças
  
  const generatePuzzle = () => {
    const grid = Array(SIZE).fill(null).map(() => Array(SIZE).fill(0));
    // Preencher algumas células
    const clues = [
      [1, 0, 0, 4],
      [0, 3, 2, 0],
      [0, 2, 3, 0],
      [4, 0, 0, 1],
    ];
    return clues;
  };

  const [grid, setGrid] = useState(() => generatePuzzle());
  const [selected, setSelected] = useState<{row: number, col: number} | null>(null);
  const [gameOver, setGameOver] = useState(false);

  const isCellFixed = (row: number, col: number) => {
    return grid[row][col] !== 0;
  };

  const isValid = (row: number, col: number, value: number) => {
    // Verificar linha
    for (let c = 0; c < SIZE; c++) {
      if (c !== col && grid[row][c] === value) return false;
    }
    // Verificar coluna
    for (let r = 0; r < SIZE; r++) {
      if (r !== row && grid[r][col] === value) return false;
    }
    // Verificar bloco 2x2
    const boxRow = Math.floor(row / 2) * 2;
    const boxCol = Math.floor(col / 2) * 2;
    for (let r = boxRow; r < boxRow + 2; r++) {
      for (let c = boxCol; c < boxCol + 2; c++) {
        if (r !== row && c !== col && grid[r][c] === value) return false;
      }
    }
    return true;
  };

  const handleCellClick = (row: number, col: number) => {
    if (isCellFixed(row, col) || gameOver) return;
    setSelected({ row, col });
  };

  const handleNumberClick = (num: number) => {
    if (!selected || gameOver) return;
    const { row, col } = selected;
    
    if (isValid(row, col, num)) {
      const newGrid = grid.map(r => [...r]);
      newGrid[row][col] = num;
      setGrid(newGrid);
      
      // Verificar se está completo
      if (newGrid.every(r => r.every(c => c !== 0))) {
        setGameOver(true);
        const key = `plataforma-bncc-game-progress-${userId}`;
        const now = new Date().toISOString();
        const prev = JSON.parse(localStorage.getItem(key) || '{}');
        const updated = {
          ...prev,
          sudoku_v1: {
            completed: true,
            last_attempt_at: now,
            attempts: (prev.sudoku_v1?.attempts || 0) + 1,
          },
        };
        localStorage.setItem(key, JSON.stringify(updated));
        
        if (onCompleted) onCompleted();
      }
    }
  };

  const reset = () => {
    setGrid(generatePuzzle());
    setSelected(null);
    setGameOver(false);
  };

  return (
    <div className="max-w-2xl">
      <h3 className="text-xl font-semibold text-gray-900 mb-3">Sudoku para Crianças</h3>
      <p className="text-gray-600 mb-6">
        Preencha o tabuleiro 4x4: cada número deve aparecer uma vez em cada linha, coluna e bloco 2x2.
      </p>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
        <div className="mb-6 flex justify-center">
          <div className="grid grid-cols-4 gap-1 border-2 border-gray-800">
            {grid.map((row, rowIdx) =>
              row.map((cell, colIdx) => {
                const isSelectedCell = selected?.row === rowIdx && selected?.col === colIdx;
                const isFixed = isCellFixed(rowIdx, colIdx);
                const boxRow = Math.floor(rowIdx / 2);
                const boxCol = Math.floor(colIdx / 2);
                const isEvenBox = (boxRow + boxCol) % 2 === 0;
                
                return (
                  <div
                    key={`${rowIdx}-${colIdx}`}
                    onClick={() => handleCellClick(rowIdx, colIdx)}
                    className={`w-16 h-16 flex items-center justify-center border border-gray-400 cursor-pointer transition-all ${
                      isSelectedCell
                        ? 'bg-purple-200 border-purple-500 border-2'
                        : isFixed
                        ? 'bg-gray-100'
                        : isEvenBox
                        ? 'bg-blue-50'
                        : 'bg-white'
                    } ${isFixed ? 'cursor-not-allowed' : 'hover:bg-purple-100'}`}
                  >
                    {cell !== 0 && (
                      <span className={`text-2xl font-bold ${isFixed ? 'text-gray-800' : 'text-purple-600'}`}>
                        {cell}
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="mb-4">
          <div className="text-sm font-medium text-gray-700 mb-2">Selecione um número:</div>
          <div className="flex gap-2 justify-center">
            {[1, 2, 3, 4].map(num => (
              <button
                key={num}
                onClick={() => handleNumberClick(num)}
                disabled={!selected || gameOver}
                className="w-12 h-12 bg-purple-600 text-white rounded-lg font-bold text-xl hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {gameOver && (
          <div className="mb-4 p-4 bg-green-50 border-2 border-green-500 rounded-lg text-green-800 text-center font-semibold">
            🎉 Parabéns! Você completou o Sudoku!
          </div>
        )}

        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-5 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            🔄 Novo Jogo
          </button>
        </div>
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600">
        <strong className="text-purple-600">Habilidade:</strong> EF04CI01 - Aplicar conceitos de abstração e generalização.
      </div>
    </div>
  );
}

