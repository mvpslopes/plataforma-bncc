import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { DashboardHeader } from '../components/DashboardHeader';
import { VideoCourses } from './VideoCourses';
import { Documents } from './Documents';
import { Profile } from './Profile';
import { Activities } from './Activities';
import { Community } from './Community';
import { Users, Settings, BarChart3 } from 'lucide-react';
import { FloatingAIAssistant } from '../components/FloatingAIAssistant';

interface DashboardProps {
  onNavigateToUserManagement: () => void;
  onNavigateToReports: () => void;
  userRole: 'admin' | 'professor';
}

export const Dashboard = ({ onNavigateToUserManagement, onNavigateToReports, userRole }: DashboardProps) => {
  const [currentPage, setCurrentPage] = useState<'activities' | 'videos' | 'documents' | 'profile' | 'community'>('activities');

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <div className="flex">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />

        <main className="ml-64 flex-1 p-8 pt-24">
        {/* Admin Controls */}
        {userRole === 'admin' && (
          <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Settings className="h-5 w-5" style={{ color: '#044982' }} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Painel Administrativo</h3>
                  <p className="text-sm text-gray-600">Gerencie usuários e configurações do sistema</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={onNavigateToUserManagement}
                  className="flex items-center gap-2 text-white px-4 py-2 rounded-md transition-colors hover:opacity-90"
                  style={{ backgroundColor: '#044982' }}
                >
                  <Users className="h-4 w-4" />
                  Gerenciar Usuários
                </button>
                <button
                  onClick={onNavigateToReports}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  <BarChart3 className="h-4 w-4" />
                  Relatórios
                </button>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'activities' && <Activities />}
        {currentPage === 'videos' && <VideoCourses />}
        {currentPage === 'documents' && <Documents />}
        {currentPage === 'community' && <Community />}
        {currentPage === 'profile' && <Profile />}
      </main>
      </div>

      {/* Assistente de IA Flutuante - Apenas para professores */}
      {userRole === 'professor' && <FloatingAIAssistant />}
    </div>
  );
};
