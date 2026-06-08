import React from 'react'
import type { Page } from '@/payload-types'
import { RichText } from '@/components/RichText'
import { CMSLink } from '@/components/Link'

const HERO_BG = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=85'

type LowImpactHeroType =
  | { children?: React.ReactNode; richText?: never; links?: never }
  | (Omit<Page['hero'], 'richText'> & { children?: never; richText?: Page['hero']['richText'] })

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, richText, links }) => {
  const isHome = !children && richText && links && links.length > 0

  if (isHome) {
    return (
      <div className="relative min-h-[70vh] flex items-center" style={{
        backgroundImage: `linear-gradient(rgba(43,39,34,0.3), rgba(43,39,34,0.5)), url(${HERO_BG})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        backgroundColor: '#F2EDE6',
      }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F9F7F4]" />
        <div className="container relative z-10 py-24 md:py-32">
          <div className="max-w-2xl text-white">
            {richText && <RichText data={richText} enableGutter={false} />}
            {links && (
              <div className="flex flex-wrap gap-4 mt-8">
                {links.map(({ link }, i) => <CMSLink key={i} {...link} size="lg" />)}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mt-16">
      <div className="max-w-3xl">
        {children || (richText && <RichText data={richText} enableGutter={false} />)}
      </div>
    </div>
  )
}
