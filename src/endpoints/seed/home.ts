import type { Category, Media } from '@/payload-types'
import { RequiredDataFromCollectionSlug } from 'payload'

type ProductArgs = {
  metaImage: Media
  contentImage: Media
}

function p(text: string) {
  return {
    root: {
      type: 'root',
      children: [{
        type: 'paragraph',
        children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 }],
        direction: 'ltr', format: '', indent: 0, textFormat: 0, version: 1,
      }],
      direction: 'ltr', format: '', indent: 0, version: 1,
    },
  }
}

function h(text: string, tag: 'h1' | 'h2' | 'h3' = 'h2') {
  return {
    root: {
      type: 'root',
      children: [{
        type: 'heading',
        children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 }],
        direction: 'ltr', format: '', indent: 0, tag, version: 1,
      }],
      direction: 'ltr', format: '', indent: 0, version: 1,
    },
  }
}

export const homePageData: (args: ProductArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  metaImage,
  contentImage,
}) => {
  return {
    slug: 'home',
    _status: 'published',
    hero: {
      type: 'highImpact',
      richText: {
        root: {
          type: 'root',
          children: [
            { type: 'heading', children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: 'CNNTURE', version: 1 }], direction: 'ltr', format: '', indent: 0, tag: 'h1', version: 1 },
            { type: 'paragraph', children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: '中式自然', version: 1 }], direction: 'ltr', format: '', indent: 0, textFormat: 0, version: 1 },
            { type: 'paragraph', children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: '以草木为骨，以禅意为魂。东方草本器物品牌。', version: 1 }], direction: 'ltr', format: '', indent: 0, textFormat: 0, version: 1 },
          ],
          direction: 'ltr', format: '', indent: 0, version: 1,
        },
      },
      links: [
        { link: { type: 'custom', appearance: 'default', label: '探索器物', url: '/shop' } },
        { link: { type: 'custom', appearance: 'outline', label: '品牌哲学', url: '/philosophy' } },
      ],
      media: contentImage?.id ? contentImage.id : undefined,
    },
    layout: [
      {
        blockType: 'content',
        blockName: '六种草本人格',
        columns: [
          { richText: h('六种草本人格', 'h2'), size: 'full' },
          { richText: p('艾草 · 静尘 —— 两千年来，中国人佩艾草于襟前。不为药用，为的是一种安定的陪伴。'), size: 'oneThird' },
          { richText: p('桂花 · 疏隐 —— 中秋时节，桂花香飘十里。疏离而不冷漠，是桂花的人格。'), size: 'oneThird' },
          { richText: p('沉香 · 归寂 —— 沉香的形成需要数十年。在伤痛中凝结，在时间中沉淀。'), size: 'oneThird' },
          { richText: p('茯苓 · 素拙 —— 生于松根之下，朴素到几乎被忽略。但最安静的力量往往最持久。'), size: 'oneThird' },
          { richText: p('茉莉 · 无尘 —— 茉莉花开在夜晚。不争不抢，在最安静的时刻散发香气。'), size: 'oneThird' },
          { richText: p('枸杞 · 赤子 —— 红色的小果实，温暖、亲和。像冬日里的一杯热茶。'), size: 'oneThird' },
        ],
      },
      {
        blockType: 'content',
        blockName: '工艺',
        columns: [
          { richText: h('四道工序 · 手作之美', 'h2'), size: 'full' },
          { richText: p('采摘：在最适宜的季节，手工采摘每一株草药，保留其最完整的形态。'), size: 'half' },
          { richText: p('封存：将完整草药封入水晶树脂。每一件都是独一无二的排列。'), size: 'half' },
          { richText: p('干燥：自然阴干，不烘烤不漂白，保持草药的原色与原味。'), size: 'half' },
          { richText: p('打磨：手工抛光和镶嵌，配925纯银底座，反复检验直至完美。'), size: 'half' },
        ],
      },
      {
        blockType: 'cta',
        blockName: '探索器物',
        richText: h('选择与你气质相合的那一件', 'h2'),
        links: [
          { link: { type: 'custom', appearance: 'default', label: '浏览全部器物', url: '/shop' } },
          { link: { type: 'custom', appearance: 'outline', label: '关于 CNNTURE', url: '/about' } },
        ],
      },
    ],
    meta: {
      description: 'CNNTURE 中式自然 — 以草木为骨，以禅意为魂。东方草本器物品牌。六种草本人格，六大器物系列。',
      image: metaImage?.id ? metaImage.id : undefined,
      title: 'CNNTURE 中式自然 — 东方草本器物',
    },
    title: '首页',
  }
}
