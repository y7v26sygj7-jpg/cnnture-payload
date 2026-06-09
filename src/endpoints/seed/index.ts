import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest } from 'payload'

import { seedBrandPages } from './cnnture-pages'
import { seedHomepage } from './cnnture-homepage'

const collections: CollectionSlug[] = ['categories', 'pages', 'products', 'media']

const globals: GlobalSlug[] = ['header', 'footer']

const categories = [
  '草本饰品 Herbal Jewelry',
  '草本香薰 Herbal Aromatherapy',
  '禅意手串 Zen Bracelets',
  '草木文创 Herbal Stationery',
  '文化典藏 Cultural Treasures',
  '赠礼系列 Gifting',
]

export const seed = async ({ payload, req }: { payload: Payload; req: PayloadRequest }) => {
  payload.logger.info('Seeding CNNTURE database...')

  // Clear (skip if called from onInit which has no req)
  try {
    await Promise.all(
      globals.map((g) =>
        payload.updateGlobal({ slug: g, data: { navItems: [] }, depth: 0, context: { disableRevalidate: true } }),
      ),
    )
    for (const c of collections) {
      if (req) {
        await payload.db.deleteMany({ collection: c, req, where: {} })
        if (payload.collections[c]?.config?.versions) {
          await payload.db.deleteVersions({ collection: c, req, where: {} })
        }
      }
    }
  } catch (_) {
    // On first deploy the DB is empty, skip clearing
  }

  // Categories
  payload.logger.info('— Seeding categories...')
  await Promise.all(categories.map((c) => payload.create({ collection: 'categories', data: { title: c, slug: c } })))

  // Homepage (9-section CNNTURE brand)
  await seedHomepage(payload)

  // Brand pages (philosophy, craft, journal, about, faq, gift, contact, terms, privacy, shipping)
  await seedBrandPages(payload)

  // Header + Footer in all 6 languages
  payload.logger.info('— Seeding globals...')

  // Header: zh
  await payload.updateGlobal({
    slug: 'header', locale: 'zh',
    data: { navItems: [
      { link: { type: 'custom', label: '器物', url: '/shop' } },
      { link: { type: 'custom', label: '哲学', url: '/philosophy' } },
      { link: { type: 'custom', label: '工艺', url: '/craft' } },
      { link: { type: 'custom', label: '日志', url: '/journal' } },
      { link: { type: 'custom', label: '关于', url: '/about' } },
    ]},
  })

  const navMap: Record<string, string[]> = {
    en: ['Objects','Philosophy','Craft','Journal','About'],
    ja: ['器物','哲学','工芸','日誌','私たち'],
    fr: ['Objets','Philosophie','Artisanat','Journal','À propos'],
    de: ['Objekte','Philosophie','Handwerk','Journal','Über uns'],
    ko: ['기물','철학','공예','일지','소개'],
  }
  for (const [loc, labels] of Object.entries(navMap)) {
    await payload.updateGlobal({
      slug: 'header', locale: loc as any,
      data: { navItems: labels.map((l, i) => ({ link: { type: 'custom', label: l, url: ['/shop','/philosophy','/craft','/journal','/about'][i] } })) },
    })
  }

  // Footer — 6 languages
  const footer: Record<string, any> = {
    zh: { navItems: [{ label:'首页',url:'/'},{label:'器物',url:'/shop'},{label:'常见问题',url:'/faq'},{label:'联系我们',url:'/contact'},{label:'查询订单',url:'/find-order'}].map(x=>({link:{type:'custom',label:x.label,url:x.url}})), legalLinks: [{label:'服务条款',link:{type:'custom',label:'服务条款',url:'/terms'}},{label:'隐私政策',link:{type:'custom',label:'隐私政策',url:'/privacy'}},{label:'配送退换',link:{type:'custom',label:'配送退换',url:'/shipping'}}], brandTagline:'以草木为骨，以禅意为魂。东方草本器物品牌。' },
    en: { navItems: ['Home','Objects','FAQ','Contact','Find my order'].map(l=>({link:{type:'custom',label:l,url:l==='Home'?'/':'/'+l.toLowerCase().replace(/ /g,'-')}})), legalLinks: [{label:'Terms of Service',link:{type:'custom',label:'Terms of Service',url:'/terms'}},{label:'Privacy Policy',link:{type:'custom',label:'Privacy Policy',url:'/privacy'}},{label:'Shipping & Returns',link:{type:'custom',label:'Shipping & Returns',url:'/shipping'}}], brandTagline:'Herbal bones, Zen soul. Eastern herbal objects brand.' },
    ja: { navItems: ['ホーム','器物','よくある質問','お問い合わせ','注文検索'].map(l=>({link:{type:'custom',label:l,url:l==='ホーム'?'/':'/'+l.toLowerCase().replace(' ','')}})), legalLinks: [{label:'利用規約',link:{type:'custom',label:'利用規約',url:'/terms'}},{label:'プライバシーポリシー',link:{type:'custom',label:'プライバシーポリシー',url:'/privacy'}},{label:'配送・返品',link:{type:'custom',label:'配送・返品',url:'/shipping'}}], brandTagline:'草木を骨とし、禅意を魂とする。東洋の草本器物ブランド。' },
    fr: { navItems: ['Accueil','Objets','FAQ','Contact','Ma commande'].map(l=>({link:{type:'custom',label:l,url:l==='Accueil'?'/':'/'+l.toLowerCase().replace(/ /g,'-')}})), legalLinks: [{label:"Conditions d'utilisation",link:{type:'custom',label:"Conditions d'utilisation",url:'/terms'}},{label:'Politique de confidentialité',link:{type:'custom',label:'Politique de confidentialité',url:'/privacy'}},{label:'Livraison et retours',link:{type:'custom',label:'Livraison et retours',url:'/shipping'}}], brandTagline:"Os d'herbes, âme Zen. Marque d'objets herbacés d'Orient." },
    de: { navItems: ['Start','Objekte','FAQ','Kontakt','Bestellung finden'].map(l=>({link:{type:'custom',label:l,url:l==='Start'?'/':'/'+l.toLowerCase().replace(/ /g,'-')}})), legalLinks: [{label:'Nutzungsbedingungen',link:{type:'custom',label:'Nutzungsbedingungen',url:'/terms'}},{label:'Datenschutz',link:{type:'custom',label:'Datenschutz',url:'/privacy'}},{label:'Versand & Rückgabe',link:{type:'custom',label:'Versand & Rückgabe',url:'/shipping'}}], brandTagline:'Kräuterknochen, Zen-Seele. Östliche Kräuterobjektmarke.' },
    ko: { navItems: ['홈','기물','자주 묻는 질문','문의','주문 찾기'].map(l=>({link:{type:'custom',label:l,url:l==='홈'?'/':'/'+l.toLowerCase().replace(/ /g,'-')}})), legalLinks: [{label:'이용약관',link:{type:'custom',label:'이용약관',url:'/terms'}},{label:'개인정보처리방침',link:{type:'custom',label:'개인정보처리방침',url:'/privacy'}},{label:'배송 및 반품',link:{type:'custom',label:'배송 및 반품',url:'/shipping'}}], brandTagline:'초목을 뼈대로, 선의를 영혼으로. 동양 초본 기물 브랜드.' },
  }
  for (const [loc, data] of Object.entries(footer)) {
    await payload.updateGlobal({ slug: 'footer', locale: loc as any, data })
  }

  payload.logger.info('CNNTURE seed complete!')
}
