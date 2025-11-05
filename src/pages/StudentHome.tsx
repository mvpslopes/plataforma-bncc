import React, { useState } from 'react';
import { useAuth } from '../contexts/LocalAuthContext';
import { DashboardHeader } from '../components/DashboardHeader';
import { SequencingGame } from '../games/SequencingGame';
import { PatternGame } from '../games/PatternGame';
import { DebuggingGame } from '../games/DebuggingGame';
import { LogOut, User, Gamepad2, Trophy, BookOpen } from 'lucide-react';

interface StudentHomeProps {}

export default function StudentHome(_props: StudentHomeProps) {
  const { user, signOut } = useAuth();
  const [currentPage, setCurrentPage] = useState<'games' | 'progress' | 'profile'>('games');
  const [currentGame, setCurrentGame] = useState<'sequencing' | 'pattern' | 'debugging'>('sequencing');

  if (!user) return null;

  const getRoleIcon = (role: string) => {
    return <User className="h-4 w-4" />;
  };

  const getRoleLabel = (role: string) => {
    return 'Aluno';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-16 overflow-y-auto">
          <div className="p-6 flex flex-col min-h-full">
            <div className="mb-8 p-4 rounded-lg bg-purple-50">
              <p className="text-sm text-gray-600 mb-1">Bem-vindo(a),</p>
              <p className="font-semibold text-gray-900">{user.name}</p>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => setCurrentPage('games')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  currentPage === 'games'
                    ? 'text-white bg-purple-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Gamepad2 className="w-5 h-5" />
                <span className="font-medium">Jogos</span>
              </button>
              
              <button
                onClick={() => setCurrentPage('progress')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  currentPage === 'progress'
                    ? 'text-white bg-purple-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Trophy className="w-5 h-5" />
                <span className="font-medium">Meu Progresso</span>
              </button>
              
              <button
                onClick={() => setCurrentPage('profile')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  currentPage === 'profile'
                    ? 'text-white bg-purple-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <User className="w-5 h-5" />
                <span className="font-medium">Perfil</span>
              </button>
            </nav>

            {/* Botão Sair */}
            <div className="mt-auto pt-6">
              <button
                onClick={signOut}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sair</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="ml-64 flex-1 p-8 pt-8">
          {currentPage === 'games' && (
            <div>
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Jogos Educacionais</h1>
                <p className="text-gray-600">Aprenda pensamento computacional de forma divertida!</p>
              </div>

              {/* Game Card */}
              {/* Selector */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <button
                  onClick={() => setCurrentGame('sequencing')}
                  className={`text-left bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition ${currentGame === 'sequencing' ? 'ring-2 ring-purple-500' : ''}`}
                >
                  <div className="flex items-center gap-3 mb-1">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Gamepad2 className="h-5 w-5" style={{ color: '#7c3aed' }} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Sequenciamento</h3>
                  </div>
                  <p className="text-sm text-gray-600">Ordene passos de um algoritmo</p>
                </button>

                <button
                  onClick={() => setCurrentGame('pattern')}
                  className={`text-left bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition ${currentGame === 'pattern' ? 'ring-2 ring-purple-500' : ''}`}
                >
                  <div className="flex items-center gap-3 mb-1">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Gamepad2 className="h-5 w-5" style={{ color: '#7c3aed' }} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Padrões</h3>
                  </div>
                  <p className="text-sm text-gray-600">Complete a sequência correta</p>
                </button>

                <button
                  onClick={() => setCurrentGame('debugging')}
                  className={`text-left bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition ${currentGame === 'debugging' ? 'ring-2 ring-purple-500' : ''}`}
                >
                  <div className="flex items-center gap-3 mb-1">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Gamepad2 className="h-5 w-5" style={{ color: '#7c3aed' }} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Depuração</h3>
                  </div>
                  <p className="text-sm text-gray-600">Encontre o passo incorreto</p>
                </button>
              </div>

              {/* Game Display */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                {currentGame === 'sequencing' && <SequencingGame userId={user.id} />}
                {currentGame === 'pattern' && <PatternGame userId={user.id} />}
                {currentGame === 'debugging' && <DebuggingGame userId={user.id} />}
              </div>
            </div>
          )}

          {currentPage === 'progress' && (
            <div>
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Meu Progresso</h1>
                <p className="text-gray-600">Acompanhe seu desempenho nos jogos</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="text-center py-12">
                  <Trophy className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Seu progresso aparecerá aqui em breve</p>
                </div>
              </div>
            </div>
          )}

          {currentPage === 'profile' && (
            <div>
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Meu Perfil</h1>
                <p className="text-gray-600">Informações da sua conta</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                    <p className="text-gray-900">{user.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Escola</label>
                    <p className="text-gray-900">{user.school || 'Não informado'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Perfil</label>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                      <User className="h-3 w-3" />
                      Aluno
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
