import React, { useState } from "react";
import { Mail, MessageSquare, Linkedin, Github, ArrowUpRight } from "lucide-react";

interface FloatingContactDockProps {
  onTriggerToast?: (msg: string) => void;
  variant?: "hero" | "fixed";
}

export const FloatingContactDock: React.FC<FloatingContactDockProps> = ({
  onTriggerToast,
  variant = "hero",
}) => {
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);

  const platforms = [
    {
      id: "email",
      name: "Direct Email",
      value: "nadeemanjum273@gmail.com",
      href: "mailto:nadeemanjum273@gmail.com?subject=AI%20Automation%20Inquiry%20-%20Nadeem%20Anjum&body=Hi%20Nadeem,%0D%0A%0D%0AI%20am%20interested%20in%20discussing%20an%20AI%20Automation%20/%20Chatbot%20project.%0D%0A%0D%0ACompany%20/%20Website:%20%0D%0AKey%20Bottleneck:%20",
      icon: Mail,
      actionText: "Send Mail",
      borderColor: "hover:border-cyan-400",
      hoverBg: "hover:bg-[#0e1626]",
      activeColor: "text-cyanGlow",
      badgeClass: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    },
    {
      id: "whatsapp",
      name: "WhatsApp Business",
      value: "+92 307 7978277",
      href: "https://wa.me/923077978277?text=Hello%20Nadeem!%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20an%20AI%20project.",
      icon: MessageSquare,
      actionText: "Chat Now",
      borderColor: "hover:border-emerald-400",
      hoverBg: "hover:bg-[#0a1a14]",
      activeColor: "text-emerald-400",
      badgeClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    },
    {
      id: "linkedin",
      name: "LinkedIn Profile",
      value: "in/nadeem-anjum-b23b1a269",
      href: "https://www.linkedin.com/in/nadeem-anjum-b23b1a269",
      icon: Linkedin,
      actionText: "Connect",
      borderColor: "hover:border-blue-400",
      hoverBg: "hover:bg-[#0a1324]",
      activeColor: "text-blue-400",
      badgeClass: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    },
    {
      id: "github",
      name: "GitHub Repositories",
      value: "nadeemanjum273-cmd",
      href: "https://github.com/nadeemanjum273-cmd",
      icon: Github,
      actionText: "View Code",
      borderColor: "hover:border-purple-400",
      hoverBg: "hover:bg-[#160d24]",
      activeColor: "text-purpleGlow",
      badgeClass: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    },
  ];

  if (variant === "fixed") {
    // Persistent floating bottom dock
    return (
      <aside aria-label="Quick Connect Dock" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden md:flex items-center gap-2 p-2 rounded-2xl bg-[#0b0d13]/95 backdrop-blur-xl border border-slate-700/80 shadow-2xl shadow-black/90">
        <span className="text-[11px] font-mono font-bold text-white px-3 uppercase tracking-wider">
          Direct Connect:
        </span>
        {platforms.map((p) => {
          const Icon = p.icon;
          const isHovered = hoveredPlatform === p.id;
          return (
            <a
              key={p.id}
              href={p.href}
              target={p.id === "email" ? undefined : "_blank"}
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredPlatform(p.id)}
              onMouseLeave={() => setHoveredPlatform(null)}
              className={`relative px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all duration-300 transform ${
                isHovered
                  ? `scale-105 -translate-y-1 ${p.badgeClass} shadow-lg ring-1`
                  : "bg-[#111420] text-white hover:text-cyanGlow border border-slate-700"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{p.name}</span>
            </a>
          );
        })}
      </aside>
    );
  }

  // Hero Floating Platform Cards - Crystal Clear Typography
  return (
    <div className="space-y-3 pt-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {platforms.map((p) => {
          const Icon = p.icon;
          const isHovered = hoveredPlatform === p.id;

          return (
            <a
              key={p.id}
              href={p.href}
              target={p.id === "email" ? undefined : "_blank"}
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredPlatform(p.id)}
              onMouseLeave={() => setHoveredPlatform(null)}
              className={`group relative p-4 rounded-2xl bg-[#0b0d13] border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                p.borderColor
              } ${p.hoverBg} ${
                isHovered
                  ? "border-cyan-400 -translate-y-1 shadow-xl shadow-cyan-950/40"
                  : "border-slate-700/90"
              }`}
            >
              <div className="flex items-center gap-3.5 z-10">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 border ${
                    isHovered
                      ? "bg-white text-black border-white shadow-md font-bold scale-105"
                      : "bg-[#111420] text-cyanGlow border-slate-700"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Crystal Clear High-Contrast Text */}
                <div className="space-y-0.5">
                  <div className="font-display font-extrabold text-white text-sm sm:text-base tracking-wide">
                    {p.name}
                  </div>
                  <div className="text-xs font-mono font-medium text-slate-300 group-hover:text-cyan-300 transition-colors">
                    {p.value}
                  </div>
                </div>
              </div>

              {/* Crisp Action Pill Badge */}
              <div className="z-10 flex items-center gap-1">
                <span
                  className={`text-[11px] font-mono font-bold px-3 py-1.5 rounded-xl border flex items-center gap-1 transition-all ${
                    isHovered
                      ? `${p.badgeClass} scale-105 shadow-sm`
                      : "bg-[#111420] text-slate-200 border-slate-700 group-hover:text-white"
                  }`}
                >
                  <span>{p.actionText}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};
