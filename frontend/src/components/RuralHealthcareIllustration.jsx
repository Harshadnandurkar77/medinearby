import React from 'react';

export default function RuralHealthcareIllustration({ compact = false }) {
  return (
    <div className={`w-full mx-auto flex flex-col items-center justify-between select-none relative ${compact ? 'max-w-[280px] p-0' : 'max-w-lg p-4 sm:p-6 lg:p-8'}`}>
      
      {/* Background Soft Atmospheric Ambient Glows */}
      <div className="absolute top-1/4 -left-10 w-72 h-72 bg-[#E0F2FE]/60 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 -right-10 w-72 h-72 bg-[#DCFCE7]/50 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="relative z-10 w-full flex flex-col items-center">
        
        <style>{`
          .abstract-svg * {
            transform-box: fill-box;
            transform-origin: center;
          }
          
          @media (prefers-reduced-motion: no-preference) {
            @keyframes absCapsule {
              0%, 15% { opacity: 0; transform: scale(0.5) rotate(-15deg); }
              20% { opacity: 1; transform: scale(1.05) rotate(0deg); }
              30% { opacity: 1; transform: scale(1) rotate(0deg); }
              40%, 100% { opacity: 0; transform: scale(1.5) rotate(0deg); }
            }
            
            @keyframes absPulse {
              0%, 35% { opacity: 0; transform: scale(0.5); stroke-width: 8px; }
              45% { opacity: 0.8; transform: scale(1.5); stroke-width: 2px; }
              60%, 100% { opacity: 0; transform: scale(2.5); stroke-width: 0.5px; }
            }
            
            @keyframes absNodes {
              0%, 35% { opacity: 0; transform: scale(0); }
              45% { opacity: 1; transform: scale(1); }
              75% { opacity: 1; transform: scale(1) rotate(0deg); }
              85% { opacity: 1; transform: scale(0.6) rotate(90deg); }
              95%, 100% { opacity: 0; transform: scale(0); }
            }
            
            @keyframes absSymbols {
              0%, 50% { opacity: 0; transform: scale(0.8); }
              60%, 80% { opacity: 1; transform: scale(1); }
              90%, 100% { opacity: 0; transform: scale(0.5); }
            }
            
            @keyframes absCheckmark {
              0%, 65% { opacity: 0; transform: scale(0.5); }
              75%, 85% { opacity: 1; transform: scale(1); }
              95%, 100% { opacity: 0; transform: scale(0.5); }
            }
            
            @keyframes absLogoPattern {
              0%, 80% { opacity: 0; transform: scale(1.5); }
              90% { opacity: 1; transform: scale(1); }
              98%, 100% { opacity: 1; transform: scale(1); }
            }

            .anim-capsule { animation: absCapsule 8s infinite ease-in-out; }
            .anim-pulse { animation: absPulse 8s infinite ease-out; }
            .anim-nodes { animation: absNodes 8s infinite ease-in-out; }
            .anim-symbols { animation: absSymbols 8s infinite ease-in-out; }
            .anim-checkmark { animation: absCheckmark 8s infinite ease-in-out; }
            .anim-logo-pattern { animation: absLogoPattern 8s infinite ease-in-out; }
          }
          
          @media (prefers-reduced-motion: reduce) {
            .anim-capsule, .anim-pulse, .anim-nodes, .anim-symbols, .anim-checkmark {
              display: none;
            }
            .anim-logo-pattern {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}</style>

        <svg 
          viewBox="0 0 320 320" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={`abstract-svg w-full h-auto drop-shadow-sm overflow-visible ${compact ? 'max-h-[180px]' : 'max-h-[280px] lg:max-h-[320px]'}`}
          aria-label="Abstract animation showing medicine need transforming into access via MediNearby"
        >
          <defs>
            <radialGradient id="softGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="primaryGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
            <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Soft Glow */}
          <circle cx="160" cy="160" r="100" fill="url(#softGlow)" />

          {/* 1. Medicine Capsule */}
          <g transform="translate(160, 160)">
            <g className="anim-capsule">
              <rect x="-14" y="-30" width="28" height="60" rx="14" fill="#0F766E" opacity="0.9" />
              <path d="M -14 0 H 14 V 16 A 14 14 0 0 1 -14 16 Z" fill="#06B6D4" />
            </g>
          </g>

          {/* 2. Expanding Pulse */}
          <g transform="translate(160, 160)">
            <circle cx="0" cy="0" r="40" stroke="url(#primaryGrad)" fill="none" className="anim-pulse" />
          </g>

          {/* 3. Outer Nodes (Scattered transitioning to circular) */}
          <g transform="translate(160, 160)">
            <g className="anim-nodes">
              {/* Outer Orbit Nodes */}
              <circle cx="0" cy="-80" r="6" fill="#2563EB" />
              <circle cx="76" cy="-24" r="4" fill="#0F766E" />
              <circle cx="47" cy="65" r="5" fill="#06B6D4" />
              <circle cx="-47" cy="65" r="7" fill="#2563EB" />
              <circle cx="-76" cy="-24" r="5" fill="#0F766E" />
              
              {/* Inner Ring Accents */}
              <circle cx="0" cy="50" r="3" fill="#06B6D4" opacity="0.6" />
              <circle cx="-43" cy="-25" r="2.5" fill="#2563EB" opacity="0.6" />
              <circle cx="43" cy="-25" r="3.5" fill="#0F766E" opacity="0.6" />
              
              {/* Connecting thin dashed orbit line */}
              <circle cx="0" cy="0" r="80" stroke="#E0F2FE" strokeWidth="1.5" strokeDasharray="4 8" fill="none" />
            </g>
          </g>

          {/* 4. Healthcare Symbols appearing inside nodes */}
          <g transform="translate(160, 160)">
            <g className="anim-symbols">
              {/* Medical Cross Outline */}
              <path d="M -8 -24 V -16 H -16 V -8 H -8 V 0 H 0 V -8 H 8 V -16 H 0 V -24 Z" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
              
              {/* Location Pin Outline */}
              <path d="M 12 10 C 12 4.5 17.5 -1 23 4.5 C 28.5 10 23 24 23 24 C 23 24 17.5 15.5 12 10 Z" fill="none" stroke="#0F766E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
            </g>
          </g>

          {/* 5. Availability Checkmark */}
          <g transform="translate(160, 160)">
            <g className="anim-checkmark">
              <circle cx="-16" cy="16" r="12" fill="#DCFCE7" />
              <path d="M -21 16 L -17 20 L -11 12" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#glowFilter)" />
            </g>
          </g>

          {/* 6. Final Converged Logo Pattern */}
          <g transform="translate(160, 160)">
            <g className="anim-logo-pattern">
              {/* Central Solid Logo mark equivalent */}
              <circle cx="0" cy="0" r="32" fill="url(#primaryGrad)" filter="url(#glowFilter)" />
              <path d="M 0 -14 C -7.7 -14 -14 -7.7 -14 0 C -14 10 0 20 0 20 C 0 20 14 10 14 0 C 14 -7.7 7.7 -14 0 -14 Z" fill="#FFFFFF" />
              <circle cx="0" cy="-2" r="5" fill="#2563EB" />
              {/* Surrounding clean ring */}
              <circle cx="0" cy="0" r="48" stroke="#E0F2FE" strokeWidth="3" fill="none" />
            </g>
          </g>

        </svg>

        {/* Narrative Text */}
        <div className={`mt-2 text-center max-w-md px-2 ${compact ? 'space-y-0.5' : 'space-y-1.5'}`}>
          <h3 className={`${compact ? 'text-base' : 'text-xl sm:text-2xl'} font-extrabold text-[#0F172A] tracking-tight`}>
            Medicine access, made simpler
          </h3>
          <p className={`${compact ? 'text-[11px]' : 'text-sm'} text-[#64748B] leading-relaxed font-medium`}>
            Find trusted medicine information when you need it.
          </p>
        </div>

      </div>
    </div>
  );
}
