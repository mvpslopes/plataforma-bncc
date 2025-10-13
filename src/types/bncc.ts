// Estrutura baseada na BNCC Computacional

export interface SchoolYear {
  id: string;
  name: string;
  level: 'educacao-infantil' | 'anos-iniciais' | 'anos-finais' | 'aee';
  order: number;
  description: string;
}

export interface BNCCAxis {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface KnowledgeObject {
  id: string;
  name: string;
  description: string;
  axisId: string;
  schoolYears: string[];
}

export interface Skill {
  id: string;
  code: string; // Ex: EF01CI01
  description: string;
  knowledgeObjectId: string;
  schoolYears: string[];
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  type: 'plugada' | 'desplugada';
  schoolYears: string[];
  axisId: string;
  knowledgeObjectId: string;
  skillIds: string[];
  duration: number; // em minutos
  difficulty: 'facil' | 'medio' | 'dificil';
  materials: string[];
  objectives: string[];
  thumbnail_url: string;
  video_url?: string;
  document_url?: string;
  created_at: string;
}

export interface VideoCourse {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  video_url: string;
  duration: number;
  schoolYears: string[];
  activities: string[]; // IDs das atividades relacionadas
  created_at: string;
}

export interface Document {
  id: string;
  title: string;
  description: string;
  file_url: string;
  file_type: 'pdf' | 'docx' | 'pptx';
  schoolYears: string[];
  activities: string[]; // IDs das atividades relacionadas
  created_at: string;
}
