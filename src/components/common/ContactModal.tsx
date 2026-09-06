import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Phone, MapPin, Github, Linkedin, Copy, Check, Send, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { DoodleStamp } from './DoodleSVGs';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [emailDispatched, setEmailDispatched] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.contact.email);
    setCopied(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#49B6E5', '#263D5B', '#16A34A'],
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    setSent(true);
    setEmailDispatched(true);

    // Formulate real mailto URI to anuj05patil@gmail.com
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Hello Anuj,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\nSent from Portfolio dossier`
    );
    const mailtoUrl = `mailto:${PORTFOLIO_DATA.contact.email}?subject=${subject}&body=${body}`;

    // Trigger email client opening
    try {
      window.location.href = mailtoUrl;
    } catch {
      window.open(mailtoUrl, '_blank');
    }

    // Also copy draft to clipboard for user convenience
    try {
      navigator.clipboard.writeText(`To: ${PORTFOLIO_DATA.contact.email}\nSubject: Portfolio Inquiry from ${formData.name}\n\n${formData.message}`);
    } catch {}

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#49B6E5', '#263D5B', '#16A34A', '#D97706'],
    });

    setTimeout(() => {
      setSent(false);
      setFormData({ name: '', email: '', message: '' });
      setEmailDispatched(false);
      onClose();
    }, 2800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#263D5B]/50 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          className="bg-white border-2 border-[#263D5B] rounded-2xl w-full max-w-lg p-6 sm:p-7 doodle-shadow relative"
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-3 border-b border-[#263D5B]/15">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <DoodleStamp text="LET'S CONNECT" color="#49B6E5" />
                <span className="text-xs font-sans text-gray-500 font-medium">Fast Response</span>
              </div>
              <h3 className="font-delius text-2xl sm:text-3xl font-bold text-[#263D5B]">
                Get in Touch with Anuj
              </h3>
              <p className="text-xs font-sans text-gray-600 mt-0.5">
                Full-stack &amp; AI systems engineer open for production roles &amp; high-impact projects.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-[#263D5B] rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Contact Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-4">
            <button
              onClick={handleCopyEmail}
              className="flex items-center justify-between p-3 rounded-xl border-2 border-[#263D5B] bg-[#49B6E5]/10 hover:bg-[#49B6E5]/20 transition-all text-left doodle-shadow-sm group cursor-pointer"
            >
              <div className="overflow-hidden">
                <span className="text-[10px] font-sans text-gray-500 uppercase tracking-wider block font-semibold">
                  Direct Email
                </span>
                <span className="font-sans text-xs font-bold text-[#263D5B] truncate block">
                  {PORTFOLIO_DATA.contact.email}
                </span>
              </div>
              <span className="p-1.5 bg-white rounded-md text-[#263D5B] group-hover:scale-105 transition-transform shrink-0 ml-2">
                {copied ? <Check className="w-4 h-4 text-[#16A34A]" /> : <Copy className="w-4 h-4" />}
              </span>
            </button>

            <a
              href={`tel:${PORTFOLIO_DATA.contact.phone}`}
              className="flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:border-[#263D5B] hover:bg-gray-50 transition-all text-left group"
            >
              <div>
                <span className="text-[10px] font-sans text-gray-500 uppercase tracking-wider block font-semibold">
                  Phone / WhatsApp
                </span>
                <span className="font-sans text-xs font-bold text-[#263D5B]">
                  {PORTFOLIO_DATA.contact.phone}
                </span>
              </div>
              <span className="p-1.5 bg-gray-100 rounded-md text-[#263D5B] group-hover:scale-105 transition-transform">
                <Phone className="w-4 h-4" />
              </span>
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
            <a
              href={PORTFOLIO_DATA.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-gray-200 text-xs font-delius font-bold hover:border-[#263D5B] hover:bg-gray-50 text-[#263D5B] transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href={PORTFOLIO_DATA.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-gray-200 text-xs font-delius font-bold hover:border-[#263D5B] hover:bg-gray-50 text-[#263D5B] transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#49B6E5]" />
              <span>LinkedIn</span>
            </a>
          </div>

          {/* Quick Message Form - no placeholder texts */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-sans font-bold text-[#263D5B] uppercase tracking-wider mb-1">
                Your Name / Organization
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-[#49B6E5] focus:outline-hidden font-sans"
              />
            </div>
            <div>
              <label className="block text-xs font-sans font-bold text-[#263D5B] uppercase tracking-wider mb-1">
                Your Contact Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-[#49B6E5] focus:outline-hidden font-sans"
              />
            </div>
            <div>
              <label className="block text-xs font-sans font-bold text-[#263D5B] uppercase tracking-wider mb-1">
                Message / Role Discussion
              </label>
              <textarea
                rows={3}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-[#49B6E5] focus:outline-hidden font-sans resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={sent}
              className="w-full py-2.5 px-4 bg-[#263D5B] hover:bg-[#1E3048] text-white font-delius text-base font-bold rounded-lg doodle-shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {sent ? (
                <>
                  <Check className="w-4 h-4 text-[#16A34A]" />
                  <span>Email Dispatched to anuj05patil@gmail.com!</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 text-[#49B6E5]" />
                  <span>Send Direct Email</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
