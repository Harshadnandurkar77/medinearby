import { REPORT_ANALYTICS } from './mockPharmacyData';

export default function ReportsPage({
  medicines = [],
  reservations = [],
  offers = []
}) {
  const pendingCount = reservations.filter(r => r.status === 'Pending').length;
  const completedCount = reservations.filter(r => r.status === 'Completed').length;
  const totalReservations = reservations.length;
  const completionPercent = totalReservations > 0 ? Math.round((completedCount / totalReservations) * 100) : 94;

  const lowStockCount = medicines.filter(m => m.availabilityStatus === 'Low Stock' || m.quantity <= m.minThreshold).length;
  const expiringCount = medicines.filter(m => m.availabilityStatus === 'Expiring Soon' || m.availabilityStatus === 'Expired').length;
  const activeOffersCount = offers.filter(o => o.status === 'Active').length;

  return (
    <div className="space-y-6 animate-hero-entrance">
      
      {/* Page Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-brand-dark tracking-tight">Pharmacy Performance Reports</h1>
            <span className="bg-blue-50 text-brand-primary text-xs font-bold px-3 py-1 rounded-full border border-blue-100">
              Monthly Audit View
            </span>
          </div>
          <p className="text-brand-muted text-xs sm:text-sm mt-0.5">
            Lightweight visual insights optimized for low-bandwidth rural connections.
          </p>
        </div>

        <button
          onClick={() => alert('Report generated for September 2026. File ready for print/export.')}
          className="bg-gray-100 hover:bg-gray-200 text-brand-dark px-5 py-2.5 rounded-2xl font-bold text-xs border border-gray-200 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <span>📥 Export Summary PDF</span>
        </button>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-1">
          <span className="text-brand-muted text-xs font-bold uppercase tracking-wider">Total Hold Requests</span>
          <p className="text-2xl font-extrabold text-brand-dark">{REPORT_ANALYTICS.monthlyReservations}</p>
          <p className="text-[10px] text-emerald-600 font-bold">↗ +14% vs last month</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-1">
          <span className="text-brand-muted text-xs font-bold uppercase tracking-wider">Pickup Fulfillment</span>
          <p className="text-2xl font-extrabold text-emerald-700">{completionPercent}%</p>
          <p className="text-[10px] text-brand-muted font-medium">Successful counter pickups</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-1">
          <span className="text-brand-muted text-xs font-bold uppercase tracking-wider">Est. Monthly Revenue</span>
          <p className="text-2xl font-extrabold text-brand-primary">{REPORT_ANALYTICS.totalRevenueEstimate}</p>
          <p className="text-[10px] text-brand-muted font-medium">From medicine reservations</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-1">
          <span className="text-brand-muted text-xs font-bold uppercase tracking-wider">Active Promotions</span>
          <p className="text-2xl font-extrabold text-purple-700">{activeOffersCount}</p>
          <p className="text-[10px] text-purple-600 font-bold">Running customer offers</p>
        </div>
      </div>

      {/* Grid: Most Requested & Inventory Health Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Most Requested Medicines Visual Progress Bars */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="text-base font-extrabold text-brand-dark flex items-center gap-2">
              <span>🔥 Top Requested Medicines in Region</span>
            </h3>
            <span className="text-[10px] font-bold text-brand-primary bg-blue-50 px-2 py-0.5 rounded-md">Local Demand</span>
          </div>

          <div className="space-y-4">
            {REPORT_ANALYTICS.mostRequestedMedicines.map((item, idx) => {
              const maxReq = 50;
              const percent = Math.round((item.requests / maxReq) * 100);
              return (
                <div key={idx} className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-brand-dark">{idx + 1}. {item.name}</span>
                    <span className="font-extrabold text-brand-primary">{item.requests} requests</span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden flex">
                    <div
                      className="h-full bg-gradient-to-r from-brand-primary to-brand-teal rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-brand-muted">
                    <span>Demand Index: High</span>
                    <span className={`font-bold ${item.stock === 'Low Stock' ? 'text-amber-600' : 'text-emerald-600'}`}>
                      Catalog Status: {item.stock}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Inventory Health & Stock Risk Analysis */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="text-base font-extrabold text-brand-dark flex items-center gap-2">
              <span>📦 Inventory Health & Stock Audit</span>
            </h3>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">Stock Status</span>
          </div>

          <div className="space-y-3">
            
            {/* Health Bar 1: In Stock */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs space-y-1">
              <div className="flex items-center justify-between font-extrabold text-emerald-950">
                <span>Healthy In-Stock Items</span>
                <span>{REPORT_ANALYTICS.inventoryBreakdown.inStock} Items</span>
              </div>
              <p className="text-[11px] text-emerald-800">Sufficient quantity available for regular counter sales.</p>
            </div>

            {/* Health Bar 2: Low Stock */}
            <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs space-y-1">
              <div className="flex items-center justify-between font-extrabold text-amber-950">
                <span>Low Stock Items (Action Needed)</span>
                <span>{lowStockCount || REPORT_ANALYTICS.inventoryBreakdown.lowStock} Items</span>
              </div>
              <p className="text-[11px] text-amber-800">Below minimum threshold limit. Order replenishment from wholesaler.</p>
            </div>

            {/* Health Bar 3: Expiring / Expired */}
            <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-200 text-xs space-y-1">
              <div className="flex items-center justify-between font-extrabold text-rose-950">
                <span>Expiring Soon / Expired Audit</span>
                <span>{expiringCount || REPORT_ANALYTICS.inventoryBreakdown.expiringSoon} Items</span>
              </div>
              <p className="text-[11px] text-rose-800">Remove expired batches from shelf to maintain drug safety compliance.</p>
            </div>

          </div>
        </div>

      </div>

      {/* Daily & Monthly Activity Frequency Breakdown */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
        <h3 className="text-base font-extrabold text-brand-dark border-b border-gray-100 pb-3">
          📊 Daily Counter Pickup Distribution
        </h3>

        <div className="grid grid-cols-7 gap-2 text-center text-xs">
          {[
            { day: 'Mon', count: 18, active: false },
            { day: 'Tue', count: 24, active: false },
            { day: 'Wed', count: 32, active: false },
            { day: 'Thu', count: 28, active: false },
            { day: 'Fri', count: 41, active: true },
            { day: 'Sat', count: 38, active: false },
            { day: 'Sun', count: 15, active: false }
          ].map((d) => (
            <div key={d.day} className={`p-3 rounded-2xl border ${d.active ? 'bg-brand-primary text-white border-brand-primary shadow-md' : 'bg-gray-50 border-gray-200 text-brand-dark'}`}>
              <span className="text-[10px] uppercase font-bold block opacity-80">{d.day}</span>
              <span className="text-base font-extrabold mt-1 block">{d.count}</span>
              <span className="text-[9px] block mt-0.5 opacity-80">Pickups</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
