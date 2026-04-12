import { useState, useRef, type ChangeEvent } from 'react'
import { ImageIcon, Upload, X, RefreshCw, type LucideIcon } from 'lucide-react'

type Variant = 'default' | 'avatar' | 'banner' | 'card' | 'thumbnail'
type Ratio = '1/1' | '4/3' | '16/9' | '3/4' | '21/9'
type Status = 'empty' | 'loading' | 'loaded' | 'error'

interface ImagePlaceholderProps {
  variant?: Variant
  ratio?: Ratio
  src?: string
  alt?: string
  icon?: LucideIcon
  label?: string
  hint?: string
  uploadable?: boolean
  shimmer?: boolean
  width?: string | number
  className?: string
  onUpload?: (file: File) => void
  onClear?: () => void
}

const ratioMap: Record<Ratio, string> = {
  '1/1':  'aspect-square',
  '4/3':  'aspect-[4/3]',
  '16/9': 'aspect-video',
  '3/4':  'aspect-[3/4]',
  '21/9': 'aspect-[21/9]',
}

const variantStyles: Record<Variant, { radius: string; iconSize: number }> = {
  default:   { radius: 'rounded-xl',  iconSize: 28 },
  avatar:    { radius: 'rounded-full', iconSize: 22 },
  banner:    { radius: 'rounded-2xl', iconSize: 32 },
  card:      { radius: 'rounded-2xl', iconSize: 28 },
  thumbnail: { radius: 'rounded-lg',  iconSize: 20 },
}

export function ImagePlaceholder({
  variant = 'default',
  ratio = '1/1',
  src,
  alt = 'Image',
  icon: CustomIcon,
  label,
  hint,
  uploadable = false,
  shimmer = false,
  width,
  className = '',
  onUpload,
  onClear,
}: ImagePlaceholderProps) {
  const [status, setStatus] = useState<Status>(src ? 'loading' : 'empty')
  const [preview, setPreview] = useState<string | undefined>(src)
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const { radius, iconSize } = variantStyles[variant]
  const Icon = CustomIcon ?? ImageIcon

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return
    const url = URL.createObjectURL(file)
    setPreview(url)
    setStatus('loading')
    onUpload?.(file)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPreview(undefined)
    setStatus('empty')
    if (inputRef.current) inputRef.current.value = ''
    onClear?.()
  }

  const handleRetry = (e: React.MouseEvent) => {
    e.stopPropagation()
    setStatus('loading')
    setTimeout(() => setStatus('error'), 1500)
  }

  const isInteractive = uploadable && status === 'empty'

  return (
    <div
      className={['relative inline-block', width ? '' : 'w-full', className].join(' ')}
      style={width ? { width } : undefined}
    >
      <div
        className={[
          'relative overflow-hidden w-full',
          ratioMap[ratio],
          radius,
          'transition-all duration-200',
          isInteractive
            ? isDragging
              ? 'bg-zinc-100 border-2 border-dashed border-zinc-400 cursor-pointer scale-[1.01]'
              : 'bg-zinc-50 border-2 border-dashed border-zinc-200 hover:border-zinc-400 hover:bg-zinc-100 cursor-pointer'
            : status === 'loaded'
            ? 'bg-zinc-100'
            : 'bg-zinc-100 border border-zinc-200',
        ].join(' ')}
        onClick={() => isInteractive && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); if (uploadable) setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={uploadable ? handleDrop : undefined}
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        aria-label={isInteractive ? 'Upload image' : alt}
        onKeyDown={(e) => { if (isInteractive && e.key === 'Enter') inputRef.current?.click() }}
      >
        {/* Shimmer skeleton */}
        {shimmer && status === 'empty' && (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-100 animate-[shimmer_1.6s_infinite]" />
          </div>
        )}

        {/* Loading state */}
        {status === 'loading' && preview && (
          <>
            <img
              src={preview}
              alt={alt}
              className="absolute inset-0 w-full h-full object-cover opacity-0"
              onLoad={() => setStatus('loaded')}
              onError={() => setStatus('error')}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-100">
              <RefreshCw size={20} className="text-zinc-400 animate-spin" />
            </div>
          </>
        )}

        {/* Loaded image */}
        {status === 'loaded' && preview && (
          <img
            src={preview}
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Error state */}
        {status === 'error' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-red-50">
            <ImageIcon size={iconSize} className="text-red-300" />
            <span className="text-xs text-red-400 font-medium">Falha ao carregar</span>
            {uploadable && (
              <button
                onClick={handleRetry}
                className="mt-1 text-xs text-red-500 underline underline-offset-2 hover:text-red-600"
              >
                Tentar novamente
              </button>
            )}
          </div>
        )}

        {/* Empty / upload state */}
        {status === 'empty' && !shimmer && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 px-4">
            {uploadable ? (
              <>
                <div className={[
                  'flex items-center justify-center rounded-xl transition-colors duration-150',
                  'w-10 h-10 bg-zinc-200',
                  isDragging ? 'bg-zinc-300' : '',
                ].join(' ')}>
                  <Upload size={18} className="text-zinc-500" />
                </div>
                <span className="text-xs font-medium text-zinc-500 text-center leading-snug">
                  {label ?? (isDragging ? 'Solte aqui' : 'Clique ou arraste')}
                </span>
                {hint && (
                  <span className="text-[10px] text-zinc-400 text-center">{hint}</span>
                )}
              </>
            ) : (
              <>
                <Icon size={iconSize} className="text-zinc-300" strokeWidth={1.5} />
                {label && (
                  <span className="text-xs text-zinc-400 text-center leading-snug">{label}</span>
                )}
              </>
            )}
          </div>
        )}

        {/* Clear button when loaded */}
        {status === 'loaded' && uploadable && (
          <button
            onClick={handleClear}
            className={[
              'absolute top-2 right-2 z-10',
              'w-7 h-7 flex items-center justify-center',
              'bg-black/50 hover:bg-black/70 text-white',
              'rounded-full transition-colors duration-150',
            ].join(' ')}
            aria-label="Remover imagem"
          >
            <X size={13} strokeWidth={2.5} />
          </button>
        )}
      </div>

      {uploadable && (
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
        />
      )}
    </div>
  )
}