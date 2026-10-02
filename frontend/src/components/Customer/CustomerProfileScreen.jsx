import { useState } from 'react';
import { CURRENT_USER } from './mockData';

export default function CustomerProfileScreen({ onLogout }) {
  const [fullName, setFullName] = useState(CURRENT_USER.fullName);
  const [email, setEmail] = useState(CURRENT_USER.email);
  const [phone, setPhone] = useState(CURRENT_USER.phone);
  const [location, setLocation] = useState(CURRENT_USER.location);

  const [notificationPrefs, setNotificationPrefs] = useState(CURRENT_USER.notificationPrefs);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-hero-entrance">
      
      {/* Title */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-sm">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
          Customer Profile & Settings
        </h2>
        <p className="text-xs text-[#64748B] mt-1">
          Manage your contact details, saved default location, and stock alert preferences.
        </p>
      </div>

      {/* Main Profile Form */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-sm space-y-6">
        
        {/* User Badge */}
        <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#2563EB] to-[#0F766E] text-white flex items-center justify-center text-xl font-extrabold shadow-md">
            {fullName.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-[#0F172A]">{fullName}</h3>
            <p className="text-xs text-[#64748B]">{email} • Verified Customer</p>
          </div>
        </div>

        {isSaved && (
          <div className="bg-emerald-50 text-[#16A34A] border border-emerald-200 p-3.5 rounded-2xl text-xs font-bold animate-hero-entrance flex items-center gap-2">
            <span>✓</span> Profile settings saved successfully!
          </div>
        )}

        <form onSubmit={handleSaveProfile} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-gray-50/50 focus:bg-white text-xs font-medium outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/15"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-gray-50/50 focus:bg-white text-xs font-medium outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/15"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">Mobile Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-gray-50/50 focus:bg-white text-xs font-medium outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/15"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">Default Search Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-gray-50/50 focus:bg-white text-xs font-medium outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/15"
                required
              />
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="pt-4 border-t border-gray-100 space-y-3">
            <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Notification Preferences</h4>

            <label className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200/60 cursor-pointer text-xs">
              <span className="font-bold text-[#0F172A]">SMS Stock & Pickup Alerts</span>
              <input
                type="checkbox"
                checked={notificationPrefs.smsAlerts}
                onChange={(e) => setNotificationPrefs({ ...notificationPrefs, smsAlerts: e.target.checked })}
                className="w-4 h-4 rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB]"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200/60 cursor-pointer text-xs">
              <span className="font-bold text-[#0F172A]">Email Receipts & Confirmations</span>
              <input
                type="checkbox"
                checked={notificationPrefs.emailAlerts}
                onChange={(e) => setNotificationPrefs({ ...notificationPrefs, emailAlerts: e.target.checked })}
                className="w-4 h-4 rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB]"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200/60 cursor-pointer text-xs">
              <span className="font-bold text-[#0F172A]">Nearby Medicine Restock Alerts</span>
              <input
                type="checkbox"
                checked={notificationPrefs.restockAlerts}
                onChange={(e) => setNotificationPrefs({ ...notificationPrefs, restockAlerts: e.target.checked })}
                className="w-4 h-4 rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB]"
              />
            </label>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              type="submit"
              className="bg-[#2563EB] hover:bg-[#1E40AF] text-white px-6 py-3 rounded-xl font-bold text-xs shadow-md shadow-[#2563EB]/20 transition-all cursor-pointer"
            >
              Save Profile Settings
            </button>

            <button
              type="button"
              onClick={onLogout}
              className="text-xs font-bold text-[#DC2626] hover:bg-red-50 px-4 py-2.5 rounded-xl border border-red-200 transition-colors cursor-pointer"
            >
              Log Out Account
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}
