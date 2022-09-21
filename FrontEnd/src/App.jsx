
import { AppTheme } from './theme';
import { AppRouter } from './router/AppRouter';
import { AuthProvider } from './context/AuthContext';

export default function App() {

  return (
    <>
    <AppTheme>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </AppTheme>
    </>
  );
}


