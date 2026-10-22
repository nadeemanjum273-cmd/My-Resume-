import React, { useState } from "react";
import { X, Play, Volume2, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoSrc }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#0b0d13] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl shadow-cyan-950/50">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl bg-[#111420] border border-slate-700 hover:border-slate-500 transition-colors z-10"
          aria-label="Close video demo"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyanGlow text-[11px] font-mono">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>60-SECOND ARCHITECTURAL WALKTHROUGH</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
            How I Build &amp; Deploy 24/7 AI Automation Systems
          </h3>
        </div>

        {/* Video Player or Interactive Video Showcase */}
        <div className="aspect-video w-full rounded-2xl bg-[#06070a] border border-slate-800 overflow-hidden relative flex flex-col items-center justify-center p-6 text-center shadow-inner group">
          {videoSrc ? (
            <video
              src={videoSrc}
              controls
              autoPlay
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="space-y-4 max-w-md">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-400 to-purple-600 mx-auto flex items-center justify-center text-black shadow-xl shadow-cyan-500/30">
                <Play className="w-7 h-7 ml-1 fill-black" />
              </div>

              <div className="space-y-1.5">
                <div className="text-base font-display font-bold text-white">
                  Custom Video Demo Player Ready
                </div>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  When you provide your video file (e.g. <code className="text-cyanGlow font-mono">demo.mp4</code> in <code className="text-cyanGlow font-mono">public/</code>), it will stream directly here with ultra-fast playback.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111420] border border-slate-700/80 text-[11px] font-mono text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Dual Engine: Voiceflow + n8n Webhook Pipeline</span>
              </div>
            </div>
          )}
        </div>

        {/* Video Key Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono pt-2 border-t border-slate-800/80">
          <div className="p-3 rounded-xl bg-[#111420] border border-slate-800 text-slate-300">
            <span className="text-cyanGlow block font-bold mb-0.5">01. Intent Scoring</span>
            <span className="text-[11px] text-slate-400">Classifies incoming leads in real-time.</span>
          </div>
          <div className="p-3 rounded-xl bg-[#111420] border border-slate-800 text-slate-300">
            <span className="text-purpleGlow block font-bold mb-0.5">02. Webhook Sync</span>
            <span className="text-[11px] text-slate-400">Pushes qualified contacts to CRM &amp; Slack.</span>
          </div>
          <div className="p-3 rounded-xl bg-[#111420] border border-slate-800 text-slate-300">
            <span className="text-emerald-400 block font-bold mb-0.5">03. Auto-Booking</span>
            <span className="text-[11px] text-slate-400">Locks consultations directly into calendar.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
