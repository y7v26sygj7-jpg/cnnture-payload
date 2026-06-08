import { getCachedGlobal } from '@/utilities/getGlobals'
import { getLocale } from '@/i18n/request'
import { defaultLocale } from '@/i18n/config'

import './index.css'
import { HeaderClient } from './index.client'

export async function Header() {
  const locale = (await getLocale()) || defaultLocale
  const header = await getCachedGlobal('header', 1, locale)()

  return <HeaderClient header={header} />
}
