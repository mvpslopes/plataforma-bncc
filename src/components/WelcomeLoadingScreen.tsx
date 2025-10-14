import { motion } from 'framer-motion';
import { Brain, BookOpen, Users, Lightbulb, Sparkles, Target, Zap } from 'lucide-react';

interface WelcomeLoadingScreenProps {
  message?: string;
}

export const WelcomeLoadingScreen = ({ message = "Preparando sua jornada educacional..." }: WelcomeLoadingScreenProps) => {
  const features = [
    { icon: Brain, text: "Pensamento Computacional", color: "from-blue-500 to-blue-600" },
    { icon: BookOpen, text: "Atividades BNCC", color: "from-green-500 to-green-600" },
    { icon: Users, text: "Comunidade Ativa", color: "from-blue-500 to-blue-600" },
    { icon: Lightbulb, text: "Assistente IA", color: "from-yellow-500 to-yellow-600" }
  ];

  const benefits = [
    { icon: Target, text: "Alinhado com BNCC" },
    { icon: Zap, text: "Atividades Prontas" },
    { icon: Sparkles, text: "Inovação Educacional" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#044982' }}>
      {/* Background Animation */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="text-center text-white relative z-10 max-w-4xl mx-auto px-4">
        {/* Logo/Ícone Principal com Efeito Glow */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 mx-auto rounded-full flex items-center justify-center shadow-2xl"
              style={{ 
                backgroundColor: '#044982',
                boxShadow: "0 0 50px rgba(59, 130, 246, 0.5), 0 0 100px rgba(4, 73, 130, 0.3)"
              }}
            >
              <Brain className="h-12 w-12 text-white" />
            </motion.div>
            
            {/* Pulse Ring */}
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 border-2 border-blue-400 rounded-full"
            />
          </div>
        </motion.div>

        {/* Título Principal */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent"
        >
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-xl md:text-2xl opacity-90 mb-4"
        >
          Transformando a Educação Digital
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-lg opacity-80 mb-12 max-w-2xl mx-auto"
        >
          A plataforma completa para professores implementarem pensamento computacional e competências digitais na educação básica
        </motion.p>

        {/* Barra de Progresso Moderna */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="w-80 h-3 bg-white bg-opacity-20 rounded-full mx-auto mb-8 overflow-hidden backdrop-blur-sm"
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              ease: "easeInOut",
              repeatType: "reverse"
            }}
            className="h-full rounded-full"
            style={{ backgroundColor: '#044982' }}
          />
        </motion.div>

        {/* Mensagem de Carregamento */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-lg opacity-90 mb-12 font-medium"
        >
          {message}
        </motion.p>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                delay: 1.6 + (index * 0.1), 
                duration: 0.6,
              }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group"
            >
              <div className={`bg-gradient-to-br ${feature.color} rounded-xl p-4 backdrop-blur-sm shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                <feature.icon className="h-6 w-6 mx-auto mb-2 text-white" />
                <span className="text-xs font-medium text-white text-center block">{feature.text}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-6 mb-8"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: 2.2 + (index * 0.1), 
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 3
              }}
              className="flex items-center gap-2 bg-white bg-opacity-10 rounded-full px-4 py-2 backdrop-blur-sm"
            >
              <benefit.icon className="h-4 w-4 text-blue-300" />
              <span className="text-sm font-medium">{benefit.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Loading Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 0.8 }}
          className="flex justify-center gap-3"
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
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: '#044982' }}
            />
          ))}
        </motion.div>

        {/* Call to Action Hint */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 0.8 }}
          className="mt-8 text-sm opacity-70"
        >
          <p>Em breve você terá acesso a centenas de atividades prontas!</p>
        </motion.div>
      </div>
    </div>
  );
};
