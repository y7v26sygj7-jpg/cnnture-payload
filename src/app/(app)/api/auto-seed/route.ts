import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'
export const maxDuration = 120 // 2 min timeout on Vercel

export async function POST() {
  try {
    const payload = await getPayload({ config })

    // Check if already seeded
    const existing = await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } } })
    if (existing.totalDocs > 0) {
      return Response.json({ seeded: false, message: 'Already seeded' })
    }

    // Create 6 categories
    const cats = [
      '草本饰品 Herbal Jewelry',
      '草本香薰 Herbal Aromatherapy',
      '禅意手串 Zen Bracelets',
      '草木文创 Herbal Stationery',
      '文化典藏 Cultural Treasures',
      '赠礼系列 Gifting',
    ]
    for (const c of cats) {
      await payload.db.create({ collection: 'categories', data: { title: c, slug: c } })
    }

    // Create homepage
    await payload.db.create({
      collection: 'pages',
      data: {
        slug: 'home', _status: 'published', title: '首页',
        hero: { type: 'lowImpact', richText: { root: { type: 'root', children: [
          { type: 'heading', children: [{ type: 'text', detail:0, format:0, mode:'normal', style:'', text:'以草木为骨', version:1 }], direction:'ltr', format:'', indent:0, tag:'h1', version:1 },
          { type: 'heading', children: [{ type: 'text', detail:0, format:0, mode:'normal', style:'', text:'以禅意为魂', version:1 }], direction:'ltr', format:'', indent:0, tag:'h1', version:1 },
          { type: 'paragraph', children: [{ type: 'text', detail:0, format:0, mode:'normal', style:'', text:'Bones of Herbs · Soul of Silence', version:1 }], direction:'ltr', format:'', indent:0, textFormat:0, version:1 },
          { type: 'paragraph', children: [{ type: 'text', detail:0, format:0, mode:'normal', style:'', text:'六种草本性格 · 六种东方器物 · 一种生活态度', version:1 }], direction:'ltr', format:'', indent:0, textFormat:0, version:1 },
        ], direction:'ltr', format:'', indent:0, version:1 } }, links: [{ link: { type:'custom', appearance:'default', label:'探 索 器 物', url:'/shop' } }] },
        layout: [
          { blockType:'content', columns:[
            { richText:{ root:{ type:'root', children:[{ type:'heading', children:[{ type:'text', detail:0, format:0, mode:'normal', style:'', text:'万物有灵，草木有性', version:1 }], direction:'ltr', format:'', indent:0, tag:'h2', version:1 }], direction:'ltr', format:'', indent:0, version:1 } }, size:'full' },
            { richText:{ root:{ type:'root', children:[{ type:'paragraph', children:[{ type:'text', detail:0, format:0, mode:'normal', style:'', text:'我们相信每一株草木都有自己的性格。艾草沉静，陈皮内敛，桂花疏淡——它们不只是植物，它们是古人对话自然的语言。我们用器物翻译这些语言，让它们进入你的日常。', version:1 }], direction:'ltr', format:'', indent:0, textFormat:0, version:1 }], direction:'ltr', format:'', indent:0, version:1 } }, size:'full' },
          ]},
          { blockType:'cta', richText:{ root:{ type:'root', children:[{ type:'heading', children:[{ type:'text', detail:0, format:0, mode:'normal', style:'', text:'按照你的步调继续', version:1 }], direction:'ltr', format:'', indent:0, tag:'h2', version:1 }], direction:'ltr', format:'', indent:0, version:1 } }, links:[
            { link: { type: 'custom', appearance: 'default', label: '浏览全部器物', url: '/shop' } },
            { link: { type: 'custom', appearance: 'outline', label: '关于 CNNTURE', url: '/about' } },
          ]},
        ],
        meta: { title:'CNNTURE 中式自然 — 东方草本器物', description:'以草木为骨，以禅意为魂。东方草本器物品牌。' },
      },
    })

    return Response.json({ seeded: true, message: 'Seed complete' })
  } catch (e: any) {
    return Response.json({ error: e.message, stack: e.stack?.split('\n').slice(0, 3).join('\n') }, { status: 500 })
  }
}
