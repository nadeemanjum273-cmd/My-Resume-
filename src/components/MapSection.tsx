import React from "react";
import { MapPin, Navigation, ExternalLink, Globe } from "lucide-react";

export const MapSection: React.FC = () => {
  const locationString = "66000 Multan, Punjab, Pakistan";
  const googleMapsUrl = "https://maps.google.com/?q=66000+Multan,+Punjab,+Pakistan";

  return (
    <section id="location-map" className="scroll-mt-28 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyanGlow text-xs font-mono mb-2">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span>GLOBAL REACH &bull; BASE LOCATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Location &amp; Global Availability
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm font-sans mt-1">
            Headquartered in <strong className="text-white font-semibold">66000 Multan, Punjab, Pakistan</strong> &bull; Serving clients globally across North America, Europe, UAE &amp; Asia.
          </p>
        </div>

        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#111420] border border-slate-700/80 hover:border-cyan-400 text-xs font-mono text-cyanGlow hover:text-white transition-all shadow-sm shrink-0"
        >
          <Navigation className="w-3.5 h-3.5 text-cyan-400" />
          <span>Open in Google Maps</span>
          <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
        </a>
      </div>

      {/* Map Container Card */}
      <div className="rounded-3xl bg-[#0b0d13] border border-slate-700/80 p-3 sm:p-4 shadow-2xl shadow-cyan-950/20 space-y-3 overflow-hidden">
        <div className="relative w-full h-[320px] sm:h-[400px] rounded-2xl overflow-hidden border border-slate-800 bg-[#06070a]">
          {/* Embedded Google Map */}
          <iframe
            title="Nadeem Anjum - Location Map"
            src="https://maps.google.com/maps?q=Multan%2066000%20Punjab%20Pakistan&t=&z=12&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0 filter invert-[90%] hue-rotate-180 contrast-[105%] opacity-90 hover:opacity-100 transition-opacity"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          {/* Floating Location Pill Overlay */}
          <div className="absolute top-4 left-4 z-10 px-4 py-2.5 rounded-2xl bg-[#0b0d13]/90 backdrop-blur-md border border-cyan-500/40 text-xs font-mono text-white shadow-xl flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <div>
              <div className="font-bold text-cyanGlow">Nadeem Anjum Base</div>
              <div className="text-[11px] text-slate-300">66000 Multan, Punjab, Pakistan</div>
            </div>
          </div>
        </div>

        {/* Location Info Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono pt-1">
          <div className="p-3 rounded-xl bg-[#06070a] border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400">Postal / Zip Code:</span>
            <span className="text-cyanGlow font-bold">66000</span>
          </div>
          <div className="p-3 rounded-xl bg-[#06070a] border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400">Region:</span>
            <span className="text-white font-medium">Multan, Punjab</span>
          </div>
          <div className="p-3 rounded-xl bg-[#06070a] border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400">Timezone:</span>
            <span className="text-emerald-400 font-bold">PKT (UTC +5)</span>
          </div>
        </div>
      </div>
    </section>
  );
};
