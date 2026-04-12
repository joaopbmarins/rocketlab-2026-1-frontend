import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { Loader2, type LucideIcon } from 'lucide-react'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  leftIcon?: LucideIcon
  rightIcon?: LucideIcon
  fullWidth?: boolean
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-zinc-900 text-white hover:bg-zinc-700 active:bg-zinc-800 border border-transparent',
  secondary:
    'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 active:bg-zinc-300 border border-transparent',
  outline:
    'bg-transparent text-zinc-900 border border-zinc-300 hover:bg-zinc-50 active:bg-zinc-100',
  ghost:
    'bg-transparent text-zinc-700 border border-transparent hover:bg-zinc-100 active:bg-zinc-200',
  danger:
    'bg-red-600 text-white hover:bg-red-500 active:bg-red-700 border border-transparent',
}

const sizeStyles: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-5 text-base gap-2.5',
}

const iconSizes: Record<Size, number> = {
  sm: 14,
  md: 16,
  lg: 18,
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      fullWidth = false,
      disabled,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading
    const iconSize = iconSizes[size]

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={[
          'inline-flex items-center justify-center rounded-lg font-medium',
          'transition-all duration-150 ease-in-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2',
          'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
          'select-none cursor-pointer',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth ? 'w-full' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {loading ? (
          <Loader2 size={iconSize} className="animate-spin" />
        ) : LeftIcon ? (
          <LeftIcon size={iconSize} strokeWidth={2} />
        ) : null}

        {children && <span>{children}</span>}

        {!loading && RightIcon && (
          <RightIcon size={iconSize} strokeWidth={2} />
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'