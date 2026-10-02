import { useState } from 'react';
import { ROLE_PERMISSIONS } from './mockPharmacyData';

export default function StaffManagement({
  staffList = [],
  onAddStaff,
  onRemoveStaff,
  onChangeRole
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRolePreview, setSelectedRolePreview] = useState('Manager');

  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Staff'
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newStaff.name.trim() || !newStaff.phone.trim()) return;

    const payload = {
      ...newStaff,
      id: `STF-${Date.now()}`,
      joinedDate: 'Today',
      lastActive: 'Just added',
      status: 'Active'
    };

    if (onAddStaff) onAddStaff(payload);
    setShowAddModal(false);
    setNewStaff({ name: '', email: '', phone: '', role: 'Staff' });
  };

  return (
    <div className="space-y-6 animate-hero-entrance">
      
      {/* Page Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-brand-dark tracking-tight">Staff Access & Role Management</h1>
            <span className="bg-purple-50 text-purple-700 text-xs font-bold px-3 py-1 rounded-full border border-purple-200">
              {staffList.length} Active Accounts
            </span>
          </div>
          <p className="text-brand-muted text-xs sm:text-sm mt-0.5">
            Grant counter staff, accountants & store managers tailored permissions with clear role controls.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-2xl font-bold text-xs shadow-lg shadow-purple-600/25 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <span>👤 Add Staff Member</span>
        </button>
      </div>

      {/* Role Permission Breakdown Cards */}
      <div className="space-y-3">
        <h3 className="text-xs font-extrabold text-brand-muted uppercase tracking-wider">
          Role Hierarchy & Permission Matrices
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {Object.entries(ROLE_PERMISSIONS).map(([roleName, roleInfo]) => (
            <div
              key={roleName}
              onClick={() => setSelectedRolePreview(roleName)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                selectedRolePreview === roleName
                  ? 'bg-white border-purple-500 shadow-md ring-2 ring-purple-500/20'
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${roleInfo.badgeColor}`}>
                  {roleName}
                </span>
                <span className="text-[10px] text-gray-400 font-bold">
                  {staffList.filter(s => s.role === roleName).length} Members
                </span>
              </div>
              <p className="text-[11px] text-brand-muted leading-relaxed line-clamp-3">
                {roleInfo.description}
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                {roleInfo.permissions.slice(0, 3).map((perm) => (
                  <span key={perm} className="text-[9px] font-bold bg-gray-100 text-gray-700 px-1.5 py-0.2 rounded">
                    ✓ {perm}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Staff Members List */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden space-y-4 p-6">
        <h3 className="text-base font-extrabold text-brand-dark border-b border-gray-100 pb-3">
          Current Pharmacy Team Members
        </h3>

        <div className="divide-y divide-gray-100">
          {staffList.map((member) => {
            const roleInfo = ROLE_PERMISSIONS[member.role] || ROLE_PERMISSIONS.Staff;
            const isOwner = member.role === 'Owner';

            return (
              <div key={member.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/50 p-2 rounded-2xl transition-colors">
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-extrabold text-brand-dark">{member.name}</h4>
                      <span className={`px-2 py-0.2 rounded-full text-[10px] font-bold border ${roleInfo.badgeColor}`}>
                        {member.role}
                      </span>
                    </div>
                    <p className="text-xs text-brand-muted">📞 {member.phone} • ✉️ {member.email || 'N/A'}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Joined: {member.joinedDate} • Last Active: <span className="font-semibold text-brand-dark">{member.lastActive}</span></p>
                  </div>
                </div>

                {/* Role Switcher & Remove Trigger */}
                <div className="flex items-center gap-2">
                  {!isOwner ? (
                    <>
                      <select
                        value={member.role}
                        onChange={(e) => onChangeRole && onChangeRole(member.id, e.target.value)}
                        className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-bold bg-gray-50 outline-none cursor-pointer"
                      >
                        <option value="Manager">Manager</option>
                        <option value="Staff">Staff</option>
                        <option value="Accountant">Accountant</option>
                      </select>

                      <button
                        onClick={() => {
                          if (confirm(`Remove ${member.name} from pharmacy staff?`)) {
                            onRemoveStaff && onRemoveStaff(member.id);
                          }
                        }}
                        className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200 transition-colors cursor-pointer"
                      >
                        Remove
                      </button>
                    </>
                  ) : (
                    <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-xl border border-purple-200">
                      Primary Store Administrator
                    </span>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 select-none animate-hero-entrance">
          <div className="bg-white max-w-md w-full rounded-3xl p-6 shadow-2xl border border-gray-200 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-extrabold text-brand-dark">Add New Staff Member</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 font-bold hover:text-brand-dark">✕</button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-brand-text mb-1 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Suresh Gupta"
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs outline-none focus:ring-2 focus:ring-purple-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-text mb-1 uppercase tracking-wider">Phone Number</label>
                <input
                  type="text"
                  required
                  placeholder="+91 98765 00000"
                  value={newStaff.phone}
                  onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-text mb-1 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  placeholder="staff@medinearby.in"
                  value={newStaff.email}
                  onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-text mb-1 uppercase tracking-wider">Assign Role</label>
                <select
                  value={newStaff.role}
                  onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-bold outline-none bg-gray-50 cursor-pointer"
                >
                  <option value="Manager">Manager (Full operational access)</option>
                  <option value="Staff">Staff (Counter & pickup access)</option>
                  <option value="Accountant">Accountant (Read-only financial access)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-brand-muted hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
