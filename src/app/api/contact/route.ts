import { NextRequest } from 'next/server';
import {
  hasHoneypotValue,
  isRateLimited,
  jsonError,
  jsonSuccess,
  jsonValidationError,
  readLeadPayload,
  saveLead,
  validateLeadIdentity,
  validateOptionalStringField,
  validateStringField,
} from '@/lib/lead-utils';

export async function POST(request: NextRequest) {
  const source = '/api/contact';

  if (isRateLimited(request, source)) {
    return jsonError('Too many requests', 429);
  }

  const { payload, response } = await readLeadPayload(request);

  if (response) return response;
  if (!payload) return jsonError('Invalid request body', 400);

  if (hasHoneypotValue(payload)) {
    return jsonSuccess('Contact request received');
  }

  const errors = validateLeadIdentity(payload);

  validateStringField(payload, 'subject', 'Subject', 160, errors);
  validateStringField(payload, 'message', 'Message', 5000, errors);
  validateOptionalStringField(payload, 'preferredContact', 'Preferred contact', 20, errors);

  if (
    typeof payload.preferredContact === 'string' &&
    payload.preferredContact &&
    !['email', 'phone'].includes(payload.preferredContact)
  ) {
    errors.preferredContact = 'Preferred contact is invalid';
  }

  if (Object.keys(errors).length > 0) {
    return jsonValidationError(errors);
  }

  await saveLead(source, {
    ...payload,
    leadType: 'Contact form',
  });

  return jsonSuccess('Contact request received');
}
