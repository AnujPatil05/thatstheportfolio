import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, Terminal, Cpu, Zap, Server, ShieldCheck, CheckCircle } from 'lucide-react';
import { Project } from '../../types';
import { DoodleStamp, DoodleUnderline } from './DoodleSVGs';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#263D5B]/50 backdrop-blur-xs font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.2 }}
          className="bg-white border-2 border-[#263D5B] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 doodle-shadow relative"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#263D5B]/15">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <DoodleStamp text={project.badge} color="#49B6E5" />
                <span className="text-xs font-sans text-gray-500 uppercase tracking-wide font-semibold">
                  Category: {project.category}
                </span>
              </div>
              <h2 className="font-delius text-2xl sm:text-3xl font-bold text-[#263D5B]">
                {project.title}
              </h2>
              <p className="text-sm font-sans text-[#49B6E5] font-semibold mt-0.5">
                {project.subtitle}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-[#263D5B] rounded-lg hover:bg-gray-100 transition-colors shrink-0 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Key Metric Spotlight Card */}
          <div className="my-5 p-4 bg-[#49B6E5]/10 border border-[#49B6E5] rounded-xl doodle-border-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-sans text-gray-600 uppercase tracking-wider block font-bold">
                {project.metricLabel}
              </span>
              <span className="font-sans text-2xl sm:text-3xl font-extrabold text-[#263D5B]">
                {project.featuredMetric}
              </span>
            </div>
            <div className="p-2.5 bg-white border border-[#263D5B]/20 rounded-lg text-[#49B6E5] doodle-shadow-sm">
              {project.sketchIcon === 'cpu' && <Cpu className="w-6 h-6 text-[#49B6E5]" />}
              {project.sketchIcon === 'radar' && <ShieldCheck className="w-6 h-6 text-[#16A34A]" />}
              {project.sketchIcon === 'terminal' && <Terminal className="w-6 h-6 text-[#263D5B]" />}
              {project.sketchIcon === 'mic' && <Zap className="w-6 h-6 text-[#D97706]" />}
              {project.sketchIcon === 'git' && <Server className="w-6 h-6 text-[#49B6E5]" />}
            </div>
          </div>

          {/* Detailed Overview */}
          <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
            <div>
              <h4 className="font-sans text-xs font-bold text-[#263D5B] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <span>System Overview</span>
              </h4>
              <p>{project.description}</p>
            </div>

            {/* Technical Bullet points */}
            <div>
              <h4 className="font-sans text-xs font-bold text-[#263D5B] uppercase tracking-wider mb-2">
                Key Engineering Deliverables
              </h4>
              <ul className="space-y-2">
                {project.bulletPoints.map((bp, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                    <CheckCircle className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                    <span>{bp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Architecture Notes */}
            {project.architectureNotes && (
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-sans text-xs text-gray-700">
                <span className="text-[#263D5B] font-bold block mb-1">Architecture &amp; Flow:</span>
                {project.architectureNotes}
              </div>
            )}

            {/* Tech Stack Chips */}
            <div>
              <h4 className="font-sans text-xs font-bold text-[#263D5B] uppercase tracking-wider mb-2">
                Technologies &amp; Tools
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-white border border-[#263D5B]/30 rounded-md font-sans text-xs text-[#263D5B] doodle-shadow-sm font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Links */}
          <div className="mt-6 pt-4 border-t border-[#263D5B]/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#263D5B] text-[#263D5B] font-delius text-xs sm:text-sm font-bold hover:bg-gray-50 transition-colors doodle-shadow-sm"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#49B6E5] text-[#263D5B] font-delius text-xs sm:text-sm font-bold hover:bg-[#3FA2CD] transition-colors doodle-shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Production Endpoint</span>
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#263D5B] text-white rounded-lg font-delius text-xs sm:text-sm font-bold hover:bg-[#1E3048] cursor-pointer"
            >
              Close Spec
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
