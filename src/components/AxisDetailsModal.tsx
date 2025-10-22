import { motion, AnimatePresence } from 'framer-motion';
import { X, Brain, Globe, Users, ArrowRight, BookOpen, Target, Lightbulb } from 'lucide-react';

interface AxisDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  axis: {
    id: string;
    title: string;
    description: string;
    icon: any;
    color: string;
    gradient: string;
  };
}

const axisDetails = {
  'pensamento-computacional': {
    title: 'Pensamento Computacional',
    icon: Brain,
    color: 'text-blue-600',
    gradient: 'from-blue-500 to-blue-600',
    description: 'Desenvolva habilidades fundamentais para resolver problemas de forma sistemática e eficiente.',
    objectives: [
      'Desenvolver raciocínio lógico e analítico',
      'Aprender a decompor problemas complexos',
      'Reconhecer padrões e sequências',
      'Criar algoritmos para soluções',
      'Aplicar abstração e generalização'
    ],
    skills: [
      'Decomposição de problemas',
      'Reconhecimento de padrões',
      'Abstração e modelagem',
      'Algoritmos e sequências',
      'Pensamento crítico'
    ],
    activities: [
      'Quebra-cabeças lógicos',
      'Sequências de ações',
      'Jogos de estratégia',
      'Atividades de programação visual',
      'Resolução de problemas práticos'
    ],
    ageGroups: ['Educação Infantil', '1º ao 5º Ano', '6º ao 9º Ano'],
    examples: [
      'Organizar uma festa de aniversário (decomposição)',
      'Identificar padrões em músicas e danças',
      'Criar receitas de culinária (algoritmos)',
      'Resolver labirintos e quebra-cabeças'
    ]
  },
  'mundo-digital': {
    title: 'Mundo Digital',
    icon: Globe,
    color: 'text-blue-600',
    gradient: 'from-blue-500 to-blue-600',
    description: 'Explore conceitos de tecnologia digital, programação e interação com o ambiente digital.',
    objectives: [
      'Compreender o funcionamento de dispositivos digitais',
      'Desenvolver habilidades de programação',
      'Explorar ferramentas digitais educacionais',
      'Aplicar conceitos de robótica educacional',
      'Integrar tecnologia no processo de aprendizagem'
    ],
    skills: [
      'Programação visual (Scratch, Blockly)',
      'Uso de ferramentas digitais',
      'Robótica educacional',
      'Criação de conteúdo digital',
      'Navegação e pesquisa online'
    ],
    activities: [
      'Programação com Scratch Jr',
      'Construção de robôs LEGO',
      'Criação de apresentações digitais',
      'Uso de aplicativos educacionais',
      'Projetos de automação simples'
    ],
    ageGroups: ['1º ao 3º Ano', '4º ao 6º Ano', '7º ao 9º Ano'],
    examples: [
      'Criar animações com Scratch Jr',
      'Programar robôs para seguir trajetos',
      'Desenvolver jogos educacionais',
      'Usar tablets para atividades interativas'
    ]
  },
  'cultura-digital': {
    title: 'Cultura Digital',
    icon: Users,
    color: 'text-green-600',
    gradient: 'from-green-500 to-green-600',
    description: 'Desenvolva cidadania digital, ética e uso responsável das tecnologias na sociedade.',
    objectives: [
      'Compreender o impacto das tecnologias na sociedade',
      'Desenvolver cidadania digital',
      'Aplicar ética no uso de tecnologias',
      'Promover colaboração digital',
      'Fomentar pensamento crítico sobre mídias'
    ],
    skills: [
      'Cidadania digital',
      'Segurança online',
      'Colaboração digital',
      'Pensamento crítico sobre mídias',
      'Ética e responsabilidade digital'
    ],
    activities: [
      'Debates sobre uso de redes sociais',
      'Criação de campanhas de conscientização',
      'Projetos colaborativos online',
      'Análise crítica de notícias',
      'Desenvolvimento de códigos de conduta'
    ],
    ageGroups: ['4º ao 6º Ano', '7º ao 9º Ano'],
    examples: [
      'Criar campanhas sobre cyberbullying',
      'Desenvolver projetos colaborativos',
      'Analisar fake news e desinformação',
      'Estabelecer regras de uso de tecnologia'
    ]
  }
};

export const AxisDetailsModal = ({ isOpen, onClose, axis }: AxisDetailsModalProps) => {
  const details = axisDetails[axis.id as keyof typeof axisDetails];

  if (!details) return null;

  const Icon = details.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`bg-gradient-to-r ${details.gradient} p-6 rounded-t-2xl`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">{details.title}</h2>
                    <p className="text-white/90 text-lg">{details.description}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {/* Objetivos */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Target className="w-6 h-6 text-blue-600" />
                  Objetivos de Aprendizagem
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {details.objectives.map((objective, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{objective}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Habilidades */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-green-600" />
                  Habilidades Desenvolvidas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {details.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Atividades */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                  Tipos de Atividades
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {details.activities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                      <ArrowRight className="w-4 h-4 text-purple-600 flex-shrink-0" />
                      <span className="text-gray-700">{activity}</span>
                    </div>
                  ))}
                </div>
              </div>


              {/* Exemplos Práticos */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Exemplos Práticos</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {details.examples.map((example, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                      <p className="text-gray-700">{example}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-gray-50 rounded-b-2xl">
              <div className="flex items-center justify-between">
                <p className="text-gray-600">
                  Conteúdo alinhado com a <strong>BNCC Computacional</strong>
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Fechar
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
