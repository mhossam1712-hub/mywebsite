import { CLINIC_INFO } from '@/constants';
import {
  CANONICAL_SITE_URL,
  absoluteCanonicalUrl,
  absoluteUrl,
  buildBreadcrumbSchema,
  buildFAQPageSchema,
  buildMedicalClinicSchema,
  serializeStructuredData,
} from '@/lib/seo';
import { getLocalizedDoctors } from '@/utils/localized-content';

// Re-export the shared builders so callers can import from one place.
export {
  buildBreadcrumbSchema,
  buildFAQPageSchema,
  buildMedicalClinicSchema,
  serializeStructuredData,
};

type StructuredData = Record<string, unknown>;

/**
 * Standalone Physician schema for the doctors page.
 * The site-wide layout already embeds physician nodes inside its @graph block,
 * but this dedicated schema makes the entities prominent for crawlers landing
 * specifically on /doctors.
 */
export function buildPhysiciansPageSchema(lang: string): StructuredData {
  const doctors = getLocalizedDoctors(lang);
  const doctorsUrl = absoluteCanonicalUrl(lang, '/doctors');

  return {
    '@context': 'https://schema.org',
    '@graph': doctors.map((doctor) => ({
      '@type': 'Physician',
      '@id': `${CANONICAL_SITE_URL}/#${doctor.id}`,
      name: doctor.name,
      jobTitle: doctor.specialty,
      description: doctor.bio,
      image: absoluteUrl(CANONICAL_SITE_URL, doctor.image),
      url: doctorsUrl,
      worksFor: {
        '@type': 'MedicalClinic',
        '@id': `${CANONICAL_SITE_URL}/#clinic`,
        name: CLINIC_INFO.name,
        url: CANONICAL_SITE_URL,
      },
      medicalSpecialty: 'Ophthalmology',
      knowsLanguage: doctor.languages,
    })),
  };
}
