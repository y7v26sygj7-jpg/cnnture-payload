import { getPayload } from 'payload'
import config from '@payload-config'
import { seed } from '@/endpoints/seed'
import { createLocalReq } from 'payload'

export const dynamic = 'force-dynamic'

export async function POST() {
  try {
    const payload = await getPayload({ config })

    // Check if already seeded
    const existing = await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } } })
    if (existing.totalDocs > 0) {
      return Response.json({ seeded: false, message: 'Already seeded' })
    }

    // Run seed
    const req = await createLocalReq({}, payload)
    await seed({ payload, req })

    return Response.json({ seeded: true, message: 'Seed complete' })
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}
