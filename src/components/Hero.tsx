import { motion } from 'framer-motion';
import { ArrowRight, Play, Star, Users, Award, Zap, Brain } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="pt-32 pb-20 px-4 relative overflow-hidden min-h-screen flex items-center" style={{ backgroundColor: '#044982' }}>
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.08) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        />
        
        {/* Floating Elements */}
        {[...Array(15)].map((_, i) => (
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
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
            >
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-white">Plataforma #1 em Educação Digital</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              <div className="bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
                BNCC Computacional
              </div>
              <div className="text-white mt-4 text-4xl md:text-5xl">
                Atividades prontas para professores
              </div>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Plataforma especializada em <strong className="text-white">competências digitais</strong> e 
              <strong className="text-white"> pensamento computacional</strong> para professores da educação básica.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-6 mb-8 justify-center lg:justify-start"
            >
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-300" />
                <span className="text-white font-semibold">10.000+</span>
                <span className="text-gray-300">Professores</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-300" />
                <span className="text-white font-semibold">500+</span>
                <span className="text-gray-300">Atividades</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" style={{ color: '#044982' }} />
                <span className="text-white font-semibold">100%</span>
                <span className="text-gray-300">BNCC</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
            <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetStarted}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#0369a1';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#044982';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
                className="group inline-flex items-center justify-center space-x-3 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-2xl hover:shadow-3xl border-2 border-white border-opacity-20"
                style={{ backgroundColor: '#044982' }}
              >
                <span>Começar Agora</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center justify-center space-x-3 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20"
              >
                <Play className="w-5 h-5" />
                <span>Ver Demonstração</span>
            </motion.button>
            </motion.div>
          </motion.div>

          {/* Photo Gallery */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Main Photo Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Large Photo */}
              <motion.div
                initial={{ scale: 0.8, rotateY: -15 }}
                animate={{ scale: 1, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="col-span-2 relative rounded-2xl overflow-hidden shadow-2xl"
              >
                <img
                  src="/images/hero/guy-e-garota-estao-sentados-a-mesa-garota-africana-na-aula-de-ciencia-da-computacao-criancas-jogando-jogos-de-computador.jpg"
                  alt="Crianças colaborando com tecnologia"
                  className="w-full h-64 object-cover"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/600x300/f3f4f6/6b7280?text=Educação+Digital';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-lg font-semibold">Aprendizado Colaborativo</div>
                  <div className="text-sm opacity-90">Tecnologia na educação</div>
                </div>
              </motion.div>

              {/* Smaller Photos */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="relative rounded-xl overflow-hidden shadow-lg"
              >
                <img
                  src="/images/hero/criancas-de-tiro-medio-com-tablet.jpg"
                  alt="Crianças usando tablets"
                  className="w-full h-32 object-cover"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/300x200/f3f4f6/6b7280?text=Tablets';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-2 left-2 text-white">
                  <div className="text-sm font-semibold">Tablets</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="relative rounded-xl overflow-hidden shadow-lg"
              >
                <img
                  src="/images/hero/criancas-em-filmagem-media-olhando-para-um-tablet.jpg"
                  alt="Crianças programando"
                  className="w-full h-32 object-cover"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/300x200/f3f4f6/6b7280?text=Programação';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-2 left-2 text-white">
                  <div className="text-sm font-semibold">Programação</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="col-span-2 relative rounded-xl overflow-hidden shadow-lg"
              >
                <img
                  src="/images/hero/criancas-fazendo-licao-de-casa-em-close-up-de-um-laptop.jpg"
                  alt="Sala de aula moderna"
                  className="w-full h-24 object-cover"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/600x150/f3f4f6/6b7280?text=Sala+Moderna';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-2 left-2 text-white">
                  <div className="text-sm font-semibold">Ambientes Digitais</div>
                </div>
              </motion.div>
            </div>

            {/* Floating Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-blue-400 text-white p-4 rounded-xl shadow-lg"
            >
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                <span className="text-sm font-semibold">IA Assistente</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="absolute -bottom-4 -left-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white p-4 rounded-xl shadow-lg"
            >
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span className="text-sm font-semibold">500+ Atividades</span>
            </div>
            </motion.div>

            {/* Background Glow */}
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl blur-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
