import type { Metadata } from 'next'

import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { headers as getHeaders } from 'next/headers.js'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { redirect } from 'next/navigation'
import { AddressListing } from '@/components/addresses/AddressListing'
import { CreateAddressModal } from '@/components/addresses/CreateAddressModal'
import { getLocale } from '@/i18n/request'
import { defaultLocale, uiTranslations } from '@/i18n/config'

export default async function AddressesPage() {
  const locale = (await getLocale()) || defaultLocale
  const t = (key: string) => uiTranslations[locale]?.[key] || uiTranslations[defaultLocale]?.[key] || key
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })

  if (!user) {
    redirect(`/login?warning=${encodeURIComponent(t('account.login_required'))}`)
  }

  return (
    <div className="border p-8 rounded-lg bg-primary-foreground">
      <h1 className="text-3xl font-medium mb-8">{t('mobile.addresses')}</h1>
      <div className="mb-8">
        <AddressListing />
      </div>
      <CreateAddressModal />
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) || defaultLocale
  const t = (key: string) => uiTranslations[locale]?.[key] || uiTranslations[defaultLocale]?.[key] || key
  return {
    description: t('mobile.addresses'),
    openGraph: mergeOpenGraph({
      title: t('mobile.addresses'),
      url: '/account/addresses',
    }),
    title: t('mobile.addresses'),
  }
}
