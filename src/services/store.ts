import {
  BloodRequest,
  DonorRegistration,
  ContactMessage,
  GalleryItem,
  ServiceItem,
  WebsiteContent,
  AdminUser,
} from '../types';
import { AuthService } from './auth';

/**
 * CRITICAL ARCHITECTURE NOTE:
 * Frontend demo authentication and client-side data management only.
 * Runs completely locally in localStorage without any backend, external database, or Firebase.
 */

// Storage Keys requested specifically
export const STORAGE_KEYS = {
  REQUESTS: 'premium_blood_requests',
  DONORS: 'premium_donors',
  MESSAGES: 'premium_messages',
  GALLERY: 'premium_gallery',
  SERVICES: 'premium_services',
  CONTENT: 'premium_content',
  THEME: 'premium_theme',
  SETTINGS: 'premium_settings',
  ADMIN_SESSION: 'premium_admin_session',
  ADMIN_REGISTRY: 'premium_admins_registry',
};

// Initial Real Medical Services (No fake medical claims, factual clinical services)
const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Blood Donation',
    shortDescription: 'Voluntary whole blood donation with strict clinical donor health screening and sterile collection.',
    fullDescription: 'Our voluntary blood donation drives and clinical donor suites provide a comfortable, sterile, and monitored environment for compassionate donors. Each unit is collected using single-use closed vacuum systems.',
    iconName: 'HeartHandshake',
    points: [
      'Comprehensive donor health screening and hemoglobin test prior to phlebotomy',
      'Single-use sterile closed collection bags with CPDA anticoagulant',
      'Continuous medical monitoring during and post donation',
      'Post-donation refreshments and vital recovery assessment',
    ],
  },
  {
    id: 'srv-2',
    title: 'Blood Screening',
    shortDescription: 'Mandatory multi-pathogen screening conforming to national transfusion safety protocols.',
    fullDescription: 'Every single unit of donated blood undergoes exhaustive laboratory screening against transfusion-transmissible infections including HIV-I/II, Hepatitis B (HBsAg), Hepatitis C (Anti-HCV), Syphilis (VDRL), and Malaria before issuance.',
    iconName: 'ShieldCheck',
    points: [
      'High-sensitivity ELISA and automated screening methodologies',
      'Zero-tolerance protocol for reactive or equivocal units',
      'Complete traceability and batch quarantine until cleared',
      'Strict cold-chain integrity maintained during all testing phases',
    ],
  },
  {
    id: 'srv-3',
    title: 'Blood Grouping',
    shortDescription: 'Dual forward (cell) and reverse (serum) grouping for absolute ABO/Rh compatibility.',
    fullDescription: 'We perform both forward and reverse grouping using monoclonal antisera and reagent red cells. In cases of discrepancy, Rh phenotyping and weak D testing are systematically carried out.',
    iconName: 'TestTube2',
    points: [
      'Forward typing for ABO and Rh(D) antigens',
      'Reverse typing to verify corresponding isoagglutinins in serum',
      'Confirmation of weak D variants where indicated',
      'Archived records for repeat clinical verification',
    ],
  },
  {
    id: 'srv-4',
    title: 'Crossmatching',
    shortDescription: 'Major and minor crossmatching utilizing Coombs gel card technology for patient safety.',
    fullDescription: 'Before any blood or component is issued for transfusion, direct clinical crossmatching is performed against recipient serum to detect unexpected antibodies and prevent adverse hemolytic transfusion reactions.',
    iconName: 'Microscope',
    points: [
      'Direct Antiglobulin (Coombs) testing and Indirect Antiglobulin testing',
      'Gel card and column agglutination methodology',
      'Rapid turnaround for acute clinical emergencies',
      'Pre-transfusion compatibility documentation issued with each unit',
    ],
  },
  {
    id: 'srv-5',
    title: 'Component Preparation',
    shortDescription: 'Centrifugation into Packed Red Cells, Fresh Frozen Plasma, and Platelet Concentrates.',
    fullDescription: 'Using heavy refrigerated centrifuges, single whole blood donations are separated into life-saving therapeutic components. This allows one donation to save up to 3 individual lives based on specific clinical needs.',
    iconName: 'Layers',
    points: [
      'Packed Red Blood Cells (PRBC) for anemia and surgical trauma cases',
      'Fresh Frozen Plasma (FFP) preserved at -30°C for coagulopathies',
      'Platelet Concentrates maintained under gentle agitation at 22°C',
      'Cryoprecipitate for factor deficiencies and acute hemorrhages',
    ],
  },
  {
    id: 'srv-6',
    title: 'Blood Issuance',
    shortDescription: 'Controlled issuance with temperature-regulated cold boxes and chain-of-custody protocols.',
    fullDescription: 'Units are issued with verified hospital requisition forms, patient identifiers, and compatibility certificates in validated cold-transport containers ensuring 2°C–6°C transport standards.',
    iconName: 'Truck',
    points: [
      'Double-check identity verification by two licensed technologists',
      'Calibrated thermal packaging with temperature log monitoring',
      'Complete documentation matching attendant, patient, and clinician',
      'Immediate emergency dispatch for critical trauma requirements',
    ],
  },
  {
    id: 'srv-7',
    title: 'Emergency Blood Services',
    shortDescription: 'Round-the-clock emergency desk and rapid response for urgent surgeries and trauma.',
    fullDescription: 'Our laboratory and blood bank operations remain active 24 hours a day, 365 days a year to cater to obstetric emergencies, road traffic accidents, intensive care, and surgical transfusions.',
    iconName: 'AlertCircle',
    points: [
      'Dedicated direct emergency phone hotline: 03125252240',
      'Emergency crossmatching protocol for acute resuscitation',
      'Standby technicians on duty throughout night shifts',
      'Direct liaison with local hospital ICUs and operation theatres',
    ],
  },
  {
    id: 'srv-8',
    title: 'Hospital Blood Supply',
    shortDescription: 'Structured blood supply partnerships with hospitals and medical complexes in Rawalpindi.',
    fullDescription: 'We provide institutional blood supply coordination, scheduled hospital replenishment, and standing emergency reserves for affiliated hospitals, surgical centers, and maternity homes.',
    iconName: 'Building2',
    points: [
      'Scheduled regular component dispatch and emergency backup',
      'Dedicated institutional relationship coordinator',
      'Compliance with healthcare regulatory transfusion standards',
      'Coordinated emergency mutual-aid reserves',
    ],
  },
];

// Initial Realistic Gallery Items
const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Blood Transfusion Laboratory',
    caption: 'Automated blood testing stations, centrifuges, and sterile analysis suites at Premium Medical Complex.',
    imageUrl: '/images/lab_facility.jpg',
    category: 'Facilities',
    order: 1,
    createdAt: '2026-09-01T10:00:00Z',
  },
  {
    id: 'gal-2',
    title: 'Voluntary Donor Care Suite',
    caption: 'Comfortable, sanitized phlebotomy stations where compassionate voluntary donors contribute life-saving blood.',
    imageUrl: '/images/donor_care.jpg',
    category: 'Blood Donation',
    order: 2,
    createdAt: '2026-09-05T14:30:00Z',
  },
  {
    id: 'gal-3',
    title: 'Clinical Cold-Chain Management',
    caption: 'Continuous 2°C–6°C monitored blood storage refrigerators with digital logging and backup power.',
    imageUrl: '/images/blood_storage.jpg',
    category: 'Facilities',
    order: 3,
    createdAt: '2026-09-10T09:15:00Z',
  },
  {
    id: 'gal-4',
    title: 'Community Voluntary Donation Camp',
    caption: 'Awareness and voluntary donor mobilization organized in collaboration with local community centers.',
    imageUrl: '/images/donation_camp.jpg',
    category: 'Events',
    order: 4,
    createdAt: '2026-09-15T11:00:00Z',
  },
  {
    id: 'gal-5',
    title: 'Crossmatching & Component Separation',
    caption: 'Technologists executing precise gel-card crossmatching before releasing units to surgical suites.',
    imageUrl: '/images/hero.jpg',
    category: 'Blood Bank',
    order: 5,
    createdAt: '2026-09-20T16:45:00Z',
  },
];

// Initial Website Content
export const DEFAULT_CONTENT: WebsiteContent = {
  brandName: 'Premium Blood Bank',
  tagline: 'Donate Blood, Save 3 Lives',
  heroHeading: 'Premium Blood Bank',
  heroSubheading: 'Donate Blood, Save 3 Lives',
  heroSupportingText:
    'We are committed to providing safe, reliable and timely blood bank services to patients, donors and healthcare facilities.',
  heroImage: '/images/hero.jpg',
  address:
    'Basement of Premium Medical Complex, Javed Lane, Peshawar Road, Saddar, Rawalpindi, 44000',
  phone: '03125252240',
  email: 'premiumbloodbank@gmail.com',
  emergencyHotline: '03125252240',
  whatsappNumber: '03125252240',
  whatsappMessageAvailability:
    'Hello Premium Blood Bank, I would like to ask about blood availability.',
  whatsappMessageRequest:
    'Hello Premium Blood Bank, I need information regarding a blood request.',
  aboutMission:
    'To bridge the gap between compassionate voluntary blood donors and vulnerable patients by maintaining uncompromising standards of clinical safety, rapid emergency responsiveness, and dignified healthcare service.',
  aboutVision:
    'To be recognized as the premier regional center of excellence for transfusion medicine, ensuring that no patient faces treatment delays due to lack of safe, tested blood components.',
  aboutCommitment:
    'We adhere to rigorous protocols for donor deferral, sterile phlebotomy, multi-pathogen screening, and cold-chain compliance. Our dedicated clinical staff stands ready 24/7 to safeguard lives.',
  aboutQualitySafety:
    'Every unit processed through our laboratory undergoes standardized forward and reverse grouping, high-sensitivity infectious marker screening, and direct crossmatching prior to issuance.',
  aboutDonorCare:
    'Our donors are our greatest partners in saving lives. We provide confidential health counseling, hygienic donor lounges, hemoglobin testing, and post-donation monitoring to ensure donor wellbeing.',
  aboutPatientSupport:
    'Our patient coordination team works tirelessly with attendants, families, and attending physicians to facilitate urgent compatibility testing and expedited dispatch.',
  aboutHospitalCollab:
    'We maintain active clinical communication with public and private healthcare facilities in Rawalpindi, facilitating scheduled component requisitions and emergency trauma support.',
  availabilityNotice:
    'For current availability, please contact Premium Blood Bank directly.',
  emergencyMessage:
    'In critical trauma or urgent surgical cases, immediately call our 24/7 hotline at 03125252240 for rapid clinical coordination.',
  footerText:
    'Premium Blood Bank is dedicated to saving lives through voluntary donation, stringent screening, and 24/7 clinical blood services. Located in the Basement of Premium Medical Complex, Saddar, Rawalpindi.',
  socialLinks: {
    facebook: 'https://facebook.com/premiumbloodbank',
    instagram: 'https://instagram.com/premiumbloodbank',
    whatsapp: 'https://wa.me/923125252240',
    youtube: '',
    tiktok: '',
  },
  founder: {
    name: 'SAQIB NAWAB',
    qualifications: 'MLT, ACLS, BLS',
    title: 'Blood Bank Specialist',
    organization: 'Blood flow Foundation',
    role: 'FOUNDER',
    bio: 'Dedicated to clinical excellence in blood banking, voluntary donor motivation, and emergency cold-chain transfusion across Rawalpindi & Islamabad.',
    backgroundImage: '/images/hero.jpg',
  },
  theme: {
    primaryColor: '#c4122f',
    secondaryColor: '#0c2e59',
    accentColor: '#e11d48',
    borderRadius: 'rounded-xl',
    buttonStyle: 'gradient',
    mode: 'light',
  },
};

// Initial Data for Blood Requests (Empty - No demo data)
const INITIAL_REQUESTS: BloodRequest[] = [];

// Initial Data for Donors (Empty - No demo data)
const INITIAL_DONORS: DonorRegistration[] = [];

// Initial Data for Contact Messages (Empty - No demo data)
const INITIAL_MESSAGES: ContactMessage[] = [];

// Reusable Helper Functions
const getItem = <T>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading key ${key} from localStorage:`, err);
    return fallback;
  }
};

const setItem = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent('pbb_store_update', { detail: { key } }));
  } catch (err) {
    console.error(`Error saving key ${key} to localStorage:`, err);
  }
};

export const BloodBankStore = {
  // Website Content
  getContent(): WebsiteContent {
    const saved = getItem<WebsiteContent>(STORAGE_KEYS.CONTENT, DEFAULT_CONTENT);
    if (!saved.founder) {
      saved.founder = DEFAULT_CONTENT.founder;
      setItem(STORAGE_KEYS.CONTENT, saved);
    }
    return saved;
  },
  updateContent(updated: Partial<WebsiteContent>): WebsiteContent {
    const current = this.getContent();
    const merged = { ...current, ...updated };
    setItem(STORAGE_KEYS.CONTENT, merged);
    return merged;
  },

  // Services
  getServices(): ServiceItem[] {
    return getItem<ServiceItem[]>(STORAGE_KEYS.SERVICES, DEFAULT_SERVICES);
  },
  updateService(service: ServiceItem): void {
    const services = this.getServices();
    const idx = services.findIndex((s) => s.id === service.id);
    if (idx >= 0) {
      services[idx] = service;
    } else {
      services.push(service);
    }
    setItem(STORAGE_KEYS.SERVICES, services);
  },
  addService(service: Omit<ServiceItem, 'id'>): ServiceItem {
    const services = this.getServices();
    const newService: ServiceItem = {
      ...service,
      id: `srv-${Date.now()}`,
    };
    services.push(newService);
    setItem(STORAGE_KEYS.SERVICES, services);
    return newService;
  },
  deleteService(serviceId: string): void {
    const services = this.getServices().filter((s) => s.id !== serviceId);
    setItem(STORAGE_KEYS.SERVICES, services);
  },

  // Gallery
  getGallery(): GalleryItem[] {
    return getItem<GalleryItem[]>(STORAGE_KEYS.GALLERY, DEFAULT_GALLERY);
  },
  addGalleryItem(item: Omit<GalleryItem, 'id' | 'createdAt'>): GalleryItem {
    const current = this.getGallery();
    const newItem: GalleryItem = {
      ...item,
      id: `gal-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [newItem, ...current];
    setItem(STORAGE_KEYS.GALLERY, updated);
    return newItem;
  },
  updateGalleryItem(idOrItem: string | GalleryItem, partial?: Partial<GalleryItem>): void {
    const current = this.getGallery();
    const id = typeof idOrItem === 'string' ? idOrItem : idOrItem.id;
    const patch = typeof idOrItem === 'string' ? partial || {} : idOrItem;
    const idx = current.findIndex((g) => g.id === id);
    if (idx >= 0) {
      current[idx] = { ...current[idx], ...patch };
      setItem(STORAGE_KEYS.GALLERY, current);
    }
  },
  deleteGalleryItem(id: string): void {
    const updated = this.getGallery().filter((g) => g.id !== id);
    setItem(STORAGE_KEYS.GALLERY, updated);
  },

  // Blood Requests
  getRequests(): BloodRequest[] {
    const list = getItem<BloodRequest[]>(STORAGE_KEYS.REQUESTS, INITIAL_REQUESTS);
    const cleaned = list.filter((r) => r.id !== 'req-101' && r.id !== 'req-102');
    if (cleaned.length !== list.length) {
      setItem(STORAGE_KEYS.REQUESTS, cleaned);
    }
    return cleaned;
  },
  addRequest(
    data: Omit<BloodRequest, 'id' | 'status' | 'createdAt'>
  ): BloodRequest {
    const requests = this.getRequests();
    const newReq: BloodRequest = {
      ...data,
      id: `req-${Date.now().toString().slice(-4)}`,
      status: 'New',
      createdAt: new Date().toISOString(),
    };
    setItem(STORAGE_KEYS.REQUESTS, [newReq, ...requests]);
    return newReq;
  },
  updateRequestStatus(id: string, status: BloodRequest['status'], notes?: string): void {
    const requests = this.getRequests();
    const idx = requests.findIndex((r) => r.id === id);
    if (idx >= 0) {
      requests[idx].status = status;
      if (notes !== undefined) requests[idx].notes = notes;
      setItem(STORAGE_KEYS.REQUESTS, requests);
    }
  },
  deleteRequest(id: string): void {
    const updated = this.getRequests().filter((r) => r.id !== id);
    setItem(STORAGE_KEYS.REQUESTS, updated);
  },

  // Donor Registrations
  getDonors(): DonorRegistration[] {
    const list = getItem<DonorRegistration[]>(STORAGE_KEYS.DONORS, INITIAL_DONORS);
    const cleaned = list.filter((d) => d.id !== 'dnr-201' && d.id !== 'dnr-202');
    if (cleaned.length !== list.length) {
      setItem(STORAGE_KEYS.DONORS, cleaned);
    }
    return cleaned;
  },
  addDonor(
    data: Omit<DonorRegistration, 'id' | 'status' | 'registeredAt'>
  ): DonorRegistration {
    const donors = this.getDonors();
    const newDonor: DonorRegistration = {
      ...data,
      id: `dnr-${Date.now().toString().slice(-4)}`,
      status: 'Active',
      registeredAt: new Date().toISOString(),
    };
    setItem(STORAGE_KEYS.DONORS, [newDonor, ...donors]);
    return newDonor;
  },
  updateDonorStatus(id: string, status: 'Active' | 'Inactive', notes?: string): void {
    const donors = this.getDonors();
    const idx = donors.findIndex((d) => d.id === id);
    if (idx >= 0) {
      donors[idx].status = status;
      if (notes !== undefined) donors[idx].internalNotes = notes;
      setItem(STORAGE_KEYS.DONORS, donors);
    }
  },
  deleteDonor(id: string): void {
    const updated = this.getDonors().filter((d) => d.id !== id);
    setItem(STORAGE_KEYS.DONORS, updated);
  },

  // Contact Messages
  getMessages(): ContactMessage[] {
    const list = getItem<ContactMessage[]>(STORAGE_KEYS.MESSAGES, INITIAL_MESSAGES);
    const cleaned = list.filter((m) => m.id !== 'msg-1');
    if (cleaned.length !== list.length) {
      setItem(STORAGE_KEYS.MESSAGES, cleaned);
    }
    return cleaned;
  },
  addMessage(data: Omit<ContactMessage, 'id' | 'status' | 'createdAt'>): ContactMessage {
    const current = this.getMessages();
    const newMsg: ContactMessage = {
      ...data,
      id: `msg-${Date.now().toString().slice(-4)}`,
      status: 'Unread',
      createdAt: new Date().toISOString(),
    };
    setItem(STORAGE_KEYS.MESSAGES, [newMsg, ...current]);
    return newMsg;
  },
  updateMessageStatus(id: string, status: ContactMessage['status']): void {
    const current = this.getMessages();
    const idx = current.findIndex((m) => m.id === id);
    if (idx >= 0) {
      current[idx].status = status;
      setItem(STORAGE_KEYS.MESSAGES, current);
    }
  },
  deleteMessage(id: string): void {
    const updated = this.getMessages().filter((m) => m.id !== id);
    setItem(STORAGE_KEYS.MESSAGES, updated);
  },

  // Ephemeral In-Memory Admin Auth Session
  getAdminSession(): AdminUser | null {
    return AuthService.getCurrentSession();
  },
  setAdminSession(user: AdminUser | null): void {
    if (!user) {
      AuthService.logout();
    }
  },

  // Cryptographic Credential Verification via Web Crypto
  async loginAdmin(
    usernameOrEmail: string,
    passwordInput: string
  ): Promise<{ success: boolean; user?: AdminUser; error?: string }> {
    return AuthService.verifyCredentials(usernameOrEmail, passwordInput);
  },

  logoutAdmin(): void {
    AuthService.logout();
  },

  // Purge submitted activity records without injecting any demo data
  clearAllRecords(): void {
    setItem(STORAGE_KEYS.REQUESTS, []);
    setItem(STORAGE_KEYS.DONORS, []);
    setItem(STORAGE_KEYS.MESSAGES, []);
  },

  resetAllToFactory(): void {
    localStorage.removeItem(STORAGE_KEYS.REQUESTS);
    localStorage.removeItem(STORAGE_KEYS.DONORS);
    localStorage.removeItem(STORAGE_KEYS.MESSAGES);
    localStorage.removeItem(STORAGE_KEYS.GALLERY);
    localStorage.removeItem(STORAGE_KEYS.SERVICES);
    localStorage.removeItem(STORAGE_KEYS.CONTENT);
    localStorage.removeItem(STORAGE_KEYS.THEME);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    window.location.reload();
  },
};
