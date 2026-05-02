import { NextRequest } from 'next/server';
import {
  jsonSuccess,
  jsonValidationError,
  requiredString,
  saveLead,
  validateLeadIdentity,
} from '@/lib/lead-utils';

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const errors = validateLeadIdentity(payload);

  for (const field of ['doctorId', 'serviceId', 'date', 'time']) {
    if (!requiredString(payload[field])) errors[field] = `${field} is required`;
  }

  if (Object.keys(errors).length > 0) {
    return jsonValidationError(errors);
  }

  await saveLead('/api/appointments', {
    ...payload,
    leadType: 'Appointment request',
  });

  return jsonSuccess('Appointment request received');
}
