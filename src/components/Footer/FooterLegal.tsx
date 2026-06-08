'use client'

import { useT } from '@/providers/LocaleProvider'
import { useLocale } from '@/providers/LocaleProvider'
import Link from 'next/link'

export function FooterLegal() {
  const { locale } = useLocale()
  const t = useT()

  return (
    <nav aria-label={t('footer.legal_title')} className="flex flex-col gap-2">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
        {t('footer.legal_title')}
      </h3>
      <ul className="flex flex-col gap-1">
        <li>
          <Link
            className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            href={`/${locale}/terms`}
          >
            {t('footer.terms')}
          </Link>
        </li>
        <li>
          <Link
            className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            href={`/${locale}/privacy`}
          >
            {t('footer.privacy')}
          </Link>
        </li>
        <li>
          <Link
            className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            href={`/${locale}/shipping`}
          >
            {t('footer.shipping')}
          </Link>
        </li>
      </ul>
    </nav>
  )
}
