import React from 'react';

type Props = { locale: string };

const features = {
  en: [
    {
      title: 'Expert Ophthalmology Team',
      body: 'Prof. Ahmed Hossam Abdalla, Professor of Ophthalmology, and Dr. Mohamed Hossam Abdalla, Ophthalmologist, bring deep specialist experience in laser vision correction, retinal disease management, glaucoma, and complex eye surgery. Every patient is seen by a qualified ophthalmologist — not a general practitioner.',
    },
    {
      title: 'Surgical & Laser Eye Care',
      body: 'We offer LASIK laser vision correction surgery and cataract surgery with a full choice of premium intraocular lenses — monofocal, multifocal, extended depth of focus (EDOF), and toric lenses for astigmatism. Surgical planning and follow-up care are included as part of each patient pathway.',
    },
    {
      title: 'Retinal, Glaucoma & Dry Eye Treatment',
      body: 'Our medical eye care covers retinal disease including diabetic retinopathy and macular conditions, glaucoma diagnosis and ongoing management with medication, laser, or surgery, and a personalised dry eye treatment plan that addresses the root cause of each patient\'s symptoms.',
    },
    {
      title: 'OCT Retina Scanning Technology',
      body: 'Both clinic locations use Optical Coherence Tomography (OCT) retina scanning, which produces high-resolution cross-sectional images of the retinal layers. This enables early detection of macular degeneration, glaucoma damage, and diabetic eye changes — often before any symptoms appear.',
    },
    {
      title: 'Arabic & English Consultations',
      body: 'All clinic consultations are available in both Arabic and English. Every member of our team communicates fluently in both languages, so patients always receive a clear explanation of their diagnosis, test results, and treatment options in the language they are most comfortable with.',
    },
    {
      title: 'Sat–Wed, 12 PM–9 PM | Two Locations',
      body: 'Both the Smouha branch (Wataneya Medical Center, 14th May Street, 4th floor) and the Raml Station branch (22 Al-Ghorfa Al-Togareya Street, 3rd floor) are open Saturday through Wednesday from 12:00 PM to 9:00 PM, making it easy to book around school, work, or family commitments.',
    },
  ],
  ar: [
    {
      title: 'فريق طبي متخصص',
      body: 'يقود الفريق أ.د. أحمد حسام عبد الله أستاذ طب وجراحة العيون، مع د. محمد حسام عبد الله أخصائي طب العيون — يمتلك الطاقم خبرة متخصصة في تصحيح الإبصار بالليزر وإدارة أمراض الشبكية والجلوكوما والجراحات المعقدة. كل مريض يُفحص من قِبل طبيب عيون متخصص.',
    },
    {
      title: 'جراحات الليزك والمياه البيضاء',
      body: 'نجري عمليات الليزك لتصحيح الإبصار وجراحة المياه البيضاء مع طيف كامل من العدسات المزروعة المتقدمة — أحادية البؤرة، ومتعددة البؤر، وعمق التركيز الممتد (EDOF)، وعدسات التوريك للاستجماتيزم. التخطيط الجراحي والمتابعة جزء أساسي من كل مسار علاجي.',
    },
    {
      title: 'علاج الشبكية والجلوكوما وجفاف العين',
      body: 'تشمل رعايتنا الطبية أمراض الشبكية كاعتلال الشبكية السكري وأمراض البقعة الصفراء، وتشخيص الجلوكوما وإدارتها بالدواء والليزر والجراحة، فضلاً عن خطة علاجية شخصية لجفاف العين تعالج السبب الجذري لأعراض كل مريض.',
    },
    {
      title: 'تصوير OCT للشبكية',
      body: 'يستخدم كلا الفرعين تصوير الشبكية بالتماسك الضوئي (OCT) الذي يُنتج صوراً مقطعية عالية الدقة لطبقات الشبكية، مما يُتيح الكشف المبكر عن أمراض البقعة الصفراء وتلف الجلوكوما والتغيرات السكرية — في أغلب الأحيان قبل ظهور أي أعراض.',
    },
    {
      title: 'استشارات بالعربية والإنجليزية',
      body: 'جميع الاستشارات متاحة باللغتين العربية والإنجليزية. كل فرد في فريقنا يتواصل بطلاقة في اللغتين، بحيث يحصل كل مريض على شرح واضح لتشخيصه ونتائج الفحوصات وخيارات العلاج باللغة التي يُفضّلها.',
    },
    {
      title: 'السبت–الأربعاء، 12 ظهراً–9 مساءً | فرعان',
      body: 'كلا الفرعين — سموحة (المركز الطبي الوطنية، شارع 14 مايو، الدور الرابع) ومحطة الرمل (22 شارع الغرفة التجارية، الدور الثالث) — مفتوحان من السبت إلى الأربعاء من الساعة 12 ظهراً حتى 9 مساءً، مما يُسهّل الحجز حول مواعيد المدرسة أو العمل أو الالتزامات الأسرية.',
    },
  ],
};

const servingContent = {
  en: {
    eyebrow: 'Our Community',
    heading: 'Serving Patients Across Alexandria',
    paragraphs: [
      'Abdalla Eye Clinic is built on a straightforward commitment: make specialist ophthalmology care genuinely accessible to patients throughout Alexandria and the surrounding areas. We believe every person in this city deserves the same standard of expert, honest eye care — and that belief shapes every decision we make about how we run our clinics.',
      'Our Smouha branch at Wataneya Medical Center (14th May Street, 4th floor) is easily reachable from Smouha, Sporting, Cleopatra, San Stefano, and the surrounding neighbourhoods. Our Raml Station branch (22 Al-Ghorfa Al-Togareya Street, 3rd floor) is well-placed for patients in the city centre and those travelling by bus or tram from across Alexandria.',
      'We proudly serve individuals and families of all ages: adults looking for a reliable annual eye check or an updated glasses prescription, seniors monitoring cataracts or age-related macular changes, office workers and students experiencing eye strain from screen use, diabetic patients who need annual retinal screening to protect their vision, and children whose parents want to ensure healthy visual development from an early age. Whatever brings you to us, you will find a team that takes the time to listen, explains clearly, and works with you on the best path for your vision.',
    ],
  },
  ar: {
    eyebrow: 'مجتمعنا',
    heading: 'نخدم مرضانا في الإسكندرية',
    paragraphs: [
      'بُنيت عيادة عبد الله للعيون على التزام واضح: جعل رعاية طب العيون المتخصصة في متناول مرضى الإسكندرية وضواحيها بصورة حقيقية. نؤمن بأن لكل شخص في هذه المدينة الحق في الحصول على معايير رعاية عين متخصصة وأمينة — وهذا الإيمان يُوجّه كل قرار نتخذه في إدارة عياداتنا.',
      'يمكن الوصول إلى فرع سموحة في المركز الطبي الوطنية (شارع 14 مايو، الدور الرابع) بسهولة من سموحة والسيوف وكليوباترا وسان ستيفانو والأحياء المجاورة. أما فرع محطة الرمل (22 شارع الغرفة التجارية، الدور الثالث) فيتوفر في موقع مميز لمرضى وسط المدينة والقادمين بالأتوبيس أو الترام من مختلف أنحاء الإسكندرية.',
      'نفخر بخدمة أفراد وعائلات من جميع الأعمار: بالغون يبحثون عن فحص سنوي موثوق أو وصفة نظارات محدّثة، وكبار سن يُتابعون المياه البيضاء أو أمراض البقعة الصفراء المرتبطة بالتقدم في السن، وموظفون وطلاب يعانون من إجهاد العين جراء استخدام الشاشات، ومرضى السكري الذين يحتاجون إلى فحص الشبكية السنوي للحفاظ على بصرهم، وأطفال يحرص أهلهم على دعم نموهم البصري السليم منذ سن مبكرة. مهما كان سبب زيارتك، ستجد فريقاً يُخصص وقته للاستماع إليك ويشرح بوضوح ويعمل معك لإيجاد أفضل مسار لصحة عينيك.',
    ],
  },
};

export function WhyChooseSection({ locale }: Props) {
  const isArabic = locale === 'ar';
  const featureList = isArabic ? features.ar : features.en;
  const sc = isArabic ? servingContent.ar : servingContent.en;

  return (
    <>
      {/* ── Why Choose section ── */}
      <section
        className="section-shell bg-medical-50 px-3 py-12 transition-colors duration-300 dark:bg-gray-950 sm:px-4 sm:py-16 md:py-24"
        aria-labelledby="why-choose-heading"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center sm:mb-12">
            <span className="eyebrow mb-4">
              {isArabic ? 'لماذا نحن' : 'Expert Eye Care'}
            </span>
            <h2
              id="why-choose-heading"
              className="mb-4 mt-3 text-3xl font-bold text-slate-950 dark:text-white md:text-4xl"
            >
              {isArabic ? 'لماذا تختار عيادة عبد الله للعيون' : 'Why Choose Abdalla Eye Clinic'}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-gray-300">
              {isArabic
                ? 'فرعان في الإسكندرية. أطباء عيون متخصصون. تقنيات تشخيص حديثة. طيف كامل من خدمات العيون من الفحوصات الروتينية إلى الجراحات المعقدة.'
                : 'Two Alexandria locations. Experienced ophthalmologists. Modern diagnostic technology. Full-range eye care from routine exams to complex surgery.'}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {featureList.map((feature) => (
              <div
                key={feature.title}
                className={`creative-card rounded-lg border border-white/80 bg-white/92 p-6 shadow-elegant backdrop-blur transition-colors duration-200 hover:-translate-y-1 hover:shadow-elegant-lg dark:border-white/10 dark:bg-gray-900/85 ${isArabic ? 'text-right' : ''}`}
              >
                <h3 className="mb-3 text-base font-bold text-cyan-800 dark:text-cyan-200">
                  {feature.title}
                </h3>
                <p className="text-sm leading-6 text-slate-700 dark:text-gray-300">
                  {feature.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Serving Alexandria section ── */}
      <section
        className="bg-white px-3 py-12 transition-colors duration-300 dark:bg-gray-900 sm:px-4 sm:py-16 md:py-24"
        aria-labelledby="serving-heading"
      >
        <div className={`mx-auto max-w-3xl ${isArabic ? 'text-right' : ''}`}>
          <div className={`mb-8 sm:mb-10 ${isArabic ? 'text-right' : 'text-center'}`}>
            <span className="eyebrow mb-4">{sc.eyebrow}</span>
            <h2
              id="serving-heading"
              className="mb-4 mt-3 text-3xl font-bold text-slate-950 dark:text-white md:text-4xl"
            >
              {sc.heading}
            </h2>
          </div>
          <div className="space-y-5">
            {sc.paragraphs.map((para, i) => (
              <p key={i} className="text-lg leading-8 text-slate-600 dark:text-gray-300">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
