'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { CLINIC_BRANCHES, CLINIC_INFO, NAVIGATION_ITEMS } from '@/constants';

const phoneHref = (phone: string) => phone.replace(/\D/g, '');

export const Footer = () => {
  const t = useTranslations('footer');
  const navigationT = useTranslations('navigation');
  const locale = useLocale();
  const currentYear = new Date().getFullYear();
  const isArabic = locale === 'ar';

  return (
    <footer className="bg-[linear-gradient(135deg,#082f49_0%,#0f3f46_54%,#221f4f_100%)] text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">Abdalla Eye Clinic</h3>
            <p className="text-cyan-50/70 text-sm leading-6">
              {isArabic
                ? 'عيادة عيون متخصصة في الإسكندرية تقدم رعاية شاملة للعين وخدمات تشخيص وعلاج متقدمة.'
                : CLINIC_INFO.description}
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

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t('contact_info')}</h3>
            <ul className="space-y-2 text-cyan-50/70 text-sm">
              <li>
                💬 {isArabic ? 'واتساب' : 'WhatsApp'}:{' '}
                <a href={`https://wa.me/${CLINIC_INFO.socialMedia.whatsapp}`} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                  {CLINIC_INFO.phone}
                </a>
              </li>
              {CLINIC_BRANCHES.map((branch, index) => (
                <li key={branch.name}>
                  📞 {isArabic ? (index === 0 ? 'سموحة' : 'محطة الرمل') : branch.name.replace(' Branch', '')}:{' '}
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
              {CLINIC_BRANCHES.map((branch, index) => (
                <li key={`${branch.name}-address`} className="leading-6">
                  📍 {isArabic ? (index === 0 ? 'سموحة' : 'محطة الرمل') : branch.name.replace(' Branch', '')}: {isArabic ? branch.addressAr : branch.address}
                </li>
              ))}
              <li>{isArabic ? 'الإسكندرية، مصر' : `${CLINIC_INFO.city}, ${CLINIC_INFO.country}`}</li>
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
              <a href={CLINIC_INFO.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                f
              </a>
            )}
            {CLINIC_INFO.socialMedia.twitter && (
              <a href={CLINIC_INFO.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                𝕏
              </a>
            )}
            {CLINIC_INFO.socialMedia.instagram && (
              <a href={CLINIC_INFO.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">
                📷
              </a>
            )}
            {CLINIC_INFO.socialMedia.whatsapp && (
              <a href={`https://wa.me/${CLINIC_INFO.socialMedia.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-green-400">
                💬
              </a>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between border-t border-white/10 pt-8 text-sm text-cyan-50/70 md:flex-row">
          <p>&copy; {currentYear} {isArabic ? 'عيادة عبد الله للعيون' : 'Abdalla Eye Clinic'}. {t('rights')}</p>
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
