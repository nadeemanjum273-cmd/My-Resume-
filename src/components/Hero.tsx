import React from "react";
import { Play } from "lucide-react";
import { TiltCard } from "./TiltCard";

interface HeroProps {
  onTriggerToast?: (msg: string) => void;
  onOpenVideoModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenVideoModal }) => {
  return (
    <section id="hero" className="pt-6 sm:pt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      {/* Left Column: Headline, Bio & Action CTAs */}
      <div className="lg:col-span-7 space-y-6">
        <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white leading-tight tracking-tight">
          Transforming Business Workflows into{" "}
          <span className="bg-gradient-to-r from-white via-cyanGlow to-purpleGlow bg-clip-text text-transparent">
            Intelligent AI Systems.
          </span>
        </h1>

        <p className="text-slate-200 text-base sm:text-lg max-w-2xl leading-relaxed font-sans">
          I build production-grade <strong className="text-white font-bold">24/7 Lead Chatbots</strong>,{" "}
          <strong className="text-white font-bold">Autonomous Agents</strong>, and{" "}
          <strong className="text-white font-bold">n8n Workflow Automations</strong> backed by deep Data Science &amp; Python ML foundations.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <a
            href="#demo"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-purple-600 hover:from-cyan-300 hover:to-purple-500 text-black font-display font-extrabold text-sm tracking-wide transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:-translate-y-0.5 active:translate-y-0"
          >
            Launch Resume Assistant
          </a>
          <a
            href="#projects"
            className="px-6 py-3.5 rounded-xl bg-[#0b0d13] hover:bg-[#121620] border border-slate-700 hover:border-cyan-500/50 text-white font-medium text-sm transition-all hover:-translate-y-0.5"
          >
            Explore Projects
          </a>
        </div>

        {/* Quantified Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80">
          <div className="p-3.5 rounded-xl bg-[#0b0d13] border border-slate-700/80">
            <div className="text-2xl font-display font-bold text-white tracking-tight">15+</div>
            <div className="text-xs text-slate-300 font-mono mt-0.5 font-medium">Automations Built</div>
          </div>
          <div className="p-3.5 rounded-xl bg-[#0b0d13] border border-slate-700/80">
            <div className="text-2xl font-display font-bold text-cyanGlow tracking-tight">6+</div>
            <div className="text-xs text-slate-300 font-mono mt-0.5 font-medium">Production Builds</div>
          </div>
          <div className="p-3.5 rounded-xl bg-[#0b0d13] border border-slate-700/80">
            <div className="text-2xl font-display font-bold text-emerald-400 tracking-tight">&lt; 48h</div>
            <div className="text-xs text-slate-300 font-mono mt-0.5 font-medium">POC Turnaround</div>
          </div>
          <div className="p-3.5 rounded-xl bg-[#0b0d13] border border-slate-700/80">
            <div className="text-2xl font-display font-bold text-purpleGlow tracking-tight">100%</div>
            <div className="text-xs text-slate-300 font-mono mt-0.5 font-medium">IP Client Transfer</div>
          </div>
        </div>
      </div>

      {/* Right Column: Visual Showcase Card with Much Larger Profile Picture & Crystal Clear Typography */}
      <div className="lg:col-span-5 flex justify-center">
        <TiltCard
          className="w-full max-w-md rounded-3xl"
          maxTilt={8}
          scale={1.02}
          glowColor="rgba(0, 242, 254, 0.28)"
        >
          <div className="w-full rounded-3xl bg-[#0b0d13] border border-slate-700 p-6 sm:p-8 shadow-2xl shadow-cyan-950/30 space-y-6">
            {/* Profile Photo Display - Extra Large & Ultra Sleek */}
            <div className="relative rounded-2xl bg-gradient-to-tr from-cyan-950/40 via-[#0b0d13] to-purple-950/40 border border-slate-700/80 p-6 sm:p-7 flex flex-col items-center text-center space-y-5 overflow-hidden">
              <div className="relative">
                <div className="w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-3xl p-[3.5px] bg-gradient-to-tr from-cyan-400 via-cyan-500 to-purple-600 shadow-2xl shadow-cyan-500/35 overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
                  <img
                    src="/profile.jpg"
                    alt="Nadeem Anjum - AI Solutions Architect"
                    className="w-full h-full object-cover object-top rounded-[21px]"
                  />
                </div>
              </div>

              {/* Crystal Clear Typography */}
              <div className="space-y-1.5 pt-1">
                <h2 className="font-display font-extrabold text-white text-2xl sm:text-3xl tracking-wide">
                  Nadeem Anjum
                </h2>
                <div className="text-xs sm:text-sm text-cyanGlow font-mono font-bold tracking-wide">
                  AI Solutions Architect &amp; Automation Specialist
                </div>
              </div>

              {/* Video Demo Button */}
              <button
                onClick={onOpenVideoModal}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-600/20 hover:from-cyan-500/30 hover:to-purple-600/30 border border-cyan-500/50 text-cyanGlow font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-md"
              >
                <Play className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                <span>Watch 60-Sec Intro / Video Demo</span>
              </button>
            </div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
};
