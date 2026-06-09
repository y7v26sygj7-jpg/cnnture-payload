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

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      beforeLogin: ['@/components/BeforeLogin#BeforeLogin'],
      beforeDashboard: ['@/components/BeforeDashboard#BeforeDashboard'],
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
    // Auto-seed on server start if DB is empty (first deploy)
    try {
      const existing = await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, limit: 1 })
      if (existing.totalDocs === 0) {
        payload.logger.info('Auto-seeding CNNTURE on first start...')
        const cats = ['草本饰品 Herbal Jewelry','草本香薰 Herbal Aromatherapy','禅意手串 Zen Bracelets','草木文创 Herbal Stationery','文化典藏 Cultural Treasures','赠礼系列 Gifting']
        for (const c of cats) {
          await payload.create({ collection: 'categories', data: { title: c, slug: c }, context: { disableRevalidate: true } })
        }
        await payload.create({ collection: 'pages', data: { slug:'home', _status:'published', title:'首页',
          hero:{ type:'lowImpact', richText:{ root:{ type:'root', children:[
            { type:'heading', children:[{ type:'text', detail:0, format:0, mode:'normal', style:'', text:'以草木为骨', version:1 }], direction:'ltr', format:'', indent:0, tag:'h1', version:1 },
            { type:'heading', children:[{ type:'text', detail:0, format:0, mode:'normal', style:'', text:'以禅意为魂', version:1 }], direction:'ltr', format:'', indent:0, tag:'h1', version:1 },
            { type:'paragraph', children:[{ type:'text', detail:0, format:0, mode:'normal', style:'', text:'Bones of Herbs · Soul of Silence', version:1 }], direction:'ltr', format:'', indent:0, textFormat:0, version:1 },
            { type:'paragraph', children:[{ type:'text', detail:0, format:0, mode:'normal', style:'', text:'六种草本性格 · 六种东方器物 · 一种生活态度', version:1 }], direction:'ltr', format:'', indent:0, textFormat:0, version:1 },
          ], direction:'ltr', format:'', indent:0, version:1 } }, links:[ { link:{ type:'custom', appearance:'default', label:'探 索 器 物', url:'/shop' } } ] },
          meta:{ title:'CNNTURE 中式自然', description:'以草木为骨，以禅意为魂。东方草本器物品牌。' },
        }, context: { disableRevalidate: true } })
        payload.logger.info('CNNTURE auto-seed complete!')
      }
    } catch (e) { payload.logger.warn('Auto-seed skipped: ' + (e as Error).message) }
  },
  endpoints: [],
  globals: [Header, Footer],
  plugins,
  secret: process.env.PAYLOAD_SECRET || 'cnnture-dev-secret-change-in-prod',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
