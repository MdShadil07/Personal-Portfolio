import * as React from "react";

export interface GlobeProps {
  className?: string;
}

export default function Globe({ className = "" }: GlobeProps) {
  return (
    <div className={`${className} w-40 h-40`} aria-hidden>
      <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="30" fill="url(#g)" opacity="0.08" />
        <g stroke="#ffffff33" strokeWidth="0.6" fill="none">
          <circle cx="50" cy="50" r="30" />
          <path d="M20 50c10-20 50-20 60 0" />
          <path d="M20 60c10-20 50-20 60 0" />
          <path d="M50 20c-10 10-10 40 0 60" />
          <path d="M60 20c-10 10-10 40 0 60" />
        </g>
      </svg>
      <style>{`.animate-spin-slow{animation: spin 14s linear infinite}@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
