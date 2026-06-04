import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/common/Button';
import { Card, CardBody, CardHeader } from '@/components/common/Card';
import { MobileBottomActionBar } from '@/components/common/MobileBottomActionBar';
import { createRouteMetadata } from '@/lib/seo';
import { getDoctorImageAlt, getLocalizedDoctors } from '@/utils/localized-content';

type PageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;

  return createRouteMetadata({ lang, path: '/doctors', route: 'doctors' });
}

export default async function DoctorsPage({ params }: PageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'doctors' });
  const doctors = getLocalizedDoctors(lang);

  return (
    <>
    <div className="py-12 md:py-24 bg-white dark:bg-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('title')}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">{t('subtitle')}</p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          {doctors.map((doctor) => (
            <Card key={doctor.id} variant="elevated">
              <CardHeader>
                <div className="relative w-full aspect-square overflow-hidden rounded-lg mb-4 bg-gray-100">
                  <Image
                    src={doctor.image}
                    alt={getDoctorImageAlt(doctor.id, doctor.name)}
                    fill
                    sizes="(min-width: 768px) 384px, calc(100vw - 80px)"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{doctor.name}</h3>
                <p className="text-sm text-blue-600 font-medium mt-1">{doctor.specialty}</p>
              </CardHeader>
              <CardBody>
                <div className="space-y-3 text-sm mb-4">
                  {doctor.experience > 0 && (
                    <div>
                      <p className="text-gray-600 font-semibold">{t('experience')}:</p>
                      <p className="text-gray-700 dark:text-gray-300">
                        {lang === 'ar' ? `${doctor.experience} سنة` : `${doctor.experience} years`}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-gray-600 font-semibold">{t('languages')}:</p>
                    <p className="text-gray-700">{doctor.languages.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-300 font-semibold">
                      {lang === 'ar' ? 'المؤهل:' : 'Qualification:'}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 text-xs">{doctor.qualification}</p>
                  </div>
                  <p className="text-gray-700 italic pt-2">{doctor.bio}</p>
                </div>

                <Link href={`/${lang}/appointments`} className="block">
                  <Button fullWidth size="sm">
                    {lang === 'ar' ? 'احجز مع الطبيب' : `Book with ${doctor.name.split(' ')[0]}`}
                  </Button>
                </Link>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
    <MobileBottomActionBar locale={lang} />
    </>
  );
}
