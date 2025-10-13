import { motion } from 'framer-motion';
import { Brain, Globe, Bot } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Pensamento Computacional',
    description:
      'Desenvolva habilidades de resolução de problemas através de decomposição, reconhecimento de padrões e algoritmos.',
    color: '#005a93',
    bgColor: '#e6f2ff',
  },
  {
    icon: Globe,
    title: 'Cultura Digital',
    description:
      'Compreenda o impacto das tecnologias digitais na sociedade e desenvolva cidadania digital com seus alunos.',
    color: '#00913b',
    bgColor: '#e6f7ed',
  },
  {
    icon: Bot,
    title: 'Mundo Digital',
    description:
      'Explore conceitos de mundo digital e programação de forma prática e alinhada com a BNCC.',
    color: '#ffbe00',
    bgColor: '#fff9e6',
  },
];

export const Features = () => {
  return (
    <section id="cursos" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Áreas de Conhecimento
          </h2>
          <p className="text-xl text-gray-600">
            Conteúdo alinhado com a BNCC para transformar sua prática pedagógica
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-xl transition-all"
            >
              <div 
                className="w-16 h-16 rounded-lg flex items-center justify-center mb-6"
                style={{ backgroundColor: feature.bgColor }}
              >
                <feature.icon className="w-8 h-8" style={{ color: feature.color }} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
