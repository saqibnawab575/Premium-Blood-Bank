export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type UrgencyLevel = 'Emergency' | 'Urgent' | 'Routine';

export type RequestStatus = 'New' | 'Contacted' | 'Completed' | 'Cancelled';

export interface BloodRequest {
  id: string;
  patientName: string;
  bloodGroup: BloodGroup;
  requiredUnits: number;
  hospitalName: string;
  attendantName: string;
  contactNumber: string;
  cityArea: string;
  requiredDate: string;
  urgency: UrgencyLevel;
  additionalInfo?: string;
  status: RequestStatus;
  createdAt: string;
  notes?: string;
}

export interface DonorRegistration {
  id: string;
  fullName: string;
  contactNumber: string;
  bloodGroup: BloodGroup;
  age: number;
  cityArea: string;
  lastDonationDate?: string;
  preferredContactMethod: 'Call' | 'WhatsApp' | 'SMS';
  additionalInfo?: string;
  consent: boolean;
  status: 'Active' | 'Inactive';
  registeredAt: string;
  internalNotes?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'Unread' | 'Read' | 'Resolved';
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  category: 'Blood Donation' | 'Blood Bank' | 'Team' | 'Facilities' | 'Events';
  order: number;
  createdAt: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  points: string[];
}

export interface WebsiteTheme {
  primaryColor: string; // e.g., #c4122f (crimson red)
  secondaryColor: string; // e.g., #0c2e59 (dark navy)
  accentColor: string; // e.g., #e11d48
  borderRadius: 'rounded-lg' | 'rounded-xl' | 'rounded-2xl';
  buttonStyle: 'gradient' | 'solid' | 'subtle';
  mode: 'light' | 'dark';
}

export interface FounderProfile {
  name: string; // e.g. SAQIB NAWAB
  qualifications: string; // e.g. MLT, ACLS, BLS
  title: string; // e.g. Blood Bank Specialist
  organization: string; // e.g. Blood flow Foundation
  role: string; // e.g. FOUNDER
  bio: string;
  backgroundImage: string;
}

export interface WebsiteContent {
  brandName: string;
  tagline: string;
  heroHeading: string;
  heroSubheading: string;
  heroSupportingText: string;
  heroImage: string;
  address: string;
  phone: string;
  email: string;
  emergencyHotline: string;
  whatsappNumber: string;
  whatsappMessageAvailability: string;
  whatsappMessageRequest: string;
  aboutMission: string;
  aboutVision: string;
  aboutCommitment: string;
  aboutQualitySafety: string;
  aboutDonorCare: string;
  aboutPatientSupport: string;
  aboutHospitalCollab: string;
  availabilityNotice: string;
  emergencyMessage: string;
  footerText: string;
  founder?: FounderProfile;
  socialLinks: {
    facebook: string;
    instagram: string;
    whatsapp: string;
    youtube: string;
    tiktok: string;
  };
  theme: WebsiteTheme;
}

export interface AdminUser {
  email: string;
  name: string;
  role: 'superadmin' | 'admin';
  lastLogin?: string;
}
