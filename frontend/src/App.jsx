import { useState, useEffect } from 'react';
import IntroScreen from './components/IntroScreen';
import AuthPage from './components/AuthPage';

import CustomerLayout from './components/Customer/CustomerLayout';
import CustomerDashboard from './components/Customer/CustomerDashboard';
import MedicineSearchScreen from './components/Customer/MedicineSearchScreen';
import PharmacyResultsScreen from './components/Customer/PharmacyResultsScreen';
import PharmacyDetailsScreen from './components/Customer/PharmacyDetailsScreen';
import ReservationScreen from './components/Customer/ReservationScreen';
import MyReservationsScreen from './components/Customer/MyReservationsScreen';
import CustomerProfileScreen from './components/Customer/CustomerProfileScreen';

// Pharmacy Portal Imports
import PharmacyLayout from './components/Pharmacy/PharmacyLayout';
import PharmacyDashboard from './components/Pharmacy/PharmacyDashboard';
import PharmacyVerificationPending from './components/Pharmacy/PharmacyVerificationPending';
import InventoryManagement from './components/Pharmacy/InventoryManagement';
import AddMedicineModal from './components/Pharmacy/AddMedicineModal';
import ReservationsManagement from './components/Pharmacy/ReservationsManagement';
import OffersDiscounts from './components/Pharmacy/OffersDiscounts';
import PharmacyProfile from './components/Pharmacy/PharmacyProfile';
import StaffManagement from './components/Pharmacy/StaffManagement';
import ReportsPage from './components/Pharmacy/ReportsPage';

import {
  INITIAL_PHARMACY_PROFILE,
  INITIAL_MEDICINES,
  INITIAL_RESERVATIONS,
  INITIAL_OFFERS,
  INITIAL_STAFF
} from './components/Pharmacy/mockPharmacyData';

export default function App() {
  const path = typeof window !== 'undefined' ? window.location.pathname.toLowerCase() : '';
  const isCustomerRoute = path.includes('/customer');
  const isPharmacyRoute = path.includes('/pharmacy');

  const [currentView, setCurrentView] = useState(
    isPharmacyRoute ? 'pharmacy' : isCustomerRoute ? 'customer' : 'intro'
  ); // 'intro' | 'login' | 'signup' | 'customer' | 'pharmacy'

  const [customerTab, setCustomerTab] = useState('dashboard');
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Pharmacy State Management
  const [pharmacyProfile, setPharmacyProfile] = useState(INITIAL_PHARMACY_PROFILE);
  const [medicines, setMedicines] = useState(INITIAL_MEDICINES);
  const [reservations, setReservations] = useState(INITIAL_RESERVATIONS);
  const [offers, setOffers] = useState(INITIAL_OFFERS);
  const [staffList, setStaffList] = useState(INITIAL_STAFF);

  // Pharmacy Navigation Sub-tab
  const [pharmacyTab, setPharmacyTab] = useState('dashboard');
  const [isAddMedicineOpen, setIsAddMedicineOpen] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState(null);

  // Interactive Demo State controller ('normal' | 'verification' | 'loading' | 'empty' | 'error' | 'permission')
  const [demoState, setDemoState] = useState('normal');

  // Handle URL change or browser refresh for /customer and /pharmacy
  useEffect(() => {
    const handleLocationCheck = () => {
      const currentPath = window.location.pathname.toLowerCase();
      if (currentPath.includes('/pharmacy')) {
        setCurrentView('pharmacy');
        if (currentPath.includes('/verification')) setPharmacyTab('verification');
        else if (currentPath.includes('/inventory/add')) {
          setPharmacyTab('inventory');
          setIsAddMedicineOpen(true);
        }
        else if (currentPath.includes('/inventory')) setPharmacyTab('inventory');
        else if (currentPath.includes('/reservations')) setPharmacyTab('reservations');
        else if (currentPath.includes('/offers')) setPharmacyTab('offers');
        else if (currentPath.includes('/profile')) setPharmacyTab('profile');
        else if (currentPath.includes('/staff')) setPharmacyTab('staff');
        else if (currentPath.includes('/reports')) setPharmacyTab('reports');
        else setPharmacyTab('dashboard');
      } else if (currentPath.includes('/customer')) {
        setCurrentView('customer');
        setCustomerTab('dashboard');
      }
    };

    handleLocationCheck();
    window.addEventListener('popstate', handleLocationCheck);
    return () => window.removeEventListener('popstate', handleLocationCheck);
  }, []);

  const navigatePharmacy = (tab) => {
    setPharmacyTab(tab);
    window.history.pushState({}, '', `/pharmacy/${tab === 'dashboard' ? 'dashboard' : tab}`);
  };

  const handleCompleteIntro = () => {
    setCurrentView('auth');
  };

  const handleLoginSuccess = (userRole = 'customer') => {
    if (userRole === 'pharmacy') {
      setCurrentView('pharmacy');
      setPharmacyTab('dashboard');
      window.history.pushState({}, '', '/pharmacy/dashboard');
    } else {
      setCurrentView('customer');
      setCustomerTab('dashboard');
      window.history.pushState({}, '', '/customer');
    }
  };

  const handlePharmacySignupSuccess = () => {
    setCurrentView('pharmacy');
    setPharmacyTab('verification');
    window.history.pushState({}, '', '/pharmacy/verification');
  };

  const handleSearchMedicine = (query) => {
    setSearchQuery(query || '');
    setCustomerTab('search');
  };

  const handleSelectMedicine = (med) => {
    setSelectedMedicine(med);
    setCustomerTab('pharmacies');
  };

  const handleSelectPharmacy = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setCustomerTab('pharmacy-details');
  };

  const handleStartReservation = (pharmacy) => {
    if (pharmacy) setSelectedPharmacy(pharmacy);
    setCustomerTab('reserve');
  };

  const handleLogout = () => {
    setCurrentView('auth');
    window.history.pushState({}, '', '/');
  };

  // Pharmacy Handlers
  const handleToggleStoreStatus = () => {
    setPharmacyProfile(prev => ({ ...prev, isOpen: !prev.isOpen }));
  };

  const handleSaveMedicine = (medicinePayload) => {
    setMedicines(prev => {
      const idx = prev.findIndex(m => m.id === medicinePayload.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = medicinePayload;
        return copy;
      } else {
        return [medicinePayload, ...prev];
      }
    });
    setEditingMedicine(null);
  };

  const handleQuickStockUpdate = (medId, newQty) => {
    setMedicines(prev => prev.map(m => {
      if (m.id === medId) {
        let status = 'In Stock';
        if (newQty === 0) status = 'Out of Stock';
        else if (newQty <= m.minThreshold) status = 'Low Stock';
        return { ...m, quantity: newQty, availabilityStatus: status };
      }
      return m;
    }));
  };

  const handleQuickPriceUpdate = (medId, newPrice) => {
    setMedicines(prev => prev.map(m => m.id === medId ? { ...m, sellingPrice: newPrice } : m));
  };

  const handleAcceptReservation = (resId) => {
    setReservations(prev => prev.map(r => r.id === resId ? { ...r, status: 'Confirmed' } : r));
  };

  const handleRejectReservationWithReason = (resId, reason) => {
    setReservations(prev => prev.map(r => r.id === resId ? { ...r, status: 'Rejected', rejectReason: reason } : r));
  };

  const handleMarkReadyForPickup = (resId) => {
    setReservations(prev => prev.map(r => r.id === resId ? { ...r, status: 'Ready for Pickup' } : r));
  };

  const handleMarkCompleted = (resId) => {
    setReservations(prev => prev.map(r => r.id === resId ? { ...r, status: 'Completed' } : r));
  };

  const handleCreateOffer = (offerPayload) => {
    setOffers(prev => [offerPayload, ...prev]);
  };

  const handleToggleOfferStatus = (offerId) => {
    setOffers(prev => prev.map(o => {
      if (o.id === offerId) {
        return { ...o, status: o.status === 'Active' ? 'Paused' : 'Active' };
      }
      return o;
    }));
  };

  const handleAddStaff = (staffPayload) => {
    setStaffList(prev => [...prev, staffPayload]);
  };

  const handleRemoveStaff = (staffId) => {
    setStaffList(prev => prev.filter(s => s.id !== staffId));
  };

  const handleChangeRole = (staffId, newRole) => {
    setStaffList(prev => prev.map(s => s.id === staffId ? { ...s, role: newRole } : s));
  };

  const pendingReservationsCount = reservations.filter(r => r.status === 'Pending').length;
  const lowStockCount = medicines.filter(m => m.availabilityStatus === 'Low Stock' || m.quantity <= m.minThreshold).length;

  return (
    <div className="min-h-screen bg-brand-bg font-sans text-brand-text selection:bg-brand-primary selection:text-white">
      
      {/* Step 1: Intro Screen Animation (Root path) */}
      {currentView === 'intro' && (
        <IntroScreen onComplete={handleCompleteIntro} />
      )}

      {/* Step 2: Unified Auth Page */}
      {currentView === 'auth' && (
        <AuthPage 
          onLoginSuccess={handleLoginSuccess}
          onPharmacySignupSuccess={handlePharmacySignupSuccess}
          initialMode="login"
        />
      )}

      {/* For legacy route support, map 'login' and 'signup' to auth view */}
      {(currentView === 'login' || currentView === 'signup') && (
        <AuthPage 
          onLoginSuccess={handleLoginSuccess}
          onPharmacySignupSuccess={handlePharmacySignupSuccess}
          initialMode={currentView}
        />
      )}

      {/* Step 3: Customer Dashboard Suite */}
      {currentView === 'customer' && (
        <CustomerLayout
          currentTab={customerTab}
          onNavigate={(tab) => setCustomerTab(tab)}
          onLogout={handleLogout}
        >
          {customerTab === 'dashboard' && (
            <CustomerDashboard
              onSearch={handleSearchMedicine}
              onSelectPharmacy={handleSelectPharmacy}
              onViewReservations={() => setCustomerTab('reservations')}
            />
          )}

          {customerTab === 'search' && (
            <MedicineSearchScreen
              initialQuery={searchQuery}
              onSelectMedicine={handleSelectMedicine}
            />
          )}

          {customerTab === 'pharmacies' && (
            <PharmacyResultsScreen
              selectedMedicine={selectedMedicine}
              onBackToSearch={() => setCustomerTab('search')}
              onSelectPharmacy={handleSelectPharmacy}
              onReserve={handleStartReservation}
            />
          )}

          {customerTab === 'pharmacy-details' && (
            <PharmacyDetailsScreen
              pharmacy={selectedPharmacy}
              selectedMedicine={selectedMedicine}
              onBack={() => setCustomerTab('pharmacies')}
              onReserve={handleStartReservation}
            />
          )}

          {customerTab === 'reserve' && (
            <ReservationScreen
              selectedMedicine={selectedMedicine}
              selectedPharmacy={selectedPharmacy}
              onBack={() => setCustomerTab('pharmacies')}
              onViewReservations={() => setCustomerTab('reservations')}
            />
          )}

          {customerTab === 'reservations' && (
            <MyReservationsScreen
              onNewSearch={() => setCustomerTab('search')}
            />
          )}

          {customerTab === 'profile' && (
            <CustomerProfileScreen
              onLogout={handleLogout}
            />
          )}

        </CustomerLayout>
      )}

      {/* Step 4: Pharmacy Owner Dashboard Suite */}
      {currentView === 'pharmacy' && (
        <PharmacyLayout
          pharmacyProfile={pharmacyProfile}
          currentTab={pharmacyTab}
          onNavigate={navigatePharmacy}
          onLogout={handleLogout}
          onToggleStoreStatus={handleToggleStoreStatus}
          pendingReservationsCount={pendingReservationsCount}
          lowStockCount={lowStockCount}
          demoState={demoState}
          onStateChange={setDemoState}
        >
          
          {/* DEMO STATE OVERRIDES */}
          {demoState === 'verification' && (
            <PharmacyVerificationPending
              pharmacyProfile={pharmacyProfile}
              onUpdateStatus={(st) => setPharmacyProfile(prev => ({ ...prev, verificationStatus: st }))}
              onEditProfile={() => navigatePharmacy('profile')}
              onGoToDashboard={() => { setDemoState('normal'); navigatePharmacy('dashboard'); }}
            />
          )}

          {demoState === 'loading' && (
            <div className="space-y-4 py-12 max-w-4xl mx-auto text-center animate-pulse">
              <div className="w-16 h-16 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
              <h3 className="text-lg font-bold text-brand-dark">Loading Pharmacy Inventory & Reservations...</h3>
              <p className="text-xs text-brand-muted">Fetching latest local stock levels over rural network connection.</p>
            </div>
          )}

          {demoState === 'empty' && (
            <div className="max-w-md mx-auto py-16 text-center space-y-4 bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
              <div className="text-4xl">📭</div>
              <h3 className="text-xl font-extrabold text-brand-dark">No Medicine Catalog Data</h3>
              <p className="text-xs text-brand-muted">Your pharmacy inventory is currently empty. Add your first medicine formulation to start receiving customer holds.</p>
              <button
                onClick={() => { setIsAddMedicineOpen(true); setDemoState('normal'); }}
                className="bg-brand-primary text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md"
              >
                + Add First Medicine
              </button>
            </div>
          )}

          {demoState === 'error' && (
            <div className="max-w-md mx-auto py-16 text-center space-y-4 bg-rose-50 rounded-3xl p-8 border border-rose-200 text-rose-900 shadow-sm">
              <div className="text-4xl">⚠️</div>
              <h3 className="text-xl font-extrabold text-rose-950">Connection Mismatch</h3>
              <p className="text-xs text-rose-800">Failed to sync pharmacy stock. Network request timed out.</p>
              <button
                onClick={() => setDemoState('normal')}
                className="bg-rose-600 text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md"
              >
                Retry Network Connection
              </button>
            </div>
          )}

          {demoState === 'permission' && (
            <div className="max-w-md mx-auto py-16 text-center space-y-4 bg-amber-50 rounded-3xl p-8 border border-amber-200 text-amber-900 shadow-sm">
              <div className="text-4xl">🔒</div>
              <h3 className="text-xl font-extrabold text-amber-950">Access Restricted (Staff Role)</h3>
              <p className="text-xs text-amber-800">Your account role (Staff / Counter Attendant) does not have permission to modify store financial settings or manage staff.</p>
              <button
                onClick={() => setDemoState('normal')}
                className="bg-amber-600 text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md"
              >
                Return to Counter View
              </button>
            </div>
          )}

          {/* NORMAL TAB VIEWS */}
          {demoState === 'normal' && (
            <>
              {pharmacyTab === 'verification' && (
                <PharmacyVerificationPending
                  pharmacyProfile={pharmacyProfile}
                  onUpdateStatus={(st) => setPharmacyProfile(prev => ({ ...prev, verificationStatus: st }))}
                  onEditProfile={() => navigatePharmacy('profile')}
                  onGoToDashboard={() => navigatePharmacy('dashboard')}
                />
              )}

              {pharmacyTab === 'dashboard' && (
                <PharmacyDashboard
                  pharmacyProfile={pharmacyProfile}
                  medicines={medicines}
                  reservations={reservations}
                  offers={offers}
                  onNavigate={navigatePharmacy}
                  onOpenAddMedicine={() => setIsAddMedicineOpen(true)}
                  onOpenCreateOffer={() => navigatePharmacy('offers')}
                  onToggleStoreStatus={handleToggleStoreStatus}
                  onAcceptReservation={handleAcceptReservation}
                  onRejectReservation={(id) => handleRejectReservationWithReason(id, 'Medicine unavailable')}
                  onQuickStockUpdate={handleQuickStockUpdate}
                />
              )}

              {pharmacyTab === 'inventory' && (
                <InventoryManagement
                  medicines={medicines}
                  onOpenAddMedicine={() => { setEditingMedicine(null); setIsAddMedicineOpen(true); }}
                  onEditMedicine={(med) => { setEditingMedicine(med); setIsAddMedicineOpen(true); }}
                  onUpdateStock={handleQuickStockUpdate}
                  onUpdatePrice={handleQuickPriceUpdate}
                  onCreateOfferForMedicine={(med) => navigatePharmacy('offers')}
                  onToggleAvailability={(id) => handleQuickStockUpdate(id, 0)}
                />
              )}

              {pharmacyTab === 'reservations' && (
                <ReservationsManagement
                  reservations={reservations}
                  onAcceptReservation={handleAcceptReservation}
                  onRejectReservationWithReason={handleRejectReservationWithReason}
                  onMarkReadyForPickup={handleMarkReadyForPickup}
                  onMarkCompleted={handleMarkCompleted}
                />
              )}

              {pharmacyTab === 'offers' && (
                <OffersDiscounts
                  offers={offers}
                  medicines={medicines}
                  onCreateOffer={handleCreateOffer}
                  onToggleOfferStatus={handleToggleOfferStatus}
                />
              )}

              {pharmacyTab === 'profile' && (
                <PharmacyProfile
                  profile={pharmacyProfile}
                  onSaveProfile={(updated) => setPharmacyProfile(prev => ({ ...prev, ...updated }))}
                />
              )}

              {pharmacyTab === 'staff' && (
                <StaffManagement
                  staffList={staffList}
                  onAddStaff={handleAddStaff}
                  onRemoveStaff={handleRemoveStaff}
                  onChangeRole={handleChangeRole}
                />
              )}

              {pharmacyTab === 'reports' && (
                <ReportsPage
                  medicines={medicines}
                  reservations={reservations}
                  offers={offers}
                />
              )}
            </>
          )}

          {/* Add / Edit Medicine Modal */}
          <AddMedicineModal
            isOpen={isAddMedicineOpen}
            onClose={() => { setIsAddMedicineOpen(false); setEditingMedicine(null); }}
            onSaveMedicine={handleSaveMedicine}
            existingMedicines={medicines}
            editingMedicine={editingMedicine}
          />

        </PharmacyLayout>
      )}

    </div>
  );
}

