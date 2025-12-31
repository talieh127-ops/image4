
import React, { useState, useEffect } from 'react';
import { geminiService } from './services/geminiService';
import { GeneratedImage, AspectRatio, GenerationState } from './types';
import DeploymentGuide from './components/DeploymentGuide';

const LOADING_MESSAGES = [
  "Visualizing your ideas...",
  "Painting with pixels...",
  "Applying digital brushstrokes...",
  "Dreaming in code...",
  "Polishing the final masterpiece...",
  "Almost there, wait a second..."
];

const App: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [history, setHistory] = useState<GeneratedImage[]>([]);
  const [status, setStatus] = useState<GenerationState>({
    isGenerating: false,
    error: null,
    currentMessage: LOADING_MESSAGES[0]
  });

  // Handle message cycling during generation
  useEffect(() => {
    let interval: any;
    if (status.isGenerating) {
      let i = 0;
      interval = setInterval(() => {
        i = (i + 1) % LOADING_MESSAGES.length;
        setStatus(prev => ({ ...prev, currentMessage: LOADING_MESSAGES[i] }));
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [status.isGenerating]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setStatus({
      isGenerating: true,
      error: null,
      currentMessage: LOADING_MESSAGES[0]
    });

    try {
      const imageUrl = await geminiService.generateImage(prompt, aspectRatio);
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        url: imageUrl,
        prompt: prompt,
        timestamp: Date.now(),
        aspectRatio: aspectRatio
      };
      setHistory(prev => [newImage, ...prev]);
      setPrompt('');
      setStatus(prev => ({ ...prev, isGenerating: false }));
    } catch (err: any) {
      setStatus({
        isGenerating: false,
        error: err.message || "An error occurred during image generation.",
        currentMessage: ""
      });
    }
  };

  const downloadImage = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen pb-20 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="max-w-7xl mx-auto pt-8 pb-12 flex flex-col items-center">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <i className="fas fa-magic text-white text-xl"></i>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            Visionary Studio
          </h1>
        </div>
        <div className="flex items-center gap-2 mb-4 bg-slate-900 px-3 py-1 rounded-full border border-slate-800 text-[10px] uppercase tracking-widest text-slate-500 font-bold">
          <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
          AI Powered Creation
        </div>
        <p className="text-slate-400 text-center max-w-xl">
          Enter a prompt below to create stunning visuals using high-end AI technology. 
          Perfect for creators, designers, and explorers.
        </p>
      </header>

      <main className="max-w-7xl mx-auto space-y-12">
        {/* Generator Controls */}
        <section className="max-w-3xl mx-auto glass p-6 rounded-3xl space-y-6 shadow-2xl shadow-indigo-500/5">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-300 ml-1">
              What do you want to see?
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A futuristic city with floating neon gardens, cinematic lighting, 8k..."
              className="w-full h-32 bg-slate-800/50 border border-slate-700 rounded-2xl p-4 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400 mr-2">Aspect Ratio:</span>
              {(['1:1', '16:9', '9:16', '3:4', '4:3'] as AspectRatio[]).map((ratio) => (
                <button
                  key={ratio}
                  onClick={() => setAspectRatio(ratio)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                    aspectRatio === ratio
                      ? 'bg-indigo-600 border-indigo-500 text-white'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>

            <button
              onClick={handleGenerate}
              disabled={status.isGenerating || !prompt.trim()}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-semibold rounded-xl flex items-center gap-2 transition shadow-lg shadow-indigo-500/20"
            >
              {status.isGenerating ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Generating...
                </>
              ) : (
                <>
                  <i className="fas fa-sparkles"></i>
                  Generate Image
                </>
              )}
            </button>
          </div>

          {status.error && (
            <div className="p-4 bg-red-500/10 border border-red-500/50 text-red-400 rounded-xl text-sm flex items-center gap-2" dir="rtl">
              <i className="fas fa-exclamation-circle"></i>
              {status.error}
            </div>
          )}
        </section>

        {/* Current Generation Overlay */}
        {status.isGenerating && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
            <div className="text-center space-y-6 max-w-sm px-6">
              <div className="relative w-24 h-24 mx-auto">
                <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-t-indigo-500 rounded-full animate-spin"></div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Creating Magic</h3>
                <p className="text-slate-400 animate-pulse">{status.currentMessage}</p>
              </div>
            </div>
          </div>
        )}

        {/* Gallery */}
        <section className="space-y-8">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-white">Your Creations</h2>
            <span className="text-sm text-slate-500">{history.length} images generated</span>
          </div>

          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-600 border-2 border-dashed border-slate-800 rounded-3xl">
              <i className="fas fa-images text-5xl mb-4 opacity-20"></i>
              <p>Your generated images will appear here</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {history.map((item) => (
                <div key={item.id} className="group relative glass rounded-2xl overflow-hidden flex flex-col h-full hover:ring-2 hover:ring-indigo-500/50 transition duration-300">
                  <div className={`relative overflow-hidden aspect-[${item.aspectRatio.replace(':', '/')}] bg-slate-900`}>
                    <img
                      src={item.url}
                      alt={item.prompt}
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                       <button 
                        onClick={() => downloadImage(item.url, `visionary-${item.id}.png`)}
                        className="w-10 h-10 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white rounded-full flex items-center justify-center transition"
                        title="Download"
                       >
                         <i className="fas fa-download"></i>
                       </button>
                    </div>
                  </div>
                  <div className="p-4 space-y-2 flex-grow">
                    <p className="text-sm text-slate-300 line-clamp-2 italic">"{item.prompt}"</p>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                      <span>{item.aspectRatio}</span>
                      <span>{new Date(item.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Deployment Guide Section */}
        <DeploymentGuide />
      </main>

      <footer className="max-w-7xl mx-auto pt-10 text-center text-slate-500 text-sm border-t border-slate-800 mt-20">
        <p>&copy; 2024 Visionary AI Studio. Powered by Gemini 2.5 Flash Image.</p>
        <p className="mt-2 text-xs opacity-50">Experimental creative suite for developers.</p>
      </footer>
    </div>
  );
};

export default App;
