import { headers } from 'next/headers'
import { locales, defaultLocale, type Locale } from './config'

/**
 * Get locale from x-locale header or request path.
 * SERVER COMPONENT ONLY — do not import from client components.
 */
export async function getLocale(): Promise<Locale> {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || headersList.get('x-invoke-path') || ''

  // Parse locale from URL path: /zh/shop → zh
  const segments = pathname.split('/').filter(Boolean)
  const first = segments[0]
  if (first && locales.includes(first as Locale)) {
    return first as Locale
  }

  // Fallback: try x-locale header
  const localeHeader = headersList.get('x-locale')
  if (localeHeader && locales.includes(localeHeader as Locale)) {
    return localeHeader as Locale
  }

  return defaultLocale
}
