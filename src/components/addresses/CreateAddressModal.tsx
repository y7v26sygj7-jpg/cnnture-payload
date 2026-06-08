'use client'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { AddressForm } from '@/components/forms/AddressForm'
import { Address } from '@/payload-types'
import { DefaultDocumentIDType } from 'payload'
import { useT } from '@/providers/LocaleProvider'

type Props = {
  addressID?: DefaultDocumentIDType
  initialData?: Partial<Omit<Address, 'country'>> & { country?: string }
  buttonText?: string
  modalTitle?: string
  callback?: (address: Partial<Address>) => void
  skipSubmission?: boolean
  disabled?: boolean
}

export const CreateAddressModal: React.FC<Props> = ({
  addressID,
  initialData,
  buttonText,
  modalTitle,
  callback,
  skipSubmission,
  disabled,
}) => {
  const t = useT()
  const btn = buttonText || t('address.add_new')
  const title = modalTitle || t('address.add_title')
  const [open, setOpen] = useState(false)

  const handleCallback = (data: Partial<Address>) => {
    setOpen(false)
    if (callback) callback(data)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild disabled={disabled}>
        <Button variant={'outline'}>{btn}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{t('address.account_note')}</DialogDescription>
        </DialogHeader>
        <AddressForm addressID={addressID} initialData={initialData} callback={handleCallback} skipSubmission={skipSubmission} />
      </DialogContent>
    </Dialog>
  )
}
