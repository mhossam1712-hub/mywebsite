'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/common/Button';
import { Card, CardBody, CardHeader } from '@/components/common/Card';
import { Input, Select, Textarea } from '@/components/common/Input';
import { appointmentService } from '@/services/api';
import { APPOINTMENT_TIME_SLOTS } from '@/constants';
import { getLocalizedDoctors, getLocalizedServices } from '@/utils/localized-content';
import { formatDate } from '@/utils';

interface AppointmentFormData {
  name: string;
  email: string;
  phone: string;
  doctorId: string;
  serviceId: string;
  date: string;
  time: string;
  notes?: string;
}

export default function AppointmentsPage() {
  const t = useTranslations();
  const locale = useLocale();
  const doctors = getLocalizedDoctors(locale);
  const services = getLocalizedServices(locale);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AppointmentFormData>();
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const onSubmit = async (data: AppointmentFormData) => {
    setSubmitStatus({ type: null, message: '' });
    const response = await appointmentService.bookAppointment(data);

    if (response.success) {
      setSubmitStatus({
        type: 'success',
        message: t('appointment.success'),
      });
      reset();
    } else {
      setSubmitStatus({
        type: 'error',
        message: t('appointment.error'),
      });
    }
  };

  return (
    <div className="py-12 md:py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-2xl mx-auto px-4">
        <Card>
          <CardHeader
            title={t('appointment.form_title')}
            subtitle={t('appointment.form_subtitle')}
          />
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
                label={t('appointment.name')}
                {...register('name', {
                  required: t('validation.name_required'),
                })}
                error={errors.name?.message}
              />

              <Input
                type="email"
                label={t('appointment.email')}
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
                label={t('appointment.phone')}
                {...register('phone', {
                  required: t('validation.phone_required'),
                })}
                error={errors.phone?.message}
              />

              <Select
                label={t('appointment.doctor')}
                options={doctors.map((doc) => ({
                  value: doc.id,
                  label: doc.name,
                }))}
                {...register('doctorId', {
                  required: t('validation.doctor_required'),
                })}
                error={errors.doctorId?.message}
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
                {...register('date', {
                  required: t('validation.date_required'),
                })}
                error={errors.date?.message}
              />

              <Select
                label={t('appointment.time')}
                options={APPOINTMENT_TIME_SLOTS.map((time) => ({
                  value: time,
                  label: time,
                }))}
                {...register('time', {
                  required: t('validation.time_required'),
                })}
                error={errors.time?.message}
              />

              <Textarea
                label={t('appointment.notes')}
                rows={4}
                {...register('notes')}
                placeholder={t('appointment.notes_placeholder')}
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
