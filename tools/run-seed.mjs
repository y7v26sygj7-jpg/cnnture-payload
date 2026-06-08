// Run seed directly via Payload Local API with proper req context
import configPromise from '@payload-config'
import { getPayload, createLocalReq } from 'payload'
import { seed } from '../src/endpoints/seed/index.js'

async function run() {
  const payload = await getPayload({ config: configPromise })
  const req = await createLocalReq({}, payload)
  await seed({ payload, req })
  console.log('Seed complete!')
  process.exit(0)
}

run().catch((e) => {
  console.error('Seed failed:', e.message)
  console.error(e.stack)
  process.exit(1)
})
