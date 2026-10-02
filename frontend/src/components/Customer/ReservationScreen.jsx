import { useState } from 'react';
import { CURRENT_USER } from './mockData';

export default function ReservationScreen({ 
  selectedMedicine, 
  selectedPharmacy, 
  onBack, 
  onViewReservations 
}) {
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState(CURRENT_USER.fullName);
  const [customerPhone, setCustomerPhone] = useState(CURRENT_USER.phone);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [reservationId, setReservationId] = useState('');

  const medName = selectedMedicine ? selectedMedicine.name : "Paracetamol 500mg";
  const medForm = selectedMedicine ? selectedMedicine.form : "Tablet (15 Tabs)";
  const isRxRequired = selectedMedicine ? selectedMedicine.prescriptionRequired : false;
  
  const pharmName = selectedPharmacy ? selectedPharmacy.name : "Apollo Pharmacy — CP Branch";
  const pharmAddress = selectedPharmacy ? selectedPharmacy.address : "Block A, Inner Circle, Connaught Place, New Delhi";
  const unitPrice = selectedPharmacy ? selectedPharmacy.medicinePrice : 20;

  const totalPrice = unitPrice * quantity;

  const handleConfirmReservation = (e) => {
    e.preventDefault();
    const newId = `RES-${Math.floor(1000 + Math.random() * 9000)}`;
    setReservationId(newId);
    setIsConfirmed(true);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-hero-entrance">
      
      {!isConfirmed && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-[#64748B] hover:text-[#0F172A] bg-white px-4 py-2 rounded-xl border border-[#E2E8F0] shadow-sm transition-colors cursor-pointer"
        >
          ← Back
        </button>
      )}

      {isConfirmed ? (
        /* Confirmation Screen */
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E2E8F0] shadow-xl text-center space-y-6 animate-hero-entrance">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 animate-bounce">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>

          <div>
            <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200 mb-2">
              Reservation Confirmed
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
              Reservation #{reservationId}
            </h2>
            <p className="text-xs text-[#64748B] mt-1">
              Your medicine hold request has been sent to {pharmName}.
            </p>
          </div>

          {/* Status Timeline */}
          <div className="bg-[#EFF6FF] rounded-2xl p-5 border border-[#2563EB]/20 max-w-lg mx-auto text-xs">
            <p className="font-bold text-[#2563EB] uppercase text-[10px] tracking-wider mb-3">Reservation Status Timeline</p>
            <div className="flex items-center justify-between font-bold text-[11px] relative">
              <span className="text-[#2563EB]">Submitted ✓</span>
              <span className="text-[#2563EB]">Confirmed ●</span>
              <span className="text-[#64748B]">Ready for Pickup</span>
              <span className="text-[#64748B]">Completed</span>
            </div>
          </div>

          {/* Summary Box */}
          <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200/80 text-left space-y-3 max-w-lg mx-auto text-xs">
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-[#64748B]">Medicine:</span>
              <span className="font-bold text-[#0F172A]">{medName} ({quantity}x)</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-[#64748B]">Pharmacy:</span>
              <span className="font-bold text-[#0F172A] truncate max-w-xs">{pharmName}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-[#64748B]">Pickup Deadline:</span>
              <span className="font-bold text-[#16A34A]">Today by 6:00 PM</span>
            </div>
            <div className="flex justify-between font-extrabold text-sm pt-1">
              <span>Total Payable at Pickup:</span>
              <span className="text-[#2563EB]">₹{totalPrice}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onViewReservations}
              className="w-full sm:w-auto bg-[#2563EB] hover:bg-[#1E40AF] text-white px-7 py-3 rounded-xl font-bold text-xs shadow-md cursor-pointer transition-all"
            >
              Go to My Reservations →
            </button>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(pharmAddress)}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-white border border-[#E2E8F0] hover:bg-gray-50 text-[#0F172A] px-6 py-3 rounded-xl font-bold text-xs shadow-2xs transition-all text-center"
            >
              🗺️ Get Directions
            </a>
          </div>

        </div>
      ) : (
        /* Reservation Form */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm space-y-6">
          
          <div>
            <span className="text-[10px] font-bold text-[#0F766E] uppercase bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
              Hold For Pickup
            </span>
            <h2 className="text-2xl font-extrabold text-[#0F172A] mt-2 tracking-tight">
              Reserve Medicine for Pickup
            </h2>
            <p className="text-xs text-[#64748B]">
              Reserve items now. Payment is handled in-person at the pharmacy upon pickup.
            </p>
          </div>

          <form onSubmit={handleConfirmReservation} className="space-y-5">
            
            {/* Medicine Summary Card */}
            <div className="bg-[#EFF6FF] rounded-2xl p-4 border border-[#2563EB]/20 flex items-center justify-between">
              <div>
                <h4 className="text-base font-extrabold text-[#0F172A]">{medName}</h4>
                <p className="text-xs text-[#64748B]">{medForm}</p>
                {isRxRequired && (
                  <p className="text-[11px] text-[#D97706] font-bold mt-1">⚠️ Prescription Required at Pickup</p>
                )}
              </div>
              <div className="text-right">
                <span className="text-xs text-[#64748B] block">Unit Price</span>
                <span className="text-xl font-extrabold text-[#2563EB]">₹{unitPrice}</span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">Select Quantity</label>
              <div className="flex items-center gap-3">
                {[1, 2, 3, 4, 5].map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setQuantity(q)}
                    className={`w-12 h-12 rounded-xl text-sm font-extrabold border transition-all cursor-pointer ${
                      quantity === q
                        ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-md shadow-[#2563EB]/20'
                        : 'bg-white text-[#0F172A] border-[#E2E8F0] hover:border-[#2563EB]/40'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Pharmacy Details */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200/80 text-xs space-y-1">
              <span className="font-bold text-[#0F172A] block text-sm">{pharmName}</span>
              <p className="text-[#64748B]">{pharmAddress}</p>
              <p className="text-[#16A34A] font-bold pt-1">🕒 Pickup Deadline: Today by 6:00 PM</p>
            </div>

            {/* Contact Details Input */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1">Customer Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-xs font-medium outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/15"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1">Phone Number for Pickup SMS</label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-xs font-medium outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/15"
                  required
                />
              </div>
            </div>

            {/* Total Price & Submit CTA */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-[#64748B] block font-bold">Total Estimated Amount</span>
                <span className="text-2xl font-extrabold text-[#2563EB]">₹{totalPrice}</span>
              </div>

              <button
                type="submit"
                className="bg-[#2563EB] hover:bg-[#1E40AF] text-white px-8 py-3.5 rounded-xl font-extrabold text-sm shadow-lg shadow-[#2563EB]/30 transition-all cursor-pointer"
              >
                Confirm Reservation →
              </button>
            </div>

          </form>

        </div>
      )}

    </div>
  );
}
