export default function RuralHealthcarePanel() {
  return (
    <div className="w-full max-w-md bg-gradient-to-br from-[#E0F2FE] via-[#F0FDF4] to-[#FFF7ED] rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-xl text-[#0F172A] relative overflow-hidden select-none flex flex-col justify-between min-h-[460px]">
      
      {/* Background Soft Glow Orbs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#06B6D4]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0F766E]/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* 1. Header Category Badge */}
      <div className="relative z-10 flex items-center justify-between border-b border-[#0F766E]/15 pb-3.5">
        <div className="inline-flex items-center gap-2 bg-[#DCFCE7] text-[#0F766E] px-3 py-1 rounded-full text-[11px] font-extrabold border border-[#0F766E]/20">
          <span>🌾</span>
          <span>Community Healthcare</span>
        </div>
        <span className="text-[11px] font-bold text-[#64748B]">MediNearby Vision</span>
      </div>

      {/* 2. Central SVG Illustration: Village, Home, Pharmacy & Connection Path */}
      <div className="relative z-10 my-4 flex-1 flex flex-col items-center justify-center">
        
        {/* Main SVG Scene Canvas */}
        <div className="relative w-full h-56 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 p-4 shadow-sm overflow-hidden flex flex-col justify-between">
          
          {/* SVG Background Elements: Soft Hills & Sun */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 360 200" fill="none">
            {/* Soft Sun */}
            <circle cx="180" cy="40" r="28" fill="#FFF7ED" stroke="#FDE68A" strokeWidth="2" opacity="0.8" />
            {/* Background Hills */}
            <path d="M 0 160 Q 90 110 180 140 Q 270 170 360 130 L 360 200 L 0 200 Z" fill="#DCFCE7" opacity="0.6" />
            <path d="M 0 175 Q 120 140 240 165 Q 300 150 360 170 L 360 200 L 0 200 Z" fill="#BBF7D0" opacity="0.4" />
            
            {/* Animated Curved Connection Path between Home and Pharmacy */}
            <path 
              d="M 65 140 Q 180 80 295 135" 
              fill="none" 
              stroke="#2563EB" 
              strokeWidth="2.5" 
              strokeDasharray="5 5"
              className="animate-pulse"
            />
          </svg>

          {/* Top Scene Row: Floating Medicine Capsule & Trust Badge */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-xl border border-blue-200 shadow-2xs">
              <span className="text-xs">💊</span>
              <span className="text-[10px] font-extrabold text-[#2563EB]">Medicine Access</span>
            </div>

            {/* Micro Floating Medicine Icon */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#2563EB] to-[#06B6D4] text-white flex items-center justify-center shadow-md animate-bounce" style={{ animationDuration: '3.5s' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
          </div>

          {/* Bottom Scene Row: Village Home (Left) <---> Village Pharmacy (Right) */}
          <div className="relative z-10 flex items-end justify-between px-2 pb-1">
            
            {/* Village Home & Family */}
            <div className="flex flex-col items-center">
              <div className="bg-white p-2.5 rounded-2xl shadow-md border border-amber-200/80 flex items-center gap-2">
                <span className="text-xl">🏡</span>
                <div className="text-left">
                  <p className="text-[11px] font-extrabold text-[#0F172A] leading-none">Village Home</p>
                  <p className="text-[9px] text-[#64748B] mt-0.5">Family Needs Care</p>
                </div>
              </div>
            </div>

            {/* Local Village Pharmacy & Health Worker */}
            <div className="flex flex-col items-center">
              <div className="bg-white p-2.5 rounded-2xl shadow-md border border-teal-200 flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-[#0F766E] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  🏥
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-extrabold text-[#0F172A] leading-none">Local Pharmacy</p>
                  <p className="text-[9px] text-[#0F766E] font-bold mt-0.5">👨‍⚕️ Health Worker</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* 3. Rural-First Tagline Message Banner */}
      <div className="relative z-10 bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-[#E2E8F0] shadow-sm text-center space-y-1">
        <h3 className="text-base font-extrabold text-[#0F172A] tracking-tight">
          Healthcare access, closer to home
        </h3>
        <p className="text-xs text-[#64748B] leading-relaxed">
          Helping families in rural and semi-urban communities find trusted medicines at nearby local pharmacies.
        </p>
      </div>

    </div>
  );
}
