'use client'

import { AddressItem } from '@/components/addresses/AddressItem'
import { CreateAddressModal } from '@/components/addresses/CreateAddressModal'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Address } from '@/payload-types'
import { useAddresses } from '@payloadcms/plugin-ecommerce/client/react'
import { useState } from 'react'
import { useT } from '@/providers/LocaleProvider'

type Props = {
  selectedAddress?: Address
  setAddress: React.Dispatch<React.SetStateAction<Partial<Address> | undefined>>
  heading?: string
  description?: string
  setSubmit?: React.Dispatch<React.SetStateAction<() => void | Promise<void>>>
}

export const CheckoutAddresses: React.FC<Props> = ({
  setAddress,
  heading,
  description,
}) => {
  const t = useT()
  const h = heading || t('checkout.addresses')
  const d = description || t('checkout.select_address')
  const { addresses } = useAddresses()

  if (!addresses || addresses.length === 0) {
    return (
      <div>
        <p>{t('checkout.no_addresses')}</p>
        <CreateAddressModal />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-xl font-medium mb-2">{h}</h3>
        <p className="text-muted-foreground">{d}</p>
      </div>
      <AddressesModal setAddress={setAddress} />
    </div>
  )
}

const AddressesModal: React.FC<Props> = ({ setAddress }) => {
  const t = useT()
  const [open, setOpen] = useState(false)

  const { addresses } = useAddresses()
  if (!addresses || addresses.length === 0) {
    return <p>{t('checkout.no_addresses')}</p>
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'outline'}>{t('checkout.select_address_btn')}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('checkout.select_address_btn')}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-12">
          <ul className="flex flex-col gap-8">
            {addresses.map((address) => (
              <li key={address.id} className="border-b pb-8 last:border-none">
                <AddressItem address={address}
                  beforeActions={
                    <Button onClick={(e) => { e.preventDefault(); setAddress(address); setOpen(false) }}>
                      {t('checkout.select')}
                    </Button>
                  } />
              </li>
            ))}
          </ul>
          <CreateAddressModal />
        </div>
      </DialogContent>
    </Dialog>
  )
}
