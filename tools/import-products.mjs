// Import 28 CNNTURE products into Payload
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import fs from 'fs'
import path from 'path'

const productsDir = 'E:/ChronoLens_Game/zhongshi-nature/content/products'

async function run() {
  const payload = await getPayload({ config: configPromise })

  // Get category IDs from DB
  const cats = await payload.find({ collection: 'categories', limit: 50 })
  const catMap = {}
  for (const c of cats.docs) {
    catMap[c.title.split(' ')[0]] = c.id
  }
  console.log('Categories:', Object.keys(catMap))

  const files = fs.readdirSync(productsDir).filter(f => f.endsWith('.json'))
  console.log(`Found ${files.length} product files`)

  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(path.join(productsDir, file), 'utf8'))

    // Map CNNTURE category name to our Payload category ID
    let catName = ''
    const cnCat = (data.category || '').split(' ')[0] || ''
    if (cnCat.includes('草本饰品') || cnCat.includes('Herbal Jewelry')) catName = '草本饰品'
    else if (cnCat.includes('香薰') || cnCat.includes('Aromatherapy')) catName = '草本香薰'
    else if (cnCat.includes('手串') || cnCat.includes('Bracelet')) catName = '禅意手串'
    else if (cnCat.includes('文创') || cnCat.includes('Stationery')) catName = '草木文创'
    else if (cnCat.includes('典藏') || cnCat.includes('Cultural')) catName = '文化典藏'
    else if (cnCat.includes('赠礼') || cnCat.includes('Gifting')) catName = '赠礼系列'

    // Normalize materials
    const materials = (data.materials || []).map(m => ({
      label: m.label || '',
      value: m.value || '',
    }))

    // Build rich text for description (zh)
    const descParagraphs = (data.desc || []).map(text => ({
      type: 'paragraph',
      children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 }],
      direction: 'ltr', format: '', indent: 0, textFormat: 0, version: 1,
    }))

    // Build rich text for description (en)
    const descEnParagraphs = (data.desc_en || []).map(text => ({
      type: 'paragraph',
      children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 }],
      direction: 'ltr', format: '', indent: 0, textFormat: 0, version: 1,
    }))

    // Build story (zh)
    const storyParagraphs = (data.story || []).map(text => ({
      type: 'paragraph',
      children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 }],
      direction: 'ltr', format: '', indent: 0, textFormat: 0, version: 1,
    }))

    // Build story (en)
    const storyEnParagraphs = (data.story_en || []).map(text => ({
      type: 'paragraph',
      children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 }],
      direction: 'ltr', format: '', indent: 0, textFormat: 0, version: 1,
    }))

    try {
      // Create in zh locale first
      const product = await payload.create({
        collection: 'products',
        locale: 'zh',
        context: { disableRevalidate: true },
        data: {
          slug: data.handle || file.replace('.json', ''),
          title: data.cn || '',
          subtitle: data.en || '',
          personality: data.personality || '',
          description: descParagraphs.length ? { root: { type: 'root', children: descParagraphs, direction: 'ltr', format: '', indent: 0, version: 1 } } : undefined,
          materials,
          storyTitle: data.storyTitle || '',
          story: storyParagraphs.length ? { root: { type: 'root', children: storyParagraphs, direction: 'ltr', format: '', indent: 0, version: 1 } } : undefined,
          categories: catMap[catName] ? [catMap[catName]] : [],
          _status: 'published',
          enableVariants: false,
          priceInUSD: parseFloat(data.price) || 0,
          inventory: 100,
          skipSync: true,
        },
      })

      // Update en locale
      if (data.en) {
        await payload.update({
          collection: 'products',
          id: product.id,
          locale: 'en',
          context: { disableRevalidate: true },
          data: {
            title: data.en || '',
            subtitle: data.cn || '',
            personality: data.personality_en || data.personality || '',
            description: descEnParagraphs.length ? { root: { type: 'root', children: descEnParagraphs, direction: 'ltr', format: '', indent: 0, version: 1 } } : undefined,
            materials: materials.map(m => ({ label: m.label === '材料' ? 'Material' : m.label === '重量' ? 'Weight' : m.label === '包装' ? 'Packaging' : m.label, value: m.value })),
            storyTitle: data.storyTitle_en || data.storyTitle || '',
            story: storyEnParagraphs.length ? { root: { type: 'root', children: storyEnParagraphs, direction: 'ltr', format: '', indent: 0, version: 1 } } : undefined,
          },
        })
      }

      console.log(`  ✓ ${data.cn}`)
    } catch (e) {
      console.error(`  ✗ ${data.cn}: ${e.message}`)
    }
  }

  console.log(`\nImported ${files.length} products!`)
  process.exit(0)
}

run().catch(e => { console.error(e); process.exit(1) })
