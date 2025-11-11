import { Gamepad2, Brain, Globe, Shield } from 'lucide-react';
import React from 'react';

export interface GameInfo {
  id: string;
  name: string;
  description: string;
  category: 'pensamento-computacional' | 'mundo-digital' | 'cultura-digital';
  difficulty: 'facil' | 'medio' | 'dificil';
  bnccSkill: string;
  icon: React.ReactNode;
}

export const gamesData: GameInfo[] = [
  // Pensamento Computacional
  {
    id: 'sequencing',
    name: 'Sequenciamento',
    description: 'Ordene passos de um algoritmo',
    category: 'pensamento-computacional',
    difficulty: 'facil',
    bnccSkill: 'EF02CI01',
    icon: <Gamepad2 className="h-5 w-5" />,
  },
  {
    id: 'pattern',
    name: 'Padrões',
    description: 'Complete a sequência correta',
    category: 'pensamento-computacional',
    difficulty: 'facil',
    bnccSkill: 'EF01CI01',
    icon: <Gamepad2 className="h-5 w-5" />,
  },
  {
    id: 'debugging',
    name: 'Depuração',
    description: 'Encontre o passo incorreto',
    category: 'pensamento-computacional',
    difficulty: 'medio',
    bnccSkill: 'EF05CI01',
    icon: <Gamepad2 className="h-5 w-5" />,
  },
  {
    id: 'decomposition',
    name: 'Decomposição',
    description: 'Quebre problemas em partes',
    category: 'pensamento-computacional',
    difficulty: 'medio',
    bnccSkill: 'EF03CI01',
    icon: <Gamepad2 className="h-5 w-5" />,
  },
  {
    id: 'conditional',
    name: 'Lógica Condicional',
    description: 'Se/Então - Tomar decisões',
    category: 'pensamento-computacional',
    difficulty: 'medio',
    bnccSkill: 'EF05CI01',
    icon: <Gamepad2 className="h-5 w-5" />,
  },
  {
    id: 'loop',
    name: 'Loops',
    description: 'Repetir ações eficientemente',
    category: 'pensamento-computacional',
    difficulty: 'medio',
    bnccSkill: 'EF05CI01',
    icon: <Gamepad2 className="h-5 w-5" />,
  },
  {
    id: 'maze',
    name: 'Labirinto Algorítmico',
    description: 'Crie sequências de comandos',
    category: 'pensamento-computacional',
    difficulty: 'medio',
    bnccSkill: 'EF02CI01',
    icon: <Gamepad2 className="h-5 w-5" />,
  },
  {
    id: 'geoboard',
    name: 'Geoboard Digital',
    description: 'Padrões geométricos e visuais',
    category: 'pensamento-computacional',
    difficulty: 'facil',
    bnccSkill: 'EF01CI01',
    icon: <Gamepad2 className="h-5 w-5" />,
  },
  {
    id: 'sudoku',
    name: 'Sudoku para Crianças',
    description: 'Lógica numérica e padrões',
    category: 'pensamento-computacional',
    difficulty: 'medio',
    bnccSkill: 'EF04CI01',
    icon: <Gamepad2 className="h-5 w-5" />,
  },
  // Mundo Digital
  {
    id: 'battleship',
    name: 'Batalha Naval',
    description: 'Estratégia e coordenadas',
    category: 'mundo-digital',
    difficulty: 'facil',
    bnccSkill: 'Mundo Digital',
    icon: <Gamepad2 className="h-5 w-5" />,
  },
  {
    id: 'tictactoe',
    name: 'Jogo da Velha',
    description: 'Estratégia e lógica',
    category: 'mundo-digital',
    difficulty: 'facil',
    bnccSkill: 'Mundo Digital',
    icon: <Gamepad2 className="h-5 w-5" />,
  },
  {
    id: 'genius',
    name: 'Genius',
    description: 'Memória e sequenciamento',
    category: 'mundo-digital',
    difficulty: 'facil',
    bnccSkill: 'Mundo Digital',
    icon: <Gamepad2 className="h-5 w-5" />,
  },
  // Cultura Digital
  {
    id: 'security-quiz',
    name: 'Quiz de Segurança',
    description: 'Teste conhecimentos sobre segurança',
    category: 'cultura-digital',
    difficulty: 'medio',
    bnccSkill: 'EF08CI01',
    icon: <Gamepad2 className="h-5 w-5" />,
  },
];

export const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'pensamento-computacional':
      return <Brain className="h-4 w-4" />;
    case 'mundo-digital':
      return <Globe className="h-4 w-4" />;
    case 'cultura-digital':
      return <Shield className="h-4 w-4" />;
    default:
      return <Gamepad2 className="h-4 w-4" />;
  }
};

export const getCategoryColor = (category: string) => {
  switch (category) {
    case 'pensamento-computacional':
      return 'bg-blue-100 text-blue-700';
    case 'mundo-digital':
      return 'bg-green-100 text-green-700';
    case 'cultura-digital':
      return 'bg-purple-100 text-purple-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export const getDifficultyBadge = (difficulty: string) => {
  const badges = {
    facil: 'bg-green-100 text-green-700',
    medio: 'bg-yellow-100 text-yellow-700',
    dificil: 'bg-red-100 text-red-700',
  };
  return badges[difficulty as keyof typeof badges] || 'bg-gray-100 text-gray-700';
};

