import React from 'react';

interface LogoProps {
  variant?: 'full' | 'mark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  inverted?: boolean; // When on dark navy background
  className?: string;
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  size = 'md',
  inverted = false,
  className = '',
  showSubtitle = true,
}) => {
  // Dimension presets
  const sizeMap = {
    sm: { height: 38, width: variant === 'full' ? 140 : 38 },
    md: { height: 48, width: variant === 'full' ? 180 : 48 },
    lg: { height: 64, width: variant === 'full' ? 240 : 64 },
    xl: { height: 86, width: variant === 'full' ? 320 : 86 },
  };

  const navyColor = inverted ? '#f8fafc' : '#0c2e59';
  const redColor = '#c4122f';

  if (variant === 'mark') {
    return (
      <div className={`inline-flex items-center justify-center shrink-0 ${className}`}>
        <svg
          viewBox="0 0 460 380"
          className="h-full w-auto drop-shadow-sm select-none"
          style={{ height: sizeMap[size].height }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="pbbDropGradMark" x1="20%" y1="10%" x2="80%" y2="90%">
              <stop offset="0%" stop-color="#ff3b56" />
              <stop offset="35%" stop-color="#dd1234" />
              <stop offset="75%" stop-color="#ab0822" />
              <stop offset="100%" stop-color="#730514" />
            </linearGradient>
            <linearGradient id="pbbGlossMark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.85" />
              <stop offset="60%" stop-color="#ffffff" stop-opacity="0.2" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
            </linearGradient>
            <linearGradient id="pbbArcMark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#c4122f" />
              <stop offset="50%" stop-color="#e11d48" />
              <stop offset="100%" stop-color="#991b1b" />
            </linearGradient>
          </defs>

          {/* Sweeping Crescent Arc */}
          <path
            d="M 80 180 C 60 250, 110 350, 250 360 C 360 368, 420 300, 430 250 C 425 275, 375 340, 260 335 C 145 330, 115 250, 130 185 Z"
            fill="url(#pbbArcMark)"
          />

          {/* Navy 'P' Stem and Loop */}
          <path
            d="M 140 45 L 200 45 L 200 60 L 175 60 L 175 290 L 205 290 L 205 305 L 140 305 L 140 290 L 170 290 L 170 60 L 140 60 Z"
            fill={navyColor}
          />
          <path
            d="M 170 45 L 300 45 C 365 45, 395 85, 395 145 C 395 205, 355 245, 285 245 L 170 245 Z
               M 220 80 L 220 210 L 285 210 C 325 210, 348 185, 348 145 C 348 105, 325 80, 285 80 Z"
            fill={navyColor}
          />

          {/* Crimson Medical Cross */}
          <g transform="translate(370, 120)">
            <rect x="25" y="0" width="22" height="70" rx="3" fill="#c4122f" />
            <rect x="0" y="24" width="72" height="22" rx="3" fill="#c4122f" />
          </g>

          {/* 3D Blood Drop inside P */}
          <g transform="translate(285, 145)">
            <path
              d="M 0 -72 C 10 -50, 48 -5, 48 30 C 48 60, 26 82, 0 82 C -26 82, -48 60, -48 30 C -48 -5, -10 -50, 0 -72 Z"
              fill="url(#pbbDropGradMark)"
            />
            <path
              d="M -8 -45 C -25 -15, -34 10, -32 38 C -30 20, -22 -15, -5 -38 C -3 -42, -6 -44, -8 -45 Z"
              fill="url(#pbbGlossMark)"
            />
            <ellipse cx="-16" cy="38" rx="7" ry="12" transform="rotate(-15 -16 38)" fill="url(#pbbGlossMark)" opacity="0.6" />
          </g>

          {/* Cradling Hand */}
          <g transform="translate(190, 235)">
            <path
              d="M 0 35 C 20 65, 75 75, 120 65 C 160 55, 185 25, 195 5 C 170 18, 140 22, 105 15 C 80 10, 60 -5, 35 -10 C 15 -15, 0 5, 0 35 Z"
              fill={navyColor}
            />
          </g>
        </svg>
      </div>
    );
  }

  // Full Brand Logo with Emblem & Clean Typographic Signature
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Emblem Icon */}
      <div className="shrink-0 relative group">
        <svg
          viewBox="0 0 460 380"
          className="w-auto drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
          style={{ height: sizeMap[size].height }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="pbbDropGradFull" x1="20%" y1="10%" x2="80%" y2="90%">
              <stop offset="0%" stop-color="#ff3b56" />
              <stop offset="35%" stop-color="#dd1234" />
              <stop offset="75%" stop-color="#ab0822" />
              <stop offset="100%" stop-color="#730514" />
            </linearGradient>
            <linearGradient id="pbbGlossFull" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.85" />
              <stop offset="60%" stop-color="#ffffff" stop-opacity="0.2" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
            </linearGradient>
            <linearGradient id="pbbArcFull" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#c4122f" />
              <stop offset="50%" stop-color="#e11d48" />
              <stop offset="100%" stop-color="#991b1b" />
            </linearGradient>
          </defs>

          {/* Sweeping Crescent Arc */}
          <path
            d="M 80 180 C 60 250, 110 350, 250 360 C 360 368, 420 300, 430 250 C 425 275, 375 340, 260 335 C 145 330, 115 250, 130 185 Z"
            fill="url(#pbbArcFull)"
          />

          {/* Navy 'P' Stem and Loop */}
          <path
            d="M 140 45 L 200 45 L 200 60 L 175 60 L 175 290 L 205 290 L 205 305 L 140 305 L 140 290 L 170 290 L 170 60 L 140 60 Z"
            fill={navyColor}
          />
          <path
            d="M 170 45 L 300 45 C 365 45, 395 85, 395 145 C 395 205, 355 245, 285 245 L 170 245 Z
               M 220 80 L 220 210 L 285 210 C 325 210, 348 185, 348 145 C 348 105, 325 80, 285 80 Z"
            fill={navyColor}
          />

          {/* Crimson Medical Cross */}
          <g transform="translate(370, 120)">
            <rect x="25" y="0" width="22" height="70" rx="3" fill="#c4122f" />
            <rect x="0" y="24" width="72" height="22" rx="3" fill="#c4122f" />
          </g>

          {/* 3D Blood Drop inside P */}
          <g transform="translate(285, 145)">
            <path
              d="M 0 -72 C 10 -50, 48 -5, 48 30 C 48 60, 26 82, 0 82 C -26 82, -48 60, -48 30 C -48 -5, -10 -50, 0 -72 Z"
              fill="url(#pbbDropGradFull)"
            />
            <path
              d="M -8 -45 C -25 -15, -34 10, -32 38 C -30 20, -22 -15, -5 -38 C -3 -42, -6 -44, -8 -45 Z"
              fill="url(#pbbGlossFull)"
            />
            <ellipse cx="-16" cy="38" rx="7" ry="12" transform="rotate(-15 -16 38)" fill="url(#pbbGlossFull)" opacity="0.6" />
          </g>

          {/* Cradling Hand */}
          <g transform="translate(190, 235)">
            <path
              d="M 0 35 C 20 65, 75 75, 120 65 C 160 55, 185 25, 195 5 C 170 18, 140 22, 105 15 C 80 10, 60 -5, 35 -10 C 15 -15, 0 5, 0 35 Z"
              fill={navyColor}
            />
          </g>
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col leading-none">
        <span
          className={`font-black tracking-wider uppercase ${
            inverted ? 'text-white' : 'text-[#0c2e59]'
          } ${
            size === 'sm'
              ? 'text-base'
              : size === 'md'
              ? 'text-lg md:text-xl'
              : size === 'lg'
              ? 'text-2xl md:text-3xl'
              : 'text-3xl md:text-4xl'
          }`}
          style={{ letterSpacing: '0.08em' }}
        >
          PREMIUM
        </span>

        <div className="flex items-center gap-1.5 my-0.5">
          <div className="h-[1.5px] w-3 bg-[#c4122f]" />
          <span
            className={`font-extrabold tracking-widest text-[#c4122f] uppercase ${
              size === 'sm' ? 'text-[10px]' : size === 'md' ? 'text-xs' : 'text-sm'
            }`}
            style={{ letterSpacing: '0.12em' }}
          >
            BLOOD BANK
          </span>
          <div className="h-[1.5px] w-3 bg-[#c4122f]" />
        </div>

        {showSubtitle && size !== 'sm' && (
          <div
            className={`flex items-center gap-1 text-[8px] md:text-[9px] font-bold tracking-widest uppercase mt-0.5 ${
              inverted ? 'text-slate-300' : 'text-[#0c2e59]/80'
            }`}
          >
            <span>SAFE BLOOD</span>
            <span className="text-[#c4122f] inline-block scale-75">●</span>
            <span>HEALTHIER TOMORROW</span>
          </div>
        )}
      </div>
    </div>
  );
};
