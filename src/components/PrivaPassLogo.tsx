'use client';

import React from 'react';

interface PrivaPassLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  animated?: boolean;
  className?: string;
}

export const PrivaPassLogo: React.FC<PrivaPassLogoProps> = ({
  size = 'md',
  showText = true,
  animated = true,
  className = '',
}) => {
  const sizeMap = {
    sm: { icon: 34, text: 'text-lg', badge: 'text-[9px] px-1.5 py-0.2' },
    md: { icon: 44, text: 'text-xl', badge: 'text-[10px] px-2 py-0.5' },
    lg: { icon: 64, text: 'text-3xl', badge: 'text-xs px-2.5 py-1' },
    xl: { icon: 96, text: 'text-4xl sm:text-5xl', badge: 'text-sm px-3 py-1' },
  };

  const { icon: iconSize, text: textSize, badge: badgeClass } = sizeMap[size];

  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* Dynamic Vector Logo Symbol */}
      <div 
        className="relative flex items-center justify-center shrink-0" 
        style={{ width: iconSize, height: iconSize }}
      >
        {/* Ambient Glow */}
        {animated && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-violet-600/40 via-cyan-500/30 to-emerald-500/20 blur-lg animate-pulse" />
        )}

        <svg
          viewBox="0 0 128 128"
          width={iconSize}
          height={iconSize}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 drop-shadow-[0_0_12px_rgba(168,85,247,0.45)] transition-transform hover:scale-105 duration-300"
        >
          <defs>
            <linearGradient id="logoShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="45%" stopColor="#8b5cf6" />
              <stop offset="85%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <linearGradient id="logoCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Shield Outer Backing */}
          <rect width="128" height="128" rx="28" fill="#080614" fillOpacity="0.85" />
          <rect width="128" height="128" rx="28" stroke="#8b5cf6" strokeWidth="1.5" strokeOpacity="0.35" />

          {/* Cryptographic Faceted Shield */}
          <path
            d="M 64 16 
               L 102 32 
               C 102 72 86 100 64 116 
               C 42 100 26 72 26 32 
               Z"
            fill="#120e2a"
            stroke="url(#logoShieldGrad)"
            strokeWidth="3.5"
            strokeLinejoin="round"
            filter="url(#logoGlow)"
          />

          {/* Concentric ZK Aperture Ring */}
          <circle
            cx="64"
            cy="58"
            r="17"
            stroke="#06b6d4"
            strokeWidth="1.5"
            strokeOpacity="0.6"
            strokeDasharray="4 3"
            className={animated ? "animate-spin-slow origin-center" : ""}
          />
          <circle
            cx="64"
            cy="58"
            r="12.5"
            fill="#1e1442"
            stroke="url(#logoCoreGrad)"
            strokeWidth="2"
          />

          {/* Keyhole / Private Secret Passkey Node */}
          <circle cx="64" cy="55.5" r="3.2" fill="#ffffff" />
          <polygon points="62.5,56.5 65.5,56.5 66.8,64.5 61.2,64.5" fill="#ffffff" />

          {/* Verified Zero-Knowledge Disclose Checkmark */}
          <path
            d="M 52 79 L 61 88 L 78 71"
            stroke="#10b981"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#logoGlow)"
          />

          {/* Constellation Nodes */}
          <circle cx="64" cy="16" r="2.5" fill="#c084fc" />
          <circle cx="102" cy="32" r="2" fill="#06b6d4" />
          <circle cx="26" cy="32" r="2" fill="#8b5cf6" />
          <circle cx="64" cy="116" r="2.5" fill="#10b981" />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className={`${textSize} font-extrabold tracking-wider bg-gradient-to-r from-white via-violet-200 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]`}>
              PrivaPass
            </span>
            <span className={`${badgeClass} font-mono font-bold uppercase tracking-wider rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30 shadow-[0_0_10px_rgba(168,85,247,0.25)]`}>
              Midnight ZK
            </span>
          </div>
          {size !== 'sm' && (
            <p className="text-[11px] sm:text-xs text-gray-400 font-mono tracking-tight mt-0.5">
              Confidential Credentials & Allowlist Protocol
            </p>
          )}
        </div>
      )}
    </div>
  );
};
