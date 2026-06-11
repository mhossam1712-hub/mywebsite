import React from 'react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { CLINIC_BRANCHES, CLINIC_INFO, NAVIGATION_ITEMS } from '@/constants';
import { branchAreaName, branchDirectionsHref, clinicDisplayName, clinicLocation, phoneHref, whatsAppHref } from '@/lib/clinic';
import {
  allServicesLabel,
  getDedicatedServiceLinks,
  serviceLinksHeading,
  serviceNavigationLabel,
} from '@/lib/service-links';

type FooterProps = {
  locale: string;
};

export const Footer = async ({ locale }: FooterProps) => {
  const t = await getTranslations({ locale, namespace: 'footer' });
  const navigationT = await getTranslations({ locale, namespace: 'navigation' });
  const currentYear = new Date().getFullYear();
  const isArabic = locale === 'ar';
  const whatsappUrl = whatsAppHref();
  const serviceLinks = getDedicatedServiceLinks(locale);

  return (
    <footer className="bg-[linear-gradient(135deg,#082f49_0%,#0f3f46_54%,#221f4f_100%)] text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Footer Content */}
        <div className="grid grid-cols-1 gap-8 mb-8 md:grid-cols-2 lg:grid-cols-5">
          {/* About Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">{clinicDisplayName(locale)}</h3>
            <p className="text-cyan-50/70 text-sm leading-6">
              {isArabic ? CLINIC_INFO.descriptionAr : CLINIC_INFO.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t('quick_links')}</h3>
            <ul className="space-y-2">
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={`/${locale}${item.href}`} className="text-cyan-50/70 transition-colors hover:text-white">
                    {navigationT(item.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">{serviceLinksHeading(locale)}</h3>
            <ul className="space-y-2" aria-label={serviceNavigationLabel(locale)}>
              <li>
                <Link href={`/${locale}/services`} className="text-cyan-50/70 transition-colors hover:text-white">
                  {allServicesLabel(locale)}
                </Link>
              </li>
              {serviceLinks.map((service) => (
                <li key={service.slug}>
                  <Link href={service.href} className="text-cyan-50/70 transition-colors hover:text-white">
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t('contact_info')}</h3>
            <ul className="space-y-2 text-cyan-50/70 text-sm">
              <li>
                💬 {isArabic ? 'واتساب' : 'WhatsApp'}:{' '}
                <a href={whatsappUrl ?? `mailto:${CLINIC_INFO.email}`} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                  {CLINIC_INFO.phone}
                </a>
              </li>
              {CLINIC_BRANCHES.map((branch) => (
                <li key={branch.name}>
                  📞{' '}
                  <Link href={`/${locale}/branches/${branch.slug}`} className="transition-colors hover:text-white">
                    {branchAreaName(branch, locale)}
                  </Link>
                  :{' '}
                  <a href={`tel:${phoneHref(branch.phone)}`} className="transition-colors hover:text-white">
                    {branch.phone}
                  </a>
                </li>
              ))}
              <li>
                ✉️{' '}
                <a href={`mailto:${CLINIC_INFO.email}`} className="transition-colors hover:text-white">
                  {CLINIC_INFO.email}
                </a>
              </li>
              {CLINIC_BRANCHES.map((branch) => {
                const areaName = branchAreaName(branch, locale);
                const address = isArabic ? branch.addressAr : branch.address;

                return (
                  <li key={`${branch.name}-address`} className="leading-6">
                    📍{' '}
                    <a
                      href={branchDirectionsHref(branch)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={
                        isArabic
                          ? `افتح اتجاهات خرائط جوجل إلى فرع ${areaName}`
                          : `Open Google Maps directions to the ${areaName} clinic`
                      }
                      className="transition-colors hover:text-white"
                    >
                      <span className="font-semibold">{areaName}</span>: {address}
                    </a>
                  </li>
                );
              })}
              <li>{clinicLocation(locale)}</li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t('hours')}</h3>
            <ul className="space-y-1 text-cyan-50/70 text-sm">
              <li>
                {isArabic ? 'السبت - الأربعاء' : 'Saturday - Wednesday'}: 12:00 PM - 9:00 PM
              </li>
              <li>{isArabic ? 'الخميس والجمعة: مغلق' : 'Thursday and Friday: Closed'}</li>
            </ul>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="border-t border-white/10 py-8">
          <div className="flex justify-center gap-6 mb-8">
            {CLINIC_INFO.socialMedia.facebook && (
              <a
                href={CLINIC_INFO.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Abdalla Eye Clinic on Facebook"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full font-bold hover:text-blue-400"
              >
                f
              </a>
            )}
            {CLINIC_INFO.socialMedia.instagram && (
              <a
                href={CLINIC_INFO.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Abdalla Eye Clinic on Instagram"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:text-pink-400"
              >
                📷
              </a>
            )}
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact Abdalla Eye Clinic on WhatsApp"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:text-green-400"
              >
                💬
              </a>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between border-t border-white/10 pt-8 text-sm text-cyan-50/70 md:flex-row">
          <p>&copy; {currentYear} {isArabic ? CLINIC_INFO.legalNameAr : CLINIC_INFO.legalName}. {t('rights')}</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href={`/${locale}/privacy`} className="hover:text-white transition-colors">
              {t('privacy')}
            </Link>
            <Link href={`/${locale}/terms`} className="hover:text-white transition-colors">
              {t('terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
