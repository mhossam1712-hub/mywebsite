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
} from '@/lib/lead-utils';

export async function POST(request: NextRequest) {
  const source = '/api/eye-test-leads';

  if (isRateLimited(request, source)) {
    return jsonError('Too many requests', 429);
  }

  const { payload, response } = await readLeadPayload(request);

  if (response) return response;
  if (!payload) return jsonError('Invalid request body', 400);

  if (hasHoneypotValue(payload)) {
    return jsonSuccess('Eye test lead received');
  }

  const errors = validateLeadIdentity(payload);

  validateOptionalStringField(payload, 'locale', 'Locale', 5, errors);
  validateOptionalStringField(payload, 'summary', 'Summary', 2000, errors);
  validateOptionalStringField(payload, 'colorResultCategory', 'Color result category', 40, errors);
  validateOptionalStringField(payload, 'deficiencyPattern', 'Deficiency pattern', 120, errors);
  validateOptionalStringField(payload, 'amslerEye', 'Amsler eye', 20, errors);
  validateOptionalStringField(payload, 'amslerInterpretation', 'Amsler interpretation', 2000, errors);
  validateOptionalStringField(payload, 'contrast', 'Contrast', 20, errors);
  validateOptionalStringField(payload, 'contrastInterpretation', 'Contrast interpretation', 2000, errors);
  validateOptionalStringField(payload, 'symptomsInterpretation', 'Symptoms interpretation', 2000, errors);

  if (typeof payload.locale === 'string' && payload.locale && !['en', 'ar'].includes(payload.locale)) {
    errors.locale = 'Locale is invalid';
  }

  for (const field of [
    'colorScore',
    'totalIshiharaScore',
    'amslerScore',
    'contrastScore',
    'symptomRiskScore',
  ]) {
    if (payload[field] !== undefined && (typeof payload[field] !== 'number' || payload[field] < 0 || payload[field] > 100)) {
      errors[field] = `${field} is invalid`;
    }
  }

  for (const field of ['amslerFindings', 'symptoms']) {
    if (
      payload[field] !== undefined &&
      (!Array.isArray(payload[field]) ||
        payload[field].length > 20 ||
        !payload[field].every((item) => typeof item === 'string' && item.length <= 80))
    ) {
      errors[field] = `${field} is invalid`;
    }
  }

  if (
    payload.ishiharaAnswers !== undefined &&
    (typeof payload.ishiharaAnswers !== 'object' ||
      payload.ishiharaAnswers === null ||
      Array.isArray(payload.ishiharaAnswers) ||
      Object.keys(payload.ishiharaAnswers).length > 40)
  ) {
    errors.ishiharaAnswers = 'Ishihara answers are invalid';
  }

  if (Object.keys(errors).length > 0) {
    return jsonValidationError(errors);
  }

  await saveLead(source, {
    ...payload,
    leadType: 'Interactive eye test',
  });

  return jsonSuccess('Eye test lead received');
}
