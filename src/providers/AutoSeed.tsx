'use client'

import { useEffect, useState } from 'react'

export function AutoSeed() {
  const [seeding, setSeeding] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    // Only run once on first visit
    if (done || seeding) return

    const seeded = sessionStorage.getItem('cnnture-seeded')
    if (seeded) return

    setSeeding(true)
    fetch('/zh/api/auto-seed', { method: 'POST' })
      .then((r) => r.json())
      .then((data) => {
        if (data.seeded) {
          sessionStorage.setItem('cnnture-seeded', '1')
          window.location.reload()
        }
        setDone(true)
      })
      .catch(() => setDone(true))
  }, [done, seeding])

  if (!seeding) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#F9F7F4',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      zIndex: 99999, fontFamily: 'Cormorant Garamond, serif',
    }}>
      <h2 style={{ fontSize: 28, fontWeight: 300, color: '#2B2722', marginBottom: 16, letterSpacing: '0.04em' }}>
        CNNTURE 中式自然
      </h2>
      <p style={{ fontSize: 15, color: '#8A8680', marginBottom: 32 }}>
        正在初始化网站内容...
      </p>
      <div style={{ width: 200, height: 1, background: '#E5E1DA', overflow: 'hidden', borderRadius: 1 }}>
        <div style={{ width: '60%', height: '100%', background: '#8B7355',
          animation: 'seed-progress 2s ease-in-out infinite' }} />
      </div>
      <style>{`@keyframes seed-progress { 0%{transform:translateX(-100%)}100%{transform:translateX(266%)} }`}</style>
    </div>
  )
}
