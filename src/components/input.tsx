import React, { ComponentProps } from 'react'
import { useFormContext } from 'react-hook-form'

interface InputProps extends ComponentProps<'input'> {
  label?: string
  formRegister: string
  error?: string
}

export default function Input({
  formRegister,
  error,
  label,
  ...props
}: InputProps) {
  const { register } = useFormContext()
  return (
    <div className="group">
      {label ? (
        <label
          htmlFor={props.id}
          className="text-zinc-400 font-exo italic block mb-2 text-sm group-focus-within:text-brand-400 group-focus-within:font-bold transition-all duration-200"
        >
          {label}
        </label>
      ) : null}
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        className="bg-zinc-100 border-b-2 border-b-brand-500 rounded-md p-2 w-full focus-within:outline-none"
        {...register(
          formRegister,
          props.type === 'number' ? { valueAsNumber: true } : {},
        )}
        {...props}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  )
}
