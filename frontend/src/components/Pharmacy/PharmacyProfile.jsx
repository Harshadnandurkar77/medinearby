import { useState } from 'react';

export default function PharmacyProfile({
  profile = {},
  onSaveProfile
}) {
  const [formData, setFormData] = useState({
    name: profile.name || 'Jan Aushadhi Kendra & Medical Store',
    ownerName: profile.ownerName || 'Ramesh Chandra Sharma',
    phone: profile.phone || '+91 98765 43210',
    whatsapp: profile.whatsapp || '+91 98765 43210',
    address: profile.address || 'Shop No. 4, Main Market Road',
    village: profile.village || 'Rampur',
    district: profile.district || 'Sitapur',
    state: profile.state || 'Uttar Pradesh',
    pincode: profile.pincode || '261001',
    landmark: profile.landmark || 'Near Old Bus Stand & Primary Health Centre',
    openingTime: profile.openingTime || '08:00 AM',
    closingTime: profile.closingTime || '09:30 PM',
    holidays: profile.holidays || 'Open 7 Days (Emergency Service Available)',
    licenseNumber: profile.licenseNumber || 'UP/STP/2024/DRUG-4412',
    services: profile.services || [
      'Emergency 24/7 Supply',
      'Prescription Verification',
      'Generic Medicines Available',
      'Government Rate Subsidy',
      'Home Delivery within 3 km'
    ]
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const allAvailableServices = [
    'Emergency 24/7 Supply',
    'Prescription Verification',
    'Generic Medicines Available',
    'Government Rate Subsidy',
    'Home Delivery within 3 km',
    'Cold Chain Storage (Vaccines / Insulin)',
    'Blood Pressure & Sugar Checking'
  ];

  const handleToggleService = (srv) => {
    if (formData.services.includes(srv)) {
      setFormData(prev => ({ ...prev, services: prev.services.filter(s => s !== srv) }));
    } else {
      setFormData(prev => ({ ...prev, services: [...prev.services, srv] }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSaveProfile) onSaveProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-hero-entrance">
      
      {/* Page Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-brand-dark tracking-tight">Pharmacy Profile & Location</h1>
            <span className="bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
              Verified License: {formData.licenseNumber}
            </span>
          </div>
          <p className="text-brand-muted text-xs sm:text-sm mt-0.5">
            Manual village, district, landmark & operational hours configuration for local community trust.
          </p>
        </div>

        {savedSuccess && (
          <div className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold animate-bounce flex items-center gap-1.5">
            ✓ Profile Saved Successfully!
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Section 1: Basic Pharmacy & Owner Details */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
          <h2 className="text-base font-extrabold text-brand-dark flex items-center gap-2 border-b border-gray-100 pb-3">
            <span>🏪 Pharmacy Store & Owner Identity</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-brand-text mb-1 uppercase tracking-wider">Pharmacy Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold outline-none focus:ring-2 focus:ring-brand-primary/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-text mb-1 uppercase tracking-wider">Owner / Pharmacist Name</label>
              <input
                type="text"
                required
                value={formData.ownerName}
                onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold outline-none focus:ring-2 focus:ring-brand-primary/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-brand-text mb-1 uppercase tracking-wider">Phone Number</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs outline-none font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-text mb-1 uppercase tracking-wider">WhatsApp Number</label>
              <input
                type="text"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs outline-none font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-text mb-1 uppercase tracking-wider">Drug License No.</label>
              <input
                type="text"
                readOnly
                value={formData.licenseNumber}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-100 text-xs outline-none font-mono font-bold text-gray-600"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Rural Location & Address (Manual Entry - No Forced GPS) */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h2 className="text-base font-extrabold text-brand-dark flex items-center gap-2">
              <span>📍 Manual Location & Village Address (No GPS Required)</span>
            </h2>
            <span className="text-[11px] font-bold text-brand-teal bg-teal-50 px-2.5 py-0.5 rounded-lg border border-teal-200">
              Rural Usability Optimized
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-text mb-1 uppercase tracking-wider">Street Address / Shop Number</label>
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-bold text-brand-text mb-1 uppercase tracking-wider">Village / Town</label>
              <input
                type="text"
                required
                value={formData.village}
                onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs font-bold outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-text mb-1 uppercase tracking-wider">District</label>
              <input
                type="text"
                required
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs font-bold outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-text mb-1 uppercase tracking-wider">State</label>
              <input
                type="text"
                required
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs font-bold outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-text mb-1 uppercase tracking-wider">Pincode</label>
              <input
                type="text"
                required
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs font-bold outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-text mb-1 uppercase tracking-wider">
              Nearest Famous Landmark (Crucial for Village Navigation)
            </label>
            <input
              type="text"
              required
              value={formData.landmark}
              onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
              placeholder="e.g. Near Old Bus Stand & Primary Health Centre"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs outline-none bg-blue-50/20 focus:bg-white"
            />
          </div>
        </div>

        {/* Section 3: Operational Timings & Services */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
          <h2 className="text-base font-extrabold text-brand-dark border-b border-gray-100 pb-3">
            🕒 Opening Hours & Available Healthcare Services
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-brand-text mb-1 uppercase tracking-wider">Opening Time</label>
              <input
                type="text"
                value={formData.openingTime}
                onChange={(e) => setFormData({ ...formData, openingTime: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-text mb-1 uppercase tracking-wider">Closing Time</label>
              <input
                type="text"
                value={formData.closingTime}
                onChange={(e) => setFormData({ ...formData, closingTime: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-text mb-1 uppercase tracking-wider">Weekly Off / Holidays</label>
              <input
                type="text"
                value={formData.holidays}
                onChange={(e) => setFormData({ ...formData, holidays: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-text mb-2 uppercase tracking-wider">Services Offered</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {allAvailableServices.map((srv) => {
                const isSelected = formData.services.includes(srv);
                return (
                  <div
                    key={srv}
                    onClick={() => handleToggleService(srv)}
                    className={`p-3 rounded-2xl border text-xs font-semibold cursor-pointer transition-all flex items-center justify-between ${
                      isSelected ? 'border-brand-primary bg-blue-50/60 text-brand-dark' : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    <span>{srv}</span>
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                      isSelected ? 'bg-brand-primary text-white font-bold' : 'bg-gray-200 text-gray-400'
                    }`}>
                      {isSelected ? '✓' : '+'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Save CTA */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-brand-primary hover:bg-brand-dark text-white px-8 py-3.5 rounded-2xl font-extrabold text-xs shadow-lg shadow-brand-primary/25 transition-all cursor-pointer"
          >
            Save Profile Changes
          </button>
        </div>

      </form>

    </div>
  );
}
