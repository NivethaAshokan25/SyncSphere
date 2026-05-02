import { useState, useCallback } from 'react';
import { useAppStore } from '../store/useAppStore';

/**
 * useDemoTour: The Automated Product Guide
 * Orchestrates navigation and highlights for a seamless judge walkthrough.
 */
export const useDemoTour = () => {
  const { setActivePage, setShowHealthReport } = useAppStore();
  const [isTouring, setIsTouring] = useState(false);
  const [step, setStep] = useState(0);

  const tourSteps = [
    { title: 'Mission Dashboard', page: 'Mission Control', text: 'Centralized team intelligence with real-time health radar.' },
    { title: 'Meeting Parser', page: 'Meeting Parser', text: 'Transforming raw transcripts into actionable tasks with Google Gemini.' },
    { title: 'Workflow Analytics', page: 'Analytics', text: 'Deep metrics into team velocity and bottleneck detection.' },
    { title: 'Team Pulse', page: 'Team Pulse', text: 'Collaborative timeline feed for full operational transparency.' },
    { title: 'AI Coordinator', page: 'Mission Control', text: 'Our specialized assistant orchestrating daily workflows.' },
    { title: 'Executive Report', page: 'Mission Control', action: () => setShowHealthReport(true), text: 'One-click boardroom-ready project status summaries.' },
  ];

  const startTour = useCallback(async () => {
    setIsTouring(true);
    setStep(0);

    for (let i = 0; i < tourSteps.length; i++) {
      setStep(i);
      const s = tourSteps[i];
      if (s.page) setActivePage(s.page as any);
      if (s.action) s.action();
      
      // Artificial delay for judge to absorb the view
      await new Promise(resolve => setTimeout(resolve, 3500));
    }

    setIsTouring(false);
    setActivePage('Mission Control');
  }, [setActivePage, setShowHealthReport]);

  return { isTouring, currentStep: tourSteps[step], startTour };
};
