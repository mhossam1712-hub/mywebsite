// Core Domain Types for Ophthalmology Clinic

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  qualification: string;
  experience: number;
  image: string;
  bio: string;
  languages: string[];
}

export interface Service {
  id: string;
  slug?: string;
  name: string;
  nameAr?: string;
  description: string;
  descriptionAr?: string;
  icon: string;
  category: 'diagnostic' | 'surgical' | 'preventive' | 'treatment';
  features: string[];
  featuresAr?: string[];
  seoTitle?: string;
  seoTitleAr?: string;
  seoDescription?: string;
  seoDescriptionAr?: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  email: string;
  phone: string;
  date: Date;
  time: string;
  doctorId: string;
  serviceId: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export interface Testimonial {
  id: string;
  patientName: string;
  patientImage: string;
  rating: number;
  content: string;
  service: string;
  date: Date;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt: Date;
  updatedAt: Date;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  questionAr?: string;
  answerAr?: string;
  category: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  preferredContact: 'email' | 'phone';
}

export interface ClinicInfo {
  name: string;
  nameAr: string;
  legalName: string;
  legalNameAr: string;
  description: string;
  descriptionAr: string;
  phone: string;
  email: string;
  address: string;
  addressAr: string;
  city: string;
  cityAr: string;
  postalCode: string;
  country: string;
  countryAr: string;
  workingHours: WorkingHours;
  socialMedia: SocialLinks;
}

export interface WorkingHours {
  monday: TimeSlot;
  tuesday: TimeSlot;
  wednesday: TimeSlot;
  thursday: TimeSlot;
  friday: TimeSlot;
  saturday: TimeSlot;
  sunday: TimeSlot;
}

export interface TimeSlot {
  open: string;
  close: string;
  isClosed: boolean;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  whatsapp?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
