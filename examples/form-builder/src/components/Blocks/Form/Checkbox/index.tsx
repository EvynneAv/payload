import type { CheckboxField } from '@payloadcms/plugin-form-builder/types'
import type {
  FieldErrorsImpl,
  FieldValues,
  UseFormRegister,
  UseFormGetValues,
  UseFormSetValue,
  Path,
} from 'react-hook-form'

import React, { useState } from 'react'

import { Check } from '../../../icons/Check'
import { Error } from '../Error'
import { Width } from '../Width'
import classes from './index.module.scss'

interface CheckboxProps extends CheckboxField {
  errors: Partial<FieldErrorsImpl<FormData>>
  getValues: UseFormGetValues<FormData>
  register: UseFormRegister<FormData>
  setValue: UseFormSetValue<FormData>
}

type FormData = {
  [key: string]: boolean | string | number | null
}

export const Checkbox: React.FC<CheckboxProps> = ({
  name,
  errors,
  getValues,
  label,
  register,
  required: requiredFromProps,
  setValue,
  width,
}) => {
  const [checked, setChecked] = useState<boolean>(false)

  const isCheckboxChecked: boolean = (getValues(name as Path<FormData>) as boolean) ?? false

  return (
    <Width width={width}>
      <div className={[classes.checkbox, checked && classes.checked].filter(Boolean).join(' ')}>
        <div className={classes.container}>
          <input
            type="checkbox"
            {...register(name as Path<FieldValues>, {
              required: requiredFromProps
            })}
            checked={isCheckboxChecked}
            onChange={(e) => {
              setValue(name as Path<FieldValues>, e.target.checked, {
                shouldValidate: true
              })
            }}
          />
          <button
            onClick={() => {
              setValue(name as Path<FieldValues>, !checked, {
                shouldValidate: true
              })
              setChecked(!checked)
            }}
            type="button"
            aria-label={label}
          >
            <span className={classes.input}>
              <Check />
            </span>
          </button>
          <label htmlFor={name} className={classes.label}>
            {label}
          </label>
        </div>
        {requiredFromProps && errors[name] && checked === false && (
          <Error />
        )}
      </div>
    </Width>
  )
}
