import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-blue-50 to-green-50 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-10">
        <img
          src="/images/hero/criancas-fazendo-licao-de-casa-em-close-up-de-um-laptop.jpg"
          alt="Crianças usando tecnologia em sala de aula"
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-center">
              <div style={{ color: '#005a93' }}>BNCC Computacional</div>
              <div className="mt-4">Atividades prontas para professores</div>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto lg:mx-0">
              Plataforma especializada em competências digitais e pensamento computacional
              para professores da educação básica
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetStarted}
              className="inline-flex items-center space-x-2 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg"
              style={{ backgroundColor: '#005a93' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#004a7a'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#005a93'}
            >
              <span>Acesse Agora</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <img
                  src="/images/hero/guy-e-garota-estao-sentados-a-mesa-garota-africana-na-aula-de-ciencia-da-computacao-criancas-jogando-jogos-de-computador.jpg"
                  alt="Crianças colaborando com tecnologia"
                  className="w-full h-48 object-cover transition-transform hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/400x300/f3f4f6/6b7280?text=Educação+Digital';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-sm font-semibold">Aprendizado Colaborativo</div>
                </div>
              </div>
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <img
                  src="/images/hero/criancas-em-filmagem-media-olhando-para-um-tablet.jpg"
                  alt="Crianças programando robôs"
                  className="w-full h-32 object-cover transition-transform hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/400x300/f3f4f6/6b7280?text=Programação';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-sm font-semibold">Robótica Educacional</div>
                </div>
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <img
                  src="/images/hero/criancas-fazendo-licao-de-casa-em-close-up-de-um-laptop.jpg"
                  alt="Sala de aula moderna com tecnologia"
                  className="w-full h-32 object-cover transition-transform hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/400x300/f3f4f6/6b7280?text=Sala+Moderna';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-sm font-semibold">Ambientes Digitais</div>
                </div>
              </div>
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <img
                  src="/images/hero/criancas-de-tiro-medio-com-tablet.jpg"
                  alt="Crianças usando tablets"
                  className="w-full h-48 object-cover transition-transform hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/400x300/f3f4f6/6b7280?text=Tablets';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-sm font-semibold">Tecnologia na Educação</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
