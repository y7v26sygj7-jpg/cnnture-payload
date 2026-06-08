import type { Metadata } from 'next'

import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import React from 'react'
import { ForgotPasswordForm } from '@/components/forms/ForgotPasswordForm'
import { getLocale } from '@/i18n/request'
import { defaultLocale, uiTranslations } from '@/i18n/config'

export default async function ForgotPasswordPage() {
  return (
    <div className="container py-16">
      <ForgotPasswordForm />
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) || defaultLocale
  const t = (key: string) => uiTranslations[locale]?.[key] || uiTranslations[defaultLocale]?.[key] || key
  return {
    description: t('auth.forgot_desc'),
    openGraph: mergeOpenGraph({
      title: t('auth.forgot_title'),
      url: '/forgot-password',
    }),
    title: t('auth.forgot_title'),
  }
}
