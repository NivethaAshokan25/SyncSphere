import { Suspense, lazy } from 'react';
import { AppStoreProvider, useAppStore } from './store/useAppStore';
import { Sidebar } from './components/layout/Sidebar';
import { AICommandPalette } from './components/ui/AICommandPalette';
import { TeamHealthReportModal } from './components/ui/TeamHealthModal';
import { BlockerNotifications } from './components/ui/BlockerNotifications';
import { OnboardingWalkthrough } from './components/ui/OnboardingWalkthrough';
import { ProtectedLayout } from './components/layout/ProtectedLayout';

// Lazy loaded components for production optimization
const Dashboard = lazy(() => import('./pages/Dashboard').then(m => ({ default: m.Dashboard })));
const MeetingParser = lazy(() => import('./pages/MeetingParser').then(m => ({ default: m.MeetingParser })));
const TeamPulse = lazy(() => import('./pages/TeamPulse').then(m => ({ default: m.TeamPulse })));
const WorkflowAnalytics = lazy(() => import('./pages/WorkflowAnalytics').then(m => ({ default: m.WorkflowAnalytics })));
const LandingDemo = lazy(() => import('./pages/LandingDemo').then(m => ({ default: m.LandingDemo })));
const BlockersPage = lazy(() => import('./pages/BlockersPage').then(m => ({ default: m.BlockersPage })));
const Login = lazy(() => import('./pages/Login').then(m => ({ default: m.Login })));

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="flex-1 h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-4 border-accent-primary/20 border-t-accent-primary rounded-full animate-spin" />
      <p className="text-xs font-black text-white/40 uppercase tracking-widest animate-pulse">Syncing Sphere...</p>
    </div>
  </div>
);

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
    <ProtectedLayout>
      <div className="flex bg-background min-h-screen text-foreground selection:bg-accent-primary/30">
        {!isLanding && <Sidebar />}
        <main id="main-content" className="flex-1 overflow-hidden min-w-0" role="main" aria-label="Page Content">
          <Suspense fallback={<PageLoader />}>
            {renderPage()}
          </Suspense>
        </main>

        {/* Global Premium Features */}
        <AICommandPalette />
        <TeamHealthReportModal />
        <OnboardingWalkthrough />
        <BlockerNotifications />
      </div>
    </ProtectedLayout>
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
