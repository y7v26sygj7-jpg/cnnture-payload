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
  endpoints: [],
  globals: [Header, Footer],
  plugins,
  secret: process.env.PAYLOAD_SECRET || 'cnnture-dev-secret-change-in-prod',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
