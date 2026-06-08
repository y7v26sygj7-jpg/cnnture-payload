// Import product images from old CNNTURE product JSON files
// Downloads first image from each product and attaches it as gallery + meta image
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import fs from 'fs'
import path from 'path'

const productsDir = 'E:/ChronoLens_Game/zhongshi-nature/content/products'

async function fetchImage(url) {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15000)
    const res = await fetch(url, { signal: controller.signal })
    clearTimeout(timeout)
    if (!res.ok) return null
    const buffer = Buffer.from(await res.arrayBuffer())
    return {
      name: url.split('/').pop()?.split('?')[0] || 'image.jpg',
      data: buffer,
      mimetype: res.headers.get('content-type') || 'image/jpeg',
      size: buffer.length,
    }
  } catch {
    return null
  }
}

async function run() {
  const payload = await getPayload({ config: configPromise })
  const files = fs.readdirSync(productsDir).filter(f => f.endsWith('.json'))

  let imported = 0
  let skipped = 0

  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(path.join(productsDir, file), 'utf8'))
    const handle = data.handle || file.replace('.json', '')
    const images = data.images || []

    // Find existing product
    const existing = await payload.find({
      collection: 'products',
      where: { slug: { equals: handle } },
      limit: 1,
    })

    if (!existing.docs.length) {
      console.log(`  SKIP ${data.cn}: product not in DB`)
      skipped++
      continue
    }

    const product = existing.docs[0]

    // Check if product already has images
    if (product.gallery && product.gallery.length > 0) {
      console.log(`  SKIP ${data.cn}: already has gallery images`)
      skipped++
      continue
    }

    // Download first image
    const firstImg = images[0]
    if (!firstImg) {
      console.log(`  SKIP ${data.cn}: no images in JSON`)
      skipped++
      continue
    }

    console.log(`  Fetching ${data.cn}: ${firstImg.substring(0, 60)}...`)
    const imgFile = await fetchImage(firstImg)

    if (!imgFile) {
      console.log(`  FAIL ${data.cn}: could not download (network restricted)`)
      // Create media with placeholder
      const emptyPng = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64')
      const media = await payload.create({
        collection: 'media',
        data: { alt: `${data.cn} - ${data.en}`, caption: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: data.cn, version: 1 }], direction: 'ltr', format: '', indent: 0, textFormat: 0, version: 1 }], direction: 'ltr', format: '', indent: 0, version: 1 } } },
        file: { name: 'placeholder.png', data: emptyPng, mimetype: 'image/png', size: emptyPng.length },
        context: { disableRevalidate: true },
      })

      await payload.update({
        collection: 'products',
        id: product.id,
        data: {
          gallery: [{ image: media.id }],
          meta: { ...(product.meta || {}), image: media.id },
        },
        context: { disableRevalidate: true },
      })
      console.log(`  ✓ ${data.cn}: placeholder (upload images via admin later)`)
      imported++
      continue
    }

    // Create media entry
    try {
      const media = await payload.create({
        collection: 'media',
        data: {
          alt: `${data.cn} - ${data.en}`,
          caption: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: data.cn, version: 1 }], direction: 'ltr', format: '', indent: 0, textFormat: 0, version: 1 }], direction: 'ltr', format: '', indent: 0, version: 1 } },
        },
        file: imgFile,
        context: { disableRevalidate: true },
      })

      // Attach to product
      await payload.update({
        collection: 'products',
        id: product.id,
        data: {
          gallery: [{ image: media.id }],
          meta: { ...(product.meta || {}), image: media.id },
        },
        context: { disableRevalidate: true },
      })

      console.log(`  ✓ ${data.cn}: image attached`)
      imported++
    } catch (e) {
      console.log(`  ✗ ${data.cn}: ${e.message}`)
    }
  }

  console.log(`\nImported: ${imported}, Skipped: ${skipped}, Total: ${files.length}`)
  process.exit(0)
}

run().catch(e => { console.error(e); process.exit(1) })
