'use client'

import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import { Message } from '@/components/Message'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User } from '@/payload-types'
import { useAuth } from '@/providers/Auth'
import { useRouter } from 'next/navigation'
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useT } from '@/providers/LocaleProvider'

type FormData = {
  email: string
  name: User['name']
  password: string
  passwordConfirm: string
}

export const AccountForm: React.FC = () => {
  const t = useT()
  const { setUser, user } = useAuth()
  const [changePassword, setChangePassword] = useState(false)

  const {
    formState: { errors, isLoading, isSubmitting, isDirty },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm<FormData>()

  const password = useRef({})
  password.current = watch('password', '')

  const router = useRouter()

  const onSubmit = useCallback(
    async (data: FormData) => {
      if (user) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${user.id}`, {
          body: JSON.stringify(data),
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          method: 'PATCH',
        })
        if (response.ok) {
          const json = await response.json()
          setUser(json.doc)
          toast.success(t('account.updated'))
          setChangePassword(false)
          reset({ name: json.doc.name, email: json.doc.email, password: '', passwordConfirm: '' })
        } else {
          toast.error(t('account.update_error'))
        }
      }
    },
    [user, setUser, reset, t],
  )

  useEffect(() => {
    if (user === null) {
      router.push(
        `/login?error=${encodeURIComponent(t('account.login_required'))}&redirect=${encodeURIComponent('/account')}`,
      )
    }
    if (user) {
      reset({ name: user.name, email: user.email, password: '', passwordConfirm: '' })
    }
  }, [user, router, reset, changePassword, t])

  return (
    <form className="max-w-xl" onSubmit={handleSubmit(onSubmit)}>
      {!changePassword ? (
        <Fragment>
          <div className="prose dark:prose-invert mb-8">
            <p>
              {t('account.change_details')}
              <Button className="px-0 text-inherit underline hover:cursor-pointer"
                onClick={() => setChangePassword(!changePassword)} type="button" variant="link">
                {t('account.click_here')}
              </Button>
              {t('account.change_password')}
            </p>
          </div>
          <div className="flex flex-col gap-8 mb-8">
            <FormItem>
              <Label htmlFor="email" className="mb-2">{t('auth.email_address')}</Label>
              <Input id="email" {...register('email', { required: t('auth.email_required') })} type="email" />
              {errors.email && <FormError message={errors.email.message} />}
            </FormItem>
            <FormItem>
              <Label htmlFor="name" className="mb-2">{t('account.name')}</Label>
              <Input id="name" {...register('name', { required: t('account.name_required') })} type="text" />
              {errors.name && <FormError message={errors.name.message} />}
            </FormItem>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="prose dark:prose-invert mb-8">
            <p>
              {t('account.change_password_below')}
              <Button className="px-0 text-inherit underline hover:cursor-pointer"
                onClick={() => setChangePassword(!changePassword)} type="button" variant="link">
                {t('account.cancel')}
              </Button>
              .
            </p>
          </div>
          <div className="flex flex-col gap-8 mb-8">
            <FormItem>
              <Label htmlFor="password" className="mb-2">{t('auth.new_password')}</Label>
              <Input id="password" {...register('password', { required: t('auth.password_required') })} type="password" />
              {errors.password && <FormError message={errors.password.message} />}
            </FormItem>
            <FormItem>
              <Label htmlFor="passwordConfirm" className="mb-2">{t('auth.confirm_password')}</Label>
              <Input id="passwordConfirm" {...register('passwordConfirm', {
                required: t('auth.confirm_required'),
                validate: (value) => value === password.current || t('auth.passwords_mismatch'),
              })} type="password" />
              {errors.passwordConfirm && <FormError message={errors.passwordConfirm.message} />}
            </FormItem>
          </div>
        </Fragment>
      )}
      <Button disabled={isLoading || isSubmitting || !isDirty} type="submit" variant="default">
        {isLoading || isSubmitting
          ? t('auth.processing')
          : changePassword ? t('account.change_password_btn') : t('account.update_btn')}
      </Button>
    </form>
  )
}
