import { NextRequest } from 'next/server';
import { APPOINTMENT_TIME_SLOTS, DOCTORS, SERVICES } from '@/constants';
import {
  hasHoneypotValue,
  isRateLimited,
  jsonError,
  jsonSuccess,
  jsonValidationError,
  readLeadPayload,
  requiredString,
  saveLead,
  validateDateString,
  validateLeadIdentity,
  validateOptionalStringField,
  validateTimeSlot,
} from '@/lib/lead-utils';

export async function POST(request: NextRequest) {
  const source = '/api/appointments';

  if (isRateLimited(request, source)) {
    return jsonError('Too many requests', 429);
  }

  const { payload, response } = await readLeadPayload(request);

  if (response) return response;
  if (!payload) return jsonError('Invalid request body', 400);

  if (hasHoneypotValue(payload)) {
    return jsonSuccess('Appointment request received');
  }

  const errors = validateLeadIdentity(payload);

  if (!requiredString(payload.doctorId)) {
    errors.doctorId = 'Doctor is required';
  } else if (!DOCTORS.some((doctor) => doctor.id === payload.doctorId)) {
    errors.doctorId = 'Doctor is invalid';
  }

  if (!requiredString(payload.serviceId)) {
    errors.serviceId = 'Service is required';
  } else if (!SERVICES.some((service) => service.id === payload.serviceId)) {
    errors.serviceId = 'Service is invalid';
  }

  if (!validateDateString(payload.date)) {
    errors.date = 'Date is invalid';
  }

  if (!validateTimeSlot(payload.time, APPOINTMENT_TIME_SLOTS)) {
    errors.time = 'Time is invalid';
  }

  validateOptionalStringField(payload, 'notes', 'Notes', 2000, errors);

  if (Object.keys(errors).length > 0) {
    return jsonValidationError(errors);
  }

  await saveLead(source, {
    ...payload,
    leadType: 'Appointment request',
  });

  return jsonSuccess('Appointment request received');
}
