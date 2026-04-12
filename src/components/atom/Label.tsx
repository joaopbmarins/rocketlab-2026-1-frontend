import { forwardRef, type LabelHTMLAttributes } from 'react'
import { type LucideIcon } from 'lucide-react'

type LabelVariant = 'default' | 'info' | 'success' | 'warning' | 'danger' | 'neutral'
type LabelSize = 'sm' | 'md' | 'lg'

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  variant?: LabelVariant
  size?: LabelSize
  icon?: LucideIcon
  required?: boolean
  optional?: boolean
  hint?: string
}

const variantStyles: Record<LabelVariant, string> = {
  default: 'text-zinc-800',
  info:    'text-blue-700',
  success: 'text-green-700',
  warning: 'text-amber-700',
  danger:  'text-red-600',
  neutral: 'text-zinc-400',
}

const sizeStyles: Record<LabelSize, { label: string; icon: number; badge: string }> = {
  sm: { label: 'text-xs',  icon: 12, badge: 'text-[10px] px-1.5 py-0.5' },
  md: { label: 'text-sm',  icon: 14, badge: 'text-xs px-2 py-0.5' },
  lg: { label: 'text-base', icon: 15, badge: 'text-xs px-2 py-0.5' },
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      variant = 'default',
      size = 'md',
      icon: Icon,
      required = false,
      optional = false,
      hint,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const s = sizeStyles[size]

    return (
      <label
        ref={ref}
        className={[
          'inline-flex flex-col gap-0.5 select-none',
          className,
        ].filter(Boolean).join(' ')}
        {...props}
      >
        <span className="inline-flex items-center gap-1.5">
          {Icon && (
            <Icon
              size={s.icon}
              strokeWidth={2}
              className={variantStyles[variant]}
            />
          )}

          <span className={[
            'font-medium leading-none',
            s.label,
            variantStyles[variant],
          ].join(' ')}>
            {children}
          </span>

          {required && (
            <span className="text-red-500 font-medium leading-none" aria-hidden="true">*</span>
          )}

          {optional && !required && (
            <span className={[
              'font-normal rounded bg-zinc-100 text-zinc-400',
              s.badge,
            ].join(' ')}>
              opcional
            </span>
          )}
        </span>

        {hint && (
          <span className={[
            'font-normal text-zinc-400 leading-snug',
            size === 'lg' ? 'text-sm' : 'text-xs',
          ].join(' ')}>
            {hint}
          </span>
        )}
      </label>
    )
  }
)

Label.displayName = 'Label'