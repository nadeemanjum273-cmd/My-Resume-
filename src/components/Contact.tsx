import React, { useState, useEffect } from "react";
import { Mail, Copy, ExternalLink, Send, CheckCircle2, MessageSquare, MapPin, Github, Linkedin, Table, Settings, Key, HelpCircle, Sparkles } from "lucide-react";

interface ContactProps {
  onTriggerToast: (msg: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ onTriggerToast }) => {
  const [formData, setFormData] = useState({
    prospectName: "",
    companyName: "",
    roleTitle: "Founder / Executive",
    staffCount: "1 - 10 staff",
    linkedinOrContact: "",
    identifiedBottleneck: "",
    targetAiPillar: "Pillar 1: 24/7 AI Chatbot (Web + WhatsApp)",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSheetModal, setShowSheetModal] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState<string>(() => {
    return localStorage.getItem("NA_GOOGLE_SHEETS_WEBHOOK_URL") || "";
  });
  const [tempWebhookUrl, setTempWebhookUrl] = useState(webhookUrl);

  const googleSheetUrl =
    "https://docs.google.com/spreadsheets/d/1Ar6moDvYkq8VJPxxfVPyHxE_oMaXOW5dnvkvxCtQ6tg/edit?gid=693283604#gid=693283604";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("nadeemanjum273@gmail.com");
    onTriggerToast("Email copied to clipboard! (nadeemanjum273@gmail.com)");
  };

  const handleSaveWebhook = () => {
    localStorage.setItem("NA_GOOGLE_SHEETS_WEBHOOK_URL", tempWebhookUrl.trim());
    setWebhookUrl(tempWebhookUrl.trim());
    setShowSheetModal(false);
    onTriggerToast("Google Sheet Webhook URL saved successfully! 📊");
  };

  const appsScriptCode = `// --- Google Apps Script to paste in Extensions > Apps Script ---
function doPost(e) {
  try {
    var ss = SpreadsheetApp.openById("1Ar6moDvYkq8VJPxxfVPyHxE_oMaXOW5dnvkvxCtQ6tg");
    var sheet = ss.getSheetByName("prospect_tracker_template") || ss.getSheets()[0];
    var data = JSON.parse(e.postData.contents);
    
    // Row matching exact columns from your Linkdin Prospect_tracker screenshot:
    // [Prospect Name, Company Name, Role / Title, Staff Count, Linkedin Profile URL, Identified Bottleneck, Target AI Pillar, POC Video URL, Outreach Date, Status, Next Action]
    var row = [
      data.prospectName || "",
      data.companyName || "",
      data.roleTitle || "Founder / Executive",
      data.staffCount || "",
      data.linkedinOrContact || "",
      data.identifiedBottleneck || "",
      data.targetAiPillar || "Pillar 1: AI Chatbot",
      "https://loom.com/share/nadeem-ai-demo", // POC Video URL
      new Date().toLocaleDateString("en-US"),     // Outreach Date
      "Inquiry Received (Live Web)",             // Status
      "Prepare 60-Sec Video Demo"                // Next Action
    ];
    
    sheet.appendRow(row);
    return ContentService.createTextOutput(JSON.stringify({ result: "success", row: row }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ result: "error", error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

  const handleCopyScript = () => {
    navigator.clipboard.writeText(appsScriptCode);
    onTriggerToast("Google Apps Script code copied to clipboard! 📋");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      sheetId: "1Ar6moDvYkq8VJPxxfVPyHxE_oMaXOW5dnvkvxCtQ6tg",
      tabName: "prospect_tracker_template",
      prospectName: formData.prospectName,
      companyName: formData.companyName,
      roleTitle: formData.roleTitle,
      staffCount: formData.staffCount,
      linkedinOrContact: formData.linkedinOrContact,
      identifiedBottleneck: formData.identifiedBottleneck,
      targetAiPillar: formData.targetAiPillar,
      outreachDate: new Date().toLocaleDateString("en-US"),
      status: "Inquiry Received (Live Web)",
      nextAction: "Prepare 60-Sec Video Demo",
    };

    // If webhook is provided, trigger real-time Google Sheet sync
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.warn("Sheet sync error (handled):", err);
      }
    }

    // Save lead in local session tracker
    const existingLeads = JSON.parse(localStorage.getItem("NA_SAVED_PROSPECTS") || "[]");
    localStorage.setItem("NA_SAVED_PROSPECTS", JSON.stringify([payload, ...existingLeads]));

    setIsSubmitting(false);
    setSubmitted(true);
    onTriggerToast("Discovery Request logged & real-time sync dispatched to Google Sheet! 🚀");
  };

  return (
    <section id="contact" className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12">
      {/* Left Column: Direct Fast Channels & WhatsApp Business */}
      <div className="lg:col-span-5 space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyanGlow text-xs font-mono font-bold">
          <Mail className="w-3.5 h-3.5 text-cyan-400" />
          <span>START A PROJECT</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
          Request a 60-Sec Demo Walkthrough
        </h2>

        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
          Share your business workflow or inquiry bottleneck. I will record a personalized 60-second video walkthrough showing how an AI agent, lead chatbot, or n8n pipeline solves it.
        </p>

        {/* Location & Remote Availability */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-300 font-medium">
          <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>66000 Multan, Punjab, Pakistan &bull; Available for Remote Worldwide Contracts</span>
        </div>

        {/* Quick Contact Cards */}
        <div className="space-y-3 pt-1 text-xs font-mono">
          {/* WhatsApp Business Card - High Priority */}
          <a
            href="https://wa.me/923077978277?text=Hello%20Nadeem!%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20an%20AI%20automation%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-[#0b0d13] border border-emerald-500/40 hover:border-emerald-400 flex justify-between items-center text-slate-200 hover:text-emerald-300 transition-all group shadow-lg shadow-emerald-950/20"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-xs sm:text-sm">WhatsApp Business</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                    ACTIVE
                  </span>
                </div>
                <div className="text-slate-400 text-xs mt-0.5">+92 307 7978277</div>
              </div>
            </div>
            <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30 group-hover:bg-emerald-500/20 transition-colors">
              Chat Now &rarr;
            </span>
          </a>

          {/* Email Card */}
          <div className="p-3.5 rounded-2xl bg-[#0b0d13] border border-slate-800 flex justify-between items-center group hover:border-cyan-500/40 transition-colors">
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-cyanGlow" />
              <span className="text-slate-200">nadeemanjum273@gmail.com</span>
            </div>
            <button
              onClick={handleCopyEmail}
              className="px-2.5 py-1.5 rounded-lg bg-[#111420] text-cyanGlow hover:text-white border border-slate-700/80 hover:border-cyan-500/40 text-[11px] transition-colors font-bold"
            >
              Copy Email
            </button>
          </div>

          {/* LinkedIn & GitHub Card */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <a
              href="https://www.linkedin.com/in/nadeem-anjum-b23b1a269"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-[#0b0d13] border border-slate-800 flex items-center justify-between text-slate-300 hover:text-cyanGlow hover:border-cyan-500/40 transition-all"
            >
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold">LinkedIn Profile</span>
              </div>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>

            <a
              href="https://github.com/nadeemanjum273-cmd"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-[#0b0d13] border border-slate-800 flex items-center justify-between text-slate-300 hover:text-purpleGlow hover:border-purple-500/40 transition-all"
            >
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4 text-purple-400" />
                <span className="font-semibold">GitHub Repos</span>
              </div>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
          </div>

          {/* Connected Google Sheet Status Banner */}
          <div className="pt-2">
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/30 to-[#0b0d13] border border-emerald-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Table className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="text-white font-bold text-xs">Google Sheets Live Sync</div>
                  <div className="text-[10px] text-slate-400">Tab 1: prospect_tracker_template</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={googleSheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-[#111420] text-emerald-400 hover:text-white border border-emerald-500/30 text-[10px] flex items-center gap-1"
                  title="Open Google Sheet in new tab"
                >
                  <span>Open Sheet</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <button
                  onClick={() => setShowSheetModal(true)}
                  className="p-1.5 rounded-lg bg-[#111420] text-slate-300 hover:text-cyanGlow border border-slate-700 text-[10px] flex items-center gap-1"
                  title="Configure webhook & view Apps Script"
                >
                  <Settings className="w-3 h-3" />
                  <span>Sync Setup</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Discovery Form Matching Sheet Columns */}
      <div className="lg:col-span-7 rounded-3xl bg-[#0b0d13] border border-slate-700/80 p-6 sm:p-8 shadow-2xl relative">
        {submitted ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-display font-extrabold text-white">
              Discovery Request Logged!
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-white">{formData.prospectName}</strong>! Your inquiry for <strong className="text-cyanGlow">{formData.companyName}</strong> has been received. Nadeem will record your personalized 60-second video demo walkthrough.
            </p>

            <div className="p-4 rounded-2xl bg-[#06070a] border border-emerald-500/30 max-w-md mx-auto text-left text-xs font-mono space-y-1 text-slate-300">
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 pb-1 border-b border-slate-800">
                <Table className="w-3.5 h-3.5" />
                <span>Google Sheet Live Log Entry:</span>
              </div>
              <div>&bull; Prospect: <span className="text-white">{formData.prospectName}</span></div>
              <div>&bull; Company: <span className="text-white">{formData.companyName}</span> ({formData.staffCount})</div>
              <div>&bull; Role: <span className="text-white">{formData.roleTitle}</span></div>
              <div>&bull; Pillar: <span className="text-cyanGlow">{formData.targetAiPillar}</span></div>
              <div>&bull; Status: <span className="text-emerald-400">Inquiry Received (Live Web)</span></div>
            </div>

            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  prospectName: "",
                  companyName: "",
                  roleTitle: "Founder / Executive",
                  staffCount: "1 - 10 staff",
                  linkedinOrContact: "",
                  identifiedBottleneck: "",
                  targetAiPillar: "Pillar 1: 24/7 AI Chatbot (Web + WhatsApp)",
                });
              }}
              className="px-6 py-2.5 rounded-xl bg-[#111420] border border-slate-700 text-cyanGlow text-xs font-mono font-bold hover:border-cyan-400 transition-colors"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-display font-bold text-white uppercase tracking-wider">
                Discovery Form &bull; Synced with Prospect Tracker
              </span>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Real-Time Sheet Ready
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Prospect Name *
                </label>
                <input
                  required
                  type="text"
                  value={formData.prospectName}
                  onChange={(e) => setFormData({ ...formData, prospectName: e.target.value })}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full bg-[#06070a] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyanGlow"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Company Name *
                </label>
                <input
                  required
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="e.g. Apex Realty / TrendWear DTC"
                  className="w-full bg-[#06070a] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyanGlow"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Role / Title
                </label>
                <input
                  type="text"
                  value={formData.roleTitle}
                  onChange={(e) => setFormData({ ...formData, roleTitle: e.target.value })}
                  placeholder="e.g. Founder, CEO, Head of Ops"
                  className="w-full bg-[#06070a] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyanGlow"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Staff Count
                </label>
                <select
                  value={formData.staffCount}
                  onChange={(e) => setFormData({ ...formData, staffCount: e.target.value })}
                  className="w-full bg-[#06070a] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyanGlow font-mono text-xs"
                >
                  <option value="1 - 5 staff">1 - 5 team members</option>
                  <option value="6 - 15 staff">6 - 15 team members</option>
                  <option value="16 - 50 staff">16 - 50 team members</option>
                  <option value="50+ staff">50+ team members</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  LinkedIn URL / Contact (Email or WhatsApp) *
                </label>
                <input
                  required
                  type="text"
                  value={formData.linkedinOrContact}
                  onChange={(e) => setFormData({ ...formData, linkedinOrContact: e.target.value })}
                  placeholder="https://linkedin.com/in/... or email"
                  className="w-full bg-[#06070a] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyanGlow"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Target AI Pillar *
                </label>
                <select
                  value={formData.targetAiPillar}
                  onChange={(e) => setFormData({ ...formData, targetAiPillar: e.target.value })}
                  className="w-full bg-[#06070a] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyanGlow font-mono text-xs"
                >
                  <option value="Pillar 1: AI Chatbot (Web + WhatsApp)">Pillar 1: 24/7 AI Chatbot (Web + WhatsApp)</option>
                  <option value="Pillar 2: AI Web App / CRM">Pillar 2: AI Web App &amp; CRM Integration</option>
                  <option value="Pillar 3: Autonomous Agent (Mind_Dreams RAG)">Pillar 3: Autonomous RAG Agent (Mind_Dreams Architecture)</option>
                  <option value="Pillar 4: Workflow Automation (n8n Pipeline)">Pillar 4: Workflow Automation (n8n Pipeline)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                Identified Bottleneck to Automate *
              </label>
              <textarea
                required
                rows={3}
                value={formData.identifiedBottleneck}
                onChange={(e) => setFormData({ ...formData, identifiedBottleneck: e.target.value })}
                placeholder="Describe your current manual hurdle (e.g. answering inquiries after hours, manual order tracking and refunds, ad lead copy-pasting into CRM)..."
                className="w-full bg-[#06070a] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyanGlow"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-purple-600 hover:from-cyan-300 hover:to-purple-500 text-black font-display font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
            >
              <Send className="w-4 h-4 text-black" />
              <span>
                {isSubmitting ? "Submitting & Syncing..." : "Send Request & Real-Time Sync to Google Sheet"}
              </span>
            </button>
          </form>
        )}
      </div>

      {/* Google Sheets Sync & Access Setup Modal */}
      {showSheetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-2xl rounded-3xl bg-[#0b0d13] border border-cyan-500/40 p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <Table className="w-6 h-6 text-emerald-400" />
                <h3 className="font-display font-extrabold text-white text-xl">
                  Google Sheet Real-Time Sync Setup
                </h3>
              </div>
              <button
                onClick={() => setShowSheetModal(false)}
                className="text-slate-400 hover:text-white p-2 rounded-lg bg-[#111420]"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs font-sans text-slate-300">
              <p>
                This form connects directly to your sheet:{" "}
                <a
                  href={googleSheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyanGlow underline font-mono"
                >
                  Linkdin Prospect_tracker (tab: prospect_tracker_template)
                </a>
              </p>

              <div className="p-4 rounded-xl bg-[#06070a] border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white font-mono flex items-center gap-1.5">
                    <Key className="w-4 h-4 text-cyan-400" />
                    How to Give Access (1-Minute Google Apps Script):
                  </span>
                  <button
                    onClick={handleCopyScript}
                    className="px-3 py-1 rounded-lg bg-cyan-500/20 text-cyanGlow border border-cyan-500/40 hover:bg-cyan-500/30 text-xs font-mono font-bold"
                  >
                    Copy Script Code
                  </button>
                </div>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-300 leading-relaxed font-mono text-[11px]">
                  <li>Open your Google Sheet &rarr; click <strong className="text-white">Extensions</strong> &rarr; <strong className="text-white">Apps Script</strong>.</li>
                  <li>Paste the copied script code into the editor.</li>
                  <li>Click <strong className="text-white">Deploy</strong> &rarr; <strong className="text-white">New deployment</strong> &rarr; Select type: <strong className="text-white">Web app</strong>.</li>
                  <li>Set <strong className="text-white">Execute as: Me</strong> and <strong className="text-white">Who has access: Anyone</strong>.</li>
                  <li>Click <strong className="text-white">Deploy</strong> and copy the resulting Web app URL.</li>
                  <li>Paste your Web App URL into the field below and hit Save!</li>
                </ol>
              </div>

              <div className="space-y-2">
                <label className="block font-mono text-xs text-white font-bold">
                  Your Deployed Apps Script Web App URL:
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={tempWebhookUrl}
                    onChange={(e) => setTempWebhookUrl(e.target.value)}
                    placeholder="https://script.google.com/macros/s/.../exec"
                    className="flex-1 bg-[#06070a] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyanGlow font-mono"
                  />
                  <button
                    onClick={handleSaveWebhook}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 text-black font-bold font-mono text-xs"
                  >
                    Save URL
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
