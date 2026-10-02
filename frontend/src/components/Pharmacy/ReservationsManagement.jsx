import { useState } from 'react';

export default function ReservationsManagement({
  reservations = [],
  onAcceptReservation,
  onRejectReservationWithReason,
  onMarkReadyForPickup,
  onMarkCompleted
}) {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Rejection Reason Modal State
  const [rejectingResId, setRejectingResId] = useState(null);
  const [selectedReason, setSelectedReason] = useState('Medicine unavailable');
  const [customReason, setCustomReason] = useState('');

  const statusOptions = ['All', 'Pending', 'Confirmed', 'Ready for Pickup', 'Completed', 'Rejected', 'Cancelled', 'Expired'];

  const filteredReservations = reservations.filter((r) => {
    const matchesTab = activeTab === 'All' || r.status === activeTab;
    const matchesSearch = r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.medicineName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.village.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-blue-100 text-brand-primary border-blue-300';
      case 'Confirmed':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Ready for Pickup':
        return 'bg-teal-100 text-teal-800 border-teal-300';
      case 'Completed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Rejected':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      case 'Cancelled':
        return 'bg-gray-200 text-gray-700 border-gray-300';
      case 'Expired':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const handleConfirmReject = () => {
    if (!rejectingResId) return;
    const finalReason = selectedReason === 'Other' ? (customReason || 'Other reason') : selectedReason;
    onRejectReservationWithReason(rejectingResId, finalReason);
    setRejectingResId(null);
    setSelectedReason('Medicine unavailable');
    setCustomReason('');
  };

  return (
    <div className="space-y-6 animate-hero-entrance">
      
      {/* Page Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-brand-dark tracking-tight">Customer Reservations</h1>
            <span className="bg-blue-50 text-brand-primary text-xs font-bold px-3 py-1 rounded-full border border-blue-100">
              {filteredReservations.length} Requests
            </span>
          </div>
          <p className="text-brand-muted text-xs sm:text-sm mt-0.5">
            Process online medicine holds, verify prescriptions, and manage customer pickup deadlines.
          </p>
        </div>

        {/* Search */}
        <div className="w-full md:w-72">
          <input
            type="text"
            placeholder="Search ID, customer name or village..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-xs outline-none focus:bg-white focus:ring-2 focus:ring-brand-primary/20"
          />
        </div>
      </div>

      {/* Filter Tabs Bar */}
      <div className="bg-white p-2 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-1 overflow-x-auto no-scrollbar">
        {statusOptions.map((st) => {
          const count = st === 'All' ? reservations.length : reservations.filter(r => r.status === st).length;
          return (
            <button
              key={st}
              onClick={() => setActiveTab(st)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                activeTab === st
                  ? 'bg-brand-primary text-white shadow-sm'
                  : 'text-brand-muted hover:bg-gray-100'
              }`}
            >
              <span>{st}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeTab === st ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Reservations List */}
      <div className="space-y-4">
        {filteredReservations.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-gray-200 text-brand-muted">
            <p className="text-3xl mb-2">📋</p>
            <p className="font-extrabold text-brand-dark">No reservations found</p>
            <p className="text-xs text-brand-muted mt-1">There are no reservation requests matching "{activeTab}".</p>
          </div>
        ) : (
          filteredReservations.map((res) => (
            <div
              key={res.id}
              className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all space-y-4"
            >
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-extrabold bg-blue-100 text-brand-primary px-2.5 py-1 rounded-xl">
                    {res.id}
                  </span>
                  <span className={`px-3 py-0.5 rounded-full text-xs font-bold border ${getStatusBadge(res.status)}`}>
                    {res.status}
                  </span>
                  <span className="text-xs text-brand-muted font-medium">
                    Req: {res.requestDate}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-xs text-brand-muted">Pickup Deadline: </span>
                  <span className="text-xs font-extrabold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-200">
                    ⏰ {res.pickupDeadline}
                  </span>
                </div>
              </div>

              {/* Body Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Customer Details */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider">Customer Details</span>
                  <h4 className="text-sm font-extrabold text-brand-dark">{res.customerName}</h4>
                  <p className="text-xs text-brand-muted">📍 {res.village}</p>
                  <p className="text-xs font-semibold text-brand-primary">📞 {res.customerPhone}</p>
                </div>

                {/* Medicine & Price Breakdown */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider">Requested Medicine</span>
                  <p className="text-sm font-extrabold text-brand-dark">{res.medicineName}</p>
                  <div className="text-xs text-brand-muted space-x-2">
                    <span>Qty: <strong className="text-brand-dark">{res.quantity}</strong></span>
                    <span>• Unit MRP: ₹{res.unitPrice}</span>
                  </div>
                  <div className="text-xs font-extrabold text-emerald-700">
                    Final Hold Price: ₹{res.finalPrice} {res.discountAmount > 0 && <span className="text-[10px] text-emerald-600">(₹{res.discountAmount} discount applied)</span>}
                  </div>
                </div>

                {/* Prescription Status & Action Triggers */}
                <div className="flex flex-col justify-between space-y-2 bg-gray-50 p-3 rounded-2xl border border-gray-200">
                  <div>
                    <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider block">Prescription Status</span>
                    <span className="inline-block mt-0.5 text-xs font-bold text-brand-teal bg-teal-50 px-2.5 py-0.5 rounded-lg border border-teal-200">
                      📄 {res.prescriptionStatus}
                    </span>
                  </div>

                  {/* Status Action Buttons */}
                  <div className="flex items-center gap-2 pt-2">
                    {res.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => onAcceptReservation && onAcceptReservation(res.id)}
                          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-sm"
                        >
                          ✓ Accept
                        </button>
                        <button
                          onClick={() => setRejectingResId(res.id)}
                          className="flex-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors"
                        >
                          ✕ Reject
                        </button>
                      </>
                    )}

                    {res.status === 'Confirmed' && (
                      <button
                        onClick={() => onMarkReadyForPickup && onMarkReadyForPickup(res.id)}
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-sm"
                      >
                        📦 Mark Ready for Pickup
                      </button>
                    )}

                    {res.status === 'Ready for Pickup' && (
                      <button
                        onClick={() => onMarkCompleted && onMarkCompleted(res.id)}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-sm"
                      >
                        ✅ Mark Collected & Complete
                      </button>
                    )}

                    {res.status === 'Completed' && (
                      <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                        ✓ Order Picked Up Successfully
                      </span>
                    )}

                    {res.status === 'Rejected' && (
                      <div className="text-[11px] text-rose-700 bg-rose-50 p-2 rounded-xl border border-rose-200">
                        <strong>Reason:</strong> {res.rejectReason || 'Unavailable'}
                      </div>
                    )}
                  </div>
                </div>

              </div>

            </div>
          ))
        )}
      </div>

      {/* Rejection Reason Modal */}
      {rejectingResId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 select-none animate-hero-entrance">
          <div className="bg-white max-w-md w-full rounded-3xl p-6 shadow-2xl border border-gray-200 space-y-4">
            
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-extrabold text-brand-dark">Reject Reservation #{rejectingResId}</h3>
              <button onClick={() => setRejectingResId(null)} className="text-gray-400 font-bold hover:text-brand-dark">✕</button>
            </div>

            <p className="text-xs text-brand-muted">
              Select a clear reason for declining this request. The reason will be communicated to the customer.
            </p>

            <div className="space-y-2">
              {[
                'Medicine unavailable (Out of stock)',
                'Quantity insufficient in current batch',
                'Valid prescription photo required',
                'Pharmacy closed for weekly holiday',
                'Other'
              ].map((reason) => (
                <label
                  key={reason}
                  onClick={() => setSelectedReason(reason)}
                  className={`flex items-center gap-3 p-3 rounded-2xl border text-xs font-semibold cursor-pointer transition-all ${
                    selectedReason === reason ? 'border-rose-500 bg-rose-50 text-rose-950' : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="rejectReason"
                    checked={selectedReason === reason}
                    onChange={() => setSelectedReason(reason)}
                    className="text-rose-600 focus:ring-rose-500"
                  />
                  <span>{reason}</span>
                </label>
              ))}
            </div>

            {selectedReason === 'Other' && (
              <textarea
                placeholder="Specify custom reason..."
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 text-xs outline-none focus:ring-2 focus:ring-rose-500/20"
                rows="2"
              />
            )}

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
              <button
                onClick={() => setRejectingResId(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-brand-muted hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md cursor-pointer"
              >
                Confirm Rejection
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
