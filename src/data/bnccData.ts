import { SchoolYear, BNCCAxis, KnowledgeObject, Skill, Activity, VideoCourse, Document, User } from '../types/bncc';

// Anos escolares conforme BNCC
export const schoolYears: SchoolYear[] = [
  // Educação Infantil
  {
    id: 'ei',
    name: 'Educação Infantil',
    level: 'educacao-infantil',
    order: 1,
    description: 'Creche e Pré-escola'
  },
  
  // Anos Iniciais
  {
    id: '1ano',
    name: '1º Ano',
    level: 'anos-iniciais',
    order: 2,
    description: 'Ensino Fundamental - Anos Iniciais'
  },
  {
    id: '2ano',
    name: '2º Ano',
    level: 'anos-iniciais',
    order: 3,
    description: 'Ensino Fundamental - Anos Iniciais'
  },
  {
    id: '3ano',
    name: '3º Ano',
    level: 'anos-iniciais',
    order: 4,
    description: 'Ensino Fundamental - Anos Iniciais'
  },
  {
    id: '4ano',
    name: '4º Ano',
    level: 'anos-iniciais',
    order: 5,
    description: 'Ensino Fundamental - Anos Iniciais'
  },
  {
    id: '5ano',
    name: '5º Ano',
    level: 'anos-iniciais',
    order: 6,
    description: 'Ensino Fundamental - Anos Iniciais'
  },
  
  // Anos Finais
  {
    id: '6ano',
    name: '6º Ano',
    level: 'anos-finais',
    order: 7,
    description: 'Ensino Fundamental - Anos Finais'
  },
  {
    id: '7ano',
    name: '7º Ano',
    level: 'anos-finais',
    order: 8,
    description: 'Ensino Fundamental - Anos Finais'
  },
  {
    id: '8ano',
    name: '8º Ano',
    level: 'anos-finais',
    order: 9,
    description: 'Ensino Fundamental - Anos Finais'
  },
  {
    id: '9ano',
    name: '9º Ano',
    level: 'anos-finais',
    order: 10,
    description: 'Ensino Fundamental - Anos Finais'
  },
  
  // AEE
  {
    id: 'aee',
    name: 'AEE',
    level: 'aee',
    order: 11,
    description: 'Atendimento Educacional Especializado'
  }
];

// Eixos da BNCC Computacional
export const bnccAxes: BNCCAxis[] = [
  {
    id: 'pensamento-computacional',
    name: 'Pensamento Computacional',
    description: 'Desenvolvimento de habilidades para resolver problemas de forma sistemática',
    color: 'bg-blue-100 text-blue-700'
  },
  {
    id: 'mundo-digital',
    name: 'Mundo Digital',
    description: 'Compreensão e interação com o ambiente digital',
    color: 'bg-green-100 text-green-700'
  },
  {
    id: 'cultura-digital',
    name: 'Cultura Digital',
    description: 'Uso crítico e responsável das tecnologias digitais',
    color: 'bg-purple-100 text-purple-700'
  }
];

// Objetos do Conhecimento
export const knowledgeObjects: KnowledgeObject[] = [
  {
    id: 'algoritmos',
    name: 'Algoritmos',
    description: 'Sequência de instruções para resolver problemas',
    axisId: 'pensamento-computacional',
    schoolYears: ['1ano', '2ano', '3ano', '4ano', '5ano', '6ano', '7ano', '8ano', '9ano']
  },
  {
    id: 'decomposicao',
    name: 'Decomposição',
    description: 'Quebrar problemas complexos em partes menores',
    axisId: 'pensamento-computacional',
    schoolYears: ['1ano', '2ano', '3ano', '4ano', '5ano', '6ano', '7ano', '8ano', '9ano']
  },
  {
    id: 'abstracao',
    name: 'Abstração',
    description: 'Identificar padrões e características essenciais',
    axisId: 'pensamento-computacional',
    schoolYears: ['3ano', '4ano', '5ano', '6ano', '7ano', '8ano', '9ano']
  },
  {
    id: 'programacao-visual',
    name: 'Programação Visual',
    description: 'Programação usando blocos visuais',
    axisId: 'pensamento-computacional',
    schoolYears: ['1ano', '2ano', '3ano', '4ano', '5ano', '6ano', '7ano', '8ano', '9ano']
  },
  {
    id: 'ferramentas-digitais',
    name: 'Ferramentas Digitais',
    description: 'Uso de aplicativos e softwares educacionais',
    axisId: 'mundo-digital',
    schoolYears: ['1ano', '2ano', '3ano', '4ano', '5ano', '6ano', '7ano', '8ano', '9ano']
  },
  {
    id: 'robotica-educacional',
    name: 'Mundo Digital',
    description: 'Construção e programação de robôs',
    axisId: 'mundo-digital',
    schoolYears: ['4ano', '5ano', '6ano', '7ano', '8ano', '9ano']
  },
  {
    id: 'seguranca-digital',
    name: 'Segurança Digital',
    description: 'Proteção de dados e privacidade online',
    axisId: 'cultura-digital',
    schoolYears: ['4ano', '5ano', '6ano', '7ano', '8ano', '9ano']
  },
  {
    id: 'colaboracao-digital',
    name: 'Colaboração Digital',
    description: 'Trabalho em equipe usando ferramentas digitais',
    axisId: 'cultura-digital',
    schoolYears: ['3ano', '4ano', '5ano', '6ano', '7ano', '8ano', '9ano']
  }
];

// Habilidades da BNCC
export const skills: Skill[] = [
  {
    id: 'ef01ci01',
    code: 'EF01CI01',
    description: 'Identificar e descrever padrões em sequências simples',
    knowledgeObjectId: 'algoritmos',
    schoolYears: ['1ano']
  },
  {
    id: 'ef02ci01',
    code: 'EF02CI01',
    description: 'Descrever sequências de ações para resolver problemas',
    knowledgeObjectId: 'algoritmos',
    schoolYears: ['2ano']
  },
  {
    id: 'ef03ci01',
    code: 'EF03CI01',
    description: 'Identificar padrões em sequências e decompor problemas',
    knowledgeObjectId: 'decomposicao',
    schoolYears: ['3ano']
  },
  {
    id: 'ef04ci01',
    code: 'EF04CI01',
    description: 'Aplicar conceitos de abstração e generalização',
    knowledgeObjectId: 'abstracao',
    schoolYears: ['4ano']
  },
  {
    id: 'ef05ci01',
    code: 'EF05CI01',
    description: 'Desenvolver algoritmos para resolver problemas complexos',
    knowledgeObjectId: 'algoritmos',
    schoolYears: ['5ano']
  },
  {
    id: 'ef06ci01',
    code: 'EF06CI01',
    description: 'Programar usando linguagens visuais',
    knowledgeObjectId: 'programacao-visual',
    schoolYears: ['6ano']
  },
  {
    id: 'ef07ci01',
    code: 'EF07CI01',
    description: 'Desenvolver projetos de robótica educacional',
    knowledgeObjectId: 'construcao-robotica',
    schoolYears: ['7ano']
  },
  {
    id: 'ef08ci01',
    code: 'EF08CI01',
    description: 'Aplicar princípios de segurança digital',
    knowledgeObjectId: 'seguranca-digital',
    schoolYears: ['8ano']
  },
  {
    id: 'ef09ci01',
    code: 'EF09CI01',
    description: 'Colaborar em projetos digitais complexos',
    knowledgeObjectId: 'colaboracao-digital',
    schoolYears: ['9ano']
  }
];

// Atividades Plugadas e Desplugadas
export const activities: Activity[] = [
  // Atividades Desplugadas
  {
    id: 'atv001',
    title: 'Sequência de Ações - Brincadeiras',
    description: 'Atividade desplugada para ensinar sequências através de brincadeiras',
    type: 'desplugada',
    schoolYears: ['1ano', '2ano'],
    axisId: 'pensamento-computacional',
    knowledgeObjectId: 'algoritmos',
    skillIds: ['ef01ci01', 'ef02ci01'],
    duration: 45,
    difficulty: 'facil',
    materials: ['Cartões com ações', 'Cronômetro', 'Espaço amplo'],
    objectives: [
      'Identificar sequências de ações',
      'Desenvolver raciocínio lógico',
      'Trabalhar em equipe'
    ],
    thumbnail_url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=225&fit=crop&crop=center',
    document_url: '/pdf/PDF_Exemplo.pdf',
    created_at: new Date().toISOString()
  },
  {
    id: 'atv002',
    title: 'Decomposição de Problemas - Quebra-cabeça',
    description: 'Ensinar decomposição através de quebra-cabeças e jogos',
    type: 'desplugada',
    schoolYears: ['3ano', '4ano'],
    axisId: 'pensamento-computacional',
    knowledgeObjectId: 'decomposicao',
    skillIds: ['ef03ci01', 'ef04ci01'],
    duration: 60,
    difficulty: 'medio',
    materials: ['Quebra-cabeças', 'Papel e lápis', 'Cartões de problemas'],
    objectives: [
      'Quebrar problemas em partes menores',
      'Desenvolver estratégias de resolução',
      'Aplicar pensamento sistemático'
    ],
    thumbnail_url: 'https://images.unsplash.com/photo-1596496050827-8299e0220de1?w=400&h=225&fit=crop&crop=center',
    document_url: '/pdf/PDF_Exemplo.pdf',
    created_at: new Date().toISOString()
  },
  
  // Atividades Plugadas
  {
    id: 'atv003',
    title: 'Programação com Scratch Jr',
    description: 'Introdução à programação visual para crianças',
    type: 'plugada',
    schoolYears: ['1ano', '2ano', '3ano'],
    axisId: 'pensamento-computacional',
    knowledgeObjectId: 'programacao-visual',
    skillIds: ['ef01ci01', 'ef02ci01', 'ef03ci01'],
    duration: 90,
    difficulty: 'facil',
    materials: ['Tablets', 'Aplicativo Scratch Jr', 'Projetor'],
    objectives: [
      'Introduzir conceitos de programação',
      'Desenvolver criatividade',
      'Trabalhar com sequências lógicas'
    ],
    thumbnail_url: 'https://images.unsplash.com/photo-1596496050827-8299e0220de1?w=400&h=225&fit=crop&crop=center',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    document_url: '/pdf/PDF_Exemplo.pdf',
    created_at: new Date().toISOString()
  },
  {
    id: 'atv004',
    title: 'Robótica com LEGO WeDo',
    description: 'Construção e programação de robôs com LEGO',
    type: 'plugada',
    schoolYears: ['4ano', '5ano', '6ano'],
    axisId: 'mundo-digital',
    knowledgeObjectId: 'robotica-educacional',
    skillIds: ['ef04ci01', 'ef05ci01', 'ef06ci01'],
    duration: 120,
    difficulty: 'medio',
    materials: ['Kits LEGO WeDo', 'Computadores', 'Software LEGO'],
    objectives: [
      'Construir robôs funcionais',
      'Programar comportamentos',
      'Aplicar conceitos de engenharia'
    ],
    thumbnail_url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=225&fit=crop&crop=center',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    document_url: '/pdf/PDF_Exemplo.pdf',
    created_at: new Date().toISOString()
  },
  {
    id: 'atv005',
    title: 'Segurança Digital - Cidadania Online',
    description: 'Ensinar sobre segurança e ética no uso da internet',
    type: 'plugada',
    schoolYears: ['6ano', '7ano', '8ano', '9ano'],
    axisId: 'cultura-digital',
    knowledgeObjectId: 'seguranca-digital',
    skillIds: ['ef06ci01', 'ef07ci01', 'ef08ci01', 'ef09ci01'],
    duration: 75,
    difficulty: 'medio',
    materials: ['Computadores', 'Apresentação interativa', 'Casos práticos'],
    objectives: [
      'Identificar riscos online',
      'Desenvolver comportamento ético',
      'Proteger dados pessoais'
    ],
    thumbnail_url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=225&fit=crop&crop=center',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    document_url: '/pdf/PDF_Exemplo.pdf',
    created_at: new Date().toISOString()
  }
];

// Cursos de vídeo organizados por anos
export const videoCourses: VideoCourse[] = [
  {
    id: 'curso001',
    title: 'Pensamento Computacional - Anos Iniciais',
    description: 'Fundamentos do pensamento computacional para 1º ao 5º ano',
    thumbnail_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop&crop=center',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    duration: 1800,
    schoolYears: ['1ano', '2ano', '3ano', '4ano', '5ano'],
    activities: ['atv001', 'atv002', 'atv003'],
    created_at: new Date().toISOString()
  },
  {
    id: 'curso002',
    title: 'Mundo Digital - Anos Finais',
    description: 'Introdução à robótica para 6º ao 9º ano',
    thumbnail_url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=225&fit=crop&crop=center',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    duration: 2400,
    schoolYears: ['6ano', '7ano', '8ano', '9ano'],
    activities: ['atv004', 'atv005'],
    created_at: new Date().toISOString()
  },
  {
    id: 'curso003',
    title: 'Cultura Digital e Segurança',
    description: 'Cidadania digital e segurança online',
    thumbnail_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=225&fit=crop&crop=center',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    duration: 2100,
    schoolYears: ['4ano', '5ano', '6ano', '7ano', '8ano', '9ano'],
    activities: ['atv005'],
    created_at: new Date().toISOString()
  }
];

// Documentos organizados por anos
export const documents: Document[] = [
  {
    id: 'doc001',
    title: 'Guia BNCC - Pensamento Computacional',
    description: 'Diretrizes oficiais para implementar pensamento computacional',
    file_url: '/pdf/PDF_Exemplo.pdf',
    file_type: 'pdf',
    schoolYears: ['1ano', '2ano', '3ano', '4ano', '5ano', '6ano', '7ano', '8ano', '9ano'],
    activities: ['atv001', 'atv002'],
    created_at: new Date().toISOString()
  },
  {
    id: 'doc002',
    title: 'Atividades Desplugadas - Anos Iniciais',
    description: 'Coleção de atividades sem uso de tecnologia',
    file_url: '/pdf/PDF_Exemplo.pdf',
    file_type: 'pdf',
    schoolYears: ['1ano', '2ano', '3ano', '4ano', '5ano'],
    activities: ['atv001', 'atv002'],
    created_at: new Date().toISOString()
  },
  {
    id: 'doc003',
    title: 'Manual Scratch Jr - Educação Infantil',
    description: 'Guia completo para usar Scratch Jr com crianças pequenas',
    file_url: '/pdf/PDF_Exemplo.pdf',
    file_type: 'pdf',
    schoolYears: ['ei', '1ano', '2ano'],
    activities: ['atv003'],
    created_at: new Date().toISOString()
  },
  {
    id: 'doc004',
    title: 'Robótica LEGO - Anos Finais',
    description: 'Manual para implementar robótica com LEGO WeDo',
    file_url: '/pdf/PDF_Exemplo.pdf',
    file_type: 'pdf',
    schoolYears: ['4ano', '5ano', '6ano', '7ano', '8ano', '9ano'],
    activities: ['atv004'],
    created_at: new Date().toISOString()
  },
  {
    id: 'doc005',
    title: 'Segurança Digital - Guia do Professor',
    description: 'Orientações para ensinar segurança digital',
    file_url: '/pdf/PDF_Exemplo.pdf',
    file_type: 'pdf',
    schoolYears: ['6ano', '7ano', '8ano', '9ano'],
    activities: ['atv005'],
    created_at: new Date().toISOString()
  }
];

// Usuários fictícios para teste
export const users: User[] = [
  {
    id: 'admin001',
    name: 'Raphael Silva de Vasconcelos',
    email: 'admin@plataformabncc.com',
    role: 'admin',
    school: 'Sistema Educacional BNCC',
    subjects: ['Administração', 'Gestão Educacional'],
    created_at: new Date('2024-01-15').toISOString(),
    last_login: new Date().toISOString(),
    is_active: true
  },
  {
    id: 'prof001',
    name: 'João Carlos Oliveira',
    email: 'joao.oliveira@escola.com',
    role: 'professor',
    school: 'Escola Municipal São José',
    subjects: ['Matemática', 'Ciências', 'Pensamento Computacional'],
    created_at: new Date('2024-02-01').toISOString(),
    last_login: new Date(Date.now() - 86400000).toISOString(), // 1 dia atrás
    is_active: true
  },
  {
    id: 'prof002',
    name: 'Ana Beatriz Costa',
    email: 'ana.costa@escola.com',
    role: 'professor',
    school: 'Colégio Estadual Dom Pedro II',
    subjects: ['Português', 'História', 'Cultura Digital'],
    created_at: new Date('2024-02-10').toISOString(),
    last_login: new Date(Date.now() - 172800000).toISOString(), // 2 dias atrás
    is_active: true
  },
  {
    id: 'prof003',
    name: 'Pedro Henrique Lima',
    email: 'pedro.lima@escola.com',
    role: 'professor',
    school: 'Escola Municipal São José',
    subjects: ['Educação Física', 'Robótica', 'Mundo Digital'],
    created_at: new Date('2024-02-15').toISOString(),
    last_login: new Date(Date.now() - 259200000).toISOString(), // 3 dias atrás
    is_active: true
  },
  {
    id: 'prof004',
    name: 'Carla Regina Mendes',
    email: 'carla.mendes@escola.com',
    role: 'professor',
    school: 'Colégio Estadual Dom Pedro II',
    subjects: ['Artes', 'Educação Infantil', 'Pensamento Computacional'],
    created_at: new Date('2024-02-20').toISOString(),
    last_login: new Date(Date.now() - 345600000).toISOString(), // 4 dias atrás
    is_active: true
  },
  {
    id: 'prof005',
    name: 'Roberto Alves Pereira',
    email: 'roberto.pereira@escola.com',
    role: 'professor',
    school: 'Escola Municipal São José',
    subjects: ['Geografia', 'Ciências', 'Segurança Digital'],
    created_at: new Date('2024-02-25').toISOString(),
    last_login: new Date(Date.now() - 432000000).toISOString(), // 5 dias atrás
    is_active: false // Usuário inativo para teste
  }
];

// Credenciais de login fictícias (em produção, isso seria criptografado)
export const loginCredentials = {
  'admin@plataformabncc.com': 'admin123',
  'joao.oliveira@escola.com': 'prof123',
  'ana.costa@escola.com': 'prof123',
  'pedro.lima@escola.com': 'prof123',
  'carla.mendes@escola.com': 'prof123',
  'roberto.pereira@escola.com': 'prof123'
};
