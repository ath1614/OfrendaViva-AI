import React from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  speed?: number;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '' }) => {
  return (
    <span className={`relative inline-block font-mono tracking-wider glitch-text ${className}`} data-text={text}>
      <span className="relative z-10">{text}</span>
      <span
        aria-hidden="true"
        className="glitch-copy-red absolute inset-0 z-0 text-red-500 opacity-70 pointer-events-none select-none"
      >
        {text}
      </span>
      <span
        aria-hidden="true"
        className="glitch-copy-cyan absolute inset-0 z-0 text-cyan-400 opacity-70 pointer-events-none select-none"
      >
        {text}
      </span>
    </span>
  );
};
