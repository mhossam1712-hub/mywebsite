import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { appendFile, mkdir } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';

export type LeadPayload = Record<string, unknown>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[0-9\s()./-]{7,24}$/;
const maxPayloadBytes = 100 * 1024;
const rateLimitWindowMs = 10 * 60 * 1000;
const rateLimitMaxRequests = 8;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const honeypotFields = ['website', 'url', 'company', 'fax', 'address2', 'honeypot', 'hp'];

export function requiredString(value: unknown) {
  return typeof value === 'string' && value.trim().length > 0;
}

function stringLength(value: unknown, maxLength: number) {
  return typeof value === 'string' && value.trim().length <= maxLength;
}

export function isJsonObject(value: unknown): value is LeadPayload {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

export function validatePhone(value: unknown) {
  if (!requiredString(value)) return false;

  const phone = String(value).trim();
  const digits = phone.replace(/\D/g, '');

  return phonePattern.test(phone) && digits.length >= 7 && digits.length <= 15;
}

export function validateDateString(value: unknown) {
  if (!requiredString(value) || !/^\d{4}-\d{2}-\d{2}$/.test(String(value))) {
    return false;
  }

  const [year, month, day] = String(value).split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  const today = new Date();
  const todayUtc = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day &&
    date >= todayUtc
  );
}

export function validateTimeSlot(value: unknown, allowedSlots: readonly string[]) {
  return requiredString(value) && allowedSlots.includes(String(value));
}

export function validateStringField(
  payload: LeadPayload,
  field: string,
  label: string,
  maxLength: number,
  errors: Record<string, string>
) {
  if (!requiredString(payload[field])) {
    errors[field] = `${label} is required`;
  } else if (!stringLength(payload[field], maxLength)) {
    errors[field] = `${label} is too long`;
  }
}

export function validateOptionalStringField(
  payload: LeadPayload,
  field: string,
  label: string,
  maxLength: number,
  errors: Record<string, string>
) {
  if (payload[field] === undefined || payload[field] === null || payload[field] === '') return;

  if (typeof payload[field] !== 'string' || !stringLength(payload[field], maxLength)) {
    errors[field] = `${label} is too long`;
  }
}

export function validateLeadIdentity(payload: LeadPayload) {
  const errors: Record<string, string> = {};

  validateStringField(payload, 'name', 'Name', 120, errors);
  if (!requiredString(payload.phone)) {
    errors.phone = 'Phone is required';
  } else if (!validatePhone(payload.phone)) {
    errors.phone = 'Phone is invalid';
  }
  if (!requiredString(payload.email)) {
    errors.email = 'Email is required';
  } else if (!emailPattern.test(String(payload.email))) {
    errors.email = 'Email is invalid';
  } else if (!stringLength(payload.email, 180)) {
    errors.email = 'Email is too long';
  }

  return errors;
}

function clientKey(request: NextRequest, source: string) {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const realIp = request.headers.get('x-real-ip')?.trim();
  const sessionHint = request.cookies.get('abdalla_lead_session')?.value;
  const userAgent = request.headers.get('user-agent') ?? 'unknown';

  return `${source}:${forwardedFor || realIp || sessionHint || userAgent}`;
}

export function isRateLimited(request: NextRequest, source: string) {
  const now = Date.now();
  const key = clientKey(request, source);
  const current = rateLimitStore.get(key);

  for (const [storedKey, bucket] of rateLimitStore) {
    if (bucket.resetAt <= now) rateLimitStore.delete(storedKey);
  }

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + rateLimitWindowMs });
    return false;
  }

  current.count += 1;
  return current.count > rateLimitMaxRequests;
}

export async function readLeadPayload(request: NextRequest) {
  const contentLength = request.headers.get('content-length');

  if (contentLength && Number(contentLength) > maxPayloadBytes) {
    return {
      payload: null,
      response: jsonError('Payload too large', 413),
    };
  }

  let body: string;

  try {
    body = await request.text();
  } catch {
    return {
      payload: null,
      response: jsonError('Could not read request body', 400),
    };
  }

  if (Buffer.byteLength(body, 'utf8') > maxPayloadBytes) {
    return {
      payload: null,
      response: jsonError('Payload too large', 413),
    };
  }

  try {
    const parsed = JSON.parse(body) as unknown;

    if (!isJsonObject(parsed)) {
      return {
        payload: null,
        response: jsonError('Invalid request body', 400),
      };
    }

    return {
      payload: parsed,
      response: null,
    };
  } catch {
    return {
      payload: null,
      response: jsonError('Invalid JSON', 400),
    };
  }
}

export function hasHoneypotValue(payload: LeadPayload) {
  return honeypotFields.some((field) => requiredString(payload[field]));
}

export async function saveLead(source: string, payload: LeadPayload) {
  const leadId = randomUUID();
  const submittedAt = new Date().toISOString();
  const lead = {
    id: leadId,
    source,
    submittedAt,
    ...payload,
  };
  // Vercel's /tmp filesystem is ephemeral and may be cleared between invocations or deployments.
  // Treat this JSONL file as a temporary fallback/audit buffer, not as a durable CRM or medical record store.
  const leadDirectory =
    process.env.LEADS_FILE_DIR ||
    (process.env.VERCEL ? '/tmp/abdalla-eye-clinic-leads' : path.join(process.cwd(), 'data'));
  const leadFile = path.join(leadDirectory, 'leads.jsonl');

  await mkdir(leadDirectory, { recursive: true });
  await appendFile(leadFile, `${JSON.stringify(lead)}\n`, 'utf8');
  console.info('Clinic lead received:', {
    leadId,
    source,
    submittedAt,
    status: 'stored',
  });
  await forwardLead(lead);
}

async function forwardLead(payload: LeadPayload) {
  const webhookUrl = process.env.LEADS_WEBHOOK_URL;

  if (!webhookUrl) return;

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.warn('Lead webhook failed:', error);
  }
}

export function jsonSuccess(message = 'Request received') {
  return NextResponse.json({ success: true, message });
}

export function jsonError(error: string, status = 400, errors?: Record<string, string>) {
  return NextResponse.json(
    {
      success: false,
      error,
      ...(errors ? { errors } : {}),
    },
    { status }
  );
}

export function jsonValidationError(errors: Record<string, string>) {
  return jsonError('Validation failed', 400, errors);
}
