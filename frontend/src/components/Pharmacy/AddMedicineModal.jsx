import { useState, useEffect } from 'react';

export default function AddMedicineModal({
  isOpen,
  onClose,
  onSaveMedicine,
  existingMedicines = [],
  editingMedicine = null
}) {
  const [formData, setFormData] = useState({
    name: '',
    genericName: '',
    brandName: '',
    category: 'Antibiotic',
    strength: '500 mg',
    dosageForm: 'Tablet',
    batchNumber: '',
    quantity: 50,
    minThreshold: 20,
    sellingPrice: 50,
    discount: 0,
    expiryDate: '',
    prescriptionRequired: false
  });

  const [errors, setErrors] = useState({});
  const [duplicateWarning, setDuplicateWarning] = useState('');

  useEffect(() => {
    if (editingMedicine) {
      setFormData(editingMedicine);
    } else {
      // Set default future expiry date (e.g. 1 year ahead)
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);
      const formattedDate = futureDate.toISOString().split('T')[0];

      setFormData({
        name: '',
        genericName: '',
        brandName: '',
        category: 'Antibiotic',
        strength: '500 mg',
        dosageForm: 'Tablet',
        batchNumber: `BAT-${Math.floor(1000 + Math.random() * 9000)}`,
        quantity: 50,
        minThreshold: 20,
        sellingPrice: 45,
        discount: 0,
        expiryDate: formattedDate,
        prescriptionRequired: false
      });
    }
    setErrors({});
    setDuplicateWarning('');
  }, [editingMedicine, isOpen]);

  if (!isOpen) return null;

  // Live duplicate check on medicine name change
  const handleNameChange = (val) => {
    setFormData(prev => ({ ...prev, name: val }));
    setErrors(prev => ({ ...prev, name: null }));

    if (val.trim() && !editingMedicine) {
      const exists = existingMedicines.some(
        m => m.name.toLowerCase().trim() === val.toLowerCase().trim()
      );
      if (exists) {
        setDuplicateWarning(`⚠️ Notice: "${val.trim()}" is already present in your inventory catalog. Submitting will update or add a duplicate entry.`);
      } else {
        setDuplicateWarning('');
      }
    } else {
      setDuplicateWarning('');
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Medicine Name is required';
    }

    if (formData.quantity === '' || isNaN(formData.quantity) || parseInt(formData.quantity) < 0) {
      newErrors.quantity = 'Quantity cannot be negative';
    }

    if (formData.sellingPrice === '' || isNaN(formData.sellingPrice) || parseFloat(formData.sellingPrice) < 0) {
      newErrors.sellingPrice = 'Selling price cannot be negative';
    }

    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else {
      const selected = new Date(formData.expiryDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        newErrors.expiryDate = 'Expiry date cannot be in the past';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const qty = parseInt(formData.quantity);
    let status = 'In Stock';
    if (qty === 0) status = 'Out of Stock';
    else if (qty <= (formData.minThreshold || 20)) status = 'Low Stock';

    const payload = {
      ...formData,
      id: editingMedicine ? editingMedicine.id : `MED-${Date.now()}`,
      quantity: qty,
      sellingPrice: parseFloat(formData.sellingPrice),
      discount: parseFloat(formData.discount || 0),
      availabilityStatus: status,
      lastUpdated: 'Just now'
    };

    onSaveMedicine(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto select-none animate-hero-entrance">
      
      <div className="bg-white max-w-2xl w-full rounded-3xl shadow-2xl border border-gray-200 overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-teal-50 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-brand-dark">
              {editingMedicine ? 'Edit Medicine Inventory' : 'Add New Medicine to Inventory'}
            </h2>
            <p className="text-xs text-brand-muted mt-0.5">
              Ensure accurate strength, batch, expiry, and MRP details for rural customers.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white text-gray-400 hover:text-brand-dark flex items-center justify-center font-bold text-base shadow-sm border border-gray-200 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          
          {/* Duplicate Warning Alert Banner */}
          {duplicateWarning && (
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-medium">
              {duplicateWarning}
            </div>
          )}

          {/* Medicine Name & Generic Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-brand-text mb-1 uppercase tracking-wider">
                Medicine Name <span className="text-brand-error">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Amoxicillin 500mg"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none transition-all ${
                  errors.name ? 'border-brand-error ring-2 ring-brand-error/10 bg-rose-50/30' : 'border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-primary/20'
                }`}
              />
              {errors.name && <p className="text-[11px] text-brand-error font-medium mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-text mb-1 uppercase tracking-wider">
                Generic Salt Name
              </label>
              <input
                type="text"
                value={formData.genericName}
                onChange={(e) => setFormData({ ...formData, genericName: e.target.value })}
                placeholder="e.g. Amoxicillin Trihydrate"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-xs outline-none focus:bg-white focus:ring-2 focus:ring-brand-primary/20"
              />
            </div>
          </div>

          {/* Brand Name & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-brand-text mb-1 uppercase tracking-wider">
                Brand Name
              </label>
              <input
                type="text"
                value={formData.brandName}
                onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                placeholder="e.g. Mox 500"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-xs outline-none focus:bg-white focus:ring-2 focus:ring-brand-primary/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-text mb-1 uppercase tracking-wider">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-xs outline-none focus:bg-white focus:ring-2 focus:ring-brand-primary/20 cursor-pointer"
              >
                {['Antibiotic', 'Analgesic / Antipyretic', 'Antihistamine', 'Anti-Diabetic', 'Antacid / PPI', 'Cough & Cold', 'Rehydration Therapy', 'Cardiovascular', 'Vitamins & Supplements'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Strength, Dosage Form & Batch Number */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-brand-text mb-1 uppercase tracking-wider">Strength</label>
              <input
                type="text"
                value={formData.strength}
                onChange={(e) => setFormData({ ...formData, strength: e.target.value })}
                placeholder="e.g. 500 mg"
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-xs outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-text mb-1 uppercase tracking-wider">Dosage Form</label>
              <select
                value={formData.dosageForm}
                onChange={(e) => setFormData({ ...formData, dosageForm: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-xs outline-none cursor-pointer"
              >
                {['Tablet', 'Capsule', 'Syrup', 'Injection', 'Ointment', 'Sachet', 'Drops'].map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-text mb-1 uppercase tracking-wider">Batch Number</label>
              <input
                type="text"
                value={formData.batchNumber}
                onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
                placeholder="e.g. BAT-8821"
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-xs outline-none font-mono font-bold"
              />
            </div>
          </div>

          {/* Quantity, Selling Price & Discount */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-brand-text mb-1 uppercase tracking-wider">
                Quantity <span className="text-brand-error">*</span>
              </label>
              <input
                type="number"
                min="0"
                value={formData.quantity}
                onChange={(e) => {
                  setFormData({ ...formData, quantity: e.target.value });
                  setErrors(prev => ({ ...prev, quantity: null }));
                }}
                className={`w-full px-3 py-2.5 rounded-xl border text-xs font-bold outline-none ${
                  errors.quantity ? 'border-brand-error bg-rose-50/30' : 'border-gray-200 bg-gray-50'
                }`}
              />
              {errors.quantity && <p className="text-[11px] text-brand-error font-medium mt-1">{errors.quantity}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-text mb-1 uppercase tracking-wider">
                Selling Price (₹) <span className="text-brand-error">*</span>
              </label>
              <input
                type="number"
                min="0"
                step="0.5"
                value={formData.sellingPrice}
                onChange={(e) => {
                  setFormData({ ...formData, sellingPrice: e.target.value });
                  setErrors(prev => ({ ...prev, sellingPrice: null }));
                }}
                className={`w-full px-3 py-2.5 rounded-xl border text-xs font-bold outline-none ${
                  errors.sellingPrice ? 'border-brand-error bg-rose-50/30' : 'border-gray-200 bg-gray-50'
                }`}
              />
              {errors.sellingPrice && <p className="text-[11px] text-brand-error font-medium mt-1">{errors.sellingPrice}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-text mb-1 uppercase tracking-wider">
                Discount (% OFF)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-xs font-bold outline-none"
              />
            </div>
          </div>

          {/* Expiry Date */}
          <div>
            <label className="block text-xs font-bold text-brand-text mb-1 uppercase tracking-wider">
              Expiry Date <span className="text-brand-error">*</span>
            </label>
            <input
              type="date"
              value={formData.expiryDate}
              onChange={(e) => {
                setFormData({ ...formData, expiryDate: e.target.value });
                setErrors(prev => ({ ...prev, expiryDate: null }));
              }}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold outline-none ${
                errors.expiryDate ? 'border-brand-error bg-rose-50/30' : 'border-gray-200 bg-gray-50'
              }`}
            />
            {errors.expiryDate && <p className="text-[11px] text-brand-error font-medium mt-1">{errors.expiryDate}</p>}
          </div>

          {/* Checkbox: Prescription Required */}
          <div className="pt-2">
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-2xl bg-gray-50 border border-gray-200">
              <input
                type="checkbox"
                checked={formData.prescriptionRequired}
                onChange={(e) => setFormData({ ...formData, prescriptionRequired: e.target.checked })}
                className="w-4 h-4 rounded text-brand-primary focus:ring-brand-primary/30"
              />
              <div>
                <span className="text-xs font-extrabold text-brand-dark block">Doctor Prescription Required (Rx)</span>
                <span className="text-[11px] text-brand-muted">Customers will need to upload a valid prescription photo before reserving.</span>
              </div>
            </label>
          </div>

          {/* Buttons */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-brand-muted hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-dark text-white text-xs font-bold shadow-md shadow-brand-primary/25 transition-all cursor-pointer"
            >
              {editingMedicine ? 'Update Medicine' : 'Save to Inventory'}
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}
