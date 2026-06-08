import { NextRequest, NextResponse } from 'next/server'
import { locales } from '@/i18n/config'

/**
 * Locale detection middleware.
 * Extracts locale from URL path (/zh/... or /en/...) and sets x-locale header.
 * Also rewrites /zh/xxx to /xxx internally so existing routes work without restructuring.
 */
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip admin, API, static files, Next.js internals
  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/next') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js|map|woff2?)$/)
  ) {
    return NextResponse.next()
  }

  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]

  // Check if URL starts with a locale prefix
  if (firstSegment && locales.includes(firstSegment as (typeof locales)[number])) {
    const locale = firstSegment

    // Rewrite /zh/shop → /shop internally
    const remainingPath = '/' + segments.slice(1).join('/')
    const url = request.nextUrl.clone()
    url.pathname = remainingPath || '/'

    const res = NextResponse.rewrite(url)
    res.headers.set('x-locale', locale)
    res.headers.set('x-pathname', pathname)
    return res
  }

  // No locale prefix — detect from Accept-Language or default to zh
  const acceptLang = request.headers.get('accept-language') || ''
  let detected = 'zh'
  if (acceptLang.includes('ja')) detected = 'ja'
  else if (acceptLang.includes('fr')) detected = 'fr'
  else if (acceptLang.includes('de')) detected = 'de'
  else if (acceptLang.includes('ko')) detected = 'ko'
  else if (acceptLang.includes('en')) detected = 'en'

  const res = NextResponse.next()
  res.headers.set('x-locale', detected)
  res.headers.set('x-pathname', pathname)
  return res
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|admin).*)'],
}
