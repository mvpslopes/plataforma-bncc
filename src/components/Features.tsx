import { motion } from 'framer-motion';
import { Brain, Globe, Bot, Code, Users, BookOpen, Zap, Target, Lightbulb } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Pensamento Computacional',
    description:
      'Desenvolva habilidades de resolução de problemas através de decomposição, reconhecimento de padrões e algoritmos.',
    gradient: 'from-blue-500 to-blue-600',
    bgGradient: 'from-blue-50 to-blue-100',
    stats: '500+ Atividades',
    color: 'text-blue-600'
  },
  {
    icon: Globe,
    title: 'Cultura Digital',
    description:
      'Compreenda o impacto das tecnologias digitais na sociedade e desenvolva cidadania digital com seus alunos.',
    gradient: 'from-green-500 to-green-600',
    bgGradient: 'from-green-50 to-green-100',
    stats: '100% BNCC',
    color: 'text-green-600'
  },
  {
    icon: Bot,
    title: 'Mundo Digital',
    description:
      'Explore conceitos de mundo digital e programação de forma prática e alinhada com a BNCC.',
    gradient: 'from-purple-500 to-purple-600',
    bgGradient: 'from-purple-50 to-purple-100',
    stats: 'IA Assistente',
    color: 'text-purple-600'
  },
];

const benefits = [
  { icon: Code, text: 'Atividades Prontas', color: 'text-blue-500' },
  { icon: Users, text: 'Comunidade Ativa', color: 'text-green-500' },
  { icon: BookOpen, text: 'Material BNCC', color: 'text-purple-500' },
  { icon: Zap, text: 'Implementação Rápida', color: 'text-yellow-500' },
  { icon: Target, text: 'Resultados Comprovados', color: 'text-red-500' },
  { icon: Lightbulb, text: 'Inovação Constante', color: 'text-indigo-500' }
];

export const Features = () => {
  return (
    <section id="cursos" className="py-24 px-4 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 90% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Target className="w-4 h-4" />
            <span>Áreas de Conhecimento</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Transforme sua
            </span>
            <br />
            <span className="text-gray-900">Prática Pedagógica</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Conteúdo especializado e alinhado com a BNCC para implementar pensamento computacional 
            e competências digitais de forma eficaz
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                {/* Icon with Gradient Background */}
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-10 h-10 text-white" />
                </div>

                {/* Stats Badge */}
                <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${feature.bgGradient} ${feature.color} px-3 py-1 rounded-full text-sm font-semibold mb-4`}>
                  <span>{feature.stats}</span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {feature.description}
                </p>

                {/* Learn More Link */}
                <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                  <span>Saiba mais</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10`} />
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Por que escolher nossa plataforma?
            </h3>
            <p className="text-lg text-gray-600">
              Benefícios que fazem a diferença na sua prática educacional
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center group"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors`}>
                  <benefit.icon className={`w-8 h-8 ${benefit.color}`} />
                </div>
                <p className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                  {benefit.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
