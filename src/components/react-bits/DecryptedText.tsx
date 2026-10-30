import React, { useState, useEffect, useRef } from 'react';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  characters?: string;
  className?: string;
  encryptedClassName?: string;
  animateOn?: 'view' | 'hover' | 'always';
  revealDirection?: 'start' | 'end' | 'center';
  sequential?: boolean;
}

export const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  speed = 40,
  maxIterations = 10,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?',
  className = '',
  encryptedClassName = 'text-amber-500 opacity-80',
  animateOn = 'always',
  revealDirection = 'start',
  sequential = true,
}) => {
  const [displayText, setDisplayText] = useState<string>(text);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isScrambling, setIsScrambling] = useState<boolean>(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const intervalRef = useRef<number | null>(null);

  const startAnimation = () => {
    let iteration = 0;
    const length = text.length;
    const newRevealed = new Set<number>();
    setIsScrambling(true);

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(() => {
        return text
          .split('')
          .map((char, index) => {
            if (char === ' ' || char === '\n') return char;

            const shouldReveal = sequential
              ? revealDirection === 'start'
                ? index <= (iteration / maxIterations) * length
                : length - 1 - index <= (iteration / maxIterations) * length
              : Math.random() < iteration / maxIterations;

            if (shouldReveal) {
              newRevealed.add(index);
              setRevealedIndices(new Set(newRevealed));
              return char;
            }

            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('');
      });

      iteration++;

      if (iteration > maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, speed);
  };

  useEffect(() => {
    if (animateOn === 'always') {
      startAnimation();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text]);

  const handleMouseEnter = () => {
    if (animateOn === 'hover') {
      setIsHovering(true);
      startAnimation();
    }
  };

  return (
    <span
      className={`inline-block font-mono ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovering(false)}
    >
      {displayText.split('').map((char, i) => {
        const isRevealed = !isScrambling || revealedIndices.has(i) || char === ' ';
        return (
          <span
            key={i}
            className={isRevealed ? '' : encryptedClassName}
            style={{ transition: 'color 0.15s ease' }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
};
