import React, { useState } from "react";
import { Layers, X, ExternalLink, CheckCircle2, ArrowRight, Github } from "lucide-react";
import { TiltCard } from "./TiltCard";

export interface Project {
  id: string;
  title: string;
  category: "chatbot" | "automation" | "agent" | "ml";
  tag: string;
  desc: string;
  metrics: string;
  stack: string[];
  repoUrl?: string;
  challenge?: string;
  solution?: string;
  architecture?: string[];
}

const projects: Project[] = [
  {
    id: "mind-dreams",
    title: "Mind_Dreams AI Customer Support & RAG Agent",
    category: "agent",
    tag: "Gemini Powered + RAG Vector Index",
    desc: "Autonomous 24/7 customer support agent indexing company policy with Google Gemini and 3-way real-time Google Sheets sync for orders, refund eligibility, and bank payout logging.",
    metrics: "100% Policy Compliance & Live Sync",
    stack: ["Next.js 14", "Google Gemini AI", "LangChain RAG", "Google Sheets API v4"],
    repoUrl: "https://github.com/nadeemanjum273-cmd/Mind_Dream-Agent",
    challenge: "Customer support operations faced delays and human error enforcing strict return policies (30-day for general items, 15-day for electronics) while manually cross-referencing orders and payout records.",
    solution: "Engineered Mind_Dreams using Next.js App Router and Gemini function calling. The agent chunks and indexes company policies (policy.txt) and syncs live across 3 Google Sheets: Orders, Refund Eligibility, and Bank Details.",
    architecture: [
      "1. RAG Policy Vector Indexing (policy.txt chapter chunking)",
      "2. Portion 1 (Orders): Product lookup & placing customer orders",
      "3. Portion 2 (Refunds): Automated 30/15-day purchase validation",
      "4. Portion 3 (Bank Details): Secure payout logging for approved returns",
    ],
  },
  {
    id: "omnilead",
    title: "OmniLead 24/7 AI Concierge",
    category: "chatbot",
    tag: "Voiceflow + WhatsApp Cloud API",
    desc: "Trained on business FAQs and real-time calendars to qualify incoming leads and schedule consultations after hours.",
    metrics: "+42% After-Hours Conversion",
    stack: ["Voiceflow", "OpenAI GPT-4o", "Google Calendar API", "Meta WhatsApp API"],
    challenge: "Client was missing over 45% of inbound ad leads arriving between 6 PM and 8 AM, resulting in lost deals to fast-responding competitors.",
    solution: "Designed a conversational AI concierge that engages leads in under 3 seconds, qualifies budget & timeline, and books meetings directly into Calendly/Google Calendar.",
    architecture: ["Inbound Webhook Listener", "Intent Classification & Entity Extractor", "Dynamic Slot Booking Node", "Instant SMS/WhatsApp Confirmation"],
  },
  {
    id: "n8nflow",
    title: "Zero-Latency Lead Routing Suite",
    category: "automation",
    tag: "n8n Webhook Pipeline",
    desc: "Captures ad leads instantly, runs GPT intent scoring, syncs to Google Sheets, and sends instant Slack/WhatsApp alerts.",
    metrics: "14 hrs/week Saved per Rep",
    stack: ["n8n", "Webhooks", "Slack API", "Google Sheets API"],
    challenge: "Sales reps were manually copy-pasting lead forms from Meta Ads into CRM spreadsheets, causing 30+ minute follow-up delays.",
    solution: "Built a fully autonomous n8n webhook workflow that routes leads in <1 second, enriches lead data, calculates intent score, and pings the on-duty rep via Slack.",
    architecture: ["Meta Webhook Trigger", "Data Normalization & Deduplication", "GPT Scoring Node", "Multi-Channel Alert Dispatcher"],
  },
  {
    id: "ecommerce",
    title: "Autonomous Store Support Agent",
    category: "agent",
    tag: "ReAct Multi-Step Loop",
    desc: "Resolves shipping tracking and return ticket requests autonomously via Shopify API with policy compliance verification.",
    metrics: "68% First-Touch Resolution",
    stack: ["Python", "LangChain", "Shopify API", "FastAPI"],
    challenge: "Support team overwhelmed during peak shopping holidays with repetitive 'Where is my order?' and return status tickets.",
    solution: "Created an autonomous ReAct agent equipped with Shopify read/write tools to verify order authenticity, generate return labels, and answer customer queries.",
    architecture: ["Customer Inquiry Webhook", "ReAct Tool Execution Loop", "Shopify Admin API Integration", "Escalation Handoff Protocol"],
  },
  {
    id: "ragengine",
    title: "Document Intelligence RAG Engine",
    category: "agent",
    tag: "ChromaDB + Embeddings",
    desc: "Parses dense 300+ page enterprise compliance PDFs into vector embeddings with sub-3-second cited query responses.",
    metrics: "Sub-3s Cited Accuracy",
    stack: ["Python", "ChromaDB", "LangChain", "OpenAI Embeddings"],
    challenge: "Compliance officers spent 4+ hours per audit manually cross-referencing regional regulatory PDFs and safety manuals.",
    solution: "Engineered a chunked semantic retrieval augmented generation (RAG) system with hybrid keyword + dense vector search and precise page citation.",
    architecture: ["Unstructured PDF Parser", "Recursive Character Chunking", "ChromaDB Vector Store", "Contextual LLM Citation Generator"],
  },
  {
    id: "dashboard",
    title: "Predictive Lead Scoring Portal",
    category: "ml",
    tag: "Streamlit + Scikit-Learn",
    desc: "Executive analytics portal utilizing supervised ML algorithms to predict deal close likelihood across inbound pipelines.",
    metrics: "3.1x Close Rate on Tier-1",
    stack: ["Streamlit", "Scikit-Learn", "Python", "Pandas"],
    challenge: "Sales teams spent equal time on low-probability prospects, neglecting high-value opportunities.",
    solution: "Trained Random Forest and Logistic Regression classifiers on historical deal telemetry to calculate probabilistic win rates.",
    architecture: ["Feature Preprocessing Pipeline", "Supervised Scikit-Learn Estimator", "Interactive Streamlit Dashboard", "Batch Prediction API"],
  },
  {
    id: "churn",
    title: "Customer Churn Prediction Engine",
    category: "ml",
    tag: "Decision Trees & KNN",
    desc: "Analyzes usage telemetry to predict customer churn risks 30 days ahead using ROC-AUC optimized classification models.",
    metrics: "89.4% Precision on At-Risk",
    stack: ["Python", "Scikit-Learn", "Pandas", "Matplotlib"],
    challenge: "Subscription cancellations were detected only after customers failed to renew, leaving no time for retention interventions.",
    solution: "Developed an early-warning telemetry scoring model that flags customers exhibiting usage deceleration 30 days before renewal.",
    architecture: ["Behavioral Telemetry Aggregator", "Imbalanced Data Resampling (SMOTE)", "ROC-AUC Optimized Classifier", "Automated Retention Trigger"],
  },
];

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");
  const [activeModal, setActiveModal] = useState<Project | null>(null);

  const categories = [
    { label: "All Projects", value: "all" },
    { label: "AI Agents", value: "agent" },
    { label: "Chatbots", value: "chatbot" },
    { label: "Automations", value: "automation" },
    { label: "Machine Learning", value: "ml" },
  ];

  const filteredProjects = projects.filter(
    (p) => filter === "all" || p.category === filter
  );

  return (
    <section id="projects" className="scroll-mt-28 space-y-8">
      {/* Section Header & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 border-b border-slate-800/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyanGlow text-xs font-mono mb-2.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>VERIFIED PORTFOLIO DELIVERABLES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Curated Production Deployments
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-3.5 py-2 rounded-xl transition-all duration-200 ${
                filter === cat.value
                  ? "bg-gradient-to-r from-cyan-400 to-cyan-500 text-black font-extrabold shadow-md shadow-cyan-500/25 scale-105"
                  : "bg-[#111420] text-slate-200 hover:text-white border border-slate-700/80 hover:border-slate-500 font-semibold"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid with Ultra-HD Crystal Clear Typography */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <TiltCard
            key={project.id}
            className="rounded-2xl h-full"
            maxTilt={7}
            scale={1.02}
            glowColor="rgba(0, 242, 254, 0.22)"
          >
            <div className="rounded-2xl bg-[#0b0d13] border border-slate-700 p-6 flex flex-col justify-between hover:border-cyan-400 transition-colors h-full space-y-5 shadow-xl shadow-cyan-950/20 group">
              <div className="space-y-3.5">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-cyanGlow px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-400/50 font-bold">
                    {project.tag}
                  </span>
                  <span className="text-[11px] text-slate-300 font-bold uppercase tracking-wider">{project.category}</span>
                </div>

                {/* Ultra-Sharp High-Contrast Header */}
                <h3 className="text-lg sm:text-xl font-display font-extrabold text-white group-hover:text-cyanGlow transition-colors tracking-tight">
                  {project.title}
                </h3>

                {/* Crystal-Clear Readable Description */}
                <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-sans font-normal">
                  {project.desc}
                </p>

                {/* Quantified Metric Badge - Razor Sharp */}
                <div className="p-3 rounded-xl bg-[#06070a] border border-emerald-500/40 text-xs font-mono text-emerald-300 font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Verified ROI: {project.metrics}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-xs">
                <div className="text-slate-300 font-mono text-xs font-medium truncate max-w-[180px]">
                  {project.stack.slice(0, 2).join(" • ")}...
                </div>

                <button
                  onClick={() => setActiveModal(project)}
                  className="text-cyanGlow hover:text-white font-bold font-mono text-xs sm:text-sm flex items-center gap-1.5 transition-colors"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>

      {/* Case Study Detail Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#0b0d13] border border-slate-700 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl shadow-cyan-950/50 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 text-slate-300 hover:text-white p-2 rounded-xl bg-[#111420] border border-slate-700 hover:border-slate-500 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyanGlow px-3 py-1 rounded-lg bg-cyan-950/80 border border-cyan-400/50">
                {activeModal.tag}
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white pt-1">
                {activeModal.title}
              </h3>
            </div>

            {/* Verified ROI Callout */}
            <div className="p-3.5 rounded-xl bg-[#06070a] border border-emerald-500/40 text-xs text-emerald-300 font-mono flex items-center justify-between font-bold">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verified Result: {activeModal.metrics}</span>
              </div>
              {activeModal.repoUrl && (
                <a
                  href={activeModal.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-lg bg-cyan-500/20 text-cyanGlow hover:bg-cyan-500/30 border border-cyan-500/40 flex items-center gap-1.5 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository ↗</span>
                </a>
              )}
            </div>

            {/* Challenge & Solution */}
            {activeModal.challenge && (
              <div className="space-y-1.5 text-xs">
                <div className="font-mono text-slate-300 font-bold uppercase tracking-wider text-xs">
                  The Challenge
                </div>
                <p className="text-slate-100 text-sm leading-relaxed bg-[#111420] p-3.5 rounded-xl border border-slate-800">
                  {activeModal.challenge}
                </p>
              </div>
            )}

            {activeModal.solution && (
              <div className="space-y-1.5 text-xs">
                <div className="font-mono text-slate-300 font-bold uppercase tracking-wider text-xs">
                  The Solution Architecture
                </div>
                <p className="text-slate-100 text-sm leading-relaxed bg-[#111420] p-3.5 rounded-xl border border-slate-800">
                  {activeModal.solution}
                </p>
              </div>
            )}

            {/* Key Pipeline Architecture Steps */}
            {activeModal.architecture && (
              <div className="space-y-1.5">
                <div className="font-mono text-slate-300 font-bold uppercase tracking-wider text-xs">
                  Engineered Workflow Nodes
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  {activeModal.architecture.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-[#06070a] border border-slate-800 text-slate-200 flex items-center gap-2 font-medium"
                    >
                      <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0"></span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Full Tech Stack */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <div className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider">
                Production Stack &amp; APIs:
              </div>
              <div className="flex flex-wrap gap-2">
                {activeModal.stack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-[#111420] border border-slate-700 text-xs font-mono font-semibold text-cyan-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
