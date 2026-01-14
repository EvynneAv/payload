'use client'
import type { Validate, ValidateOptions, Field, Operation } from 'payload'

import { EmailField, TextField, useTranslation } from '@payloadcms/ui'
import { email, username } from 'payload/shared'
import React from 'react'

type LoginData = {
  username?: string
  email?: string
  password?: string
  [key: string]: unknown
}

type LoginFieldData = {
  username?: string
  email?: string
}

type LoginFieldType = Field & {
  name: 'username' | 'email'
}

export type LoginFieldProps = {
  readonly required?: boolean
  readonly type: 'email' | 'emailOrUsername' | 'username'
  readonly validate?: Validate<LoginData, LoginFieldData, LoginFieldType>
}

export const LoginField: React.FC<LoginFieldProps> = ({ type, required = true }) => {
  const { t } = useTranslation()

  const validateEmail = (
    value: string | undefined,
    options: ValidateOptions<LoginData, LoginFieldData, LoginFieldType, Operation>
  ): string | true => {
    return email(value, options)
  }

  const validateUsername = (
    value: string | undefined,
    options: ValidateOptions<LoginData, LoginFieldData, LoginFieldType, Operation>
  ): string | true => {
    return username(value, options)
  }

  if (type === 'email') {
    return (
      <EmailField
        field={{
          name: 'email',
          admin: {
            autoComplete: 'email',
          },
          label: t('general:email'),
          required,
        }}
        path="email"
        validate={(value, options) => validateEmail(value, options)}
      />
    )
  }

  if (type === 'username') {
    return (
      <TextField
        field={{
          name: 'username',
          label: t('authentication:username'),
          required,
        }}
        path="username"
        validate={(value, options) => validateUsername(value, options)}
      />
    )
  }

  if (type === 'emailOrUsername') {
    return (
      <TextField
        field={{
          name: 'username',
          label: t('authentication:emailOrUsername'),
          required,
        }}
        path="username"
        validate={(value, options) => {
          const passesUsername = validateUsername(value, options)
          const passesEmail = validateEmail(value, options)

          if (!passesEmail && !passesUsername) {
              return t('validation:invalidEmailOrUsername', {
              emailError: passesEmail,
              usernameError: passesUsername
            })
          }

          return true
        }}
      />
    )
  }

  return null
}
