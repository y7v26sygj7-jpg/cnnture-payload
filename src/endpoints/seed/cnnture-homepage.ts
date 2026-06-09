import { Payload } from 'payload'

/**
 * CNNTURE rich homepage — 9 sections matching the original zhongshi-nature design.
 * Uses Payload Pages Blocks system.
 */

function p(text: string) {
  return { root: { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 }], direction: 'ltr', format: '', indent: 0, textFormat: 0, version: 1 }], direction: 'ltr', format: '', indent: 0, version: 1 } }
}
function h(text: string, tag: 'h2' | 'h3' = 'h2') {
  return { root: { type: 'root', children: [{ type: 'heading', children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 }], direction: 'ltr', format: '', indent: 0, tag, version: 1 }], direction: 'ltr', format: '', indent: 0, version: 1 } }
}

const LAYOUT = [
  // ==========================================
  // HERO — 全屏视频背景 + 中式自然标语
  // ==========================================
  {
    blockType: 'content',
    columns: [{
      richText: { root: { type: 'root', children: [
        { type: 'heading', children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: '以草木为骨', version: 1 }], direction: 'ltr', format: '', indent: 0, tag: 'h1', version: 1 },
        { type: 'heading', children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: '以禅意为魂', version: 1 }], direction: 'ltr', format: '', indent: 0, tag: 'h1', version: 1 },
        { type: 'paragraph', children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: 'Bones of Herbs · Soul of Silence', version: 1 }], direction: 'ltr', format: '', indent: 0, textFormat: 0, version: 1 },
        { type: 'paragraph', children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: '六种草本性格 · 六种东方器物 · 一种生活态度', version: 1 }], direction: 'ltr', format: '', indent: 0, textFormat: 0, version: 1 },
      ], direction: 'ltr', format: '', indent: 0, version: 1 } }, size: 'full',
    }],
  },

  // ==========================================
  // BRAND INTRO — 品牌哲学概述
  // ==========================================
  {
    blockType: 'content',
    columns: [
      { richText: h('万物有灵，草木有性', 'h2'), size: 'full' },
      { richText: p('我们相信每一株草木都有自己的性格。艾草沉静，陈皮内敛，桂花疏淡——它们不只是植物，它们是古人对话自然的语言。我们用器物翻译这些语言，让它们进入你的日常。'), size: 'full' },
      { richText: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'link', children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: '阅读我们的哲学 →', version: 1 }], direction: 'ltr', fields: { linkType: 'custom', newTab: false, url: '/philosophy' }, format: '', indent: 0, version: 2 }], direction: 'ltr', format: '', indent: 0, textFormat: 0, version: 1 }], direction: 'ltr', format: '', indent: 0, version: 1 } }, size: 'full' },
    ],
  },

  // ==========================================
  // CATEGORY GRID — 四大分类卡片
  // ==========================================
  {
    blockType: 'content',
    columns: [
      { richText: h('器物系列', 'h2'), size: 'full' },
      { richText: p('草本饰品 — 真草药封入水晶树脂，配925纯银。'), size: 'half' },
      { richText: p('草本香薰 — 五行蜡烛 · 陶瓷扩香器。'), size: 'half' },
      { richText: p('禅意手串 — 天然木材与玉石。'), size: 'half' },
      { richText: p('文化典藏 — 敦煌 · 青花 · 粗陶。'), size: 'half' },
    ],
  },
  {
    blockType: 'cta',
    richText: h('探索六大系列', 'h2'),
    links: [{ link: { type: 'custom', appearance: 'default', label: '浏览全部器物', url: '/shop' } }],
  },

  // ==========================================
  // SEASONAL — 端午限定 · 艾草
  // ==========================================
  {
    blockType: 'content',
    columns: [
      { richText: { root: { type: 'root', children: [
        { type: 'heading', children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: '艾草 · 静尘', version: 1 }], direction: 'ltr', format: '', indent: 0, tag: 'h2', version: 1 },
        { type: 'paragraph', children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: '端午将至。两千年来，中国人在这天挂艾草于门楣，佩香囊于衣襟。我们取一株真艾，封入水晶树脂，悬于纯银项链之上——不为辟邪，只为提醒自己：在喧嚣中保持沉静。', version: 1 }], direction: 'ltr', format: '', indent: 0, textFormat: 0, version: 1 },
        { type: 'paragraph', children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: 'Dragon Boat Festival Collection · 限量 200 件', version: 1 }], direction: 'ltr', format: '', indent: 0, textFormat: 0, version: 1 },
      ], direction: 'ltr', format: '', indent: 0, version: 1 } }, size: 'full' },
    ],
  },
  {
    blockType: 'cta',
    richText: h('探索艾草系列', 'h3'),
    links: [{ link: { type: 'custom', appearance: 'outline', label: '艾草 · 静尘', url: '/products/mugwort-necklace' } }],
  },

  // ==========================================
  // FEATURED PRODUCTS — 三件精选器物
  // ==========================================
  {
    blockType: 'content',
    columns: [
      { richText: h('匠人手作 · 三件器物', 'h2'), size: 'full' },
      { richText: p('艾草 · 静尘 — $39.99 — 真艾草叶封入水晶树脂 · 925银链'), size: 'oneThird' },
      { richText: p('桂花 · 疏隐 — $34.99 — 真桂花入大豆蜡 · 手工陶瓷杯'), size: 'oneThird' },
      { richText: p('檀木 · 五行 — $29.99 — 8mm檀木珠 · 五行玉石隔片'), size: 'oneThird' },
    ],
  },
  {
    blockType: 'cta',
    richText: h('查看全部器物', 'h3'),
    links: [{ link: { type: 'custom', appearance: 'outline', label: '全部器物 →', url: '/shop' } }],
  },

  // ==========================================
  // CULTURAL TEASER — 文化典藏
  // ==========================================
  {
    blockType: 'content',
    columns: [
      { richText: { root: { type: 'root', children: [
        { type: 'heading', children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: '敦煌 · 青花 · 粗陶', version: 1 }], direction: 'ltr', format: '', indent: 0, tag: 'h2', version: 1 },
        { type: 'paragraph', children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: '从莫高窟的飞天壁画到景德镇的青花釉下彩，从宜兴的粗陶柴烧到清代的古瓷片再造。中国传统工艺之美，化为可佩戴、可触摸的日常器物。', version: 1 }], direction: 'ltr', format: '', indent: 0, textFormat: 0, version: 1 },
      ], direction: 'ltr', format: '', indent: 0, version: 1 } }, size: 'full' },
    ],
  },
  {
    blockType: 'cta',
    richText: h('探索文化典藏系列', 'h3'),
    links: [{ link: { type: 'custom', appearance: 'outline', label: '文化典藏', url: '/shop?category=文化典藏' } }],
  },

  // ==========================================
  // JOURNAL — 草木有本心
  // ==========================================
  {
    blockType: 'content',
    columns: [
      { richText: h('草木有本心', 'h2'), size: 'full' },
      { richText: p('关于草本的文字、观察与静思。不追逐热点，只记录时间沉淀下来的东西。'), size: 'full' },
      { richText: { root: { type: 'root', children: [
        { type: 'paragraph', children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: '艾草考：一株草的二千年底色', version: 1 }], direction: 'ltr', format: '', indent: 0, textFormat: 0, version: 1 },
        { type: 'paragraph', children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: '从《诗经》的"彼采艾兮"到端午的门楣悬艾，这株草承载的远不止避邪的传说。', version: 1 }], direction: 'ltr', format: '', indent: 0, textFormat: 0, version: 1 },
      ], direction: 'ltr', format: '', indent: 0, version: 1 } }, size: 'oneThird' },
      { richText: { root: { type: 'root', children: [
        { type: 'paragraph', children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: '五行与五感：东方元素论的物质表达', version: 1 }], direction: 'ltr', format: '', indent: 0, textFormat: 0, version: 1 },
        { type: 'paragraph', children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: '木火土金水不是五种物质，而是五种运动方式。我们用五种香气来翻译它们。', version: 1 }], direction: 'ltr', format: '', indent: 0, textFormat: 0, version: 1 },
      ], direction: 'ltr', format: '', indent: 0, version: 1 } }, size: 'oneThird' },
      { richText: { root: { type: 'root', children: [
        { type: 'paragraph', children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: '景德镇的沉默：一座千年瓷都的呼吸节奏', version: 1 }], direction: 'ltr', format: '', indent: 0, textFormat: 0, version: 1 },
        { type: 'paragraph', children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: '在景德镇，时间不以分钟计算，而以窑火烧制的一昼夜为单位。', version: 1 }], direction: 'ltr', format: '', indent: 0, textFormat: 0, version: 1 },
      ], direction: 'ltr', format: '', indent: 0, version: 1 } }, size: 'oneThird' },
    ],
  },
  {
    blockType: 'cta',
    richText: h('阅读全部日志', 'h3'),
    links: [{ link: { type: 'custom', appearance: 'default', label: '阅读全部日志 →', url: '/journal' } }],
  },

  // ==========================================
  // GIFT BANNER — 以草木为礼
  // ==========================================
  {
    blockType: 'content',
    columns: [
      { richText: { root: { type: 'root', children: [
        { type: 'heading', children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: '以草木为礼', version: 1 }], direction: 'ltr', format: '', indent: 0, tag: 'h2', version: 1 },
        { type: 'paragraph', children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: '每一份赠礼套装包含手写禅意卡片、真丝收纳袋、以及对应草本的完整故事册页。不是商品，是一封写给收礼人的信。', version: 1 }], direction: 'ltr', format: '', indent: 0, textFormat: 0, version: 1 },
      ], direction: 'ltr', format: '', indent: 0, version: 1 } }, size: 'full' },
    ],
  },
  {
    blockType: 'cta',
    richText: h('赠礼系列', 'h3'),
    links: [{ link: { type: 'custom', appearance: 'outline', label: '探索赠礼系列', url: '/gift' } }],
  },

  // ==========================================
  // NEWSLETTER — 草木来信
  // ==========================================
  {
    blockType: 'content',
    columns: [
      { richText: h('草木来信', 'h3'), size: 'full' },
      { richText: p('每周一封 · 只写草本与器物 · 无广告'), size: 'full' },
    ],
  },
]

const META = {
  title: 'CNNTURE 中式自然 — 东方草本器物',
  description: 'CNNTURE (中式自然). Herbs as bone, Zen as soul. Handcrafted herbal jewelry, aromatherapy, bracelets, and objects. Eastern aesthetics for everyday life.',
}

export async function seedHomepage(payload: Payload): Promise<void> {
  payload.logger.info('— Seeding CNNTURE rich homepage...')

  // Delete old homepage
  const existing = await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } } })
  for (const doc of existing.docs) {
    await payload.delete({ collection: 'pages', id: doc.id })
  }

  const heroRichText = { root: { type: 'root', children: [
    { type: 'heading', children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: '以草木为骨', version: 1 }], direction: 'ltr', format: '', indent: 0, tag: 'h1', version: 1 },
    { type: 'heading', children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: '以禅意为魂', version: 1 }], direction: 'ltr', format: '', indent: 0, tag: 'h1', version: 1 },
    { type: 'paragraph', children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: 'Bones of Herbs · Soul of Silence', version: 1 }], direction: 'ltr', format: '', indent: 0, textFormat: 0, version: 1 },
    { type: 'paragraph', children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: '六种草本性格 · 六种东方器物 · 一种生活态度', version: 1 }], direction: 'ltr', format: '', indent: 0, textFormat: 0, version: 1 },
  ], direction: 'ltr', format: '', indent: 0, version: 1 } }

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
        richText: heroRichText,
        links: [
          { link: { type: 'custom', appearance: 'default', label: '探 索 器 物', url: '/shop' } },
        ],
      },
      layout: LAYOUT,
      meta: META,
    },
  })

  // EN locale — hero/layout now localized so safe to set here
  await payload.update({
    collection: 'pages',
    id: (await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } } })).docs[0].id,
    locale: 'en',
    context: { disableRevalidate: true },
    data: {
      title: 'Home',
      hero: {
        type: 'lowImpact',
        richText: { root: { type: 'root', children: [
          { type: 'heading', children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: 'Bones of Herbs', version: 1 }], direction: 'ltr', format: '', indent: 0, tag: 'h1', version: 1 },
          { type: 'heading', children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: 'Soul of Silence', version: 1 }], direction: 'ltr', format: '', indent: 0, tag: 'h1', version: 1 },
          { type: 'paragraph', children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: 'Six herbal personalities · Six object collections · One way of living', version: 1 }], direction: 'ltr', format: '', indent: 0, textFormat: 0, version: 1 },
        ], direction: 'ltr', format: '', indent: 0, version: 1 } },
        links: [{ link: { type: 'custom', appearance: 'default', label: 'Explore Objects', url: '/shop' } }],
      },
      meta: {
        title: 'CNNTURE — Eastern Herbal Objects',
        description: 'Herbs as bone, Zen as soul. Handcrafted herbal objects for everyday life.',
      },
    },
  })

  payload.logger.info('  ✓ CNNTURE homepage (zh, en)')
}
