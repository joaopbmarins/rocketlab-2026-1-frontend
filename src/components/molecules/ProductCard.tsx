import { Button } from '../atom/Button'
import { ImagePlaceholder } from '../atom/Imageplaceholder'
import { Label } from '../atom/Label'

interface ProductCardProps {
  imageSrc?: string
  imageAlt?: string
  title: string
  buttonLabel?: string
  onViewProduct?: () => void
  className?: string
}

export function ProductCard({
  imageSrc,
  imageAlt = 'Imagem do produto',
  title,
  buttonLabel = 'Ver produto',
  onViewProduct,
  className = '',
}: ProductCardProps) {
  return (
    <article className={['overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md', className].join(' ')}>
      <div className="overflow-hidden">
        <ImagePlaceholder
          src={imageSrc}
          alt={imageAlt}
          variant="card"
          ratio="4/3"
          shimmer
          className="min-h-[120px]"
        />
      </div>

      <div className="flex flex-col gap-3 p-4">
        <Label variant="default" size="lg" className="truncate">
          {title}
        </Label>

        <Button
          variant="secondary"
          size="md"
          fullWidth
          onClick={onViewProduct}
          disabled={!onViewProduct}
        >
          {buttonLabel}
        </Button>
      </div>
    </article>
  )
}
