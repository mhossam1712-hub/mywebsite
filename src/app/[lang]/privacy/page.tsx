import type { Metadata } from 'next';
import { Card, CardBody } from '@/components/common/Card';
import { CLINIC_BRANCHES, CLINIC_INFO } from '@/constants';
import { createRouteMetadata, normalizeLocale } from '@/lib/seo';

type PageProps = {
  params: Promise<{ lang: string }>;
};

const seoText = {
  title: {
    en: 'Privacy Policy for Abdalla Eye Clinic Alexandria',
    ar: 'سياسة الخصوصية لعيادة عبد الله للعيون في الإسكندرية',
  },
  description: {
    en: 'Read how Abdalla Eye Clinic in Alexandria handles website forms, appointment requests, online eye-test details, and patient contact information for eye care services.',
    ar: 'اقرأ كيف تتعامل عيادة عبد الله للعيون في الإسكندرية مع نماذج الموقع وطلبات الحجز وبيانات اختبارات النظر على الإنترنت ومعلومات التواصل الخاصة بخدمات رعاية العين.',
  },
} as const;

const pageCopy = {
  en: {
    title: 'Privacy Policy',
    intro:
      'This privacy policy explains how Abdalla Eye Clinic in Alexandria handles information shared through our website, appointment forms, contact requests, and online eye-screening tools.',
    sections: [
      {
        title: 'Introduction',
        body: 'We are committed to protecting your privacy and using your information only to support clinic communication, appointment coordination, and ophthalmology care.',
      },
      {
        title: 'Information We Collect',
        body: 'We may collect information you provide directly to us through the website or clinic communication channels.',
        bullets: [
          'Name, phone number, email address, and preferred contact details',
          'Appointment requests, selected service, branch preference, and visit notes',
          'Eye health information you choose to share in forms or messages',
          'Online eye-test screening answers or symptom details when submitted',
        ],
      },
      {
        title: 'How We Use Your Information',
        body: 'We use submitted information to coordinate care at Abdalla Eye Clinic and improve the patient experience.',
        bullets: [
          'Schedule and manage appointments at Alexandria branches',
          'Respond to contact requests and follow-up questions',
          'Prepare for eye exams, LASIK consultations, cataract visits, glaucoma follow-up, retina checks, dry eye care, or online eye-test follow-up',
          'Send appointment reminders or service updates when appropriate',
          'Comply with applicable legal, clinical, and administrative requirements',
        ],
      },
      {
        title: 'Data Security',
        body: 'We use reasonable technical and organizational measures to protect personal information against unauthorized access, alteration, disclosure, or destruction.',
      },
      {
        title: 'Your Rights',
        body: 'You may contact us to request access, correction, or deletion of personal information you have provided, subject to applicable legal and medical-record requirements.',
      },
    ],
    contactTitle: 'Contact Us',
    contactIntro: 'For privacy questions or requests, please contact Abdalla Eye Clinic:',
    phoneLabel: 'Phone / WhatsApp',
    emailLabel: 'Email',
  },
  ar: {
    title: 'سياسة الخصوصية',
    intro:
      'توضح سياسة الخصوصية كيف تتعامل عيادة عبد الله للعيون في الإسكندرية مع البيانات المرسلة عبر الموقع ونماذج الحجز وطلبات التواصل وأدوات فحص النظر على الإنترنت.',
    sections: [
      {
        title: 'مقدمة',
        body: 'نلتزم بحماية خصوصيتك واستخدام معلوماتك فقط لدعم التواصل مع العيادة وتنسيق المواعيد ورعاية العيون.',
      },
      {
        title: 'المعلومات التي نجمعها',
        body: 'قد نجمع المعلومات التي تقدمها مباشرة عبر الموقع أو قنوات التواصل مع العيادة.',
        bullets: [
          'الاسم ورقم الهاتف والبريد الإلكتروني ووسيلة التواصل المفضلة',
          'طلبات الحجز والخدمة المختارة وتفضيل الفرع وملاحظات الزيارة',
          'معلومات صحة العين التي تختار مشاركتها في النماذج أو الرسائل',
          'إجابات اختبارات النظر على الإنترنت أو تفاصيل الأعراض عند إرسالها',
        ],
      },
      {
        title: 'كيف نستخدم معلوماتك',
        body: 'نستخدم البيانات المرسلة لتنسيق الرعاية في عيادة عبد الله للعيون وتحسين تجربة المريض.',
        bullets: [
          'تنظيم وإدارة المواعيد في فروع الإسكندرية',
          'الرد على طلبات التواصل وأسئلة المتابعة',
          'الاستعداد لفحوصات العين أو استشارات الليزك أو زيارات المياه البيضاء أو متابعة الجلوكوما أو فحوصات الشبكية أو علاج جفاف العين أو متابعة اختبارات النظر على الإنترنت',
          'إرسال تذكيرات بالمواعيد أو تحديثات الخدمة عند الحاجة',
          'الالتزام بالمتطلبات القانونية والطبية والإدارية المعمول بها',
        ],
      },
      {
        title: 'أمان البيانات',
        body: 'نستخدم إجراءات تقنية وتنظيمية معقولة لحماية المعلومات الشخصية من الوصول غير المصرح به أو التعديل أو الإفصاح أو الإتلاف.',
      },
      {
        title: 'حقوقك',
        body: 'يمكنك التواصل معنا لطلب الوصول إلى المعلومات الشخصية التي قدمتها أو تصحيحها أو حذفها، وفقاً للمتطلبات القانونية ومتطلبات السجلات الطبية المعمول بها.',
      },
    ],
    contactTitle: 'تواصل معنا',
    contactIntro: 'لأسئلة أو طلبات الخصوصية، يرجى التواصل مع عيادة عبد الله للعيون:',
    phoneLabel: 'الهاتف / واتساب',
    emailLabel: 'البريد الإلكتروني',
  },
} as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;

  return createRouteMetadata({
    lang,
    path: '/privacy',
    title: seoText.title,
    description: seoText.description,
  });
}

export default async function PrivacyPage({ params }: PageProps) {
  const { lang } = await params;
  const locale = normalizeLocale(lang);
  const isArabic = locale === 'ar';
  const copy = pageCopy[locale];
  const legalName = isArabic ? CLINIC_INFO.legalNameAr : CLINIC_INFO.legalName;
  const city = isArabic ? CLINIC_INFO.cityAr : CLINIC_INFO.city;
  const country = isArabic ? CLINIC_INFO.countryAr : CLINIC_INFO.country;
  const branchAddresses = CLINIC_BRANCHES
    .map((branch) => (isArabic ? branch.addressAr : branch.address))
    .join(' | ');

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-16 dark:bg-gray-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className={isArabic ? 'text-right' : 'text-left'}>
          <span className="eyebrow mb-4">{legalName}</span>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">{copy.title}</h1>
          <p className="mb-8 max-w-3xl text-lg leading-8 text-gray-700 dark:text-gray-300">
            {copy.intro}
          </p>
        </div>

        <Card className="mb-8">
          <CardBody>
            <div className={`prose prose-lg max-w-none dark:prose-invert ${isArabic ? 'text-right' : 'text-left'}`}>
              {copy.sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{section.title}</h2>
                  <p className="text-gray-700 dark:text-gray-300">{section.body}</p>
                  {'bullets' in section && section.bullets && (
                    <ul className="list-inside text-gray-700 dark:text-gray-300">
                      {section.bullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{copy.contactTitle}</h2>
                <p className="text-gray-700 dark:text-gray-300">{copy.contactIntro}</p>
                <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
                  <p className="text-gray-900 dark:text-white">
                    <strong>{legalName}</strong>
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">{branchAddresses}</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {city}, {country}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {copy.phoneLabel}: {CLINIC_INFO.phone}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {copy.emailLabel}:{' '}
                    <a href={`mailto:${CLINIC_INFO.email}`} className="text-blue-600 hover:underline dark:text-blue-400">
                      {CLINIC_INFO.email}
                    </a>
                  </p>
                </div>
              </section>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
