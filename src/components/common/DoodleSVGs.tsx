import React from 'react';

// Hand-drawn arrow pointing right or downward
export const DoodleArrow: React.FC<{ className?: string; color?: string; direction?: 'right' | 'down' | 'curved' }> = ({
  className = 'w-12 h-8',
  color = '#49B6E5',
  direction = 'right',
}) => {
  if (direction === 'curved') {
    return (
      <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path
          d="M10 48 C 30 15, 65 12, 88 32 M88 32 L 72 24 M88 32 L 78 45"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (direction === 'down') {
    return (
      <svg viewBox="0 0 50 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path
          d="M24 8 C 22 28, 26 50, 25 70 M25 70 L 14 55 M25 70 L 36 56"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M8 22 C 28 18, 52 23, 70 19 M70 19 L 55 10 M70 19 L 57 29"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// Hand-drawn squiggly underline
export const DoodleUnderline: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-full h-3',
  color = '#49B6E5',
}) => (
  <svg viewBox="0 0 160 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} preserveAspectRatio="none">
    <path
      d="M2 9 C 25 4, 45 14, 70 8 C 95 3, 118 13, 142 8 C 149 6, 156 10, 158 9"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

// Hand-drawn circle / loop highlight around text
export const DoodleCircle: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-24 h-12',
  color = '#49B6E5',
}) => (
  <svg viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} preserveAspectRatio="none">
    <path
      d="M18 32 C 14 16, 38 6, 68 8 C 102 10, 114 26, 108 42 C 101 56, 52 58, 24 50 C 8 44, 12 25, 34 20"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

// Hand-drawn 4-point sparkle (removed star signs)
export const DoodleSparkle: React.FC<{ className?: string; color?: string }> = () => null;

// Hand-drawn sticky tape accent
export const DoodleTape: React.FC<{ className?: string }> = ({ className = 'w-20 h-6' }) => (
  <div
    className={`bg-[#49B6E5]/20 backdrop-blur-xs border-y border-dashed border-[#263D5B]/30 rotate-[-2deg] ${className}`}
    style={{ clipPath: 'polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)' }}
  />
);

// Hand-drawn checkmark
export const DoodleCheck: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-5 h-5',
  color = '#16A34A',
}) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M4 13 L 9 18 C 12 14, 16 8, 20 5"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Hand-drawn stamp badge
export const DoodleStamp: React.FC<{ text: string; className?: string; color?: string; font?: string }> = ({
  text,
  className = '',
  color = '#263D5B',
  font,
}) => {
  const isDoodleText = font === 'font-delius' || text === 'CAN MAKE IT HAPPEN';
  return (
    <div
      className={`inline-flex items-center justify-center px-3 py-1 border-2 border-dashed font-bold text-xs uppercase tracking-wider rotate-[-2deg] doodle-border-sm ${
        isDoodleText ? 'font-delius text-sm' : 'font-sans'
      } ${className}`}
      style={{ borderColor: color, color }}
    >
      {text}
    </div>
  );
};

// Hand-drawn database / microservice cylinder
export const DoodleDatabase: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-8 h-8',
  color = '#263D5B',
}) => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <ellipse cx="20" cy="10" rx="14" ry="5" stroke={color} strokeWidth="2" />
    <path d="M6 10 V 22 C 6 25, 34 25, 34 22 V 10" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M6 22 V 31 C 6 34, 34 34, 34 31 V 22" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Hand-drawn CPU / AST Node
export const DoodleCpu: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-8 h-8',
  color = '#49B6E5',
}) => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="10" y="10" width="20" height="20" rx="4" stroke={color} strokeWidth="2" />
    <path d="M15 15 H 25 V 25 H 15 Z" stroke={color} strokeWidth="1.5" />
    <path d="M15 5 V 10 M25 5 V 10 M15 30 V 35 M25 30 V 35 M5 15 H 10 M5 25 H 10 M30 15 H 35 M30 25 H 35" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Hand-drawn Sun doodle for light mode switch
export const DoodleSun: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-5 h-5',
  color = '#263D5B',
}) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="16" cy="16" r="6" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M16 3 V 7 M16 25 V 29 M3 16 H 7 M25 16 H 29" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M6.8 6.8 L 9.6 9.6 M22.4 22.4 L 25.2 25.2 M25.2 6.8 L 22.4 9.6 M9.6 22.4 L 6.8 25.2" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Hand-drawn Crescent Moon doodle for dark mode switch
export const DoodleMoon: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-5 h-5',
  color = '#EED3BA',
}) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M23 16 C 22.5 21.5, 17.5 25.5, 12 25 C 10 24.8, 8 23.8, 6.5 22.5 C 13.5 22, 19 16.5, 18.5 9.5 C 18.2 7.5, 17.2 5.8, 16 4.5 C 20.5 5.5, 23.5 10.5, 23 16 Z"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={`${color}25`}
    />
  </svg>
);

