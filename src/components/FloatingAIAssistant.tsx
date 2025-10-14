import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Bot, Lightbulb } from 'lucide-react';
import { AIAssistant } from './AIAssistant';
import { AITips } from './AITips';

export const FloatingAIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showTips, setShowTips] = useState(true);

  const toggleAssistant = () => {
    if (isOpen) {
      setIsMinimized(!isMinimized);
    } else {
      setIsOpen(true);
      setIsMinimized(false);
    }
  };

  const closeAssistant = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const closeTips = () => {
    setShowTips(false);
  };

  return (
    <>
      {/* Botão Flutuante */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleAssistant}
        className={`fixed bottom-6 right-6 z-40 ${
          isOpen ? 'hidden' : 'block'
        }`}
      >
        <div className="relative">
          {/* Botão principal */}
          <div className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-all duration-300" style={{ backgroundColor: '#044982' }}>
            <MessageCircle className="h-6 w-6" />
          </div>
          
          {/* Indicador de notificação */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">IA</span>
          </div>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Assistente BNCC Computacional
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
          </div>
        </div>
      </motion.button>

      {/* Chat Minimizado */}
      <AnimatePresence>
        {isOpen && isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-40"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* Header minimizado */}
              <div className="flex items-center justify-between p-3 text-white" style={{ backgroundColor: '#044982' }}>
                <div className="flex items-center gap-2">
                  <Bot className="h-4 w-4" />
                  <span className="text-sm font-medium">Assistente BNCC</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsMinimized(false)}
                    className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </button>
                  <button
                    onClick={closeAssistant}
                    className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {/* Preview da última mensagem */}
              <div className="p-3 max-w-xs">
                <p className="text-sm text-gray-600">
                  Olá! Como posso te ajudar com pensamento computacional hoje?
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-500">Online</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Completo */}
      <AIAssistant isOpen={isOpen && !isMinimized} onClose={closeAssistant} />

      {/* Dicas do Assistente */}
      <AITips isVisible={showTips && !isOpen} onClose={closeTips} />
    </>
  );
};
