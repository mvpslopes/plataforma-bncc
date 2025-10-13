import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/LocalAuthContext';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import { Reports } from './pages/Reports';
import { LoadingScreen } from './components/LoadingScreen';

function AppContent() {
  const [showLogin, setShowLogin] = useState(false);
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'user-management' | 'reports'>('dashboard');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { user, loading } = useAuth();

  if (loading || isLoggingIn) {
    return <LoadingScreen message={isLoggingIn ? "Entrando no sistema..." : "Carregando plataforma BNCC..."} />;
  }

  if (user) {
    // Renderizar página baseada no role e página atual
    if (user.role === 'admin' && currentPage === 'user-management') {
      return (
        <UserManagement 
          onBackToDashboard={() => setCurrentPage('dashboard')}
        />
      );
    }

    if (user.role === 'admin' && currentPage === 'reports') {
      return (
        <Reports 
          onBackToDashboard={() => setCurrentPage('dashboard')}
        />
      );
    }
    
    return (
      <Dashboard 
        onNavigateToUserManagement={() => setCurrentPage('user-management')}
        onNavigateToReports={() => setCurrentPage('reports')}
        userRole={user.role}
      />
    );
  }

  if (showLogin) {
    return (
      <Login
        onBack={() => setShowLogin(false)}
        onSuccess={() => {
          setIsLoggingIn(true);
          setTimeout(() => {
            setIsLoggingIn(false);
            setShowLogin(false);
          }, 2000); // 2 segundos de carregamento
        }}
      />
    );
  }

  return <Home onLoginClick={() => setShowLogin(true)} />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
