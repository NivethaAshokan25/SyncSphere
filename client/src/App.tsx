import { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { MeetingParser } from './pages/MeetingParser';
import { TeamPulse } from './pages/TeamPulse';
import { WorkflowAnalytics } from './pages/WorkflowAnalytics';

function App() {
  const [activePage, setActivePage] = useState('Mission Control');

  const renderPage = () => {
    switch (activePage) {
      case 'Meeting Parser':
        return <MeetingParser />;
      case 'Team Pulse':
        return <TeamPulse />;
      case 'Analytics':
        return <WorkflowAnalytics />;
      case 'Mission Control':
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex bg-background min-h-screen text-foreground selection:bg-accent-primary/30">
      <Sidebar activePage={activePage} onPageChange={setActivePage} />
      <main className="flex-1 overflow-hidden">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
