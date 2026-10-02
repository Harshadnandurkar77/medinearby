import { useState } from 'react';

export default function PharmacyLayout({
  pharmacyProfile,
  currentTab,
  onNavigate,
  onLogout,
  onToggleStoreStatus,
  pendingReservationsCount = 0,
  lowStockCount = 0,
  demoState = 'normal',
  onStateChange,
  children
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 'n-1',
      title: 'New Reservation Received',
      desc: 'Sunita Devi requested 2x Amoxicillin 500mg (Pickup today by 6 PM)',
      time: '5 mins ago',
      unread: true,
      tab: 'reservations',
      icon: '📦',
      badgeColor: 'bg-blue-50 text-brand-primary'
    },
    {
      id: 'n-2',
      title: 'Low Stock Alert',
      desc: 'Paracetamol 650mg is down to 8 items (Threshold: 25)',
      time: '45 mins ago',
      unread: true,
      tab: 'inventory',
      icon: '⚠️',
      badgeColor: 'bg-amber-50 text-amber-600'
    },
    {
      id: 'n-3',
      title: 'Offer Expiry Reminder',
      desc: 'Monsoon Relief Offer expires in 19 days',
      time: '3 hours ago',
      unread: false,
      tab: 'offers',
      icon: '🏷️',
      badgeColor: 'bg-emerald-50 text-emerald-600'
    }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'inventory', label: 'Inventory Management', badge: lowStockCount, badgeColor: 'bg-amber-500', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    { id: 'reservations', label: 'Customer Reservations', badge: pendingReservationsCount, badgeColor: 'bg-brand-primary', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { id: 'offers', label: 'Offers & Discounts', icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a2 2 0 012-2z' },
    { id: 'profile', label: 'Pharmacy Profile', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m3 0h1m-1-4h.01M9 16h.01M9 12h.01M9 8h.01M15 16h.01M15 12h.01M15 8h.01' },
    { id: 'staff', label: 'Staff Management', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { id: 'reports', label: 'Reports & Analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { id: 'verification', label: 'Verification Status', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return { label: 'Verified Partner', bg: 'bg-emerald-100 text-emerald-700 border-emerald-300', dot: 'bg-emerald-500' };
      case 'More Information Required':
        return { label: 'Action Required', bg: 'bg-amber-100 text-amber-700 border-amber-300', dot: 'bg-amber-500' };
      case 'Rejected':
        return { label: 'Application Rejected', bg: 'bg-red-100 text-red-700 border-red-300', dot: 'bg-red-500' };
      default:
        return { label: 'Verification Pending', bg: 'bg-blue-100 text-blue-700 border-blue-300', dot: 'bg-blue-500' };
    }
  };

  const statusBadge = getStatusBadge(pharmacyProfile?.verificationStatus);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-brand-text flex flex-col font-sans select-none">
      
      {/* Interactive Demo State Controller Toolbar */}
      <div className="bg-slate-900 text-white text-xs px-4 py-2 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 z-40">
        <div className="flex items-center gap-2 font-medium">
          <span className="bg-brand-primary px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">Demo Control Bar</span>
          <span className="text-slate-300 hidden sm:inline">Preview Pharmacy Screen States:</span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
          {[
            { key: 'normal', label: '🟢 Normal View' },
            { key: 'verification', label: '⏳ Verification Pending' },
            { key: 'loading', label: '🔄 Loading State' },
            { key: 'empty', label: '📭 Empty State' },
            { key: 'error', label: '⚠️ Error State' },
            { key: 'permission', label: '🔒 Staff Access Denied' }
          ].map((st) => (
            <button
              key={st.key}
              onClick={() => onStateChange && onStateChange(st.key)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                demoState === st.key ? 'bg-brand-primary text-white shadow-sm' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-[#E2E8F0] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Left: Brand Logo & Pharmacy Name Badge */}
            <div className="flex items-center gap-4">
              <div 
                onClick={() => onNavigate('dashboard')}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-primary to-brand-teal text-white flex items-center justify-center shadow-md shadow-brand-primary/20 group-hover:scale-105 transition-transform">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <line x1="12" y1="7" x2="12" y2="13"></line>
                    <line x1="9" y1="10" x2="15" y2="10"></line>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-extrabold tracking-tight text-brand-dark leading-none">
                    Medi<span className="text-brand-primary">Nearby</span>
                  </span>
                  <span className="text-[10px] text-brand-teal font-extrabold tracking-wider uppercase">Pharmacy Owner Portal</span>
                </div>
              </div>

              {/* Divider & Pharmacy Name */}
              <div className="hidden md:flex items-center gap-3 pl-4 border-l border-gray-200">
                <div>
                  <h3 className="text-xs sm:text-sm font-extrabold text-brand-dark flex items-center gap-2">
                    {pharmacyProfile?.name || 'Jan Aushadhi Kendra'}
                  </h3>
                  <p className="text-[11px] text-brand-muted font-medium">
                    {pharmacyProfile?.village}, {pharmacyProfile?.district} (Pincode: {pharmacyProfile?.pincode})
                  </p>
                </div>

                {/* Verification Badge */}
                <span className={`hidden lg:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${statusBadge.bg}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${statusBadge.dot} animate-pulse`}></span>
                  {statusBadge.label}
                </span>
              </div>
            </div>

            {/* Right: Open/Closed Toggle, Notifications & Profile Menu */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Store Open/Closed Toggle Pill */}
              <button
                onClick={onToggleStoreStatus}
                title={pharmacyProfile?.isOpen ? 'Click to set shop as Closed' : 'Click to set shop as Open'}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-sm ${
                  pharmacyProfile?.isOpen
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100'
                    : 'bg-rose-50 border-rose-300 text-rose-700 hover:bg-rose-100'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${pharmacyProfile?.isOpen ? 'bg-emerald-600 animate-ping' : 'bg-rose-600'}`}></span>
                <span className="hidden xs:inline">{pharmacyProfile?.isOpen ? 'Store Open' : 'Store Closed'}</span>
              </button>

              {/* Notification Center */}
              <div className="relative">
                <button
                  onClick={() => { setShowNotifications(!showNotifications); setShowUserMenu(false); }}
                  className={`relative p-2.5 rounded-xl transition-all cursor-pointer ${
                    showNotifications ? 'bg-blue-50 text-brand-primary' : 'text-brand-muted hover:text-brand-text hover:bg-gray-100'
                  }`}
                  title="Notifications"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-brand-error text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 sm:-right-8 mt-2 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-hero-entrance">
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-blue-50/60 to-slate-50">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-extrabold text-brand-dark">Store Notifications</h4>
                        {unreadCount > 0 && (
                          <span className="bg-brand-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {unreadCount} New
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => setNotifications(prev => prev.map(n => ({ ...n, unread: false })))}
                        className="text-[11px] font-bold text-brand-primary hover:underline cursor-pointer"
                      >
                        Mark read
                      </button>
                    </div>

                    <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => {
                            setNotifications(prev => prev.map(item => item.id === n.id ? { ...item, unread: false } : item));
                            setShowNotifications(false);
                            onNavigate(n.tab);
                          }}
                          className={`p-4 transition-colors cursor-pointer hover:bg-gray-50 flex items-start gap-3 ${
                            n.unread ? 'bg-blue-50/40' : 'bg-white'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm shrink-0 mt-0.5 ${n.badgeColor}`}>
                            {n.icon}
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <h5 className={`text-xs ${n.unread ? 'font-extrabold text-brand-dark' : 'font-semibold text-gray-700'}`}>
                                {n.title}
                              </h5>
                              <span className="text-[10px] text-gray-400">{n.time}</span>
                            </div>
                            <p className="text-[11px] text-brand-muted leading-relaxed">{n.desc}</p>
                          </div>
                          {n.unread && <span className="w-2 h-2 rounded-full bg-brand-primary shrink-0 mt-1.5"></span>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile Pill */}
              <div className="relative">
                <button
                  onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifications(false); }}
                  className="flex items-center gap-2 p-1.5 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200"
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-teal text-white flex items-center justify-center font-bold text-sm shadow-sm">
                    {pharmacyProfile?.ownerName?.charAt(0) || 'R'}
                  </div>
                  <div className="hidden sm:flex flex-col text-left">
                    <span className="text-xs font-bold text-brand-dark leading-tight">{pharmacyProfile?.ownerName || 'Ramesh Sharma'}</span>
                    <span className="text-[10px] text-brand-primary font-bold">Owner Access</span>
                  </div>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"></path></svg>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-200 p-2 z-50 animate-hero-entrance">
                    <div className="px-3 py-2 border-b border-gray-100">
                      <p className="text-xs font-bold text-brand-dark">{pharmacyProfile?.ownerName}</p>
                      <p className="text-[11px] text-brand-muted truncate">{pharmacyProfile?.name}</p>
                    </div>
                    
                    <button
                      onClick={() => { onNavigate('profile'); setShowUserMenu(false); }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-brand-text hover:bg-gray-100 flex items-center gap-2 mt-1 cursor-pointer"
                    >
                      <span>👤 Pharmacy Profile</span>
                    </button>
                    <button
                      onClick={() => { onNavigate('staff'); setShowUserMenu(false); }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-brand-text hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                    >
                      <span>👥 Staff Access</span>
                    </button>
                    <button
                      onClick={() => { onNavigate('verification'); setShowUserMenu(false); }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-brand-text hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                    >
                      <span>📜 Verification Details</span>
                    </button>

                    <div className="border-t border-gray-100 my-1"></div>

                    <button
                      onClick={() => { if (onLogout) onLogout(); }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-brand-error hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                    >
                      <span>🚪 Log out</span>
                    </button>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* Mobile Horizontal Sub Nav */}
        <div className="md:hidden flex items-center gap-1 overflow-x-auto border-t border-gray-200 bg-white py-2 px-3 no-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap flex items-center gap-1.5 cursor-pointer transition-all ${
                currentTab === item.id ? 'bg-blue-50 text-brand-primary border border-blue-200 shadow-sm' : 'text-brand-muted hover:bg-gray-100'
              }`}
            >
              <span>{item.label}</span>
              {item.badge > 0 && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] text-white ${item.badgeColor}`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </header>

      {/* Body Area with Sidebar + Content */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col md:flex-row">
        
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 p-4 border-r border-gray-200 bg-white shrink-0">
          
          {/* Pharmacy Quick Profile Card */}
          <div className="mb-6 p-3 rounded-2xl bg-gradient-to-br from-blue-50/80 to-teal-50/50 border border-blue-100">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-lg bg-brand-primary text-white flex items-center justify-center font-bold text-xs">
                🏥
              </div>
              <div className="overflow-hidden">
                <h4 className="text-xs font-extrabold text-brand-dark truncate">{pharmacyProfile?.name}</h4>
                <p className="text-[10px] text-brand-muted truncate">ID: {pharmacyProfile?.id}</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-[11px] pt-1 border-t border-blue-100/80 font-medium text-brand-muted">
              <span>Status:</span>
              <span className={`font-bold ${pharmacyProfile?.isOpen ? 'text-emerald-600' : 'text-rose-600'}`}>
                {pharmacyProfile?.isOpen ? 'Open Now' : 'Closed'}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <div className="text-[10px] font-bold text-brand-muted uppercase tracking-wider px-3 mb-2">
              Pharmacy Operations
            </div>
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20'
                      : 'text-brand-muted hover:text-brand-dark hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                    <span>{item.label}</span>
                  </div>
                  {item.badge > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-white text-brand-primary' : `${item.badgeColor} text-white`
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Emergency Support Card */}
          <div className="mt-8 p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-900">
            <h5 className="text-xs font-bold flex items-center gap-1.5">
              <span>💬 Rural Helpdesk</span>
            </h5>
            <p className="text-[11px] text-amber-800 mt-1 leading-snug">
              Need help adding bulk stock or verifying drug license?
            </p>
            <button 
              onClick={() => alert('MediNearby Pharmacy Helpline: 1800-419-8800 (Mon-Sat, 9 AM - 6 PM)')}
              className="mt-2.5 w-full bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              Call Helpline
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-brand-muted">
          <p className="font-semibold">© 2026 MediNearby Rural Healthcare Network — Local Pharmacy Dashboard</p>
          <p className="text-[11px] text-gray-400 mt-0.5">Designed for high accessibility on 3G/4G networks & low-end devices across villages and semi-urban medical stores.</p>
        </div>
      </footer>

    </div>
  );
}
