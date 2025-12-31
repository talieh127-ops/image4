
import React from 'react';

const DeploymentGuide: React.FC = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('کپی شد!');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mt-16 mb-20 max-w-4xl mx-auto shadow-2xl text-right" dir="rtl">
      <div className="flex items-center gap-4 mb-8 border-b border-slate-800 pb-6">
        <div className="bg-emerald-600 p-3 rounded-2xl shadow-lg">
          <i className="fas fa-terminal text-white text-2xl"></i>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">حل نهایی مشکل انتشار (گام به گام)</h2>
          <p className="text-slate-500 text-sm">بر اساس خطاهایی که داشتید، این دستورات را دقیقاً کپی و در CMD بزنید:</p>
        </div>
      </div>

      <div className="space-y-10">
        {/* Step 1: Identity & Reset */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">۱</span>
            حل خطای Identity (شناسایی نویسنده)
          </h3>
          <p className="text-slate-400 text-sm">این دو دستور را اول از همه بزنید تا گیت شما را بشناسد:</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between bg-black p-3 rounded-lg border border-slate-800 group">
              <code className="text-emerald-400 text-xs font-mono">git config --global user.email "mail@example.com"</code>
              <button onClick={() => copyToClipboard('git config --global user.email "mail@example.com"')} className="text-slate-600 hover:text-white transition">
                <i className="fas fa-copy"></i>
              </button>
            </div>
            <div className="flex items-center justify-between bg-black p-3 rounded-lg border border-slate-800 group">
              <code className="text-emerald-400 text-xs font-mono">git config --global user.name "YourName"</code>
              <button onClick={() => copyToClipboard('git config --global user.name "YourName"')} className="text-slate-600 hover:text-white transition">
                <i className="fas fa-copy"></i>
              </button>
            </div>
          </div>
        </section>

        {/* Step 2: Fresh Start */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="bg-indigo-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">۲</span>
            پاکسازی و شروع دوباره (Fresh Start)
          </h3>
          <p className="text-slate-400 text-sm">چون در مراحل قبل خطا داشتید، بهتر است تنظیمات قبلی را پاک کنیم و دوباره بسازیم:</p>
          <div className="bg-black p-3 rounded-lg border border-slate-800 flex justify-between items-center">
            <code className="text-yellow-500 text-xs font-mono">rd /s /q .git && git init</code>
            <button onClick={() => copyToClipboard('rd /s /q .git && git init')} className="text-slate-600 hover:text-white transition">
              <i className="fas fa-copy"></i>
            </button>
          </div>
          <p className="text-slate-500 text-[10px]">این دستور پوشه مخفی گیت را پاک کرده و دوباره آن را می‌سازد.</p>
        </section>

        {/* Step 3: Final Push */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="bg-emerald-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">۳</span>
            ارسال نهایی به گیت‌هاب (بدون غلط املایی)
          </h3>
          <p className="text-slate-400 text-sm">حالا این دستورات را به ترتیب بزنید. دقت کنید آدرس گیت‌هاب خود را جایگزین کنید:</p>
          <div className="space-y-3">
            {[
              'git add .',
              'git commit -m "final setup"',
              'git branch -M main',
              'git remote add origin https://github.com/talieh127-ops/image.git',
              'git push -u origin main'
            ].map((cmd, i) => (
              <div key={i} className="flex items-center justify-between bg-black p-3 rounded-lg border border-slate-800 group">
                <code className="text-emerald-400 text-xs font-mono">{cmd}</code>
                <button onClick={() => copyToClipboard(cmd)} className="text-slate-600 hover:text-white transition">
                  <i className="fas fa-copy"></i>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Cloudflare Check */}
        <div className="bg-blue-600/10 border border-blue-500/30 p-6 rounded-2xl">
          <h4 className="text-blue-400 font-bold mb-2">یادآوری برای Cloudflare:</h4>
          <ul className="text-slate-400 text-xs space-y-2 list-disc list-inside">
            <li>Framework Preset را حتماً روی <b>Vite</b> بگذارید.</li>
            <li>Build Command باید <code>npm run build</code> باشد.</li>
            <li>Output Directory باید <code>dist</code> باشد.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DeploymentGuide;
