import React from "react";
import { CheckCircle2, X } from "lucide-react";

interface ToastProps {
  message: string | null;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <aside aria-label="Notification" className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-[#0d111a]/95 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-xs font-mono shadow-2xl shadow-cyan-950/50 flex items-center gap-2.5 animate-bounce-short">
      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-2 text-slate-400 hover:text-white"
          aria-label="Dismiss toast"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </aside>
  );
};
