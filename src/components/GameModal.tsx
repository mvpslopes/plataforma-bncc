import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { SequencingGame } from '../games/SequencingGame';
import { PatternGame } from '../games/PatternGame';
import { DebuggingGame } from '../games/DebuggingGame';
import { DecompositionGame } from '../games/DecompositionGame';
import { ConditionalGame } from '../games/ConditionalGame';
import { LoopGame } from '../games/LoopGame';
import { BattleshipGame } from '../games/BattleshipGame';
import { TicTacToeGame } from '../games/TicTacToeGame';
import { GeniusGame } from '../games/GeniusGame';
import { MazeGame } from '../games/MazeGame';
import { GeoboardGame } from '../games/GeoboardGame';
import { SecurityQuizGame } from '../games/SecurityQuizGame';
import { SudokuGame } from '../games/SudokuGame';
import { GameInfo } from '../data/gamesData';
import { useAuth } from '../contexts/LocalAuthContext';

interface GameModalProps {
  game: GameInfo | null;
  onClose: () => void;
}

export const GameModal: React.FC<GameModalProps> = ({ game, onClose }) => {
  const { user } = useAuth();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (game && modalRef.current) {
      modalRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }

    // Fechar com ESC
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && game) {
        onClose();
      }
    };

    if (game) {
      document.addEventListener('keydown', handleEscape);
      // Prevenir scroll do body quando modal está aberto
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [game, onClose]);

  if (!game || !user) return null;

  const renderGame = () => {
    switch (game.id) {
      case 'sequencing':
        return <SequencingGame userId={user.id} />;
      case 'pattern':
        return <PatternGame userId={user.id} />;
      case 'debugging':
        return <DebuggingGame userId={user.id} />;
      case 'decomposition':
        return <DecompositionGame userId={user.id} />;
      case 'conditional':
        return <ConditionalGame userId={user.id} />;
      case 'loop':
        return <LoopGame userId={user.id} />;
      case 'maze':
        return <MazeGame userId={user.id} />;
      case 'geoboard':
        return <GeoboardGame userId={user.id} />;
      case 'sudoku':
        return <SudokuGame userId={user.id} />;
      case 'battleship':
        return <BattleshipGame userId={user.id} />;
      case 'tictactoe':
        return <TicTacToeGame userId={user.id} />;
      case 'genius':
        return <GeniusGame userId={user.id} />;
      case 'security-quiz':
        return <SecurityQuizGame userId={user.id} />;
      default:
        return <div>Jogo não encontrado</div>;
    }
  };

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-start justify-center overflow-y-auto pt-16 pb-8"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl max-w-6xl w-full mx-4 my-8 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{game.name}</h2>
            <p className="text-sm text-gray-600 mt-1">{game.description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6">
          {renderGame()}
        </div>
      </div>
    </div>
  );
};

