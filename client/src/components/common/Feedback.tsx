import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';
import { Button, Card } from './index';

/**
 * Premium Loading Fallback with animated skeletons
 */
export const LoadingFallback = () => (
  <div className="flex-1 h-screen flex items-center justify-center bg-background p-8">
    <div className="w-full max-w-4xl space-y-8 animate-pulse">
      <div className="flex justify-between items-end">
        <div className="space-y-3">
          <div className="h-10 w-64 bg-white/5 rounded-2xl" />
          <div className="h-4 w-96 bg-white/5 rounded-lg" />
        </div>
        <div className="h-12 w-32 bg-white/5 rounded-xl" />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-white/5 rounded-2xl" />)}
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 h-96 bg-white/5 rounded-[32px]" />
        <div className="h-96 bg-white/5 rounded-[32px]" />
      </div>
    </div>
  </div>
);

/**
 * Centralized Error Boundary
 */
interface Props { children: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

export class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false, error: null };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[CRITICAL UI ERROR]', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex-1 h-screen flex items-center justify-center bg-background p-8">
          <Card className="max-w-md p-8 text-center border-rose-500/20 bg-rose-500/5">
            <div className="w-16 h-16 bg-rose-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-rose-500" />
            </div>
            <h2 className="text-xl font-black text-white mb-2">Something went wrong</h2>
            <p className="text-sm text-white/40 mb-8">
              {this.state.error?.message || "An unexpected error occurred while rendering the dashboard."}
            </p>
            <Button 
              variant="secondary" 
              onClick={() => window.location.reload()}
              icon={RefreshCcw}
            >
              Reload Platform
            </Button>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
