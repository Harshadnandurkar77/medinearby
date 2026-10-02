import { useState } from 'react';

export default function PharmacyVerificationPending({
  pharmacyProfile,
  onUpdateStatus,
  onEditProfile,
  onGoToDashboard
}) {
  const [activeStatus, setActiveStatus] = useState(pharmacyProfile?.verificationStatus || 'Under Review');

  const handleStatusSwitch = (status) => {
    setActiveStatus(status);
    if (onUpdateStatus) onUpdateStatus(status);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-hero-entrance">
      
      {/* Page Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-brand-primary text-xs font-bold mb-2">
            <span>🛡️ Government & Admin Verification Process</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">Pharmacy Account Verification</h1>
          <p className="text-brand-muted text-xs sm:text-sm mt-1">
            Verification ensures authentic medicine supply and trust across rural communities.
          </p>
        </div>

        {/* Interactive Status Switcher for Demo */}
        <div className="bg-gray-100 p-1.5 rounded-2xl border border-gray-200 shrink-0 w-full md:w-auto">
          <div className="text-[10px] font-extrabold text-brand-muted uppercase tracking-wider px-2 mb-1">Interactive Status Switcher:</div>
          <div className="grid grid-cols-2 gap-1 sm:flex sm:flex-wrap">
            {[
              { id: 'Under Review', label: 'Under Review' },
              { id: 'Approved', label: 'Approved' },
              { id: 'More Information Required', label: 'More Info Needed' },
              { id: 'Rejected', label: 'Rejected' }
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => handleStatusSwitch(st.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeStatus === st.id
                    ? 'bg-brand-primary text-white shadow-md'
                    : 'text-brand-muted hover:bg-gray-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Status Detail Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
        
        {/* Application Key Info Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-200 text-xs">
          <div>
            <span className="text-brand-muted font-medium block">Pharmacy Name</span>
            <span className="font-extrabold text-brand-dark text-sm">{pharmacyProfile?.name || 'Jan Aushadhi Kendra'}</span>
          </div>
          <div>
            <span className="text-brand-muted font-medium block">Application ID</span>
            <span className="font-mono font-bold text-brand-primary text-sm">{pharmacyProfile?.id || 'MN-PHARM-89421'}</span>
          </div>
          <div>
            <span className="text-brand-muted font-medium block">Submitted Date</span>
            <span className="font-semibold text-brand-dark">{pharmacyProfile?.submittedDate || '10 Sept 2026'}</span>
          </div>
          <div>
            <span className="text-brand-muted font-medium block">Drug License No.</span>
            <span className="font-mono font-semibold text-brand-dark">{pharmacyProfile?.licenseNumber || 'UP/STP/2024/DRUG-4412'}</span>
          </div>
        </div>

        {/* STATUS VIEW 1: UNDER REVIEW */}
        {activeStatus === 'Under Review' && (
          <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-200 text-blue-900 space-y-4 animate-hero-entrance">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center text-2xl shrink-0 shadow-md">
                ⏳
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-0.5 rounded-full text-xs font-extrabold bg-blue-200 text-blue-900">
                    Current Status: Under Review
                  </span>
                </div>
                <h3 className="text-lg font-bold mt-1 text-blue-950">Verification in Progress</h3>
                <p className="text-xs sm:text-sm text-blue-800 mt-1 leading-relaxed">
                  Your pharmacy application and Drug License credentials are currently being reviewed by the MediNearby regional medical verification team. Typical response time is within 24 to 48 business hours.
                </p>
              </div>
            </div>

            {/* Step Timeline Progress */}
            <div className="pt-4 border-t border-blue-200">
              <div className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-3">Verification Checklist Steps</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/80 border border-blue-200">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-xs">✓</span>
                  <div>
                    <p className="font-bold text-brand-dark">Pharmacy Details</p>
                    <p className="text-[10px] text-brand-muted">Submitted</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/80 border border-blue-200">
                  <span className="w-6 h-6 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center text-xs animate-spin">⏳</span>
                  <div>
                    <p className="font-bold text-brand-dark">Drug License Audit</p>
                    <p className="text-[10px] text-blue-600 font-bold">In progress</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/60 border border-gray-200 opacity-60">
                  <span className="w-6 h-6 rounded-full bg-gray-300 text-gray-600 font-bold flex items-center justify-center text-xs">3</span>
                  <div>
                    <p className="font-bold text-brand-dark">Dashboard Activation</p>
                    <p className="text-[10px] text-brand-muted">Pending</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STATUS VIEW 2: APPROVED */}
        {activeStatus === 'Approved' && (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-4 animate-hero-entrance">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-2xl shrink-0 shadow-md">
                ✅
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-0.5 rounded-full text-xs font-extrabold bg-emerald-200 text-emerald-900">
                    Current Status: Approved
                  </span>
                </div>
                <h3 className="text-lg font-bold mt-1 text-emerald-950">Verification Approved! Welcome Partner.</h3>
                <p className="text-xs sm:text-sm text-emerald-800 mt-1 leading-relaxed">
                  Congratulations! Your drug license and pharmacy profile have been verified. You can now add medicine stock, manage prices, create discounts, and accept customer pickup reservations.
                </p>
                <div className="pt-3">
                  <button
                    onClick={onGoToDashboard}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold px-6 py-3 rounded-xl shadow-md transition-all cursor-pointer focus:ring-4 focus:ring-emerald-300"
                  >
                    Open Pharmacy Dashboard →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STATUS VIEW 3: MORE INFORMATION REQUIRED */}
        {activeStatus === 'More Information Required' && (
          <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-4 animate-hero-entrance">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-2xl shrink-0 shadow-md">
                ⚠️
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-0.5 rounded-full text-xs font-extrabold bg-amber-200 text-amber-900">
                    Current Status: More Information Required
                  </span>
                </div>
                <h3 className="text-lg font-bold mt-1 text-amber-950">Additional Document Details Needed</h3>
                <p className="text-xs sm:text-sm text-amber-800 mt-1 leading-relaxed">
                  Our verification team requires updated information regarding your shop license copy or owner identity card. Please update the details below to resume review.
                </p>
                <div className="mt-3 p-3.5 rounded-xl bg-white border border-amber-200 text-xs space-y-1">
                  <p className="font-bold text-amber-900">Note from Verifier (Admin):</p>
                  <p className="text-amber-800 italic">"Please provide a clearer photo of Form 20/21 Drug License certificate showing expiry date after 2026."</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STATUS VIEW 4: REJECTED */}
        {activeStatus === 'Rejected' && (
          <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 space-y-4 animate-hero-entrance">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center text-2xl shrink-0 shadow-md">
                ❌
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-0.5 rounded-full text-xs font-extrabold bg-rose-200 text-rose-900">
                    Current Status: Rejected
                  </span>
                </div>
                <h3 className="text-lg font-bold mt-1 text-rose-950">Application Not Approved</h3>
                <p className="text-xs sm:text-sm text-rose-800 mt-1 leading-relaxed">
                  Unfortunately, your application could not be verified due to invalid license credentials or mismatch with state pharmacy council records.
                </p>
                <p className="text-xs text-rose-900 font-medium mt-2">
                  Reason: Provided Drug License UP/STP/2024/DRUG-4412 is expired or non-verifiable on state portal.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons Footer */}
        <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onEditProfile}
              className="w-full sm:w-auto bg-brand-primary hover:bg-brand-dark text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <span>✏️ Edit Submitted Information</span>
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => alert('Support Desk: Phone 1800-419-8800 | Email: partner-support@medinearby.in')}
              className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-brand-dark px-5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 border border-gray-200"
            >
              <span>💬 Contact Support Desk</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
