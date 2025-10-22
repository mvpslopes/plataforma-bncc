import { motion } from 'framer-motion';
import { 
  Users, 
  Target, 
  Heart, 
  Lightbulb, 
  Globe, 
  Shield,
  CheckCircle,
  Star,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Calendar,
  TrendingUp,
  Brain,
  Code,
  Palette
} from 'lucide-react';

const teamMembers = [
  {
    name: 'Dr. Ana Carolina Silva',
    role: 'Coordenadora Pedagógica',
    bio: 'Doutora em Educação com 15 anos de experiência em tecnologia educacional.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
    expertise: ['Pedagogia', 'Tecnologia Educacional', 'BNCC']
  },
  {
    name: 'Prof. Roberto Mendes',
    role: 'Especialista em Pensamento Computacional',
    bio: 'Mestre em Ciência da Computação e especialista em educação infantil.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    expertise: ['Programação', 'Educação Infantil', 'Metodologias Ativas']
  },
  {
    name: 'Dra. Maria Fernanda Costa',
    role: 'Coordenadora de Cultura Digital',
    bio: 'Doutora em Comunicação e especialista em cidadania digital.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
    expertise: ['Comunicação Digital', 'Cidadania Digital', 'Ética na Tecnologia']
  },
  {
    name: 'Eng. Pedro Santos',
    role: 'Desenvolvedor de Soluções',
    bio: 'Engenheiro de Software com foco em plataformas educacionais.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    expertise: ['Desenvolvimento', 'UX/UI', 'Tecnologias Educacionais']
  }
];

const values = [
  {
    icon: Heart,
    title: 'Paixão pela Educação',
    description: 'Acreditamos que a educação é a base para um futuro melhor e trabalhamos com amor e dedicação para transformar vidas através do conhecimento.'
  },
  {
    icon: Target,
    title: 'Excelência Pedagógica',
    description: 'Buscamos sempre a excelência em nossos materiais e metodologias, garantindo que cada recurso seja pedagogicamente sólido e eficaz.'
  },
  {
    icon: Users,
    title: 'Colaboração',
    description: 'Valorizamos o trabalho em equipe e a colaboração entre educadores, criando uma comunidade forte e unida em prol da educação.'
  },
  {
    icon: Lightbulb,
    title: 'Inovação',
    description: 'Estamos sempre em busca de novas formas de ensinar e aprender, incorporando as melhores práticas e tecnologias educacionais.'
  }
];

const milestones = [
  {
    year: '2020',
    title: 'Fundação da Plataforma',
    description: 'Início do desenvolvimento da plataforma BNCC Computacional com foco na educação brasileira.'
  },
  {
    year: '2021',
    title: 'Primeira Versão Beta',
    description: 'Lançamento da versão beta com 100 atividades e 50 escolas piloto.'
  },
  {
    year: '2022',
    title: 'Expansão Nacional',
    description: 'Atingimos 500 escolas em todo o Brasil com mais de 1.000 atividades disponíveis.'
  },
  {
    year: '2023',
    title: 'IA Assistente',
    description: 'Implementação do assistente de IA para suporte pedagógico personalizado.'
  },
  {
    year: '2024',
    title: 'Comunidade Ativa',
    description: 'Mais de 10.000 professores ativos e 50.000 alunos beneficiados em todo o país.'
  }
];


interface AboutProps {
  onBackToHome: () => void;
}

export const About = ({ onBackToHome }: AboutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <motion.button
          onClick={onBackToHome}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          whileHover={{ x: -5 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar para o início
        </motion.button>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-green-500 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              <span>Sobre Nós</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Transformando a <span className="text-yellow-300">Educação</span> através da Tecnologia
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Somos uma equipe apaixonada por educação e tecnologia, dedicada a democratizar 
              o acesso ao pensamento computacional e cultura digital nas escolas brasileiras.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Nossa <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Missão</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Democratizar o acesso ao pensamento computacional e cultura digital, 
              fornecendo recursos educacionais de qualidade que capacitem professores 
              e inspirem alunos a se tornarem criadores e não apenas consumidores de tecnologia.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span className="text-gray-700">Recursos alinhados com a BNCC</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span className="text-gray-700">Suporte pedagógico especializado</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span className="text-gray-700">Comunidade ativa de educadores</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nossos <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Valores</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Os princípios que guiam nosso trabalho e definem nossa identidade como equipe.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nossa <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Equipe</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Conheça os profissionais dedicados que fazem da nossa plataforma uma referência em educação computacional.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-blue-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(member.name) + '&background=3b82f6&color=fff&size=200';
                    }}
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.bio}</p>
                <div className="flex flex-wrap gap-1 justify-center">
                  {member.expertise.map(skill => (
                    <span key={skill} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nossa <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Jornada</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Uma linha do tempo dos principais marcos que nos trouxeram até aqui.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-green-500"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-gray-900">{milestone.year}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-green-500 rounded-full border-4 border-white shadow-lg z-10"></div>

                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Vamos Conversar?</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Tem dúvidas, sugestões ou quer fazer parte da nossa missão? 
              Entre em contato conosco!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-white/80">contato@bncccomputacional.com.br</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Telefone</h3>
              <p className="text-white/80">(11) 99999-9999</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Localização</h3>
              <p className="text-white/80">São Paulo, SP - Brasil</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <button 
              onClick={() => {
                console.log('Botão clicado, navegando para home...');
                // Navegar para a página inicial com hash
                window.location.href = '/#formulario-contato';
              }}
              className="bg-white text-blue-600 font-bold px-8 py-4 rounded-2xl hover:bg-yellow-300 transition-colors shadow-lg flex items-center gap-2 mx-auto"
            >
              <span>Entrar em Contato</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
