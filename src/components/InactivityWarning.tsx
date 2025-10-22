import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, AlertTriangle } from 'lucide-react';

interface InactivityWarningProps {
  isVisible: boolean;
  timeRemaining: number;
  onExtend: () => void;
  onLogout: () => void;
}

export const InactivityWarning = ({ 
  isVisible, 
  timeRemaining, 
  onExtend, 
  onLogout 
}: InactivityWarningProps) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (isVisible && timeRemaining > 0) {
      const interval = setInterval(() => {
        const remainingSeconds = Math.ceil(timeRemaining / 1000);
        const totalSeconds = 60; // 1 minuto de aviso
        const newProgress = (remainingSeconds / totalSeconds) * 100;
        setProgress(Math.max(0, newProgress));
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isVisible, timeRemaining]);

  const formatTime = (ms: number) => {
    const seconds = Math.ceil(ms / 1000);
    return `${seconds}s`;
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Sessão Expirando
                </h3>
                <p className="text-sm text-gray-600">
                  Você será desconectado por inatividade
                </p>
              </div>
            </div>

            {/* Timer */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Tempo restante:
                </span>
                <span className="text-lg font-bold text-orange-600">
                  {formatTime(timeRemaining)}
                </span>
              </div>
              
              {/* Barra de progresso */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-orange-500 h-2 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>

            {/* Mensagem */}
            <div className="mb-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-orange-800 font-medium">
                    Sua sessão expirará em breve
                  </p>
                  <p className="text-sm text-orange-700 mt-1">
                    Clique em "Continuar" para manter sua sessão ativa ou você será desconectado automaticamente.
                  </p>
                </div>
              </div>
            </div>

            {/* Botões */}
            <div className="flex gap-3">
              <button
                onClick={onLogout}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Sair Agora
              </button>
              <button
                onClick={onExtend}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Continuar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
