import { DOCTORS, FAQS, SERVICES } from '@/constants';

type LocaleLike = string;

const isArabic = (locale: LocaleLike) => locale === 'ar';

const serviceArabic = {
  'service-1': {
    name: 'فحص العيون الشامل',
    description: 'تقييم كامل لصحة العين وقياس النظر',
    features: ['قياس حدة الإبصار', 'قياس ضغط العين', 'فحص الشبكية', 'اختبار مجال الإبصار'],
  },
  'service-2': {
    name: 'جراحة الليزك',
    description: 'تصحيح الإبصار بالليزر بدقة وأمان',
    features: ['ليزك بدون شفرة', 'تقنية مخصصة حسب قياسات العين', 'إجراء معتمد وآمن', 'متابعة بعد العملية'],
  },
  'service-3': {
    name: 'جراحة المياه البيضاء',
    description: 'إزالة المياه البيضاء وزراعة عدسات داخل العين',
    features: ['تفتيت العدسة بالموجات فوق الصوتية', 'خيارات عدسات متقدمة', 'إجراء في نفس اليوم', 'شق جراحي صغير'],
  },
  'service-4': {
    name: 'علاج الجلوكوما',
    description: 'متابعة وعلاج ارتفاع ضغط العين طبياً وجراحياً',
    features: ['متابعة ضغط العين', 'تنظيم العلاج الدوائي', 'العلاج بالليزر', 'جراحات جلوكوما دقيقة ومحدودة التدخل'],
  },
  'service-5': {
    name: 'علاج الشبكية',
    description: 'تشخيص وعلاج أمراض الشبكية المختلفة',
    features: ['علاج اعتلال الشبكية السكري', 'علاج التنكس البقعي', 'إصلاح انفصال الشبكية', 'حقن مضادات عامل النمو'],
  },
  'service-6': {
    name: 'تركيب العدسات اللاصقة',
    description: 'اختيار وقياس العدسات اللاصقة المناسبة للعين',
    features: ['تجربة أكثر من نوع عدسات', 'عدسات طبية خاصة', 'عدسات للاستخدام الممتد', 'تقويم القرنية الليلي'],
  },
  'service-7': {
    name: 'علاج جفاف العين',
    description: 'خطة شاملة لتشخيص وعلاج جفاف العين',
    features: ['تحليل غدد ميبوميان', 'سدادات القنوات الدمعية', 'العلاج بالنبضات الضوئية', 'اختيار القطرات المرطبة المناسبة'],
  },
  'service-8': {
    name: 'رعاية عيون الأطفال',
    description: 'خدمات فحص وعلاج عيون الأطفال',
    features: ['علاج كسل العين', 'فحص النظر للأطفال', 'وصف النظارات', 'تقييم الحول'],
  },
} as const;

const doctorArabic = {
  'dr-1': {
    name: 'أ.د. أحمد حسام عبد الله',
    specialty: 'أستاذ طب وجراحة العيون',
    qualification: 'أستاذ طب وجراحة العيون',
    bio: 'يقدم رعاية متخصصة في طب وجراحة العيون في عيادة عبد الله للعيون.',
    languages: ['العربية', 'الإنجليزية'],
  },
  'dr-2': {
    name: 'د. محمد حسام عبد الله',
    specialty: 'طبيب عيون',
    qualification: 'طبيب عيون',
    bio: 'يقدم رعاية شاملة للعيون في عيادة عبد الله للعيون.',
    languages: ['العربية', 'الإنجليزية'],
  },
} as const;

export const sectionText = {
  servicesEyebrow: { en: 'Clinical Excellence', ar: 'تميز طبي' },
  doctorsEyebrow: { en: 'Trusted Specialists', ar: 'أطباء موثوقون' },
  faqsEyebrow: { en: 'Clear Answers', ar: 'إجابات واضحة' },
  testimonialsEyebrow: { en: 'Patient Stories', ar: 'قصص المرضى' },
  heroBadge: { en: 'Abdalla Eye Clinic', ar: 'عيادة عبد الله للعيون' },
  heroImageEyebrow: { en: 'Advanced Eye Exam', ar: 'فحص عيون متقدم' },
  heroImageCaption: { en: 'Clear diagnostics, calmer visits.', ar: 'تشخيص أوضح وزيارات أكثر راحة.' },
  featureCards: {
    en: [
      { title: 'Advanced Diagnostics', description: 'Modern care with a calm, expert touch.' },
      { title: 'Precise Surgery', description: 'Modern care with a calm, expert touch.' },
      { title: 'Patient First', description: 'Modern care with a calm, expert touch.' },
    ],
    ar: [
      { title: 'تشخيص متقدم', description: 'رعاية حديثة بلمسة هادئة وخبرة دقيقة.' },
      { title: 'جراحة دقيقة', description: 'رعاية حديثة بلمسة هادئة وخبرة دقيقة.' },
      { title: 'المريض أولاً', description: 'رعاية حديثة بلمسة هادئة وخبرة دقيقة.' },
    ],
  },
  testimonials: {
    en: [
      {
        id: 1,
        name: 'Ahmed Hassan',
        rating: 5,
        content: 'Excellent service and professional doctors. My vision has improved significantly after LASIK.',
        service: 'LASIK Surgery',
      },
      {
        id: 2,
        name: 'Fatima Al-Mazrouei',
        rating: 5,
        content: 'Very caring and attentive staff. The clinic is clean and modern with the latest technology.',
        service: 'Cataract Surgery',
      },
      {
        id: 3,
        name: 'Mohammed Al-Mansouri',
        rating: 5,
        content: "Best eye clinic I've ever visited. The doctors really took time to explain everything.",
        service: 'Comprehensive Eye Exam',
      },
      {
        id: 4,
        name: 'Mona Youssef',
        rating: 5,
        content: 'The appointment was organized and calm. I felt listened to from the exam through the treatment plan.',
        service: 'Dry Eye Treatment',
      },
      {
        id: 5,
        name: 'Karim Samir',
        rating: 5,
        content: 'Clear explanations, modern equipment, and excellent follow-up after my procedure. Highly recommended.',
        service: 'Retinal Treatment',
      },
      {
        id: 6,
        name: 'Sara Adel',
        rating: 5,
        content: 'My child was nervous before the visit, but the team made the exam easy and reassuring.',
        service: 'Pediatric Eye Care',
      },
    ],
    ar: [
      {
        id: 1,
        name: 'أحمد حسن',
        rating: 5,
        content: 'خدمة ممتازة وأطباء محترفون. تحسن نظري بشكل واضح بعد الليزك.',
        service: 'جراحة الليزك',
      },
      {
        id: 2,
        name: 'فاطمة المزروعي',
        rating: 5,
        content: 'الفريق متعاون جداً والعيادة نظيفة وحديثة وتستخدم أجهزة متطورة.',
        service: 'جراحة المياه البيضاء',
      },
      {
        id: 3,
        name: 'محمد المنصوري',
        rating: 5,
        content: 'أفضل عيادة عيون زرتها. الطبيب شرح لي كل خطوة بهدوء واهتمام.',
        service: 'فحص العيون الشامل',
      },
      {
        id: 4,
        name: 'منى يوسف',
        rating: 5,
        content: 'الموعد كان منظماً وهادئاً، وشعرت أن الطبيب استمع لي جيداً من الفحص حتى خطة العلاج.',
        service: 'علاج جفاف العين',
      },
      {
        id: 5,
        name: 'كريم سمير',
        rating: 5,
        content: 'شرح واضح وأجهزة حديثة ومتابعة ممتازة بعد الإجراء. أنصح بالعيادة جداً.',
        service: 'علاج الشبكية',
      },
      {
        id: 6,
        name: 'سارة عادل',
        rating: 5,
        content: 'كان طفلي متوتراً قبل الزيارة، لكن الفريق جعل الفحص سهلاً ومطمئناً.',
        service: 'رعاية عيون الأطفال',
      },
    ],
  },
};

type LocalizedStringKey = {
  [K in keyof typeof sectionText]: (typeof sectionText)[K] extends { en: string; ar: string } ? K : never;
}[keyof typeof sectionText];

export function getLocalizedServices(locale: LocaleLike) {
  if (!isArabic(locale)) return SERVICES;

  return SERVICES.map((service) => ({
    ...service,
    ...serviceArabic[service.id as keyof typeof serviceArabic],
  }));
}

export function getLocalizedDoctors(locale: LocaleLike) {
  if (!isArabic(locale)) return DOCTORS;

  return DOCTORS.map((doctor) => ({
    ...doctor,
    ...doctorArabic[doctor.id as keyof typeof doctorArabic],
  }));
}

export function getLocalizedFaqs(locale: LocaleLike) {
  if (!isArabic(locale)) return FAQS;

  return FAQS.map((faq) => ({
    ...faq,
    question: faq.questionAr ?? faq.question,
    answer: faq.answerAr ?? faq.answer,
  }));
}

const blogArabic = {
  'cataract-surgery-lens-options': {
    title: 'اختيارات العدسات في جراحة المياه البيضاء: أحادية وتوريك ومتعددة البؤر وEDOF',
    description: 'مقارنة مبسطة بين عدسات المياه البيضاء، تصحيح الاستجماتيزم، العدسات المتقدمة، والاختيار المناسب لنمط الحياة.',
    category: 'المياه البيضاء',
    imageAlt: 'رسم حديث يوضح خيارات العدسات المزروعة بعد جراحة المياه البيضاء وتأثيرها على الرؤية',
  },
  'comprehensive-eye-exam': {
    title: 'ماذا يحدث أثناء فحص العيون الشامل؟',
    description: 'دليل مبسط لفحوصات النظر وضغط العين وتقييم الشبكية ومتى تحتاج إلى زيارة الطبيب.',
    category: 'صحة العين',
    imageAlt: 'رسم حديث لفحص عين شامل يتضمن لوحة النظر وقياس ضغط العين وتقييم الشبكية',
  },
  'lasik-recovery-tips': {
    title: 'التعافي بعد الليزك: نصائح عملية للأسبوع الأول',
    description: 'إرشادات بسيطة بعد الليزك تشمل الراحة والقطرات ووقت الشاشة والجفاف ومتى يجب التواصل مع الطبيب.',
    category: 'الليزك',
    imageAlt: 'رسم حديث يوضح العناية بعد الليزك والقطرات الواقية وفواصل الشاشة',
  },
  'cataract-warning-signs': {
    title: 'أعراض المياه البيضاء المبكرة التي لا يجب تجاهلها',
    description: 'تعرف على أعراض المياه البيضاء مثل الزغللة والوهج وصعوبة القيادة ليلاً ومتى تطلب الفحص.',
    category: 'المياه البيضاء',
    imageAlt: 'رسم حديث يوضح ضبابية العدسة والوهج وضعف التباين الناتج عن المياه البيضاء',
  },
  'glaucoma-awareness': {
    title: 'التوعية بالجلوكوما: حماية النظر قبل ظهور الأعراض',
    description: 'تعرف على سبب صمت الجلوكوما في بدايتها ومن هم الأكثر عرضة وما دور المتابعة المنتظمة في حماية النظر.',
    category: 'الجلوكوما',
    imageAlt: 'رسم حديث يوضح متابعة العصب البصري وضغط العين ومجال الإبصار في الجلوكوما',
  },
  'diabetic-retinopathy-awareness': {
    title: 'اعتلال الشبكية السكري: لماذا يهم فحص العين السنوي؟',
    description: 'دليل توعوي لمرضى السكري عن تغيرات الشبكية الصامتة وعلامات الخطر والفحص والعلاج.',
    category: 'الشبكية',
    imageAlt: 'رسم حديث يوضح أوعية الشبكية وتأثير السكري وأهمية الفحص السنوي',
  },
  'dry-eye-screen-time-treatment': {
    title: 'جفاف العين ووقت الشاشة: لماذا تشعر بحرقة العين بعد العمل؟',
    description: 'تعرف على تأثير الشاشات على جفاف العين والحرقان والزغللة وإجهاد العين، مع خطوات علاج ووقاية عملية.',
    category: 'جفاف العين',
    imageAlt: 'رسم حديث يوضح تأثير الشاشات وقلة الرمش على جفاف العين وطبقة الدموع',
  },
  'eyelid-skin-conditions-and-eye-comfort': {
    title: 'مشكلات جلد الجفن وراحة العين: عندما يلتقي الجلد بالعيون',
    description: 'نظرة عملية على إكزيما الجفون والوردية والتهاب الجفون وحساسية الجلد حول العين ومتى نحتاج إلى رعاية مشتركة.',
    category: 'الجلدية وصحة العين',
    author: 'د. إسلام الحلو',
    authorTitle: 'استشاري الأمراض الجلدية',
    imageAlt: 'رسم حديث يوضح التهاب جلد الجفن وتأثيره على طبقة الدموع وراحة العين',
  },
  'flashes-floaters-retinal-tear-warning': {
    title: 'الومضات والعوائم: متى نقلق من قطع في الشبكية؟',
    description: 'افهم العوائم الجديدة والومضات والظل الجانبي وانفصال الجسم الزجاجي الخلفي ومتى تحتاج إلى فحص شبكية عاجل.',
    category: 'الشبكية',
    imageAlt: 'رسم حديث يوضح الومضات والعوائم وظل الستارة كعلامات تحذيرية لفحص الشبكية',
  },
  'myopia-control-children-screen-time': {
    title: 'التحكم في قصر النظر عند الأطفال: الشاشات والخروج للهواء وفحوصات العين',
    description: 'دليل للأهل عن تقدم قصر النظر عند الأطفال، وقت الشاشات، النشاط الخارجي، النظارات، الأتروبين، والمتابعة.',
    category: 'عيون الأطفال',
    imageAlt: 'رسم حديث يوضح متابعة قصر النظر عند الأطفال والنظارات والوقت خارج المنزل',
  },
  'oct-retina-scan-ai-eye-exam': {
    title: 'تصوير الشبكية OCT وفحوصات العين الحديثة: ماذا تكشف الصور؟',
    description: 'تعرف على دور تصوير OCT في اكتشاف أمراض مركز الإبصار وتغيرات السكري ومخاطر الجلوكوما وتغيرات العصب البصري.',
    category: 'تقنيات فحص العين',
    imageAlt: 'رسم حديث يوضح طبقات الشبكية في تصوير OCT مع مؤشرات تحليل رقمية',
  },
} as const;

export function localizeBlogMetadata<T extends { slug: string; readingTime?: string }>(post: T, locale: LocaleLike) {
  if (!isArabic(locale) || !(post.slug in blogArabic)) return post;
  const translated = blogArabic[post.slug as keyof typeof blogArabic];

  return {
    ...post,
    ...translated,
    readingTime: post.readingTime?.replace('min read', 'دقائق قراءة'),
  };
}

export function getSectionText(key: LocalizedStringKey, locale: LocaleLike) {
  const value = sectionText[key];
  return value[isArabic(locale) ? 'ar' : 'en'];
}
