import type { Page } from '@/payload-types'
import { Payload } from 'payload'

/**
 * CNNTURE brand pages seed data.
 * Creates 10 pages across 6 languages.
 */

// Helper: create a simple richText paragraph block
function paragraph(text: string) {
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

function heading(text: string, tag: 'h1' | 'h2' | 'h3' = 'h2') {
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

type PageSeed = {
  slug: string
  title: Record<string, string>
  meta: Record<string, { title: string; description: string }>
  layout: Record<string, any[]>
}

export const cnnturePages: PageSeed[] = [
  // ==========================================
  // 1. Philosophy (品牌哲学)
  // ==========================================
  {
    slug: 'philosophy',
    title: {
      zh: '品牌哲学', en: 'Philosophy', ja: 'ブランド哲学', fr: 'Philosophie', de: 'Philosophie', ko: '브랜드 철학',
    },
    meta: {
      zh: { title: '品牌哲学 — CNNTURE', description: '六种草本人格，六种东方生活美学。每一株草药都有自己的性格，选择与你气质相合的那一株。' },
      en: { title: 'Philosophy — CNNTURE', description: 'Six herbal personalities, six Eastern aesthetics of living. Every herb has its character — choose the one that matches yours.' },
      ja: { title: 'ブランド哲学 — CNNTURE', description: '六つの草本パーソナリティ、六つの東洋生活美学。' },
      fr: { title: 'Philosophie — CNNTURE', description: "Six personnalités herbacées, six esthétiques de vie orientales." },
      de: { title: 'Philosophie — CNNTURE', description: 'Sechs Kräuterpersönlichkeiten, sechs östliche Lebensästhetiken.' },
      ko: { title: '브랜드 철학 — CNNTURE', description: '여섯 가지 초본 페르소나, 여섯 가지 동양 생활 미학.' },
    },
    layout: {
      zh: [
        { blockType: 'content', columns: [{ richText: heading('草本人格 · 六种性格', 'h1'), size: 'full' }, { richText: paragraph('中国草药学两千年来不只关注药理——更关注性格。每一株草药都对应一种人格：艾草的安静、桂花的疏离、沉香的回归、茯苓的朴素、茉莉的纯净、枸杞的温情。'), size: 'full' }, { richText: paragraph('CNNTURE 的器物系列正是这六种性格的物化表达。选择与你气质相合的那一株——这不是一件首饰，这是一个沉默的同伴。'), size: 'full' }] },
        { blockType: 'cta', richText: heading('选择你的草本人格', 'h2'), links: [{ link: { type: 'custom', appearance: 'default', label: '探索器物', url: '/shop' } }] },
      ],
      en: [
        { blockType: 'content', columns: [{ richText: heading('Herbal Personalities · Six Characters', 'h1'), size: 'full' }, { richText: paragraph('For two thousand years, Chinese herbalism has focused not only on pharmacology — but on personality. Each herb corresponds to a human character: Mugwort\'s quietude, Osmanthus\'s reclusion, Agarwood\'s return, Poria\'s simplicity, Jasmine\'s purity, Goji\'s warmth.'), size: 'full' }, { richText: paragraph('CNNTURE\'s object collections are the material expression of these six characters. Choose the herb that matches your temperament — this is not jewelry, it is a silent companion.'), size: 'full' }] },
        { blockType: 'cta', richText: heading('Find Your Herbal Personality', 'h2'), links: [{ link: { type: 'custom', appearance: 'default', label: 'Explore Objects', url: '/shop' } }] },
      ],
      ja: [
        { blockType: 'content', columns: [{ richText: heading('草本パーソナリティ · 六つの性格', 'h1'), size: 'full' }, { richText: paragraph('中国の本草学は二千年にわたり、薬理だけでなく性格にも注目してきました。各草本は人間の性格に対応します。'), size: 'full' }] },
      ],
      fr: [
        { blockType: 'content', columns: [{ richText: heading('Personnalités Herbacées · Six Caractères', 'h1'), size: 'full' }, { richText: paragraph("Depuis deux mille ans, l'herboristerie chinoise s'intéresse non seulement à la pharmacologie — mais aussi à la personnalité. Chaque herbe correspond à un caractère humain."), size: 'full' }] },
      ],
      de: [
        { blockType: 'content', columns: [{ richText: heading('Kräuterpersönlichkeiten · Sechs Charaktere', 'h1'), size: 'full' }, { richText: paragraph('Seit zweitausend Jahren konzentriert sich die chinesische Kräuterkunde nicht nur auf Pharmakologie — sondern auf Persönlichkeit. Jedes Kraut entspricht einem menschlichen Charakter.'), size: 'full' }] },
      ],
      ko: [
        { blockType: 'content', columns: [{ richText: heading('초본 페르소나 · 여섯 가지 성격', 'h1'), size: 'full' }, { richText: paragraph('2천년 동안 중국 본초학은 약리뿐만 아니라 성격에도 주목해 왔습니다. 각 초본은 인간의 성격에 대응합니다.'), size: 'full' }] },
      ],
    },
  },

  // ==========================================
  // 2. Craft (手作工艺)
  // ==========================================
  {
    slug: 'craft',
    title: {
      zh: '手作工艺', en: 'Craft', ja: '手仕事の工芸', fr: 'Artisanat', de: 'Handwerk', ko: '공예',
    },
    meta: {
      zh: { title: '手作工艺 — CNNTURE', description: '每一件器物都经过采摘、干燥、封存、打磨四道工序。真草药，真手工，独一无二。' },
      en: { title: 'Craft — CNNTURE', description: 'Every object goes through harvest, drying, sealing, and polishing. Real herbs, real handcraft, each piece unique.' },
      ja: { title: '手仕事の工芸 — CNNTURE', description: 'すべての器物は採取、乾燥、封入、研磨の四工程を経ます。' },
      fr: { title: 'Artisanat — CNNTURE', description: "Chaque objet passe par quatre étapes : récolte, séchage, scellement et polissage." },
      de: { title: 'Handwerk — CNNTURE', description: 'Jedes Objekt durchläuft vier Schritte: Ernte, Trocknung, Versiegelung und Politur.' },
      ko: { title: '공예 — CNNTURE', description: '모든 기물은 채집, 건조, 봉인, 연마의 네 단계를 거칩니다.' },
    },
    layout: {
      zh: [
        { blockType: 'content', columns: [{ richText: heading('四道工序 · 手作之美', 'h1'), size: 'full' }, { richText: paragraph('采摘：在最适宜的季节，手工采摘每一株草药，保留其最完整的形态。'), size: 'half' }, { richText: paragraph('干燥：自然阴干，不烘烤不漂白，保持草药的原色与原味。'), size: 'half' }, { richText: paragraph('封存：将完整草药封入水晶树脂，每一件都是独一无二的排列。'), size: 'half' }, { richText: paragraph('打磨：手工抛光和镶嵌，配925纯银底座，反复检验直至完美。'), size: 'half' }] },
      ],
      en: [
        { blockType: 'content', columns: [{ richText: heading('Four Steps · The Beauty of Handcraft', 'h1'), size: 'full' }, { richText: paragraph('Harvest: Each herb is hand-picked in its optimal season, preserving its most complete form.'), size: 'half' }, { richText: paragraph('Dry: Naturally shade-dried — no baking, no bleaching — keeping the herb\'s original color and character.'), size: 'half' }, { richText: paragraph('Seal: Whole herbs are sealed in crystal resin. Each piece has a unique botanical arrangement.'), size: 'half' }, { richText: paragraph('Polish: Hand-polished and set in 925 sterling silver, inspected repeatedly until perfect.'), size: 'half' }] },
      ],
      ja: [
        { blockType: 'content', columns: [{ richText: heading('四つの工程 · 手仕事の美', 'h1'), size: 'full' }, { richText: paragraph('採取：最適な季節に一株ずつ手摘みし、最も完全な形を保ちます。'), size: 'half' }, { richText: paragraph('乾燥：自然陰干し。焼かず、漂白せず、本来の色と性質を保ちます。'), size: 'half' }, { richText: paragraph('封入：完全な状態で水晶樹脂に封入。一つひとつが唯一無二の配置です。'), size: 'half' }, { richText: paragraph('研磨：手作業で研磨し、925純銀の台座にセット。完璧になるまで検査を繰り返します。'), size: 'half' }] },
      ],
      fr: [
        { blockType: 'content', columns: [{ richText: heading("Quatre Étapes · La Beauté de l'Artisanat", 'h1'), size: 'full' }, { richText: paragraph("Récolte : Chaque herbe est cueillie à la main durant sa saison optimale."), size: 'half' }, { richText: paragraph("Séchage : Séchage naturel à l'ombre — sans cuisson, sans blanchiment."), size: 'half' }, { richText: paragraph('Scellement : Les herbes entières sont scellées dans de la résine cristal.'), size: 'half' }, { richText: paragraph("Polissage : Poli à la main et serti dans de l'argent sterling 925."), size: 'half' }] },
      ],
      de: [
        { blockType: 'content', columns: [{ richText: heading('Vier Schritte · Die Schönheit des Handwerks', 'h1'), size: 'full' }, { richText: paragraph('Ernte: Jedes Kraut wird in seiner optimalen Saison von Hand gepflückt.'), size: 'half' }, { richText: paragraph('Trocknung: Natürlich schattengetrocknet — kein Backen, kein Bleichen.'), size: 'half' }, { richText: paragraph('Versiegelung: Ganze Kräuter werden in Kristallharz versiegelt.'), size: 'half' }, { richText: paragraph('Politur: Handpoliert und in 925 Sterlingsilber gefasst.'), size: 'half' }] },
      ],
      ko: [
        { blockType: 'content', columns: [{ richText: heading('네 단계 · 수공예의 아름다움', 'h1'), size: 'full' }, { richText: paragraph('채집: 최적의 계절에 한 포기씩 손으로 채집하여 가장 완전한 형태를 보존합니다.'), size: 'half' }, { richText: paragraph('건조: 자연 음건. 굽지 않고 표백하지 않아 본래의 색과 성질을 유지합니다.'), size: 'half' }, { richText: paragraph('봉인: 온전한 상태로 크리스탈 레진에 봉인. 하나하나가 유일무이한 배치입니다.'), size: 'half' }, { richText: paragraph('연마: 수작업으로 연마하고 925 순은 베이스에 세팅. 완벽해질 때까지 반복 검사합니다.'), size: 'half' }] },
      ],
    },
  },

  // ==========================================
  // 3. Journal (草木日志)
  // ==========================================
  {
    slug: 'journal',
    title: {
      zh: '草木日志', en: 'Journal', ja: '日誌', fr: 'Journal', de: 'Journal', ko: '일지',
    },
    meta: {
      zh: { title: '草木日志 — CNNTURE', description: '从端午艾草到景德镇陶瓷，从五行哲学到非遗工艺。记录每一株草药的故事。' },
      en: { title: 'Journal — CNNTURE', description: 'From Dragon Boat mugwort to Jingdezhen ceramics, from Five Elements philosophy to intangible heritage crafts.' },
      ja: { title: '日誌 — CNNTURE', description: '端午の艾草から景徳鎮の陶磁器まで、五行哲学から無形文化遺産の工芸まで。' },
      fr: { title: 'Journal — CNNTURE', description: "De l'armoise du Festival des Bateaux-Dragons à la céramique de Jingdezhen." },
      de: { title: 'Journal — CNNTURE', description: 'Vom Drachenboot-Beifuß bis zur Jingdezhen-Keramik, von der Fünf-Elemente-Philosophie bis zum immateriellen Kulturerbe.' },
      ko: { title: '일지 — CNNTURE', description: '단오절 애초부터 징더전 도자기까지, 오행 철학부터 무형문화유산 공예까지.' },
    },
    layout: {
      zh: [
        { blockType: 'content', columns: [{ richText: heading('草木日志', 'h1'), size: 'full' }, { richText: paragraph('记录每一株草药的故事，每一次手工的细节，每一件器物的诞生。'), size: 'full' }, { richText: heading('端午 · 艾草与时间', 'h3'), size: 'full' }, { richText: paragraph('每年端午，中国家庭将艾草悬挂于门楣。两千年了，这株植物的意义不是"疗效"，而是"陪伴"。我们的艾草系列正是从这一传统出发——当一株真实的艾草被永久封存在水晶中，它便成为了一个时间的锚点。'), size: 'full' }, { richText: heading('五行 · 香的哲学', 'h3'), size: 'full' }, { richText: paragraph('木生火，火生土，土生金，金生水，水生木。五行不是元素，是关系。我们的五行蜡烛系列按照相生顺序排列香型——檀木（木）→ 肉桂（火）→ 广藿香（土）→ 没药（金）→ 薄荷（水）。点燃一支蜡烛，你闻到的是两千年的哲学。'), size: 'full' }, { richText: heading('景德镇 · 泥土与火焰', 'h3'), size: 'full' }, { richText: paragraph('景德镇的匠人说："一窑千变，无一相同。"我们的粗陶系列正是这个道理——每一件器物都经过1300°的高温，釉料在火中产生不可预测的变化。每一件都是独一无二的。'), size: 'full' }] },
      ],
      en: [
        { blockType: 'content', columns: [{ richText: heading('Herbal Journal', 'h1'), size: 'full' }, { richText: paragraph('Chronicles of herbs, details of handcraft, the birth of each object.'), size: 'full' }, { richText: heading('Dragon Boat · Mugwort and Time', 'h3'), size: 'full' }, { richText: paragraph('Every Dragon Boat Festival, Chinese families hang mugwort on their doors. For two thousand years, this plant has signified not "efficacy" but "companionship." Our Mugwort collection begins from this tradition.'), size: 'full' }, { richText: heading('Five Elements · The Philosophy of Scent', 'h3'), size: 'full' }, { richText: paragraph('Wood feeds Fire, Fire feeds Earth, Earth feeds Metal, Metal feeds Water, Water feeds Wood. Our Five Elements candles are arranged by the generative cycle.'), size: 'full' }, { richText: heading('Jingdezhen · Earth and Flame', 'h3'), size: 'full' }, { richText: paragraph('"One kiln, a thousand transformations — no two alike." Our Rustic series follows this principle, each piece fired at 1300°C with unpredictable glaze variations.'), size: 'full' }] },
      ],
    },
  },

  // ==========================================
  // 4. About (品牌故事)
  // ==========================================
  {
    slug: 'about',
    title: {
      zh: '关于我们', en: 'About', ja: '私たちについて', fr: 'À propos', de: 'Über uns', ko: '소개',
    },
    meta: {
      zh: { title: '关于我们 — CNNTURE', description: '一段广州清平市场的散步，走向了中式自然的起点。2019-2025，从一株艾草到六大器物系列。' },
      en: { title: 'About — CNNTURE', description: 'A walk through Guangzhou\'s Qingping Market became the origin of CNNTURE. 2019-2025, from one mugwort plant to six object collections.' },
      ja: { title: '私たちについて — CNNTURE', description: '広州清平市場での散歩がCNNTUREの原点となりました。2019-2025、一本の艾草から六つの器物シリーズへ。' },
      fr: { title: 'À propos — CNNTURE', description: "Une promenade au marché Qingping de Guangzhou est devenue l'origine de CNNTURE." },
      de: { title: 'Über uns — CNNTURE', description: 'Ein Spaziergang über den Qingping-Markt in Guangzhou wurde zum Ursprung von CNNTURE.' },
      ko: { title: '소개 — CNNTURE', description: '광저우 칭핑 시장에서의 산책이 CNNTURE의 기원이 되었습니다. 2019-2025.' },
    },
    layout: {
      zh: [
        { blockType: 'content', columns: [{ richText: heading('品牌故事', 'h1'), size: 'full' }, { richText: paragraph('2019年春天，创始人在广州清平市场散步。空气中弥漫着数百种草药的气味——艾草、桂花、沉香、茯苓、枸杞、茉莉。每一种草药都承载着一个故事、一种性格。那一刻的触动，成为了CNNTURE的起点。'), size: 'full' }, { richText: paragraph('我们相信，草药不只是药材——它们是性格的载体，是时间的见证，是文化的印记。每一件CNNTURE的器物，都是一株真实的草药与一段东方美学故事的结合。'), size: 'full' }] },
        { blockType: 'cta', richText: heading('装饰性文化饰品。不作任何健康声明。', 'h3'), links: [{ link: { type: 'custom', appearance: 'default', label: '探索六大系列', url: '/shop' } }] },
      ],
      en: [
        { blockType: 'content', columns: [{ richText: heading('Brand Story', 'h1'), size: 'full' }, { richText: paragraph('Spring 2019. The founder walks through Guangzhou\'s Qingping Market. The air carries the scent of hundreds of herbs — mugwort, osmanthus, agarwood, poria, goji, jasmine. Each herb carries a story, a personality. That moment became the origin of CNNTURE.'), size: 'full' }, { richText: paragraph('We believe herbs are more than medicine — they are carriers of character, witnesses of time, imprints of culture. Every CNNTURE object is a union of a real herb and an Eastern aesthetic story.'), size: 'full' }] },
      ],
    },
  },

  // ==========================================
  // 5. FAQ (常见问题)
  // ==========================================
  {
    slug: 'faq',
    title: {
      zh: '常见问题', en: 'FAQ', ja: 'よくある質問', fr: 'FAQ', de: 'FAQ', ko: '자주 묻는 질문',
    },
    meta: {
      zh: { title: '常见问题 — CNNTURE', description: '关于产品真伪、养护、配送、退换等常见问题的解答。' },
      en: { title: 'FAQ — CNNTURE', description: 'Answers to common questions about authenticity, care, shipping, and returns.' },
      ja: { title: 'よくある質問 — CNNTURE', description: '製品の真正性、お手入れ、配送、返品に関するよくある質問への回答。' },
      fr: { title: 'FAQ — CNNTURE', description: "Réponses aux questions fréquentes sur l'authenticité, l'entretien, la livraison et les retours." },
      de: { title: 'FAQ — CNNTURE', description: 'Antworten auf häufige Fragen zu Echtheit, Pflege, Versand und Rückgaben.' },
      ko: { title: '자주 묻는 질문 — CNNTURE', description: '진품 여부, 관리, 배송, 반품에 관한 자주 묻는 질문에 대한 답변.' },
    },
    layout: {
      zh: [
        { blockType: 'content', columns: [{ richText: heading('常见问题', 'h1'), size: 'full' }, { richText: heading('产品是否使用真实草药？', 'h3'), size: 'full' }, { richText: paragraph('是的。每一件CNNTURE器物都使用真实、完整的草药——采摘后在最佳状态下封入水晶树脂。'), size: 'full' }, { richText: heading('是否有健康或医疗功效？', 'h3'), size: 'full' }, { richText: paragraph('没有。CNNTURE是装饰性文化饰品品牌。我们不声称、不暗示、不鼓励任何形式的医疗用途。'), size: 'full' }, { richText: heading('草本饰品如何保养？', 'h3'), size: 'full' }, { richText: paragraph('避免接触水和化学品；不佩戴时请放入丝绒袋中保存；避免阳光直射以免树脂变色。'), size: 'full' }, { richText: heading('配送区域和费用？', 'h3'), size: 'full' }, { richText: paragraph('我们配送到全球。美国标准配送$5.99（满$50免运费），国际配送$15.99起。详见配送退换页面。'), size: 'full' }, { richText: heading('可以退换吗？', 'h3'), size: 'full' }, { richText: paragraph('收到商品后30天内可以退货。商品需保持原状、未经使用、保留原包装。定制商品不可退换。'), size: 'full' }] },
      ],
      en: [
        { blockType: 'content', columns: [{ richText: heading('Frequently Asked Questions', 'h1'), size: 'full' }, { richText: heading('Are the herbs real?', 'h3'), size: 'full' }, { richText: paragraph('Yes. Every CNNTURE object uses real, whole herbs — harvested and sealed in crystal resin at their peak condition.'), size: 'full' }, { richText: heading('Are there health or medical benefits?', 'h3'), size: 'full' }, { richText: paragraph('No. CNNTURE is a decorative cultural accessories brand. We make no health claims, express or implied.'), size: 'full' }, { richText: heading('How do I care for herbal jewelry?', 'h3'), size: 'full' }, { richText: paragraph('Avoid water and chemicals; store in the included velvet pouch when not worn; avoid direct sunlight to prevent resin discoloration.'), size: 'full' }, { richText: heading('Where do you ship and how much?', 'h3'), size: 'full' }, { richText: paragraph('We ship worldwide. US standard shipping $5.99 (free over $50). International shipping from $15.99. See Shipping & Returns for details.'), size: 'full' }, { richText: heading('Can I return or exchange?', 'h3'), size: 'full' }, { richText: paragraph('30-day returns accepted. Items must be unworn, unused, in original packaging. Custom orders are final sale.'), size: 'full' }] },
      ],
    },
  },

  // ==========================================
  // 6. Gifting (赠礼系列)
  // ==========================================
  {
    slug: 'gift',
    title: {
      zh: '赠礼系列', en: 'Gifting', ja: '贈り物', fr: 'Cadeaux', de: 'Geschenke', ko: '선물',
    },
    meta: {
      zh: { title: '赠礼系列 — CNNTURE', description: '以草木之美赠予重要的人。每件礼盒含完整故事册页、养护指南与品牌手提袋。' },
      en: { title: 'Gifting — CNNTURE', description: 'Give the beauty of herbs to those who matter. Each gift box includes a story booklet, care guide, and brand tote.' },
      ja: { title: '贈り物 — CNNTURE', description: '大切な人に草木の美しさを贈る。各ギフトボックスには物語の小冊子とお手入れガイドが付属します。' },
      fr: { title: 'Cadeaux — CNNTURE', description: "Offrez la beauté des herbes à ceux qui comptent. Chaque coffret comprend un livret d'histoire et un guide d'entretien." },
      de: { title: 'Geschenke — CNNTURE', description: 'Schenken Sie die Schönheit der Kräuter. Jede Geschenkbox enthält ein Geschichtenheft und eine Pflegeanleitung.' },
      ko: { title: '선물 — CNNTURE', description: '소중한 사람에게 초목의 아름다움을 선물하세요. 각 선물 상자에는 이야기 소책자와 관리 가이드가 포함됩니다.' },
    },
    layout: {
      zh: [
        { blockType: 'content', columns: [{ richText: heading('赠礼系列', 'h1'), size: 'full' }, { richText: paragraph('每一件CNNTURE器物都配有真丝收纳袋、草本故事册页、养护指南和品牌礼盒。免费礼品包装。'), size: 'full' }, { richText: paragraph('五款精选礼盒：草本饰品礼盒、五行香薰礼盒、禅修礼盒、艾草全套礼盒、桂花季节限定礼盒。此外，我们提供企业定制和私人定制服务。'), size: 'full' }] },
        { blockType: 'cta', richText: heading('需要定制礼品？联系我们。', 'h3'), links: [{ link: { type: 'custom', appearance: 'default', label: '定制咨询', url: '/contact' } }] },
      ],
      en: [
        { blockType: 'content', columns: [{ richText: heading('Gifting', 'h1'), size: 'full' }, { richText: paragraph('Every CNNTURE object comes with a silk pouch, herbal story booklet, care guide, and brand gift box. Free gift wrapping included.'), size: 'full' }, { richText: paragraph('Five curated gift boxes: Herbal Jewelry, Five Elements, Zen Meditation, Mugwort Complete, and Osmanthus Seasonal. We also offer corporate and custom gifting services.'), size: 'full' }] },
      ],
    },
  },

  // ==========================================
  // 7. Contact (联系我们)
  // ==========================================
  {
    slug: 'contact',
    title: {
      zh: '联系我们', en: 'Contact', ja: 'お問い合わせ', fr: 'Contact', de: 'Kontakt', ko: '문의',
    },
    meta: {
      zh: { title: '联系我们 — CNNTURE', description: '有任何问题或定制需求？请通过表单联系我们。工作室位于广州。' },
      en: { title: 'Contact — CNNTURE', description: 'Have questions or custom requests? Reach out via the form. Studio based in Guangzhou.' },
      ja: { title: 'お問い合わせ — CNNTURE', description: 'ご質問やカスタムのご要望はフォームからお問い合わせください。' },
      fr: { title: 'Contact — CNNTURE', description: 'Des questions ou des demandes personnalisées ? Contactez-nous via le formulaire.' },
      de: { title: 'Kontakt — CNNTURE', description: 'Fragen oder individuelle Wünsche? Kontaktieren Sie uns über das Formular.' },
      ko: { title: '문의 — CNNTURE', description: '질문이나 맞춤 요청이 있으신가요? 양식을 통해 문의해 주세요.' },
    },
    layout: {
      zh: [
        { blockType: 'content', columns: [{ richText: heading('联系我们', 'h1'), size: 'full' }, { richText: paragraph('有任何问题、定制需求或合作意向？请填写以下表单，我们会在24小时内回复。'), size: 'full' }, { richText: paragraph('工作室地址：广州市荔湾区 · 仅限预约'), size: 'full' }, { richText: paragraph('邮箱：hello@cnnture.com'), size: 'full' }] },
      ],
      en: [
        { blockType: 'content', columns: [{ richText: heading('Contact Us', 'h1'), size: 'full' }, { richText: paragraph('Questions, custom requests, or collaborations? Fill out the form and we\'ll reply within 24 hours.'), size: 'full' }, { richText: paragraph('Studio: Liwan District, Guangzhou · Appointment only'), size: 'full' }, { richText: paragraph('Email: hello@cnnture.com'), size: 'full' }] },
      ],
    },
  },

  // ==========================================
  // 8. Terms (服务条款)
  // ==========================================
  {
    slug: 'terms',
    title: {
      zh: '服务条款', en: 'Terms of Service', ja: '利用規約', fr: "Conditions d'utilisation", de: 'Nutzungsbedingungen', ko: '이용약관',
    },
    meta: {
      zh: { title: '服务条款 — CNNTURE', description: '网站使用条款与条件。' },
      en: { title: 'Terms of Service — CNNTURE', description: 'Website terms and conditions.' },
      ja: { title: '利用規約 — CNNTURE', description: 'ウェブサイト利用規約。' },
      fr: { title: "Conditions d'utilisation — CNNTURE", description: "Conditions générales d'utilisation du site." },
      de: { title: 'Nutzungsbedingungen — CNNTURE', description: 'Allgemeine Geschäftsbedingungen der Website.' },
      ko: { title: '이용약관 — CNNTURE', description: '웹사이트 이용약관.' },
    },
    layout: {
      zh: [
        { blockType: 'content', columns: [{ richText: heading('服务条款', 'h1'), size: 'full' }, { richText: paragraph('概述：本网站由CNNTURE运营。访问或使用本网站即表示您同意受本条款约束。'), size: 'full' }, { richText: paragraph('产品与描述：我们尽力在网站上准确显示产品的颜色和图像。由于手工制作，每件产品可能存在轻微差异。天然材料的色差、尺寸差异是产品的特性，不视为缺陷。'), size: 'full' }, { richText: paragraph('订单与支付：所有订单以我们最终确认为准。我们保留拒绝或取消任何订单的权利。价格以美元标示，可能随时变更。'), size: 'full' }, { richText: paragraph('知识产权：CNNTURE品牌名称、Logo、草本人格体系、网站内容均受知识产权保护。'), size: 'full' }, { richText: paragraph('责任限制：CNNTURE对任何间接、偶然或后果性损害不承担责任。'), size: 'full' }] },
      ],
      en: [
        { blockType: 'content', columns: [{ richText: heading('Terms of Service', 'h1'), size: 'full' }, { richText: paragraph('Overview: This website is operated by CNNTURE. By accessing or using this website, you agree to be bound by these terms.'), size: 'full' }, { richText: paragraph('Products & Descriptions: We make every effort to display product colors and images accurately. Due to handcrafting, each piece may have minor variations. Natural material variations are characteristics, not defects.'), size: 'full' }, { richText: paragraph('Orders & Payment: All orders are subject to our final confirmation. We reserve the right to refuse or cancel any order. Prices are in USD and subject to change.'), size: 'full' }, { richText: paragraph('Intellectual Property: The CNNTURE brand name, logo, herbal personality system, and website content are protected by intellectual property rights.'), size: 'full' }, { richText: paragraph('Limitation of Liability: CNNTURE shall not be liable for any indirect, incidental, or consequential damages.'), size: 'full' }] },
      ],
    },
  },

  // ==========================================
  // 9. Privacy (隐私政策)
  // ==========================================
  {
    slug: 'privacy',
    title: {
      zh: '隐私政策', en: 'Privacy Policy', ja: 'プライバシーポリシー', fr: 'Politique de confidentialité', de: 'Datenschutz', ko: '개인정보처리방침',
    },
    meta: {
      zh: { title: '隐私政策 — CNNTURE', description: '我们如何收集、使用和保护您的个人信息。' },
      en: { title: 'Privacy Policy — CNNTURE', description: 'How we collect, use, and protect your personal information.' },
      ja: { title: 'プライバシーポリシー — CNNTURE', description: 'お客様の個人情報の収集、使用、保護について。' },
      fr: { title: 'Politique de confidentialité — CNNTURE', description: 'Comment nous collectons, utilisons et protégeons vos informations personnelles.' },
      de: { title: 'Datenschutz — CNNTURE', description: 'Wie wir Ihre personenbezogenen Daten sammeln, verwenden und schützen.' },
      ko: { title: '개인정보처리방침 — CNNTURE', description: '귀하의 개인정보 수집, 이용 및 보호 방법.' },
    },
    layout: {
      zh: [
        { blockType: 'content', columns: [{ richText: heading('隐私政策', 'h1'), size: 'full' }, { richText: paragraph('信息收集：我们收集您在注册、下单或填写表单时提供的信息，包括姓名、邮箱、地址和支付信息。支付信息由Stripe处理，我们不会在服务器上存储完整的信用卡号。'), size: 'full' }, { richText: paragraph('信息使用：我们使用您的信息来处理订单、发送订单确认和物流更新、回复客服请求、以及（经您同意后）发送营销邮件。'), size: 'full' }, { richText: paragraph('信息共享：我们不会出售、交易或转让您的个人信息给第三方，除非是为了履行订单（如快递公司）或法律要求。'), size: 'full' }, { richText: paragraph('Cookie：我们使用Cookie来提升您的浏览体验、分析网站流量和记住您的偏好。您可以在浏览器设置中管理Cookie。'), size: 'full' }, { richText: paragraph('您的权利：您可以随时请求查看、修改或删除您的个人信息。请联系hello@cnnture.com。'), size: 'full' }] },
      ],
      en: [
        { blockType: 'content', columns: [{ richText: heading('Privacy Policy', 'h1'), size: 'full' }, { richText: paragraph('Information Collection: We collect information you provide when registering, placing an order, or filling out forms, including name, email, address, and payment details. Payment info is processed by Stripe — we do not store full card numbers.'), size: 'full' }, { richText: paragraph('Information Use: We use your information to process orders, send confirmations and shipping updates, respond to support requests, and (with your consent) send marketing emails.'), size: 'full' }, { richText: paragraph('Information Sharing: We do not sell, trade, or transfer your personal information to third parties except to fulfill orders (e.g. shipping carriers) or as required by law.'), size: 'full' }, { richText: paragraph('Cookies: We use cookies to enhance your browsing experience, analyze traffic, and remember preferences. You can manage cookies in your browser settings.'), size: 'full' }, { richText: paragraph('Your Rights: You may request to view, modify, or delete your personal information at any time. Contact hello@cnnture.com.'), size: 'full' }] },
      ],
    },
  },

  // ==========================================
  // 10. Shipping (配送退换)
  // ==========================================
  {
    slug: 'shipping',
    title: {
      zh: '配送与退换', en: 'Shipping & Returns', ja: '配送・返品', fr: 'Livraison et retours', de: 'Versand & Rückgabe', ko: '배송 및 반품',
    },
    meta: {
      zh: { title: '配送与退换 — CNNTURE', description: '全球配送费率、时效与30天退换政策。' },
      en: { title: 'Shipping & Returns — CNNTURE', description: 'Global shipping rates, delivery times, and 30-day return policy.' },
      ja: { title: '配送・返品 — CNNTURE', description: '世界中の配送料金、配達時間、30日間の返品ポリシー。' },
      fr: { title: 'Livraison et retours — CNNTURE', description: 'Tarifs de livraison mondiaux, délais et politique de retour de 30 jours.' },
      de: { title: 'Versand & Rückgabe — CNNTURE', description: 'Weltweite Versandkosten, Lieferzeiten und 30-Tage-Rückgaberecht.' },
      ko: { title: '배송 및 반품 — CNNTURE', description: '글로벌 배송 요금, 배송 시간 및 30일 반품 정책.' },
    },
    layout: {
      zh: [
        { blockType: 'content', columns: [{ richText: heading('配送与退换政策', 'h1'), size: 'full' }, { richText: paragraph('处理时间：订单在1-2个工作日内处理。工作日为周一至周五（中国法定节假日除外）。'), size: 'full' }, { richText: heading('配送费率', 'h2'), size: 'full' }, { richText: paragraph('美国：标准$5.99（7-14天），满$50免运费；加急$12.99（3-5天）'), size: 'full' }, { richText: paragraph('英国/欧洲：标准$9.99（10-18天）；加急$15.99（5-10天）'), size: 'full' }, { richText: paragraph('日本/韩国/新加坡：标准$7.99（7-14天）；加急$14.99（3-7天）'), size: 'full' }, { richText: paragraph('其他地区：标准$15.99（14-21天）'), size: 'full' }, { richText: heading('退换政策', 'h2'), size: 'full' }, { richText: paragraph('收货后30天内可以退货。商品需保持原状、未经使用、保留原包装。退回运费由买家承担。退款将在收到退回商品后5-7个工作日内原路返回。定制商品和已开封的香薰类产品不支持退换。'), size: 'full' }, { richText: heading('损坏与遗失', 'h2'), size: 'full' }, { richText: paragraph('如收到损坏商品，请在48小时内拍照并联系hello@cnnture.com。我们将免费更换。如包裹遗失，请联系我们，我们将与物流公司协调并重新发货。'), size: 'full' }] },
      ],
      en: [
        { blockType: 'content', columns: [{ richText: heading('Shipping & Returns', 'h1'), size: 'full' }, { richText: paragraph('Processing: Orders processed within 1-2 business days. Business days are Monday-Friday (excluding Chinese public holidays).'), size: 'full' }, { richText: heading('Shipping Rates', 'h2'), size: 'full' }, { richText: paragraph('United States: Standard $5.99 (7-14 days), free over $50; Express $12.99 (3-5 days)'), size: 'full' }, { richText: paragraph('UK/Europe: Standard $9.99 (10-18 days); Express $15.99 (5-10 days)'), size: 'full' }, { richText: paragraph('Japan/Korea/Singapore: Standard $7.99 (7-14 days); Express $14.99 (3-7 days)'), size: 'full' }, { richText: paragraph('Rest of World: Standard $15.99 (14-21 days)'), size: 'full' }, { richText: heading('Returns', 'h2'), size: 'full' }, { richText: paragraph('30-day returns from receipt. Items must be unworn, unused, in original packaging. Buyer pays return shipping. Refunds processed within 5-7 business days of receiving return. Custom orders and opened aromatherapy products are final sale.'), size: 'full' }, { richText: heading('Damage & Loss', 'h2'), size: 'full' }, { richText: paragraph('If you receive a damaged item, please photograph and contact hello@cnnture.com within 48 hours. We will replace it free of charge. For lost packages, contact us and we will coordinate with the carrier for reshipment.'), size: 'full' }] },
      ],
    },
  },
]

/**
 * Seed all CNNTURE brand pages across all 6 languages.
 */
export async function seedBrandPages(payload: Payload): Promise<void> {
  payload.logger.info('— Seeding CNNTURE brand pages...')

  const locales = ['zh', 'en', 'ja', 'fr', 'de', 'ko'] as const

  for (const page of cnnturePages) {
    // Create in zh first — all non-localized data (hero, layout) set once here
    const created = await payload.create({
      collection: 'pages',
      locale: 'zh',
      context: { disableRevalidate: true },
      data: {
        slug: page.slug,
        _status: 'published',
        title: page.title.zh,
        hero: { type: 'lowImpact', richText: { root: { type: 'root', children: [{ type: 'heading', children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: page.title.zh, version: 1 }], direction: 'ltr', format: '', indent: 0, tag: 'h1', version: 1 }], direction: 'ltr', format: '', indent: 0, version: 1 } } },
        layout: page.layout.zh || [],
        meta: { title: page.meta.zh?.title || page.title.zh, description: page.meta.zh?.description || '' },
      },
    })

    // For other locales: ONLY update localized fields (title, meta).
    // hero and layout are NOT localized in Pages collection config,
    // so writing them via payload.update with a different locale
    // overwrites the document-level value, causing last-locale-wins bug.
    // All locales share the zh hero/layout via fallback: true.
    for (const loc of locales) {
      if (loc === 'zh') continue
      const locData = page.layout[loc]
      if (!locData) continue

      await payload.update({
        collection: 'pages',
        id: created.id,
        locale: loc,
        context: { disableRevalidate: true },
        data: {
          title: page.title[loc] || page.title.zh,
          hero: { type: 'lowImpact', richText: { root: { type: 'root', children: [{ type: 'heading', children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: page.title[loc] || page.title.zh, version: 1 }], direction: 'ltr', format: '', indent: 0, tag: 'h1', version: 1 }], direction: 'ltr', format: '', indent: 0, version: 1 } } },
          layout: locData,
          meta: { title: page.meta[loc]?.title || page.title[loc] || page.title.zh, description: page.meta[loc]?.description || '' },
        },
      })
    }

    payload.logger.info(`  ✓ ${page.slug} (${locales.filter(l => page.layout[l] || l === 'zh').join(', ')})`)
  }

  payload.logger.info('— CNNTURE brand pages seeded!')
}
