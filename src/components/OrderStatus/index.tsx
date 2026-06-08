'use client'

import { OrderStatus as StatusOptions } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { useT } from '@/providers/LocaleProvider'

type Props = {
  status: StatusOptions
  className?: string
}

export const OrderStatus: React.FC<Props> = ({ status, className }) => {
  const t = useT()
  const label = t(`order_status.${status}`)

  return (
    <div
      className={cn(
        'text-xs tracking-widest font-mono uppercase py-0 px-2 rounded w-fit',
        className,
        {
          'bg-primary/10': status === 'processing',
          'bg-success': status === 'completed',
        },
      )}
    >
      {label}
    </div>
  )
}
