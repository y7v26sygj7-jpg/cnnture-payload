import type { GlobalConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { link } from '@/fields/link'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
    update: adminOnly,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      localized: true,
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 8,
    },
    {
      name: 'legalLinks',
      type: 'array',
      localized: true,
      fields: [
        { name: 'label', type: 'text' },
        link({ appearances: false }),
      ],
      maxRows: 6,
    },
    {
      name: 'brandTagline',
      type: 'text',
      localized: true,
      admin: { description: 'Footer brand tagline, e.g. "东方草本器物品牌"' },
    },
  ],
}
