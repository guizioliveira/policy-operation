import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const button = tv({
  base: 'font-bold transition-colors duration-200 flex justify-center items-center gap-2',
  variants: {
    size: {
      default: 'px-6 h-14 rounded-lg',
      sm: 'h-10 px-4 rounded',
    },
    variant: {
      primary: 'bg-brand-500 text-white hover:bg-brand-600',
      secondary:
        'border border-brand-500 text-brand-500 hover:bg-brand-500 hover:text-white',
      danger: 'bg-red-600 text-white hover:bg-red-800',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
})

export type ButtonProps = ComponentProps<'button'> & VariantProps<typeof button>

export function Button({ className, size, variant, ...props }: ButtonProps) {
  return (
    <button className={button({ size, variant, className })} {...props}>
      {props.children}
    </button>
  )
}
