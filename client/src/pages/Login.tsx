import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { authService } from '../services/firebase/auth';
import { useAppStore } from '../store/useAppStore';

export const Login = () => {
  const { setUser } = useAppStore();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsAuthenticating(true);
    try {
      const user = await authService.signInWithGoogle();
      setUser(user);
    } catch (error) {
      console.error('Google Sign-In failed', error);
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
      {/* Ambient backgrounds representing Google/Cloud feel */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10 px-4"
      >
        <div className="glass-card rounded-[2.5rem] p-10 border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Subtle top accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-rose-500" />
          
          <div className="flex flex-col items-center text-center mb-10">
            <div className="p-4 rounded-2xl bg-white/5 inline-flex mb-6 border border-white/10">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-black text-white mb-2">SyncSphere <span className="text-gradient">AI</span></h1>
            <p className="text-sm font-medium text-white/50">Mission Intelligence Platform</p>
          </div>

          <div className="space-y-4">
            <button 
              onClick={handleGoogleSignIn}
              disabled={isAuthenticating}
              className="w-full relative flex items-center justify-center gap-3 py-4 rounded-2xl bg-white text-black font-bold text-sm hover:bg-white/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed group overflow-hidden"
            >
              {isAuthenticating ? (
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  Authenticating with Google...
                </div>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Continue with Google
                  <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all absolute right-6" />
                </>
              )}
            </button>
            <p className="text-center text-xs font-bold text-white/30 uppercase tracking-widest pt-4">
              Powered by Google Cloud & Firebase
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
