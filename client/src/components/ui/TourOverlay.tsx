import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Card } from '../common';

interface TourStep {
  title: string;
  text: string;
}

export const TourOverlay = ({ step, isTouring }: { step: TourStep, isTouring: boolean }) => {
  return (
    <AnimatePresence>
      {isTouring && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[200] w-full max-w-lg px-6"
        >
          <Card className="bg-black/80 backdrop-blur-2xl border-accent-primary/30 p-6 shadow-[0_0_50px_rgba(99,102,241,0.3)]">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl accent-gradient shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-black text-white uppercase tracking-widest">Platform Tour</h4>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent-primary animate-ping" />
                    <span className="text-[10px] font-black text-accent-primary uppercase">Active</span>
                  </div>
                </div>
                <h3 className="text-xl font-black text-white mb-2">{step.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed font-medium">
                  {step.text}
                </p>
                <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 3.5, ease: 'linear' }}
                    className="h-full accent-gradient" 
                  />
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
