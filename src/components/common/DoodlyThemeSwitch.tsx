import React from 'react';
import { motion } from 'motion/react';
import { DoodleSun, DoodleMoon } from './DoodleSVGs';

interface DoodlyThemeSwitchProps {
  isDarkMode: boolean;
  onToggle: () => void;
  className?: string;
}

export const DoodlyThemeSwitch: React.FC<DoodlyThemeSwitchProps> = ({
  isDarkMode,
  onToggle,
  className = '',
}) => {
  return (
    <button
      onClick={onToggle}
      type="button"
      aria-label={isDarkMode ? 'Switch to Light Blueprint mode' : 'Switch to Dark Obsidian Ink mode'}
      className={`group relative flex items-center gap-2 p-1.5 rounded-2xl border-2 transition-all cursor-pointer doodle-border select-none ${
        isDarkMode
          ? 'bg-[#151311] border-[#EED3BA] shadow-[3px_3px_0px_0px_#EED3BA] hover:shadow-[4px_4px_0px_0px_#EED3BA]'
          : 'bg-white border-[#263D5B] shadow-[3px_3px_0px_0px_#263D5B] hover:shadow-[4px_4px_0px_0px_#263D5B]'
      } ${className}`}
      title={isDarkMode ? 'Switch to Parchment Day Mode' : 'Switch to Obsidian Ink Dark Mode'}
    >
      {/* Day Option Indicator */}
      <div
        className={`flex items-center gap-1 px-2 py-1 rounded-xl text-xs transition-all ${
          !isDarkMode
            ? 'bg-[#263D5B] text-white font-bold doodle-shadow-sm'
            : 'text-[#EED3BA]/70 hover:text-[#EED3BA]'
        }`}
      >
        <DoodleSun
          className="w-4 h-4 shrink-0"
          color={!isDarkMode ? '#EED3BA' : '#EED3BA'}
        />
        <span className="font-delius text-xs font-bold tracking-wide">
          day
        </span>
      </div>

      {/* Hand-sketched divider */}
      <span
        className={`text-xs font-mono select-none ${
          isDarkMode ? 'text-[#EED3BA]/50' : 'text-[#263D5B]/50'
        }`}
      >
        /
      </span>

      {/* Dark Option Indicator */}
      <div
        className={`flex items-center gap-1 px-2 py-1 rounded-xl text-xs transition-all ${
          isDarkMode
            ? 'bg-[#4B262F] text-[#EED3BA] font-bold border border-[#EED3BA]/40 shadow-[1px_1px_0px_0px_#EED3BA]'
            : 'text-[#263D5B]/70 hover:text-[#263D5B]'
        }`}
      >
        <DoodleMoon
          className="w-4 h-4 shrink-0"
          color={isDarkMode ? '#EED3BA' : '#263D5B'}
        />
        <span className="font-delius text-xs font-bold tracking-wide">
          ink
        </span>
      </div>

      {/* Tiny tactile hand-drawn sticker label */}
      <div
        className={`hidden sm:block font-delius text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border transition-colors rotate-[-2deg] ${
          isDarkMode
            ? 'bg-[#4B262F] text-[#EED3BA] border-[#EED3BA]/50'
            : 'bg-[#FEF08A] text-[#263D5B] border-[#263D5B]/40'
        }`}
      >
        {isDarkMode ? 'Obsidian' : 'Blueprint'}
      </div>
    </button>
  );
};
