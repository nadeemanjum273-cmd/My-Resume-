import React from "react";
import { Printer, CheckCircle2, Briefcase, GraduationCap, ShieldCheck, MapPin, ExternalLink, Github, Sparkles } from "lucide-react";

export const Resume: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="resume" className="scroll-mt-28 space-y-8">
      {/* Header with Print CV Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
        <div>
          <div className="text-xs font-mono text-purpleGlow tracking-wider">
            CURRICULUM VITAE &amp; CREDENTIALS
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight mt-1">
            Experience &amp; Qualifications
          </h2>
          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-slate-300">
            <span className="text-white font-bold text-sm">Nadeem Anjum</span>
            <span>&bull;</span>
            <span className="flex items-center gap-1 font-semibold text-white">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              66000 Multan, Punjab, Pakistan
            </span>
            <span>&bull;</span>
            <span className="text-cyan-300 font-semibold">nadeemanjum273@gmail.com</span>
            <span>&bull;</span>
            <span className="text-emerald-300 font-semibold">+92 307 7978277</span>
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#111420] border border-slate-700 hover:border-cyan-400 text-xs font-mono text-cyanGlow hover:text-white transition-all shadow-sm shrink-0 font-bold"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save CV (PDF)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Timeline Items */}
        <div className="lg:col-span-8 space-y-7">
          {/* Project Highlight: Mind_Dreams AI Agent (Oct 2026) */}
          <div className="relative pl-7 border-l-2 border-cyan-400 space-y-2 group">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#06070a] border-2 border-cyan-400 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
            </div>

            <div className="flex flex-wrap justify-between items-center gap-2">
              <h3 className="font-display font-extrabold text-white text-lg flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Mind_Dreams — AI Customer Support &amp; RAG Agent</span>
              </h3>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/20 text-cyanGlow border border-cyan-400/50 font-bold">
                Oct 2026
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              Production-grade 24/7 AI customer support chatbot and RAG policy engine built with Google Gemini, Next.js 14, and real-time 3-way Google Sheets synchronization for automated order lookups and refund validation.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono">
              <span className="px-2.5 py-1 rounded-lg bg-[#111420] border border-cyan-500/30 text-cyan-300">
                Next.js 14
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#111420] border border-slate-800 text-slate-300">
                Google Gemini AI
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#111420] border border-slate-800 text-slate-300">
                LangChain RAG
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#111420] border border-slate-800 text-slate-300">
                Google Sheets API v4
              </span>
            </div>

            <div className="pt-1">
              <a
                href="https://github.com/nadeemanjum273-cmd/Mind_Dream-Agent"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-cyanGlow hover:text-white transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>github.com/nadeemanjum273-cmd/Mind_Dream-Agent ↗</span>
              </a>
            </div>
          </div>

          {/* Experience Item: Independent AI Automation Consultant */}
          <div className="relative pl-7 border-l-2 border-slate-700 space-y-2 group">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#06070a] border-2 border-slate-600 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
            </div>

            <div className="flex flex-wrap justify-between items-center gap-2">
              <h3 className="font-display font-bold text-white text-lg flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-slate-300" />
                <span>Independent AI Automation Consultant</span>
              </h3>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#111420] text-slate-300 border border-slate-700">
                2026 – Present
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              Architects and deploys production-ready 24/7 lead qualification chatbots, webhook pipelines, and autonomous ReAct agents for small-to-medium enterprises (3–20 staff).
            </p>

            <ul className="text-xs font-mono text-slate-400 space-y-1 pt-1 list-disc list-inside">
              <li>Integrated Voiceflow with WhatsApp Cloud API to capture after-hours qualified inquiries (+42% conversion).</li>
              <li>Engineered n8n webhook pipelines orchestrating real-time lead routing and CRM synchronization.</li>
              <li>Authored clean, documented deployment handoffs with 100% intellectual property transfer to clients.</li>
            </ul>
          </div>

          {/* Education: Graduation in Computer Science */}
          <div className="relative pl-7 border-l-2 border-emerald-500/50 space-y-2 group">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#06070a] border-2 border-emerald-400 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
            </div>

            <div className="flex flex-wrap justify-between items-center gap-2">
              <h3 className="font-display font-bold text-white text-lg flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-400" />
                <span>Graduation in Computer Science</span>
              </h3>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                66000 Multan, Pakistan
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              Completed formal graduation in Computer Science with focus on software engineering, data structures, algorithms, databases, and applied computational systems.
            </p>
          </div>

          {/* AI & ML Specialization */}
          <div className="relative pl-7 border-l-2 border-purple-500/50 space-y-2 group">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#06070a] border-2 border-purple-400 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
            </div>

            <div className="flex flex-wrap justify-between items-center gap-2">
              <h3 className="font-display font-bold text-white text-lg flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-purple-400" />
                <span>Data Science &amp; AI Fellow</span>
              </h3>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-purple-500/10 text-purpleGlow border border-purple-500/20">
                Specialization
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              Specialized in foundational data science, machine learning algorithms, statistical model validation, and modern generative AI agent swarms.
            </p>

            <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-mono">
              <span className="px-2.5 py-1 rounded-lg bg-[#111420] border border-slate-800 text-slate-300">
                Python Data Science (Pandas/NumPy)
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#111420] border border-slate-800 text-slate-300">
                Scikit-Learn (Trees &amp; KNN)
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#111420] border border-slate-800 text-slate-300">
                ROC-AUC Validation
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#111420] border border-slate-800 text-slate-300">
                RAG &amp; Vector Embeddings
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Client Delivery Promises Card */}
        <div className="lg:col-span-4 rounded-2xl bg-[#0b0d13] border border-slate-700/80 p-6 space-y-5 shadow-xl">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h4 className="font-display font-bold text-white text-base">
              Client Delivery Promises
            </h4>
          </div>

          <div className="space-y-4 text-xs font-sans">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-mono text-xs">50% Deposit Rule:</strong>
                <span className="text-slate-400 leading-relaxed">
                  50% upfront to initiate sprint kickoff; remaining 50% only upon live staging verification.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-mono text-xs">100% IP Transfer:</strong>
                <span className="text-slate-400 leading-relaxed">
                  You own all workflow code, system prompts, API keys, and documentation with zero vendor lock-in.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-mono text-xs">4-Day Delivery SLA:</strong>
                <span className="text-slate-400 leading-relaxed">
                  Working prototype delivered in 48–96 hours for rapid testing and real-world deployment.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
