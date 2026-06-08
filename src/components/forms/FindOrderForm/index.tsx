'use client'

import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/providers/Auth'
import React, { Fragment, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useT } from '@/providers/LocaleProvider'
import { sendOrderAccessEmail } from './sendOrderAccessEmail'

type FormData = {
  email: string
  orderID: string
}

type Props = {
  initialEmail?: string
}

export const FindOrderForm: React.FC<Props> = ({ initialEmail }) => {
  const t = useT()
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormData>({
    defaultValues: {
      email: initialEmail || user?.email,
    },
  })

  const onSubmit = useCallback(async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const result = await sendOrderAccessEmail({
        email: data.email,
        orderID: data.orderID,
      })

      if (result.success) {
        setSuccess(true)
      } else {
        setSubmitError(result.error || t('checkout.something_wrong'))
      }
    } catch {
      setSubmitError(t('checkout.something_wrong'))
    } finally {
      setIsSubmitting(false)
    }
  }, [t])

  if (success) {
    return (
      <Fragment>
        <h1 className="text-xl mb-4">{t('orders.check_email')}</h1>
        <div className="prose dark:prose-invert">
          <p>{t('orders.email_sent')}</p>
        </div>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <h1 className="text-xl mb-4">{t('orders.find_title')}</h1>
      <div className="prose dark:prose-invert mb-8">
        <p>{t('orders.find_desc')}</p>
      </div>
      <form className="max-w-lg flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
        <FormItem>
          <Label htmlFor="email" className="mb-2">
            {t('auth.email_address')}
          </Label>
          <Input
            id="email"
            {...register('email', { required: t('auth.email_required') })}
            type="email"
          />
          {errors.email && <FormError message={errors.email.message} />}
        </FormItem>
        <FormItem>
          <Label htmlFor="orderID" className="mb-2">
            {t('orders.order_id')}
          </Label>
          <Input
            id="orderID"
            {...register('orderID', {
              required: t('orders.order_id_required'),
            })}
            type="text"
          />
          {errors.orderID && <FormError message={errors.orderID.message} />}
        </FormItem>
        {submitError && <FormError message={submitError} />}
        <Button type="submit" className="self-start" variant="default" disabled={isSubmitting}>
          {isSubmitting ? t('orders.sending') : t('orders.find_btn')}
        </Button>
      </form>
    </Fragment>
  )
}
