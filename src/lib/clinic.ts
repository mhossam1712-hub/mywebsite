import { CLINIC_INFO } from '@/constants';

type ClinicBranch = {
  slug: string;
  name: string;
  phone: string;
  address?: string;
  mapUrl?: string;
  googleMapsPlaceUrl?: string;
  googleMapsDirectionsUrl?: string;
};

export function phoneHref(phone: string) {
  const digits = phone.replace(/\D/g, '');

  return phone.trim().startsWith('+') ? `+${digits}` : digits;
}

export function clinicDisplayName(locale: string) {
  return locale === 'ar' ? CLINIC_INFO.nameAr : CLINIC_INFO.name;
}

export function clinicLocation(locale: string) {
  return locale === 'ar'
    ? `${CLINIC_INFO.cityAr}، ${CLINIC_INFO.countryAr}`
    : `${CLINIC_INFO.city}, ${CLINIC_INFO.country}`;
}

export function branchAreaName(branch: Pick<ClinicBranch, 'slug' | 'name'>, locale: string) {
  if (locale === 'ar') {
    if (branch.slug === 'smouha') return 'سموحة';
    if (branch.slug === 'raml-station') return 'محطة الرمل';
  }

  return branch.name.replace(/\s*Branch$/i, '').trim();
}

export function branchDisplayName(branch: Pick<ClinicBranch, 'slug' | 'name'>, locale: string) {
  const areaName = branchAreaName(branch, locale);

  return locale === 'ar'
    ? `${CLINIC_INFO.nameAr} - ${areaName}`
    : `${areaName} Clinic`;
}

export function branchDirectionsHref(branch: Pick<ClinicBranch, 'name'> & Partial<ClinicBranch>) {
  if (branch.googleMapsDirectionsUrl) return branch.googleMapsDirectionsUrl;

  const destination = branch.address
    ? `${branch.name}, ${branch.address}, ${CLINIC_INFO.city}, ${CLINIC_INFO.country}`
    : branch.name;

  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
}

export function branchAppointmentName(branch: Pick<ClinicBranch, 'slug' | 'name'>, locale: string) {
  return locale === 'ar' ? branchDisplayName(branch, locale) : branch.name;
}

export function whatsAppHref(message?: string) {
  const whatsappNumber = CLINIC_INFO.socialMedia.whatsapp;

  if (!whatsappNumber) return null;

  const normalizedWhatsappNumber = phoneHref(whatsappNumber).replace(/^\+/, '');
  const query = message ? `?text=${encodeURIComponent(message)}` : '';

  return `https://wa.me/${normalizedWhatsappNumber}${query}`;
}

export function appointmentEmailFallbackHref(message: string) {
  return `mailto:${CLINIC_INFO.email}?subject=${encodeURIComponent('Appointment request')}&body=${encodeURIComponent(message)}`;
}
