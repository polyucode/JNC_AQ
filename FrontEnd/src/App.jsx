
import { AppTheme } from './theme';
import { AppRouter } from './router/AppRouter';
import { AuthProvider } from './context/AuthContext';
import { DashboardProvider } from './context/DashboardContext';

export default function App() {

  return (
    <>
    <AppTheme>
      <AuthProvider>
        <DashboardProvider>
          <AppRouter />
        </DashboardProvider>
      </AuthProvider>
    </AppTheme>
    </>
  );
}


