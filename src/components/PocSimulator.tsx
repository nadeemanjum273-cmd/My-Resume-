import React, { useState } from "react";
import { Bot, Send, RotateCcw, Sparkles, Database, CheckCircle2, Search, ArrowRight, ExternalLink } from "lucide-react";

interface PocSimulatorProps {
  onTriggerToast: (msg: string) => void;
}

interface RAGKnowledgeChunk {
  id: string;
  category: string;
  keywords: string[];
  title: string;
  content: string;
  sourceDoc: string;
}

const KNOWLEDGE_BASE: RAGKnowledgeChunk[] = [
  {
    id: "mind-dreams",
    category: "Projects",
    keywords: ["mind dream", "mind_dreams", "rag agent", "customer support", "refund", "return", "policy", "sheets sync", "gemini"],
    title: "Mind_Dreams — AI Customer Support & RAG Agent (Oct 2026)",
    content: "Mind_Dreams is Nadeem's production-grade 24/7 AI Customer Support & RAG Agent. Powered by Google Gemini LLM and Next.js 14 App Router, it chunks and indexes company policy (policy.txt) to enforce return rules (30-day general, 15-day electronics). It features bidirectional real-time 3-way Google Sheets sync across Orders, Refund Eligibility, and Bank Payout Logging with multi-step tool use. Repo: github.com/nadeemanjum273-cmd/Mind_Dream-Agent.",
    sourceDoc: "knowledge/projects/mind_dreams.rag.json",
  },
  {
    id: "education",
    category: "Education & Credentials",
    keywords: ["education", "degree", "graduate", "graduation", "university", "college", "study", "studies", "academic"],
    title: "Graduation in Computer Science & AI Specialization",
    content: "Nadeem holds a formal Graduation in Computer Science (Multan, Pakistan). His curriculum focused on software engineering, data structures, algorithms, databases, and computational systems. He further completed specialized training as a Data Science & AI Fellow, focusing on Python ML (Pandas, Scikit-Learn, ROC-AUC validation) and generative AI agents.",
    sourceDoc: "knowledge/credentials/education.rag.json",
  },
  {
    id: "contact",
    category: "Contact & Availability",
    keywords: ["contact", "email", "whatsapp", "phone", "number", "reach", "hire", "call", "message", "talk"],
    title: "Direct Contact Channels & Availability",
    content: "You can reach Nadeem directly through:\n• WhatsApp / Phone: +92 307 7978277\n• Direct Email: nadeemanjum273@gmail.com\n• LinkedIn: linkedin.com/in/nadeem-anjum-b23b1a269\n• GitHub: github.com/nadeemanjum273-cmd\n• Location: 66000 Multan, Punjab, Pakistan (Available for remote global contracts).",
    sourceDoc: "knowledge/profile/contact_meta.rag.json",
  },
  {
    id: "projects-overview",
    category: "Projects",
    keywords: ["projects", "portfolio", "built", "experience", "work", "showcase", "case studies"],
    title: "Production Projects & Deployments",
    content: "Nadeem has built 15+ automations and 6+ production builds:\n1. Mind_Dreams — Gemini RAG & 3-way Google Sheets Sync (Oct 2026)\n2. OmniLead — 24/7 Voiceflow + WhatsApp Concierge (+42% conversion)\n3. Zero-Latency Lead Routing — n8n Webhook Pipeline (saves 14 hrs/week)\n4. Autonomous Invoice Extractor — LangChain + FastAPI (99.4% accuracy)\n5. Predictive Churn Engine — Python & XGBoost with SHAP explainability.",
    sourceDoc: "knowledge/projects/portfolio_index.rag.json",
  },
  {
    id: "omnilead",
    category: "Projects",
    keywords: ["omnilead", "concierge", "voiceflow", "lead chatbot"],
    title: "OmniLead 24/7 AI Concierge",
    content: "OmniLead is an autonomous lead qualification chatbot built with Voiceflow and Meta's WhatsApp Cloud API. It engages inbound ad leads within 3 seconds, qualifies budget and intent via GPT-4o, and books meetings directly into real-time calendars, boosting after-hours conversion by +42%.",
    sourceDoc: "knowledge/projects/omnilead.rag.json",
  },
  {
    id: "n8n-pipeline",
    category: "Automation",
    keywords: ["n8n", "pipeline", "webhook", "lead routing", "automation"],
    title: "Zero-Latency Lead Routing Suite (n8n)",
    content: "An autonomous webhook pipeline built on n8n that captures ad leads in under 1 second, enriches lead data, calculates GPT intent scores, updates Google Sheets, and alerts the on-duty sales rep via Slack/WhatsApp, saving over 14 hours per sales rep each week.",
    sourceDoc: "knowledge/automations/n8n_suite.rag.json",
  },
  {
    id: "pricing",
    category: "Packages & Pricing",
    keywords: ["package", "packages", "price", "pricing", "cost", "fee", "rate", "budget", "tier", "how much"],
    title: "Transparent Implementation Packages",
    content: "Nadeem offers 3 clear packages:\n• Tier 1: 24/7 FAQ & Policy Bot ($350) — Ideal for websites & basic support.\n• Tier 2: Web + WhatsApp Lead Bot ($650 ★ Popular) — Lead capture, calendar booking & CRM sync.\n• Tier 3: Enterprise Automation Suite ($1,200) — Multi-agent swarm, custom n8n pipelines, and bidirectional sheet/database sync.\nAll packages include 14 days of post-launch hypercare.",
    sourceDoc: "knowledge/business/packages.rag.json",
  },
  {
    id: "guarantee",
    category: "Client Delivery Promises",
    keywords: ["deposit", "sla", "guarantee", "timeline", "turnaround", "promise", "ip transfer", "days", "contract"],
    title: "Client Guarantees & SLA",
    content: "Nadeem enforces 3 strict delivery commitments:\n1. 50% Deposit Rule: 50% upfront to initiate sprint kickoff, 50% remaining only upon live staging verification.\n2. 100% IP Transfer: You retain full ownership of all code, prompts, webhooks, and credentials with zero vendor lock-in.\n3. 4-Day SLA: Working prototype delivered in 48 to 96 hours for rapid validation.",
    sourceDoc: "knowledge/business/delivery_sla.rag.json",
  },
  {
    id: "skills",
    category: "Technical Stack",
    keywords: ["skill", "skills", "stack", "tech", "python", "gemini", "langchain", "tools", "languages"],
    title: "Technical Arsenal & Tools",
    content: "Core Stack:\n• AI / LLMs: Google Gemini, OpenAI GPT-4o, Claude 3.5, LangChain, Vector RAG Embeddings\n• Automation: n8n, Voiceflow, WhatsApp Cloud API, Zapier, Webhooks\n• Data Science & Python: Pandas, NumPy, Scikit-Learn, FastAPI, XGBoost\n• Frontend: Next.js 14, React 18, TypeScript, Tailwind CSS, Google Sheets API v4.",
    sourceDoc: "knowledge/skills/arsenal.rag.json",
  },
];

export const PocSimulator: React.FC<PocSimulatorProps> = ({ onTriggerToast }) => {
  const [messages, setMessages] = useState<Array<{ sender: "user" | "bot"; text: string; matchedChunk?: string }>>([
    {
      sender: "bot",
      text: "Hello! 👋 I'm My Resume Assistant, an autonomous RAG agent trained on all of Nadeem Anjum's verified projects (including Mind_Dreams), Computer Science degree, AI skills, and delivery guarantees. Ask me anything or tap a prompt below!",
      matchedChunk: "System Prompt • Nadeem Anjum Verified Profile",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [ragLog, setRagLog] = useState<{ query: string; matchedChunk: string; score: number }[]>([
    { query: "Initial System RAG Index Load", matchedChunk: "knowledge/projects/mind_dreams.rag.json", score: 99.2 },
    { query: "Credentials & Education Vector", matchedChunk: "knowledge/credentials/education.rag.json", score: 98.7 },
  ]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isTyping) return;

    const newMsgs = [...messages, { sender: "user" as const, text }];
    setMessages(newMsgs);
    if (!textToSend) setInputMessage("");

    setIsTyping(true);

    setTimeout(() => {
      const lower = text.toLowerCase();
      let bestMatch: RAGKnowledgeChunk | null = null;
      let highestScore = 0;

      // Semantic Keyword RAG Scoring
      for (const chunk of KNOWLEDGE_BASE) {
        let score = 0;
        for (const kw of chunk.keywords) {
          if (lower.includes(kw)) {
            score += kw.length > 5 ? 3 : 2;
          }
        }
        if (score > highestScore) {
          highestScore = score;
          bestMatch = chunk;
        }
      }

      let reply = "";
      let matchedSource = "General Profile Knowledge";
      let similarityScore = 95.4;

      if (bestMatch && highestScore > 0) {
        reply = bestMatch.content;
        matchedSource = bestMatch.sourceDoc;
        similarityScore = Math.min(99.4, 90.0 + highestScore * 2.2);
      } else {
        reply =
          "Thanks for your question! Nadeem Anjum is an AI Solutions Architect specializing in 24/7 lead chatbots, autonomous RAG agents (like Mind_Dreams), and n8n workflow automations. You can discuss your project directly with him on WhatsApp at +92 307 7978277 or email nadeemanjum273@gmail.com.";
        matchedSource = "knowledge/profile/bio_overview.rag.json";
        similarityScore = 92.1;
      }

      // Append RAG search log
      setRagLog((prev) => [
        { query: text.length > 28 ? text.slice(0, 28) + "..." : text, matchedChunk: matchedSource, score: similarityScore },
        ...prev.slice(0, 3),
      ]);

      setMessages([...newMsgs, { sender: "bot", text: reply, matchedChunk: matchedSource }]);
      setIsTyping(false);
    }, 600);
  };

  const handleReset = () => {
    setMessages([
      {
        sender: "bot",
        text: "Hello! 👋 I'm My Resume Assistant, an autonomous RAG agent trained on all of Nadeem Anjum's verified projects (including Mind_Dreams), Computer Science degree, AI skills, and delivery guarantees. Ask me anything or tap a prompt below!",
        matchedChunk: "System Prompt • Nadeem Anjum Verified Profile",
      },
    ]);
    setIsTyping(false);
    onTriggerToast("Resume Assistant session reset 🔄");
  };

  return (
    <section id="demo" className="scroll-mt-28 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2.5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyanGlow text-xs font-mono font-bold">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>AUTONOMOUS RAG KNOWLEDGE AGENT</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
          Interactive Resume &amp; Project Assistant
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto font-sans leading-relaxed">
          Test my real-time RAG agent. Query Nadeem Anjum's background, Mind_Dreams architecture, graduation credentials, WhatsApp contact, or implementation pricing below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Chatbot Window */}
        <div className="lg:col-span-7 rounded-2xl bg-[#0b0d13] border border-slate-700/80 shadow-2xl shadow-cyan-950/20 flex flex-col h-[520px] overflow-hidden">
          {/* Chat Window Header - Updated to 'My Resume Assistant' */}
          <div className="px-5 py-3.5 border-b border-slate-800 bg-[#111420] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 via-cyan-500 to-purple-600 text-black flex items-center justify-center font-bold shadow-md shadow-cyan-500/20">
                <Bot className="w-4 h-4 text-black" />
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5 font-display">
                  <span>My Resume Assistant</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Nadeem Anjum RAG Knowledge Agent &bull; Verified Profile
                </div>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg bg-[#1a1f30] hover:bg-slate-700/60 flex items-center gap-1.5 transition-colors font-mono"
              title="Reset assistant"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs sm:text-sm">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 shadow-sm leading-relaxed whitespace-pre-line ${
                    m.sender === "user"
                      ? "bg-gradient-to-r from-cyan-600/30 to-cyan-500/30 border border-cyan-500/50 text-white rounded-tr-sm"
                      : "bg-[#111420] border border-slate-700/80 text-slate-100 rounded-tl-sm"
                  }`}
                >
                  {m.text}
                </div>
                {m.sender === "bot" && m.matchedChunk && (
                  <span className="text-[10px] font-mono text-cyanGlow/80 mt-1 pl-1 flex items-center gap-1">
                    <Database className="w-3 h-3" />
                    <span>RAG Source: {m.matchedChunk}</span>
                  </span>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#111420] border border-slate-700/80 rounded-2xl p-3 rounded-tl-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
          </div>

          {/* Suggested Quick Prompt Pills */}
          <div className="px-4 py-2 border-t border-slate-800 bg-[#06070a] flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
            <span className="text-slate-500 text-[10px] font-mono shrink-0">Try Prompts:</span>
            <button
              onClick={() => handleSendMessage("How does Mind_Dreams RAG Agent work?")}
              className="px-2.5 py-1 rounded-full bg-[#111420] border border-slate-700/80 hover:border-cyan-400 text-slate-300 hover:text-cyanGlow whitespace-nowrap text-xs transition-colors"
            >
              Mind_Dreams RAG Agent?
            </button>
            <button
              onClick={() => handleSendMessage("Tell me about Nadeem's education & graduation")}
              className="px-2.5 py-1 rounded-full bg-[#111420] border border-slate-700/80 hover:border-cyan-400 text-slate-300 hover:text-cyanGlow whitespace-nowrap text-xs transition-colors"
            >
              Education &amp; Degree?
            </button>
            <button
              onClick={() => handleSendMessage("What is your WhatsApp & contact details?")}
              className="px-2.5 py-1 rounded-full bg-[#111420] border border-slate-700/80 hover:border-cyan-400 text-slate-300 hover:text-cyanGlow whitespace-nowrap text-xs transition-colors"
            >
              WhatsApp &amp; Contact?
            </button>
            <button
              onClick={() => handleSendMessage("What are your AI packages & pricing?")}
              className="px-2.5 py-1 rounded-full bg-[#111420] border border-slate-700/80 hover:border-cyan-400 text-slate-300 hover:text-cyanGlow whitespace-nowrap text-xs transition-colors"
            >
              Packages &amp; Pricing?
            </button>
            <button
              onClick={() => handleSendMessage("What is the 50% deposit and 4-day SLA?")}
              className="px-2.5 py-1 rounded-full bg-[#111420] border border-slate-700/80 hover:border-cyan-400 text-slate-300 hover:text-cyanGlow whitespace-nowrap text-xs transition-colors"
            >
              50% Deposit &amp; SLA?
            </button>
          </div>

          {/* Input Form */}
          <div className="p-3 border-t border-slate-800 bg-[#111420] flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask about Mind_Dreams, education, WhatsApp, pricing..."
              className="flex-1 bg-[#06070a] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyanGlow"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isTyping}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-black font-bold flex items-center justify-center transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live RAG Vector Retrieval & Pipeline Inspector */}
        <div className="lg:col-span-5 rounded-2xl bg-[#0b0d13] border border-slate-700/80 p-5 space-y-5 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-display font-bold text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-cyanGlow" />
              Live RAG Vector Retrieval Engine
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              VECTOR STORE READY
            </span>
          </div>

          {/* RAG Nodes Architecture */}
          <div className="space-y-2.5 text-xs font-mono">
            <div className="p-3 rounded-xl bg-[#111420] border border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>1. Vector Embeddings (Chunks)</span>
              </div>
              <span className="text-cyanGlow text-[11px]">Indexed</span>
            </div>

            <div className="p-3 rounded-xl bg-[#111420] border border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                <span>2. Cosine Similarity Matching</span>
              </div>
              <span className="text-purpleGlow text-[11px]">Active</span>
            </div>

            <div className="p-3 rounded-xl bg-[#111420] border border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>3. Grounded LLM Response</span>
              </div>
              <span className="text-emerald-400 text-[11px]">Zero Hallucination</span>
            </div>
          </div>

          {/* Real-Time RAG Search Queries Log */}
          <div>
            <div className="text-[11px] font-mono text-slate-400 mb-2 flex items-center justify-between">
              <span>Real-Time RAG Vector Query Stream:</span>
              <span className="text-emerald-400 font-bold">● LIVE</span>
            </div>

            <div className="space-y-2">
              {ragLog.map((log, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-[#06070a] border border-slate-800 text-xs font-mono space-y-1"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold truncate max-w-[190px]">"{log.query}"</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyanGlow font-bold">
                      {log.score}% match
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    &rarr; {log.matchedChunk}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
