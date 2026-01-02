import React from 'react';

type LogoProps = React.SVGProps<SVGSVGElement> & {
  className?: string;
};

export default function Logo({ className, ...props }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 160 36"
      width="160"
      height="36"
      role="img"
      aria-label="Shadil.Dev logo"
      className={className}
      {...props}
    >
      <title>Shadil.Dev</title>

      <style>{`
        @keyframes blink { 0% { opacity: 1 } 50% { opacity: 0 } 100% { opacity: 1 } }
        .cursor { animation: blink 1s steps(2,start) infinite; }
        @media (prefers-reduced-motion: reduce) { .cursor { animation: none } }
      `}</style>

      {/* Primary name; uses currentColor so it follows the container text color */}
      <text x="4" y="18" fill="currentColor" fontWeight="800" fontFamily="Arial, Helvetica, sans-serif" fontSize="18">Shadil</text>

      {/* Tagline placed below the primary name to match original layout */}
      <text x="4" y="30" fill="#6b7280" fontWeight="600" fontFamily="Courier New, monospace" fontSize="10">Code for Change</text>

      {/* Blinking cursor placed near the tagline — color follows currentColor so it adapts to theme */}
      <rect className="cursor" x="96" y="20" width="6" height="10" rx="0.6" fill="currentColor" />
    </svg>
  );
}
