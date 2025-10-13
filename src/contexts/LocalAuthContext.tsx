import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  SchoolYear, 
  BNCCAxis, 
  KnowledgeObject, 
  Skill, 
  Activity, 
  VideoCourse, 
  Document 
} from '../types/bncc';
import { 
  schoolYears, 
  bnccAxes, 
  knowledgeObjects, 
  skills, 
  activities, 
  videoCourses, 
  documents 
} from '../data/bnccData';

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  bio?: string;
  school?: string;
  created_at: string;
  updated_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  video_id: string;
  completed: boolean;
  last_watched_at: string;
}

interface AuthContextType {
  user: Profile | null;
  profile: Profile | null;
  session: { user: Profile } | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: Error | null }>;
  
  // BNCC Data
  getSchoolYears: () => SchoolYear[];
  getBNCCAxes: () => BNCCAxis[];
  getKnowledgeObjects: () => KnowledgeObject[];
  getSkills: () => Skill[];
  getActivities: () => Activity[];
  getVideoCourses: () => VideoCourse[];
  getDocuments: () => Document[];
  
  // Filtered data
  getActivitiesByYear: (yearId: string) => Activity[];
  getActivitiesByType: (type: 'plugada' | 'desplugada') => Activity[];
  getActivitiesByAxis: (axisId: string) => Activity[];
  getVideoCoursesByYear: (yearId: string) => VideoCourse[];
  getDocumentsByYear: (yearId: string) => Document[];
  
  // User progress
  getUserProgress: (userId: string) => UserProgress[];
  updateUserProgress: (userId: string, videoId: string, completed: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Dados BNCC já importados do arquivo bnccData.ts

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<{ user: Profile } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Criar usuário de teste se não existir
    const users = JSON.parse(localStorage.getItem('plataforma-bncc-users') || '[]');
    if (users.length === 0) {
      const testUser = {
        id: '1',
        full_name: 'Usuário Teste',
        email: 'teste@exemplo.com',
        password: '123456',
        bio: 'Professor interessado em tecnologia educacional',
        school: 'Escola Municipal de Ensino Fundamental',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      users.push(testUser);
      localStorage.setItem('plataforma-bncc-users', JSON.stringify(users));
    }

    // Verificar se há usuário logado no localStorage
    const savedUser = localStorage.getItem('plataforma-bncc-user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setProfile(userData);
      setSession({ user: userData });
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // Simular verificação de credenciais
      const users = JSON.parse(localStorage.getItem('plataforma-bncc-users') || '[]');
      const foundUser = users.find((u: any) => u.email === email && u.password === password);
      
      if (!foundUser) {
        return { error: new Error('Email ou senha incorretos') };
      }

      // Remover senha dos dados do usuário
      const { password: _, ...userData } = foundUser;
      
      setUser(userData);
      setProfile(userData);
      setSession({ user: userData });
      
      // Salvar no localStorage
      localStorage.setItem('plataforma-bncc-user', JSON.stringify(userData));
      
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const users = JSON.parse(localStorage.getItem('plataforma-bncc-users') || '[]');
      
      // Verificar se email já existe
      if (users.find((u: any) => u.email === email)) {
        return { error: new Error('Este email já está cadastrado') };
      }

      const newUser: Profile = {
        id: Date.now().toString(),
        full_name: fullName,
        email: email,
        bio: '',
        school: '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Salvar usuário com senha
      const userWithPassword = { ...newUser, password };
      users.push(userWithPassword);
      localStorage.setItem('plataforma-bncc-users', JSON.stringify(users));

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    setUser(null);
    setProfile(null);
    setSession(null);
    localStorage.removeItem('plataforma-bncc-user');
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: new Error('No user logged in') };

    try {
      const updatedProfile = { ...user, ...updates, updated_at: new Date().toISOString() };
      
      setUser(updatedProfile);
      setProfile(updatedProfile);
      setSession({ user: updatedProfile });
      
      localStorage.setItem('plataforma-bncc-user', JSON.stringify(updatedProfile));
      
      // Atualizar também na lista de usuários
      const users = JSON.parse(localStorage.getItem('plataforma-bncc-users') || '[]');
      const userIndex = users.findIndex((u: any) => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updates, updated_at: new Date().toISOString() };
        localStorage.setItem('plataforma-bncc-users', JSON.stringify(users));
      }
      
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  // BNCC Data functions
  const getSchoolYears = () => {
    return schoolYears;
  };

  const getBNCCAxes = () => {
    return bnccAxes;
  };

  const getKnowledgeObjects = () => {
    return knowledgeObjects;
  };

  const getSkills = () => {
    return skills;
  };

  const getActivities = () => {
    return activities;
  };

  const getVideoCourses = () => {
    return videoCourses;
  };

  const getDocuments = () => {
    return documents;
  };

  // Filtered data functions
  const getActivitiesByYear = (yearId: string) => {
    return activities.filter(activity => activity.schoolYears.includes(yearId));
  };

  const getActivitiesByType = (type: 'plugada' | 'desplugada') => {
    return activities.filter(activity => activity.type === type);
  };

  const getActivitiesByAxis = (axisId: string) => {
    return activities.filter(activity => activity.axisId === axisId);
  };

  const getVideoCoursesByYear = (yearId: string) => {
    return videoCourses.filter(course => course.schoolYears.includes(yearId));
  };

  const getDocumentsByYear = (yearId: string) => {
    return documents.filter(doc => doc.schoolYears.includes(yearId));
  };

  const getUserProgress = (userId: string) => {
    const progress = JSON.parse(localStorage.getItem(`plataforma-bncc-progress-${userId}`) || '[]');
    return progress;
  };

  const updateUserProgress = (userId: string, videoId: string, completed: boolean) => {
    const progress = getUserProgress(userId);
    const existingIndex = progress.findIndex((p: UserProgress) => p.video_id === videoId);
    
    const progressItem: UserProgress = {
      id: existingIndex !== -1 ? progress[existingIndex].id : Date.now().toString(),
      user_id: userId,
      video_id: videoId,
      completed,
      last_watched_at: new Date().toISOString(),
    };

    if (existingIndex !== -1) {
      progress[existingIndex] = progressItem;
    } else {
      progress.push(progressItem);
    }

    localStorage.setItem(`plataforma-bncc-progress-${userId}`, JSON.stringify(progress));
  };

  const value = {
    user,
    profile,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    
    // BNCC Data
    getSchoolYears,
    getBNCCAxes,
    getKnowledgeObjects,
    getSkills,
    getActivities,
    getVideoCourses,
    getDocuments,
    
    // Filtered data
    getActivitiesByYear,
    getActivitiesByType,
    getActivitiesByAxis,
    getVideoCoursesByYear,
    getDocumentsByYear,
    
    // User progress
    getUserProgress,
    updateUserProgress,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
