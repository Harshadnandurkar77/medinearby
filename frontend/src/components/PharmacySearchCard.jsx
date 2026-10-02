export default function PharmacySearchCard({ mode = 'login' }) {
  return (
    <div className="w-full max-w-md bg-[#FFFFFF] rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#E2E8F0] space-y-5 text-[#0F172A] relative overflow-hidden select-none">
      
      {/* Soft Background Shimmer Line */}
      <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-blue-50/40 to-transparent skew-x-12 animate-shimmer-sweep pointer-events-none"></div>

      {/* 1. Header Bar: Live Location Status & Card Title */}
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3.5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0F766E] animate-ping"></span>
          <span className="text-xs font-extrabold text-[#0F766E] uppercase tracking-wider">Live Location</span>
        </div>
        <span className="text-xs font-bold text-[#64748B]">Nearby Pharmacies</span>
      </div>

      {/* 2. Compact Search Field Mockup */}
      <div className="bg-[#EFF6FF] rounded-2xl p-3 border border-[#2563EB]/20 flex items-center gap-2.5 shadow-2xs">
        <div className="w-7 h-7 rounded-lg bg-[#2563EB] text-white flex items-center justify-center shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <span className="text-xs font-semibold text-[#0F172A] flex-1">
          {mode === 'login' ? 'Search Paracetamol, Amoxicillin...' : 'Find Medicine & Compare Stock...'}
        </span>
        <span className="text-[10px] font-bold text-[#2563EB] bg-white px-2 py-0.5 rounded-md border border-[#2563EB]/20">
          GPS Active
        </span>
      </div>

      {/* 3. Center Location Visualization (Radar & Pharmacy Pin Map) */}
      <div className="relative h-44 rounded-2xl bg-gradient-to-br from-blue-50/70 via-slate-50 to-teal-50/50 border border-[#E2E8F0] flex items-center justify-center overflow-hidden">
        
        {/* Subtle Map Grid Lines Background */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:14px_14px]"></div>

        {/* Outer Expanding Sonar Radar Rings */}
        <div className="absolute w-32 h-32 rounded-full border border-[#06B6D4]/40 animate-pulse-ring pointer-events-none"></div>
        <div className="absolute w-32 h-32 rounded-full border border-[#0F766E]/30 animate-pulse-ring-delayed pointer-events-none"></div>

        {/* Central User Location Pin */}
        <div className="relative z-10 flex flex-col items-center animate-heartbeat-pulse">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#2563EB] to-[#06B6D4] text-white flex items-center justify-center shadow-lg shadow-[#2563EB]/30 border-2 border-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <line x1="12" y1="7" x2="12" y2="13"></line>
              <line x1="9" y1="10" x2="15" y2="10"></line>
            </svg>
          </div>
          <span className="text-[10px] font-extrabold text-[#0F172A] bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full border border-gray-200 mt-1 shadow-2xs">
            You
          </span>
        </div>

        {/* Pharmacy Marker 1: Top Right */}
        <div className="absolute top-4 right-8 z-10 flex items-center gap-1.5 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-xl shadow-md border border-emerald-200 animate-hero-entrance">
          <div className="w-2 h-2 rounded-full bg-[#16A34A]"></div>
          <span className="text-[10px] font-bold text-[#0F172A]">City Care (0.8 km)</span>
        </div>

        {/* Pharmacy Marker 2: Bottom Left */}
        <div className="absolute bottom-4 left-6 z-10 flex items-center gap-1.5 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-xl shadow-md border border-blue-200 animate-hero-entrance-delayed">
          <div className="w-2 h-2 rounded-full bg-[#2563EB]"></div>
          <span className="text-[10px] font-bold text-[#0F172A]">HealthPlus (1.4 km)</span>
        </div>

        {/* Pharmacy Marker 3: Top Left */}
        <div className="absolute top-5 left-8 z-10 w-4 h-4 rounded-full bg-[#0F766E]/20 border border-[#0F766E] flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#0F766E]"></div>
        </div>

        {/* Curved Connection Route Line Simulation */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
          <path d="M 180 88 Q 230 40 280 30" fill="none" stroke="#2563EB" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M 180 88 Q 120 120 70 135" fill="none" stroke="#0F766E" strokeWidth="2" strokeDasharray="4 4" />
        </svg>

      </div>

      {/* 4. Small Pharmacy Result Cards */}
      <div className="space-y-2">
        {/* Card 1 */}
        <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl px-3.5 py-2.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="text-base">🏥</span>
            <div>
              <p className="font-extrabold text-[#0F172A]">City Care Pharmacy</p>
              <p className="text-[11px] text-[#64748B]">0.8 km away • Connaught Place</p>
            </div>
          </div>
          <span className="bg-[#16A34A] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-2xs">
            In Stock
          </span>
        </div>

        {/* Card 2 */}
        <div className="bg-[#EFF6FF] border border-[#2563EB]/20 rounded-2xl px-3.5 py-2.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="text-base">💊</span>
            <div>
              <p className="font-extrabold text-[#0F172A]">HealthPlus Pharmacy</p>
              <p className="text-[11px] text-[#64748B]">1.4 km away • Starts at ₹30</p>
            </div>
          </div>
          <span className="bg-[#2563EB] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-2xs">
            ₹30 / Unit
          </span>
        </div>
      </div>

      {/* 5. Properly Positioned Bottom Badge (Fully Inside Card, 0% Overflow) */}
      <div className="bg-gradient-to-r from-blue-50 to-teal-50 border border-[#E2E8F0] p-3 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold text-[#0F766E]">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
        <span>Find trusted pharmacies near you</span>
      </div>

    </div>
  );
}
