import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

type Global = keyof Config['globals']

async function getGlobal<T extends Global>(slug: T, depth = 0, locale?: string) {
  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth,
    locale: locale as 'zh' | 'en' | 'ja' | 'fr' | 'de' | 'ko' | undefined,
  })

  return global
}

/** Simple uncached getter — reliable across locale switches */
export const getCachedGlobal = <T extends Global>(slug: T, depth = 0, locale?: string) => {
  return async () => getGlobal<T>(slug, depth, locale)
}
