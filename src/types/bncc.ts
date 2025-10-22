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

// Tipos para sistema de usuários e autenticação
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'professor';
  school?: string;
  subjects?: string[];
  created_at: string;
  last_login?: string;
  is_active: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'professor';
  school?: string;
  subjects?: string[];
}

// Tipos para sistema de logs e analytics
export interface UserActivityLog {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  activity: 'login' | 'logout' | 'view_activity' | 'view_document' | 'view_video' | 'download' | 'search' | 'filter';
  resourceType?: 'activity' | 'document' | 'video' | 'page';
  resourceId?: string;
  resourceTitle?: string;
  details?: string;
  timestamp: string;
  sessionId: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface UserSession {
  id: string;
  userId: string;
  startTime: string;
  endTime?: string;
  duration?: number; // em minutos
  activitiesCount: number;
  pagesVisited: string[];
  lastActivity: string;
}

export interface UserAnalytics {
  userId: string;
  userName: string;
  userEmail: string;
  totalSessions: number;
  totalTimeSpent: number; // em minutos
  totalActivities: number;
  totalDocuments: number;
  totalVideos: number;
  lastLogin: string;
  averageSessionDuration: number;
  mostViewedActivities: string[];
  mostViewedDocuments: string[];
  loginFrequency: number; // logins por semana
  activityFrequency: number; // atividades por dia
}

// Tipos para sistema de comunidade
export interface CommunityPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  title: string;
  content: string;
  type: 'activity' | 'question' | 'tip' | 'experience' | 'resource';
  tags: string[];
  attachments?: {
    type: 'image' | 'document' | 'link';
    url: string;
    name: string;
  }[];
  likes: number;
  comments: number;
  views: number;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CommunityComment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

export interface CommunityActivity {
  id: string;
  title: string;
  description: string;
  authorId: string;
  authorName: string;
  schoolYear: string[];
  subjects: string[];
  objectives: string[];
  materials: string[];
  instructions: string;
  tips: string;
  difficulty: 'facil' | 'medio' | 'dificil';
  duration: number; // em minutos
  tags: string[];
  likes: number;
  downloads: number;
  createdAt: string;
  updatedAt: string;
}