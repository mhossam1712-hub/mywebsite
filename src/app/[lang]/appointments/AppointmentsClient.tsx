'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/common/Button';
import { Card, CardBody, CardHeader } from '@/components/common/Card';
import { GoogleReviewButton } from '@/components/common/GoogleReviewButton';
import { Input, Select, Textarea } from '@/components/common/Input';
import { APPOINTMENT_TIME_SLOTS, CLINIC_BRANCHES } from '@/constants';
import { appointmentEmailFallbackHref, branchAppointmentName, whatsAppHref } from '@/lib/clinic';
import { getLocalizedServices } from '@/utils/localized-content';

interface AppointmentsClientProps {
  locale: string;
  initialServiceId?: string;
}

interface AppointmentFormData {
  name: string;
  phone: string;
  branch: string;
  serviceId: string;
  date: string;
  time?: string;
  message?: string;
}

function buildAppointmentMessage(data: AppointmentFormData, branchName: string, serviceName: string, locale: string) {
  const isArabic = locale === 'ar';
  const message = isArabic
    ? [
        'طلب حجز موعد جديد',
        `الاسم: ${data.name}`,
        `الهاتف: ${data.phone}`,
        `الفرع: ${branchName}`,
        `الخدمة: ${serviceName}`,
        `التاريخ المفضل: ${data.date}`,
        data.time ? `الوقت المفضل: ${data.time}` : null,
        data.message ? `الرسالة: ${data.message}` : null,
      ]
    : [
        'New appointment request',
        `Name: ${data.name}`,
        `Phone: ${data.phone}`,
        `Branch: ${branchName}`,
        `Service: ${serviceName}`,
        `Preferred date: ${data.date}`,
        data.time ? `Preferred time: ${data.time}` : null,
        data.message ? `Message: ${data.message}` : null,
      ];

  return message.filter(Boolean).join('\n');
}

function buildAppointmentUrl(message: string) {
  return whatsAppHref(message) ?? appointmentEmailFallbackHref(message);
}

export default function AppointmentsClient({ locale, initialServiceId }: AppointmentsClientProps) {
  const t = useTranslations();
  const services = useMemo(() => getLocalizedServices(locale), [locale]);
  const selectedServiceId = services.some((service) => service.id === initialServiceId) ? initialServiceId : undefined;
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AppointmentFormData>({
    defaultValues: {
      serviceId: selectedServiceId,
      branch: CLINIC_BRANCHES[0]?.slug,
    },
  });
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
    appointmentUrl?: string;
  }>({ type: null, message: '' });

  const onSubmit = (data: AppointmentFormData) => {
    setSubmitStatus({ type: null, message: '' });
    try {
      const branch = CLINIC_BRANCHES.find((branch) => branch.slug === data.branch);
      const branchName = branch ? branchAppointmentName(branch, locale) : data.branch;
      const serviceName = services.find((service) => service.id === data.serviceId)?.name ?? data.serviceId;
      const appointmentMessage = buildAppointmentMessage(data, branchName, serviceName, locale);
      const appointmentUrl = buildAppointmentUrl(appointmentMessage);
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'appointment_booked', {
          event_category: 'booking',
          event_label: 'appointment_form',
          service: serviceName,
          branch: branchName,
        });
        window.gtag('event', 'conversion', { send_to: `AW-18201356226/${process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL ?? '6GE6CJq5-rwcEMLPiudD'}` });
      }
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Lead');
      }
      setSubmitStatus({
        type: 'success',
        message: t('appointment.success'),
        appointmentUrl,
      });
      reset();
      window.open(appointmentUrl, '_blank', 'noopener,noreferrer');
    } catch {
      setSubmitStatus({
        type: 'error',
        message: t('appointment.error'),
      });
    }
  };

  const isArabic = locale === 'ar';

  if (submitStatus.type === 'success') {
    return (
      <div className="pb-12 md:pb-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-2xl mx-auto px-4">
          <Card>
            <CardBody>
              <div className="flex flex-col items-center gap-6 py-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                  <svg className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
                    {isArabic ? 'شكراً لك!' : 'Booking received!'}
                  </h2>
                  <p className="mt-2 text-slate-600 dark:text-gray-300">
                    {submitStatus.message}
                  </p>
                </div>

                {/* WhatsApp next-step instruction */}
                <div className="w-full rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-start dark:border-emerald-900/60 dark:bg-emerald-950/20">
                  <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
                    {isArabic
                      ? 'الخطوة التالية: افتح نافذة واتساب التي فُتحت للتو وأرسل الرسالة الجاهزة لتأكيد موعدك.'
                      : 'Next step: open the WhatsApp tab that just launched and send the pre-filled message to confirm your appointment.'}
                  </p>
                  {submitStatus.appointmentUrl && (
                    <a
                      href={submitStatus.appointmentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex min-h-9 items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-emerald-700"
                    >
                      {isArabic ? 'إعادة فتح واتساب' : 'Re-open WhatsApp'}
                    </a>
                  )}
                </div>

                <div className="w-full rounded-lg border border-cyan-100 bg-cyan-50/60 p-5 dark:border-cyan-900/60 dark:bg-cyan-950/20">
                  <p className="mb-4 text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {isArabic
                      ? 'نتطلع لسماع رأيك! هل يمكنك مشاركة تجربتك على Google؟'
                      : "Thank you for booking! We'd love to hear about your experience."}
                  </p>
                  <GoogleReviewButton locale={locale} size="md" />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-12 md:pb-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-2xl mx-auto px-4 pt-6">
        {/* Trust signals */}
        <div className="mb-6 rounded-lg border border-cyan-100 bg-cyan-50/80 px-4 py-3 dark:border-cyan-900/60 dark:bg-cyan-950/20">
          <p className="text-sm font-medium text-cyan-900 dark:text-cyan-100">
            {isArabic
              ? 'مفتوح السبت–الأربعاء، ١٢ ظهرًا – ٩ مساءً · فرعان في الإسكندرية (سموحة ومحطة الرمل) · تأكيد الحجز عبر واتساب'
              : 'Open Sat–Wed, 12PM–9PM · Two branches in Alexandria (Smouha & Raml Station) · Booking confirmed via WhatsApp'}
          </p>
        </div>

        <Card>
          <CardHeader
            subtitle={t('appointment.form_subtitle')}
          />
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
              {submitStatus.type === 'error' && (
                <div className="p-4 rounded-lg transition-colors duration-200 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200">
                  {submitStatus.message}
                </div>
              )}

              <Input
                label={t('appointment.name')}
                autoComplete="name"
                {...register('name', {
                  required: t('validation.name_required'),
                })}
                error={errors.name?.message}
              />

              <Input
                type="tel"
                label={t('appointment.phone')}
                autoComplete="tel"
                inputMode="tel"
                {...register('phone', {
                  required: t('validation.phone_required'),
                  validate: (value) => value.replace(/\D/g, '').length >= 7 || t('validation.phone_invalid'),
                })}
                error={errors.phone?.message}
              />

              <Select
                label={t('appointment.branch')}
                options={CLINIC_BRANCHES.map((branch) => ({
                  value: branch.slug,
                  label: branchAppointmentName(branch, locale),
                }))}
                {...register('branch', {
                  required: t('validation.branch_required'),
                })}
                error={errors.branch?.message}
              />

              <Select
                label={t('appointment.service')}
                options={services.map((svc) => ({
                  value: svc.id,
                  label: svc.name,
                }))}
                {...register('serviceId', {
                  required: t('validation.service_required'),
                })}
                error={errors.serviceId?.message}
              />

              <Input
                type="date"
                label={t('appointment.date')}
                min={today}
                {...register('date', {
                  required: t('validation.date_required'),
                  validate: (value) => value >= today || t('validation.date_invalid'),
                })}
                error={errors.date?.message}
              />

              <Select
                label={`${t('appointment.time')} ${isArabic ? '(اختياري)' : '(optional)'}`}
                options={[
                  { value: '', label: isArabic ? 'أي وقت متاح' : 'Any available time' },
                  ...APPOINTMENT_TIME_SLOTS.map((time) => ({ value: time, label: time })),
                ]}
                {...register('time')}
                error={errors.time?.message}
              />

              <Textarea
                label={t('appointment.message')}
                rows={4}
                {...register('message', {
                  maxLength: {
                    value: 500,
                    message: t('validation.message_too_long'),
                  },
                })}
                placeholder={t('appointment.message_placeholder')}
                error={errors.message?.message}
              />

              <Button
                type="submit"
                fullWidth
                size="lg"
                isLoading={isSubmitting}
              >
                {t('appointment.submit')}
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
