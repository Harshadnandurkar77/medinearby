import { useState } from 'react';

export default function OffersDiscounts({
  offers = [],
  medicines = [],
  onCreateOffer,
  onToggleOfferStatus
}) {
  const [activeTab, setActiveTab] = useState('Active');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form State
  const [newOffer, setNewOffer] = useState({
    title: '',
    medicineId: medicines[0]?.id || '',
    discountType: 'Percentage',
    discountValue: 10,
    minQuantity: 1,
    startDate: new Date().toISOString().split('T')[0],
    endDate: '2026-10-31',
    terms: 'Valid at Jan Aushadhi Kendra counter pickup. Show coupon code.',
    status: 'Active'
  });

  const offerTabs = ['Active', 'Scheduled', 'Paused', 'Expired'];

  const filteredOffers = offers.filter(o => activeTab === 'All' || o.status === activeTab);

  const handleSubmitOffer = (e) => {
    e.preventDefault();
    if (!newOffer.title.trim()) return;

    const targetMed = medicines.find(m => m.id === newOffer.medicineId) || medicines[0];

    const offerPayload = {
      ...newOffer,
      id: `OFF-${Date.now()}`,
      medicineName: targetMed ? targetMed.name : 'Selected Medicine',
      discountValue: parseFloat(newOffer.discountValue || 0),
      minQuantity: parseInt(newOffer.minQuantity || 1)
    };

    if (onCreateOffer) onCreateOffer(offerPayload);
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6 animate-hero-entrance">
      
      {/* Page Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-brand-dark tracking-tight">Offers & Discount Schemes</h1>
            <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
              {offers.filter(o => o.status === 'Active').length} Active Promotions
            </span>
          </div>
          <p className="text-brand-muted text-xs sm:text-sm mt-0.5">
            Create rural health subsidy deals, festival discounts, and bulk purchase price slashes.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-bold text-xs shadow-lg shadow-emerald-600/25 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <span>🏷️ Create New Offer</span>
        </button>
      </div>

      {/* Tabs Bar */}
      <div className="bg-white p-2 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-2">
        {offerTabs.map((tab) => {
          const count = offers.filter(o => o.status === tab).length;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === tab
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-brand-muted hover:bg-gray-100'
              }`}
            >
              <span>{tab} Offers</span>
              <span className={`px-2 py-0.2 rounded-full text-[10px] ${
                activeTab === tab ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-700'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Offers Display Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredOffers.length === 0 ? (
          <div className="md:col-span-2 p-12 text-center bg-white rounded-3xl border border-gray-200 text-brand-muted">
            <p className="text-3xl mb-2">🏷️</p>
            <p className="font-extrabold text-brand-dark">No {activeTab.toLowerCase()} offers found</p>
            <p className="text-xs text-brand-muted mt-1">Create a promotional offer to attract local customers.</p>
          </div>
        ) : (
          filteredOffers.map((off) => {
            const targetMed = medicines.find(m => m.id === off.medicineId || m.name === off.medicineName) || { sellingPrice: 60 };
            const originalPrice = targetMed.sellingPrice || 60;
            const discountAmt = off.discountType === 'Percentage'
              ? (originalPrice * off.discountValue) / 100
              : off.discountValue;
            const finalPrice = Math.max(0, originalPrice - discountAmt).toFixed(1);

            return (
              <div
                key={off.id}
                className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all space-y-4 relative overflow-hidden"
              >
                {/* Status Pill Badge */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-[10px] font-bold text-brand-muted bg-gray-100 px-2 py-0.5 rounded">
                      {off.id}
                    </span>
                    <h3 className="text-base font-extrabold text-brand-dark mt-1">{off.title}</h3>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                    off.status === 'Active' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                    off.status === 'Scheduled' ? 'bg-blue-100 text-blue-800 border border-blue-300' :
                    off.status === 'Paused' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                    'bg-gray-200 text-gray-700'
                  }`}>
                    {off.status}
                  </span>
                </div>

                {/* Medicine & Price Calculation Box */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50/60 to-teal-50/60 border border-emerald-100 space-y-2">
                  <p className="text-xs font-bold text-emerald-950">
                    Applicable Medicine: <span className="text-brand-dark font-extrabold">{off.medicineName}</span>
                  </p>
                  
                  <div className="grid grid-cols-3 gap-2 text-xs pt-1 border-t border-emerald-200/60">
                    <div>
                      <span className="text-[10px] text-emerald-800 block">Original MRP</span>
                      <span className="line-through text-gray-500 font-bold">₹{originalPrice}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-800 block">Discount</span>
                      <span className="font-extrabold text-emerald-700">
                        {off.discountType === 'Percentage' ? `${off.discountValue}% OFF` : `₹${off.discountValue} OFF`}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-800 block">Offer Price</span>
                      <span className="font-extrabold text-brand-primary text-sm">₹{finalPrice}</span>
                    </div>
                  </div>
                </div>

                {/* Details & Validity */}
                <div className="text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-brand-muted">
                    <span>Min. Order Quantity: <strong>{off.minQuantity} unit(s)</strong></span>
                    <span>Validity: <strong>{off.startDate} to {off.endDate}</strong></span>
                  </div>
                  <p className="text-brand-muted text-[11px] italic bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    Terms: {off.terms}
                  </p>
                </div>

                {/* Status Toggle Button */}
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => onToggleOfferStatus && onToggleOfferStatus(off.id)}
                    className="text-xs font-bold text-brand-primary hover:underline cursor-pointer"
                  >
                    {off.status === 'Active' ? 'Pause Offer ⏸️' : 'Activate Offer ▶️'}
                  </button>
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* Mandatory Rural Healthcare Disclaimer Box */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
        <span className="text-lg shrink-0">⚠️</span>
        <div>
          <p className="font-bold">Mandatory Pricing Disclaimer</p>
          <p className="text-[11px] text-amber-800 mt-0.5">
            “Prices and offers are provided by pharmacies and may change. Please confirm the final price before purchase.”
          </p>
        </div>
      </div>

      {/* Create Offer Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto select-none animate-hero-entrance">
          <div className="bg-white max-w-xl w-full rounded-3xl p-6 shadow-2xl border border-gray-200 space-y-4 my-8">
            
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="text-lg font-extrabold text-brand-dark">Create New Promotional Offer</h2>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-400 font-bold hover:text-brand-dark">✕</button>
            </div>

            <form onSubmit={handleSubmitOffer} className="space-y-3">
              
              <div>
                <label className="block text-xs font-bold text-brand-text mb-1 uppercase tracking-wider">Offer Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Monsoon Health Subsidy Offer"
                  value={newOffer.title}
                  onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-text mb-1 uppercase tracking-wider">Select Medicine</label>
                <select
                  value={newOffer.medicineId}
                  onChange={(e) => setNewOffer({ ...newOffer, medicineId: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs outline-none bg-gray-50 cursor-pointer"
                >
                  {medicines.map(m => (
                    <option key={m.id} value={m.id}>{m.name} (MRP: ₹{m.sellingPrice})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-brand-text mb-1 uppercase tracking-wider">Discount Type</label>
                  <select
                    value={newOffer.discountType}
                    onChange={(e) => setNewOffer({ ...newOffer, discountType: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs outline-none bg-gray-50 cursor-pointer"
                  >
                    <option value="Percentage">Percentage (% OFF)</option>
                    <option value="Fixed Amount">Fixed Amount (₹ OFF)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-text mb-1 uppercase tracking-wider">Discount Value</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newOffer.discountValue}
                    onChange={(e) => setNewOffer({ ...newOffer, discountValue: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs font-bold outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-brand-text mb-1 uppercase tracking-wider">Start Date</label>
                  <input
                    type="date"
                    value={newOffer.startDate}
                    onChange={(e) => setNewOffer({ ...newOffer, startDate: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-text mb-1 uppercase tracking-wider">End Date</label>
                  <input
                    type="date"
                    value={newOffer.endDate}
                    onChange={(e) => setNewOffer({ ...newOffer, endDate: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-text mb-1 uppercase tracking-wider">Terms & Conditions</label>
                <textarea
                  rows="2"
                  value={newOffer.terms}
                  onChange={(e) => setNewOffer({ ...newOffer, terms: e.target.value })}
                  className="w-full p-3 rounded-xl border border-gray-200 text-xs outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-brand-muted hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Publish Offer
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
