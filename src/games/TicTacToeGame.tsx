import React, { useState, useMemo } from 'react';

interface TicTacToeGameProps {
  userId: string;
  onCompleted?: () => void;
}

type Player = 'X' | 'O' | null;
type Board = Player[][];

// Jogo: Jogo da Velha - Lógica e estratégia
export function TicTacToeGame({ userId, onCompleted }: TicTacToeGameProps) {
  const [board, setBoard] = useState<Board>(() => 
    Array(3).fill(null).map(() => Array(3).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player | 'draw' | null>(null);
  const [wins, setWins] = useState({ X: 0, O: 0 });

  const checkWinner = (board: Board): Player | null => {
    // Linhas
    for (let i = 0; i < 3; i++) {
      if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        return board[i][0];
      }
    }
    // Colunas
    for (let i = 0; i < 3; i++) {
      if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        return board[0][i];
      }
    }
    // Diagonais
    if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      return board[0][0];
    }
    if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      return board[0][2];
    }
    return null;
  };

  const isBoardFull = (board: Board) => {
    return board.every(row => row.every(cell => cell !== null));
  };

  const makeMove = (row: number, col: number) => {
    if (board[row][col] || winner) return;

    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setWins(prev => ({ ...prev, [gameWinner]: prev[gameWinner] + 1 }));
      
      const key = `plataforma-bncc-game-progress-${userId}`;
      const now = new Date().toISOString();
      const prev = JSON.parse(localStorage.getItem(key) || '{}');
      const updated = {
        ...prev,
        tictactoe_v1: {
          completed: true,
          last_attempt_at: now,
          games_played: (prev.tictactoe_v1?.games_played || 0) + 1,
          wins: { ...prev.tictactoe_v1?.wins, [gameWinner]: (prev.tictactoe_v1?.wins?.[gameWinner] || 0) + 1 },
        },
      };
      localStorage.setItem(key, JSON.stringify(updated));
      
      if (onCompleted) onCompleted();
    } else if (isBoardFull(newBoard)) {
      setWinner('draw');
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const reset = () => {
    setBoard(Array(3).fill(null).map(() => Array(3).fill(null)));
    setCurrentPlayer('X');
    setWinner(null);
  };

  return (
    <div className="max-w-2xl">
      <h3 className="text-xl font-semibold text-gray-900 mb-3">Jogo da Velha</h3>
      <p className="text-gray-600 mb-6">
        Faça uma linha de 3 para vencer! Vez do jogador: <strong className="text-purple-600">{currentPlayer}</strong>
      </p>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
        <div className="mb-4 flex justify-center gap-6 text-sm">
          <div className="text-gray-700">
            <span className="font-semibold text-purple-600">X:</span> {wins.X} vitórias
          </div>
          <div className="text-gray-700">
            <span className="font-semibold text-blue-600">O:</span> {wins.O} vitórias
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4 max-w-xs mx-auto">
          {board.map((row, rowIdx) =>
            row.map((cell, colIdx) => (
              <button
                key={`${rowIdx}-${colIdx}`}
                onClick={() => makeMove(rowIdx, colIdx)}
                disabled={cell !== null || winner !== null}
                className={`w-20 h-20 text-3xl font-bold rounded-lg border-2 transition-colors ${
                  cell === 'X'
                    ? 'bg-purple-100 border-purple-400 text-purple-700'
                    : cell === 'O'
                    ? 'bg-blue-100 border-blue-400 text-blue-700'
                    : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
                } ${cell === null && !winner ? 'cursor-pointer' : 'cursor-not-allowed'}`}
              >
                {cell}
              </button>
            ))
          )}
        </div>

        {winner && (
          <div className={`mb-4 p-4 rounded-lg border-2 text-center font-semibold ${
            winner === 'draw'
              ? 'bg-yellow-50 border-yellow-500 text-yellow-800'
              : winner === 'X'
              ? 'bg-purple-50 border-purple-500 text-purple-800'
              : 'bg-blue-50 border-blue-500 text-blue-800'
          }`}>
            {winner === 'draw' 
              ? '🤝 Empate! Joguem novamente.' 
              : `🎉 ${winner} venceu! Parabéns!`}
          </div>
        )}

        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-5 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Novo Jogo
          </button>
        </div>
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600">
        <strong className="text-purple-600">Habilidade:</strong> Estratégia e Lógica - Desenvolva pensamento estratégico e antecipação.
      </div>
    </div>
  );
}

