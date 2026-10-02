export default function PharmacyDetailsScreen({ 
  pharmacy, 
  selectedMedicine, 
  onBack, 
  onReserve 
}) {
  const medicineName = selectedMedicine ? selectedMedicine.name : "Paracetamol 500mg";
  const medicinePrice = pharmacy ? pharmacy.medicinePrice : 20;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-hero-entrance">
      
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-xs font-semibold text-[#64748B] hover:text-[#0F172A] bg-white px-4 py-2 rounded-xl border border-[#E2E8F0] shadow-sm transition-colors cursor-pointer"
      >
        ← Back to Pharmacy Results
      </button>

      {/* Pharmacy Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                {pharmacy.name}
              </h1>
              {pharmacy.verified && (
                <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                  ✓ Verified Pharmacy
                </span>
              )}
            </div>

            <p className="text-xs text-[#64748B] flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path></svg>
              <span>{pharmacy.address}</span>
              <span className="font-bold text-[#0F172A]">({pharmacy.distanceKm} km away)</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${pharmacy.phone}`}
              className="bg-teal-50 hover:bg-teal-100 text-[#0F766E] border border-teal-200 px-4 py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5"
            >
              📞 Call Pharmacy
            </a>
          </div>
        </div>

        {/* Info Grid: Hours & Status */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200/60">
            <span className="text-[#64748B] font-medium block mb-1">Status</span>
            <span className={`font-extrabold ${pharmacy.isOpen ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
              {pharmacy.isOpen ? 'Open Now' : 'Closed'}
            </span>
          </div>

          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200/60">
            <span className="text-[#64748B] font-medium block mb-1">Operating Hours</span>
            <span className="font-bold text-[#0F172A]">{pharmacy.openingHours}</span>
          </div>

          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200/60">
            <span className="text-[#64748B] font-medium block mb-1">Customer Rating</span>
            <span className="font-bold text-[#0F172A]">⭐ {pharmacy.rating} / 5.0 ({pharmacy.reviewCount} reviews)</span>
          </div>
        </div>

        {/* Simulated Location Map Box */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-gradient-to-br from-blue-50 to-slate-100 p-6 text-center space-y-2">
          <div className="w-10 h-10 rounded-full bg-white shadow-md text-[#2563EB] flex items-center justify-center mx-auto">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path></svg>
          </div>
          <p className="text-xs font-bold text-[#0F172A]">Interactive Map & Navigation</p>
          <p className="text-[11px] text-[#64748B]">{pharmacy.address} • ~{pharmacy.estimatedWalkMinutes} mins walk</p>
        </div>

      </div>

      {/* Target Medicine Availability Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-[#0F172A]">Requested Medicine Stock</h3>

        <div className="bg-[#EFF6FF] rounded-2xl p-5 border border-[#2563EB]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-[#0F766E] uppercase bg-white px-2 py-0.5 rounded border border-[#0F766E]/20">Target Item</span>
            <h4 className="text-xl font-extrabold text-[#0F172A]">{medicineName}</h4>
            <p className="text-xs text-[#16A34A] font-bold">● Status: {pharmacy.stockStatus}</p>
          </div>

          <div className="flex items-center gap-4">
            <div>
              <span className="text-[10px] text-[#64748B] uppercase font-bold block">Pharmacy Price</span>
              <span className="text-2xl font-extrabold text-[#2563EB]">₹{medicinePrice}</span>
            </div>

            <button
              onClick={() => onReserve(pharmacy)}
              className="bg-[#2563EB] hover:bg-[#1E40AF] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-[#2563EB]/20 transition-all cursor-pointer"
            >
              Reserve Medicine →
            </button>
          </div>
        </div>

        {/* Important Disclaimer Notice (Requirement) */}
        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200/80 flex items-start gap-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.2" className="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <div className="text-xs text-[#0F172A]">
            <p className="font-bold text-[#D97706]">Important Disclaimer</p>
            <p className="mt-0.5 text-[#64748B]">
              Availability information may change. Please confirm with the pharmacy before visiting.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
