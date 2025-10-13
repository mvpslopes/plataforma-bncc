import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/LocalAuthContext';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';

function AppContent() {
  const [showLogin, setShowLogin] = useState(false);
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-sky-600"></div>
      </div>
    );
  }

  if (user) {
    return <Dashboard />;
  }

  if (showLogin) {
    return (
      <Login
        onBack={() => setShowLogin(false)}
        onSuccess={() => setShowLogin(false)}
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
