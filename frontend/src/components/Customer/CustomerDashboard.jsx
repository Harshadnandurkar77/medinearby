import { useState } from 'react';
import { 
  CURRENT_USER, 
  MOCK_RESERVATIONS, 
  MOCK_PHARMACIES, 
  MOCK_RESTOCK_ALERTS, 
  RECENT_SEARCHES 
} from './mockData';

export default function CustomerDashboard({ onSearch, onSelectPharmacy, onViewReservations }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTabFilter, setActiveTabFilter] = useState('All');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleQuickSearchClick = (term) => {
    setSearchQuery(term);
    if (onSearch) {
      onSearch(term);
    }
  };

  return (
    <div className="space-y-8 animate-hero-entrance">
      
      {/* 1. Top Section - Greeting & Hero Medicine Search Card */}
      <div className="bg-gradient-to-br from-[#1E40AF] via-[#2563EB] to-[#0F766E] rounded-3xl p-6 sm:p-10 text-white shadow-xl shadow-[#2563EB]/15 relative overflow-hidden">
        {/* Background abstract ambient circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-[#06B6D4]/20 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <span className="inline-block px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-semibold tracking-wide text-white/90 mb-3 border border-white/20">
            📍 Current Location: {CURRENT_USER.location}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
            Good morning, {CURRENT_USER.name} 👋
          </h1>
          <p className="text-blue-100 text-base sm:text-lg mb-8 font-medium">
            Find the medicine you need across verified local pharmacies in real-time.
          </p>

          {/* Main Hero Search Bar */}
          <form onSubmit={handleSearchSubmit} className="bg-white rounded-2xl p-2 sm:p-2.5 shadow-2xl flex flex-col sm:flex-row items-center gap-2 border border-white/80">
            
            {/* Input with Search Icon */}
            <div className="flex-1 flex items-center gap-3 px-3 py-1.5 w-full">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search medicine by name, generic name, or brand..."
                className="w-full text-sm sm:text-base font-medium text-[#0F172A] placeholder-[#64748B] outline-none bg-transparent"
              />
              
              {/* Voice Search Icon (Future Feature Tooltip) */}
              <button
                type="button"
                title="Voice Search (Coming soon)"
                className="text-[#64748B] hover:text-[#2563EB] p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" y1="19" x2="12" y2="23"></line>
                  <line x1="8" y1="23" x2="16" y2="23"></line>
                </svg>
              </button>
            </div>

            {/* Primary Search CTA Button */}
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#2563EB] hover:bg-[#1E40AF] text-white px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-lg shadow-[#2563EB]/30 transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span>Search Medicine</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>

          </form>

          {/* Quick Search Chips */}
          <div className="flex items-center gap-2 flex-wrap mt-4 text-xs">
            <span className="text-blue-200 font-semibold">Popular:</span>
            {RECENT_SEARCHES.slice(0, 4).map((term, i) => (
              <button
                key={i}
                onClick={() => handleQuickSearchClick(term)}
                className="bg-white/15 hover:bg-white/25 text-white px-3 py-1 rounded-full backdrop-blur-md transition-colors cursor-pointer border border-white/10"
              >
                {term}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* 2. Dashboard Cards - Key Summary Stats (White cards on light blue background) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Card 1: Active Reservations */}
        <div 
          onClick={onViewReservations}
          className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all cursor-pointer group flex items-center justify-between"
        >
          <div className="space-y-1">
            <p className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Active Reservations</p>
            <h3 className="text-3xl font-extrabold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">2</h3>
            <p className="text-xs text-[#16A34A] font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-ping"></span>
              Ready for pickup today
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
        </div>

        {/* Card 2: Nearby Pharmacies */}
        <div 
          onClick={() => onSearch('')}
          className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all cursor-pointer group flex items-center justify-between"
        >
          <div className="space-y-1">
            <p className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Nearby Pharmacies</p>
            <h3 className="text-3xl font-extrabold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">14</h3>
            <p className="text-xs text-[#0F766E] font-semibold">Within 3 km radius</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#0F766E] flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
        </div>

        {/* Card 3: Restock Alerts */}
        <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Restock Alerts</p>
            <h3 className="text-3xl font-extrabold text-[#0F172A]">3</h3>
            <p className="text-xs text-[#D97706] font-semibold">Updated 2 hours ago</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#D97706] flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </div>
        </div>

      </div>

      {/* 3. Main Dashboard Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Active Reservations & Nearby Pharmacies */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Active Reservation Banner Widget */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#16A34A] animate-ping"></div>
                <h3 className="text-lg font-bold text-[#0F172A]">Active Reservation</h3>
              </div>
              <button 
                onClick={onViewReservations}
                className="text-xs font-bold text-[#2563EB] hover:text-[#1E40AF] cursor-pointer"
              >
                View All (2) →
              </button>
            </div>

            {/* Active Reservation Card */}
            {MOCK_RESERVATIONS.slice(0, 1).map((res) => (
              <div key={res.id} className="bg-[#EFF6FF]/60 border border-[#2563EB]/20 rounded-2xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2563EB]/10 pb-3">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#2563EB] bg-white px-2 py-0.5 rounded-md border border-[#2563EB]/20">
                      ID: {res.id}
                    </span>
                    <h4 className="text-base font-extrabold text-[#0F172A] mt-1">{res.medicineName}</h4>
                    <p className="text-xs text-[#64748B]">{res.form} • Qty: {res.quantity}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="inline-block px-3 py-1 bg-[#2563EB] text-white text-xs font-bold rounded-full shadow-sm">
                      {res.status}
                    </span>
                    <p className="text-xs text-[#64748B] font-semibold mt-1">Pickup Deadline: <span className="text-[#0F172A] font-bold">{res.pickupDeadline}</span></p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-start gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F766E" strokeWidth="2" className="mt-0.5 shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path></svg>
                    <div>
                      <p className="font-bold text-[#0F172A]">{res.pharmacyName}</p>
                      <p className="text-[#64748B] truncate max-w-md">{res.pharmacyAddress}</p>
                    </div>
                  </div>
                  <button
                    onClick={onViewReservations}
                    className="bg-white hover:bg-gray-50 text-[#2563EB] border border-[#2563EB]/30 font-bold px-4 py-2 rounded-xl text-xs shadow-sm transition-all cursor-pointer shrink-0"
                  >
                    View Directions & Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Nearby Pharmacies Showcase */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-bold text-[#0F172A]">Nearby Pharmacies</h3>
                <p className="text-xs text-[#64748B]">Verified pharmacies around Connaught Place</p>
              </div>
              <button 
                onClick={() => onSearch('')}
                className="text-xs font-bold text-[#2563EB] hover:text-[#1E40AF] cursor-pointer"
              >
                See All 14 Pharmacies →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {MOCK_PHARMACIES.slice(0, 4).map((pharm) => (
                <div 
                  key={pharm.id}
                  onClick={() => onSelectPharmacy(pharm)}
                  className="border border-[#E2E8F0] hover:border-[#2563EB]/40 bg-gray-50/50 hover:bg-white p-4 rounded-2xl transition-all cursor-pointer group shadow-2xs hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="text-sm font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors line-clamp-1">
                      {pharm.name}
                    </h4>
                    {pharm.verified && (
                      <span className="shrink-0 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Verified
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#64748B] line-clamp-1 mb-3">{pharm.address}</p>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-200/60">
                    <span className="text-[#64748B] font-medium flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path></svg>
                      {pharm.distanceKm} km away
                    </span>
                    <span className={`font-bold ${pharm.isOpen ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
                      {pharm.isOpen ? 'Open Now' : 'Closed'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 1 Column: Restock Alerts & Safety Information */}
        <div className="space-y-8">
          
          {/* Restock Alerts Widget */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
              <h3 className="text-base font-bold text-[#0F172A]">Recent Restock Alerts</h3>
            </div>

            <div className="space-y-3">
              {MOCK_RESTOCK_ALERTS.map((alert) => (
                <div key={alert.id} className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/60 text-xs">
                  <p className="font-bold text-[#0F172A]">{alert.medicineName}</p>
                  <p className="text-[#64748B]">{alert.pharmacyName} ({alert.distance})</p>
                  <p className="text-[11px] font-bold text-[#D97706] mt-1">✓ {alert.status}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Safety Information Box */}
          <div className="bg-[#EFF6FF] rounded-2xl border border-[#2563EB]/20 p-6 shadow-sm">
            <div className="flex items-center gap-2 text-[#2563EB] mb-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              <h3 className="text-sm font-extrabold">Important Health Disclaimer</h3>
            </div>
            <p className="text-xs text-[#64748B] leading-relaxed mb-3">
              Medicine availability and pricing are updated in real-time by registered pharmacies. For prescription items, please carry a valid doctor's prescription during pickup.
            </p>
            <div className="text-[11px] font-semibold text-[#0F766E] bg-white p-2.5 rounded-xl border border-[#0F766E]/20">
              💡 Tip: Confirm reservation before traveling to guarantee stock hold.
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
