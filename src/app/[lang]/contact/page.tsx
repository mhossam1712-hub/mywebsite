'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/common/Button';
import { Card, CardBody, CardHeader } from '@/components/common/Card';
import { Input, Select, Textarea } from '@/components/common/Input';
import { contactService } from '@/services/api';
import { CLINIC_BRANCHES, CLINIC_INFO } from '@/constants';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  preferredContact: 'email' | 'phone';
}

const phoneHref = (phone: string) => phone.replace(/\D/g, '');

export default function ContactPage() {
  const t = useTranslations();
  const locale = useLocale();
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
          {/* Contact Info Cards */}
          <Card>
            <CardHeader title={isArabic ? '📞 الهاتف وواتساب' : '📞 Phone & WhatsApp'} />
            <CardBody>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                    {isArabic ? 'واتساب' : 'WhatsApp'}
                  </p>
                  <a href={`https://wa.me/${CLINIC_INFO.socialMedia.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-blue-600 hover:underline">
                    {CLINIC_INFO.phone}
                  </a>
                </div>
                {CLINIC_BRANCHES.map((branch, index) => (
                  <div key={branch.name}>
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                      {isArabic
                        ? index === 0
                          ? 'عيادة سموحة'
                          : 'عيادة محطة الرمل'
                        : branch.name.replace('Branch', 'Clinic')}
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
                {CLINIC_BRANCHES.map((branch, index) => (
                  <div key={branch.name}>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {isArabic
                        ? index === 0
                          ? 'عيادة سموحة'
                          : 'عيادة محطة الرمل'
                        : branch.name.replace('Branch', 'Clinic')}
                    </p>
                    <p className="mt-1 text-sm leading-6">{isArabic ? branch.addressAr : branch.address}</p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
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
