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

  if (!requiredString(payload.subject)) errors.subject = 'Subject is required';
  if (!requiredString(payload.message)) errors.message = 'Message is required';

  if (Object.keys(errors).length > 0) {
    return jsonValidationError(errors);
  }

  await saveLead('/api/contact', {
    ...payload,
    leadType: 'Contact form',
  });

  return jsonSuccess('Contact request received');
}
