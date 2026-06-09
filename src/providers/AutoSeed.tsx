'use client'

import { useEffect, useState } from 'react'

/**
 * Shows a loading screen while the Payload server initializes on cold start.
 * The actual seeding is handled by payload.config.ts onInit hook.
 * This component just shows a polite loading state for the first visit.
 */
export function AutoSeed() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Hide after 8 seconds max (server initialization time)
    const t = setTimeout(() => setVisible(false), 8000)
    // Also try fetching the homepage - if it returns, we're ready
    fetch('/zh')
      .then((r) => { if (r.ok) setVisible(false) })
      .catch(() => {})
    return () => clearTimeout(t)
  }, [])

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#F9F7F4',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      zIndex: 99999,
    }}>
      <h2 style={{ fontSize: 28, fontWeight: 300, color: '#2B2722', marginBottom: 12, letterSpacing: '0.04em', fontFamily: 'Cormorant Garamond, serif' }}>
        CNNTURE 中式自然
      </h2>
      <p style={{ fontSize: 14, color: '#8A8680', fontFamily: 'Inter, sans-serif' }}>
        网站正在启动...
      </p>
    </div>
  )
}
