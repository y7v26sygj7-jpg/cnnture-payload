import type { Product, Variant } from '@/payload-types'
import Link from 'next/link'
import React from 'react'
import { Media } from '@/components/Media'
import { Price } from '@/components/Price'

type Props = { product: Partial<Product> }

export const ProductGridItem: React.FC<Props> = ({ product }) => {
  const { gallery, priceInUSD, title, subtitle, personality } = product
  let price = priceInUSD
  const variants = product.variants?.docs
  if (variants?.length) {
    const v = variants[0]
    if (v && typeof v === 'object' && typeof v.priceInUSD === 'number') price = v.priceInUSD
  }
  const image = gallery?.[0]?.image && typeof gallery[0]?.image !== 'string' ? gallery[0]?.image : false

  return (
    <Link className="cnnture-product-card block group" href={`/products/${product.slug}`}>
      <div className="cnnture-product-card__image-wrap">
        {image ? (
          <Media
            className="aspect-[4/5] overflow-hidden"
            imgClassName="w-full h-full object-cover transition duration-600 ease-out group-hover:scale-105"
            resource={image} width={600} height={750}
          />
        ) : (
          <div className="aspect-[4/5] bg-[#F2EDE6] flex items-center justify-center">
            <span className="text-xs text-[#B0ACA6] tracking-widest">CNNTURE</span>
          </div>
        )}
      </div>
      <div className="mt-4 space-y-1">
        <h3 className="text-base font-serif font-light tracking-wider text-[#2B2722]">
          {title || ''}
        </h3>
        {subtitle && (
          <p className="text-xs tracking-wider text-[#8A8680]">{subtitle}</p>
        )}
        {personality && (
          <p className="text-xs italic text-[#B0ACA6] leading-relaxed">{personality}</p>
        )}
        {typeof price === 'number' && (
          <p className="text-sm pt-1 text-[#8B7355] tracking-wider">
            ${price}
          </p>
        )}
      </div>
    </Link>
  )
}
