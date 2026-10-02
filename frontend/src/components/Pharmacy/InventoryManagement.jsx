import { useState } from 'react';

export default function InventoryManagement({
  medicines = [],
  onOpenAddMedicine,
  onEditMedicine,
  onUpdateStock,
  onUpdatePrice,
  onCreateOfferForMedicine,
  onToggleAvailability,
  onViewHistory
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Interactive Quick Edit Popover State
  const [editingStockId, setEditingStockId] = useState(null);
  const [newStockVal, setNewStockVal] = useState('');
  const [editingPriceId, setEditingPriceId] = useState(null);
  const [newPriceVal, setNewPriceVal] = useState('');

  // Categories extraction
  const categories = ['All', ...new Set(medicines.map(m => m.category))];
  const statuses = ['All', 'In Stock', 'Low Stock', 'Out of Stock', 'Expiring Soon', 'Expired'];

  // Filtered medicines
  const filteredMedicines = medicines.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.brandName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === 'All' || m.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || m.availabilityStatus === statusFilter;
    return matchesSearch && matchesCat && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'In Stock':
        return 'bg-emerald-100 text-emerald-700 border-emerald-300';
      case 'Low Stock':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Out of Stock':
        return 'bg-rose-100 text-rose-700 border-rose-300';
      case 'Expiring Soon':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'Expired':
        return 'bg-gray-200 text-gray-800 border-gray-300';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-300';
    }
  };

  const handleStockSave = (medId) => {
    if (newStockVal !== '' && onUpdateStock) {
      onUpdateStock(medId, parseInt(newStockVal));
      setEditingStockId(null);
      setNewStockVal('');
    }
  };

  const handlePriceSave = (medId) => {
    if (newPriceVal !== '' && onUpdatePrice) {
      onUpdatePrice(medId, parseFloat(newPriceVal));
      setEditingPriceId(null);
      setNewPriceVal('');
    }
  };

  return (
    <div className="space-y-6 animate-hero-entrance">
      
      {/* Header & Main Add Trigger */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-brand-dark tracking-tight">Medicine Inventory</h1>
            <span className="bg-blue-50 text-brand-primary text-xs font-extrabold px-3 py-1 rounded-full border border-blue-100">
              {filteredMedicines.length} Items Listed
            </span>
          </div>
          <p className="text-brand-muted text-xs sm:text-sm mt-0.5">
            Manage rural drug stock, batch numbers, MRP, discounts & availability in real-time.
          </p>
        </div>

        <button
          onClick={onOpenAddMedicine}
          className="bg-brand-primary hover:bg-brand-dark text-white px-6 py-3 rounded-2xl font-bold text-xs shadow-lg shadow-brand-primary/25 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <span>➕ Add New Medicine</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <svg className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search medicine name, generic salt, or brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs outline-none bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-primary/20 transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold bg-gray-50 text-brand-dark outline-none cursor-pointer"
          >
            <option value="All">All Categories</option>
            {categories.filter(c => c !== 'All').map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold bg-gray-50 text-brand-dark outline-none cursor-pointer"
          >
            <option value="All">All Stock Statuses</option>
            {statuses.filter(s => s !== 'All').map(st => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>

        </div>

      </div>

      {/* DESKTOP TABLE VIEW (md and up) */}
      <div className="hidden md:block bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-[11px] font-extrabold uppercase text-brand-muted tracking-wider">
                <th className="py-3.5 px-4">Medicine & Generic Name</th>
                <th className="py-3.5 px-3">Category</th>
                <th className="py-3.5 px-3 text-center">Stock Qty</th>
                <th className="py-3.5 px-3">Selling Price</th>
                <th className="py-3.5 px-3">Discount</th>
                <th className="py-3.5 px-3">Final Price</th>
                <th className="py-3.5 px-3">Expiry Date</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredMedicines.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-12 text-center text-brand-muted">
                    <div className="max-w-xs mx-auto space-y-2">
                      <p className="text-2xl">🔍</p>
                      <p className="font-bold text-brand-dark">No medicines found</p>
                      <p className="text-[11px]">Try adjusting your search query or status filters.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredMedicines.map((med) => {
                  const discountAmt = (med.sellingPrice * med.discount) / 100;
                  const finalPrice = (med.sellingPrice - discountAmt).toFixed(1);

                  return (
                    <tr key={med.id} className="hover:bg-blue-50/30 transition-colors">
                      
                      {/* Name & Generic */}
                      <td className="py-3.5 px-4">
                        <div className="font-extrabold text-brand-dark text-xs sm:text-sm">{med.name}</div>
                        <div className="text-[11px] text-brand-muted font-medium">
                          {med.genericName} ({med.brandName}) • <span className="font-mono text-[10px] bg-gray-100 px-1.5 py-0.2 rounded">{med.batchNumber}</span>
                        </div>
                        {med.prescriptionRequired && (
                          <span className="inline-block mt-1 text-[9px] font-extrabold text-rose-700 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200">
                            Rx Required
                          </span>
                        )}
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-3 font-medium text-brand-dark">
                        <span className="bg-gray-100 px-2 py-1 rounded-lg text-[11px]">{med.category}</span>
                      </td>

                      {/* Stock Qty */}
                      <td className="py-3.5 px-3 text-center">
                        {editingStockId === med.id ? (
                          <div className="flex items-center justify-center gap-1">
                            <input
                              type="number"
                              className="w-16 px-1.5 py-1 rounded border border-brand-primary text-center font-bold"
                              value={newStockVal}
                              onChange={(e) => setNewStockVal(e.target.value)}
                              autoFocus
                            />
                            <button
                              onClick={() => handleStockSave(med.id)}
                              className="bg-emerald-600 text-white px-2 py-1 rounded text-[10px] font-bold"
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <div 
                            onClick={() => { setEditingStockId(med.id); setNewStockVal(med.quantity); }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-gray-50 border border-gray-200 font-extrabold text-brand-dark cursor-pointer hover:bg-blue-50 hover:border-blue-300"
                            title="Click to quick update stock"
                          >
                            <span>{med.quantity}</span>
                            <span className="text-[9px] text-brand-primary font-normal">✏️</span>
                          </div>
                        )}
                      </td>

                      {/* Selling Price */}
                      <td className="py-3.5 px-3">
                        {editingPriceId === med.id ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              className="w-16 px-1.5 py-1 rounded border border-brand-primary font-bold"
                              value={newPriceVal}
                              onChange={(e) => setNewPriceVal(e.target.value)}
                              autoFocus
                            />
                            <button
                              onClick={() => handlePriceSave(med.id)}
                              className="bg-emerald-600 text-white px-2 py-1 rounded text-[10px] font-bold"
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <div
                            onClick={() => { setEditingPriceId(med.id); setNewPriceVal(med.sellingPrice); }}
                            className="inline-flex items-center gap-1 font-bold text-brand-dark cursor-pointer hover:underline"
                            title="Click to quick edit price"
                          >
                            <span>₹{med.sellingPrice}</span>
                            <span className="text-[9px] text-gray-400">✏️</span>
                          </div>
                        )}
                      </td>

                      {/* Discount */}
                      <td className="py-3.5 px-3">
                        {med.discount > 0 ? (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                            {med.discount}% OFF
                          </span>
                        ) : (
                          <span className="text-gray-400 text-[11px]">—</span>
                        )}
                      </td>

                      {/* Final Price */}
                      <td className="py-3.5 px-3 font-extrabold text-brand-primary">
                        ₹{finalPrice}
                      </td>

                      {/* Expiry Date */}
                      <td className="py-3.5 px-3 text-brand-muted font-medium">
                        {med.expiryDate}
                      </td>

                      {/* Availability Status */}
                      <td className="py-3.5 px-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusBadge(med.availabilityStatus)}`}>
                          {med.availabilityStatus}
                        </span>
                      </td>

                      {/* Actions Column */}
                      <td className="py-3.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onEditMedicine && onEditMedicine(med)}
                            className="p-1.5 rounded-lg bg-gray-100 hover:bg-blue-100 text-brand-dark hover:text-brand-primary transition-colors cursor-pointer"
                            title="Edit Medicine Details"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => onCreateOfferForMedicine && onCreateOfferForMedicine(med)}
                            className="p-1.5 rounded-lg bg-gray-100 hover:bg-emerald-100 text-brand-dark hover:text-emerald-700 transition-colors cursor-pointer"
                            title="Create Offer for this Medicine"
                          >
                            🏷️
                          </button>
                          <button
                            onClick={() => onToggleAvailability && onToggleAvailability(med.id)}
                            className="p-1.5 rounded-lg bg-gray-100 hover:bg-rose-100 text-brand-dark hover:text-rose-700 transition-colors cursor-pointer"
                            title="Mark Available / Unavailable"
                          >
                            🚫
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE CARD VIEW (Under md) - No horizontal scrolling, high readability */}
      <div className="md:hidden space-y-4">
        {filteredMedicines.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-gray-200 text-brand-muted">
            <p className="text-2xl mb-1">🔍</p>
            <p className="font-bold text-brand-dark text-sm">No medicines found</p>
          </div>
        ) : (
          filteredMedicines.map((med) => {
            const discountAmt = (med.sellingPrice * med.discount) / 100;
            const finalPrice = (med.sellingPrice - discountAmt).toFixed(1);

            return (
              <div key={med.id} className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-3">
                
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-extrabold text-brand-dark">{med.name}</h3>
                    <p className="text-xs text-brand-muted">{med.genericName} ({med.brandName})</p>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(med.availabilityStatus)}`}>
                    {med.availabilityStatus}
                  </span>
                </div>

                {/* Grid details */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-gray-50 text-xs">
                  <div>
                    <span className="text-brand-muted text-[10px] block">Batch Number</span>
                    <span className="font-mono font-bold text-brand-dark">{med.batchNumber}</span>
                  </div>
                  <div>
                    <span className="text-brand-muted text-[10px] block">Expiry Date</span>
                    <span className="font-semibold text-brand-dark">{med.expiryDate}</span>
                  </div>
                  <div>
                    <span className="text-brand-muted text-[10px] block">Quantity</span>
                    <span className="font-extrabold text-brand-primary text-sm">{med.quantity} units</span>
                  </div>
                  <div>
                    <span className="text-brand-muted text-[10px] block">Final Selling Price</span>
                    <span className="font-extrabold text-emerald-700 text-sm">₹{finalPrice}</span>
                  </div>
                </div>

                {/* Mobile Actions */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => onEditMedicine && onEditMedicine(med)}
                    className="flex-1 bg-brand-primary text-white py-2 rounded-xl text-xs font-bold text-center cursor-pointer"
                  >
                    Edit Details
                  </button>
                  <button
                    onClick={() => {
                      const newQty = prompt(`Update stock quantity for ${med.name}:`, med.quantity);
                      if (newQty !== null && !isNaN(newQty) && onUpdateStock) {
                        onUpdateStock(med.id, parseInt(newQty));
                      }
                    }}
                    className="flex-1 bg-gray-100 text-brand-dark py-2 rounded-xl text-xs font-bold border border-gray-200 text-center cursor-pointer"
                  >
                    Update Stock
                  </button>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
