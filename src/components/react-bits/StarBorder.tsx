import React from 'react';

interface StarBorderProps {
  as?: React.ElementType;
  className?: string;
  color?: string;
  speed?: string;
  children?: React.ReactNode;
}

export const StarBorder: React.FC<StarBorderProps> = ({
  as: Component = 'div',
  className = '',
  color = '#FFAA00',
  speed = '4s',
  children,
  ...props
}) => {
  return (
    <Component
      className={`relative inline-block overflow-hidden rounded-2xl p-[1px] ${className}`}
      {...props}
    >
      <div
        className="absolute inset-0 animate-star-spin"
        style={{
          background: `conic-gradient(from 0deg, transparent 0 340deg, ${color} 360deg)`,
          animationDuration: speed,
        }}
      />
      <div className="relative z-10 h-full w-full rounded-2xl bg-black/80 backdrop-blur-md">
        {children}
      </div>
    </Component>
  );
};
