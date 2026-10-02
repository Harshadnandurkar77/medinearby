import { useState } from 'react';
import { MOCK_RESERVATIONS } from './mockData';

export default function MyReservationsScreen({ onNewSearch }) {
  const [reservations, setReservations] = useState(MOCK_RESERVATIONS);
  const [activeTab, setActiveTab] = useState('active'); // 'active' | 'completed' | 'cancelled'
  const [selectedRes, setSelectedRes] = useState(null);

  const filteredReservations = reservations.filter((r) => {
    if (activeTab === 'active') return r.status === 'Confirmed' || r.status === 'Ready for Pickup' || r.status === 'Pending';
    if (activeTab === 'completed') return r.status === 'Completed';
    if (activeTab === 'cancelled') return r.status === 'Cancelled';
    return true;
  });

  const handleCancelReservation = (id) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status: 'Cancelled', statusStep: 0 } : r));
    if (selectedRes && selectedRes.id === id) {
      setSelectedRes(prev => ({ ...prev, status: 'Cancelled', statusStep: 0 }));
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return <span className="bg-amber-50 text-[#D97706] border border-amber-200 px-3 py-1 rounded-full text-xs font-bold">● Pending</span>;
      case 'Confirmed':
        return <span className="bg-blue-50 text-[#2563EB] border border-blue-200 px-3 py-1 rounded-full text-xs font-bold">● Confirmed</span>;
      case 'Ready for Pickup':
        return <span className="bg-emerald-50 text-[#16A34A] border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold">● Ready for Pickup</span>;
      case 'Completed':
        return <span className="bg-gray-100 text-[#64748B] border border-gray-200 px-3 py-1 rounded-full text-xs font-bold">● Completed</span>;
      case 'Cancelled':
        return <span className="bg-red-50 text-[#DC2626] border border-red-200 px-3 py-1 rounded-full text-xs font-bold">● Cancelled</span>;
      default:
        return <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold">{status}</span>;
    }
  };

  return (
    <div className="space-y-6 animate-hero-entrance">
      
      {/* Page Title & New Search Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-sm">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            My Medicine Reservations
          </h2>
          <p className="text-xs text-[#64748B] mt-1">
            Track hold requests, pickup deadlines, and reservation history across local pharmacies.
          </p>
        </div>
        <button
          onClick={onNewSearch}
          className="bg-[#2563EB] hover:bg-[#1E40AF] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span>+ Reserve New Medicine</span>
        </button>
      </div>

      {/* Tabs Bar: Active / Completed / Cancelled */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
        <button
          onClick={() => setActiveTab('active')}
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'active'
              ? 'bg-[#2563EB] text-white shadow-sm'
              : 'text-[#64748B] hover:text-[#0F172A] hover:bg-white'
          }`}
        >
          Active Reservations ({reservations.filter(r => r.status === 'Confirmed' || r.status === 'Ready for Pickup' || r.status === 'Pending').length})
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'completed'
              ? 'bg-[#2563EB] text-white shadow-sm'
              : 'text-[#64748B] hover:text-[#0F172A] hover:bg-white'
          }`}
        >
          Completed ({reservations.filter(r => r.status === 'Completed').length})
        </button>

        <button
          onClick={() => setActiveTab('cancelled')}
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'cancelled'
              ? 'bg-[#2563EB] text-white shadow-sm'
              : 'text-[#64748B] hover:text-[#0F172A] hover:bg-white'
          }`}
        >
          Cancelled ({reservations.filter(r => r.status === 'Cancelled').length})
        </button>
      </div>

      {/* Reservations List */}
      <div className="space-y-4">
        {filteredReservations.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E2E8F0]">
            <div className="w-16 h-16 bg-blue-50 text-[#2563EB] rounded-full flex items-center justify-center mx-auto mb-3">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </div>
            <h4 className="text-base font-bold text-[#0F172A] mb-1">No reservations in this view</h4>
            <p className="text-xs text-[#64748B] mb-4">Search for medicine to hold your order at a nearby pharmacy.</p>
            <button
              onClick={onNewSearch}
              className="bg-[#2563EB] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md cursor-pointer"
            >
              Find Medicine Now
            </button>
          </div>
        ) : (
          filteredReservations.map((res) => (
            <div
              key={res.id}
              className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all space-y-4"
            >
              
              {/* Header: ID, Date & Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-extrabold text-[#2563EB] bg-[#EFF6FF] px-2.5 py-1 rounded-lg border border-[#2563EB]/20">
                    ID: {res.id}
                  </span>
                  <span className="text-xs text-[#64748B]">Created: {res.createdAt}</span>
                </div>
                <div>{getStatusBadge(res.status)}</div>
              </div>

              {/* Middle Grid: Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-[#64748B] font-bold block uppercase text-[10px] tracking-wider mb-0.5">Medicine</span>
                  <h4 className="text-base font-extrabold text-[#0F172A]">{res.medicineName}</h4>
                  <p className="text-[#64748B]">{res.form} • Qty: {res.quantity}</p>
                </div>

                <div>
                  <span className="text-[#64748B] font-bold block uppercase text-[10px] tracking-wider mb-0.5">Pharmacy</span>
                  <p className="font-bold text-[#0F172A]">{res.pharmacyName}</p>
                  <p className="text-[#64748B] truncate max-w-xs">{res.pharmacyAddress}</p>
                </div>

                <div className="text-left md:text-right">
                  <span className="text-[#64748B] font-bold block uppercase text-[10px] tracking-wider mb-0.5">Payable at Pickup</span>
                  <span className="text-xl font-extrabold text-[#2563EB]">₹{res.totalPrice}</span>
                  <p className="text-[#16A34A] font-bold text-[11px] mt-0.5">Deadline: {res.pickupDeadline}</p>
                </div>
              </div>

              {/* Status Timeline Bar Requirement: Submitted → Confirmed → Ready for Pickup → Completed */}
              {res.status !== 'Cancelled' && (
                <div className="bg-[#EFF6FF]/60 rounded-2xl p-3 border border-[#2563EB]/15 text-[11px]">
                  <p className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider mb-2">Status Timeline</p>
                  <div className="grid grid-cols-4 gap-1 text-center font-bold">
                    <span className={res.statusStep >= 1 ? 'text-[#2563EB]' : 'text-gray-400'}>1. Submitted ✓</span>
                    <span className={res.statusStep >= 2 ? 'text-[#2563EB]' : 'text-gray-400'}>2. Confirmed ✓</span>
                    <span className={res.statusStep >= 3 ? 'text-[#16A34A]' : 'text-gray-400'}>3. Ready for Pickup</span>
                    <span className={res.statusStep >= 4 ? 'text-[#64748B]' : 'text-gray-400'}>4. Completed</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <button
                  onClick={() => setSelectedRes(res)}
                  className="text-xs font-bold text-[#2563EB] hover:underline cursor-pointer"
                >
                  View Details →
                </button>

                {(res.status === 'Confirmed' || res.status === 'Pending') && (
                  <button
                    onClick={() => handleCancelReservation(res.id)}
                    className="text-xs font-bold text-[#DC2626] hover:bg-red-50 px-3 py-1.5 rounded-xl border border-red-200 transition-colors cursor-pointer"
                  >
                    Cancel Reservation
                  </button>
                )}
              </div>

            </div>
          ))
        )}
      </div>

      {/* Details Modal */}
      {selectedRes && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-hero-entrance">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-[#E2E8F0] space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-lg font-extrabold text-[#0F172A]">Reservation Details</h3>
              <button 
                onClick={() => setSelectedRes(null)}
                className="text-gray-400 hover:text-black p-1 text-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between"><span className="text-[#64748B]">Reservation ID:</span><span className="font-bold">{selectedRes.id}</span></div>
              <div className="flex justify-between"><span className="text-[#64748B]">Medicine:</span><span className="font-bold">{selectedRes.medicineName}</span></div>
              <div className="flex justify-between"><span className="text-[#64748B]">Form/Strength:</span><span className="font-bold">{selectedRes.form}</span></div>
              <div className="flex justify-between"><span className="text-[#64748B]">Quantity:</span><span className="font-bold">{selectedRes.quantity}</span></div>
              <div className="flex justify-between"><span className="text-[#64748B]">Pharmacy:</span><span className="font-bold">{selectedRes.pharmacyName}</span></div>
              <div className="flex justify-between"><span className="text-[#64748B]">Address:</span><span className="font-bold max-w-xs text-right">{selectedRes.pharmacyAddress}</span></div>
              <div className="flex justify-between"><span className="text-[#64748B]">Pharmacy Phone:</span><span className="font-bold text-[#2563EB]">{selectedRes.pharmacyPhone}</span></div>
              <div className="flex justify-between font-extrabold text-sm pt-2 border-t border-gray-100">
                <span>Total Amount:</span>
                <span className="text-[#2563EB]">₹{selectedRes.totalPrice}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedRes(null)}
              className="w-full bg-[#2563EB] text-white py-3 rounded-xl font-bold text-xs shadow-md cursor-pointer"
            >
              Close Window
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
