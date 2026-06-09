import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)
import { redirects } from './redirects'

const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
const serverHost = serverUrl.replace(/^https?:\/\//, '').split(':')[0]

const nextConfig: NextConfig = {
  // Temporarily required on Windows until Next.js fixes Turbopack Sass resolution.
  // See: https://github.com/vercel/next.js/issues/86431
  sassOptions: {
    loadPaths: ['./node_modules/@payloadcms/ui/dist/scss/'],
  },
  images: {
    remotePatterns: [
      { protocol: 'http' as const, hostname: 'localhost' },
      { protocol: 'https' as const, hostname: serverHost },
      { protocol: 'https' as const, hostname: 'images.unsplash.com' },
    ],
    qualities: [90, 100],
  },
  reactStrictMode: true,
  redirects,
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default withPayload(nextConfig)
