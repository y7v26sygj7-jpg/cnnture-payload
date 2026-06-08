import React from 'react'
import type { Page } from '@/payload-types'
import { RichText } from '@/components/RichText'
import { CMSLink } from '@/components/Link'

type Props = Omit<Page['hero'], 'type'> & {
  bgImage?: string
}

export const CNNTUREHero: React.FC<Props> = ({ richText, links, bgImage }) => {
  return (
    <div
      className="relative min-h-[70vh] flex items-center overflow-hidden"
      style={{
        backgroundImage: bgImage
          ? `linear-gradient(rgba(43,39,34,0.25), rgba(43,39,34,0.5)), url(${bgImage})`
          : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: bgImage ? undefined : 'var(--bg-warm)',
      }}
    >
      {bgImage && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F9F7F4]" />
      )}
      <div className="container relative z-10 py-24 md:py-32">
        <div className="max-w-2xl">
          {richText && (
            <div className="prose prose-lg dark:prose-invert">
              <RichText data={richText} enableGutter={false} />
            </div>
          )}
          {links && links.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-8">
              {links.map(({ link }, i) => (
                <CMSLink key={i} {...link} size="lg" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
