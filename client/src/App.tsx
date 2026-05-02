import { AppStoreProvider, useAppStore } from './store/useAppStore';
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { MeetingParser } from './pages/MeetingParser';
import { TeamPulse } from './pages/TeamPulse';
import { WorkflowAnalytics } from './pages/WorkflowAnalytics';
import { LandingDemo } from './pages/LandingDemo';
import { BlockersPage } from './pages/BlockersPage';
import { Login } from './pages/Login';
import { AICommandPalette } from './components/ui/AICommandPalette';
import { TeamHealthReportModal } from './components/ui/TeamHealthModal';
import { BlockerNotifications } from './components/ui/BlockerNotifications';
import { OnboardingWalkthrough } from './components/ui/OnboardingWalkthrough';

function AppInner() {
  const { activePage, user } = useAppStore();

  if (!user) {
    return <Login />;
  }

  const renderPage = () => {
    switch (activePage) {
      case 'Mission Control': return <Dashboard />;
      case 'Meeting Parser':  return <MeetingParser />;
      case 'Team Pulse':      return <TeamPulse />;
      case 'Analytics':       return <WorkflowAnalytics />;
      case 'Blockers':        return <BlockersPage />;
      default:                return <LandingDemo />;
    }
  };

  const isLanding = activePage === 'landing';

  return (
    <div className="flex bg-background min-h-screen text-foreground selection:bg-accent-primary/30">
      {!isLanding && <Sidebar />}
      <main className="flex-1 overflow-hidden min-w-0">
        {renderPage()}
      </main>

      {/* Global Premium Features */}
      <AICommandPalette />
      <TeamHealthReportModal />
      <OnboardingWalkthrough />
      <BlockerNotifications />
    </div>
  );
}

function App() {
  return (
    <AppStoreProvider>
      <AppInner />
    </AppStoreProvider>
  );
}

export default App;
