import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, ExternalLink, FileText, Eye, CheckCircle2, Award, Briefcase, GraduationCap, Code } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { DoodleStamp, DoodleTape, DoodleUnderline, DoodleCheck } from './DoodleSVGs';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode?: boolean;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, isDarkMode: propIsDarkMode }) => {
  const [viewMode, setViewMode] = useState<'pdf' | 'blueprint'>('pdf');
  const [pdfLoadError, setPdfLoadError] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (propIsDarkMode !== undefined) return propIsDarkMode;
    try {
      return localStorage.getItem('doodle_dark_mode') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (propIsDarkMode !== undefined) {
      setIsDarkMode(propIsDarkMode);
    } else {
      try {
        setIsDarkMode(localStorage.getItem('doodle_dark_mode') === 'true');
      } catch { }
    }
  }, [isOpen, propIsDarkMode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#111827]/70 backdrop-blur-xs font-sans overflow-hidden"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className={`border-2 rounded-2xl w-full max-w-5xl h-[92vh] flex flex-col relative overflow-hidden transition-colors ${isDarkMode
              ? 'bg-[#1D1917] border-[#EED3BA] shadow-[4px_6px_0px_0px_#EED3BA] text-[#EED3BA]'
              : 'bg-white border-[#263D5B] doodle-shadow text-[#263D5B]'
            }`}
        >
          {/* Top Tape Accent */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
            <DoodleTape className="w-24 sm:w-32 h-6" />
          </div>

          {/* Modal Header */}
          <div className={`p-4 sm:p-6 border-b-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 transition-colors ${isDarkMode ? 'border-[#EED3BA]/30 bg-[#251F1C]' : 'border-[#263D5B]/20 bg-[#FAFCFE]'
            }`}>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <DoodleStamp text="RESUME PREVIEW" color={isDarkMode ? '#EED3BA' : '#16A34A'} />
                <span className={`text-xs font-sans font-semibold ${isDarkMode ? 'text-[#EED3BA]/70' : 'text-gray-500'}`}>
                  resume.pdf · {PORTFOLIO_DATA.name}
                </span>
              </div>
              <h2 className={`font-delius text-2xl sm:text-3xl font-bold tracking-tight ${isDarkMode ? 'text-[#EED3BA]' : 'text-[#263D5B]'
                }`}>
                {PORTFOLIO_DATA.name} — Curriculum
              </h2>
            </div>

            {/* Action buttons & Close */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              {/* Tab Switcher: PDF vs Blueprint Summary */}
              <div className={`flex items-center p-1 rounded-xl border ${isDarkMode ? 'bg-[#151311] border-[#EED3BA]/30' : 'bg-gray-100 border-gray-200'
                }`}>
                <button
                  onClick={() => setViewMode('pdf')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-delius font-bold transition-all cursor-pointer ${viewMode === 'pdf'
                      ? (isDarkMode ? 'bg-[#4B262F] text-[#EED3BA] shadow-xs' : 'bg-white text-[#263D5B] shadow-xs')
                      : (isDarkMode ? 'text-[#EED3BA]/60 hover:text-[#EED3BA]' : 'text-gray-600 hover:text-gray-900')
                    }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>PDF Viewer</span>
                </button>
                <button
                  onClick={() => setViewMode('blueprint')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-delius font-bold transition-all cursor-pointer ${viewMode === 'blueprint'
                      ? (isDarkMode ? 'bg-[#4B262F] text-[#EED3BA] shadow-xs' : 'bg-white text-[#263D5B] shadow-xs')
                      : (isDarkMode ? 'text-[#EED3BA]/60 hover:text-[#EED3BA]' : 'text-gray-600 hover:text-gray-900')
                    }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Doodle Sheet</span>
                </button>
              </div>

              {/* Download Resume PDF Button */}
              <a
                href="/resume.pdf"
                download="Anuj_Patil_Resume.pdf"
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-delius font-bold transition-all cursor-pointer ${isDarkMode
                    ? 'bg-[#EED3BA] text-[#151311] hover:bg-[#EED3BA]/90 shadow-[2px_2px_0px_0px_#4B262F]'
                    : 'bg-[#49B6E5] text-[#263D5B] hover:bg-[#3FA2CD] doodle-shadow-sm'
                  }`}
                title="Download resume.pdf"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </a>

              {/* Open in New Window */}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${isDarkMode
                    ? 'border-[#EED3BA]/40 text-[#EED3BA] hover:bg-[#4B262F]'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                title="Open resume.pdf in new tab"
                aria-label="Open resume in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              {/* Close Button */}
              <button
                onClick={onClose}
                className={`p-2 rounded-xl border transition-colors cursor-pointer shrink-0 ${isDarkMode
                    ? 'border-[#EED3BA]/40 text-[#EED3BA] hover:bg-[#4B262F]'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                aria-label="Close resume preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Body Container */}
          <div className="flex-1 min-h-0 relative p-3 sm:p-6 overflow-y-auto">
            {viewMode === 'pdf' ? (
              <div className="w-full h-full flex flex-col">
                {pdfLoadError ? (
                  <div className={`p-8 text-center my-auto border-2 border-dashed rounded-2xl ${isDarkMode ? 'border-[#EED3BA]/40 text-[#EED3BA]' : 'border-[#263D5B]/30 text-[#263D5B]'
                    }`}>
                    <FileText className="w-12 h-12 mx-auto mb-3 opacity-60" />
                    <h3 className="font-delius text-xl font-bold mb-2">Direct PDF Preview Fallback</h3>
                    <p className="text-sm max-w-md mx-auto mb-4 opacity-80">
                      Your browser security or frame environment may restrict embedded PDF rendering. You can download or view it directly:
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      <a
                        href="/resume.pdf"
                        download="Anuj_Patil_Resume.pdf"
                        className="px-4 py-2 bg-[#49B6E5] text-[#263D5B] font-delius font-bold rounded-xl doodle-shadow-sm"
                      >
                        Download resume.pdf
                      </a>
                      <button
                        onClick={() => setViewMode('blueprint')}
                        className="px-4 py-2 border border-current font-delius font-bold rounded-xl"
                      >
                        View Doodle Sheet
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full min-h-[420px] rounded-xl overflow-hidden border-2 border-current/20 relative bg-white">
                    <iframe
                      src="/resume.pdf#view=FitH"
                      title="Anuj Patil Resume PDF Preview"
                      className="w-full h-full border-none"
                      onError={() => setPdfLoadError(true)}
                    />
                  </div>
                )}
              </div>
            ) : (
              /* Blueprint Styled Resume View */
              <div className="space-y-6 max-w-3xl mx-auto py-2">
                {/* Header Profile Block */}
                <div className={`p-5 sm:p-6 border-2 rounded-2xl relative ${isDarkMode
                    ? 'bg-[#251F1C] border-[#EED3BA] shadow-[3px_3px_0px_0px_#EED3BA]'
                    : 'bg-white border-[#263D5B] doodle-shadow'
                  }`}>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h1 className="font-delius text-3xl font-extrabold">{PORTFOLIO_DATA.name}</h1>
                    <DoodleStamp text={PORTFOLIO_DATA.defaultSkill} color={isDarkMode ? '#EED3BA' : '#16A34A'} />
                  </div>
                  <p className="font-sans text-sm font-semibold text-[#49B6E5] mb-2">{PORTFOLIO_DATA.title}</p>
                  <p className="text-xs sm:text-sm font-sans opacity-90 leading-relaxed">{PORTFOLIO_DATA.summary}</p>
                  <div className="mt-4 pt-3 border-t border-current/20 flex flex-wrap gap-4 text-xs font-mono">
                    <span>📍 {PORTFOLIO_DATA.contact.location}</span>
                    <span>✉️ {PORTFOLIO_DATA.contact.email}</span>
                    <span>📞 {PORTFOLIO_DATA.contact.phone}</span>
                    <span>🌐 {PORTFOLIO_DATA.contact.portfolioUrl}</span>
                  </div>
                </div>

                {/* Production Experience */}
                <div className={`p-5 sm:p-6 border-2 rounded-2xl ${isDarkMode ? 'bg-[#251F1C] border-[#EED3BA]/50' : 'bg-white border-[#263D5B]/30 doodle-shadow-sm'
                  }`}>
                  <div className="flex items-center gap-2 mb-4">
                    <Briefcase className="w-5 h-5 text-[#49B6E5]" />
                    <h3 className="font-delius text-xl font-bold">Production Experience</h3>
                  </div>
                  {PORTFOLIO_DATA.experience.map((exp, i) => (
                    <div key={i} className="space-y-3">
                      <div className="flex flex-wrap items-baseline justify-between gap-1">
                        <div>
                          <span className="font-sans font-bold text-base">{exp.role}</span>
                          <span className="font-sans text-sm text-[#49B6E5] font-semibold"> · {exp.company}</span>
                        </div>
                        <span className="text-xs font-mono opacity-80">{exp.period}</span>
                      </div>
                      <p className="text-xs font-sans opacity-90">{exp.summary}</p>
                      <ul className="space-y-2 mt-2">
                        {exp.bulletPoints.map((bp, bpIdx) => (
                          <li key={bpIdx} className="flex items-start gap-2 text-xs sm:text-sm leading-relaxed">
                            <DoodleCheck className="w-4 h-4 shrink-0 mt-0.5" color={isDarkMode ? '#EED3BA' : '#16A34A'} />
                            <span>{bp}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {exp.tech.map((t, tIdx) => (
                          <span key={tIdx} className={`px-2 py-0.5 rounded text-[11px] font-mono border ${isDarkMode ? 'bg-[#151311] border-[#EED3BA]/30 text-[#EED3BA]' : 'bg-gray-50 border-gray-200 text-gray-700'
                            }`}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Education */}
                <div className={`p-5 sm:p-6 border-2 rounded-2xl ${isDarkMode ? 'bg-[#251F1C] border-[#EED3BA]/50' : 'bg-white border-[#263D5B]/30 doodle-shadow-sm'
                  }`}>
                  <div className="flex items-center gap-2 mb-3">
                    <GraduationCap className="w-5 h-5 text-[#16A34A]" />
                    <h3 className="font-delius text-xl font-bold">Education</h3>
                  </div>
                  <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1">
                    <span className="font-sans font-bold text-sm sm:text-base">
                      {PORTFOLIO_DATA.education.degree} in {PORTFOLIO_DATA.education.field}
                    </span>
                    <span className="text-xs font-mono opacity-80">{PORTFOLIO_DATA.education.period}</span>
                  </div>
                  <p className="text-xs font-sans opacity-90 mb-2">
                    {PORTFOLIO_DATA.education.institution} · CGPA: {PORTFOLIO_DATA.education.cgpa}
                  </p>
                  <ul className="space-y-1.5 text-xs">
                    {PORTFOLIO_DATA.education.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <span className="text-[#49B6E5] font-bold">›</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Projects */}
                <div className={`p-5 sm:p-6 border-2 rounded-2xl ${isDarkMode ? 'bg-[#251F1C] border-[#EED3BA]/50' : 'bg-white border-[#263D5B]/30 doodle-shadow-sm'
                  }`}>
                  <div className="flex items-center gap-2 mb-3">
                    <Code className="w-5 h-5 text-[#D97706]" />
                    <h3 className="font-delius text-xl font-bold">Key Engineering Projects (5)</h3>
                  </div>
                  <div className="space-y-4">
                    {PORTFOLIO_DATA.projects.map((proj) => (
                      <div key={proj.id} className="pb-3 border-b border-current/15 last:border-none last:pb-0">
                        <div className="flex flex-wrap items-center justify-between gap-1">
                          <span className="font-sans font-bold text-sm">{proj.title}</span>
                          <span className="text-xs text-[#49B6E5] font-semibold">{proj.featuredMetric} ({proj.metricLabel})</span>
                        </div>
                        <p className="text-xs font-sans opacity-90 mt-1">{proj.description}</p>
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {proj.tech.map((t, idx) => (
                            <span key={idx} className="text-[10px] font-mono opacity-75">#{t}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hackathons & Achievements */}
                <div className={`p-5 sm:p-6 border-2 rounded-2xl ${isDarkMode ? 'bg-[#251F1C] border-[#EED3BA]/50' : 'bg-white border-[#263D5B]/30 doodle-shadow-sm'
                  }`}>
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="w-5 h-5 text-[#E06D53]" />
                    <h3 className="font-delius text-xl font-bold">Hackathons & Achievements</h3>
                  </div>
                  <div className="space-y-3">
                    {PORTFOLIO_DATA.achievements.map((ach, idx) => (
                      <div key={idx} className="pb-2.5 border-b border-current/15 last:border-none last:pb-0">
                        <div className="flex flex-wrap items-baseline justify-between gap-1">
                          <span className="font-sans font-bold text-sm">{ach.title}</span>
                          <span className="text-xs font-mono opacity-80">{ach.date}</span>
                        </div>
                        <p className="text-xs font-sans text-[#49B6E5] font-medium">{ach.location}</p>
                        <p className="text-xs font-sans opacity-90 mt-1">{ach.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Skills */}
                <div className={`p-5 sm:p-6 border-2 rounded-2xl ${isDarkMode ? 'bg-[#251F1C] border-[#EED3BA]/50' : 'bg-white border-[#263D5B]/30 doodle-shadow-sm'
                  }`}>
                  <h3 className="font-delius text-xl font-bold mb-3">Technical Skills Overview</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {PORTFOLIO_DATA.skills.map((skillGroup, idx) => (
                      <div key={idx} className={`p-3 rounded-xl border ${isDarkMode ? 'bg-[#151311] border-[#EED3BA]/20' : 'bg-gray-50 border-gray-200'
                        }`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-sans text-xs font-bold text-[#49B6E5]">{skillGroup.category}</span>
                          <span className="text-[10px] font-mono opacity-60">{skillGroup.doodleTag}</span>
                        </div>
                        <p className="text-xs font-sans opacity-90">{skillGroup.skills.join(', ')}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer status bar */}
          <div className={`px-4 sm:px-6 py-3 border-t-2 flex flex-wrap items-center justify-between gap-3 text-xs font-sans shrink-0 transition-colors ${isDarkMode ? 'border-[#EED3BA]/30 bg-[#251F1C] text-[#EED3BA]/80' : 'border-[#263D5B]/20 bg-[#FAFCFE] text-[#263D5B]'
            }`}>
            <a
              href="/resume.pdf"
              download="Anuj_Patil_Resume.pdf"
              className="underline font-bold hover:opacity-80"
            >
              Direct Download (PDF)
            </a>
            <button
              onClick={onClose}
              className="font-delius font-bold hover:underline cursor-pointer"
            >
              Close Preview
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
