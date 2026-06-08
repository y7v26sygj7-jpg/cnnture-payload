'use client'

import { useT } from '@/providers/LocaleProvider'

export function FooterBottom() {
  const t = useT()
  const year = new Date().getFullYear()

  return (
    <div className="border-t border-neutral-200 py-6 text-sm dark:border-neutral-700">
      <div className="container mx-auto flex w-full flex-col items-center gap-1 md:flex-row md:gap-0">
        <p>
          &copy; 2023-{year} CNNTURE.{t('footer.all_rights')}
        </p>
        <hr className="mx-4 hidden h-4 w-px border-l border-neutral-400 md:inline-block" />
        <p>{t('footer.designed')}</p>
        <p className="md:ml-auto">
          <a className="text-black dark:text-white" href="https://payloadcms.com">
            {t('footer.powered')}
          </a>
        </p>
      </div>
    </div>
  )
}
