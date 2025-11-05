import React, { useState, useMemo } from 'react';

interface MazeGameProps {
  userId: string;
  onCompleted?: () => void;
}

type Direction = 'up' | 'down' | 'left' | 'right';

// Jogo: Labirinto Algorítmico - Criar sequências de comandos
export function MazeGame({ userId, onCompleted }: MazeGameProps) {
  const generateMaze = (size: number) => {
    const maze = Array(size).fill(null).map(() => Array(size).fill('wall'));
    // Caminho simples do início ao fim
    for (let i = 0; i < size; i++) {
      maze[0][i] = 'path';
      maze[i][size - 1] = 'path';
    }
    maze[0][0] = 'start';
    maze[size - 1][size - 1] = 'end';
    return maze;
  };

  const [maze, setMaze] = useState(() => generateMaze(5));
  const [commands, setCommands] = useState<Direction[]>([]);
  const [playerPos, setPlayerPos] = useState({ row: 0, col: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(1);

  const addCommand = (dir: Direction) => {
    if (commands.length < 15) {
      setCommands([...commands, dir]);
    }
  };

  const removeCommand = (index: number) => {
    setCommands(commands.filter((_, i) => i !== index));
  };

  const executeCommands = () => {
    if (commands.length === 0) return;
    
    setIsPlaying(true);
    let currentPos = { row: 0, col: 0 };
    let step = 0;

    const executeStep = () => {
      if (step >= commands.length) {
        setIsPlaying(false);
        if (currentPos.row === maze.length - 1 && currentPos.col === maze[0].length - 1) {
          setGameOver(true);
          
          const key = `plataforma-bncc-game-progress-${userId}`;
          const now = new Date().toISOString();
          const prev = JSON.parse(localStorage.getItem(key) || '{}');
          const updated = {
            ...prev,
            maze_v1: {
              completed: true,
              last_attempt_at: now,
              attempts: (prev.maze_v1?.attempts || 0) + 1,
              level: level,
            },
          };
          localStorage.setItem(key, JSON.stringify(updated));
          
          if (onCompleted) onCompleted();
        }
        return;
      }

      const dir = commands[step];
      let newRow = currentPos.row;
      let newCol = currentPos.col;

      if (dir === 'up' && newRow > 0) newRow--;
      if (dir === 'down' && newRow < maze.length - 1) newRow++;
      if (dir === 'left' && newCol > 0) newCol--;
      if (dir === 'right' && newCol < maze[0].length - 1) newCol++;

      if (maze[newRow][newCol] !== 'wall') {
        currentPos = { row: newRow, col: newCol };
        setPlayerPos(currentPos);
      }

      step++;
      setTimeout(executeStep, 500);
    };

    executeStep();
  };

  const reset = () => {
    setCommands([]);
    setPlayerPos({ row: 0, col: 0 });
    setGameOver(false);
    setIsPlaying(false);
  };

  const nextLevel = () => {
    setLevel(level + 1);
    setMaze(generateMaze(5 + level));
    reset();
  };

  const getCellContent = (row: number, col: number) => {
    if (row === playerPos.row && col === playerPos.col) return 'player';
    if (row === 0 && col === 0) return 'start';
    if (row === maze.length - 1 && col === maze[0].length - 1) return 'end';
    return maze[row][col];
  };

  return (
    <div className="max-w-2xl">
      <h3 className="text-xl font-semibold text-gray-900 mb-3">Labirinto Algorítmico</h3>
      <p className="text-gray-600 mb-6">
        Crie uma sequência de comandos para guiar o personagem até a saída. Nível: <strong className="text-purple-600">{level}</strong>
      </p>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
        <div className="mb-4">
          <div className="text-sm font-medium text-gray-700 mb-2">Comandos disponíveis:</div>
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => addCommand('up')} className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors font-medium">
              ↑ Cima
            </button>
            <button onClick={() => addCommand('down')} className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors font-medium">
              ↓ Baixo
            </button>
            <button onClick={() => addCommand('left')} className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors font-medium">
              ← Esquerda
            </button>
            <button onClick={() => addCommand('right')} className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors font-medium">
              → Direita
            </button>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-sm font-medium text-gray-700 mb-2">Sua sequência ({commands.length} comandos):</div>
          <div className="min-h-[60px] p-3 bg-gray-50 rounded-lg border border-gray-200 flex flex-wrap gap-2">
            {commands.length === 0 ? (
              <p className="text-gray-400 text-sm">Adicione comandos acima</p>
            ) : (
              commands.map((cmd, idx) => (
                <button
                  key={idx}
                  onClick={() => removeCommand(idx)}
                  className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  {cmd === 'up' ? '↑' : cmd === 'down' ? '↓' : cmd === 'left' ? '←' : '→'} {idx + 1}
                </button>
              ))
            )}
          </div>
        </div>

        <div className="mb-4 flex justify-center">
          <div className="grid grid-cols-5 gap-1">
            {maze.map((row, rowIdx) =>
              row.map((cell, colIdx) => {
                const content = getCellContent(rowIdx, colIdx);
                return (
                  <div
                    key={`${rowIdx}-${colIdx}`}
                    className={`w-12 h-12 rounded border-2 flex items-center justify-center ${
                      content === 'player'
                        ? 'bg-green-500 border-green-700'
                        : content === 'start'
                        ? 'bg-blue-400 border-blue-600'
                        : content === 'end'
                        ? 'bg-yellow-400 border-yellow-600'
                        : content === 'path'
                        ? 'bg-gray-100 border-gray-300'
                        : 'bg-gray-800 border-gray-900'
                    }`}
                  >
                    {content === 'player' && <span className="text-xl">🤖</span>}
                    {content === 'start' && <span className="text-xs">🏁</span>}
                    {content === 'end' && <span className="text-xs">🎯</span>}
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={executeCommands}
            disabled={commands.length === 0 || isPlaying}
            className="px-5 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ▶️ Executar
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
            🎉 Parabéns! Você completou o nível {level}!
            <button
              onClick={nextLevel}
              className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Próximo Nível
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600">
        <strong className="text-purple-600">Habilidade:</strong> EF02CI01 - Descrever sequências de ações para resolver problemas.
      </div>
    </div>
  );
}

