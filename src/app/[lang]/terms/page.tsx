import type { Metadata } from 'next';
import { Card, CardBody } from '@/components/common/Card';
import { CLINIC_BRANCHES, CLINIC_INFO } from '@/constants';
import { createRouteMetadata, normalizeLocale } from '@/lib/seo';

type PageProps = {
  params: Promise<{ lang: string }>;
};

const seoText = {
  title: {
    en: 'Terms of Use for Abdalla Eye Clinic Alexandria',
    ar: 'شروط استخدام موقع عيادة عبد الله للعيون في الإسكندرية',
  },
  description: {
    en: 'Review the website terms for Abdalla Eye Clinic in Alexandria, including appointment requests, online eye-test information, educational eye care content, and use of clinic digital services.',
    ar: 'راجع شروط استخدام موقع عيادة عبد الله للعيون في الإسكندرية، بما في ذلك طلبات الحجز ومعلومات اختبارات النظر على الإنترنت والمحتوى التثقيفي وخدمات العيادة الرقمية.',
  },
} as const;

const pageCopy = {
  en: {
    title: 'Terms and Conditions',
    intro:
      'These terms explain how patients and visitors may use the Abdalla Eye Clinic website, appointment forms, online eye-test tools, and educational eye care content for our Alexandria clinic services.',
    sections: [
      {
        title: '1. Acceptance of Terms',
        body: 'By accessing or using this website, you agree to these terms and conditions. If you do not agree, please do not use the website.',
      },
      {
        title: '2. Website Use',
        body: 'You may use the Abdalla Eye Clinic website for personal, non-commercial purposes, including learning about eye care services, requesting appointments, contacting the clinic, and using online screening tools.',
      },
      {
        title: '3. Medical Disclaimer',
        body: 'Website content, blog articles, and online eye-test tools are for patient education and screening support only. They do not diagnose disease, replace an ophthalmologist examination, or create a doctor-patient relationship before clinical assessment.',
      },
      {
        title: '4. Appointment Requests',
        body: 'Submitting an appointment request does not guarantee confirmation until the clinic contacts you or the appointment is otherwise confirmed. For urgent symptoms such as sudden vision loss, severe eye pain, trauma, or new flashes and floaters, seek urgent medical care.',
      },
      {
        title: '5. Accuracy of Information',
        body: 'We aim to keep service, branch, appointment, and educational information current, but website content may change and may contain occasional errors. Clinical decisions should be based on direct medical assessment.',
      },
      {
        title: '6. Intellectual Property',
        body: 'Text, images, design elements, online eye-test interfaces, and other website materials belong to Abdalla Eye Clinic or are used with permission. They may not be copied or reused for commercial purposes without written approval.',
      },
      {
        title: '7. Third-Party Links',
        body: 'The website may link to external websites or map services. Abdalla Eye Clinic is not responsible for external website content, availability, or privacy practices.',
      },
      {
        title: '8. Changes to Terms',
        body: 'We may update these terms when needed. Continued use of the website after changes means you accept the updated terms.',
      },
      {
        title: '9. Governing Law',
        body: 'These terms are governed by the laws of Egypt, and related disputes are subject to the competent courts in Alexandria, Egypt.',
      },
    ],
    contactTitle: 'Contact Us',
    contactIntro: 'For questions about these terms, please contact Abdalla Eye Clinic:',
    phoneLabel: 'Phone / WhatsApp',
    emailLabel: 'Email',
  },
  ar: {
    title: 'الشروط والأحكام',
    intro:
      'توضح هذه الشروط كيفية استخدام المرضى والزوار لموقع عيادة عبد الله للعيون ونماذج الحجز وأدوات فحص النظر على الإنترنت والمحتوى التثقيفي الخاص بخدمات العيادة في الإسكندرية.',
    sections: [
      {
        title: '1. قبول الشروط',
        body: 'باستخدام هذا الموقع أو الوصول إليه، فإنك توافق على هذه الشروط والأحكام. إذا لم توافق عليها، يرجى عدم استخدام الموقع.',
      },
      {
        title: '2. استخدام الموقع',
        body: 'يمكنك استخدام موقع عيادة عبد الله للعيون لأغراض شخصية غير تجارية، مثل التعرف على خدمات العيون وطلب المواعيد والتواصل مع العيادة واستخدام أدوات الفحص الأولي على الإنترنت.',
      },
      {
        title: '3. تنبيه طبي',
        body: 'محتوى الموقع ومقالات المدونة وأدوات فحص النظر على الإنترنت مخصصة للتثقيف والفحص الأولي فقط. لا تشخص المرض ولا تستبدل فحص طبيب العيون ولا تنشئ علاقة طبيب ومريض قبل التقييم الإكلينيكي.',
      },
      {
        title: '4. طلبات الحجز',
        body: 'إرسال طلب حجز لا يعني تأكيد الموعد حتى تتواصل العيادة معك أو يتم تأكيد الموعد بطريقة أخرى. عند وجود أعراض عاجلة مثل فقدان النظر المفاجئ أو ألم شديد أو إصابة أو ومضات وعوائم جديدة، اطلب رعاية طبية عاجلة.',
      },
      {
        title: '5. دقة المعلومات',
        body: 'نسعى إلى إبقاء معلومات الخدمات والفروع والمواعيد والمحتوى التثقيفي محدثة، لكن محتوى الموقع قد يتغير وقد يحتوي على أخطاء عرضية. يجب أن تعتمد القرارات الطبية على تقييم طبي مباشر.',
      },
      {
        title: '6. الملكية الفكرية',
        body: 'النصوص والصور وعناصر التصميم وواجهات اختبارات النظر على الإنترنت ومواد الموقع الأخرى مملوكة لعيادة عبد الله للعيون أو مستخدمة بإذن. لا يجوز نسخها أو إعادة استخدامها لأغراض تجارية دون موافقة مكتوبة.',
      },
      {
        title: '7. روابط خارجية',
        body: 'قد يحتوي الموقع على روابط لمواقع خارجية أو خدمات خرائط. عيادة عبد الله للعيون غير مسؤولة عن محتوى المواقع الخارجية أو توفرها أو ممارسات الخصوصية الخاصة بها.',
      },
      {
        title: '8. تعديل الشروط',
        body: 'قد نقوم بتحديث هذه الشروط عند الحاجة. استمرار استخدام الموقع بعد التحديث يعني موافقتك على الشروط المحدثة.',
      },
      {
        title: '9. القانون الحاكم',
        body: 'تخضع هذه الشروط لقوانين جمهورية مصر العربية، وتكون المنازعات المتعلقة بها من اختصاص المحاكم المختصة في الإسكندرية، مصر.',
      },
    ],
    contactTitle: 'تواصل معنا',
    contactIntro: 'لأي أسئلة عن هذه الشروط، يرجى التواصل مع عيادة عبد الله للعيون:',
    phoneLabel: 'الهاتف / واتساب',
    emailLabel: 'البريد الإلكتروني',
  },
} as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;

  return createRouteMetadata({
    lang,
    path: '/terms',
    title: seoText.title,
    description: seoText.description,
  });
}

export default async function TermsPage({ params }: PageProps) {
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
