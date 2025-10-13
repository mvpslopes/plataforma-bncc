import { motion } from 'framer-motion';
import { BookOpen, Video, FileText, User, LogOut, Activity } from 'lucide-react';
import { useAuth } from '../contexts/LocalAuthContext';

interface SidebarProps {
  currentPage: 'activities' | 'videos' | 'documents' | 'profile';
  onNavigate: (page: 'activities' | 'videos' | 'documents' | 'profile') => void;
}

export const Sidebar = ({ currentPage, onNavigate }: SidebarProps) => {
  const { signOut, profile } = useAuth();

  const menuItems = [
    { id: 'activities' as const, icon: Activity, label: 'Atividades BNCC' },
    { id: 'videos' as const, icon: Video, label: 'Vídeo Aulas' },
    { id: 'documents' as const, icon: FileText, label: 'Documentos' },
    { id: 'profile' as const, icon: User, label: 'Perfil' },
  ];

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="w-64 bg-white border-r border-gray-200 min-h-screen fixed left-0 top-0"
    >
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <BookOpen className="w-8 h-8" style={{ color: '#005a93' }} />
          <span className="text-2xl font-bold text-gray-900">NovaEdu</span>
        </div>

        <div className="mb-8 p-4 rounded-lg" style={{ backgroundColor: '#e6f2ff' }}>
          <p className="text-sm text-gray-600 mb-1">Bem-vindo(a),</p>
          <p className="font-semibold text-gray-900">{profile?.full_name || 'Professor(a)'}</p>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                currentPage === item.id
                  ? 'text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              style={currentPage === item.id ? { backgroundColor: '#005a93' } : {}}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={signOut}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </div>
    </motion.aside>
  );
};
