import { useState } from 'react';

export default function CreateAccountPage({ onReplayIntro, onSwitchToLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-gradient-to-br from-brand-bg via-[#f0f7ff] to-[#e1f0f5] relative">
      
      {/* Replay Intro Button in Header */}
      {onReplayIntro && (
        <button
          onClick={onReplayIntro}
          className="fixed top-6 right-6 z-20 flex items-center gap-2 text-xs font-semibold text-brand-teal hover:text-brand-primary bg-brand-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-gray-200 shadow-md hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          Replay Intro Animation
        </button>
      )}

      <div className="max-w-6xl w-full bg-brand-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/60 animate-hero-entrance">
        
        {/* Left Side - Decorative 3D Illustration with Capsule Tilt & Shimmer Sweep */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-brand-bg via-[#e6f2fe] to-[#d1e8e6] relative items-center justify-center p-12 overflow-hidden select-none">
          {/* Background abstract glowing blur shapes */}
          <div className="absolute top-10 left-10 w-72 h-72 bg-brand-cyan/20 rounded-full blur-3xl animate-pulse-ring"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-brand-teal/20 rounded-full blur-3xl animate-pulse-ring-delayed"></div>
          
          {/* 3D Dynamic Card Container */}
          <div className="relative z-10 w-full max-w-sm aspect-square perspective-1000">
            
            {/* Main Floating Card */}
            <div className="absolute inset-0 bg-brand-white/70 backdrop-blur-xl border border-white/80 rounded-3xl shadow-2xl transform rotate-y-12 rotate-x-6 animate-capsule-tilt-float flex flex-col items-center justify-center p-8 overflow-hidden">
              
              {/* Shimmer Sweep Light Ray */}
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 animate-shimmer-sweep pointer-events-none"></div>

              {/* Central Glowing Icon Box with Heartbeat Pulse */}
              <div className="w-24 h-24 bg-gradient-to-tr from-brand-primary to-brand-cyan rounded-3xl shadow-xl flex items-center justify-center text-brand-white mb-6 animate-heartbeat-pulse">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="8.5" cy="7" r="4"></circle>
                  <line x1="20" y1="8" x2="20" y2="14"></line>
                  <line x1="17" y1="11" x2="23" y2="11"></line>
                </svg>
              </div>
              <div className="w-3/4 h-3.5 bg-brand-primary/15 rounded-full mb-3 animate-pulse"></div>
              <div className="w-1/2 h-3.5 bg-brand-teal/15 rounded-full"></div>
              
              {/* Floating 3D Medicine Capsule with Tilt & Float */}
              <div className="absolute -right-6 -top-6 w-18 h-18 bg-gradient-to-br from-brand-teal to-brand-cyan rounded-full shadow-2xl border-4 border-brand-white flex items-center justify-center transform rotate-45 animate-capsule-tilt-float" style={{ animationDelay: '-2s' }}>
                <div className="w-full h-1/2 bg-brand-white/30 rounded-t-full absolute top-0"></div>
                <div className="w-3 h-3 bg-white rounded-full opacity-70"></div>
              </div>

              {/* Floating Live Pharmacy Badge */}
              <div className="absolute -left-6 -bottom-4 bg-brand-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-white flex items-center gap-2 animate-capsule-tilt-float" style={{ animationDelay: '-1s' }}>
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
                <span className="text-xs font-semibold text-brand-dark">Instant Stock Alerts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Create Account Form */}
        <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center animate-hero-entrance-delayed">
          <div className="max-w-md w-full mx-auto">
            
            {/* Mobile Logo */}
            <div className="md:hidden flex items-center gap-2 mb-6 text-brand-primary">
               <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <line x1="12" y1="7" x2="12" y2="13"></line>
                  <line x1="9" y1="10" x2="15" y2="10"></line>
               </svg>
               <span className="text-xl font-extrabold text-brand-dark">Medi<span className="text-brand-primary">Nearby</span></span>
            </div>

            <h2 className="text-3xl font-extrabold text-brand-dark mb-1.5 tracking-tight">Create an account</h2>
            <p className="text-brand-muted mb-6 text-sm">Join MediNearby to locate & reserve medicines near you in real-time.</p>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs font-semibold text-brand-text mb-1.5 uppercase tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-brand-primary/15 focus:border-brand-primary outline-none transition-all text-sm"
                  placeholder="e.g. Sarah Jenkins"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-text mb-1.5 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-brand-primary/15 focus:border-brand-primary outline-none transition-all text-sm"
                  placeholder="name@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-text mb-1.5 uppercase tracking-wider">Phone Number <span className="text-brand-muted font-normal lowercase">(for stock alerts)</span></label>
                <input 
                  type="tel" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-brand-primary/15 focus:border-brand-primary outline-none transition-all text-sm"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-text mb-1.5 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-brand-primary/15 focus:border-brand-primary outline-none transition-all text-sm"
                    placeholder="Create a strong password"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-text transition-colors p-1"
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded border-gray-300 text-brand-primary focus:ring-brand-primary/30 transition-all cursor-pointer" 
                  />
                  <span className="text-xs text-brand-muted group-hover:text-brand-text transition-colors leading-relaxed">
                    I agree to the <a href="#" className="underline text-brand-primary font-medium">Terms of Service</a> and <a href="#" className="underline text-brand-primary font-medium">Privacy Policy</a>.
                  </span>
                </label>
              </div>

              <button 
                type="submit"
                className="w-full mt-2 bg-brand-primary hover:bg-brand-dark text-brand-white py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-brand-primary/25 hover:shadow-brand-primary/40 active:scale-[0.99] cursor-pointer"
              >
                Create Account
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-brand-muted">
              Already have an account?{' '}
              <button 
                type="button"
                onClick={onSwitchToLogin}
                className="font-semibold text-brand-primary hover:text-brand-dark transition-colors cursor-pointer"
              >
                Log in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
