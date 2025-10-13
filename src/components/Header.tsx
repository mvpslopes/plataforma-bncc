import { motion } from 'framer-motion';
import { BookOpen, LogIn } from 'lucide-react';

interface HeaderProps {
  onLoginClick: () => void;
}

export const Header = ({ onLoginClick }: HeaderProps) => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white shadow-sm fixed w-full top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8" style={{ color: '#005a93' }} />
            <span className="text-2xl font-bold text-gray-900">NovaEdu</span>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a href="#inicio" className="text-gray-700 transition-colors" style={{ '--hover-color': '#005a93' } as React.CSSProperties} onMouseEnter={(e) => e.currentTarget.style.color = '#005a93'} onMouseLeave={(e) => e.currentTarget.style.color = '#374151'}>
              Início
            </a>
            <a href="#cursos" className="text-gray-700 transition-colors" style={{ '--hover-color': '#005a93' } as React.CSSProperties} onMouseEnter={(e) => e.currentTarget.style.color = '#005a93'} onMouseLeave={(e) => e.currentTarget.style.color = '#374151'}>
              Cursos
            </a>
            <a href="#materiais" className="text-gray-700 transition-colors" style={{ '--hover-color': '#005a93' } as React.CSSProperties} onMouseEnter={(e) => e.currentTarget.style.color = '#005a93'} onMouseLeave={(e) => e.currentTarget.style.color = '#374151'}>
              Materiais
            </a>
            <a href="#sobre" className="text-gray-700 transition-colors" style={{ '--hover-color': '#005a93' } as React.CSSProperties} onMouseEnter={(e) => e.currentTarget.style.color = '#005a93'} onMouseLeave={(e) => e.currentTarget.style.color = '#374151'}>
              Sobre
            </a>
          </nav>

          <button
            onClick={onLoginClick}
            className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg transition-colors"
            style={{ backgroundColor: '#005a93' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#004a7a'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#005a93'}
          >
            <LogIn className="w-4 h-4" />
            <span>Entrar</span>
          </button>
        </div>
      </div>
    </motion.header>
  );
};
