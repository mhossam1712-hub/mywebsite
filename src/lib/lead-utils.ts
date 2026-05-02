import { NextResponse } from 'next/server';
import { appendFile, mkdir } from 'fs/promises';
import path from 'path';

export type LeadPayload = Record<string, unknown>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function requiredString(value: unknown) {
  return typeof value === 'string' && value.trim().length > 0;
}

export function validateLeadIdentity(payload: LeadPayload) {
  const errors: Record<string, string> = {};

  if (!requiredString(payload.name)) errors.name = 'Name is required';
  if (!requiredString(payload.phone)) errors.phone = 'Phone is required';
  if (!requiredString(payload.email)) {
    errors.email = 'Email is required';
  } else if (!emailPattern.test(String(payload.email))) {
    errors.email = 'Email is invalid';
  }

  return errors;
}

export async function saveLead(source: string, payload: LeadPayload) {
  const lead = {
    source,
    submittedAt: new Date().toISOString(),
    ...payload,
  };
  const leadDirectory = path.join(process.cwd(), 'data');
  const leadFile = path.join(leadDirectory, 'leads.jsonl');

  await mkdir(leadDirectory, { recursive: true });
  await appendFile(leadFile, `${JSON.stringify(lead)}\n`, 'utf8');
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

export function jsonValidationError(errors: Record<string, string>) {
  return NextResponse.json(
    { success: false, error: 'Validation failed', errors },
    { status: 400 }
  );
}
