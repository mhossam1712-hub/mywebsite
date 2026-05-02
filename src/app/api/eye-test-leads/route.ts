import { NextRequest } from 'next/server';
import {
  jsonSuccess,
  jsonValidationError,
  saveLead,
  validateLeadIdentity,
} from '@/lib/lead-utils';

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const errors = validateLeadIdentity(payload);

  if (Object.keys(errors).length > 0) {
    return jsonValidationError(errors);
  }

  await saveLead('/api/eye-test-leads', {
    ...payload,
    leadType: 'Interactive eye test',
  });

  return jsonSuccess('Eye test lead received');
}
