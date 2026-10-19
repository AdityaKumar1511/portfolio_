import { ImageResponse } from 'next/og'
import meta from '@/data/meta.json'

export const alt = meta.seo.title
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0a0a0a',
          color: '#d4cec7',
          padding: '72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: '22px',
            letterSpacing: '0.16em',
            color: '#fa5f34',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ width: '48px', height: '2px', background: '#fa5f34' }} />
          {meta.role}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div
            style={{
              fontSize: '96px',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >
            {meta.name}
          </div>
          <div style={{ fontSize: '36px', color: '#a1a1aa', maxWidth: '900px' }}>
            {meta.tagline}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid #27272a',
            paddingTop: '28px',
            fontSize: '22px',
            color: '#71717a',
          }}
        >
          <span>
            {meta.college} · {meta.year}
          </span>
          <span>{meta.seo.url.replace(/^https?:\/\//, '')}</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
