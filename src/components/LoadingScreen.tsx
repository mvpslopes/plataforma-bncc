import { motion } from 'framer-motion';
import { Brain, BookOpen, Users, Lightbulb } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen = ({ message = "Carregando plataforma BNCC..." }: LoadingScreenProps) => {
  const features = [
    { icon: Brain, text: "Pensamento Computacional" },
    { icon: BookOpen, text: "Atividades BNCC" },
    { icon: Users, text: "Comunidade" },
    { icon: Lightbulb, text: "Assistente IA" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: '#044982' }}>
      <div className="text-center text-white">
        {/* Logo/Ícone Principal */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="w-20 h-20 mx-auto bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Brain className="h-10 w-10 text-white" />
          </div>
        </motion.div>

        {/* Título */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-3xl font-bold mb-2"
        >
          Plataforma BNCC
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg opacity-90 mb-8"
        >
          Computacional
        </motion.p>

        {/* Barra de Progresso */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="w-64 h-2 bg-white bg-opacity-20 rounded-full mx-auto mb-8 overflow-hidden"
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut",
              repeatType: "reverse"
            }}
            className="h-full bg-white rounded-full"
          />
        </motion.div>

        {/* Mensagem de Carregamento */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-sm opacity-80 mb-8"
        >
          {message}
        </motion.p>

        {/* Features em Loading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="grid grid-cols-2 gap-4 max-w-md mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: 1.4 + (index * 0.1), 
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 2
              }}
              className="flex items-center gap-2 bg-white bg-opacity-10 rounded-lg p-3 backdrop-blur-sm"
            >
              <feature.icon className="h-4 w-4" />
              <span className="text-xs">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Pontos de Carregamento */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="flex justify-center gap-2 mt-8"
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut"
              }}
              className="w-2 h-2 bg-white rounded-full"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};
