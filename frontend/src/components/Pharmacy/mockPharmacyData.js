// Static Demo Data for MediNearby Pharmacy Owner Portal

export const INITIAL_PHARMACY_PROFILE = {
  id: 'PHARM-89421',
  name: 'Jan Aushadhi Kendra & Medical Store',
  logo: null,
  ownerName: 'Ramesh Chandra Sharma',
  phone: '+91 98765 43210',
  whatsapp: '+91 98765 43210',
  address: 'Shop No. 4, Main Market Road',
  village: 'Rampur',
  district: 'Sitapur',
  state: 'Uttar Pradesh',
  pincode: '261001',
  landmark: 'Near Old Bus Stand & Primary Health Centre',
  openingTime: '08:00 AM',
  closingTime: '09:30 PM',
  holidays: 'Open 7 Days (Emergency Service Available)',
  verificationStatus: 'Under Review', // 'Under Review' | 'Approved' | 'More Information Required' | 'Rejected'
  submittedDate: '10 Sept 2026',
  licenseNumber: 'UP/STP/2024/DRUG-4412',
  isOpen: true,
  services: [
    'Emergency 24/7 Supply',
    'Prescription Verification',
    'Generic Medicines Available',
    'Government Rate Subsidy',
    'Home Delivery within 3 km'
  ]
};

export const INITIAL_MEDICINES = [
  {
    id: 'MED-101',
    name: 'Amoxicillin 500mg',
    genericName: 'Amoxicillin Trihydrate',
    brandName: 'Mox 500',
    category: 'Antibiotic',
    strength: '500 mg',
    dosageForm: 'Capsule',
    batchNumber: 'AMX-2026-04',
    quantity: 140,
    minThreshold: 30,
    sellingPrice: 72,
    discount: 10, // percent
    expiryDate: '2027-08-15',
    prescriptionRequired: true,
    availabilityStatus: 'In Stock', // 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Expiring Soon' | 'Expired'
    lastUpdated: 'Today, 09:30 AM',
    imageUrl: null
  },
  {
    id: 'MED-102',
    name: 'Paracetamol 650mg',
    genericName: 'Paracetamol',
    brandName: 'Dolo 650',
    category: 'Analgesic / Antipyretic',
    strength: '650 mg',
    dosageForm: 'Tablet',
    batchNumber: 'PCM-2026-09',
    quantity: 8,
    minThreshold: 25,
    sellingPrice: 32,
    discount: 0,
    expiryDate: '2027-11-20',
    prescriptionRequired: false,
    availabilityStatus: 'Low Stock',
    lastUpdated: 'Yesterday, 04:15 PM',
    imageUrl: null
  },
  {
    id: 'MED-103',
    name: 'Cetirizine 10mg',
    genericName: 'Cetirizine Hydrochloride',
    brandName: 'Cetzine',
    category: 'Antihistamine',
    strength: '10 mg',
    dosageForm: 'Tablet',
    batchNumber: 'CTZ-2025-12',
    quantity: 0,
    minThreshold: 20,
    sellingPrice: 18,
    discount: 5,
    expiryDate: '2027-04-10',
    prescriptionRequired: false,
    availabilityStatus: 'Out of Stock',
    lastUpdated: '3 days ago',
    imageUrl: null
  },
  {
    id: 'MED-104',
    name: 'ORS Electrolyte Powder (21.8g)',
    genericName: 'Oral Rehydration Salts',
    brandName: 'Electral',
    category: 'Rehydration Therapy',
    strength: '21.8 g',
    dosageForm: 'Sachet',
    batchNumber: 'ORS-2026-01',
    quantity: 95,
    minThreshold: 40,
    sellingPrice: 22,
    discount: 0,
    expiryDate: '2026-10-15',
    prescriptionRequired: false,
    availabilityStatus: 'Expiring Soon',
    lastUpdated: 'Today, 08:00 AM',
    imageUrl: null
  },
  {
    id: 'MED-105',
    name: 'Metformin 500mg',
    genericName: 'Metformin Hydrochloride',
    brandName: 'Glycomet 500',
    category: 'Anti-Diabetic',
    strength: '500 mg',
    dosageForm: 'Tablet',
    batchNumber: 'MET-2026-07',
    quantity: 210,
    minThreshold: 50,
    sellingPrice: 48,
    discount: 15,
    expiryDate: '2028-02-28',
    prescriptionRequired: true,
    availabilityStatus: 'In Stock',
    lastUpdated: '2 days ago',
    imageUrl: null
  },
  {
    id: 'MED-106',
    name: 'Azithromycin 500mg',
    genericName: 'Azithromycin',
    brandName: 'Azee 500',
    category: 'Antibiotic',
    strength: '500 mg',
    dosageForm: 'Tablet',
    batchNumber: 'AZI-2024-02',
    quantity: 15,
    minThreshold: 20,
    sellingPrice: 118,
    discount: 10,
    expiryDate: '2026-06-01',
    prescriptionRequired: true,
    availabilityStatus: 'Expired',
    lastUpdated: '1 week ago',
    imageUrl: null
  },
  {
    id: 'MED-107',
    name: 'Pantoprazole 40mg',
    genericName: 'Pantoprazole Sodium',
    brandName: 'Pan 40',
    category: 'Antacid / PPI',
    strength: '40 mg',
    dosageForm: 'Tablet',
    batchNumber: 'PAN-2026-11',
    quantity: 6,
    minThreshold: 30,
    sellingPrice: 95,
    discount: 12,
    expiryDate: '2027-09-30',
    prescriptionRequired: false,
    availabilityStatus: 'Low Stock',
    lastUpdated: 'Today, 10:15 AM',
    imageUrl: null
  },
  {
    id: 'MED-108',
    name: 'Cough Syrup (100ml)',
    genericName: 'Dextromethorphan + Chlorpheniramine',
    brandName: 'Benadryl DR',
    category: 'Cough & Cold',
    strength: '100 ml',
    dosageForm: 'Syrup',
    batchNumber: 'CSY-2026-03',
    quantity: 64,
    minThreshold: 15,
    sellingPrice: 110,
    discount: 8,
    expiryDate: '2027-07-18',
    prescriptionRequired: false,
    availabilityStatus: 'In Stock',
    lastUpdated: 'Yesterday, 11:00 AM',
    imageUrl: null
  }
];

export const INITIAL_RESERVATIONS = [
  {
    id: 'RES-8821',
    customerName: 'Sunita Devi',
    customerPhone: '+91 94123 88901',
    village: 'Rampur Village',
    medicineId: 'MED-101',
    medicineName: 'Amoxicillin 500mg',
    quantity: 2,
    unitPrice: 72,
    discountAmount: 7.2,
    finalPrice: 129.6,
    requestDate: '11 Sept 2026, 09:15 AM',
    pickupDeadline: '11 Sept 2026, 06:00 PM',
    prescriptionStatus: 'Uploaded & Verified',
    status: 'Pending', // 'Pending' | 'Confirmed' | 'Ready for Pickup' | 'Completed' | 'Rejected' | 'Cancelled' | 'Expired'
    rejectReason: null
  },
  {
    id: 'RES-8820',
    customerName: 'Mohan Lal Verma',
    customerPhone: '+91 98390 12345',
    village: 'Kalyanpur',
    medicineId: 'MED-105',
    medicineName: 'Metformin 500mg',
    quantity: 3,
    unitPrice: 48,
    discountAmount: 7.2,
    finalPrice: 122.4,
    requestDate: '11 Sept 2026, 08:30 AM',
    pickupDeadline: '11 Sept 2026, 04:00 PM',
    prescriptionStatus: 'Uploaded',
    status: 'Confirmed',
    rejectReason: null
  },
  {
    id: 'RES-8819',
    customerName: 'Pooja Kashyap',
    customerPhone: '+91 97211 44556',
    village: 'Bishanpur',
    medicineId: 'MED-102',
    medicineName: 'Paracetamol 650mg',
    quantity: 1,
    unitPrice: 32,
    discountAmount: 0,
    finalPrice: 32,
    requestDate: '10 Sept 2026, 05:40 PM',
    pickupDeadline: '11 Sept 2026, 12:00 PM',
    prescriptionStatus: 'Not Required',
    status: 'Ready for Pickup',
    rejectReason: null
  },
  {
    id: 'RES-8815',
    customerName: 'Vikram Singh',
    customerPhone: '+91 99182 33445',
    village: 'Rampur Market',
    medicineId: 'MED-108',
    medicineName: 'Cough Syrup (100ml)',
    quantity: 1,
    unitPrice: 110,
    discountAmount: 8.8,
    finalPrice: 101.2,
    requestDate: '10 Sept 2026, 02:10 PM',
    pickupDeadline: '10 Sept 2026, 08:00 PM',
    prescriptionStatus: 'Not Required',
    status: 'Completed',
    rejectReason: null
  },
  {
    id: 'RES-8812',
    customerName: 'Anil Kumar',
    customerPhone: '+91 96510 99887',
    village: 'Mahadewa',
    medicineId: 'MED-103',
    medicineName: 'Cetirizine 10mg',
    quantity: 5,
    unitPrice: 18,
    discountAmount: 0.9,
    finalPrice: 85.5,
    requestDate: '09 Sept 2026, 11:20 AM',
    pickupDeadline: '09 Sept 2026, 07:00 PM',
    prescriptionStatus: 'Not Required',
    status: 'Rejected',
    rejectReason: 'Medicine unavailable (Out of stock)'
  }
];

export const INITIAL_OFFERS = [
  {
    id: 'OFF-301',
    title: 'Monsoon Relief Offer',
    medicineId: 'MED-101',
    medicineName: 'Amoxicillin 500mg',
    discountType: 'Percentage', // 'Percentage' | 'Fixed Amount'
    discountValue: 10,
    minQuantity: 2,
    startDate: '2026-09-01',
    endDate: '2026-09-30',
    terms: 'Valid on purchase of 2 or more strips. Show coupon code at counter.',
    status: 'Active' // 'Active' | 'Scheduled' | 'Paused' | 'Expired'
  },
  {
    id: 'OFF-302',
    title: 'Diabetes Essential Discount',
    medicineId: 'MED-105',
    medicineName: 'Metformin 500mg',
    discountType: 'Percentage',
    discountValue: 15,
    minQuantity: 3,
    startDate: '2026-09-05',
    endDate: '2026-10-15',
    terms: 'Special rural health subsidy rate for chronic diabetes care.',
    status: 'Active'
  },
  {
    id: 'OFF-303',
    title: 'Festival Season Wellness Fest',
    medicineId: 'MED-108',
    medicineName: 'Cough Syrup (100ml)',
    discountType: 'Fixed Amount',
    discountValue: 15,
    minQuantity: 1,
    startDate: '2026-10-01',
    endDate: '2026-10-31',
    terms: 'Applicable for all syrup formulations.',
    status: 'Scheduled'
  },
  {
    id: 'OFF-304',
    title: 'Fever Care Combo Deal',
    medicineId: 'MED-102',
    medicineName: 'Paracetamol 650mg',
    discountType: 'Percentage',
    discountValue: 20,
    minQuantity: 5,
    startDate: '2026-08-01',
    endDate: '2026-08-31',
    terms: 'Offer expired last month.',
    status: 'Expired'
  }
];

export const INITIAL_STAFF = [
  {
    id: 'STF-01',
    name: 'Ramesh Chandra Sharma',
    role: 'Owner', // 'Owner' | 'Manager' | 'Staff' | 'Accountant'
    phone: '+91 98765 43210',
    email: 'ramesh.sharma@medinearby.in',
    joinedDate: '15 Jan 2024',
    lastActive: 'Active now',
    status: 'Active'
  },
  {
    id: 'STF-02',
    name: 'Suresh Kumar Gupta',
    role: 'Manager',
    phone: '+91 94150 11223',
    email: 'suresh.gupta@medinearby.in',
    joinedDate: '01 Mar 2024',
    lastActive: '20 mins ago',
    status: 'Active'
  },
  {
    id: 'STF-03',
    name: 'Priyanka Yadav',
    role: 'Staff',
    phone: '+91 97920 33445',
    email: 'priyanka.yadav@medinearby.in',
    joinedDate: '10 Aug 2025',
    lastActive: '2 hours ago',
    status: 'Active'
  },
  {
    id: 'STF-04',
    name: 'Vijay Prakash Rastogi',
    role: 'Accountant',
    phone: '+91 93350 77889',
    email: 'vijay.rastogi@medinearby.in',
    joinedDate: '01 Nov 2025',
    lastActive: 'Yesterday',
    status: 'Active'
  }
];

export const ROLE_PERMISSIONS = {
  Owner: {
    badgeColor: 'bg-purple-100 text-purple-700 border-purple-200',
    description: 'Full administrative access: Manage pharmacy profile, staff, inventory, prices, offers, reservations, financial reports, and verification settings.',
    permissions: ['Full Access', 'Manage Staff', 'Edit Profile', 'Financial Reports', 'Approve Orders']
  },
  Manager: {
    badgeColor: 'bg-blue-100 text-blue-700 border-blue-200',
    description: 'Operational control: Add/edit medicines, update stock and selling prices, create offers, accept or reject reservations.',
    permissions: ['Manage Inventory', 'Update Prices', 'Process Reservations', 'Manage Offers']
  },
  Staff: {
    badgeColor: 'bg-teal-100 text-teal-700 border-teal-200',
    description: 'Counter & Pickup handling: Search medicines, view stock levels, mark orders ready for pickup, complete customer reservations.',
    permissions: ['View Inventory', 'Process Pickup', 'Update Order Status']
  },
  Accountant: {
    badgeColor: 'bg-amber-100 text-amber-700 border-amber-200',
    description: 'Finance & Audit access: Read-only access to sales reports, reservation transaction logs, and inventory value summary.',
    permissions: ['View Sales Reports', 'Audit Inventory Value', 'Export Analytics']
  }
};

export const REPORT_ANALYTICS = {
  monthlyReservations: 124,
  completionRate: '94.2%',
  totalRevenueEstimate: '₹ 48,250',
  mostRequestedMedicines: [
    { name: 'Paracetamol 650mg', requests: 48, stock: 'Low Stock' },
    { name: 'Amoxicillin 500mg', requests: 36, stock: 'In Stock' },
    { name: 'ORS Electrolyte Sachet', requests: 29, stock: 'Expiring Soon' },
    { name: 'Metformin 500mg', requests: 22, stock: 'In Stock' },
    { name: 'Pantoprazole 40mg', requests: 18, stock: 'Low Stock' }
  ],
  inventoryBreakdown: {
    inStock: 184,
    lowStock: 6,
    outOfStock: 2,
    expiringSoon: 4,
    expired: 2
  }
};
