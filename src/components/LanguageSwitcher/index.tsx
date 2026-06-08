'use client'

import { useLocale, type Locale } from '@/providers/LocaleProvider'
import { locales, localeNames } from '@/i18n/config'
import { useRouter, usePathname } from 'next/navigation'

export function LanguageSwitcher() {
  const { locale } = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchTo = (newLocale: Locale) => {
    // Build the new URL with locale prefix
    const newPath = `/${newLocale}${pathname}`
    router.push(newPath)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-1">
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => switchTo(l)}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
            l === locale
              ? 'bg-foreground text-background'
              : 'bg-background text-foreground border hover:bg-muted'
          }`}
          title={localeNames[l]}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
