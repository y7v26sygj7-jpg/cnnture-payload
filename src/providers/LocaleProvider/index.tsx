'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { locales, defaultLocale, type Locale, localeNames, getLocaleFromPath } from '@/i18n/config'

type LocaleContextType = {
  locale: Locale
  t: (key: string) => string
  locales: readonly Locale[]
  localeNames: Record<Locale, string>
}

const LocaleContext = createContext<LocaleContextType>({
  locale: defaultLocale,
  t: (key: string) => key,
  locales,
  localeNames,
})

/**
 * LocaleProvider receives translations as a prop from the server layout.
 * This prevents the 75KB uiTranslations dict from being bundled into client-side JS.
 */
export function LocaleProvider({
  children,
  locale: serverLocale,
  translations,
}: {
  children: ReactNode
  locale: Locale
  translations: Record<string, string>
}) {
  const pathname = usePathname()
  const pathLocale = pathname ? getLocaleFromPath(pathname) : null
  const locale = pathLocale || serverLocale

  const t = (key: string): string => {
    return translations[key] || key
  }

  return (
    <LocaleContext.Provider value={{ locale, t, locales, localeNames }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale(): LocaleContextType {
  return useContext(LocaleContext)
}

export function useT(): (key: string) => string {
  return useContext(LocaleContext).t
}

export { type Locale }
