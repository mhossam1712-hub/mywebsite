import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'nodejs';

export function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get('title') ?? 'Abdalla Eye Clinic';

  const fontSize = title.length > 50 ? 52 : title.length > 35 ? 60 : 68;

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(140deg, #0c4a6e 0%, #0e7490 55%, #155e75 100%)',
          padding: '60px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-140px',
            left: '-80px',
            width: '520px',
            height: '520px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
            display: 'flex',
          }}
        />
        {/* Eye icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '88px',
            height: '88px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.14)',
            marginBottom: '36px',
          }}
        >
          <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
            <path
              d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="1.8" />
          </svg>
        </div>
        {/* Page title */}
        <div
          style={{
            color: 'white',
            fontSize: `${fontSize}px`,
            fontWeight: '800',
            textAlign: 'center',
            lineHeight: 1.15,
            maxWidth: '1020px',
            marginBottom: '28px',
            letterSpacing: '-1px',
          }}
        >
          {title}
        </div>
        {/* Divider */}
        <div
          style={{
            width: '72px',
            height: '3px',
            background: 'rgba(255,255,255,0.35)',
            borderRadius: '2px',
            marginBottom: '22px',
            display: 'flex',
          }}
        />
        {/* Clinic name */}
        <div
          style={{
            color: 'rgba(255,255,255,0.72)',
            fontSize: '26px',
            fontWeight: '500',
            letterSpacing: '0.5px',
          }}
        >
          Abdalla Eye Clinic · Alexandria, Egypt
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
