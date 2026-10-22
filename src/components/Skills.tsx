import React from "react";
import { Cpu, Sparkles, GitMerge, BarChart3, CheckCircle2 } from "lucide-react";

export const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: "Generative AI & LLMs",
      icon: Sparkles,
      color: "text-cyanGlow",
      barColor: "bg-cyan-400",
      skills: [
        { name: "Voiceflow / Botpress Conversational AI", level: "95%" },
        { name: "Prompt Engineering & RAG Architecture", level: "92%" },
        { name: "Autonomous ReAct Multi-Step Agents", level: "88%" },
        { name: "ChromaDB & Vector Embeddings", level: "90%" },
      ],
    },
    {
      title: "Automation & n8n Workflows",
      icon: GitMerge,
      color: "text-amber-400",
      barColor: "bg-amber-400",
      skills: [
        { name: "n8n Multi-App Node Pipelines", level: "96%" },
        { name: "Webhooks, REST APIs & JSON Parsing", level: "92%" },
        { name: "WhatsApp Cloud API & Slack Webhooks", level: "90%" },
        { name: "CRM Integrations (HubSpot, Sheets, Airtable)", level: "94%" },
      ],
    },
    {
      title: "Machine Learning & Python Moat",
      icon: BarChart3,
      color: "text-purpleGlow",
      barColor: "bg-purple-400",
      skills: [
        { name: "Python, Pandas & NumPy Data Pipelines", level: "95%" },
        { name: "Scikit-Learn Supervised Modeling", level: "92%" },
        { name: "Decision Trees, KNN & Regression", level: "90%" },
        { name: "ROC-AUC Evaluation & Streamlit Portals", level: "94%" },
      ],
    },
  ];

  return (
    <section id="skills" className="scroll-mt-28 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2.5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
          <Cpu className="w-3.5 h-3.5" />
          <span>VERIFIED TECHNICAL PROFICIENCIES</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
          Full-Stack AI &amp; Data Science Arsenal
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto font-sans leading-relaxed">
          Curated skillset refined across enterprise AI workflows and verified in production client builds.
        </p>
      </div>

      {/* Grid of 3 Skill Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {skillCategories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div
              key={idx}
              className="rounded-2xl bg-[#0b0d13] border border-slate-700/80 p-6 space-y-5 hover:border-slate-600 transition-all shadow-xl shadow-cyan-950/10"
            >
              <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
                <div className={`p-2.5 rounded-xl bg-[#111420] border border-slate-800 ${cat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-white text-base">
                  {cat.title}
                </h3>
              </div>

              <div className="space-y-4 text-xs font-mono">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-1.5">
                    <div className="flex justify-between text-slate-300">
                      <span className="truncate pr-2 font-sans text-xs">{skill.name}</span>
                      <span className={cat.color}>{skill.level}</span>
                    </div>
                    <div className="h-2 bg-[#06070a] rounded-full overflow-hidden p-[1px] border border-slate-800">
                      <div
                        className={`h-full ${cat.barColor} rounded-full transition-all duration-1000 shadow-sm`}
                        style={{ width: skill.level }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
