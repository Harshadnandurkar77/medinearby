import { useState } from 'react';

export default function PharmacyDashboard({
  pharmacyProfile,
  medicines = [],
  reservations = [],
  offers = [],
  onNavigate,
  onOpenAddMedicine,
  onOpenCreateOffer,
  onToggleStoreStatus,
  onAcceptReservation,
  onRejectReservation,
  onQuickStockUpdate
}) {
  const [quickStockInput, setQuickStockInput] = useState({});

  // Summary Metrics Calculation
  const totalMedicines = medicines.length;
  const lowStockMedicines = medicines.filter(m => m.availabilityStatus === 'Low Stock' || m.quantity <= m.minThreshold);
  const pendingReservations = reservations.filter(r => r.status === 'Pending');
  const activeOffers = offers.filter(o => o.status === 'Active');
  const expiringMedicines = medicines.filter(m => m.availabilityStatus === 'Expiring Soon' || m.availabilityStatus === 'Expired');

  return (
    <div className="space-y-8 animate-hero-entrance">
      
      {/* Welcome & Store Open/Closed Hero Card */}
      <div className="bg-gradient-to-r from-brand-primary via-blue-700 to-brand-teal text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-md">
                📍 {pharmacyProfile?.village}, {pharmacyProfile?.district}
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-400/30 text-emerald-100 text-xs font-bold border border-emerald-300/30 backdrop-blur-md">
                Verified Medical Store
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome, {pharmacyProfile?.ownerName || 'Ramesh Sharma'}! 👋
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm max-w-xl">
              {pharmacyProfile?.name} • Managing rural medicine stock, pricing & local reservations efficiently.
            </p>
          </div>

          {/* Quick Store Open/Closed Toggle Control Card */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shrink-0 w-full md:w-auto text-center md:text-right">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-100 block mb-1">
              Store Operational Status
            </span>
            <div className="flex items-center justify-center md:justify-end gap-3">
              <span className={`text-xs font-extrabold ${pharmacyProfile?.isOpen ? 'text-emerald-300' : 'text-rose-300'}`}>
                {pharmacyProfile?.isOpen ? '● Open for Customer Pickups' : '○ Closed (Accepting Online Holds)'}
              </span>
              <button
                onClick={onToggleStoreStatus}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-md ${
                  pharmacyProfile?.isOpen
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                    : 'bg-rose-500 hover:bg-rose-600 text-white'
                }`}
              >
                {pharmacyProfile?.isOpen ? 'Switch to Closed' : 'Open Store'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Summary Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        
        {/* Card 1: Total Medicines */}
        <div 
          onClick={() => onNavigate('inventory')}
          className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-brand-muted text-xs font-bold uppercase tracking-wider">Total Meds</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-brand-primary flex items-center justify-center text-sm font-bold group-hover:scale-110 transition-transform">
              💊
            </div>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-brand-dark">{totalMedicines}</span>
            <span className="text-[10px] text-brand-primary font-semibold">In Catalog →</span>
          </div>
        </div>

        {/* Card 2: Low Stock Items */}
        <div 
          onClick={() => onNavigate('inventory')}
          className="bg-white p-4 rounded-2xl border border-amber-200 shadow-sm hover:shadow-md transition-all cursor-pointer group bg-amber-50/20"
        >
          <div className="flex items-center justify-between">
            <span className="text-amber-800 text-xs font-bold uppercase tracking-wider">Low Stock</span>
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-sm font-bold group-hover:scale-110 transition-transform">
              ⚠️
            </div>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-amber-900">{lowStockMedicines.length}</span>
            <span className="text-[10px] text-amber-700 font-bold">Needs Refill →</span>
          </div>
        </div>

        {/* Card 3: Pending Reservations */}
        <div 
          onClick={() => onNavigate('reservations')}
          className="bg-white p-4 rounded-2xl border border-blue-200 shadow-sm hover:shadow-md transition-all cursor-pointer group bg-blue-50/20"
        >
          <div className="flex items-center justify-between">
            <span className="text-brand-primary text-xs font-bold uppercase tracking-wider">Pending Holds</span>
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-brand-primary flex items-center justify-center text-sm font-bold group-hover:scale-110 transition-transform">
              📦
            </div>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-brand-dark">{pendingReservations.length}</span>
            <span className="text-[10px] text-brand-primary font-bold">Review Now →</span>
          </div>
        </div>

        {/* Card 4: Active Offers */}
        <div 
          onClick={() => onNavigate('offers')}
          className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-sm hover:shadow-md transition-all cursor-pointer group bg-emerald-50/20"
        >
          <div className="flex items-center justify-between">
            <span className="text-emerald-800 text-xs font-bold uppercase tracking-wider">Active Offers</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-bold group-hover:scale-110 transition-transform">
              🏷️
            </div>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-emerald-900">{activeOffers.length}</span>
            <span className="text-[10px] text-emerald-700 font-bold">Promotions →</span>
          </div>
        </div>

        {/* Card 5: Expiring Medicines */}
        <div 
          onClick={() => onNavigate('inventory')}
          className="bg-white p-4 rounded-2xl border border-rose-200 shadow-sm hover:shadow-md transition-all cursor-pointer group bg-rose-50/20 col-span-2 sm:col-span-1"
        >
          <div className="flex items-center justify-between">
            <span className="text-rose-800 text-xs font-bold uppercase tracking-wider">Expiring / Expired</span>
            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center text-sm font-bold group-hover:scale-110 transition-transform">
              ⌛
            </div>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-rose-900">{expiringMedicines.length}</span>
            <span className="text-[10px] text-rose-700 font-bold">Audit Stock →</span>
          </div>
        </div>

      </div>

      {/* Quick Action Buttons Toolbar */}
      <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm">
        <div className="text-xs font-extrabold text-brand-muted uppercase tracking-wider mb-3">
          Quick Operations & Task Shortcuts
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          <button
            onClick={onOpenAddMedicine}
            className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-brand-primary text-white text-xs font-bold hover:bg-brand-dark transition-all cursor-pointer shadow-md shadow-brand-primary/20"
          >
            <span>➕ Add Medicine</span>
          </button>
          <button
            onClick={() => onNavigate('inventory')}
            className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-gray-100 text-brand-dark hover:bg-gray-200 text-xs font-bold transition-all cursor-pointer border border-gray-200"
          >
            <span>📦 Update Inventory</span>
          </button>
          <button
            onClick={() => onNavigate('reservations')}
            className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-gray-100 text-brand-dark hover:bg-gray-200 text-xs font-bold transition-all cursor-pointer border border-gray-200"
          >
            <span>📋 View Reservations</span>
          </button>
          <button
            onClick={onOpenCreateOffer}
            className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-gray-100 text-brand-dark hover:bg-gray-200 text-xs font-bold transition-all cursor-pointer border border-gray-200"
          >
            <span>🏷️ Create Offer</span>
          </button>
          <button
            onClick={() => onNavigate('profile')}
            className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-gray-100 text-brand-dark hover:bg-gray-200 text-xs font-bold transition-all cursor-pointer border border-gray-200 col-span-2 sm:col-span-1"
          >
            <span>⚙️ Edit Profile</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Pending Reservations & Low Stock Alert Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Section 1: Pending Reservations */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h3 className="text-base font-extrabold text-brand-dark flex items-center gap-2">
                <span>📥 Urgent Pending Reservations</span>
                {pendingReservations.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-primary text-white">
                    {pendingReservations.length}
                  </span>
                )}
              </h3>
              <p className="text-[11px] text-brand-muted">Accept or decline incoming medicine holds from nearby village customers.</p>
            </div>
            <button
              onClick={() => onNavigate('reservations')}
              className="text-xs font-bold text-brand-primary hover:underline cursor-pointer"
            >
              See all ({reservations.length})
            </button>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto max-h-[380px]">
            {pendingReservations.length === 0 ? (
              <div className="py-12 text-center text-xs text-brand-muted bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-2xl mb-1">🎉</p>
                <p className="font-bold text-brand-dark">No pending reservations!</p>
                <p className="text-[11px] text-brand-muted mt-0.5">All customer requests have been processed.</p>
              </div>
            ) : (
              pendingReservations.map((res) => (
                <div key={res.id} className="p-4 rounded-2xl border border-gray-200 bg-gray-50/60 hover:bg-white transition-all space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-[10px] font-bold text-brand-primary px-2 py-0.5 bg-blue-100 rounded-md">
                        {res.id}
                      </span>
                      <h4 className="text-sm font-extrabold text-brand-dark mt-1">{res.customerName}</h4>
                      <p className="text-[11px] text-brand-muted">📍 {res.village} • 📞 {res.customerPhone}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-extrabold text-brand-dark">₹ {res.finalPrice}</span>
                      <p className="text-[10px] text-gray-400">Req: {res.requestDate.split(',')[1]}</p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-gray-200 text-xs flex items-center justify-between">
                    <div>
                      <span className="font-bold text-brand-dark">{res.medicineName}</span>
                      <span className="text-brand-muted ml-2">Qty: {res.quantity}</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {res.prescriptionStatus}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => onAcceptReservation && onAcceptReservation(res.id)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                    >
                      ✓ Accept Hold
                    </button>
                    <button
                      onClick={() => onRejectReservation && onRejectReservation(res.id)}
                      className="flex-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      ✕ Decline
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Section 2: Low Stock Medicines Alert Table */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h3 className="text-base font-extrabold text-brand-dark flex items-center gap-2">
                <span>⚠️ Low Stock Alerts</span>
                {lowStockMedicines.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white">
                    {lowStockMedicines.length} Items
                  </span>
                )}
              </h3>
              <p className="text-[11px] text-brand-muted">Medicines running below minimum threshold level.</p>
            </div>
            <button
              onClick={() => onNavigate('inventory')}
              className="text-xs font-bold text-brand-primary hover:underline cursor-pointer"
            >
              Full Catalog →
            </button>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto max-h-[380px]">
            {lowStockMedicines.length === 0 ? (
              <div className="py-12 text-center text-xs text-brand-muted bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-2xl mb-1">👍</p>
                <p className="font-bold text-brand-dark">Stock levels look great!</p>
                <p className="text-[11px] text-brand-muted mt-0.5">No low stock items reported right now.</p>
              </div>
            ) : (
              lowStockMedicines.map((med) => (
                <div key={med.id} className="p-3.5 rounded-2xl border border-amber-200 bg-amber-50/30 flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-extrabold text-brand-dark">{med.name}</h4>
                      <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-amber-100 text-amber-800">
                        {med.availabilityStatus}
                      </span>
                    </div>
                    <p className="text-[11px] text-brand-muted mt-0.5">
                      Batch: {med.batchNumber} • Selling Price: <span className="font-bold text-brand-dark">₹{med.sellingPrice}</span>
                    </p>
                    <p className="text-[10px] text-amber-900 font-bold mt-1">
                      Current Quantity: <span className="text-rose-600 font-extrabold text-xs">{med.quantity} units</span> (Min: {med.minThreshold})
                    </p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <input
                      type="number"
                      placeholder="+Qty"
                      className="w-16 px-2 py-1.5 rounded-xl border border-gray-300 text-xs font-bold outline-none text-center bg-white"
                      value={quickStockInput[med.id] || ''}
                      onChange={(e) => setQuickStockInput({ ...quickStockInput, [med.id]: e.target.value })}
                    />
                    <button
                      onClick={() => {
                        const added = parseInt(quickStockInput[med.id]);
                        if (added > 0 && onQuickStockUpdate) {
                          onQuickStockUpdate(med.id, med.quantity + added);
                          setQuickStockInput({ ...quickStockInput, [med.id]: '' });
                        }
                      }}
                      className="bg-brand-primary hover:bg-brand-dark text-white px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer"
                    >
                      + Refill
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Bottom Grid: Active Discounts & Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Active Discounts Preview */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="text-base font-extrabold text-brand-dark flex items-center gap-2">
              <span>🏷️ Active Discounts & Promotional Schemes</span>
            </h3>
            <button
              onClick={onOpenCreateOffer}
              className="text-xs font-bold text-brand-primary hover:underline cursor-pointer"
            >
              + Create Offer
            </button>
          </div>

          <div className="space-y-2.5">
            {activeOffers.map((off) => (
              <div key={off.id} className="p-3 rounded-2xl bg-emerald-50/50 border border-emerald-200 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-emerald-950">{off.title}</h4>
                  <p className="text-[11px] text-emerald-800">
                    Target: <span className="font-semibold">{off.medicineName}</span> ({off.discountValue}% OFF)
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-600 text-white">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Audit Feed */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="text-base font-extrabold text-brand-dark flex items-center gap-2">
              <span>⚡ Recent Counter Activity</span>
            </h3>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Live Feed</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
              <div>
                <p className="font-bold text-brand-dark">Reservation #RES-8815 completed</p>
                <p className="text-[11px] text-brand-muted">Vikram Singh picked up Cough Syrup (100ml) • 10 Sept, 08:00 PM</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
              <div>
                <p className="font-bold text-brand-dark">Stock Refilled: Amoxicillin 500mg</p>
                <p className="text-[11px] text-brand-muted">Added +50 capsules to Batch AMX-2026-04 • 10 Sept, 11:30 AM</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
              <div>
                <p className="font-bold text-brand-dark">Price Updated: Pantoprazole 40mg</p>
                <p className="text-[11px] text-brand-muted">Selling price updated from ₹90 to ₹95 • 09 Sept, 04:00 PM</p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
