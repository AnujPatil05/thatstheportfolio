import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowUpRight, ArrowRight, Mail, Github, Linkedin, ExternalLink,
  Terminal, Cpu, ShieldCheck, Database, Layers,
  FileText, CheckCircle2, ChevronRight, Award, Play,
  RefreshCw, Send, Check, Copy, Download
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { Project } from '../../types';
import {
  DoodleArrow, DoodleUnderline, DoodleCircle,
  DoodleTape, DoodleStamp, DoodleCheck, DoodleDatabase, DoodleCpu
} from '../common/DoodleSVGs';
import { DoodlyThemeSwitch } from '../common/DoodlyThemeSwitch';
import { ResumeModal } from '../common/ResumeModal';

interface IterationOneProps {
  onOpenProject: (project: Project) => void;
  onOpenContact: () => void;
  onOpenResume?: () => void;
}

export const IterationOne: React.FC<IterationOneProps> = ({ onOpenProject, onOpenContact, onOpenResume }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('doodle_dark_mode') === 'true';
    } catch {
      return false;
    }
  });

  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const handleOpenResume = () => {
    setIsResumeOpen(true);
    onOpenResume?.();
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('doodle_dark_mode', String(next));
      } catch { }
      return next;
    });
  };

  const [activeSkillCategory, setActiveSkillCategory] = useState<string>('all');

  // Simulator 1 State: CodeEcoScan AST Carbon Engine
  const [selectedSnippet, setSelectedSnippet] = useState<'nested' | 'recursion' | 'vectorized'>('nested');
  const [hardwareProfile, setHardwareProfile] = useState<'laptop' | 'cloud' | 'gpu'>('cloud');

  // Simulator 2 State: Agent Sentinel Claim Verifier
  const [selectedClaim, setSelectedClaim] = useState<number>(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [pipelineStep, setPipelineStep] = useState<number>(0);

  // Ping / Instant Note State
  const [quickNote, setQuickNote] = useState('');
  const [noteSent, setNoteSent] = useState(false);
  const [lastDispatchedNote, setLastDispatchedNote] = useState<string | null>(null);

  const sampleClaims = [
    {
      claim: "Breakthrough solid-state battery doubles EV range in verified testing.",
      source: "Tech Journal Wire",
      verdict: "VERIFIED_ACCURATE",
      confidence: 94.2,
      gdeltHits: 48,
    },
    {
      claim: "Global undersea telecomm cables cut simultaneously across Pacific.",
      source: "Viral Social Post",
      verdict: "MISINFORMATION_FLAGGED",
      confidence: 97.8,
      gdeltHits: 2,
    },
    {
      claim: "Municipal transit shifts 40% of fleet to hydrogen fuel cells by Q4.",
      source: "Local Press Release",
      verdict: "HUMAN_REVIEW_QUEUE",
      confidence: 61.4,
      gdeltHits: 7,
    },
  ];

  const codeSnippets = {
    nested: {
      name: "Triply Nested Matrix Loop",
      code: `def process_workload(matrix):\n    # AST Depth 3 - High loop energy penalty\n    for i in range(len(matrix)):\n        for j in range(len(matrix[0])):\n            for k in range(100):\n                compute_heavy_cell(matrix[i][j])`,
      riskScore: 88,
      energyFactor: 3.8,
      findings: ["Nested For Loop at AST depth 3 (High CPU cycle penalty)", "Repeated heap memory lookups", "Potential cache eviction storm"],
    },
    recursion: {
      name: "Unmemoized Recursive Tree",
      code: `def recursive_tree_eval(node):\n    # AST Call Stack branch expansion\n    if not node: return 0\n    return 1 + recursive_tree_eval(node.left) \\\n             + recursive_tree_eval(node.right)`,
      riskScore: 74,
      energyFactor: 2.6,
      findings: ["Unbounded call-stack expansion", "Zero memoization table detected", "Exponential frame allocation"],
    },
    vectorized: {
      name: "Optimized NumPy Vectorization",
      code: `import numpy as np\ndef vectorized_batch(matrix):\n    # AST Optimized C-level contiguous buffer\n    arr = np.ascontiguousarray(matrix)\n    return np.einsum('ij,ij->i', arr, arr)`,
      riskScore: 18,
      energyFactor: 0.4,
      findings: ["Contiguous memory buffer used", "SIMD vectorized instructions dispatched", "Minimal Python GIL overhead"],
    },
  };

  const hardwareWattage = {
    laptop: { watts: 25, label: "Laptop (Apple Silicon / Intel i7)" },
    cloud: { watts: 85, label: "Cloud VM (AWS c6i.2xlarge)" },
    gpu: { watts: 350, label: "GPU Server (NVIDIA A10G)" },
  };

  const currentSnippetData = codeSnippets[selectedSnippet];
  const currentWattage = hardwareWattage[hardwareProfile];
  const calculatedCarbon = (
    (currentWattage.watts * currentSnippetData.energyFactor * 0.475 * 24) / 1000
  ).toFixed(2);

  const runClaimPipeline = () => {
    setIsVerifying(true);
    setPipelineStep(1);

    setTimeout(() => setPipelineStep(2), 900);
    setTimeout(() => setPipelineStep(3), 2000);
    setTimeout(() => {
      setPipelineStep(4);
      setIsVerifying(false);
    }, 3200);
  };

  // Real Ping Functionality: triggers mailto dispatch, copies to clipboard & presents confirmation
  const handleSendQuickNote = (e: React.FormEvent) => {
    e.preventDefault();
    const message = quickNote.trim();
    if (!message) return;

    setNoteSent(true);
    setLastDispatchedNote(message);

    // Formulate real mailto ping to anuj05patil@gmail.com
    const subject = encodeURIComponent(`Quick Ping from Portfolio Visitor`);
    const body = encodeURIComponent(`Hello Anuj,\n\n${message}\n\n— Sent from portfolio instant ping`);
    const mailtoUri = `mailto:${PORTFOLIO_DATA.contact.email}?subject=${subject}&body=${body}`;

    try {
      window.location.href = mailtoUri;
    } catch {
      window.open(mailtoUri, '_blank');
    }

    // Also copy to clipboard for convenience
    try {
      navigator.clipboard.writeText(`Ping to Anuj Patil (${PORTFOLIO_DATA.contact.email}):\n${message}`);
    } catch { }

    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.7 },
      colors: isDarkMode ? ['#EED3BA', '#4B262F', '#EED3BA'] : ['#49B6E5', '#263D5B', '#16A34A'],
    });

    setTimeout(() => {
      setQuickNote('');
      setNoteSent(false);
    }, 3000);
  };

  return (
    <div className={`min-h-screen relative transition-colors duration-300 font-sans ${isDarkMode
      ? 'bg-blueprint-dark text-[#EED3BA] selection:bg-[#EED3BA]/30'
      : 'bg-blueprint text-[#111827] selection:bg-[#49B6E5]/30'
      }`}>
      <main className="w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 pt-8 sm:pt-12 pb-24 space-y-16 sm:space-y-20">

        {/* HERO SECTION — Dispersed, Human, Hand-Crafted */}
        <header className="relative pt-4">
          {/* Top Bar with Tape, headline "portfolio", available badge & unique dark mode switch */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            {/* Left: Tape + Headline "portfolio" in doodle text */}
            <div className="flex items-center gap-3">
              <DoodleTape className="w-16 sm:w-20 h-5" />
              <span className={`font-delius text-2xl sm:text-3xl font-bold tracking-wide transition-colors ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#263D5B]'
                }`}>
                portfolio
              </span>
            </div>

            {/* Right: Available for SDE / AI Roles badge + Unique Dark Mode Doodly Switch */}
            <div className="flex items-center gap-3">
              {/* Available for SDE / AI Roles - doodly font, doodly textfield with bright highlight */}
              <div className={`px-3.5 py-1.5 rounded-xl border-2 transition-all doodle-border-sm rotate-[-0.5deg] ${isDarkMode
                ? 'bg-[#EED3BA] border-[#EED3BA] text-[#151311] shadow-[2px_2px_0px_0px_#4B262F]'
                : 'bg-[#FEF08A] border-2 border-[#263D5B] text-[#263D5B] shadow-[2px_2px_0px_0px_#263D5B]'
                }`}>
                <span className="font-delius text-sm sm:text-base font-bold tracking-wide">
                  Available for SDE / AI Roles
                </span>
              </div>

              {/* Unique Dark Mode Doodly Switch */}
              <DoodlyThemeSwitch
                isDarkMode={isDarkMode}
                onToggle={toggleDarkMode}
              />
            </div>
          </div>

          <div className="relative">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="inline-block relative">
                <h1 className={`font-delius text-5xl sm:text-7xl font-extrabold tracking-tight leading-none transition-colors ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#263D5B]'
                  }`}>
                  {PORTFOLIO_DATA.name}
                </h1>
                {/* Underline doodle sketch */}
                <DoodleUnderline className="w-full h-4 mt-1" color={isDarkMode ? '#EED3BA' : '#49B6E5'} />
              </div>

              {/* Hand-drawn arrow note */}
              <div className="hidden sm:flex items-center gap-2 self-start lg:self-auto">
                <span className={`font-delius text-sm sm:text-base font-bold rotate-[-2deg] px-3 py-1 border border-dashed rounded transition-colors ${isDarkMode
                  ? 'text-[#EED3BA] bg-[#4B262F]/90 border-[#EED3BA]/60'
                  : 'text-[#263D5B] bg-white/90 border-[#49B6E5]'
                  }`}>
                  production microservices &amp; RAG pipelines
                </span>
                <DoodleArrow className="w-12 h-6" color={isDarkMode ? '#EED3BA' : '#49B6E5'} direction="curved" />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              {/* Full-Stack & AI Systems Engineer in doodle font */}
              <span className={`px-3.5 py-1 border-2 rounded-full font-delius text-base sm:text-lg font-bold transition-colors ${isDarkMode
                ? 'bg-[#4B262F] border-[#EED3BA] text-[#EED3BA] shadow-[2px_2px_0px_0px_#EED3BA]'
                : 'bg-white border-[#263D5B] text-[#263D5B] doodle-shadow-sm'
                }`}>
                {PORTFOLIO_DATA.title}
              </span>
              <DoodleStamp text={PORTFOLIO_DATA.defaultSkill} color={isDarkMode ? '#EED3BA' : '#16A34A'} />
              {/* B.Tech IT · University of Mumbai in doodle font */}
              <span className={`font-delius text-sm sm:text-base font-bold ${isDarkMode ? 'text-[#EED3BA]/90' : 'text-[#263D5B]'
                }`}>
                B.Tech IT · University of Mumbai
              </span>
            </div>
          </div>

          {/* Intro Paragraph & Quick Connectivity Card spanning wide screen */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              <p className={`text-xl sm:text-2xl font-light leading-relaxed font-sans transition-colors ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#263D5B]'
                }`}>
                {PORTFOLIO_DATA.summary}
              </p>

              {/* Resume Preview Actions Under Summary */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleOpenResume}
                  className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-delius text-base sm:text-lg font-bold transition-all cursor-pointer group ${isDarkMode
                    ? 'bg-[#EED3BA] text-[#151311] hover:bg-[#EED3BA]/90 shadow-[3px_3px_0px_0px_#4B262F]'
                    : 'bg-[#49B6E5] text-[#263D5B] hover:bg-[#3FA2CD] doodle-shadow'
                    }`}
                  aria-label="Preview Anuj Patil Resume"
                >
                  <FileText className="w-5 h-5 group-hover:rotate-6 transition-transform" />
                  <span>Preview Resume</span>
                  <span className={`text-xs px-2 py-0.5 rounded-md font-mono ${isDarkMode ? 'bg-[#151311]/20 text-[#151311]' : 'bg-white/50 text-[#263D5B]'
                    }`}>
                    PDF
                  </span>
                </button>

                <a
                  href="/resume.pdf"
                  download="Anuj_Patil_Resume.pdf"
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-delius text-sm sm:text-base font-bold border-2 transition-colors ${isDarkMode
                    ? 'border-[#EED3BA]/50 text-[#EED3BA] hover:bg-[#4B262F]'
                    : 'border-[#263D5B]/30 text-[#263D5B] hover:bg-white doodle-shadow-sm'
                    }`}
                  title="Direct Download resume.pdf"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>

            {/* Quick Actions / Links */}
            <div className="lg:col-span-4 w-full">
              <div className={`p-5 border-2 rounded-2xl doodle-border-sm relative transition-colors ${isDarkMode
                ? 'bg-[#4B262F] border-[#EED3BA] shadow-[3px_4px_0px_0px_#EED3BA]'
                : 'bg-white border-[#263D5B] doodle-shadow'
                }`}>
                {/* Quick Connectivity in doodle font */}
                <span className={`text-base font-delius block mb-2.5 font-bold ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#263D5B]'
                  }`}>
                  Quick Connectivity
                </span>

                <div className="flex flex-col gap-2.5">
                  {/* Connect with Anuj in doodle font */}
                  <button
                    onClick={onOpenContact}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl font-delius text-sm sm:text-base font-bold transition-all cursor-pointer ${isDarkMode
                      ? 'bg-[#151311] border border-[#EED3BA] text-[#EED3BA] shadow-[2px_2px_0px_0px_#EED3BA] hover:bg-[#151311]/80'
                      : 'bg-[#263D5B] text-white hover:bg-[#1E3048] doodle-shadow-sm'
                      }`}
                  >
                    <span>Connect with Anuj</span>
                    <Mail className="w-4 h-4" color={isDarkMode ? '#EED3BA' : '#49B6E5'} />
                  </button>
                  <div className="flex items-center gap-2">
                    {/* GitHub in doodle font */}
                    <a
                      href={PORTFOLIO_DATA.contact.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 border rounded-xl text-xs sm:text-sm font-delius font-bold transition-colors ${isDarkMode
                        ? 'bg-[#151311] border-[#EED3BA]/40 text-[#EED3BA] hover:border-[#EED3BA]'
                        : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-800'
                        }`}
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                    {/* LinkedIn in doodle font */}
                    <a
                      href={PORTFOLIO_DATA.contact.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 border rounded-xl text-xs sm:text-sm font-delius font-bold transition-colors ${isDarkMode
                        ? 'bg-[#151311] border-[#EED3BA]/40 text-[#EED3BA] hover:border-[#EED3BA]'
                        : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-800'
                        }`}
                    >
                      <Linkedin className="w-3.5 h-3.5" color={isDarkMode ? '#EED3BA' : '#49B6E5'} />
                      <span>LinkedIn</span>
                    </a>
                  </div>

                  {/* Resume Quick Access */}
                  <button
                    onClick={handleOpenResume}
                    className={`w-full flex items-center justify-between px-3.5 py-2 border rounded-xl text-xs sm:text-sm font-delius font-bold transition-all cursor-pointer ${isDarkMode
                      ? 'bg-[#151311] border-[#EED3BA]/40 text-[#EED3BA] hover:border-[#EED3BA]'
                      : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-[#263D5B]'
                      }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" color={isDarkMode ? '#EED3BA' : '#49B6E5'} />
                      <span>Resume Preview</span>
                    </span>
                    <span className="text-[10px] font-mono opacity-70">resume.pdf</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* METRICS STRIP — Key Production Benchmarks (Font-sans summary font type) */}
        <section className="relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className={`p-5 sm:p-6 border-2 rounded-2xl relative overflow-hidden transition-colors ${isDarkMode
              ? 'bg-[#4B262F] border-[#EED3BA] shadow-[2px_2px_0px_0px_#EED3BA]'
              : 'bg-white border-[#263D5B] doodle-shadow-sm'
              }`}>
              <span className={`font-sans text-3xl sm:text-4xl font-extrabold ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#263D5B]'}`}>~70%</span>
              <span className={`block text-xs sm:text-sm font-sans font-medium mt-1 ${isDarkMode ? 'text-[#EED3BA]/80' : 'text-gray-600'}`}>p95 Latency Cut</span>
              <span className={`text-xs font-sans font-semibold mt-0.5 block ${isDarkMode ? 'text-[#EED3BA]/60' : 'text-[#49B6E5]'}`}>Redis caching at Codologs</span>
            </div>

            <div className={`p-5 sm:p-6 border-2 rounded-2xl relative overflow-hidden transition-colors ${isDarkMode
              ? 'bg-[#4B262F] border-[#EED3BA] shadow-[2px_2px_0px_0px_#EED3BA]'
              : 'bg-white border-[#263D5B] doodle-shadow-sm'
              }`}>
              <span className={`font-sans text-3xl sm:text-4xl font-extrabold ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#16A34A]'}`}>&lt;4s</span>
              <span className={`block text-xs sm:text-sm font-sans font-medium mt-1 ${isDarkMode ? 'text-[#EED3BA]/80' : 'text-gray-600'}`}>Misinformation Verdict</span>
              <span className={`text-xs font-sans font-semibold mt-0.5 block ${isDarkMode ? 'text-[#EED3BA]/60' : 'text-gray-500'}`}>Agent Sentinel / RoBERTa</span>
            </div>

            <div className={`p-5 sm:p-6 border-2 rounded-2xl relative overflow-hidden transition-colors ${isDarkMode
              ? 'bg-[#4B262F] border-[#EED3BA] shadow-[2px_2px_0px_0px_#EED3BA]'
              : 'bg-white border-[#263D5B] doodle-shadow-sm'
              }`}>
              <span className={`font-sans text-3xl sm:text-4xl font-extrabold ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#263D5B]'}`}>~65%</span>
              <span className={`block text-xs sm:text-sm font-sans font-medium mt-1 ${isDarkMode ? 'text-[#EED3BA]/80' : 'text-gray-600'}`}>Embeddings Saved</span>
              <span className={`text-xs font-sans font-semibold mt-0.5 block ${isDarkMode ? 'text-[#EED3BA]/60' : 'text-[#49B6E5]'}`}>pgvector + Redis cache</span>
            </div>

            <div className={`p-5 sm:p-6 border-2 rounded-2xl relative overflow-hidden transition-colors ${isDarkMode
              ? 'bg-[#4B262F] border-[#EED3BA] shadow-[2px_2px_0px_0px_#EED3BA]'
              : 'bg-white border-[#263D5B] doodle-shadow-sm'
              }`}>
              <span className={`font-sans text-3xl sm:text-4xl font-extrabold ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#D97706]'}`}>3</span>
              <span className={`block text-xs sm:text-sm font-sans font-medium mt-1 ${isDarkMode ? 'text-[#EED3BA]/80' : 'text-gray-600'}`}>Microservices Shipped</span>
              <span className={`text-xs font-sans font-semibold mt-0.5 block ${isDarkMode ? 'text-[#EED3BA]/60' : 'text-gray-500'}`}>Auth, Core &amp; Support</span>
            </div>
          </div>
        </section>

        {/* PRODUCTION EXPERIENCE — Codologs Internship */}
        <section className="space-y-6">
          <div className={`flex items-center justify-between border-b-2 border-dashed pb-3 transition-colors ${isDarkMode ? 'border-[#EED3BA]/30' : 'border-[#263D5B]/20'
            }`}>
            <div className="flex items-center gap-2">
              <h2 className={`font-delius text-3xl font-bold transition-colors ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#263D5B]'
                }`}>
                Production Experience
              </h2>
            </div>
            <span className={`font-sans text-xs font-semibold ${isDarkMode ? 'text-[#EED3BA]/70' : 'text-gray-500'}`}>
              Jan 2026 – May 2026
            </span>
          </div>

          {PORTFOLIO_DATA.experience.map((exp, idx) => (
            <div
              key={idx}
              className={`border-2 rounded-2xl p-6 sm:p-8 doodle-border relative transition-colors ${isDarkMode
                ? 'bg-[#4B262F] border-[#EED3BA] shadow-[3px_4px_0px_0px_#EED3BA]'
                : 'bg-white border-[#263D5B] doodle-shadow'
                }`}
            >
              {/* Sticky note style pin in top corner */}
              <div className={`absolute -top-3 right-6 font-sans text-[11px] font-bold px-3 py-0.5 rounded-full border shadow-xs rotate-[1deg] ${isDarkMode
                ? 'bg-[#EED3BA] text-[#151311] border-[#EED3BA]'
                : 'bg-[#49B6E5] text-[#263D5B] border-[#263D5B]'
                }`}>
                Shipped to Production
              </div>

              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                <div>
                  <h3 className={`font-delius text-2xl font-bold transition-colors ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#263D5B]'
                    }`}>
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`font-sans text-sm font-bold ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#49B6E5]'
                      }`}>
                      {exp.company}
                    </span>
                    <span className={isDarkMode ? 'text-[#EED3BA]/40' : 'text-gray-300'}>•</span>
                    <span className={`font-sans text-xs ${isDarkMode ? 'text-[#EED3BA]/70' : 'text-gray-500'}`}>
                      {exp.location}
                    </span>
                  </div>
                </div>
                <span className={`font-sans text-xs px-2.5 py-1 rounded-md font-semibold ${isDarkMode ? 'bg-[#151311] text-[#EED3BA]' : 'bg-gray-100 text-gray-700'
                  }`}>
                  {exp.period}
                </span>
              </div>

              <p className={`text-sm mt-3 font-medium ${isDarkMode ? 'text-[#EED3BA]/90' : 'text-gray-700'}`}>
                {exp.summary}
              </p>

              {/* Bullet points with hand-drawn checkmarks */}
              <div className="mt-5 space-y-2.5">
                {exp.bulletPoints.map((bp, bIdx) => (
                  <div key={bIdx} className={`flex items-start gap-2.5 text-sm ${isDarkMode ? 'text-[#EED3BA]/90' : 'text-gray-700'
                    }`}>
                    <DoodleCheck className="w-4 h-4 shrink-0 mt-1" color={isDarkMode ? '#EED3BA' : '#16A34A'} />
                    <span>{bp}</span>
                  </div>
                ))}
              </div>

              {/* SCHEMATIC  // PRODUCTION WORKLOAD */}
              <div className={`mt-6 pt-6 border-t-2 border-dashed space-y-4 transition-colors ${isDarkMode ? 'border-[#EED3BA]/30' : 'border-[#263D5B]/15'
                }`}>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div>
                    <span className={`font-sans text-xs font-bold uppercase tracking-wider block ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#D97706]'
                      }`}>
                      SCHEMATIC // PRODUCTION WORKLOAD
                    </span>
                    <h4 className={`font-delius text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#263D5B]'
                      }`}>
                      Codologs: Spring Boot 3 &amp; Redis Caching Architecture
                    </h4>
                  </div>
                  <span className={`font-sans text-xs font-bold px-2.5 py-1 rounded-full border ${isDarkMode
                    ? 'bg-[#151311] border-[#EED3BA] text-[#EED3BA]'
                    : 'bg-[#16A34A]/10 border-[#16A34A]/20 text-[#16A34A]'
                    }`}>
                    p95: 320ms → 95ms (-70%)
                  </span>
                </div>

                <p className={`text-xs sm:text-sm max-w-2xl leading-relaxed ${isDarkMode ? 'text-[#EED3BA]/85' : 'text-gray-700'
                  }`}>
                  Architected a high-frequency read optimization layer in Spring Boot 3. Read requests consult Redis in-memory cache first, bypassing database round-trips and drastically reducing compute load.
                </p>

                {/* Hand-drawn SVG Topology Diagram */}
                <div className={`p-4 sm:p-6 border-2 rounded-xl overflow-x-auto transition-colors ${isDarkMode
                  ? 'bg-[#151311] border-[#EED3BA]/40'
                  : 'bg-[#FAFCFE] border-[#263D5B]/20'
                  }`}>
                  <div className="w-full min-w-[700px] flex items-center justify-between gap-3 sm:gap-4 font-sans text-xs">
                    {/* Node 1: Client */}
                    <div className={`p-3.5 border-2 rounded-xl text-center flex-1 min-w-[130px] ${isDarkMode
                      ? 'bg-[#4B262F] border-[#EED3BA] text-[#EED3BA] shadow-[2px_2px_0px_0px_#EED3BA]'
                      : 'bg-white border-[#263D5B] doodle-shadow-sm'
                      }`}>
                      <span className={`text-[10px] block font-bold ${isDarkMode ? 'text-[#EED3BA]/60' : 'text-gray-400'}`}>CLIENT LAYER</span>
                      <strong className={`block mt-0.5 ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#263D5B]'}`}>HTTP / REST</strong>
                      <span className={`text-[11px] ${isDarkMode ? 'text-[#EED3BA]/70' : 'text-gray-500'}`}>Downstream Svcs</span>
                    </div>

                    {/* Arrow */}
                    <div className={`flex flex-col items-center text-[10px] font-bold shrink-0 ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#49B6E5]'
                      }`}>
                      <span>JWT Auth Token</span>
                      <ArrowRight className="w-5 h-5" color={isDarkMode ? '#EED3BA' : '#263D5B'} />
                    </div>

                    {/* Node 2: Spring Boot 3 Gateway */}
                    <div className={`p-3.5 border-2 rounded-xl text-center flex-1 min-w-[150px] ${isDarkMode
                      ? 'bg-[#151311] border-[#EED3BA] text-[#EED3BA] shadow-[2px_2px_0px_0px_#EED3BA]'
                      : 'bg-[#49B6E5]/10 border-[#49B6E5] doodle-shadow-sm'
                      }`}>
                      <span className={`text-[10px] block font-bold ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#49B6E5]'}`}>CORE MICROSERVICE</span>
                      <strong className={`block mt-0.5 ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#263D5B]'}`}>Spring Boot 3</strong>
                      <span className={`text-[11px] ${isDarkMode ? 'text-[#EED3BA]/70' : 'text-gray-600'}`}>Standalone Auth Engine</span>
                    </div>

                    {/* Arrow */}
                    <div className={`flex flex-col items-center text-[10px] font-bold shrink-0 ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#16A34A]'
                      }`}>
                      <span>Cache First (95ms)</span>
                      <ArrowRight className="w-5 h-5" color={isDarkMode ? '#EED3BA' : '#16A34A'} />
                    </div>

                    {/* Node 3: Redis Cache */}
                    <div className={`p-3.5 border-2 rounded-xl text-center flex-1 min-w-[140px] ${isDarkMode
                      ? 'bg-[#4B262F] border-[#EED3BA] text-[#EED3BA] shadow-[2px_2px_0px_0px_#EED3BA]'
                      : 'bg-[#16A34A]/10 border-[#16A34A] doodle-shadow-sm'
                      }`}>
                      <span className={`text-[10px] block font-bold ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#16A34A]'}`}>CACHE HIT (95ms)</span>
                      <strong className={`block mt-0.5 ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#263D5B]'}`}>Redis In-Memory</strong>
                      <span className={`text-[11px] font-bold ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#16A34A]'}`}>-70% p95 Latency</span>
                    </div>

                    {/* Arrow */}
                    <div className={`flex flex-col items-center text-[10px] shrink-0 ${isDarkMode ? 'text-[#EED3BA]/60' : 'text-gray-400'
                      }`}>
                      <span>Miss Fallback</span>
                      <ArrowRight className="w-5 h-5" color={isDarkMode ? '#EED3BA' : 'currentColor'} />
                    </div>

                    {/* Node 4: PostgreSQL */}
                    <div className={`p-3.5 border-2 rounded-xl text-center flex-1 min-w-[130px] ${isDarkMode
                      ? 'bg-[#151311] border-[#EED3BA]/60 text-[#EED3BA]'
                      : 'bg-gray-50 border-gray-300'
                      }`}>
                      <span className={`text-[10px] block font-bold ${isDarkMode ? 'text-[#EED3BA]/60' : 'text-gray-400'}`}>PERSISTENCE</span>
                      <strong className={`block mt-0.5 ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#263D5B]'}`}>PostgreSQL</strong>
                      <span className={`text-[11px] ${isDarkMode ? 'text-[#EED3BA]/70' : 'text-gray-500'}`}>320ms DB writes</span>
                    </div>
                  </div>
                </div>

                {/* Metrics Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs font-sans">
                  <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-[#151311] border-[#EED3BA]/40' : 'bg-gray-50 border-gray-200'
                    }`}>
                    <span className={`text-[10px] block font-bold ${isDarkMode ? 'text-[#EED3BA]/60' : 'text-gray-500'}`}>AUTH MICROSERVICE</span>
                    <span className={`font-bold text-xs ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#263D5B]'}`}>JWT Token Issuance, Validation &amp; Revocation</span>
                  </div>
                  <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-[#151311] border-[#EED3BA]/40' : 'bg-gray-50 border-gray-200'
                    }`}>
                    <span className={`text-[10px] block font-bold ${isDarkMode ? 'text-[#EED3BA]/60' : 'text-gray-500'}`}>OBSERVABILITY</span>
                    <span className={`font-bold text-xs ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#263D5B]'}`}>Centralized Error Monitoring in Place</span>
                  </div>
                  <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-[#151311] border-[#EED3BA]/40' : 'bg-gray-50 border-gray-200'
                    }`}>
                    <span className={`text-[10px] block font-bold ${isDarkMode ? 'text-[#EED3BA]/60' : 'text-gray-500'}`}>DEPLOYMENT DECOUPLING</span>
                    <span className={`font-bold text-xs ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#263D5B]'}`}>3 Independently Deployable Microservices</span>
                  </div>
                </div>
              </div>

              {/* Tech tag chips */}
              <div className={`mt-6 pt-4 border-t flex flex-wrap items-center gap-2 ${isDarkMode ? 'border-[#EED3BA]/20' : 'border-gray-100'
                }`}>
                <span className={`text-xs font-sans font-bold mr-1 ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#263D5B]'
                  }`}>
                  Stack:
                </span>
                {exp.tech.map((t, tIdx) => (
                  <span
                    key={tIdx}
                    className={`px-2.5 py-0.5 border rounded text-xs font-sans font-medium ${isDarkMode
                      ? 'bg-[#151311] border-[#EED3BA]/50 text-[#EED3BA]'
                      : 'bg-gray-50 border-gray-200 text-[#263D5B]'
                      }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* LIVE LAB 01: CodeEcoScan AST Energy Analyzer */}
          <div className={`border-2 rounded-2xl p-6 sm:p-8 doodle-border relative space-y-6 transition-colors ${isDarkMode
            ? 'bg-[#4B262F] border-[#EED3BA] shadow-[3px_4px_0px_0px_#EED3BA]'
            : 'bg-white border-[#263D5B] doodle-shadow'
            }`}>
            <div className={`absolute -top-3 right-6 font-sans text-[11px] font-bold px-3 py-0.5 rounded-full border shadow-xs rotate-[1deg] ${isDarkMode
              ? 'bg-[#EED3BA] text-[#151311] border-[#EED3BA]'
              : 'bg-[#16A34A] text-white border-[#263D5B]'
              }`}>
              Live AST Lab · &lt;200ms API
            </div>

            <div className={`flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b pb-3 ${isDarkMode ? 'border-[#EED3BA]/20' : 'border-gray-100'
              }`}>
              <div>
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5" color={isDarkMode ? '#EED3BA' : '#49B6E5'} />
                  <h3 className={`font-delius text-2xl font-bold ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#263D5B]'
                    }`}>
                    Live Lab 01: CodeEcoScan AST Energy Analyzer
                  </h3>
                </div>
                <p className={`text-xs font-sans mt-1 ${isDarkMode ? 'text-[#EED3BA]/70' : 'text-gray-500'}`}>
                  Static analysis engine parsing Python AST nodes for carbon and energy footprint
                </p>
              </div>
              <button
                onClick={() => onOpenProject(PORTFOLIO_DATA.projects[0])}
                className={`font-sans text-xs hover:underline font-bold cursor-pointer ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#49B6E5]'
                  }`}
              >
                Inspect Project Spec →
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left: Snippet selector & code box */}
              <div className="lg:col-span-7 min-w-0 flex flex-col justify-between space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className={`font-sans text-xs font-bold ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#263D5B]'}`}>
                    Select Python Code Workload:
                  </span>
                  <div className="flex items-center gap-1.5">
                    {(['nested', 'recursion', 'vectorized'] as const).map((key) => (
                      <button
                        key={key}
                        onClick={() => setSelectedSnippet(key)}
                        className={`px-3 py-1 rounded-lg text-xs font-sans font-semibold transition-all cursor-pointer ${selectedSnippet === key
                          ? (isDarkMode
                            ? 'bg-[#151311] border border-[#EED3BA] text-[#EED3BA] font-bold shadow-[1px_1px_0px_0px_#EED3BA]'
                            : 'bg-[#263D5B] text-white font-bold doodle-shadow-sm')
                          : (isDarkMode
                            ? 'bg-[#151311]/40 border border-[#EED3BA]/30 text-[#EED3BA]/70 hover:text-[#EED3BA]'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200')
                          }`}
                      >
                        {key === 'nested' ? 'Nested Loops' : key === 'recursion' ? 'Recursion' : 'Vectorized'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={`p-4 rounded-xl font-mono text-xs overflow-x-auto border-2 ${isDarkMode
                  ? 'bg-[#151311] text-[#EED3BA] border-[#EED3BA]'
                  : 'bg-[#1E293B] text-gray-200 border-[#263D5B]'
                  }`}>
                  <div className={`flex items-center justify-between pb-2 mb-2 border-b text-[10px] font-sans ${isDarkMode ? 'border-[#EED3BA]/30 text-[#EED3BA]/60' : 'border-gray-700 text-gray-400'
                    }`}>
                    <span>workload_snippet.py</span>
                    <span className={`font-bold ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#49B6E5]'}`}>
                      AST_VISITOR: ACTIVE
                    </span>
                  </div>
                  <pre className="overflow-x-auto leading-relaxed">{currentSnippetData.code}</pre>
                </div>

                <div className="space-y-2 pt-1">
                  <span className={`font-sans text-xs font-bold block ${isDarkMode ? 'text-[#EED3BA]/80' : 'text-gray-600'}`}>
                    Execution Hardware Topology:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {(['laptop', 'cloud', 'gpu'] as const).map((hw) => (
                      <button
                        key={hw}
                        onClick={() => setHardwareProfile(hw)}
                        className={`p-2.5 rounded-xl border-2 text-left font-sans transition-all cursor-pointer ${hardwareProfile === hw
                          ? (isDarkMode
                            ? 'border-[#EED3BA] bg-[#151311] font-bold text-[#EED3BA] shadow-[2px_2px_0px_0px_#EED3BA]'
                            : 'border-[#49B6E5] bg-[#49B6E5]/10 font-bold text-[#263D5B] doodle-shadow-sm')
                          : (isDarkMode
                            ? 'border-[#EED3BA]/30 bg-[#151311]/30 text-[#EED3BA]/70 hover:border-[#EED3BA]/60'
                            : 'border-gray-200 hover:border-gray-300 text-gray-600')
                          }`}
                      >
                        <div className="text-xs capitalize font-bold">{hw}</div>
                        <div className={`text-[11px] ${isDarkMode ? 'text-[#EED3BA]/60' : 'text-gray-500'}`}>
                          {hardwareWattage[hw].watts}W TDP
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Telemetry & Carbon Calculations */}
              <div className={`lg:col-span-5 min-w-0 border-2 rounded-xl p-5 sm:p-6 flex flex-col justify-between space-y-5 transition-colors ${isDarkMode
                ? 'bg-[#151311] border-[#EED3BA]/40 text-[#EED3BA]'
                : 'bg-[#FAFCFE] border-[#263D5B]/20'
                }`}>
                <div>
                  <span className={`font-sans text-xs uppercase tracking-wider font-bold block mb-1.5 ${isDarkMode ? 'text-[#EED3BA]/60' : 'text-gray-500'
                    }`}>
                    Calculated Carbon Footprint
                  </span>
                  <div className="flex items-baseline gap-2.5 flex-wrap">
                    <span className={`font-sans text-4xl sm:text-5xl font-extrabold ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#263D5B]'
                      }`}>
                      {calculatedCarbon}
                    </span>
                    <span className={`font-sans text-sm sm:text-base font-bold whitespace-nowrap ${isDarkMode ? 'text-[#EED3BA]/80' : 'text-gray-600'}`}>
                      kg CO₂ / day
                    </span>
                  </div>
                  <span className={`text-xs font-sans mt-0.5 block ${isDarkMode ? 'text-[#EED3BA]/60' : 'text-gray-500'}`}>
                    continuous 24h cloud execution
                  </span>

                  <div className="mt-5">
                    <div className="flex justify-between items-center text-xs font-sans mb-1.5 font-semibold">
                      <span>AST Energy Risk Score</span>
                      <span className={`font-bold ${isDarkMode
                        ? 'text-[#EED3BA]'
                        : (currentSnippetData.riskScore > 60 ? 'text-[#DC2626]' : 'text-[#16A34A]')
                        }`}>
                        {currentSnippetData.riskScore} / 100
                      </span>
                    </div>
                    <div className={`h-2.5 w-full rounded-full overflow-hidden ${isDarkMode ? 'bg-[#4B262F]' : 'bg-gray-200'
                      }`}>
                      <div
                        className={`h-full transition-all duration-500 ${isDarkMode
                          ? 'bg-[#EED3BA]'
                          : (currentSnippetData.riskScore > 60
                            ? 'bg-[#DC2626]'
                            : currentSnippetData.riskScore > 40
                              ? 'bg-[#D97706]'
                              : 'bg-[#16A34A]')
                          }`}
                        style={{ width: `${currentSnippetData.riskScore}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-5 space-y-2">
                    <span className={`font-sans text-xs font-bold block ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#263D5B]'
                      }`}>
                      AST Parser Findings:
                    </span>
                    {currentSnippetData.findings.map((finding, idx) => (
                      <div key={idx} className={`flex items-start gap-2 text-xs font-sans leading-relaxed ${isDarkMode ? 'text-[#EED3BA]/90' : 'text-gray-700'
                        }`}>
                        <span className={`font-bold shrink-0 mt-0.5 ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#49B6E5]'}`}>›</span>
                        <span>{finding}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`pt-3 border-t text-xs font-sans flex items-center justify-between ${isDarkMode ? 'border-[#EED3BA]/30 text-[#EED3BA]/70' : 'border-gray-200 text-gray-500'
                  }`}>
                  <span>AST Complexity: O(N)</span>
                  <span className={`font-bold ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#16A34A]'}`}>
                    Render API: &lt;200ms
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* LIVE LAB 02: Agent Sentinel Autonomous Fact  */}
          <div className={`border-2 rounded-2xl p-6 sm:p-8 doodle-border relative space-y-6 transition-colors ${isDarkMode
            ? 'bg-[#4B262F] border-[#EED3BA] shadow-[3px_4px_0px_0px_#EED3BA]'
            : 'bg-white border-[#263D5B] doodle-shadow'
            }`}>
            <div className={`absolute -top-3 right-6 font-sans text-[11px] font-bold px-3 py-0.5 rounded-full border shadow-xs rotate-[-1deg] ${isDarkMode
              ? 'bg-[#EED3BA] text-[#151311] border-[#EED3BA]'
              : 'bg-[#D97706] text-white border-[#263D5B]'
              }`}>
              Presented @ Mumbai Hacks 2025
            </div>

            <div className={`flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b pb-3 ${isDarkMode ? 'border-[#EED3BA]/20' : 'border-gray-100'
              }`}>
              <div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" color={isDarkMode ? '#EED3BA' : '#16A34A'} />
                  <h3 className={`font-delius text-2xl font-bold ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#263D5B]'
                    }`}>
                    Live Lab 02: Agent Sentinel Autonomous Fact Triage
                  </h3>
                </div>
                <p className={`text-xs font-sans mt-1 ${isDarkMode ? 'text-[#EED3BA]/70' : 'text-gray-500'}`}>
                  Selected presenter at Mumbai Hacks 2025 · 4-Second GDELT + RoBERTa triage pipeline
                </p>
              </div>
              <button
                onClick={() => onOpenProject(PORTFOLIO_DATA.projects[1])}
                className={`font-sans text-xs hover:underline font-bold cursor-pointer ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#49B6E5]'
                  }`}
              >
                Inspect Sentinel Spec →
              </button>
            </div>

            {/* Select Claim */}
            <div>
              <span className={`font-sans text-xs font-bold block mb-2 ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#263D5B]'
                }`}>
                Select a Claim to Process Through the Pipeline:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {sampleClaims.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedClaim(idx);
                      setPipelineStep(0);
                    }}
                    className={`p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer font-sans ${selectedClaim === idx
                      ? (isDarkMode
                        ? 'border-[#EED3BA] bg-[#151311] shadow-[2px_2px_0px_0px_#EED3BA] text-[#EED3BA]'
                        : 'border-[#263D5B] bg-[#49B6E5]/10 doodle-shadow-sm font-semibold text-[#263D5B]')
                      : (isDarkMode
                        ? 'border-[#EED3BA]/30 bg-[#151311]/40 text-[#EED3BA]/70 hover:border-[#EED3BA]/60'
                        : 'border-gray-200 hover:border-gray-300 text-gray-800')
                      }`}
                  >
                    <span className={`text-[10px] font-sans block mb-1 font-bold ${isDarkMode ? 'text-[#EED3BA]/60' : 'text-gray-500'
                      }`}>
                      CLAIM 0{idx + 1} · {item.source}
                    </span>
                    <p className="text-xs line-clamp-2">"{item.claim}"</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Run Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <div className={`font-sans text-xs ${isDarkMode ? 'text-[#EED3BA]/80' : 'text-gray-600'}`}>
                Target: <strong className={isDarkMode ? 'text-[#EED3BA]' : 'text-[#263D5B]'}>"{sampleClaims[selectedClaim].claim}"</strong>
              </div>
              <button
                onClick={runClaimPipeline}
                disabled={isVerifying}
                className={`flex items-center justify-center gap-2 px-5 py-2.5 font-sans text-xs font-bold rounded-xl transition-all disabled:opacity-50 cursor-pointer ${isDarkMode
                  ? 'bg-[#EED3BA] hover:bg-[#EED3BA]/90 text-[#151311] shadow-[2px_2px_0px_0px_#4B262F]'
                  : 'bg-[#16A34A] hover:bg-[#15803D] text-white doodle-shadow-sm'
                  }`}
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Processing Pipeline...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Execute 4-Second Pipeline</span>
                  </>
                )}
              </button>
            </div>

            {/* 4 Pipeline Stages */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
              <div
                className={`p-3 rounded-xl border-2 text-xs font-sans transition-all ${pipelineStep >= 1
                  ? (isDarkMode ? 'border-[#EED3BA] bg-[#151311] text-[#EED3BA] font-bold' : 'border-[#49B6E5] bg-[#49B6E5]/10 text-[#263D5B] font-bold')
                  : (isDarkMode ? 'border-[#EED3BA]/30 text-[#EED3BA]/40' : 'border-gray-200 text-gray-400')
                  }`}
              >
                <div className="mb-1 font-bold">1. Claim Extraction</div>
                <div className="text-[11px] font-normal">Parsed named entities (~0.4s)</div>
              </div>

              <div
                className={`p-3 rounded-xl border-2 text-xs font-sans transition-all ${pipelineStep >= 2
                  ? (isDarkMode ? 'border-[#EED3BA] bg-[#151311] text-[#EED3BA] font-bold' : 'border-[#49B6E5] bg-[#49B6E5]/10 text-[#263D5B] font-bold')
                  : (isDarkMode ? 'border-[#EED3BA]/30 text-[#EED3BA]/40' : 'border-gray-200 text-gray-400')
                  }`}
              >
                <div className="mb-1 font-bold">2. GDELT Retrieval</div>
                <div className="text-[11px] font-normal">{sampleClaims[selectedClaim].gdeltHits} sources queried (~1.8s)</div>
              </div>

              <div
                className={`p-3 rounded-xl border-2 text-xs font-sans transition-all ${pipelineStep >= 3
                  ? (isDarkMode ? 'border-[#EED3BA] bg-[#151311] text-[#EED3BA] font-bold' : 'border-[#49B6E5] bg-[#49B6E5]/10 text-[#263D5B] font-bold')
                  : (isDarkMode ? 'border-[#EED3BA]/30 text-[#EED3BA]/40' : 'border-gray-200 text-gray-400')
                  }`}
              >
                <div className="mb-1 font-bold">3. RoBERTa Classifier</div>
                <div className="text-[11px] font-normal">Cross-encoder score: {sampleClaims[selectedClaim].confidence}%</div>
              </div>

              <div
                className={`p-3 rounded-xl border-2 text-xs font-sans transition-all ${pipelineStep >= 4
                  ? (isDarkMode ? 'border-[#EED3BA] bg-[#151311] text-[#EED3BA] font-bold shadow-[1px_1px_0px_0px_#EED3BA]' : 'border-[#16A34A] bg-[#16A34A]/10 text-[#16A34A] font-bold')
                  : (isDarkMode ? 'border-[#EED3BA]/30 text-[#EED3BA]/40' : 'border-gray-200 text-gray-400')
                  }`}
              >
                <div className="mb-1 font-bold">4. Auto Verdict</div>
                <div className="text-[11px]">
                  {pipelineStep >= 4 ? sampleClaims[selectedClaim].verdict : 'Pending verdict...'}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION — Non-cliché Dispersed Cards */}
        <section className="space-y-6">
          <div className={`flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-dashed pb-3 transition-colors ${isDarkMode ? 'border-[#EED3BA]/30' : 'border-[#263D5B]/20'
            }`}>
            <div>
              <h2 className={`font-delius text-3xl font-bold transition-colors ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#263D5B]'
                }`}>
                Selected Systems &amp; AI Projects
              </h2>
              <p className={`text-xs font-sans mt-1 ${isDarkMode ? 'text-[#EED3BA]/70' : 'text-gray-500'}`}>
                Click on any project blueprint to inspect architecture, benchmarks &amp; live code
              </p>
            </div>
            <span className={`font-sans text-xs font-semibold ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#49B6E5]'}`}>
              5 Production-Grade Systems
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {PORTFOLIO_DATA.projects.map((proj) => (
              <motion.div
                key={proj.id}
                whileHover={{ y: -3 }}
                onClick={() => onOpenProject(proj)}
                className={`border-2 rounded-2xl p-6 cursor-pointer transition-all flex flex-col justify-between relative group ${isDarkMode
                  ? 'bg-[#4B262F] border-[#EED3BA] shadow-[3px_4px_0px_0px_#EED3BA] hover:shadow-[5px_6px_0px_0px_#EED3BA]'
                  : 'bg-white border-[#263D5B] doodle-shadow doodle-shadow-hover'
                  }`}
              >
                <div>
                  {/* Top Bar with Badge and Benchmark */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <DoodleStamp text={proj.badge} color={isDarkMode ? '#EED3BA' : '#49B6E5'} />
                    <div className="text-right">
                      <span className={`font-sans text-lg font-bold ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#263D5B]'
                        }`}>
                        {proj.featuredMetric}
                      </span>
                      <span className={`block text-[10px] font-sans ${isDarkMode ? 'text-[#EED3BA]/60' : 'text-gray-500'
                        }`}>
                        {proj.metricLabel}
                      </span>
                    </div>
                  </div>

                  <h3 className={`font-delius text-2xl font-bold transition-colors ${isDarkMode ? 'text-[#EED3BA] group-hover:text-[#EED3BA]/80' : 'text-[#263D5B] group-hover:text-[#49B6E5]'
                    }`}>
                    {proj.title}
                  </h3>
                  <p className={`text-xs font-sans font-semibold mt-0.5 ${isDarkMode ? 'text-[#EED3BA]/80' : 'text-[#49B6E5]'
                    }`}>
                    {proj.subtitle}
                  </p>

                  <p className={`text-sm mt-3 line-clamp-3 leading-relaxed ${isDarkMode ? 'text-[#EED3BA]/90' : 'text-gray-700'
                    }`}>
                    {proj.description}
                  </p>
                </div>

                <div className={`mt-6 pt-4 border-t flex items-center justify-between ${isDarkMode ? 'border-[#EED3BA]/20' : 'border-gray-100'
                  }`}>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tech.slice(0, 3).map((t, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-0.5 border rounded text-[11px] font-sans font-medium ${isDarkMode
                          ? 'bg-[#151311] border-[#EED3BA]/40 text-[#EED3BA]'
                          : 'bg-gray-50 border-gray-200 text-gray-700'
                          }`}
                      >
                        {t}
                      </span>
                    ))}
                    {proj.tech.length > 3 && (
                      <span className={`px-1.5 py-0.5 text-[10px] font-sans ${isDarkMode ? 'text-[#EED3BA]/50' : 'text-gray-400'
                        }`}>
                        +{proj.tech.length - 3}
                      </span>
                    )}
                  </div>

                  <span className={`inline-flex items-center gap-1 font-sans text-xs font-bold group-hover:translate-x-0.5 transition-transform ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#263D5B]'
                    }`}>
                    <span>Inspect</span>
                    <ArrowUpRight className="w-3.5 h-3.5" color={isDarkMode ? '#EED3BA' : '#49B6E5'} />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TECHNICAL SKILLS — Organized Hand-Drawn Blueprint Tiles */}
        <section className="space-y-6">
          <div className={`flex items-center justify-between border-b-2 border-dashed pb-3 transition-colors ${isDarkMode ? 'border-[#EED3BA]/30' : 'border-[#263D5B]/20'
            }`}>
            <div>
              <h2 className={`font-delius text-3xl font-bold transition-colors ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#263D5B]'
                }`}>
                Engineering Skills &amp; Toolkit
              </h2>
              <p className={`text-xs font-sans mt-0.5 ${isDarkMode ? 'text-[#EED3BA]/70' : 'text-gray-500'}`}>
                Polyglot backend, vector stores, distributed caching &amp; AI agent pipelines
              </p>
            </div>
            {/* CAN MAKE IT HAPPEN in doodle font */}
            <DoodleStamp text="CAN MAKE IT HAPPEN" font="font-delius" color={isDarkMode ? '#EED3BA' : '#263D5B'} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PORTFOLIO_DATA.skills.map((skillGroup, idx) => (
              <div
                key={idx}
                className={`border-2 rounded-xl p-5 doodle-border-sm transition-colors ${isDarkMode
                  ? 'bg-[#4B262F] border-[#EED3BA] shadow-[2px_2px_0px_0px_#EED3BA]'
                  : 'bg-white border-[#263D5B] doodle-shadow-sm'
                  }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`font-sans text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#263D5B]'
                    }`}>
                    {skillGroup.category}
                  </h3>
                  {skillGroup.doodleTag && (
                    <span className={`text-[10px] font-sans font-semibold px-2 py-0.5 rounded ${isDarkMode
                      ? 'bg-[#151311] text-[#EED3BA] border border-[#EED3BA]/30'
                      : 'bg-[#49B6E5]/15 text-[#263D5B]'
                      }`}>
                      {skillGroup.doodleTag}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {skillGroup.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className={`px-2.5 py-1 border rounded-md text-xs font-sans font-medium transition-colors ${isDarkMode
                        ? 'bg-[#151311] border-[#EED3BA]/40 text-[#EED3BA] hover:border-[#EED3BA]'
                        : 'bg-gray-50 hover:bg-[#49B6E5]/10 border-gray-200 hover:border-[#49B6E5] text-gray-800'
                        }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* HACKATHONS & ACHIEVEMENTS */}
        <section className="space-y-6">
          <div className={`flex items-center justify-between border-b-2 border-dashed pb-3 transition-colors ${isDarkMode ? 'border-[#EED3BA]/30' : 'border-[#263D5B]/20'
            }`}>
            <h2 className={`font-delius text-3xl font-bold transition-colors ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#263D5B]'
              }`}>
              Hackathons &amp; Recognition
            </h2>
            <span className={`font-sans text-xs ${isDarkMode ? 'text-[#EED3BA]/70' : 'text-gray-500'}`}>
              High-Pressure Execution
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PORTFOLIO_DATA.achievements.map((ach, idx) => (
              <div
                key={idx}
                className={`border-2 rounded-xl p-5 flex flex-col justify-between transition-colors ${isDarkMode
                  ? 'bg-[#4B262F] border-[#EED3BA] shadow-[2px_2px_0px_0px_#EED3BA]'
                  : 'bg-white border-[#263D5B] doodle-shadow-sm'
                  }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <DoodleStamp text={ach.badge} color={isDarkMode ? '#EED3BA' : '#16A34A'} />
                    <span className={`font-sans text-xs ${isDarkMode ? 'text-[#EED3BA]/60' : 'text-gray-500'}`}>
                      {ach.date}
                    </span>
                  </div>
                  <h3 className={`font-delius text-xl font-bold mt-2 ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#263D5B]'
                    }`}>
                    {ach.title}
                  </h3>
                  <p className={`text-xs font-sans font-semibold ${isDarkMode ? 'text-[#EED3BA]/80' : 'text-[#49B6E5]'
                    }`}>
                    {ach.event} {ach.location ? `· ${ach.location}` : ''}
                  </p>
                  <p className={`text-xs mt-2.5 leading-relaxed font-sans ${isDarkMode ? 'text-[#EED3BA]/90' : 'text-gray-600'
                    }`}>
                    {ach.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* INSTANT NOTE & PING SECTION — No Placeholder Values & Real Email/Ping Dispatch */}
        <section className={`border-2 rounded-2xl p-6 sm:p-8 doodle-border relative space-y-4 transition-colors ${isDarkMode
          ? 'bg-[#4B262F] border-[#EED3BA] shadow-[3px_4px_0px_0px_#EED3BA]'
          : 'bg-white border-[#263D5B] doodle-shadow'
          }`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`font-delius text-2xl font-bold ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#263D5B]'
                }`}>
                Instant Ping to Anuj
              </h3>
              <p className={`text-xs font-sans mt-0.5 ${isDarkMode ? 'text-[#EED3BA]/70' : 'text-gray-500'}`}>
                Leave a quick ping or inquiry directly to anuj05patil@gmail.com
              </p>
            </div>
            <DoodleStamp text="OPEN TO WORK" color={isDarkMode ? '#EED3BA' : '#16A34A'} />
          </div>

          <form onSubmit={handleSendQuickNote} className="space-y-3">
            {/* No placeholder attribute used */}
            <textarea
              rows={3}
              required
              value={quickNote}
              onChange={(e) => setQuickNote(e.target.value)}
              className={`w-full p-3 border-2 rounded-xl font-sans text-sm focus:outline-hidden resize-none transition-colors ${isDarkMode
                ? 'bg-[#151311] border-[#EED3BA]/50 text-[#EED3BA] focus:border-[#EED3BA]'
                : 'bg-white border-gray-200 text-gray-800 focus:border-[#49B6E5]'
                }`}
            />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className={`text-xs font-sans ${isDarkMode ? 'text-[#EED3BA]/70' : 'text-gray-500'}`}>
                Dispatches immediately to anuj05patil@gmail.com via email draft &amp; clipboard
              </span>
              <button
                type="submit"
                className={`px-5 py-2.5 font-delius text-sm sm:text-base font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer ${isDarkMode
                  ? 'bg-[#EED3BA] hover:bg-[#EED3BA]/90 text-[#151311] shadow-[2px_2px_0px_0px_#4B262F]'
                  : 'bg-[#263D5B] hover:bg-[#1E3048] text-white doodle-shadow-sm'
                  }`}
              >
                {noteSent ? (
                  <>
                    <Check className={`w-4 h-4 ${isDarkMode ? 'text-[#151311]' : 'text-[#16A34A]'}`} />
                    <span>Ping Dispatched!</span>
                  </>
                ) : (
                  <>
                    <Send className={`w-4 h-4 ${isDarkMode ? 'text-[#151311]' : 'text-[#49B6E5]'}`} />
                    <span>Send Ping</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {lastDispatchedNote && (
            <div className={`p-3 rounded-xl border text-xs font-sans flex items-center justify-between ${isDarkMode
              ? 'bg-[#151311] border-[#EED3BA]/40 text-[#EED3BA]'
              : 'bg-green-50 border-green-200 text-green-900'
              }`}>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                <span>Last ping delivered to mail composer: "{lastDispatchedNote.slice(0, 45)}..."</span>
              </div>
              <a
                href={`mailto:${PORTFOLIO_DATA.contact.email}?subject=Followup on Portfolio Ping&body=${encodeURIComponent(lastDispatchedNote)}`}
                className="underline font-bold shrink-0 ml-2"
              >
                Re-open Email Draft →
              </a>
            </div>
          )}
        </section>

        {/* EDUCATION & FOOTER NOTE */}
        <footer className={`pt-10 border-t-2 transition-colors ${isDarkMode ? 'border-[#EED3BA]/30' : 'border-[#263D5B]/20'
          }`}>
          <div className={`border-2 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 transition-colors ${isDarkMode
            ? 'bg-[#4B262F] border-[#EED3BA] shadow-[3px_4px_0px_0px_#EED3BA]'
            : 'bg-white border-[#263D5B] doodle-shadow'
            }`}>
            <div>
              <span className={`text-[10px] font-sans uppercase tracking-wider block font-bold ${isDarkMode ? 'text-[#EED3BA]/60' : 'text-gray-500'
                }`}>
                Academic Foundation
              </span>
              <h3 className={`font-delius text-2xl font-bold ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#263D5B]'
                }`}>
                {PORTFOLIO_DATA.education.degree} in {PORTFOLIO_DATA.education.field}
              </h3>
              <p className={`font-sans text-xs mt-1 ${isDarkMode ? 'text-[#EED3BA]/80' : 'text-gray-600'
                }`}>
                {PORTFOLIO_DATA.education.institution} · CGPA: {PORTFOLIO_DATA.education.cgpa} ({PORTFOLIO_DATA.education.period})
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={handleOpenResume}
                className={`flex items-center gap-2 px-5 py-2.5 font-delius text-sm sm:text-base font-bold rounded-xl transition-all cursor-pointer ${isDarkMode
                  ? 'bg-[#151311] border-2 border-[#EED3BA] text-[#EED3BA] shadow-[2px_2px_0px_0px_#EED3BA] hover:bg-[#151311]/80'
                  : 'bg-white border-2 border-[#263D5B] text-[#263D5B] doodle-shadow-sm hover:bg-gray-50'
                  }`}
                aria-label="Preview Resume at bottom"
              >
                <FileText className="w-4 h-4" color={isDarkMode ? '#EED3BA' : '#49B6E5'} />
                <span>Preview Resume</span>
                <span className={`text-[11px] px-1.5 py-0.2 rounded font-mono ${isDarkMode ? 'bg-[#EED3BA]/20 text-[#EED3BA]' : 'bg-gray-100 text-gray-700'
                  }`}>
                  PDF
                </span>
              </button>

              <button
                onClick={onOpenContact}
                className={`px-5 py-2.5 font-delius text-sm sm:text-base font-bold rounded-xl transition-all cursor-pointer ${isDarkMode
                  ? 'bg-[#EED3BA] hover:bg-[#EED3BA]/90 text-[#151311] shadow-[2px_2px_0px_0px_#4B262F]'
                  : 'bg-[#49B6E5] hover:bg-[#3FA2CD] text-[#263D5B] doodle-shadow-sm'
                  }`}
              >
                Get in Touch
              </button>
            </div>
          </div>

          <div className={`text-center mt-8 font-sans text-xs ${isDarkMode ? 'text-[#EED3BA]/60' : 'text-gray-500'
            }`}>
            Fin
          </div>
        </footer>

      </main>

      {/* Resume Preview Modal (Doodle Themed) */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};
