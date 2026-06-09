import type { ReactNode } from 'react'
import { headers } from 'next/headers'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { LocaleProvider } from '@/providers/LocaleProvider'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { defaultLocale, type Locale, uiTranslations } from '@/i18n/config'
import React from 'react'
import './brand.css'
import './globals.css'

export default async function RootLayout({ children }: { children: ReactNode }) {
  const headersList = await headers()
  const locale = (headersList.get('x-locale') || defaultLocale) as Locale
  // Pass only current locale's translations to client — 75KB dict stays server-side
  const translations = uiTranslations[locale] || uiTranslations[defaultLocale]

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400&family=Inter:wght@300;400&family=Noto+Serif+SC:wght@300;400&display=swap" rel="stylesheet" />
        {locale === 'ja' && <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300&display=swap" rel="stylesheet" />}
        {locale === 'ko' && <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300&display=swap" rel="stylesheet" />}
      </head>
      <body>
        <Providers>
          <LocaleProvider locale={locale} translations={translations}>
            <Header />
            <main>{children}</main>
            <Footer />
            <LanguageSwitcher />
          </LocaleProvider>
        </Providers>
      </body>
    </html>
  )
}
