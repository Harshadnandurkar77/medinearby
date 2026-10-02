import { useState } from 'react';
import { MOCK_PHARMACIES } from './mockData';

export default function PharmacyResultsScreen({ 
  selectedMedicine, 
  onBackToSearch,
  onSelectPharmacy,
  onReserve 
}) {
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'map'
  const [filterStockOnly, setFilterStockOnly] = useState(false);

  const medicineName = selectedMedicine ? selectedMedicine.name : "Paracetamol 500mg";
  const startingPrice = selectedMedicine ? selectedMedicine.startingPrice : 20;

  const pharmacies = MOCK_PHARMACIES.filter((p) => {
    if (filterStockOnly && p.stockStatus === 'Currently unavailable') return false;
    return true;
  });

  const getStockBadgeClass = (status) => {
    switch (status) {
      case 'In stock':
        return 'bg-emerald-50 text-[#16A34A] border-emerald-200';
      case 'Limited stock':
        return 'bg-amber-50 text-[#D97706] border-amber-200';
      default:
        return 'bg-red-50 text-[#DC2626] border-red-200';
    }
  };

  return (
    <div className="space-y-6 animate-hero-entrance">
      
      {/* Back Button & Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToSearch}
            className="p-2.5 rounded-xl border border-[#E2E8F0] bg-white hover:bg-gray-100 transition-colors cursor-pointer text-[#64748B] hover:text-[#0F172A]"
          >
            ← Back
          </button>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">
              Pharmacy Stock Comparison for <span className="text-[#2563EB]">{medicineName}</span>
            </h2>
            <p className="text-xs text-[#64748B]">
              Showing {pharmacies.length} pharmacies near Connaught Place • Starting at ₹{startingPrice}
            </p>
          </div>
        </div>

        {/* View Mode Toggle: List vs Map */}
        <div className="flex items-center bg-white p-1 rounded-2xl border border-[#E2E8F0] shadow-2xs self-start sm:self-auto">
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'list'
                ? 'bg-[#2563EB] text-white shadow-sm'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
            List View
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'map'
                ? 'bg-[#2563EB] text-white shadow-sm'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>
            Map View
          </button>
        </div>
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-[#E2E8F0]">
        <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#0F172A]">
          <input
            type="checkbox"
            checked={filterStockOnly}
            onChange={(e) => setFilterStockOnly(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB]"
          />
          <span>Show In-Stock Pharmacies Only</span>
        </label>
        <span className="text-xs text-[#64748B]">Sorted by Nearest Distance</span>
      </div>

      {/* Content Area: List View OR Map View */}
      {viewMode === 'map' ? (
        /* Map View Simulation */
        <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-sm min-h-[420px] relative overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-blue-50/50 via-slate-50 to-teal-50/30">
          
          {/* Map Graphic Canvas Simulation */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:16px_16px]"></div>

          {/* Simulated Interactive Map Pin Markers */}
          <div className="relative z-10 w-full max-w-2xl space-y-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-lg border border-[#E2E8F0] text-xs font-bold text-[#2563EB]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] animate-ping"></span>
              Live GPS Radar — Connaught Place Radius
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {pharmacies.map((pharm) => (
                <div 
                  key={pharm.id}
                  onClick={() => onSelectPharmacy(pharm)}
                  className="bg-white p-4 rounded-2xl shadow-md border border-[#E2E8F0] hover:border-[#2563EB] text-left transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-extrabold text-[#0F172A]">{pharm.name}</span>
                    <span className="text-xs font-extrabold text-[#2563EB]">₹{pharm.medicinePrice}</span>
                  </div>
                  <p className="text-[11px] text-[#64748B] mb-2">{pharm.distanceKm} km away • {pharm.estimatedWalkMinutes} mins walk</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStockBadgeClass(pharm.stockStatus)}`}>
                    {pharm.stockStatus}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : (
        /* List View */
        <div className="space-y-4">
          {pharmacies.map((pharm) => (
            <div
              key={pharm.id}
              className="bg-white rounded-3xl p-6 border border-[#E2E8F0] hover:border-[#2563EB]/40 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              
              {/* Left Details */}
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Pharmacy Name */}
                  <h3 
                    onClick={() => onSelectPharmacy(pharm)}
                    className="text-lg font-extrabold text-[#0F172A] hover:text-[#2563EB] transition-colors cursor-pointer"
                  >
                    {pharm.name}
                  </h3>

                  {/* Verified Badge */}
                  {pharm.verified && (
                    <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Verified Pharmacy
                    </span>
                  )}

                  {/* Open/Closed Badge */}
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${pharm.isOpen ? 'bg-emerald-50 text-[#16A34A]' : 'bg-red-50 text-[#DC2626]'}`}>
                    {pharm.isOpen ? 'Open Now' : 'Closed'}
                  </span>
                </div>

                {/* Address & Distance */}
                <div className="text-xs text-[#64748B] space-y-1">
                  <p className="flex items-center gap-1.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    <span>{pharm.address}</span>
                  </p>
                  <p className="flex items-center gap-3 text-[11px] text-[#64748B] pt-0.5">
                    <span>📏 <strong>{pharm.distanceKm} km</strong> away</span>
                    <span>🚶 ~{pharm.estimatedWalkMinutes} min walk</span>
                    <span>🕒 {pharm.openingHours}</span>
                  </p>
                </div>

                {/* Stock Status Badge */}
                <div className="pt-2">
                  <span className={`inline-block text-xs font-extrabold px-3 py-1 rounded-xl border ${getStockBadgeClass(pharm.stockStatus)}`}>
                    ● {pharm.stockStatus}
                  </span>
                </div>
              </div>

              {/* Right Action & Price */}
              <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 border-gray-100 pt-4 md:pt-0 gap-3 min-w-[180px]">
                <div className="text-left md:text-right">
                  <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">Price per Unit</span>
                  <span className="text-2xl font-extrabold text-[#2563EB]">₹{pharm.medicinePrice}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectPharmacy(pharm)}
                    className="bg-gray-100 hover:bg-gray-200 text-[#0F172A] px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Details
                  </button>

                  <button
                    disabled={pharm.stockStatus === 'Currently unavailable'}
                    onClick={() => onReserve(pharm)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer flex items-center gap-1.5 ${
                      pharm.stockStatus === 'Currently unavailable'
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                        : 'bg-[#2563EB] hover:bg-[#1E40AF] text-white shadow-[#2563EB]/25 active:scale-95'
                    }`}
                  >
                    <span>Reserve</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
