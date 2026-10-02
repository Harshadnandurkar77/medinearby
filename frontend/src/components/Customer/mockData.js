// Realistic demo data for MediNearby Customer Portal

export const CURRENT_USER = {
  name: "Harshad",
  fullName: "Harshad Mehta",
  email: "harshad.mehta@example.com",
  phone: "+91 98765 43210",
  location: "Connaught Place, New Delhi",
  notificationPrefs: {
    emailAlerts: true,
    smsAlerts: true,
    restockAlerts: true,
  }
};

export const MOCK_MEDICINES = [
  {
    id: "med-1",
    name: "Paracetamol 500mg",
    genericName: "Paracetamol",
    brandName: "Crocin / Dolo",
    strength: "500mg",
    form: "Tablet (15 Tabs)",
    prescriptionRequired: false,
    pharmacyCount: 8,
    startingPrice: 20,
    category: "Fever & Pain Relief",
    image: "💊",
  },
  {
    id: "med-2",
    name: "Amoxicillin 500mg",
    genericName: "Amoxicillin Trihydrate",
    brandName: "Mox 500",
    strength: "500mg",
    form: "Capsule (10 Caps)",
    prescriptionRequired: true,
    pharmacyCount: 5,
    startingPrice: 85,
    category: "Antibiotics",
    image: "💊",
  },
  {
    id: "med-3",
    name: "Cetirizine 10mg",
    genericName: "Cetirizine Hydrochloride",
    brandName: "Cetzine",
    strength: "10mg",
    form: "Tablet (10 Tabs)",
    prescriptionRequired: false,
    pharmacyCount: 12,
    startingPrice: 35,
    category: "Allergy Relief",
    image: "💊",
  },
  {
    id: "med-4",
    name: "Azithromycin 500mg",
    genericName: "Azithromycin",
    brandName: "Azithral 500",
    strength: "500mg",
    form: "Tablet (3 Tabs)",
    prescriptionRequired: true,
    pharmacyCount: 6,
    startingPrice: 115,
    category: "Antibiotics",
    image: "💊",
  },
  {
    id: "med-5",
    name: "Pantoprazole 40mg",
    genericName: "Pantoprazole Sodium",
    brandName: "Pan 40",
    strength: "40mg",
    form: "Tablet (15 Tabs)",
    prescriptionRequired: false,
    pharmacyCount: 9,
    startingPrice: 95,
    category: "Acidity & Digestion",
    image: "💊",
  },
  {
    id: "med-6",
    name: "Metformin 500mg",
    genericName: "Metformin Hydrochloride",
    brandName: "Glycomet 500",
    strength: "500mg",
    form: "Tablet (20 Tabs)",
    prescriptionRequired: true,
    pharmacyCount: 11,
    startingPrice: 42,
    category: "Diabetes Care",
    image: "💊",
  }
];

export const MOCK_PHARMACIES = [
  {
    id: "pharm-1",
    name: "Apollo Pharmacy — CP Branch",
    verified: true,
    distanceKm: 0.4,
    estimatedWalkMinutes: 5,
    address: "Block A, Inner Circle, Connaught Place, New Delhi",
    phone: "+91 11 2341 8900",
    isOpen: true,
    openingHours: "8:00 AM – 11:00 PM",
    rating: 4.8,
    reviewCount: 320,
    stockStatus: "In stock", // 'In stock' | 'Limited stock' | 'Currently unavailable'
    medicinePrice: 20,
    inventory: [
      { medId: "med-1", name: "Paracetamol 500mg", price: 20, inStock: true, stockLabel: "In stock" },
      { medId: "med-2", name: "Amoxicillin 500mg", price: 85, inStock: true, stockLabel: "In stock" },
      { medId: "med-3", name: "Cetirizine 10mg", price: 32, inStock: true, stockLabel: "In stock" },
      { medId: "med-5", name: "Pantoprazole 40mg", price: 90, inStock: true, stockLabel: "In stock" },
    ]
  },
  {
    id: "pharm-2",
    name: "MedPlus Wellness Pharmacy",
    verified: true,
    distanceKm: 0.9,
    estimatedWalkMinutes: 11,
    address: "Radial Road 3, Outer Circle, Connaught Place, New Delhi",
    phone: "+91 11 4152 7788",
    isOpen: true,
    openingHours: "24 Hours Open",
    rating: 4.6,
    reviewCount: 210,
    stockStatus: "In stock",
    medicinePrice: 22,
    inventory: [
      { medId: "med-1", name: "Paracetamol 500mg", price: 22, inStock: true, stockLabel: "In stock" },
      { medId: "med-2", name: "Amoxicillin 500mg", price: 88, inStock: true, stockLabel: "In stock" },
      { medId: "med-4", name: "Azithromycin 500mg", price: 115, inStock: true, stockLabel: "In stock" },
    ]
  },
  {
    id: "pharm-3",
    name: "Sanjeevani Care Pharmacy",
    verified: true,
    distanceKm: 1.4,
    estimatedWalkMinutes: 18,
    address: "Shop 12, Barakhamba Road, New Delhi",
    phone: "+91 11 2331 4455",
    isOpen: true,
    openingHours: "9:00 AM – 10:00 PM",
    rating: 4.7,
    reviewCount: 145,
    stockStatus: "Limited stock",
    medicinePrice: 19,
    inventory: [
      { medId: "med-1", name: "Paracetamol 500mg", price: 19, inStock: true, stockLabel: "Limited stock" },
      { medId: "med-3", name: "Cetirizine 10mg", price: 30, inStock: true, stockLabel: "In stock" },
    ]
  },
  {
    id: "pharm-4",
    name: "Guardian Life Pharmacy",
    verified: false,
    distanceKm: 2.1,
    estimatedWalkMinutes: 26,
    address: "Janpath Market, Janpath Road, New Delhi",
    phone: "+91 11 2372 1122",
    isOpen: false,
    openingHours: "9:30 AM – 9:00 PM",
    rating: 4.2,
    reviewCount: 88,
    stockStatus: "Currently unavailable",
    medicinePrice: 25,
    inventory: [
      { medId: "med-1", name: "Paracetamol 500mg", price: 25, inStock: false, stockLabel: "Currently unavailable" },
    ]
  }
];

export const MOCK_RESERVATIONS = [
  {
    id: "RES-8942",
    medicineName: "Amoxicillin 500mg",
    strength: "500mg",
    form: "Capsule (10 Caps)",
    pharmacyName: "Apollo Pharmacy — CP Branch",
    pharmacyAddress: "Block A, Inner Circle, Connaught Place, New Delhi",
    pharmacyPhone: "+91 11 2341 8900",
    quantity: 2,
    unitPrice: 85,
    totalPrice: 170,
    pickupDeadline: "Today by 6:00 PM",
    prescriptionRequired: true,
    status: "Confirmed", // 'Pending' | 'Confirmed' | 'Ready for Pickup' | 'Completed' | 'Cancelled'
    statusStep: 2, // 1: Submitted, 2: Confirmed, 3: Ready, 4: Completed
    createdAt: "Today at 10:15 AM",
  },
  {
    id: "RES-7621",
    medicineName: "Paracetamol 500mg",
    strength: "500mg",
    form: "Tablet (15 Tabs)",
    pharmacyName: "MedPlus Wellness Pharmacy",
    pharmacyAddress: "Radial Road 3, Outer Circle, Connaught Place, New Delhi",
    pharmacyPhone: "+91 11 4152 7788",
    quantity: 1,
    unitPrice: 22,
    totalPrice: 22,
    pickupDeadline: "Today by 8:00 PM",
    prescriptionRequired: false,
    status: "Ready for Pickup",
    statusStep: 3,
    createdAt: "Today at 9:30 AM",
  },
  {
    id: "RES-6109",
    medicineName: "Cetirizine 10mg",
    strength: "10mg",
    form: "Tablet (10 Tabs)",
    pharmacyName: "Sanjeevani Care Pharmacy",
    pharmacyAddress: "Shop 12, Barakhamba Road, New Delhi",
    pharmacyPhone: "+91 11 2331 4455",
    quantity: 1,
    unitPrice: 30,
    totalPrice: 30,
    pickupDeadline: "Completed Yesterday",
    prescriptionRequired: false,
    status: "Completed",
    statusStep: 4,
    createdAt: "Sep 9, 2026",
  }
];

export const MOCK_RESTOCK_ALERTS = [
  { id: "alert-1", medicineName: "Azithromycin 500mg", pharmacyName: "MedPlus Wellness Pharmacy", status: "Restocked today", distance: "0.9 km" },
  { id: "alert-2", medicineName: "Pantoprazole 40mg", pharmacyName: "Apollo Pharmacy — CP Branch", status: "Restocked 2h ago", distance: "0.4 km" },
  { id: "alert-3", medicineName: "Glycomet 500mg", pharmacyName: "Sanjeevani Care Pharmacy", status: "Expected tomorrow", distance: "1.4 km" }
];

export const RECENT_SEARCHES = [
  "Paracetamol 500mg",
  "Dolo 650",
  "Azithromycin",
  "Cetzine 10mg",
  "BP Monitor"
];
