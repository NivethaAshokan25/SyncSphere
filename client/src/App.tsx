import { Suspense, lazy } from 'react';
import { AppStoreProvider, useAppStore } from './store/useAppStore';
import { Sidebar } from './components/layout/Sidebar';
import { AICommandPalette } from './components/ui/AICommandPalette';
import { TeamHealthReportModal } from './components/ui/TeamHealthModal';
import { BlockerNotifications } from './components/ui/BlockerNotifications';
import { OnboardingWalkthrough } from './components/ui/OnboardingWalkthrough';
import { ProtectedLayout } from './components/layout/ProtectedLayout';
import { ErrorBoundary, LoadingFallback } from './components/common/Feedback';
import { TourOverlay } from './components/ui/TourOverlay';
import { useDemoTour } from './hooks/useDemoTour';

// Lazy loaded components for production optimization
const Dashboard = lazy(() => import('./pages/Dashboard').then(m => ({ default: m.Dashboard })));
const MeetingParser = lazy(() => import('./pages/MeetingParser').then(m => ({ default: m.MeetingParser })));
const TeamPulse = lazy(() => import('./pages/TeamPulse').then(m => ({ default: m.TeamPulse })));
const WorkflowAnalytics = lazy(() => import('./pages/WorkflowAnalytics').then(m => ({ default: m.WorkflowAnalytics })));
const LandingDemo = lazy(() => import('./pages/LandingDemo').then(m => ({ default: m.LandingDemo })));
const BlockersPage = lazy(() => import('./pages/BlockersPage').then(m => ({ default: m.BlockersPage })));
const Login = lazy(() => import('./pages/Login').then(m => ({ default: m.Login })));

function AppInner() {
  const { activePage, user } = useAppStore();
  const { isTouring, currentStep, startTour } = useDemoTour();

  if (!user) {
    return (
      <Suspense fallback={<LoadingFallback />}>
        <Login />
      </Suspense>
    );
  }

  const renderPage = () => {
    switch (activePage) {
      case 'Mission Control': return <Dashboard onStartTour={startTour} />;
      case 'Meeting Parser':  return <MeetingParser />;
      case 'Team Pulse':      return <TeamPulse />;
      case 'Analytics':       return <WorkflowAnalytics />;
      case 'Blockers':        return <BlockersPage />;
      default:                return <LandingDemo />;
    }
  };

  const isLanding = activePage === 'landing';

  return (
    <ErrorBoundary>
      <ProtectedLayout>
        <div className="flex bg-background min-h-screen text-foreground selection:bg-accent-primary/30">
          {!isLanding && <Sidebar />}
          <main id="main-content" className="flex-1 overflow-hidden min-w-0" role="main" aria-label="Page Content">
            <Suspense fallback={<LoadingFallback />}>
              {renderPage()}
            </Suspense>
          </main>

          {/* Global Premium Features */}
          <AICommandPalette />
          <TeamHealthReportModal />
          <OnboardingWalkthrough />
          <BlockerNotifications />
          <TourOverlay step={currentStep} isTouring={isTouring} />
        </div>
      </ProtectedLayout>
    </ErrorBoundary>
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
