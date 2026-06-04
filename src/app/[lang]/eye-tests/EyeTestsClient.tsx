'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { whatsAppHref } from '@/lib/clinic';
import { classNames } from '@/utils';

type EyeTestsClientProps = {
  locale: string;
};

type TestKey = 'color' | 'amsler' | 'contrast' | 'symptoms' | 'near';
type NearEyeKey = 'left' | 'right';
type NearLocale = 'en' | 'ar';
type NearCategory = 'good' | 'mild' | 'poor';

type LeadFormData = {
  name: string;
  phone: string;
  email: string;
};

type ResultLevel = 'neutral' | 'reassuring' | 'monitor' | 'followUp' | 'urgent';

const copy = {
  en: {
    eyebrow: 'Professional online screening',
    title: 'Interactive eye screening checks',
    intro:
      'These checks are designed for online use: color discrimination, central vision distortion, contrast sensitivity, near vision, and symptom triage. They improve screening quality without pretending to replace a calibrated clinic exam.',
    disclaimer:
      'Online screening is affected by screen brightness, device color, room lighting, and viewing distance. It cannot diagnose disease or replace an ophthalmologist exam.',
    urgent:
      'Seek urgent eye care now for sudden vision loss, severe eye pain, new flashes or floaters, trauma, or a curtain-like shadow.',
    calibrationTitle: 'Before you start',
    calibration: [
      'Use a bright screen in a well-lit room.',
      'Wear your usual glasses or contact lenses.',
      'Test one eye at a time when the instruction says so.',
      'Do not use results to delay medical care.',
    ],
    tabs: {
      color: 'Ishihara plates',
      amsler: 'Central vision',
      contrast: 'Contrast',
      symptoms: 'Symptoms',
      near: 'Near vision',
    },
    start: 'Start check',
    colorTitle: 'Ishihara color plate screening',
    colorHelp:
      'Read the number you see on each Ishihara plate. Plates that are tracing-only have been removed. Each plate shown is worth one point when answered correctly.',
    colorInstruction: 'Type the number you see, or choose Nothing if you cannot see a number.',
    reset: 'Start from the beginning',
    colorScore: 'Ishihara score',
    plate: 'Plate',
    answer: 'What number do you see?',
    nothing: 'Nothing',
    previousPlate: 'Previous plate',
    nextPlate: 'Next plate',
    finishPlate: 'Finish color test',
    colorResultNormal: 'Ishihara result: no signs of color blindness on this online screening.',
    colorResultBorderline: 'Ishihara result: borderline. A clinic retest with calibrated plates is recommended.',
    colorResultDeficient: 'Ishihara result: suggestive of red-green color vision deficiency. Please book a formal color vision test.',
    colorResultIncomplete: 'Complete the Ishihara plates to show your score.',
    deficiencyPattern: 'Pattern note',
    amslerTitle: 'Amsler grid central vision check',
    amslerHelp:
      'Cover one eye, look only at the center dot, then repeat with the other eye. Report what you see without moving your gaze around the grid.',
    eyeTested: 'Eye tested',
    rightEye: 'Right eye',
    leftEye: 'Left eye',
    bothEyes: 'Both eyes',
    amslerOptions: {
      straight: 'Lines look straight and complete',
      wavy: 'Wavy or bent lines',
      missing: 'Missing or dark area',
      blurry: 'Blurred central area',
      different: 'One eye looks different from the other',
    },
    contrastTitle: 'Contrast sensitivity check',
    contrastHelp:
      'Select the faintest row you can read comfortably. This is not an acuity chart; it checks how well contrast is perceived.',
    contrastRows: {
      high: 'High contrast',
      medium: 'Medium contrast',
      low: 'Low contrast',
      veryLow: 'Very low contrast',
    },
    symptomsTitle: 'Ophthalmology symptom triage',
    symptomsHelp: 'Select any symptoms you have noticed. Urgent symptoms will be highlighted clearly.',
    symptomsList: {
      suddenLoss: 'Sudden vision loss',
      pain: 'Severe eye pain',
      flashes: 'New flashes or floaters',
      redness: 'Red painful eye',
      diabetes: 'Diabetes with vision changes',
      night: 'Difficulty seeing at night',
      dryness: 'Dryness, burning, or tearing',
      headache: 'Headache or eye strain',
    },
    resultTitle: 'Screening result',
    score: 'Score',
    riskScore: 'Risk score',
    notCompleted: 'Not completed yet',
    amslerScoreTitle: 'Central vision score',
    amslerInterpretationReassuring:
      'Your Amsler answer is reassuring on this online screen. Keep in mind that subtle central vision changes can still need a clinic exam.',
    amslerInterpretationFollowUp:
      'Distortion, missing areas, blur, or a difference between eyes can be associated with macular or retinal conditions and should be checked in clinic.',
    contrastScoreTitle: 'Contrast sensitivity score',
    contrastInterpretationExcellent:
      'You selected the faintest contrast row, which is reassuring for this online contrast screen.',
    contrastInterpretationMild:
      'You could read a low contrast row, but not the faintest row. This can happen from screen conditions, dry eye, cataract, glasses prescription, or other eye health factors.',
    contrastInterpretationReduced:
      'Only higher contrast text was comfortable. Reduced contrast sensitivity can affect night driving and daily visual quality, so a comprehensive eye exam is recommended.',
    symptomsScoreTitle: 'Symptom triage score',
    symptomsInterpretationReassuring:
      'No symptoms were selected. This is reassuring, but annual comprehensive eye exams remain important for prevention and early detection.',
    symptomsInterpretationMonitor:
      'Mild symptoms can be caused by dryness, eye strain, refractive error, cataract, or other common conditions. A non-urgent comprehensive eye exam can identify the cause.',
    symptomsInterpretationFollowUp:
      'Your selected symptoms suggest that a clinic review is appropriate, especially if symptoms are new, worsening, or affecting daily activities.',
    symptomsInterpretationUrgent:
      'Urgent symptoms were selected. Please contact an eye doctor or emergency service now, especially for sudden vision loss, severe pain, new flashes/floaters, or a red painful eye.',
    nearTitle: 'Near-vision screening at 40 cm',
    nearHelp:
      'Hold your screen about 40 cm away and keep browser zoom at 100%. Test the right eye first, then the left eye, and select the letters you can read in the exact order shown.',
    nearDistance: 'Test distance: 40 cm from screen',
    nearStepLeft: 'Cover your right eye and test your left eye.',
    nearStepRight: 'Cover your left eye and test your right eye.',
    nearLine: 'Near-vision line',
    nearSelectedLetters: 'Selected letters',
    nearSelectLetters: 'Select the letters you can read',
    nearNoLettersSelected: 'No letters selected yet',
    nearCannotRead: 'I cannot read this line',
    nearSubmitLine: 'Submit line',
    nearClear: 'Clear',
    nearReset: 'Start from the beginning',
    nearScoreTitle: 'Near-vision score',
    nearLeftResultTitle: 'Left eye near-vision result',
    nearRightResultTitle: 'Right eye near-vision result',
    nearSmallestLine: 'Smallest line read',
    nearGoodCategory: 'Good vision',
    nearMildCategory: 'Mild difficulty',
    nearPoorCategory: 'Moderate or poor score',
    nearGoodRecommendation: 'Good vision: recommend routine checkup.',
    nearMildRecommendation: 'Mild difficulty: recommend eye examination.',
    nearPoorRecommendation: 'Moderate or poor score: strongly recommend booking an appointment.',
    nearIncomplete: 'Complete both eyes to show your near-vision score.',
    bookComprehensiveExam: 'Book a comprehensive eye exam',
    annualCheckup:
      'Even if your screening looks reassuring, schedule an annual eye checkup to protect long-term eye health.',
    colorContactTitle: 'Your details',
    colorContactText: 'Complete all five checks, then enter your details to view the full screening report. Your report will be shown immediately on this page.',
    showResults: 'Show my results',
    finalColorTitle: 'Color vision screening result',
    finalReportTitle: 'Your eye screening report',
    completeAllTests: 'Complete all five checks to unlock your report.',
    noSymptoms: 'No symptoms noticed',
    interpretationTitle: 'Educational interpretation',
    recommendationTitle: 'Recommendation',
    colorInterpretationNormal:
      'Your answers show no signs of color blindness on this online Ishihara-style screen. This is a screening result only and does not replace a calibrated clinic test.',
    colorInterpretationBorderline:
      'A borderline score can happen from screen brightness, viewing distance, fatigue, or a mild color discrimination difference.',
    colorInterpretationDeficient:
      'Your answers are suggestive of red-green color vision deficiency. An online screen cannot confirm the exact type or severity, so a formal color vision test is recommended.',
    colorRecommendationNormal:
      'Keep routine comprehensive eye exams, especially if you need color recognition for work, driving, or study.',
    colorRecommendationBorderline:
      'Repeat the check in good lighting and consider a calibrated clinic color vision test for a reliable result.',
    colorRecommendationDeficient:
      'Book a formal color vision assessment with an ophthalmologist or optometrist, particularly if this affects school, work, or daily tasks.',
    resultNeutral: 'Complete at least one check to generate a screening summary.',
    resultReassuring: 'No high-risk answers selected. A routine comprehensive eye exam is still recommended.',
    resultMonitor: 'Some mild changes were selected. Consider booking a non-urgent eye exam.',
    resultFollowUp: 'Your answers suggest a clinic follow-up would be appropriate.',
    resultUrgent: 'Urgent symptoms selected. Please contact an eye doctor or emergency service now.',
    completed: 'Completed checks',
    accuracyTitle: 'Reliability note',
    leadTitle: 'Your details',
    leadText: 'Enter your details to view the screening result.',
    name: 'Full name',
    phone: 'Phone number',
    email: 'Email address',
    preferredContact: 'Preferred contact',
    concern: 'Anything else you noticed?',
    submit: 'Show results',
    success: 'Your details were saved for this result view.',
    error: 'Something went wrong. Please call the clinic if the issue continues.',
    required: 'This field is required',
    invalidEmail: 'Enter a valid email address',
    scoreCtaText:
      'Scored lower than expected? Protect your vision by scheduling a professional, calibrated eye exam at our Smouha or Raml Station branches.',
    scoreCtaButton: 'Book an Appointment / احجز موعدك الآن',
    scoreCtaAria: 'Book a calibrated eye exam on WhatsApp',
    whatsappBookingMessage:
      'Hello Abdalla Eye Clinic. I scored lower than expected on the online eye test and would like to schedule a professional, calibrated eye exam at Smouha or Raml Station.',
  },
  ar: {
    eyebrow: 'فحص أولي احترافي على الموقع',
    title: 'فحوصات عيون تفاعلية',
    intro:
      'هذه الفحوصات مناسبة للاستخدام على الموقع: تمييز الألوان، تشوه الرؤية المركزية، حساسية التباين، الرؤية القريبة، وفرز الأعراض. الهدف تحسين جودة الفحص الأولي دون اعتباره بديلاً عن فحص العيادة.',
    disclaimer:
      'يتأثر الفحص على الموقع بسطوع الشاشة وألوان الجهاز وإضاءة الغرفة والمسافة. لا يشخص مرضاً ولا يغني عن فحص طبيب العيون.',
    urgent:
      'اطلب رعاية عيون عاجلة عند فقدان مفاجئ للنظر، ألم شديد، ومضات أو عوائم جديدة، إصابة، أو ظل يشبه الستارة.',
    calibrationTitle: 'قبل البدء',
    calibration: [
      'استخدم شاشة ساطعة في غرفة جيدة الإضاءة.',
      'ارتد النظارة أو العدسات المعتادة.',
      'اختبر كل عين وحدها عندما يطلب منك ذلك.',
      'لا تستخدم النتيجة لتأجيل الرعاية الطبية.',
    ],
    tabs: {
      color: 'لوحات إيشيهارا',
      amsler: 'الرؤية المركزية',
      contrast: 'التباين',
      symptoms: 'الأعراض',
      near: 'الرؤية القريبة',
    },
    start: 'ابدأ الفحص',
    colorTitle: 'فحص ألوان إيشيهارا',
    colorHelp:
      'اكتب الرقم الذي تراه في كل لوحة من لوحات إيشيهارا. تمت إزالة اللوحات التي تعتمد على التتبع. كل لوحة ظاهرة تساوي نقطة واحدة عند الإجابة الصحيحة.',
    colorInstruction: 'اكتب الرقم الذي تراه، أو اختر لا أرى شيئاً إذا لم يظهر رقم.',
    reset: 'ابدأ من البداية',
    colorScore: 'درجة إيشيهارا',
    plate: 'لوحة',
    answer: 'ما الرقم الذي تراه؟',
    nothing: 'لا أرى شيئاً',
    previousPlate: 'اللوحة السابقة',
    nextPlate: 'اللوحة التالية',
    finishPlate: 'إنهاء فحص الألوان',
    colorResultNormal: 'نتيجة إيشيهارا: لا توجد علامات على عمى الألوان في هذا الفحص الإلكتروني.',
    colorResultBorderline: 'نتيجة إيشيهارا: حدية. يفضل إعادة الفحص في العيادة بلوحات معايرة.',
    colorResultDeficient: 'نتيجة إيشيهارا: قد تشير إلى ضعف في تمييز الأحمر والأخضر. يرجى حجز فحص ألوان رسمي.',
    colorResultIncomplete: 'أكمل لوحات إيشيهارا لعرض النتيجة.',
    deficiencyPattern: 'ملاحظة النمط',
    amslerTitle: 'شبكة أمسلر لفحص الرؤية المركزية',
    amslerHelp:
      'غط عيناً واحدة، انظر فقط إلى النقطة في المنتصف، ثم كرر بالعين الأخرى. سجل ما تراه دون تحريك النظر داخل الشبكة.',
    eyeTested: 'العين المختبرة',
    rightEye: 'العين اليمنى',
    leftEye: 'العين اليسرى',
    bothEyes: 'كلتا العينين',
    amslerOptions: {
      straight: 'الخطوط مستقيمة وكاملة',
      wavy: 'خطوط متموجة أو منحنية',
      missing: 'منطقة مفقودة أو داكنة',
      blurry: 'زغللة في المركز',
      different: 'هناك فرق بين العينين',
    },
    contrastTitle: 'فحص حساسية التباين',
    contrastHelp:
      'اختر أضعف سطر تستطيع قراءته بارتياح. هذا ليس اختبار حدة إبصار، بل يفحص قدرة العين على تمييز التباين.',
    contrastRows: {
      high: 'تباين عال',
      medium: 'تباين متوسط',
      low: 'تباين منخفض',
      veryLow: 'تباين منخفض جداً',
    },
    symptomsTitle: 'فرز أعراض طب العيون',
    symptomsHelp: 'اختر أي أعراض لاحظتها. سيتم توضيح الأعراض العاجلة بوضوح.',
    symptomsList: {
      suddenLoss: 'فقدان مفاجئ للنظر',
      pain: 'ألم شديد في العين',
      flashes: 'ومضات أو عوائم جديدة',
      redness: 'احمرار مؤلم في العين',
      diabetes: 'سكري مع تغير في النظر',
      night: 'صعوبة الرؤية ليلاً',
      dryness: 'جفاف أو حرقان أو دموع',
      headache: 'صداع أو إجهاد العين',
    },
    resultTitle: 'نتيجة الفحص الأولي',
    score: 'الدرجة',
    riskScore: 'درجة الخطورة',
    notCompleted: 'لم يكتمل بعد',
    amslerScoreTitle: 'درجة الرؤية المركزية',
    amslerInterpretationReassuring:
      'إجابتك في شبكة أمسلر مطمئنة في هذا الفحص الإلكتروني. مع ذلك قد تحتاج التغيرات الدقيقة في مركز الإبصار إلى فحص عيادة.',
    amslerInterpretationFollowUp:
      'وجود اعوجاج أو مناطق مفقودة أو زغللة أو فرق بين العينين قد يرتبط بمشكلات في مركز الإبصار أو الشبكية ويحتاج إلى فحص في العيادة.',
    contrastScoreTitle: 'درجة حساسية التباين',
    contrastInterpretationExcellent:
      'اخترت أضعف سطر في التباين، وهذا مطمئن في هذا الفحص الإلكتروني.',
    contrastInterpretationMild:
      'استطعت قراءة سطر منخفض التباين لكن ليس الأضعف. قد يحدث ذلك بسبب ظروف الشاشة أو جفاف العين أو المياه البيضاء أو مقاس النظارة أو عوامل أخرى.',
    contrastInterpretationReduced:
      'كانت القراءة المريحة فقط مع التباين الأعلى. انخفاض حساسية التباين قد يؤثر في القيادة ليلاً وجودة الرؤية اليومية، لذلك يفضل فحص عين شامل.',
    symptomsScoreTitle: 'درجة فرز الأعراض',
    symptomsInterpretationReassuring:
      'لم يتم اختيار أعراض. هذا مطمئن، لكن فحص العين الشامل السنوي يظل مهماً للوقاية والاكتشاف المبكر.',
    symptomsInterpretationMonitor:
      'الأعراض البسيطة قد تنتج عن جفاف أو إجهاد أو مقاس نظارة أو مياه بيضاء أو أسباب شائعة أخرى. فحص عين شامل غير عاجل يساعد على تحديد السبب.',
    symptomsInterpretationFollowUp:
      'الأعراض المختارة تشير إلى أن مراجعة العيادة مناسبة، خاصة إذا كانت جديدة أو تزداد أو تؤثر على النشاط اليومي.',
    symptomsInterpretationUrgent:
      'تم اختيار أعراض عاجلة. يرجى التواصل مع طبيب عيون أو الطوارئ الآن، خاصة مع فقدان مفاجئ للنظر أو ألم شديد أو ومضات/عوائم جديدة أو احمرار مؤلم.',
    nearTitle: 'فحص الرؤية القريبة على مسافة 40 سم',
    nearHelp:
      'اجعل الشاشة على مسافة 40 سم تقريباً مع ضبط تكبير المتصفح على 100%. اختبر العين اليمنى أولاً ثم العين اليسرى، واختر الحروف التي تستطيع قراءتها بنفس الترتيب الظاهر.',
    nearDistance: 'مسافة الاختبار: 40 سم من الشاشة',
    nearStepLeft: 'غط العين اليمنى واختبر العين اليسرى.',
    nearStepRight: 'غط العين اليسرى واختبر العين اليمنى.',
    nearLine: 'سطر الرؤية القريبة',
    nearSelectedLetters: 'الحروف المختارة',
    nearSelectLetters: 'اختر الحروف العربية التي تستطيع قراءتها',
    nearNoLettersSelected: 'لم يتم اختيار حروف بعد',
    nearCannotRead: 'لا أستطيع قراءة هذا السطر',
    nearSubmitLine: 'تأكيد السطر',
    nearClear: 'مسح',
    nearReset: 'ابدأ من البداية',
    nearScoreTitle: 'درجة الرؤية القريبة',
    nearLeftResultTitle: 'نتيجة الرؤية القريبة للعين اليسرى',
    nearRightResultTitle: 'نتيجة الرؤية القريبة للعين اليمنى',
    nearSmallestLine: 'أصغر سطر تمت قراءته',
    nearGoodCategory: 'رؤية جيدة',
    nearMildCategory: 'صعوبة بسيطة',
    nearPoorCategory: 'نتيجة متوسطة أو ضعيفة',
    nearGoodRecommendation: 'رؤية جيدة: ننصح بالفحص الدوري.',
    nearMildRecommendation: 'صعوبة بسيطة: ننصح بإجراء فحص عين.',
    nearPoorRecommendation: 'نتيجة متوسطة أو ضعيفة: ننصح بشدة بحجز موعد.',
    nearIncomplete: 'أكمل اختبار العينين لعرض درجة الرؤية القريبة.',
    bookComprehensiveExam: 'احجز فحص عين شامل',
    annualCheckup:
      'حتى إذا كانت نتيجة الفحص مطمئنة، احرص على فحص سنوي لصحة العين والاكتشاف المبكر.',
    colorContactTitle: 'بياناتك',
    colorContactText: 'أكمل الفحوصات الخمسة، ثم أدخل بياناتك لعرض التقرير الكامل فوراً على هذه الصفحة.',
    showResults: 'عرض النتيجة',
    finalColorTitle: 'نتيجة فحص تمييز الألوان',
    finalReportTitle: 'تقرير فحوصات العين',
    completeAllTests: 'أكمل الفحوصات الخمسة لفتح التقرير.',
    noSymptoms: 'لا توجد أعراض ملحوظة',
    interpretationTitle: 'تفسير تعليمي',
    recommendationTitle: 'التوصية',
    colorInterpretationNormal:
      'إجاباتك لا تظهر علامات على عمى الألوان في هذا الفحص الإلكتروني بأسلوب إيشيهارا. هذه نتيجة فحص أولي ولا تغني عن اختبار معاير في العيادة.',
    colorInterpretationBorderline:
      'النتيجة الحدية قد تحدث بسبب سطوع الشاشة أو المسافة أو الإرهاق أو فرق بسيط في تمييز الألوان.',
    colorInterpretationDeficient:
      'إجاباتك قد تشير إلى ضعف في تمييز الأحمر والأخضر. لا يستطيع الفحص الإلكتروني تأكيد النوع أو الشدة بدقة، لذلك يفضل إجراء فحص ألوان رسمي.',
    colorRecommendationNormal:
      'حافظ على فحص العين الدوري، خصوصاً إذا كان تمييز الألوان مهماً للعمل أو القيادة أو الدراسة.',
    colorRecommendationBorderline:
      'أعد الفحص في إضاءة جيدة، ويفضل إجراء فحص ألوان معاير في العيادة للحصول على نتيجة موثوقة.',
    colorRecommendationDeficient:
      'احجز فحص تمييز ألوان رسمي لدى طبيب عيون أو أخصائي بصريات، خاصة إذا أثرت النتيجة على الدراسة أو العمل أو الحياة اليومية.',
    resultNeutral: 'أكمل اختباراً واحداً على الأقل لعرض ملخص الفحص.',
    resultReassuring: 'لم يتم اختيار إجابات عالية الخطورة. يظل فحص العين الشامل الدوري مهماً.',
    resultMonitor: 'تم اختيار بعض التغيرات البسيطة. يفضل حجز فحص غير عاجل.',
    resultFollowUp: 'إجاباتك تشير إلى أن المتابعة في العيادة مناسبة.',
    resultUrgent: 'تم اختيار أعراض عاجلة. يرجى التواصل مع طبيب عيون أو الطوارئ الآن.',
    completed: 'الفحوصات المكتملة',
    accuracyTitle: 'ملاحظة عن الاعتمادية',
    leadTitle: 'بياناتك',
    leadText: 'أدخل بياناتك لعرض نتيجة الفحص.',
    name: 'الاسم الكامل',
    phone: 'رقم الهاتف',
    email: 'البريد الإلكتروني',
    preferredContact: 'طريقة التواصل المفضلة',
    concern: 'أي ملاحظات أخرى؟',
    submit: 'عرض النتيجة',
    success: 'تم حفظ البيانات لعرض النتيجة.',
    error: 'حدث خطأ. يرجى الاتصال بالعيادة إذا استمرت المشكلة.',
    required: 'هذا الحقل مطلوب',
    invalidEmail: 'أدخل بريداً إلكترونياً صحيحاً',
    scoreCtaText:
      'هل كانت نتيجتك أقل من المتوقع؟ احمِ نظرك بحجز فحص عين احترافي ومعاير في فرعي سموحة أو محطة الرمل.',
    scoreCtaButton: 'Book an Appointment / احجز موعدك الآن',
    scoreCtaAria: 'احجز فحص عين معاير عبر واتساب',
    whatsappBookingMessage:
      'مرحباً عيادة عبد الله للعيون. نتيجتي في فحص العين على الموقع كانت أقل من المتوقع وأرغب في حجز فحص عين احترافي ومعاير في فرع سموحة أو محطة الرمل.',
  },
} as const;

const ishiharaPlates = [
  { plate: 1, page: 4, answer: '8', deficientAnswer: '3' },
  { plate: 2, page: 5, answer: '29', deficientAnswer: '70' },
  { plate: 3, page: 6, answer: '5', deficientAnswer: '2' },
  { plate: 4, page: 7, answer: '3', deficientAnswer: '5' },
  { plate: 5, page: 8, answer: '15', deficientAnswer: '17' },
  { plate: 6, page: 9, answer: '74', deficientAnswer: '21' },
  { plate: 7, page: 10, answer: '6', deficientAnswer: 'nothing' },
  { plate: 8, page: 11, answer: '45', deficientAnswer: 'nothing' },
  { plate: 9, page: 12, answer: '5', deficientAnswer: 'nothing' },
  { plate: 10, page: 13, answer: '7', deficientAnswer: 'nothing' },
  { plate: 11, page: 14, answer: '16', deficientAnswer: 'nothing' },
  { plate: 12, page: 15, answer: '73', deficientAnswer: 'nothing' },
  { plate: 13, page: 16, answer: 'nothing', deficientAnswer: '5' },
  { plate: 14, page: 17, answer: 'nothing', deficientAnswer: '2' },
] as const;

const totalIshiharaScore = ishiharaPlates.length;

const contrastRows = [
  { key: 'high', word: 'VISION', opacity: 0.92 },
  { key: 'medium', word: 'RETINA', opacity: 0.64 },
  { key: 'low', word: 'FOCUS', opacity: 0.42 },
  { key: 'veryLow', word: 'CLARITY', opacity: 0.25 },
] as const;

const nearVisionLines = [
  {
    id: 1,
    acuity: 'N24',
    fontSize: '24pt',
    letters: { en: ['C', 'D', 'H', 'K', 'N'], ar: ['ح', 'د', 'ر', 'س', 'ك'] },
  },
  {
    id: 2,
    acuity: 'N18',
    fontSize: '18pt',
    letters: { en: ['O', 'R', 'S', 'V', 'Z'], ar: ['م', 'ن', 'ع', 'ط', 'ف'] },
  },
  {
    id: 3,
    acuity: 'N14',
    fontSize: '14pt',
    letters: { en: ['K', 'N', 'C', 'Z', 'R'], ar: ['ق', 'ل', 'ب', 'ص', 'ح'] },
  },
  {
    id: 4,
    acuity: 'N10',
    fontSize: '10pt',
    letters: { en: ['S', 'V', 'D', 'H', 'O'], ar: ['د', 'ك', 'م', 'س', 'ن'] },
  },
  {
    id: 5,
    acuity: 'N8',
    fontSize: '8pt',
    letters: { en: ['Z', 'C', 'R', 'N', 'K'], ar: ['ع', 'ط', 'ف', 'ق', 'ل'] },
  },
  {
    id: 6,
    acuity: 'N6',
    fontSize: '6pt',
    letters: { en: ['D', 'O', 'S', 'H', 'V'], ar: ['ب', 'ص', 'ح', 'د', 'ر'] },
  },
  {
    id: 7,
    acuity: 'N5',
    fontSize: '5pt',
    letters: { en: ['N', 'K', 'Z', 'C', 'R'], ar: ['س', 'ك', 'م', 'ن', 'ع'] },
  },
] as const;

const nearLetterOptions = {
  en: ['C', 'D', 'H', 'K', 'N', 'O', 'R', 'S', 'V', 'Z'],
  ar: ['ح', 'د', 'ر', 'س', 'ك', 'م', 'ن', 'ع', 'ط', 'ف', 'ق', 'ل', 'ب', 'ص'],
} as const;
const totalNearVisionScore = nearVisionLines.length;
type NearVisionLine = (typeof nearVisionLines)[number];
type NearVisionPlateSet = Record<NearEyeKey, Record<NearLocale, Record<number, string[]>>>;

const urgentSymptoms = ['suddenLoss', 'pain', 'flashes', 'redness'];
const followUpSymptoms = ['diabetes'];
const mildSymptoms = ['night', 'dryness', 'headache'];

function shuffleNearLetters(letters: readonly string[]) {
  const shuffled = [...letters];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

function createNearLineLetters(locale: NearLocale, line: NearVisionLine, previousLetters?: readonly string[]) {
  const letterCount = line.letters[locale].length;
  const previous = previousLetters?.join('');

  for (let attempt = 0; attempt < 8; attempt += 1) {
    const candidate = shuffleNearLetters(nearLetterOptions[locale]).slice(0, letterCount);
    if (!previous || candidate.join('') !== previous) return candidate;
  }

  const fallback = shuffleNearLetters(nearLetterOptions[locale]).slice(0, letterCount);
  return fallback.length > 1 ? [...fallback.slice(1), fallback[0]] : fallback;
}

function createNearVisionPlateSet(): NearVisionPlateSet {
  const plateSet: NearVisionPlateSet = {
    left: { en: {}, ar: {} },
    right: { en: {}, ar: {} },
  };

  (['en', 'ar'] as NearLocale[]).forEach((locale) => {
    nearVisionLines.forEach((line) => {
      const rightLetters = createNearLineLetters(locale, line);
      const leftLetters = createNearLineLetters(locale, line, rightLetters);
      plateSet.right[locale][line.id] = rightLetters;
      plateSet.left[locale][line.id] = leftLetters;
    });
  });

  return plateSet;
}

function getNearLineLetters(line: NearVisionLine, locale: NearLocale, eye: NearEyeKey, plateSet: NearVisionPlateSet) {
  return plateSet[eye][locale][line.id] ?? line.letters[locale];
}

function nearAnswerIsCorrect(
  answer: string[] | undefined,
  line: NearVisionLine,
  locale: NearLocale,
  eye: NearEyeKey,
  plateSet: NearVisionPlateSet
) {
  return Boolean(answer) && answer?.join('') === getNearLineLetters(line, locale, eye, plateSet).join('');
}

function getNearLastCorrectLineIndex(
  answers: Record<number, string[]>,
  locale: NearLocale,
  eye: NearEyeKey,
  plateSet: NearVisionPlateSet
) {
  let lastCorrectIndex = -1;

  for (let index = 0; index < nearVisionLines.length; index += 1) {
    const line = nearVisionLines[index];
    const answer = answers[line.id];

    if (!answer) break;
    if (!nearAnswerIsCorrect(answer, line, locale, eye, plateSet)) break;

    lastCorrectIndex = index;
  }

  return lastCorrectIndex;
}

function getNearCategory(lastCorrectLineIndex: number): NearCategory {
  if (lastCorrectLineIndex >= 5) return 'good';
  if (lastCorrectLineIndex >= 3) return 'mild';
  return 'poor';
}

function normalizeIshiharaAnswer(value: string) {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[٠-٩]/g, (digit) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)))
    .replace(/[۰-۹]/g, (digit) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)));
  if (!normalized || ['none', 'nothing', 'no', 'n/a', 'لا', 'لا ارى', 'لا أرى', 'nothing visible'].includes(normalized)) {
    return 'nothing';
  }

  return normalized.replace(/\D/g, '') || normalized;
}

function ResultBadge({ level, label }: { level: ResultLevel; label: string }) {
  const classes = {
    neutral: 'border-slate-200 bg-slate-50 text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200',
    reassuring: 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-500/35 dark:bg-emerald-500/10 dark:text-emerald-100',
    monitor: 'border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-500/35 dark:bg-amber-400/10 dark:text-amber-100',
    followUp: 'border-cyan-200 bg-cyan-50 text-cyan-950 dark:border-cyan-500/35 dark:bg-cyan-400/10 dark:text-cyan-100',
    urgent: 'border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-500/35 dark:bg-rose-500/10 dark:text-rose-100',
  };

  return (
    <div className={classNames('rounded-lg border px-4 py-3 text-sm font-bold leading-6', classes[level])}>
      {label}
    </div>
  );
}

function ScorePanel({
  title,
  scoreLabel,
  score,
  level,
  interpretation,
  recommendation,
  appointmentHref,
  appointmentLabel,
}: {
  title: string;
  scoreLabel: string;
  score: string;
  level: ResultLevel;
  interpretation: string;
  recommendation: string;
  appointmentHref: string;
  appointmentLabel: string;
}) {
  return (
    <div className="mt-7 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950/55">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.12em] text-cyan-800 dark:text-cyan-200">{title}</p>
          <p className="mt-2 text-2xl font-black text-slate-950 dark:text-white">
            {scoreLabel}: {score}
          </p>
        </div>
        <ResultBadge level={level} label={interpretation} />
      </div>
      <div className="mt-4 rounded-lg border border-cyan-100 bg-white p-4 text-sm font-semibold leading-6 text-slate-700 dark:border-cyan-900/60 dark:bg-slate-900 dark:text-slate-200">
        <p>{recommendation}</p>
        <Link
          href={appointmentHref}
          className="mt-4 inline-flex rounded-lg bg-cyan-700 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-cyan-800 dark:bg-cyan-600 dark:hover:bg-cyan-500"
        >
          {appointmentLabel}
        </Link>
      </div>
    </div>
  );
}

function TestPromptPanel({
  title,
  message,
  accuracyTitle,
  disclaimer,
}: {
  title: string;
  message: string;
  accuracyTitle: string;
  disclaimer: string;
}) {
  return (
    <>
      <h2 className="text-xl font-bold text-slate-950 dark:text-white">{title}</h2>
      <div className="mt-3">
        <ResultBadge level="neutral" label={message} />
      </div>
      <div className="mt-4 rounded-lg border border-cyan-100 bg-cyan-50 p-4 text-sm leading-6 text-cyan-950 dark:border-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-50">
        <p className="font-bold">{accuracyTitle}</p>
        <p className="mt-1">{disclaimer}</p>
      </div>
    </>
  );
}

function ProfessionalExamCta({
  message,
  buttonLabel,
  href,
  ariaLabel,
}: {
  message: string;
  buttonLabel: string;
  href: string;
  ariaLabel: string;
}) {
  return (
    <div className="mt-4 rounded-lg border border-emerald-200 bg-[linear-gradient(135deg,#ecfdf5_0%,#f0fdfa_54%,#eff6ff_100%)] p-4 shadow-sm dark:border-emerald-500/35 dark:bg-[linear-gradient(135deg,rgba(6,78,59,0.45)_0%,rgba(8,47,73,0.5)_100%)] sm:p-5">
      <p className="text-sm font-bold leading-6 text-slate-900 dark:text-emerald-50 sm:text-base">
        {message}
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-3 text-center text-sm font-black text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400 dark:focus:ring-offset-slate-950 sm:w-auto"
      >
        {buttonLabel}
      </a>
    </div>
  );
}

function NearVisionResultCard({
  title,
  lineLabel,
  score,
  category,
  categoryLabel,
  recommendation,
}: {
  title: string;
  lineLabel: string;
  score: string;
  category: NearCategory;
  categoryLabel: string;
  recommendation: string;
}) {
  const categoryClasses = {
    good: 'bg-emerald-700 text-white dark:bg-emerald-500 dark:text-slate-950',
    mild: 'bg-amber-600 text-white dark:bg-amber-400 dark:text-slate-950',
    poor: 'bg-rose-700 text-white dark:bg-rose-500 dark:text-white',
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200">
      <p className="font-black text-slate-950 dark:text-white">{title}</p>
      <p className="mt-2 text-2xl font-black text-cyan-900 dark:text-cyan-100">{score}</p>
      <p className="mt-1 font-semibold">{lineLabel}</p>
      <span className={classNames('mt-3 inline-flex rounded-full px-3 py-1 text-xs font-black', categoryClasses[category])}>
        {categoryLabel}
      </span>
      <p className="mt-2">{recommendation}</p>
    </div>
  );
}

export default function EyeTestsClient({ locale }: EyeTestsClientProps) {
  const isArabic = locale === 'ar';
  const nearLocale = isArabic ? 'ar' : 'en';
  const t = isArabic ? copy.ar : copy.en;
  const [activeTest, setActiveTest] = useState<TestKey>('color');
  const [currentPlateIndex, setCurrentPlateIndex] = useState(0);
  const [ishiharaAnswers, setIshiharaAnswers] = useState<Record<number, string>>({});
  const [amslerEye, setAmslerEye] = useState('right');
  const [amslerFindings, setAmslerFindings] = useState<string[]>([]);
  const [contrast, setContrast] = useState('');
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [symptomsReviewed, setSymptomsReviewed] = useState(false);
  const [nearEye, setNearEye] = useState<NearEyeKey>('right');
  const [nearLineIndex, setNearLineIndex] = useState(0);
  const [nearAnswers, setNearAnswers] = useState<Record<NearEyeKey, Record<number, string[]>>>({
    left: {},
    right: {},
  });
  const [nearCompletedEyes, setNearCompletedEyes] = useState<Record<NearEyeKey, boolean>>({
    left: false,
    right: false,
  });
  const [nearPlateSet, setNearPlateSet] = useState<NearVisionPlateSet>(() => createNearVisionPlateSet());
  const [showColorResults, setShowColorResults] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormData>();

  const currentPlate = ishiharaPlates[currentPlateIndex];
  const currentNearLine = nearVisionLines[nearLineIndex];
  const currentNearLetters = getNearLineLetters(currentNearLine, nearLocale, nearEye, nearPlateSet);
  const currentNearLetterOptions = nearLetterOptions[nearLocale];
  const currentNearAnswer = nearAnswers[nearEye][currentNearLine.id] ?? [];
  const colorCompleted = ishiharaPlates.every((plate) => ishiharaAnswers[plate.plate] !== undefined);
  const colorScore = ishiharaPlates.filter((plate) => {
    return normalizeIshiharaAnswer(ishiharaAnswers[plate.plate] ?? '') === plate.answer;
  }).length;
  const colorScoreRatio = totalIshiharaScore > 0 ? colorScore / totalIshiharaScore : 0;
  const redGreenMatches = ishiharaPlates.filter((plate) => {
    return 'deficientAnswer' in plate && normalizeIshiharaAnswer(ishiharaAnswers[plate.plate] ?? '') === plate.deficientAnswer;
  }).length;
  const protanMatches = ishiharaPlates.filter((plate) => {
    return 'protanAnswer' in plate && normalizeIshiharaAnswer(ishiharaAnswers[plate.plate] ?? '') === plate.protanAnswer;
  }).length;
  const deutanMatches = ishiharaPlates.filter((plate) => {
    return 'deutanAnswer' in plate && normalizeIshiharaAnswer(ishiharaAnswers[plate.plate] ?? '') === plate.deutanAnswer;
  }).length;
  const colorResultText = !colorCompleted
    ? t.colorResultIncomplete
    : colorScoreRatio >= 0.85
      ? t.colorResultNormal
      : colorScoreRatio >= 0.7
        ? t.colorResultBorderline
        : t.colorResultDeficient;
  const colorResultCategory = !colorCompleted
    ? 'incomplete'
    : colorScoreRatio >= 0.85
      ? 'normal'
      : colorScoreRatio >= 0.7
        ? 'borderline'
        : 'deficient';
  const colorInterpretation =
    colorResultCategory === 'normal'
      ? t.colorInterpretationNormal
      : colorResultCategory === 'borderline'
        ? t.colorInterpretationBorderline
        : t.colorInterpretationDeficient;
  const colorRecommendation =
    colorResultCategory === 'normal'
      ? t.colorRecommendationNormal
      : colorResultCategory === 'borderline'
        ? t.colorRecommendationBorderline
        : t.colorRecommendationDeficient;
  const deficiencyPattern = protanMatches > deutanMatches
    ? 'protan tendency'
    : deutanMatches > protanMatches
      ? 'deutan tendency'
      : redGreenMatches >= 4
        ? 'red-green pattern'
        : 'no clear pattern';
  const hasAmsler = amslerFindings.length > 0;
  const hasSymptoms = symptoms.length > 0;
  const symptomsCompleted = symptomsReviewed;
  const nearCompleted = nearCompletedEyes.left && nearCompletedEyes.right;
  const nearLeftLastCorrectLineIndex = getNearLastCorrectLineIndex(nearAnswers.left, nearLocale, 'left', nearPlateSet);
  const nearRightLastCorrectLineIndex = getNearLastCorrectLineIndex(nearAnswers.right, nearLocale, 'right', nearPlateSet);
  const nearLeftScore = nearLeftLastCorrectLineIndex + 1;
  const nearRightScore = nearRightLastCorrectLineIndex + 1;
  const nearLeftCategory = getNearCategory(nearLeftLastCorrectLineIndex);
  const nearRightCategory = getNearCategory(nearRightLastCorrectLineIndex);
  const nearLevel: ResultLevel = !nearCompleted
    ? 'neutral'
    : nearLeftCategory === 'poor' || nearRightCategory === 'poor'
      ? 'followUp'
      : nearLeftCategory === 'mild' || nearRightCategory === 'mild'
        ? 'monitor'
        : 'reassuring';
  const nearInterpretation = !nearCompleted
    ? t.nearIncomplete
    : nearLevel === 'reassuring'
      ? t.nearGoodRecommendation
      : nearLevel === 'monitor'
        ? t.nearMildRecommendation
        : t.nearPoorRecommendation;
  const completedCount = [colorCompleted, hasAmsler, Boolean(contrast), symptomsCompleted, nearCompleted].filter(Boolean).length;
  const allTestsCompleted = colorCompleted && hasAmsler && Boolean(contrast) && symptomsCompleted && nearCompleted;
  const appointmentHref = `/${locale}/appointments`;
  const whatsappBookingHref = whatsAppHref(t.whatsappBookingMessage) ?? appointmentHref;

  const amslerAbnormalFindings = amslerFindings.filter((finding) => finding !== 'straight');
  const amslerDeductions = amslerAbnormalFindings.reduce((total, finding) => {
    if (finding === 'missing') return total + 3;
    if (finding === 'wavy' || finding === 'blurry') return total + 2;
    return total + 1;
  }, 0);
  const amslerScore = hasAmsler ? Math.max(0, 5 - amslerDeductions) : null;
  const amslerLevel: ResultLevel = !hasAmsler ? 'neutral' : amslerAbnormalFindings.length > 0 ? 'followUp' : 'reassuring';
  const amslerInterpretation = !hasAmsler
    ? t.notCompleted
    : amslerAbnormalFindings.length > 0
      ? t.amslerInterpretationFollowUp
      : t.amslerInterpretationReassuring;

  const contrastScores: Record<string, number> = {
    high: 1,
    medium: 2,
    low: 3,
    veryLow: 4,
  };
  const contrastScore = contrast ? contrastScores[contrast] : null;
  const contrastLevel: ResultLevel = !contrast
    ? 'neutral'
    : contrast === 'veryLow'
      ? 'reassuring'
      : contrast === 'low'
        ? 'monitor'
        : 'followUp';
  const contrastInterpretation = !contrast
    ? t.notCompleted
    : contrast === 'veryLow'
      ? t.contrastInterpretationExcellent
      : contrast === 'low'
        ? t.contrastInterpretationMild
        : t.contrastInterpretationReduced;

  const symptomRiskScore = symptoms.reduce((total, symptom) => {
    if (urgentSymptoms.includes(symptom)) return total + 3;
    if (followUpSymptoms.includes(symptom)) return total + 2;
    if (mildSymptoms.includes(symptom)) return total + 1;
    return total;
  }, 0);
  const symptomLevel: ResultLevel = symptoms.some((symptom) => urgentSymptoms.includes(symptom))
    ? 'urgent'
    : symptoms.some((symptom) => followUpSymptoms.includes(symptom))
      ? 'followUp'
      : symptoms.length > 0
        ? 'monitor'
        : 'reassuring';
  const symptomsInterpretation = symptomLevel === 'urgent'
    ? t.symptomsInterpretationUrgent
    : symptomLevel === 'followUp'
      ? t.symptomsInterpretationFollowUp
      : symptomLevel === 'monitor'
        ? t.symptomsInterpretationMonitor
        : t.symptomsInterpretationReassuring;
  const comprehensiveExamRecommendation = `${t.bookComprehensiveExam}. ${t.annualCheckup}`;
  const nearScoreText = (lastCorrectLineIndex: number) =>
    lastCorrectLineIndex >= 0
      ? `${nearVisionLines[lastCorrectLineIndex].acuity} (${lastCorrectLineIndex + 1}/${totalNearVisionScore})`
      : `0/${totalNearVisionScore}`;
  const nearCategoryLabel = (category: NearCategory) => {
    if (category === 'good') return t.nearGoodCategory;
    if (category === 'mild') return t.nearMildCategory;
    return t.nearPoorCategory;
  };
  const nearCategoryRecommendation = (category: NearCategory) => {
    if (category === 'good') return t.nearGoodRecommendation;
    if (category === 'mild') return t.nearMildRecommendation;
    return t.nearPoorRecommendation;
  };
  const nearLeftScoreText = nearCompletedEyes.left ? nearScoreText(nearLeftLastCorrectLineIndex) : t.notCompleted;
  const nearRightScoreText = nearCompletedEyes.right ? nearScoreText(nearRightLastCorrectLineIndex) : t.notCompleted;

  const resultLevel: ResultLevel = useMemo(() => {
    if (symptoms.some((symptom) => urgentSymptoms.includes(symptom))) return 'urgent';
    if (amslerFindings.some((finding) => finding !== 'straight')) return 'followUp';
    if (colorCompleted && colorScoreRatio < 0.7) return 'followUp';
    if (nearCompleted && (nearLeftCategory === 'poor' || nearRightCategory === 'poor')) return 'followUp';
    if (colorCompleted && colorScoreRatio < 0.85) return 'monitor';
    if (nearCompleted && (nearLeftCategory === 'mild' || nearRightCategory === 'mild')) return 'monitor';
    if (contrast === 'high' || contrast === 'medium' || symptoms.length > 0) return 'monitor';
    if (completedCount > 0) return 'reassuring';
    return 'neutral';
  }, [amslerFindings, colorCompleted, colorScoreRatio, completedCount, contrast, nearCompleted, nearLeftCategory, nearRightCategory, symptoms]);

  const resultText = {
    neutral: t.resultNeutral,
    reassuring: t.resultReassuring,
    monitor: t.resultMonitor,
    followUp: t.resultFollowUp,
    urgent: t.resultUrgent,
  }[resultLevel];

  const summary = useMemo(() => {
    const lines = [
      `${t.completed}: ${completedCount}/5`,
      colorCompleted ? `${t.tabs.color}: ${colorScore}/${totalIshiharaScore}; ${colorResultText}; ${t.deficiencyPattern}: ${deficiencyPattern}` : null,
      hasAmsler ? `${t.tabs.amsler}: ${amslerScore}/5; ${amslerInterpretation}; ${amslerFindings.map((key) => t.amslerOptions[key as keyof typeof t.amslerOptions]).join(', ')} (${amslerEye})` : null,
      contrast ? `${t.tabs.contrast}: ${contrastScore}/4; ${contrastInterpretation}; ${t.contrastRows[contrast as keyof typeof t.contrastRows]}` : null,
      symptomsCompleted ? `${t.tabs.symptoms}: ${symptomRiskScore}; ${symptomsInterpretation}${hasSymptoms ? `; ${symptoms.map((key) => t.symptomsList[key as keyof typeof t.symptomsList]).join(', ')}` : `; ${t.noSymptoms}`}` : null,
      nearCompleted ? `${t.tabs.near}: ${t.rightEye} ${nearRightScoreText}; ${t.leftEye} ${nearLeftScoreText}; ${nearInterpretation}` : null,
      t.annualCheckup,
      resultText,
    ];

    return lines.filter(Boolean).join(' | ');
  }, [amslerEye, amslerFindings, amslerInterpretation, amslerScore, colorCompleted, colorResultText, colorScore, completedCount, contrast, contrastInterpretation, contrastScore, deficiencyPattern, hasAmsler, hasSymptoms, nearCompleted, nearInterpretation, nearLeftScoreText, nearRightScoreText, resultText, symptomRiskScore, symptoms, symptomsCompleted, symptomsInterpretation, t]);

  const toggleAmsler = (key: string) => {
    setShowColorResults(false);
    setSubmitStatus({ type: null, message: '' });
    setAmslerFindings((current) => {
      if (key === 'straight') return ['straight'];
      const withoutStraight = current.filter((finding) => finding !== 'straight');
      return withoutStraight.includes(key)
        ? withoutStraight.filter((finding) => finding !== key)
        : [...withoutStraight, key];
    });
  };

  const toggleSymptom = (key: string) => {
    setSymptomsReviewed(true);
    setShowColorResults(false);
    setSubmitStatus({ type: null, message: '' });
    setSymptoms((current) =>
      current.includes(key) ? current.filter((symptom) => symptom !== key) : [...current, key]
    );
  };

  const updateNearAnswer = (letters: string[]) => {
    setShowColorResults(false);
    setSubmitStatus({ type: null, message: '' });
    setNearAnswers((current) => ({
      ...current,
      [nearEye]: {
        ...current[nearEye],
        [currentNearLine.id]: letters,
      },
    }));
  };

  const finishNearEye = () => {
    setNearCompletedEyes((current) => ({
      ...current,
      [nearEye]: true,
    }));

    if (nearEye === 'right') {
      setNearEye('left');
      setNearLineIndex(0);
    }
  };

  const submitNearLine = () => {
    const lineIsCorrect = nearAnswerIsCorrect(currentNearAnswer, currentNearLine, nearLocale, nearEye, nearPlateSet);

    if (!lineIsCorrect || nearLineIndex === nearVisionLines.length - 1) {
      finishNearEye();
      return;
    }

    setNearLineIndex((index) => index + 1);
  };

  const resetNearVision = () => {
    setNearEye('right');
    setNearLineIndex(0);
    setNearAnswers({ left: {}, right: {} });
    setNearCompletedEyes({ left: false, right: false });
    setNearPlateSet(createNearVisionPlateSet());
    setShowColorResults(false);
    setSubmitStatus({ type: null, message: '' });
  };

  const nearChartFontFamily = isArabic
    ? 'Tahoma, Arial, sans-serif'
    : '"Times New Roman", Georgia, serif';

  const onSubmit = async (data: LeadFormData) => {
    setSubmitStatus({ type: null, message: '' });
    try {
      const response = await fetch('/api/eye-test-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          locale,
          colorScore,
          totalIshiharaScore,
          colorResultCategory,
          deficiencyPattern,
          summary,
          ishiharaAnswers,
          amslerEye,
          amslerFindings,
          amslerScore,
          amslerInterpretation,
          contrast,
          contrastScore,
          contrastInterpretation,
          symptoms,
          symptomsReviewed,
          symptomRiskScore,
          symptomsInterpretation,
          nearAnswers,
          nearCompletedEyes,
          nearPlateSet,
          nearLeftScore,
          nearRightScore,
          nearLeftScoreText,
          nearRightScoreText,
          nearLeftCategory,
          nearRightCategory,
          nearInterpretation,
          allTestsCompleted,
        }),
      });

      if (!response.ok) {
        throw new Error('Eye test lead request failed');
      }

      setShowColorResults(true);
      setSubmitStatus({ type: 'success', message: t.success });
    } catch {
      setSubmitStatus({ type: 'error', message: t.error });
    }
  };

  return (
    <div className="bg-slate-50 transition-colors duration-300 dark:bg-slate-950">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0">
          <Image
            src="/assets/images/hero-ophthalmologist.webp"
            alt="Ophthalmologist performing an eye examination at Abdalla Eye Clinic"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.96),rgba(2,6,23,0.78)_48%,rgba(2,6,23,0.36))]" />
        </div>
        <div className="relative mx-auto grid min-h-[32rem] max-w-7xl items-center gap-8 px-4 py-12 lg:grid-cols-[1fr_28rem] lg:py-16">
          <div>
            <span className="eyebrow mb-5 border-white/20 bg-white/12 text-cyan-50">{t.eyebrow}</span>
            <h1 className="max-w-4xl text-4xl font-black leading-tight md:text-6xl">{t.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-cyan-50/86">{t.intro}</p>
            <div className="mt-7 rounded-lg border border-amber-300/30 bg-amber-300/12 p-4 text-sm font-semibold leading-6 text-amber-50">
              {t.urgent}
            </div>
          </div>
          <div className="rounded-lg border border-white/15 bg-white/12 p-5 backdrop-blur-md">
            <h2 className="text-xl font-bold">{t.calibrationTitle}</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-cyan-50/88">
              {t.calibration.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 flex-none rounded-full bg-cyan-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
        <div className="grid gap-6 lg:grid-cols-[1fr_25rem]">
          <section className="overflow-hidden rounded-lg border border-white/80 bg-white shadow-elegant dark:border-cyan-900/50 dark:bg-slate-900">
            <div className="border-b border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/50">
              <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
                {(Object.keys(t.tabs) as TestKey[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveTest(key)}
                    className={classNames(
                      'min-h-12 rounded-lg border px-3 py-2 text-sm font-bold transition-colors',
                      activeTest === key
                        ? 'border-cyan-700 bg-cyan-700 text-white'
                        : 'border-slate-200 bg-white text-slate-800 hover:bg-cyan-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-cyan-950'
                    )}
                  >
                    {t.tabs[key]}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5 sm:p-7">
              {activeTest === 'color' && (
                <div>
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-950 dark:text-white">{t.colorTitle}</h2>
                      <p className="mt-2 max-w-3xl text-slate-600 dark:text-slate-300">{t.colorHelp}</p>
                      <p className="mt-2 text-sm font-semibold text-cyan-800 dark:text-cyan-200">{t.colorInstruction}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIshiharaAnswers({});
                        setCurrentPlateIndex(0);
                        setShowColorResults(false);
                        setSubmitStatus({ type: null, message: '' });
                      }}
                      className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
                    >
                      {t.reset}
                    </button>
                  </div>

                  <div className="mt-7 grid gap-6 xl:grid-cols-[minmax(0,1fr)_18rem]">
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950/50 sm:p-5">
                      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                        <p className="text-sm font-black text-slate-900 dark:text-white">
                          {t.plate} {currentPlateIndex + 1} / {ishiharaPlates.length}
                        </p>
                      </div>
                      <div className="relative mx-auto aspect-[595/842] w-full max-w-[56rem] overflow-hidden rounded-lg bg-white shadow-inner">
                        <Image
                          key={currentPlate.page}
                          src={`/assets/images/ishihara/ishihara-page-${String(currentPlate.page).padStart(2, '0')}.webp`}
                          alt={`Ishihara color test slide ${currentPlateIndex + 1}`}
                          fill
                          sizes="(min-width: 1280px) 704px, 100vw"
                          className="object-contain"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-950">
                      <label className="block text-sm font-bold text-slate-900 dark:text-white" htmlFor="ishihara-answer">
                        {t.answer}
                      </label>
                      <input
                        id="ishihara-answer"
                        inputMode="numeric"
                        value={ishiharaAnswers[currentPlate.plate] ?? ''}
                        onChange={(event) => {
                          setIshiharaAnswers((current) => ({
                            ...current,
                            [currentPlate.plate]: event.target.value,
                          }));
                          setShowColorResults(false);
                          setSubmitStatus({ type: null, message: '' });
                        }}
                        className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-lg font-bold text-slate-950 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setIshiharaAnswers((current) => ({
                            ...current,
                            [currentPlate.plate]: 'nothing',
                          }));
                          setShowColorResults(false);
                          setSubmitStatus({ type: null, message: '' });
                        }}
                        className="mt-3 w-full rounded-lg border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm font-bold text-cyan-900 hover:bg-cyan-100 dark:border-cyan-800 dark:bg-cyan-950 dark:text-cyan-100"
                      >
                        {t.nothing}
                      </button>

                      <div className="mt-5 grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setCurrentPlateIndex((index) => Math.max(0, index - 1))}
                          disabled={currentPlateIndex === 0}
                          className="rounded-lg border border-slate-200 px-3 py-3 text-sm font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-45 dark:border-slate-700 dark:text-slate-100"
                        >
                          {t.previousPlate}
                        </button>
                        <button
                          type="button"
                          onClick={() => setCurrentPlateIndex((index) => Math.min(ishiharaPlates.length - 1, index + 1))}
                          disabled={currentPlateIndex === ishiharaPlates.length - 1}
                          className="rounded-lg bg-cyan-700 px-3 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-45"
                        >
                          {currentPlateIndex === ishiharaPlates.length - 1 ? t.finishPlate : t.nextPlate}
                        </button>
                      </div>

                      <div className="mt-5 rounded-lg border border-cyan-100 bg-cyan-50 p-4 text-sm leading-6 text-cyan-950 dark:border-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-50">
                        <p className="font-black">{t.colorScore}: {colorScore}/{totalIshiharaScore}</p>
                        <p className="mt-2">{colorResultText}</p>
                        {colorCompleted && (
                          <p className="mt-2">
                            {t.deficiencyPattern}: {deficiencyPattern}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTest === 'amsler' && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-950 dark:text-white">{t.amslerTitle}</h2>
                  <p className="mt-2 max-w-3xl text-slate-600 dark:text-slate-300">{t.amslerHelp}</p>
                  <div className="mt-6 grid gap-7 xl:grid-cols-[28rem_1fr]">
                    <div className="relative aspect-square w-full rounded-lg border border-slate-300 bg-white dark:border-slate-700">
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.34)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.34)_1px,transparent_1px)] bg-[size:26px_26px]" />
                      <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-700" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-900 dark:text-white">{t.eyeTested}</label>
                      <div className="mt-2 grid grid-cols-3 gap-2">
                        {[
                          ['right', t.rightEye],
                          ['left', t.leftEye],
                          ['both', t.bothEyes],
                        ].map(([value, label]) => (
                          <button
                            key={value}
                            type="button"
                            onClick={() => {
                              setAmslerEye(value);
                              setShowColorResults(false);
                              setSubmitStatus({ type: null, message: '' });
                            }}
                            className={classNames(
                              'rounded-lg border px-3 py-3 text-sm font-bold',
                              amslerEye === value
                                ? 'border-cyan-700 bg-cyan-700 text-white'
                                : 'border-slate-200 bg-white text-slate-800 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100'
                            )}
                          >
                            {label}
                          </button>
                        ))}
                      </div>

                      <div className="mt-5 grid gap-2">
                        {Object.entries(t.amslerOptions).map(([key, label]) => (
                          <button
                            key={key}
                            type="button"
                            onClick={() => toggleAmsler(key)}
                            className={classNames(
                              'rounded-lg border px-4 py-3 text-left text-sm font-bold transition-colors rtl:text-right',
                              amslerFindings.includes(key)
                                ? 'border-cyan-700 bg-cyan-700 text-white'
                                : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100'
                            )}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTest === 'contrast' && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-950 dark:text-white">{t.contrastTitle}</h2>
                  <p className="mt-2 max-w-3xl text-slate-600 dark:text-slate-300">{t.contrastHelp}</p>
                  <div className="mt-6 grid gap-4">
                    {contrastRows.map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => {
                          setContrast(item.key);
                          setShowColorResults(false);
                          setSubmitStatus({ type: null, message: '' });
                        }}
                        className={classNames(
                          'rounded-lg border bg-white px-5 py-6 text-left transition-colors rtl:text-right dark:bg-slate-950',
                          contrast === item.key
                            ? 'border-cyan-700 ring-2 ring-cyan-500'
                            : 'border-slate-200 hover:bg-slate-50 dark:border-slate-700'
                        )}
                      >
                        <span className="block text-sm font-bold text-slate-500">{t.contrastRows[item.key]}</span>
                        <span
                          className="mt-2 block text-4xl font-black tracking-[0.16em] text-slate-950 dark:text-white md:text-5xl"
                          style={{ opacity: item.opacity }}
                        >
                          {item.word}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeTest === 'symptoms' && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-950 dark:text-white">{t.symptomsTitle}</h2>
                  <p className="mt-2 max-w-3xl text-slate-600 dark:text-slate-300">{t.symptomsHelp}</p>
                  <div className="mt-6 grid gap-3 md:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSymptoms([]);
                        setSymptomsReviewed(true);
                        setShowColorResults(false);
                        setSubmitStatus({ type: null, message: '' });
                      }}
                      className={classNames(
                        'rounded-lg border px-4 py-4 text-left text-sm font-bold transition-colors rtl:text-right',
                        symptomsReviewed && symptoms.length === 0
                          ? 'border-emerald-700 bg-emerald-700 text-white'
                          : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100'
                      )}
                    >
                      {t.noSymptoms}
                    </button>
                    {Object.entries(t.symptomsList).map(([key, label]) => {
                      const isUrgent = urgentSymptoms.includes(key);
                      const active = symptoms.includes(key);

                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => toggleSymptom(key)}
                          className={classNames(
                            'rounded-lg border px-4 py-4 text-left text-sm font-bold transition-colors rtl:text-right',
                            active && isUrgent
                              ? 'border-rose-700 bg-rose-700 text-white'
                              : active
                                ? 'border-cyan-700 bg-cyan-700 text-white'
                                : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100'
                          )}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTest === 'near' && (
                <div>
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-950 dark:text-white">{t.nearTitle}</h2>
                      <p className="mt-2 max-w-3xl text-slate-600 dark:text-slate-300">{t.nearHelp}</p>
                    </div>
                    <button
                      type="button"
                      onClick={resetNearVision}
                      className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
                    >
                      {t.nearReset}
                    </button>
                  </div>

                  <div className="mt-5 rounded-lg border border-cyan-100 bg-cyan-50 p-4 text-sm font-bold leading-6 text-cyan-950 dark:border-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-50">
                    {t.nearDistance}
                  </div>

                  {nearCompleted ? (
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                      <NearVisionResultCard
                        title={t.nearRightResultTitle}
                        lineLabel={t.nearSmallestLine}
                        score={nearRightScoreText}
                        category={nearRightCategory}
                        categoryLabel={nearCategoryLabel(nearRightCategory)}
                        recommendation={nearCategoryRecommendation(nearRightCategory)}
                      />
                      <NearVisionResultCard
                        title={t.nearLeftResultTitle}
                        lineLabel={t.nearSmallestLine}
                        score={nearLeftScoreText}
                        category={nearLeftCategory}
                        categoryLabel={nearCategoryLabel(nearLeftCategory)}
                        recommendation={nearCategoryRecommendation(nearLeftCategory)}
                      />
                    </div>
                  ) : (
                    <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_19rem]">
                      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950/50 sm:p-6">
                        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-black uppercase tracking-[0.12em] text-cyan-800 dark:text-cyan-200">
                              {nearEye === 'left' ? t.leftEye : t.rightEye}
                            </p>
                            <p className="mt-1 text-sm font-bold text-slate-700 dark:text-slate-200">
                              {nearEye === 'left' ? t.nearStepLeft : t.nearStepRight}
                            </p>
                          </div>
                          <p className="rounded-full bg-white px-3 py-2 text-sm font-black text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white">
                            {t.nearLine} {nearLineIndex + 1}/{nearVisionLines.length} · {currentNearLine.acuity}
                          </p>
                        </div>

                        <div className="flex min-h-[16rem] items-center justify-center rounded-lg border border-slate-200 bg-white p-5 text-center shadow-inner dark:border-slate-700 dark:bg-slate-900">
                          <div
                            dir={isArabic ? 'rtl' : 'ltr'}
                            className="flex flex-wrap justify-center gap-[1em] font-semibold leading-tight text-slate-950 dark:text-white"
                            style={{ fontFamily: nearChartFontFamily, fontSize: currentNearLine.fontSize }}
                            aria-label={`${t.nearLine} ${currentNearLine.acuity}`}
                          >
                            {currentNearLetters.map((letter, index) => (
                              <span key={`${currentNearLine.id}-${letter}-${index}`}>{letter}</span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-950">
                        <p className="text-sm font-black text-slate-900 dark:text-white">{t.nearSelectLetters}</p>
                        <div
                          dir={isArabic ? 'rtl' : 'ltr'}
                          className={classNames(
                            'mt-3 min-h-14 rounded-lg border border-dashed border-cyan-200 bg-cyan-50 px-4 py-3 text-2xl font-black text-cyan-950 dark:border-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-50',
                            currentNearAnswer.length === 0 && 'text-sm leading-8 text-slate-500 dark:text-slate-300'
                          )}
                          style={{ fontFamily: currentNearAnswer.length > 0 ? nearChartFontFamily : undefined }}
                        >
                          {currentNearAnswer.length > 0 ? currentNearAnswer.join(' ') : t.nearNoLettersSelected}
                        </div>

                        <div className={classNames('mt-4 grid gap-2', isArabic ? 'grid-cols-4' : 'grid-cols-5')}>
                          {currentNearLetterOptions.map((letter) => (
                            <button
                              key={letter}
                              type="button"
                              onClick={() => {
                                if (currentNearAnswer.length >= currentNearLetters.length) return;
                                updateNearAnswer([...currentNearAnswer, letter]);
                              }}
                              className="min-h-12 rounded-lg border border-cyan-200 bg-cyan-50 text-xl font-black text-cyan-950 transition-colors hover:bg-cyan-100 dark:border-cyan-800 dark:bg-cyan-950 dark:text-cyan-50 dark:hover:bg-cyan-900"
                              style={{ fontFamily: nearChartFontFamily }}
                            >
                              {letter}
                            </button>
                          ))}
                        </div>

                        <div className="mt-4 grid gap-2">
                          <button
                            type="button"
                            onClick={() => updateNearAnswer([])}
                            className="rounded-lg border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
                          >
                            {t.nearClear}
                          </button>
                          <button
                            type="button"
                            onClick={submitNearLine}
                            className="rounded-lg bg-cyan-700 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-cyan-800 dark:bg-cyan-600 dark:hover:bg-cyan-500"
                          >
                            {t.nearSubmitLine}
                          </button>
                          <button
                            type="button"
                            onClick={finishNearEye}
                            className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-bold text-amber-950 hover:bg-amber-100 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-100"
                          >
                            {t.nearCannotRead}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>

          <aside className="h-fit rounded-lg border border-white/80 bg-white p-5 shadow-elegant dark:border-cyan-900/50 dark:bg-slate-900 lg:p-6">
            {!allTestsCompleted && activeTest === 'color' && (
              <>
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">{t.colorScore}</h2>
                <ResultBadge level={colorCompleted ? (colorResultCategory === 'normal' ? 'reassuring' : colorResultCategory === 'borderline' ? 'monitor' : 'followUp') : 'neutral'} label={colorResultText} />
                <div className="mt-4 rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-700 dark:bg-slate-950/65 dark:text-slate-200">
                  <p className="font-bold">
                    {t.score}: {colorScore}/{totalIshiharaScore}
                  </p>
                  <p className="mt-2">
                    {colorCompleted ? `${t.deficiencyPattern}: ${deficiencyPattern}` : `${t.plate} ${currentPlateIndex + 1} / ${ishiharaPlates.length}`}
                  </p>
                  {!colorCompleted && <p className="mt-2">{t.colorInstruction}</p>}
                </div>
                <div className="mt-4 rounded-lg border border-cyan-100 bg-cyan-50 p-4 text-sm leading-6 text-cyan-950 dark:border-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-50">
                  <p className="font-bold">{t.accuracyTitle}</p>
                  <p className="mt-1">{t.disclaimer}</p>
                </div>
              </>
            )}

            {!allTestsCompleted && activeTest === 'amsler' && (
              hasAmsler ? (
                <ScorePanel
                  title={t.amslerScoreTitle}
                  scoreLabel={t.score}
                  score={`${amslerScore}/5`}
                  level={amslerLevel}
                  interpretation={amslerInterpretation}
                  recommendation={comprehensiveExamRecommendation}
                  appointmentHref={appointmentHref}
                  appointmentLabel={t.bookComprehensiveExam}
                />
              ) : (
                <TestPromptPanel title={t.amslerScoreTitle} message={t.notCompleted} accuracyTitle={t.accuracyTitle} disclaimer={t.disclaimer} />
              )
            )}

            {!allTestsCompleted && activeTest === 'contrast' && (
              contrast ? (
                <ScorePanel
                  title={t.contrastScoreTitle}
                  scoreLabel={t.score}
                  score={`${contrastScore}/4`}
                  level={contrastLevel}
                  interpretation={contrastInterpretation}
                  recommendation={comprehensiveExamRecommendation}
                  appointmentHref={appointmentHref}
                  appointmentLabel={t.bookComprehensiveExam}
                />
              ) : (
                <TestPromptPanel title={t.contrastScoreTitle} message={t.notCompleted} accuracyTitle={t.accuracyTitle} disclaimer={t.disclaimer} />
              )
            )}

            {!allTestsCompleted && activeTest === 'symptoms' && (
              symptomsCompleted ? (
                <ScorePanel
                  title={t.symptomsScoreTitle}
                  scoreLabel={t.riskScore}
                  score={`${symptomRiskScore}`}
                  level={symptomLevel}
                  interpretation={symptomsInterpretation}
                  recommendation={symptomLevel === 'urgent' ? t.urgent : comprehensiveExamRecommendation}
                  appointmentHref={appointmentHref}
                  appointmentLabel={t.bookComprehensiveExam}
                />
              ) : (
                <TestPromptPanel title={t.symptomsScoreTitle} message={t.notCompleted} accuracyTitle={t.accuracyTitle} disclaimer={t.disclaimer} />
              )
            )}

            {!allTestsCompleted && activeTest === 'near' && (
              nearCompleted ? (
                <>
                  <h2 className="text-xl font-bold text-slate-950 dark:text-white">{t.nearScoreTitle}</h2>
                  <div className="mt-4 grid gap-3">
                    <NearVisionResultCard
                      title={t.nearRightResultTitle}
                      lineLabel={t.nearSmallestLine}
                      score={nearRightScoreText}
                      category={nearRightCategory}
                      categoryLabel={nearCategoryLabel(nearRightCategory)}
                      recommendation={nearCategoryRecommendation(nearRightCategory)}
                    />
                    <NearVisionResultCard
                      title={t.nearLeftResultTitle}
                      lineLabel={t.nearSmallestLine}
                      score={nearLeftScoreText}
                      category={nearLeftCategory}
                      categoryLabel={nearCategoryLabel(nearLeftCategory)}
                      recommendation={nearCategoryRecommendation(nearLeftCategory)}
                    />
                  </div>
                  <Link
                    href={appointmentHref}
                    className="mt-4 inline-flex w-full justify-center rounded-lg bg-cyan-700 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-cyan-800 dark:bg-cyan-600 dark:hover:bg-cyan-500"
                  >
                    {t.bookComprehensiveExam}
                  </Link>
                </>
              ) : (
                <>
                  <TestPromptPanel title={t.nearScoreTitle} message={t.nearIncomplete} accuracyTitle={t.accuracyTitle} disclaimer={t.disclaimer} />
                  {nearCompletedEyes.right && (
                    <div className="mt-4">
                      <NearVisionResultCard
                        title={t.nearRightResultTitle}
                        lineLabel={t.nearSmallestLine}
                        score={nearRightScoreText}
                        category={nearRightCategory}
                        categoryLabel={nearCategoryLabel(nearRightCategory)}
                        recommendation={nearCategoryRecommendation(nearRightCategory)}
                      />
                    </div>
                  )}
                </>
              )
            )}

            {!allTestsCompleted && (
              <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700 dark:border-slate-700 dark:bg-slate-950/65 dark:text-slate-200">
                <p className="font-black">{t.completed}: {completedCount}/5</p>
                <p className="mt-1">{t.completeAllTests}</p>
              </div>
            )}

            {allTestsCompleted && !showColorResults && (
              <>
                <h2 className="text-2xl font-black text-slate-950 dark:text-white">{t.colorContactTitle}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{t.colorContactText}</p>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
                  <Input label={t.name} {...register('name', { required: t.required })} error={errors.name?.message} />
                  <Input label={t.phone} {...register('phone', { required: t.required })} error={errors.phone?.message} />
                  <Input
                    type="email"
                    label={t.email}
                    {...register('email', {
                      required: t.required,
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t.invalidEmail },
                    })}
                    error={errors.email?.message}
                  />
                  {submitStatus.type === 'error' && (
                    <div className="rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-800 dark:bg-red-900/20 dark:text-red-200">
                      {submitStatus.message}
                    </div>
                  )}
                  <Button type="submit" fullWidth size="lg" isLoading={isSubmitting}>
                    {t.showResults}
                  </Button>
                </form>
              </>
            )}

            {allTestsCompleted && showColorResults && (
              <>
                <h2 className="text-2xl font-black text-slate-950 dark:text-white">{t.finalReportTitle}</h2>
                <div className="rounded-lg border-2 border-cyan-200 bg-cyan-50 p-5 text-cyan-950 shadow-sm dark:border-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-50">
                  <p className="text-sm font-black uppercase tracking-[0.12em] text-cyan-800 dark:text-cyan-200">
                    {t.finalColorTitle}
                  </p>
                  <p className="mt-3 text-4xl font-black leading-none md:text-5xl">
                    {colorScore}/{totalIshiharaScore}
                  </p>
                  <p className="mt-4 text-lg font-bold leading-7">{colorResultText}</p>
                  <p className="mt-3 text-sm font-semibold">
                    {t.deficiencyPattern}: {deficiencyPattern}
                  </p>
                </div>

                <div className="mt-4 rounded-lg border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200">
                  <p className="text-base font-black text-slate-950 dark:text-white">{t.interpretationTitle}</p>
                  <p className="mt-2">{colorInterpretation}</p>
                  <p className="mt-4 text-base font-black text-slate-950 dark:text-white">{t.recommendationTitle}</p>
                  <p className="mt-2">{colorRecommendation}</p>
                </div>

                <ScorePanel
                  title={t.amslerScoreTitle}
                  scoreLabel={t.score}
                  score={`${amslerScore}/5`}
                  level={amslerLevel}
                  interpretation={amslerInterpretation}
                  recommendation={comprehensiveExamRecommendation}
                  appointmentHref={appointmentHref}
                  appointmentLabel={t.bookComprehensiveExam}
                />

                <ScorePanel
                  title={t.contrastScoreTitle}
                  scoreLabel={t.score}
                  score={`${contrastScore}/4`}
                  level={contrastLevel}
                  interpretation={contrastInterpretation}
                  recommendation={comprehensiveExamRecommendation}
                  appointmentHref={appointmentHref}
                  appointmentLabel={t.bookComprehensiveExam}
                />

                <div className="mt-7 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950/55">
                  <p className="text-sm font-black uppercase tracking-[0.12em] text-cyan-800 dark:text-cyan-200">
                    {t.nearScoreTitle}
                  </p>
                  <div className="mt-4 grid gap-3">
                    <NearVisionResultCard
                      title={t.nearRightResultTitle}
                      lineLabel={t.nearSmallestLine}
                      score={nearRightScoreText}
                      category={nearRightCategory}
                      categoryLabel={nearCategoryLabel(nearRightCategory)}
                      recommendation={nearCategoryRecommendation(nearRightCategory)}
                    />
                    <NearVisionResultCard
                      title={t.nearLeftResultTitle}
                      lineLabel={t.nearSmallestLine}
                      score={nearLeftScoreText}
                      category={nearLeftCategory}
                      categoryLabel={nearCategoryLabel(nearLeftCategory)}
                      recommendation={nearCategoryRecommendation(nearLeftCategory)}
                    />
                  </div>
                </div>

                <ScorePanel
                  title={t.symptomsScoreTitle}
                  scoreLabel={t.riskScore}
                  score={`${symptomRiskScore}`}
                  level={symptomLevel}
                  interpretation={symptomsInterpretation}
                  recommendation={symptomLevel === 'urgent' ? t.urgent : comprehensiveExamRecommendation}
                  appointmentHref={appointmentHref}
                  appointmentLabel={t.bookComprehensiveExam}
                />

                <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-100">
                  <p className="font-bold">{t.accuracyTitle}</p>
                  <p className="mt-1">{t.disclaimer}</p>
                  <p className="mt-3 font-bold">{t.annualCheckup}</p>
                </div>

                <ProfessionalExamCta
                  message={t.scoreCtaText}
                  buttonLabel={t.scoreCtaButton}
                  href={whatsappBookingHref}
                  ariaLabel={t.scoreCtaAria}
                />
              </>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
