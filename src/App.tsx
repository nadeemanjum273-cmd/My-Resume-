import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Toast } from "./components/Toast";
import { Hero } from "./components/Hero";
import { PocSimulator } from "./components/PocSimulator";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Calculator } from "./components/Calculator";
import { Resume } from "./components/Resume";
import { Contact } from "./components/Contact";
import { MapSection } from "./components/MapSection";
import { VideoModal } from "./components/VideoModal";
import { JugnuBackground } from "./components/JugnuBackground";
import { FloatingContactDock } from "./components/FloatingContactDock";
import { ArrowUp } from "lucide-react";

export default function App() {
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#06070a] text-slate-100 font-sans selection:bg-cyanGlow selection:text-black relative cyber-grid">
      {/* Dynamic Starry Sky with Moving Stars & Bioluminescent Jugnu */}
      <JugnuBackground />

      {/* Toast Notification Alert */}
      <Toast message={toastMsg} onClose={() => setToastMsg(null)} />

      {/* 60-Sec Demo Video Modal */}
      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
      />

      {/* 1. STICKY FROSTED GLASS NAVIGATION BAR */}
      <Navbar onTriggerToast={triggerToast} />

      {/* MAIN PORTFOLIO SECTIONS */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-28">
        {/* 2. HERO SECTION */}
        <Hero
          onTriggerToast={triggerToast}
          onOpenVideoModal={() => setVideoModalOpen(true)}
        />

        {/* 3. INTERACTIVE PROOF OF CONCEPT (POC) SIMULATOR */}
        <PocSimulator onTriggerToast={triggerToast} />

        {/* 4 & 5. FEATURED PROJECTS SHOWCASE & CASE STUDY MODALS */}
        <Projects />

        {/* 6. TECHNICAL ARSENAL (SKILLS MATRIX) */}
        <Skills />

        {/* 7. CLIENT ROI & SAVINGS CALCULATOR */}
        <Calculator />

        {/* 8. RESUME & CREDENTIALS TIMELINE */}
        <Resume />

        {/* 9. CONTACT & DISCOVERY 60-SEC FORM */}
        <Contact onTriggerToast={triggerToast} />

        {/* 10. INTEGRATED LOCATION MAP (66000 Multan, Punjab, Pakistan) */}
        <MapSection />
      </main>

      {/* Fixed Persistent Quick Connect Floating Dock */}
      <FloatingContactDock variant="fixed" onTriggerToast={triggerToast} />

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-[#06070a]/90 backdrop-blur-md py-8 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span>&copy; {new Date().getFullYear()} Nadeem Anjum &bull; AI Solutions &amp; Automation Specialist &bull; 66000 Multan, Punjab, Pakistan</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="p-2 px-3 rounded-lg bg-[#111420] border border-slate-700/80 hover:border-cyan-400 text-slate-300 hover:text-cyanGlow transition-colors flex items-center gap-1.5"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
