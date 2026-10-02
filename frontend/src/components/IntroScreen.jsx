import { useEffect } from 'react';

export default function IntroScreen({ onComplete }) {
  useEffect(() => {
    // Auto-advance after 2.8 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-brand-bg via-[#e6f0fa] to-[#d1e8e6] overflow-hidden select-none">
      {/* Ambient background blur blobs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-brand-cyan/20 rounded-full blur-3xl animate-pulse-ring opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-brand-primary/15 rounded-full blur-3xl animate-pulse-ring-delayed opacity-40 pointer-events-none"></div>

      {/* Skip Button */}
      <button 
        onClick={onComplete}
        className="absolute top-8 right-8 text-brand-muted hover:text-brand-primary font-medium text-sm px-4 py-2 rounded-full hover:bg-brand-white/60 backdrop-blur-sm transition-all z-20"
      >
        Skip intro
      </button>

      <div className="relative flex flex-col items-center z-10">
        {/* Animation Container */}
        <div className="relative flex items-center justify-center w-48 h-48 mb-8 motion-reduce:hidden">
          
          {/* Dual Pulsing Sonar Rings */}
          <div className="absolute inset-0 rounded-full border border-brand-cyan/50 animate-pulse-ring"></div>
          <div className="absolute inset-0 rounded-full border border-brand-teal/40 animate-pulse-ring-delayed"></div>
          
          {/* Orbital Pharmacy Orbit Rings & Satellite Markers */}
          <div className="absolute inset-0 rounded-full border border-dashed border-brand-teal/20 animate-orbit-rotate">
            {/* Orbiting Satellite Node 1 - Pharmacy Pill Marker */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 bg-brand-white border border-brand-cyan rounded-full flex items-center justify-center shadow-md animate-orbit-counter">
              <div className="w-2.5 h-2.5 bg-brand-cyan rounded-full"></div>
            </div>

            {/* Orbiting Satellite Node 2 - Cross Marker */}
            <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 bg-brand-teal text-brand-white rounded-full flex items-center justify-center shadow-md animate-orbit-counter">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </div>

            {/* Orbiting Satellite Node 3 - Mini Dot Marker */}
            <div className="absolute -bottom-2 left-1/4 w-5 h-5 bg-brand-primary rounded-full flex items-center justify-center shadow-sm animate-orbit-counter">
              <div className="w-1.5 h-1.5 bg-brand-white rounded-full"></div>
            </div>
          </div>

          {/* Central Heartbeat Location Pin Icon */}
          <div className="z-10 text-brand-primary animate-hero-entrance animate-heartbeat-pulse p-4 rounded-3xl bg-brand-white/80 backdrop-blur-md shadow-xl border border-brand-white">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <line x1="12" y1="7" x2="12" y2="13"></line>
              <line x1="9" y1="10" x2="15" y2="10"></line>
            </svg>
          </div>
        </div>

        {/* Static fallback for reduced motion */}
        <div className="hidden motion-reduce:flex items-center justify-center w-40 h-40 mb-8 text-brand-primary">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
             <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
             <line x1="12" y1="7" x2="12" y2="13"></line>
             <line x1="9" y1="10" x2="15" y2="10"></line>
          </svg>
        </div>

        {/* Brand & Tagline - Hero Entrance Animations */}
        <h1 className="text-4xl font-extrabold text-brand-dark mb-3 tracking-tight animate-hero-entrance">
          Medi<span className="text-brand-primary">Nearby</span>
        </h1>
        <div className="text-center text-brand-teal text-lg font-medium animate-hero-entrance-delayed">
          <p>Find medicines nearby.</p>
          <p>Reserve with confidence.</p>
        </div>

        {/* Fallback button for reduced motion */}
        <button 
          onClick={onComplete}
          className="hidden motion-reduce:block mt-8 px-6 py-2 bg-brand-primary text-brand-white rounded-lg hover:bg-brand-dark transition-colors shadow-md"
        >
          Continue to Login
        </button>
      </div>
    </div>
  );
}
