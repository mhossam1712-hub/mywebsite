'use client';

import Image from 'next/image';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { classNames } from '@/utils';

type EyeTestsClientProps = {
  locale: string;
};

type TestKey = 'color' | 'amsler' | 'contrast' | 'symptoms';

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
      'These checks are designed for online use: color discrimination, central vision distortion, contrast sensitivity, and symptom triage. They improve screening quality without pretending to replace a calibrated clinic exam.',
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
    },
    start: 'Start check',
    colorTitle: 'Ishihara color plate screening',
    colorHelp:
      'Read the number you see on each Ishihara plate. Plates that are tracing-only have been removed. Each plate shown is worth one point when answered correctly.',
    colorInstruction: 'Type the number you see, or choose Nothing if you cannot see a number.',
    reset: 'Reset',
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
    colorContactTitle: 'Your details',
    colorContactText: 'Enter your contact details to view your color screening result. Your result will be shown immediately on this page.',
    showResults: 'Show my results',
    finalColorTitle: 'Color vision screening result',
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
  },
  ar: {
    eyebrow: 'فحص أولي احترافي على الموقع',
    title: 'فحوصات عيون تفاعلية',
    intro:
      'هذه الفحوصات مناسبة للاستخدام على الموقع: تمييز الألوان، تشوه الرؤية المركزية، حساسية التباين، وفرز الأعراض. الهدف تحسين جودة الفحص الأولي دون اعتباره بديلاً عن فحص العيادة.',
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
    },
    start: 'ابدأ الفحص',
    colorTitle: 'فحص ألوان إيشيهارا',
    colorHelp:
      'اكتب الرقم الذي تراه في كل لوحة من لوحات إيشيهارا. تمت إزالة اللوحات التي تعتمد على التتبع. كل لوحة ظاهرة تساوي نقطة واحدة عند الإجابة الصحيحة.',
    colorInstruction: 'اكتب الرقم الذي تراه، أو اختر لا أرى شيئاً إذا لم يظهر رقم.',
    reset: 'إعادة ضبط',
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
    colorContactTitle: 'بياناتك',
    colorContactText: 'أدخل بيانات التواصل لعرض نتيجة فحص الألوان فوراً على هذه الصفحة.',
    showResults: 'عرض النتيجة',
    finalColorTitle: 'نتيجة فحص تمييز الألوان',
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

const urgentSymptoms = ['suddenLoss', 'pain', 'flashes', 'redness'];

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

export default function EyeTestsClient({ locale }: EyeTestsClientProps) {
  const isArabic = locale === 'ar';
  const t = isArabic ? copy.ar : copy.en;
  const [activeTest, setActiveTest] = useState<TestKey>('color');
  const [currentPlateIndex, setCurrentPlateIndex] = useState(0);
  const [ishiharaAnswers, setIshiharaAnswers] = useState<Record<number, string>>({});
  const [amslerEye, setAmslerEye] = useState('right');
  const [amslerFindings, setAmslerFindings] = useState<string[]>([]);
  const [contrast, setContrast] = useState('');
  const [symptoms, setSymptoms] = useState<string[]>([]);
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
  const completedCount = [colorCompleted, hasAmsler, Boolean(contrast), hasSymptoms].filter(Boolean).length;

  const resultLevel: ResultLevel = useMemo(() => {
    if (symptoms.some((symptom) => urgentSymptoms.includes(symptom))) return 'urgent';
    if (amslerFindings.some((finding) => finding !== 'straight')) return 'followUp';
    if (colorCompleted && colorScoreRatio < 0.7) return 'followUp';
    if (colorCompleted && colorScoreRatio < 0.85) return 'monitor';
    if (contrast === 'high' || contrast === 'medium' || symptoms.length > 0) return 'monitor';
    if (completedCount > 0) return 'reassuring';
    return 'neutral';
  }, [amslerFindings, colorCompleted, colorScoreRatio, completedCount, contrast, symptoms]);

  const resultText = {
    neutral: t.resultNeutral,
    reassuring: t.resultReassuring,
    monitor: t.resultMonitor,
    followUp: t.resultFollowUp,
    urgent: t.resultUrgent,
  }[resultLevel];

  const summary = useMemo(() => {
    const lines = [
      `${t.completed}: ${completedCount}/4`,
      colorCompleted ? `${t.tabs.color}: ${colorScore}/${totalIshiharaScore}; ${colorResultText}; ${t.deficiencyPattern}: ${deficiencyPattern}` : null,
      hasAmsler ? `${t.tabs.amsler}: ${amslerFindings.map((key) => t.amslerOptions[key as keyof typeof t.amslerOptions]).join(', ')} (${amslerEye})` : null,
      contrast ? `${t.tabs.contrast}: ${t.contrastRows[contrast as keyof typeof t.contrastRows]}` : null,
      hasSymptoms ? `${t.tabs.symptoms}: ${symptoms.map((key) => t.symptomsList[key as keyof typeof t.symptomsList]).join(', ')}` : null,
      resultText,
    ];

    return lines.filter(Boolean).join(' | ');
  }, [amslerEye, amslerFindings, colorCompleted, colorResultText, colorScore, completedCount, contrast, deficiencyPattern, hasAmsler, hasSymptoms, resultText, symptoms, t]);

  const toggleAmsler = (key: string) => {
    setAmslerFindings((current) => {
      if (key === 'straight') return ['straight'];
      const withoutStraight = current.filter((finding) => finding !== 'straight');
      return withoutStraight.includes(key)
        ? withoutStraight.filter((finding) => finding !== key)
        : [...withoutStraight, key];
    });
  };

  const toggleSymptom = (key: string) => {
    setSymptoms((current) =>
      current.includes(key) ? current.filter((symptom) => symptom !== key) : [...current, key]
    );
  };

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
          contrast,
          symptoms,
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
            src="/assets/images/hero-ophthalmologist.jpg"
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
              <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
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
                          src={`/assets/images/ishihara/ishihara-page-${String(currentPlate.page).padStart(2, '0')}.png`}
                          alt={`Ishihara color test slide ${currentPlateIndex + 1}`}
                          fill
                          sizes="(min-width: 1280px) 704px, 100vw"
                          className="object-contain"
                          priority={currentPlateIndex === 0}
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
                            onClick={() => setAmslerEye(value)}
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
                        onClick={() => setContrast(item.key)}
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
            </div>
          </section>

          <aside className="h-fit rounded-lg border border-white/80 bg-white p-5 shadow-elegant dark:border-cyan-900/50 dark:bg-slate-900 lg:p-6">
            {!colorCompleted && (
              <>
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">{t.resultTitle}</h2>
                <div className="mt-3">
                  <ResultBadge level="neutral" label={t.colorResultIncomplete} />
                </div>
                <div className="mt-4 rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-700 dark:bg-slate-950/65 dark:text-slate-200">
                  <p className="font-bold">{t.plate} {currentPlateIndex + 1} / {ishiharaPlates.length}</p>
                  <p className="mt-2">{t.colorInstruction}</p>
                </div>
                <div className="mt-4 rounded-lg border border-cyan-100 bg-cyan-50 p-4 text-sm leading-6 text-cyan-950 dark:border-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-50">
                  <p className="font-bold">{t.accuracyTitle}</p>
                  <p className="mt-1">{t.disclaimer}</p>
                </div>
              </>
            )}

            {colorCompleted && !showColorResults && (
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

            {colorCompleted && showColorResults && (
              <>
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

                <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-100">
                  <p className="font-bold">{t.accuracyTitle}</p>
                  <p className="mt-1">{t.disclaimer}</p>
                </div>
              </>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
