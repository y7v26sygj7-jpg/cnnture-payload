import type { Metadata } from 'next'

import { Button } from '@/components/ui/button'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import Link from 'next/link'
import { headers as getHeaders } from 'next/headers.js'
import configPromise from '@payload-config'
import { AccountForm } from '@/components/forms/AccountForm'
import { Order } from '@/payload-types'
import { OrderItem } from '@/components/OrderItem'
import { getPayload } from 'payload'
import { redirect } from 'next/navigation'
import { getLocale } from '@/i18n/request'
import { defaultLocale, uiTranslations } from '@/i18n/config'

export default async function AccountPage() {
  const locale = (await getLocale()) || defaultLocale
  const t = (key: string) => uiTranslations[locale]?.[key] || uiTranslations[defaultLocale]?.[key] || key
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })

  let orders: Order[] | null = null

  if (!user) {
    redirect(
      `/login?warning=${encodeURIComponent(t('account.login_required'))}`,
    )
  }

  try {
    const ordersResult = await payload.find({
      collection: 'orders',
      limit: 5,
      user,
      overrideAccess: false,
      pagination: false,
      where: {
        customer: {
          equals: user?.id,
        },
      },
    })

    orders = ordersResult?.docs || []
  } catch (error) {
    // when deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // so swallow the error here and simply render the page with fallback data where necessary
    // in production you may want to redirect to a 404  page or at least log the error somewhere
    // console.error(error)
  }

  return (
    <>
      <div className="border p-8 rounded-lg bg-primary-foreground">
        <h1 className="text-3xl font-medium mb-8">{t('account.settings')}</h1>
        <AccountForm />
      </div>

      <div className=" border p-8 rounded-lg bg-primary-foreground">
        <h2 className="text-3xl font-medium mb-8">{t('orders.recent')}</h2>

        <div className="prose dark:prose-invert mb-8">
          <p>{t('orders.recent_desc')}</p>
        </div>

        {(!orders || !Array.isArray(orders) || orders?.length === 0) && (
          <p className="mb-8">{t('orders.empty')}</p>
        )}

        {orders && orders.length > 0 && (
          <ul className="flex flex-col gap-6 mb-8">
            {orders?.map((order, index) => (
              <li key={order.id}>
                <OrderItem order={order} />
              </li>
            ))}
          </ul>
        )}

        <Button asChild variant="default">
          <Link href="/orders">{t('orders.view_all')}</Link>
        </Button>
      </div>
    </>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) || defaultLocale
  const t = (key: string) => uiTranslations[locale]?.[key] || uiTranslations[defaultLocale]?.[key] || key
  return {
    description: t('account.settings'),
    openGraph: mergeOpenGraph({
      title: t('account.settings'),
      url: '/account',
    }),
    title: t('account.settings'),
  }
}
