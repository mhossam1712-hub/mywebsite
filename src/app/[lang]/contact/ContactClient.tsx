'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/common/Button';
import { Card, CardBody, CardHeader } from '@/components/common/Card';
import { GoogleReviewButton } from '@/components/common/GoogleReviewButton';
import { Input, Select, Textarea } from '@/components/common/Input';
import { ServiceIcon } from '@/components/common/ServiceIcon';
import { CLINIC_BRANCHES, CLINIC_INFO } from '@/constants';
import { branchDirectionsHref, branchDisplayName, phoneHref, whatsAppHref } from '@/lib/clinic';
import {
  getDedicatedServiceLinks,
  serviceDetailsLabel,
  serviceLearnMoreLabel,
  serviceLinksHeading,
} from '@/lib/service-links';
import { contactService } from '@/services/api';

interface ContactClientProps {
  locale: string;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  preferredContact: 'email' | 'phone';
}

export default function ContactClient({ locale }: ContactClientProps) {
  const t = useTranslations();
  const isArabic = locale === 'ar';
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>();
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const whatsappUrl = whatsAppHref();
  const serviceLinks = getDedicatedServiceLinks(locale);
  const serviceHeading = serviceLinksHeading(locale);
  const learnMoreLabel = serviceLearnMoreLabel(locale);
  const serviceDetails = serviceDetailsLabel(locale);

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus({ type: null, message: '' });
    const response = await contactService.sendContactForm(data);

    if (response.success) {
      setSubmitStatus({
        type: 'success',
        message: t('contact.success'),
      });
      reset();
    } else {
      setSubmitStatus({
        type: 'error',
        message: t('contact.error'),
      });
    }
  };

  return (
    <div className="py-12 md:py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('contact.title')}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">{t('contact.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardHeader title={isArabic ? '📞 الهاتف وواتساب' : '📞 Phone & WhatsApp'} />
            <CardBody>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                    {isArabic ? 'واتساب' : 'WhatsApp'}
                  </p>
                  <a href={whatsappUrl ?? `mailto:${CLINIC_INFO.email}`} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-blue-600 hover:underline">
                    {CLINIC_INFO.phone}
                  </a>
                </div>
                {CLINIC_BRANCHES.map((branch) => (
                  <div key={branch.name}>
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                      {branchDisplayName(branch, locale)}
                    </p>
                    <a href={`tel:${phoneHref(branch.phone)}`} className="text-lg font-semibold text-blue-600 hover:underline">
                      {branch.phone}
                    </a>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                {isArabic ? 'من السبت إلى الأربعاء: 12:00 ظهراً - 9:00 مساءً' : 'Saturday-Wednesday: 12:00 PM - 9:00 PM'}
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title={isArabic ? '✉️ البريد الإلكتروني' : '✉️ Email'} />
            <CardBody>
              <a
                href={`mailto:${CLINIC_INFO.email}`}
                className="text-lg font-semibold text-blue-600 hover:underline"
              >
                {CLINIC_INFO.email}
              </a>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                {isArabic ? 'سنرد خلال 24 ساعة' : "We'll respond within 24 hours"}
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title={isArabic ? '📍 العنوان' : '📍 Location'} />
            <CardBody>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                {CLINIC_BRANCHES.map((branch) => (
                  <div key={branch.name}>
                    <Link
                      href={`/${locale}/branches/${branch.slug}`}
                      className="font-semibold text-gray-900 transition-colors hover:text-cyan-800 dark:text-white dark:hover:text-cyan-200"
                    >
                      {branchDisplayName(branch, locale)}
                    </Link>
                    <a
                      href={branchDirectionsHref(branch)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block text-sm leading-6 text-cyan-700 transition-colors hover:text-cyan-900 dark:text-cyan-300 dark:hover:text-cyan-100"
                    >
                      {isArabic ? branch.addressAr : branch.address}
                    </a>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        <section className="mb-12 rounded-lg border border-cyan-100 bg-white p-5 shadow-elegant dark:border-cyan-900/60 dark:bg-gray-950/70 sm:p-7">
          <div className={isArabic ? 'text-right' : 'text-left'}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{serviceHeading}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600 dark:text-gray-300">
              {isArabic
                ? 'قبل التواصل أو حجز موعد، يمكنك قراءة تفاصيل الخدمات الأكثر طلباً في عيادة عبد الله للعيون في الإسكندرية.'
                : 'Before contacting or booking, explore the most requested Abdalla Eye Clinic services in Alexandria.'}
            </p>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {serviceLinks.map((service) => (
              <Link
                key={service.slug}
                href={service.href}
                className={`group rounded-lg border border-cyan-100 bg-cyan-50/60 p-4 transition-colors hover:border-cyan-300 hover:bg-cyan-100 dark:border-cyan-900 dark:bg-cyan-950/30 dark:hover:bg-cyan-900/50 ${isArabic ? 'text-right' : 'text-left'}`}
              >
                <div className={`flex items-start gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-cyan-800 shadow-sm transition-colors group-hover:bg-cyan-700 group-hover:text-white dark:bg-slate-950 dark:text-cyan-200 dark:group-hover:bg-cyan-600">
                    <ServiceIcon name={service.icon} className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-black text-gray-950 dark:text-white">{service.label}</span>
                    <span className="mt-1 block text-sm leading-6 text-gray-600 dark:text-gray-300">
                      {service.description}
                    </span>
                    <span className="mt-3 block text-sm font-bold text-cyan-800 dark:text-cyan-200">
                      {learnMoreLabel} · {serviceDetails}
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="max-w-2xl mx-auto">
          <div className="mb-8 rounded-lg border border-cyan-100 bg-white p-5 shadow-sm dark:border-cyan-900/60 dark:bg-slate-900/70 sm:p-6">
            <div className={`flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${isArabic ? 'sm:flex-row-reverse text-right' : ''}`}>
              <div>
                <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                  {isArabic ? 'شاركنا رأيك على Google' : 'Share your experience on Google'}
                </h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-gray-300">
                  {isArabic
                    ? 'تقييمك يساعدنا على تحسين خدماتنا ويفيد المرضى الآخرين'
                    : 'Your review helps us improve and helps other patients find us'}
                </p>
              </div>
              <GoogleReviewButton locale={locale} size="sm" className="shrink-0 self-start sm:self-center" />
            </div>
          </div>

          <Card>
            <CardHeader title={t('contact.form_title')} />
            <CardBody>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {submitStatus.type && (
                  <div
                    className={`p-4 rounded-lg transition-colors duration-200 ${
                      submitStatus.type === 'success'
                        ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200'
                        : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                <Input
                  label={t('contact.name')}
                  {...register('name', {
                    required: t('validation.name_required'),
                  })}
                  error={errors.name?.message}
                />

                <Input
                  type="email"
                  label={t('contact.email')}
                  {...register('email', {
                    required: t('validation.email_required'),
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: t('validation.email_invalid'),
                    },
                  })}
                  error={errors.email?.message}
                />

                <Input
                  label={t('contact.phone')}
                  {...register('phone', {
                    required: t('validation.phone_required'),
                  })}
                  error={errors.phone?.message}
                />

                <Input
                  label={t('contact.subject')}
                  {...register('subject', {
                    required: t('validation.subject_required'),
                  })}
                  error={errors.subject?.message}
                />

                <Textarea
                  label={t('contact.message')}
                  rows={5}
                  {...register('message', {
                    required: t('validation.message_required'),
                  })}
                  error={errors.message?.message}
                />

                <Select
                  label={t('contact.preferred_contact')}
                  options={[
                    { value: 'email', label: t('common.email') },
                    { value: 'phone', label: t('contact.phone') },
                  ]}
                  {...register('preferredContact')}
                />

                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  isLoading={isSubmitting}
                >
                  {t('contact.submit')}
                </Button>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
