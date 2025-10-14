import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, X, ChevronRight } from 'lucide-react';

interface AITipsProps {
  isVisible: boolean;
  onClose: () => void;
}

const tips = [
  {
    id: 1,
    title: "💡 Dica do Assistente",
    content: "Comece sempre com atividades desplugadas antes de introduzir tecnologia!",
    category: "Implementação"
  },
  {
    id: 2,
    title: "🎯 Estratégia Pedagógica",
    content: "Use problemas do cotidiano para ensinar algoritmos e sequências.",
    category: "Pedagogia"
  },
  {
    id: 3,
    title: "🔧 Ferramenta Recomendada",
    content: "Scratch Jr é perfeito para crianças de 5-7 anos começarem a programar.",
    category: "Ferramentas"
  },
  {
    id: 4,
    title: "📚 Integração Curricular",
    content: "Conecte pensamento computacional com matemática usando padrões e sequências.",
    category: "Currículo"
  },
  {
    id: 5,
    title: "🤝 Colaboração",
    content: "Trabalho em equipe desenvolve habilidades de comunicação e resolução de problemas.",
    category: "Metodologia"
  },
  {
    id: 6,
    title: "🎨 Criatividade",
    content: "Permita que os alunos criem suas próprias soluções - não há uma única resposta certa!",
    category: "Pedagogia"
  },
  {
    id: 7,
    title: "📊 Avaliação",
    content: "Foque no processo de pensamento, não apenas no resultado final.",
    category: "Avaliação"
  },
  {
    id: 8,
    title: "🚀 Motivação",
    content: "Use gamificação para tornar o aprendizado mais envolvente e divertido.",
    category: "Engajamento"
  }
];

export const AITips = ({ isVisible, onClose }: AITipsProps) => {
  const [currentTip, setCurrentTip] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setCurrentTip((prev) => (prev + 1) % tips.length);
      }, 8000); // Muda a dica a cada 8 segundos

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        className="fixed bottom-24 right-6 z-30 max-w-sm"
      >
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="p-3" style={{ backgroundColor: '#044982' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-white" />
                <span className="text-white text-sm font-medium">Dicas do Assistente</span>
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
              >
                <X className="h-3 w-3 text-white" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTip}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-2">
                  <span className="text-xs text-white font-medium px-2 py-1 rounded-full" style={{ backgroundColor: '#044982' }}>
                    {tips[currentTip].category}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-gray-900 mb-1">
                  {tips[currentTip].title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {tips[currentTip].content}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Progress indicator */}
            <div className="flex justify-center mt-3 space-x-1">
              {tips.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentTip ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {/* Expand button */}
            <button
              onClick={handleExpand}
              className="w-full mt-3 flex items-center justify-center gap-1 text-xs transition-colors"
              style={{ color: '#044982' }}
            >
              <span>Ver todas as dicas</span>
              <ChevronRight className={`h-3 w-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
            </button>
          </div>

          {/* Expanded tips list */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-gray-200 max-h-48 overflow-y-auto"
              >
                <div className="p-3 space-y-2">
                  {tips.map((tip, index) => (
                    <div
                      key={tip.id}
                      className={`p-2 rounded-lg cursor-pointer transition-colors ${
                        index === currentTip 
                          ? 'bg-orange-50 border border-orange-200' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setCurrentTip(index)}
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-xs text-orange-600 font-medium bg-orange-100 px-2 py-1 rounded-full flex-shrink-0">
                          {tip.category}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-900 truncate">
                            {tip.title}
                          </p>
                          <p className="text-xs text-gray-600 line-clamp-2">
                            {tip.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
