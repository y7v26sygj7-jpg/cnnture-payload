import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { mongooseAdapter } from '@payloadcms/db-mongodb'

import {
  BoldFeature,
  EXPERIMENTAL_TableFeature,
  IndentFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  UnderlineFeature,
  UnorderedListFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from '@/collections/Categories'
import { Media } from '@/collections/Media'
import { Pages } from '@/collections/Pages'
import { Users } from '@/collections/Users'
import { Footer } from '@/globals/Footer'
import { Header } from '@/globals/Header'
import { plugins } from './plugins'
import { seedHomepage } from './endpoints/seed/cnnture-homepage'
import { seedBrandPages } from './endpoints/seed/cnnture-pages'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      beforeLogin: ['@/components/BeforeLogin#BeforeLogin'],
    },
    user: Users.slug,
  },
  collections: [Users, Pages, Categories, Media],
  db: process.env.DATABASE_URL?.startsWith('mongodb')
    ? mongooseAdapter({ url: process.env.DATABASE_URL })
    : sqliteAdapter({ client: { url: process.env.DATABASE_URL || 'file:./payload.db' } }),
  // 6-language localization: zh (default), en, ja, fr, de, ko
  localization: {
    locales: [
      { code: 'zh', label: { en: 'Chinese', zh: '中文', ja: '中国語', fr: 'Chinois', de: 'Chinesisch', ko: '중국어' } },
      { code: 'en', label: { en: 'English', zh: '英语', ja: '英語', fr: 'Anglais', de: 'Englisch', ko: '영어' } },
      { code: 'ja', label: { en: 'Japanese', zh: '日语', ja: '日本語', fr: 'Japonais', de: 'Japanisch', ko: '일본어' } },
      { code: 'fr', label: { en: 'French', zh: '法语', ja: 'フランス語', fr: 'Français', de: 'Französisch', ko: '프랑스어' } },
      { code: 'de', label: { en: 'German', zh: '德语', ja: 'ドイツ語', fr: 'Allemand', de: 'Deutsch', ko: '독일어' } },
      { code: 'ko', label: { en: 'Korean', zh: '韩语', ja: '韓国語', fr: 'Coréen', de: 'Koreanisch', ko: '한국어' } },
    ],
    defaultLocale: 'zh',
    fallback: true,
  },
  editor: lexicalEditor({
    features: () => {
      return [
        UnderlineFeature(),
        BoldFeature(),
        ItalicFeature(),
        OrderedListFeature(),
        UnorderedListFeature(),
        LinkFeature({
          enabledCollections: ['pages'],
          fields: ({ defaultFields }) => {
            const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
              if ('name' in field && field.name === 'url') return false
              return true
            })

            return [
              ...defaultFieldsWithoutUrl,
              {
                name: 'url',
                type: 'text',
                admin: {
                  condition: ({ linkType }) => linkType !== 'internal',
                },
                label: ({ t }) => t('fields:enterURL'),
                required: true,
              },
            ]
          },
        }),
        IndentFeature(),
        EXPERIMENTAL_TableFeature(),
      ]
    },
  }),
  onInit: async (payload) => {
    try {
      const existing = await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, limit: 1 })
      if (existing.totalDocs > 0) return
      payload.logger.info('Auto-seeding CNNTURE on first deploy...')

      const cats = ['草本饰品 Herbal Jewelry','草本香薰 Herbal Aromatherapy','禅意手串 Zen Bracelets','草木文创 Herbal Stationery','文化典藏 Cultural Treasures','赠礼系列 Gifting']
      for (const c of cats) {
        await payload.create({ collection: 'categories', data: { title: c, slug: c }, context: { disableRevalidate: true } })
      }
      await seedHomepage(payload)
      await seedBrandPages(payload)

      // Seed Header + Footer in 6 languages
      await payload.updateGlobal({ slug: 'header', locale: 'zh', data: { navItems: [
        { link: { type: 'custom', label: '器物', url: '/shop' } },{ link: { type: 'custom', label: '哲学', url: '/philosophy' } },{ link: { type: 'custom', label: '工艺', url: '/craft' } },{ link: { type: 'custom', label: '日志', url: '/journal' } },{ link: { type: 'custom', label: '关于', url: '/about' } }
      ] }, context: { disableRevalidate: true } })

      const footerData: Record<string,any> = {
        zh:{nav:[{l:'首页',u:'/'},{l:'器物',u:'/shop'},{l:'常见问题',u:'/faq'},{l:'联系我们',u:'/contact'},{l:'查询订单',u:'/find-order'}],law:[{l:'服务条款',u:'/terms'},{l:'隐私政策',u:'/privacy'},{l:'配送退换',u:'/shipping'}],tag:'以草木为骨，以禅意为魂。东方草本器物品牌。'},
        en:{nav:[{l:'Home',u:'/'},{l:'Objects',u:'/shop'},{l:'FAQ',u:'/faq'},{l:'Contact',u:'/contact'},{l:'Find my order',u:'/find-order'}],law:[{l:'Terms of Service',u:'/terms'},{l:'Privacy Policy',u:'/privacy'},{l:'Shipping & Returns',u:'/shipping'}],tag:'Herbal bones, Zen soul. Eastern herbal objects brand.'},
        ja:{nav:[{l:'ホーム',u:'/'},{l:'器物',u:'/shop'},{l:'よくある質問',u:'/faq'},{l:'お問い合わせ',u:'/contact'},{l:'注文検索',u:'/find-order'}],law:[{l:'利用規約',u:'/terms'},{l:'プライバシーポリシー',u:'/privacy'},{l:'配送・返品',u:'/shipping'}],tag:'草木を骨とし、禅意を魂とする。東洋の草本器物ブランド。'},
      }
      for (const [loc, d] of Object.entries(footerData)) {
        await payload.updateGlobal({ slug: 'footer', locale: loc as any, data: {
          navItems: d.nav.map((x:{l:string,u:string}) => ({link:{type:'custom',label:x.l,url:x.u}})),
          legalLinks: d.law.map((x:{l:string,u:string}) => ({label:x.l,link:{type:'custom',label:x.l,url:x.u}})),
          brandTagline: d.tag,
        } })
      }

      payload.logger.info('CNNTURE auto-seed complete!')
    } catch (e: any) {
      payload.logger.warn('Auto-seed skipped: ' + (e?.message || e))
    }
  },
  endpoints: [],
  globals: [Header, Footer],
  plugins,
  secret: process.env.PAYLOAD_SECRET || 'cnnture-dev-secret-change-in-prod',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
