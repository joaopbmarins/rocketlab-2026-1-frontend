import { useState, useRef, useEffect, type KeyboardEvent, type ChangeEvent } from 'react'
import { Search, X, Loader2, Clock, TrendingUp, type LucideIcon } from 'lucide-react'

type SearchBarSize = 'sm' | 'md' | 'lg'
type SearchBarVariant = 'default' | 'filled' | 'ghost'

export interface SearchSuggestion {
  id: string
  label: string
  sublabel?: string
  icon?: LucideIcon
  type?: 'recent' | 'trending' | 'result'
}

interface SearchBarProps {
  variant?: SearchBarVariant
  size?: SearchBarSize
  placeholder?: string
  value?: string
  suggestions?: SearchSuggestion[]
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  shortcut?: string
  onChange?: (value: string) => void
  onSearch?: (value: string) => void
  onClear?: () => void
  onSelectSuggestion?: (suggestion: SearchSuggestion) => void
  className?: string
}

const sizeStyles: Record<SearchBarSize, { wrap: string; icon: number; input: string; clear: string }> = {
  sm: { wrap: 'h-8',  icon: 14, input: 'text-sm pl-8 pr-8',   clear: 'w-5 h-5' },
  md: { wrap: 'h-10', icon: 16, input: 'text-sm pl-10 pr-10',  clear: 'w-6 h-6' },
  lg: { wrap: 'h-12', icon: 18, input: 'text-base pl-12 pr-12', clear: 'w-7 h-7' },
}

const iconOffset: Record<SearchBarSize, string> = {
  sm: 'left-2.5',
  md: 'left-3',
  lg: 'left-3.5',
}

const clearOffset: Record<SearchBarSize, string> = {
  sm: 'right-2',
  md: 'right-2.5',
  lg: 'right-3',
}

const variantStyles: Record<SearchBarVariant, string> = {
  default: 'bg-white border border-zinc-300 hover:border-zinc-400 focus-within:border-zinc-900 focus-within:ring-2 focus-within:ring-zinc-900/10',
  filled:  'bg-zinc-100 border border-transparent hover:bg-zinc-200 focus-within:bg-white focus-within:border-zinc-900 focus-within:ring-2 focus-within:ring-zinc-900/10',
  ghost:   'bg-transparent border border-transparent hover:bg-zinc-50 focus-within:bg-white focus-within:border-zinc-300',
}

const typeIcon: Record<string, LucideIcon> = {
  recent:   Clock,
  trending: TrendingUp,
  result:   Search,
}

export function SearchBar({
  variant = 'default',
  size = 'md',
  placeholder = 'Buscar...',
  value: controlledValue,
  suggestions = [],
  loading = false,
  disabled = false,
  fullWidth = false,
  shortcut,
  onChange,
  onSearch,
  onClear,
  onSelectSuggestion,
  className = '',
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  const value = controlledValue !== undefined ? controlledValue : internalValue
  const s = sizeStyles[size]
  const hasSuggestions = open && suggestions.length > 0

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false)
        setActiveIndex(-1)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    if (controlledValue === undefined) setInternalValue(v)
    onChange?.(v)
    setOpen(true)
    setActiveIndex(-1)
  }

  const handleClear = () => {
    if (controlledValue === undefined) setInternalValue('')
    onChange?.('')
    onClear?.()
    setOpen(false)
    inputRef.current?.focus()
  }

  const handleSelect = (s: SearchSuggestion) => {
    if (controlledValue === undefined) setInternalValue(s.label)
    onChange?.(s.label)
    onSelectSuggestion?.(s)
    setOpen(false)
    setActiveIndex(-1)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!hasSuggestions) {
      if (e.key === 'Enter') onSearch?.(value)
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex(i => Math.min(i + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(i => Math.max(i - 1, -1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (activeIndex >= 0) handleSelect(suggestions[activeIndex])
      else onSearch?.(value)
    } else if (e.key === 'Escape') {
      setOpen(false)
      setActiveIndex(-1)
    }
  }

  return (
    <div
      ref={wrapRef}
      className={['relative', fullWidth ? 'w-full' : 'w-fit', className].join(' ')}
    >
      {/* Input wrapper */}
      <div className={[
        'relative flex items-center rounded-xl transition-all duration-150',
        s.wrap,
        variantStyles[variant],
        disabled ? 'opacity-40 pointer-events-none' : '',
        fullWidth ? 'w-full' : 'w-72',
      ].join(' ')}>

        {/* Search / loader icon */}
        <span className={['absolute top-1/2 -translate-y-1/2 pointer-events-none', iconOffset[size]].join(' ')}>
          {loading
            ? <Loader2 size={s.icon} className="text-zinc-400 animate-spin" />
            : <Search size={s.icon} className="text-zinc-400" strokeWidth={2} />
          }
        </span>

        <input
          ref={inputRef}
          type="text"
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setOpen(true)}
          className={[
            'w-full h-full bg-transparent outline-none',
            'text-zinc-900 placeholder:text-zinc-400',
            'transition-colors duration-150',
            s.input,
            shortcut && !value ? 'pr-16' : '',
          ].join(' ')}
          autoComplete="off"
          spellCheck={false}
          aria-label={placeholder}
          aria-expanded={hasSuggestions}
          aria-autocomplete="list"
          role="combobox"
        />

        {/* Keyboard shortcut badge */}
        {shortcut && !value && (
          <span className={['absolute top-1/2 -translate-y-1/2 pointer-events-none', clearOffset[size]].join(' ')}>
            <kbd className="text-[10px] font-medium text-zinc-400 bg-zinc-100 border border-zinc-200 rounded px-1.5 py-0.5 font-mono">
              {shortcut}
            </kbd>
          </span>
        )}

        {/* Clear button */}
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className={[
              'absolute top-1/2 -translate-y-1/2 flex items-center justify-center',
              'rounded-full text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100',
              'transition-all duration-100',
              s.clear,
              clearOffset[size],
            ].join(' ')}
            aria-label="Limpar busca"
          >
            <X size={s.icon - 2} strokeWidth={2.5} />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {hasSuggestions && (
        <ul
          role="listbox"
          className={[
            'absolute z-50 mt-1.5 w-full',
            'bg-white border border-zinc-200 rounded-xl shadow-lg shadow-zinc-900/5',
            'overflow-hidden py-1',
            fullWidth ? 'w-full' : 'min-w-72',
          ].join(' ')}
        >
          {suggestions.map((item, i) => {
            const Icon = item.icon ?? typeIcon[item.type ?? 'result']
            const isActive = i === activeIndex
            return (
              <li
                key={item.id}
                role="option"
                aria-selected={isActive}
                onMouseDown={() => handleSelect(item)}
                onMouseEnter={() => setActiveIndex(i)}
                className={[
                  'flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-colors duration-75',
                  'text-sm',
                  isActive ? 'bg-zinc-50' : 'hover:bg-zinc-50',
                ].join(' ')}
              >
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-md bg-zinc-100">
                  <Icon size={13} className="text-zinc-500" strokeWidth={2} />
                </span>
                <span className="flex flex-col min-w-0">
                  <span className="text-zinc-800 font-medium truncate">{item.label}</span>
                  {item.sublabel && (
                    <span className="text-zinc-400 text-xs truncate">{item.sublabel}</span>
                  )}
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}