import { Upload, FileText, Zap, ChevronRight } from 'lucide-react';

export const MeetingParser = () => {
  return (
    <div className="flex-1 p-10 space-y-10 overflow-y-auto h-screen custom-scrollbar bg-[#0a0a0c]">
      <header>
        <h1 className="text-5xl font-black tracking-tight text-gradient mb-3">Meeting Parser</h1>
        <p className="text-muted font-medium">Upload transcripts or audio to extract actionable mission tasks.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="glass p-10 rounded-[2.5rem] flex flex-col items-center justify-center border-dashed border-2 border-white/10 hover:border-accent-primary/50 transition-all cursor-pointer group h-[400px]">
          <div className="p-6 rounded-full bg-accent-primary/10 mb-6 group-hover:scale-110 transition-transform">
            <Upload className="w-10 h-10 text-accent-primary" />
          </div>
          <h3 className="text-2xl font-black mb-2">Drop meeting files here</h3>
          <p className="text-muted font-bold text-sm">Supports MP3, WAV, TXT, and PDF</p>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-black px-2">Recent Extractions</h3>
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass p-6 rounded-3xl flex items-center gap-4 hover:bg-white/5 transition-all cursor-pointer border-white/5">
              <div className="p-3 rounded-2xl bg-white/5 text-muted">
                <FileText className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold">SyncSphere Weekly - May {10+i}</h4>
                <p className="text-xs text-muted font-bold uppercase tracking-widest mt-1">12 tasks extracted • 92% confidence</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted" />
            </div>
          ))}
        </div>
      </div>

      <div className="glass p-10 rounded-[2.5rem]">
        <div className="flex items-center gap-3 mb-8">
          <Zap className="w-6 h-6 text-accent-primary fill-accent-primary" />
          <h3 className="text-2xl font-black">AI Analysis Engine</h3>
        </div>
        <div className="bg-white/5 rounded-3xl p-8 border border-white/5 font-mono text-sm text-white/50">
          Waiting for input stream...
        </div>
      </div>
    </div>
  );
};
