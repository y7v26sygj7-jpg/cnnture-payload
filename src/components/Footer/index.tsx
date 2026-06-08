import type { Footer } from '@/payload-types'

import { FooterMenu } from '@/components/Footer/menu'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React, { Suspense } from 'react'
import { LogoIcon } from '@/components/icons/logo'
import { FooterLegal } from './FooterLegal'
import { FooterBottom } from './FooterBottom'

export async function Footer() {
  const footer: Footer = await getCachedGlobal('footer', 1)()
  const menu = footer.navItems || []

  return (
    <footer className="text-sm text-neutral-500 dark:text-neutral-400">
      <div className="container">
        <div className="flex w-full flex-col gap-6 border-t border-neutral-200 py-12 text-sm md:flex-row md:gap-12 dark:border-neutral-700">
          <div>
            <Link className="flex items-center gap-2 text-black md:pt-1 dark:text-white" href="/">
              <LogoIcon className="w-6" />
              <span className="sr-only">CNNTURE</span>
            </Link>
            {footer.brandTagline && (
              <p className="mt-2 text-xs max-w-[200px] leading-relaxed">{footer.brandTagline}</p>
            )}
          </div>
          <Suspense
            fallback={
              <div className="flex h-[188px] w-[200px] flex-col gap-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
                ))}
              </div>
            }
          >
            <FooterMenu menu={menu} />
          </Suspense>
          <FooterLegal />
          <div className="md:ml-auto flex flex-col gap-4 items-end">
            <ThemeSelector />
          </div>
        </div>
      </div>
      <FooterBottom />
    </footer>
  )
}
