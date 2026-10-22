import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Bot, Sparkles } from "lucide-react";

interface NavbarProps {
  onTriggerToast?: (msg: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onTriggerToast }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ["hero", "demo", "projects", "skills", "calculator", "resume", "contact"];
      const scrollPosition = window.scrollY + 180;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#hero", id: "hero" },
    { name: "Resume Assistant", href: "#demo", id: "demo", isLive: true },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Technical Arsenal", href: "#skills", id: "skills" },
    { name: "ROI Calculator", href: "#calculator", id: "calculator" },
    { name: "Resume & CV", href: "#resume", id: "resume" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#06070a]/90 backdrop-blur-xl border-b border-cyan-500/20 shadow-2xl shadow-cyan-950/20 py-3"
          : "bg-[#06070a]/75 backdrop-blur-md border-b border-slate-800/80 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Glowing Avatar */}
        <a
          href="#hero"
          className="group flex items-center gap-3.5 transition-transform hover:scale-[1.02]"
        >
          <div className="relative">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-400 via-cyan-500 to-purple-600 p-[1.5px] shadow-lg shadow-cyan-500/25 group-hover:shadow-cyan-400/50 transition-shadow">
              <div className="w-full h-full rounded-[10px] bg-[#0b0d13] flex items-center justify-center overflow-hidden">
                <img
                  src="/profile.jpg"
                  alt="Nadeem Anjum"
                  className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#06070a] flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="absolute w-2 h-2 rounded-full bg-emerald-400"></span>
            </span>
          </div>

          <div>
            <div className="font-display font-extrabold text-white text-sm tracking-wide flex items-center gap-2">
              <span>Nadeem Anjum</span>
              <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/25">
                AVAILABLE
              </span>
            </div>
            <div className="text-[10px] font-mono tracking-wider text-slate-400 group-hover:text-cyanGlow transition-colors uppercase">
              AI &amp; Automation Specialist
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-6 text-xs font-medium">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`relative py-1.5 transition-all duration-200 flex items-center gap-1.5 ${
                  link.isLive
                    ? "text-cyanGlow font-semibold hover:text-white"
                    : isActive
                    ? "text-white font-semibold"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {link.isLive && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                  </span>
                )}
                <span>{link.name}</span>

                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyanGlow to-purpleGlow rounded-full"></span>
                )}
              </a>
            );
          })}
        </div>

        {/* Action Buttons & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="group px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-600 hover:from-cyan-300 hover:to-purple-500 text-black font-display font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/40 hover:-translate-y-0.5 flex items-center gap-1.5"
          >
            <span>Hire Specialist</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 rounded-xl bg-[#111420] border border-slate-700 text-slate-300 hover:text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#06070a]/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-1.5">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-mono transition-colors ${
                activeSection === link.id
                  ? "bg-[#111420] text-cyanGlow font-bold border border-cyan-500/30"
                  : "text-slate-300 hover:bg-[#111420] hover:text-white"
              }`}
            >
              <span className="flex items-center gap-2">
                {link.isLive && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>}
                {link.name}
              </span>
              <span className="text-[10px] text-slate-500">→</span>
            </a>
          ))}

          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-lg bg-cyan-400 text-black font-display font-bold text-xs text-center uppercase tracking-wider block"
            >
              Get in Touch
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
