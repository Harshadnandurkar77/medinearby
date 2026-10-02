import { useState } from 'react';
import { MOCK_MEDICINES, RECENT_SEARCHES } from './mockData';

export default function MedicineSearchScreen({ initialQuery = '', onSelectMedicine }) {
  const [query, setQuery] = useState(initialQuery);
  const [selectedFilter, setSelectedFilter] = useState('all'); // 'all' | 'available' | 'nearest' | 'lowest' | 'prescription'

  const filters = [
    { id: 'all', label: 'All Medicines' },
    { id: 'available', label: 'Available Now' },
    { id: 'nearest', label: 'Nearest First' },
    { id: 'lowest', label: 'Lowest Price' },
    { id: 'prescription', label: 'Prescription Required' }
  ];

  // Filter medicines based on search query and selected filter
  const filteredMedicines = MOCK_MEDICINES.filter((med) => {
    const matchesSearch = 
      !query ||
      med.name.toLowerCase().includes(query.toLowerCase()) ||
      med.genericName.toLowerCase().includes(query.toLowerCase()) ||
      med.brandName.toLowerCase().includes(query.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedFilter === 'prescription') return med.prescriptionRequired;
    return true;
  }).sort((a, b) => {
    if (selectedFilter === 'lowest') return a.startingPrice - b.startingPrice;
    if (selectedFilter === 'nearest') return a.pharmacyCount - b.pharmacyCount;
    return 0;
  });

  return (
    <div className="space-y-6 animate-hero-entrance">
      
      {/* Header & Search Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mb-2 tracking-tight">
          Find Medicines & Compare Nearby Stock
        </h2>
        <p className="text-sm text-[#64748B] mb-6">
          Search by brand name, active generic formula, or medicine category.
        </p>

        {/* Search Input Bar */}
        <div className="relative flex items-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" className="absolute left-4 pointer-events-none">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search e.g. Paracetamol, Crocin, Amoxicillin..."
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl border border-[#E2E8F0] bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-[#2563EB]/15 focus:border-[#2563EB] outline-none text-sm sm:text-base font-medium transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 text-[#64748B] hover:text-[#0F172A] p-1 cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Quick Search Badges */}
        <div className="flex items-center gap-2 flex-wrap mt-4 text-xs">
          <span className="text-[#64748B] font-semibold">Recent Searches:</span>
          {RECENT_SEARCHES.map((term, idx) => (
            <button
              key={idx}
              onClick={() => setQuery(term)}
              className="px-3 py-1 rounded-full bg-[#EFF6FF] text-[#2563EB] font-semibold hover:bg-[#2563EB] hover:text-white transition-colors cursor-pointer border border-[#2563EB]/20"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setSelectedFilter(f.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap border ${
              selectedFilter === f.id
                ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-md shadow-[#2563EB]/20'
                : 'bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#2563EB]/40 hover:text-[#0F172A]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Search Result Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
            Showing {filteredMedicines.length} Medicine Results
          </p>
        </div>

        {filteredMedicines.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#E2E8F0]">
            <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
            <h4 className="text-base font-bold text-[#0F172A] mb-1">No medicines found</h4>
            <p className="text-xs text-[#64748B]">Try searching for "Paracetamol", "Amoxicillin", or "Cetirizine"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMedicines.map((med) => (
              <div
                key={med.id}
                className="bg-white rounded-2xl p-5 border border-[#E2E8F0] hover:border-[#2563EB]/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[10px] font-bold text-[#0F766E] uppercase bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                        {med.category}
                      </span>
                      <h3 className="text-lg font-extrabold text-[#0F172A] mt-1 tracking-tight">
                        {med.name}
                      </h3>
                    </div>

                    {/* Prescription Required Badge */}
                    {med.prescriptionRequired ? (
                      <span className="bg-amber-50 text-[#D97706] text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-200 shrink-0 flex items-center gap-1">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                        Rx Required
                      </span>
                    ) : (
                      <span className="bg-emerald-50 text-[#16A34A] text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-200 shrink-0">
                        OTC Medicine
                      </span>
                    )}
                  </div>

                  {/* Generic Name & Form */}
                  <div className="text-xs text-[#64748B] space-y-1 mb-4">
                    <p><span className="font-semibold text-[#0F172A]">Generic:</span> {med.genericName}</p>
                    <p><span className="font-semibold text-[#0F172A]">Form & Strength:</span> {med.form} • {med.strength}</p>
                  </div>
                </div>

                {/* Bottom Bar: Availability Count & Price */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-2">
                  <div>
                    <p className="text-xs font-bold text-[#16A34A] flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Available at {med.pharmacyCount} nearby pharmacies
                    </p>
                    <p className="text-sm font-extrabold text-[#0F172A]">
                      Starting from <span className="text-[#2563EB]">₹{med.startingPrice}</span>
                    </p>
                  </div>

                  <button
                    onClick={() => onSelectMedicine(med)}
                    className="bg-[#2563EB] hover:bg-[#1E40AF] text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-[#2563EB]/20 transition-all cursor-pointer flex items-center gap-1"
                  >
                    <span>View Availability</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
