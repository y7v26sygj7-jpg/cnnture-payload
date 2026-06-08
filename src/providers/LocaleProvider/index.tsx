'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { locales, defaultLocale, type Locale, uiTranslations, localeNames, getLocaleFromPath } from '@/i18n/config'

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

export function LocaleProvider({
  children,
  locale: serverLocale,
}: {
  children: ReactNode
  locale: Locale
}) {
  const pathname = usePathname()
  // Client-side: derive from URL pathname (survives SPA navigation)
  // Server-side: fall back to layout-provided locale
  const pathLocale = pathname ? getLocaleFromPath(pathname) : null
  const locale = pathLocale || serverLocale

  const dict = uiTranslations[locale] || uiTranslations[defaultLocale]

  const t = (key: string): string => {
    return dict[key] || uiTranslations[defaultLocale][key] || key
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
