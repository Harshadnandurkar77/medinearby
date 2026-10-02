import { useState } from 'react';
import { CURRENT_USER } from './mockData';

export default function CustomerLayout({ 
  currentTab, 
  onNavigate, 
  onLogout,
  children 
}) {
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(CURRENT_USER.location);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  // Interactive Notification System State
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Reservation Confirmed',
      desc: 'Apollo Pharmacy confirmed your hold request for Amoxicillin 500mg (Pickup by 6:00 PM)',
      time: '10 mins ago',
      unread: true,
      targetTab: 'reservations',
      icon: '✅',
      color: 'bg-emerald-50 text-[#16A34A]'
    },
    {
      id: 'notif-2',
      title: 'Medicine Restock Alert',
      desc: 'Paracetamol 500mg has been restocked at MedPlus Wellness Pharmacy (0.9 km away)',
      time: '1 hour ago',
      unread: true,
      targetTab: 'search',
      icon: '⚡',
      color: 'bg-blue-50 text-[#2563EB]'
    },
    {
      id: 'notif-3',
      title: 'Order Ready for Pickup',
      desc: 'Your reservation #RES-7621 is ready for pickup at MedPlus Pharmacy',
      time: '2 hours ago',
      unread: true,
      targetTab: 'reservations',
      icon: '📦',
      color: 'bg-[#EFF6FF] text-[#2563EB]'
    }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const locations = [
    "Connaught Place, New Delhi",
    "Khan Market, New Delhi",
    "Hauz Khas, New Delhi",
    "Cyber City, Gurugram",
    "Noida Sector 18, Noida"
  ];

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const handleNotificationClick = (notif) => {
    // Mark clicked notification as read
    setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, unread: false } : n));
    setShowNotifications(false);
    if (notif.targetTab) {
      onNavigate(notif.targetTab);
    }
  };

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans">
      
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-30 bg-white border-b border-[#E2E8F0] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Left: Brand Logo & Navigation Links */}
            <div className="flex items-center gap-8">
              {/* Logo */}
              <div 
                onClick={() => onNavigate('dashboard')}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#06B6D4] text-white flex items-center justify-center shadow-md shadow-[#2563EB]/20 group-hover:scale-105 transition-transform">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <line x1="12" y1="7" x2="12" y2="13"></line>
                    <line x1="9" y1="10" x2="15" y2="10"></line>
                  </svg>
                </div>
                <span className="text-xl font-extrabold tracking-tight text-[#0F172A]">
                  Medi<span className="text-[#2563EB]">Nearby</span>
                </span>
              </div>

              {/* Desktop Nav Items */}
              <nav className="hidden md:flex items-center gap-1">
                <button
                  onClick={() => onNavigate('dashboard')}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    currentTab === 'dashboard'
                      ? 'bg-[#EFF6FF] text-[#2563EB]'
                      : 'text-[#64748B] hover:text-[#0F172A] hover:bg-gray-100/70'
                  }`}
                >
                  Dashboard
                </button>

                <button
                  onClick={() => onNavigate('search')}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    currentTab === 'search'
                      ? 'bg-[#EFF6FF] text-[#2563EB]'
                      : 'text-[#64748B] hover:text-[#0F172A] hover:bg-gray-100/70'
                  }`}
                >
                  Find Medicine
                </button>

                <button
                  onClick={() => onNavigate('reservations')}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer relative ${
                    currentTab === 'reservations'
                      ? 'bg-[#EFF6FF] text-[#2563EB]'
                      : 'text-[#64748B] hover:text-[#0F172A] hover:bg-gray-100/70'
                  }`}
                >
                  My Reservations
                  <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-bold bg-[#2563EB] text-white rounded-full">2</span>
                </button>
              </nav>
            </div>

            {/* Middle: Location Selector */}
            <div className="hidden lg:flex items-center relative">
              <button
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-[#E2E8F0] bg-gray-50 hover:bg-white text-xs font-semibold text-[#0F172A] transition-all cursor-pointer shadow-sm"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0F766E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span className="truncate max-w-[180px]">{selectedLocation}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"></path></svg>
              </button>

              {showLocationDropdown && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#E2E8F0] p-2 z-50 animate-hero-entrance">
                  <div className="text-[10px] font-bold text-[#64748B] uppercase px-3 py-1 tracking-wider">Select Location</div>
                  {locations.map((loc, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setSelectedLocation(loc); setShowLocationDropdown(false); }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                        selectedLocation === loc ? 'bg-[#EFF6FF] text-[#2563EB] font-bold' : 'hover:bg-gray-100 text-[#0F172A]'
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Notifications & Profile */}
            <div className="flex items-center gap-3">
              
              {/* Working Interactive Notification Bell Icon & Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => { setShowNotifications(!showNotifications); setShowUserMenu(false); }}
                  title="Notifications"
                  className={`relative p-2.5 rounded-xl transition-all cursor-pointer ${
                    showNotifications ? 'bg-[#EFF6FF] text-[#2563EB]' : 'text-[#64748B] hover:text-[#0F172A] hover:bg-gray-100'
                  }`}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>

                  {/* Red Unread Notification Badge Counter */}
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#DC2626] text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown Panel */}
                {showNotifications && (
                  <div className="absolute right-0 sm:-right-12 mt-2 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-[#E2E8F0] overflow-hidden z-50 animate-hero-entrance">
                    
                    {/* Header */}
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-blue-50/50 to-slate-50">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-extrabold text-[#0F172A]">Notifications</h4>
                        {unreadCount > 0 && (
                          <span className="bg-[#2563EB] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {unreadCount} New
                          </span>
                        )}
                      </div>
                      
                      {unreadCount > 0 && (
                        <button
                          onClick={handleMarkAllAsRead}
                          className="text-[11px] font-bold text-[#2563EB] hover:underline cursor-pointer"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>

                    {/* Notification List */}
                    <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center text-xs text-[#64748B]">
                          <p className="font-bold text-[#0F172A]">No notifications</p>
                          <p className="text-[11px] mt-1">You are all caught up!</p>
                        </div>
                      ) : (
                        notifications.map((n) => (
                          <div
                            key={n.id}
                            onClick={() => handleNotificationClick(n)}
                            className={`p-4 transition-colors cursor-pointer hover:bg-gray-50 flex items-start gap-3 relative ${
                              n.unread ? 'bg-[#EFF6FF]/40' : 'bg-white'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm shrink-0 mt-0.5 ${n.color}`}>
                              {n.icon}
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <h5 className={`text-xs ${n.unread ? 'font-extrabold text-[#0F172A]' : 'font-semibold text-gray-700'}`}>
                                  {n.title}
                                </h5>
                                <span className="text-[10px] text-gray-400">{n.time}</span>
                              </div>
                              <p className="text-[11px] text-[#64748B] leading-relaxed line-clamp-2">{n.desc}</p>
                            </div>
                            {n.unread && (
                              <span className="w-2 h-2 rounded-full bg-[#2563EB] shrink-0 mt-1.5"></span>
                            )}
                          </div>
                        ))
                      )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 0 && (
                      <div className="p-3 bg-gray-50 border-t border-gray-100 text-center">
                        <button
                          onClick={handleClearNotifications}
                          className="text-[11px] font-bold text-gray-500 hover:text-[#DC2626] transition-colors cursor-pointer"
                        >
                          Clear all notifications
                        </button>
                      </div>
                    )}

                  </div>
                )}
              </div>

              {/* User Profile Pill & Dropdown */}
              <div className="relative">
                <button
                  onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifications(false); }}
                  className="flex items-center gap-2.5 p-1.5 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer border border-[#E2E8F0]"
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#0F766E] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                    {CURRENT_USER.name.charAt(0)}
                  </div>
                  <span className="hidden sm:inline text-xs font-bold text-[#0F172A]">{CURRENT_USER.name}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"></path></svg>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-[#E2E8F0] p-2 z-50 animate-hero-entrance">
                    <div className="px-3 py-2 border-b border-gray-100">
                      <p className="text-xs font-bold text-[#0F172A]">{CURRENT_USER.fullName}</p>
                      <p className="text-[11px] text-[#64748B] truncate">{CURRENT_USER.email}</p>
                    </div>
                    
                    <button
                      onClick={() => { onNavigate('profile'); setShowUserMenu(false); }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-[#0F172A] hover:bg-gray-100 flex items-center gap-2 mt-1 cursor-pointer"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                      My Profile
                    </button>

                    <button
                      onClick={() => { onNavigate('reservations'); setShowUserMenu(false); }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-[#0F172A] hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                      My Reservations
                    </button>

                    <div className="border-t border-gray-100 my-1"></div>

                    <button
                      onClick={() => { if (onLogout) onLogout(); }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-[#DC2626] hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                      Log out
                    </button>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* Mobile Sub Nav Bar */}
        <div className="md:hidden flex items-center justify-around border-t border-[#E2E8F0] bg-white py-2 px-4">
          <button
            onClick={() => onNavigate('dashboard')}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg ${currentTab === 'dashboard' ? 'bg-[#EFF6FF] text-[#2563EB]' : 'text-[#64748B]'}`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('search')}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg ${currentTab === 'search' ? 'bg-[#EFF6FF] text-[#2563EB]' : 'text-[#64748B]'}`}
          >
            Search
          </button>
          <button
            onClick={() => onNavigate('reservations')}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg ${currentTab === 'reservations' ? 'bg-[#EFF6FF] text-[#2563EB]' : 'text-[#64748B]'}`}
          >
            Reservations (2)
          </button>
          <button
            onClick={() => onNavigate('profile')}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg ${currentTab === 'profile' ? 'bg-[#EFF6FF] text-[#2563EB]' : 'text-[#64748B]'}`}
          >
            Profile
          </button>
        </div>
      </header>

      {/* Main Page Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer Disclaimer */}
      <footer className="border-t border-[#E2E8F0] bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-[#64748B]">
          <p className="font-medium">© 2026 MediNearby Healthcare Inc. — Local Pharmacy Availability & Price Finder.</p>
          <p className="mt-1 text-[11px] text-gray-400">Disclaimer: Availability & prices shown are updated by partner pharmacies. Please verify before visiting for urgent prescription medicine.</p>
        </div>
      </footer>

    </div>
  );
}
