import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest } from 'payload'

import { seedBrandPages } from './cnnture-pages'

const collections: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'products',
  'forms',
  'form-submissions',
  'variants',
  'variantOptions',
  'variantTypes',
  'carts',
  'transactions',
  'addresses',
  'orders',
]

const categories = [
  '草本饰品 Herbal Jewelry',
  '草本香薰 Herbal Aromatherapy',
  '禅意手串 Zen Bracelets',
  '草木文创 Herbal Stationery',
  '文化典藏 Cultural Treasures',
  '赠礼系列 Gifting',
]

const globals: GlobalSlug[] = ['header', 'footer']

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  // we need to clear the media directory before seeding
  // as well as the collections and globals
  // this is because while `yarn seed` drops the database
  // the custom `/api/seed` endpoint does not
  payload.logger.info(`— Clearing collections and globals...`)

  // clear the database
  await Promise.all(
    globals.map((global) =>
      payload.updateGlobal({
        slug: global,
        data: {
          navItems: [],
        },
        depth: 0,
        context: {
          disableRevalidate: true,
        },
      }),
    ),
  )

  for (const collection of collections) {
    await payload.db.deleteMany({ collection, req, where: {} })
    if (payload.collections[collection].config.versions) {
      await payload.db.deleteVersions({ collection, req, where: {} })
    }
  }

  payload.logger.info(`— Seeding categories...`)

  await Promise.all(
    categories.map((category) =>
      payload.create({
        collection: 'categories',
        data: { title: category, slug: category },
      }),
    ),
  )

  payload.logger.info(`— Seeding CNNTURE home page...`)

  // CNNTURE home page (no media ref needed)
  await payload.create({
    collection: 'pages',
    locale: 'zh',
    context: { disableRevalidate: true },
    data: {
      slug: 'home',
      _status: 'published',
      title: '首页',
      hero: {
        type: 'lowImpact',
        richText: {
          root: {
            type: 'root',
            children: [
              { type: 'heading', children: [{ type: 'text', detail:0, format:0, mode:'normal', style:'', text:'CNNTURE  中式自然', version:1 }], direction:'ltr', format:'', indent:0, tag:'h1', version:1 },
              { type: 'paragraph', children: [{ type: 'text', detail:0, format:0, mode:'normal', style:'', text:'以草木为骨，以禅意为魂。东方草本器物品牌。', version:1 }], direction:'ltr', format:'', indent:0, textFormat:0, version:1 },
            ],
            direction:'ltr', format:'', indent:0, version:1,
          },
        },
        links: [
          { link: { type: 'custom', appearance: 'default', label: '探索器物', url: '/shop' } },
          { link: { type: 'custom', appearance: 'outline', label: '品牌哲学', url: '/philosophy' } },
        ],
      },
      layout: [
        { blockType:'content', columns:[
          { richText:{ root:{ type:'root', children:[{ type:'heading', children:[{ type:'text', detail:0, format:0, mode:'normal', style:'', text:'六种草本人格', version:1 }], direction:'ltr', format:'', indent:0, tag:'h2', version:1 }], direction:'ltr', format:'', indent:0, version:1 } }, size:'full' },
          { richText:{ root:{ type:'root', children:[{ type:'paragraph', children:[{ type:'text', detail:0, format:0, mode:'normal', style:'', text:'艾草 · 静尘 —— 两千年来，中国人佩艾草于襟前。不为药用，为的是一种安定的陪伴。', version:1 }], direction:'ltr', format:'', indent:0, textFormat:0, version:1 }], direction:'ltr', format:'', indent:0, version:1 } }, size:'oneThird' },
          { richText:{ root:{ type:'root', children:[{ type:'paragraph', children:[{ type:'text', detail:0, format:0, mode:'normal', style:'', text:'桂花 · 疏隐 —— 中秋时节，桂花香飘十里。疏离而不冷漠，是桂花的人格。', version:1 }], direction:'ltr', format:'', indent:0, textFormat:0, version:1 }], direction:'ltr', format:'', indent:0, version:1 } }, size:'oneThird' },
          { richText:{ root:{ type:'root', children:[{ type:'paragraph', children:[{ type:'text', detail:0, format:0, mode:'normal', style:'', text:'沉香 · 归寂 —— 沉香的形成需要数十年。在伤痛中凝结，在时间中沉淀。', version:1 }], direction:'ltr', format:'', indent:0, textFormat:0, version:1 }], direction:'ltr', format:'', indent:0, version:1 } }, size:'oneThird' },
          { richText:{ root:{ type:'root', children:[{ type:'paragraph', children:[{ type:'text', detail:0, format:0, mode:'normal', style:'', text:'茯苓 · 素拙 —— 生于松根之下，朴素到几乎被忽略。但最安静的力量往往最持久。', version:1 }], direction:'ltr', format:'', indent:0, textFormat:0, version:1 }], direction:'ltr', format:'', indent:0, version:1 } }, size:'oneThird' },
          { richText:{ root:{ type:'root', children:[{ type:'paragraph', children:[{ type:'text', detail:0, format:0, mode:'normal', style:'', text:'茉莉 · 无尘 —— 茉莉花开在夜晚。不争不抢，在最安静的时刻散发香气。', version:1 }], direction:'ltr', format:'', indent:0, textFormat:0, version:1 }], direction:'ltr', format:'', indent:0, version:1 } }, size:'oneThird' },
          { richText:{ root:{ type:'root', children:[{ type:'paragraph', children:[{ type:'text', detail:0, format:0, mode:'normal', style:'', text:'枸杞 · 赤子 —— 红色的小果实，温暖、亲和。像冬日里的一杯热茶。', version:1 }], direction:'ltr', format:'', indent:0, textFormat:0, version:1 }], direction:'ltr', format:'', indent:0, version:1 } }, size:'oneThird' },
        ]},
        { blockType:'content', columns:[
          { richText:{ root:{ type:'root', children:[{ type:'heading', children:[{ type:'text', detail:0, format:0, mode:'normal', style:'', text:'四道工序 · 手作之美', version:1 }], direction:'ltr', format:'', indent:0, tag:'h2', version:1 }], direction:'ltr', format:'', indent:0, version:1 } }, size:'full' },
          { richText:{ root:{ type:'root', children:[{ type:'paragraph', children:[{ type:'text', detail:0, format:0, mode:'normal', style:'', text:'采摘：在最适宜的季节，手工采摘每一株草药，保留其最完整的形态。', version:1 }], direction:'ltr', format:'', indent:0, textFormat:0, version:1 }], direction:'ltr', format:'', indent:0, version:1 } }, size:'half' },
          { richText:{ root:{ type:'root', children:[{ type:'paragraph', children:[{ type:'text', detail:0, format:0, mode:'normal', style:'', text:'封存：将完整草药封入水晶树脂。每一件都是独一无二的排列。', version:1 }], direction:'ltr', format:'', indent:0, textFormat:0, version:1 }], direction:'ltr', format:'', indent:0, version:1 } }, size:'half' },
          { richText:{ root:{ type:'root', children:[{ type:'paragraph', children:[{ type:'text', detail:0, format:0, mode:'normal', style:'', text:'干燥：自然阴干，不烘烤不漂白，保持草药的原色与原味。', version:1 }], direction:'ltr', format:'', indent:0, textFormat:0, version:1 }], direction:'ltr', format:'', indent:0, version:1 } }, size:'half' },
          { richText:{ root:{ type:'root', children:[{ type:'paragraph', children:[{ type:'text', detail:0, format:0, mode:'normal', style:'', text:'打磨：手工抛光和镶嵌，配925纯银底座，反复检验直至完美。', version:1 }], direction:'ltr', format:'', indent:0, textFormat:0, version:1 }], direction:'ltr', format:'', indent:0, version:1 } }, size:'half' },
        ]},
        { blockType:'cta', richText:{ root:{ type:'root', children:[{ type:'heading', children:[{ type:'text', detail:0, format:0, mode:'normal', style:'', text:'选择与你气质相合的那一件', version:1 }], direction:'ltr', format:'', indent:0, tag:'h2', version:1 }], direction:'ltr', format:'', indent:0, version:1 } }, links:[
          { link: { type: 'custom', appearance: 'default', label: '浏览全部器物', url: '/shop' } },
          { link: { type: 'custom', appearance: 'outline', label: '关于 CNNTURE', url: '/about' } },
        ]},
      ],
      meta: {
        description: 'CNNTURE 中式自然 — 以草木为骨，以禅意为魂。东方草本器物品牌。六种草本人格，六大器物系列。',
        title: 'CNNTURE 中式自然 — 东方草本器物',
      },
    },
  })

  payload.logger.info(`— Seeding CNNTURE brand pages (10 pages × 6 locales)...`)

  await seedBrandPages(payload)

  payload.logger.info(`— Seeding globals...`)

  // CNNTURE Header with bilingual nav items
  await payload.updateGlobal({
    slug: 'header',
    locale: 'zh',
    data: {
      navItems: [
        { link: { type: 'custom', label: '器物', url: '/zh/shop' } },
        { link: { type: 'custom', label: '哲学', url: '/zh/philosophy' } },
        { link: { type: 'custom', label: '工艺', url: '/zh/craft' } },
        { link: { type: 'custom', label: '日志', url: '/zh/journal' } },
        { link: { type: 'custom', label: '关于', url: '/zh/about' } },
      ],
    },
  })

  // Seed header nav for all 6 languages
  const headerNavTranslations: Record<string, { label: string }[]> = {
    en: [{ label: 'Objects' }, { label: 'Philosophy' }, { label: 'Craft' }, { label: 'Journal' }, { label: 'About' }],
    ja: [{ label: '器物' }, { label: '哲学' }, { label: '工芸' }, { label: '日誌' }, { label: '私たち' }],
    fr: [{ label: 'Objets' }, { label: 'Philosophie' }, { label: 'Artisanat' }, { label: 'Journal' }, { label: 'À propos' }],
    de: [{ label: 'Objekte' }, { label: 'Philosophie' }, { label: 'Handwerk' }, { label: 'Journal' }, { label: 'Über uns' }],
    ko: [{ label: '기물' }, { label: '철학' }, { label: '공예' }, { label: '일지' }, { label: '소개' }],
  }
  for (const [loc, items] of Object.entries(headerNavTranslations)) {
    await payload.updateGlobal({
      slug: 'header',
      locale: loc as 'en' | 'ja' | 'fr' | 'de' | 'ko',
      data: {
        navItems: items.map(({ label }, i) => ({
          link: {
            type: 'custom',
            label,
            url: ['/shop', '/philosophy', '/craft', '/journal', '/about'][i],
          },
        })),
      },
    })
  }

  // CNNTURE Footer with legal links + nav + brandTagline for all 6 languages
  const footerData: Record<string, {
    navItems: { link: { type: string; label: string; url: string } }[]
    legalLinks: { label: string; link: { type: string; label: string; url: string } }[]
    brandTagline: string
  }> = {
    zh: {
      navItems: [
        { link: { type: 'custom', label: '首页', url: '/' } },
        { link: { type: 'custom', label: '器物', url: '/shop' } },
        { link: { type: 'custom', label: '常见问题', url: '/faq' } },
        { link: { type: 'custom', label: '联系我们', url: '/contact' } },
        { link: { type: 'custom', label: '查询订单', url: '/find-order' } },
      ],
      legalLinks: [
        { label: '服务条款', link: { type: 'custom', label: '服务条款', url: '/terms' } },
        { label: '隐私政策', link: { type: 'custom', label: '隐私政策', url: '/privacy' } },
        { label: '配送退换', link: { type: 'custom', label: '配送退换', url: '/shipping' } },
      ],
      brandTagline: '以草木为骨，以禅意为魂。东方草本器物品牌。',
    },
    en: {
      navItems: [
        { link: { type: 'custom', label: 'Home', url: '/' } },
        { link: { type: 'custom', label: 'Objects', url: '/shop' } },
        { link: { type: 'custom', label: 'FAQ', url: '/faq' } },
        { link: { type: 'custom', label: 'Contact', url: '/contact' } },
        { link: { type: 'custom', label: 'Find my order', url: '/find-order' } },
      ],
      legalLinks: [
        { label: 'Terms of Service', link: { type: 'custom', label: 'Terms of Service', url: '/terms' } },
        { label: 'Privacy Policy', link: { type: 'custom', label: 'Privacy Policy', url: '/privacy' } },
        { label: 'Shipping & Returns', link: { type: 'custom', label: 'Shipping & Returns', url: '/shipping' } },
      ],
      brandTagline: 'Herbal bones, Zen soul. Eastern herbal objects brand.',
    },
    ja: {
      navItems: [
        { link: { type: 'custom', label: 'ホーム', url: '/' } },
        { link: { type: 'custom', label: '器物', url: '/shop' } },
        { link: { type: 'custom', label: 'よくある質問', url: '/faq' } },
        { link: { type: 'custom', label: 'お問い合わせ', url: '/contact' } },
        { link: { type: 'custom', label: '注文検索', url: '/find-order' } },
      ],
      legalLinks: [
        { label: '利用規約', link: { type: 'custom', label: '利用規約', url: '/terms' } },
        { label: 'プライバシーポリシー', link: { type: 'custom', label: 'プライバシーポリシー', url: '/privacy' } },
        { label: '配送・返品', link: { type: 'custom', label: '配送・返品', url: '/shipping' } },
      ],
      brandTagline: '草木を骨とし、禅意を魂とする。東洋の草本器物ブランド。',
    },
    fr: {
      navItems: [
        { link: { type: 'custom', label: 'Accueil', url: '/' } },
        { link: { type: 'custom', label: 'Objets', url: '/shop' } },
        { link: { type: 'custom', label: 'FAQ', url: '/faq' } },
        { link: { type: 'custom', label: 'Contact', url: '/contact' } },
        { link: { type: 'custom', label: 'Ma commande', url: '/find-order' } },
      ],
      legalLinks: [
        { label: "Conditions d'utilisation", link: { type: 'custom', label: "Conditions d'utilisation", url: '/terms' } },
        { label: 'Politique de confidentialité', link: { type: 'custom', label: 'Politique de confidentialité', url: '/privacy' } },
        { label: 'Livraison et retours', link: { type: 'custom', label: 'Livraison et retours', url: '/shipping' } },
      ],
      brandTagline: "Os d'herbes, âme Zen. Marque d'objets herbacés d'Orient.",
    },
    de: {
      navItems: [
        { link: { type: 'custom', label: 'Start', url: '/' } },
        { link: { type: 'custom', label: 'Objekte', url: '/shop' } },
        { link: { type: 'custom', label: 'FAQ', url: '/faq' } },
        { link: { type: 'custom', label: 'Kontakt', url: '/contact' } },
        { link: { type: 'custom', label: 'Bestellung finden', url: '/find-order' } },
      ],
      legalLinks: [
        { label: 'Nutzungsbedingungen', link: { type: 'custom', label: 'Nutzungsbedingungen', url: '/terms' } },
        { label: 'Datenschutz', link: { type: 'custom', label: 'Datenschutz', url: '/privacy' } },
        { label: 'Versand & Rückgabe', link: { type: 'custom', label: 'Versand & Rückgabe', url: '/shipping' } },
      ],
      brandTagline: 'Kräuterknochen, Zen-Seele. Östliche Kräuterobjektmarke.',
    },
    ko: {
      navItems: [
        { link: { type: 'custom', label: '홈', url: '/' } },
        { link: { type: 'custom', label: '기물', url: '/shop' } },
        { link: { type: 'custom', label: '자주 묻는 질문', url: '/faq' } },
        { link: { type: 'custom', label: '문의', url: '/contact' } },
        { link: { type: 'custom', label: '주문 찾기', url: '/find-order' } },
      ],
      legalLinks: [
        { label: '이용약관', link: { type: 'custom', label: '이용약관', url: '/terms' } },
        { label: '개인정보처리방침', link: { type: 'custom', label: '개인정보처리방침', url: '/privacy' } },
        { label: '배송 및 반품', link: { type: 'custom', label: '배송 및 반품', url: '/shipping' } },
      ],
      brandTagline: '초목을 뼈대로, 선의를 영혼으로. 동양 초본 기물 브랜드.',
    },
  }

  for (const [loc, data] of Object.entries(footerData)) {
    await payload.updateGlobal({
      slug: 'footer',
      locale: loc as 'zh' | 'en' | 'ja' | 'fr' | 'de' | 'ko',
      data: {
        navItems: data.navItems,
        legalLinks: data.legalLinks,
        brandTagline: data.brandTagline,
      },
    })
  }

  payload.logger.info('Seeded database successfully!')
}