import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Waveform, Zap, Check } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

const simulatedPhrases = [
  "Schedule follow-up call with design team by Friday",
  "Review API documentation and update Swagger spec",
  "Fix mobile responsive layout on settings page",
  "Set up monitoring alerts for production database",
];

type Stage = 'idle' | 'recording' | 'processing' | 'done';

export const VoiceNoteWidget = ({ onClose }: { onClose: () => void }) => {
  const { addVoiceTask } = useAppStore();
  const [stage, setStage] = useState<Stage>('idle');
  const [transcript, setTranscript] = useState('');
  const [bars] = useState(() => Array.from({ length: 20 }, () => Math.random() * 0.6 + 0.2));
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startRecording = () => {
    setStage('recording');
    timerRef.current = setTimeout(() => {
      setStage('processing');
      const phrase = simulatedPhrases[Math.floor(Math.random() * simulatedPhrases.length)];
      setTimeout(() => {
        setTranscript(phrase);
        setStage('done');
      }, 1500);
    }, 3000);
  };

  const confirmTask = () => {
    if (transcript) { addVoiceTask(transcript); onClose(); }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="glass rounded-3xl p-6 w-80 border border-white/10 shadow-2xl"
    >
      <h3 className="text-base font-black mb-4">Voice → Task</h3>

      <div className="flex flex-col items-center gap-4">
        {/* Visualizer */}
        <div className="relative">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
            stage === 'recording' ? 'accent-gradient shadow-lg glow-primary' :
            stage === 'processing' ? 'bg-amber-500/20 border border-amber-500/40' :
            stage === 'done' ? 'bg-emerald-500/20 border border-emerald-500/40' :
            'bg-white/5 border border-white/10'
          }`}>
            {stage === 'recording' && <Mic className="w-8 h-8 text-white" />}
            {stage === 'processing' && <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
              <Zap className="w-8 h-8 text-amber-400" />
            </motion.div>}
            {stage === 'done' && <Check className="w-8 h-8 text-emerald-400" />}
            {stage === 'idle' && <Mic className="w-8 h-8 text-white/40" />}
          </div>
          {stage === 'recording' && (
            <div className="absolute inset-0 rounded-full border-2 border-accent-primary animate-ping opacity-50" />
          )}
        </div>

        {/* Waveform */}
        {stage === 'recording' && (
          <div className="flex items-center gap-0.5 h-8">
            {bars.map((h, i) => (
              <motion.div key={i}
                animate={{ scaleY: [h, h + 0.6, h] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05, ease: 'easeInOut' }}
                className="w-1 rounded-full accent-gradient"
                style={{ height: `${h * 100}%` }}
              />
            ))}
          </div>
        )}

        {/* Status Text */}
        <p className="text-sm text-white/60 font-medium text-center">
          {stage === 'idle' && 'Tap to record your task'}
          {stage === 'recording' && 'Listening... speak your task clearly'}
          {stage === 'processing' && 'AI is parsing your note...'}
          {stage === 'done' && 'Task extracted successfully!'}
        </p>

        {/* Transcript */}
        <AnimatePresence>
          {transcript && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="w-full">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xs text-white/40 font-bold uppercase tracking-wide mb-1">Extracted Task</p>
                <p className="text-sm font-semibold text-white">{transcript}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="w-full flex gap-2">
          {stage === 'idle' && (
            <button onClick={startRecording}
              className="flex-1 py-3 rounded-2xl accent-gradient font-black text-sm text-white glow-primary hover:opacity-90 transition-all">
              Start Recording
            </button>
          )}
          {stage === 'done' && (<>
            <button onClick={confirmTask}
              className="flex-1 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 font-black text-sm text-white transition-all">
              Add to Tasks
            </button>
            <button onClick={onClose} className="px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-sm font-bold text-white/60 transition-all">
              Cancel
            </button>
          </>)}
        </div>
      </div>
    </motion.div>
  );
};
