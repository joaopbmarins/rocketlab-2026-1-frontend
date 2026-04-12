import { Button } from '../atom/Button'
import { useProdutoForm } from '../../hooks/useProdutoForm'
import type { ProdutoCreate, ProdutoUpdate } from '../../types/Produto'

interface ProdutoFormProps {
  mode?: 'create' | 'update'
  initialData?: ProdutoUpdate
  loading?: boolean
  submitLabel?: string
  onSubmit: (payload: ProdutoCreate | ProdutoUpdate) => void
  onCancel?: () => void
}

const inputStyles =
  'w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10'

export function ProdutoForm({
  mode = 'create',
  initialData,
  loading = false,
  submitLabel,
  onSubmit,
  onCancel,
}: ProdutoFormProps) {
  const { values, setField, payload, isCreateValid } = useProdutoForm({
    mode,
    initialValues: initialData,
  })

  const label = submitLabel ?? (mode === 'create' ? 'Criar produto' : 'Salvar alterações')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit(payload)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="rounded-[28px] border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="mb-8 flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Produto</p>
          <h2 className="text-3xl font-semibold text-zinc-900">
            {mode === 'create' ? 'Novo produto' : 'Editar produto'}
          </h2>
          <p className="max-w-2xl text-zinc-600">
            Preencha os dados do produto e mantenha as informações atualizadas.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700" htmlFor="nome_produto">
              Nome do produto
            </label>
            <input
              id="nome_produto"
              type="text"
              value={values.nome_produto}
              onChange={(event) => setField('nome_produto', event.target.value)}
              placeholder="Ex: Fone sem fio"
              className={inputStyles}
              required={mode === 'create'}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700" htmlFor="categoria_produto">
              Categoria
            </label>
            <input
              id="categoria_produto"
              type="text"
              value={values.categoria_produto}
              onChange={(event) => setField('categoria_produto', event.target.value)}
              placeholder="Ex: Eletrônicos"
              className={inputStyles}
              required={mode === 'create'}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700" htmlFor="peso_produto_gramas">
              Peso (g)
            </label>
            <input
              id="peso_produto_gramas"
              type="number"
              min={0}
              step={1}
              value={values.peso_produto_gramas ?? ''}
              onChange={(event) =>
                setField(
                  'peso_produto_gramas',
                  event.target.value === '' ? null : Number(event.target.value),
                )
              }
              placeholder="Ex: 250"
              className={inputStyles}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700" htmlFor="comprimento_centimetros">
              Comprimento (cm)
            </label>
            <input
              id="comprimento_centimetros"
              type="number"
              min={0}
              step={0.1}
              value={values.comprimento_centimetros ?? ''}
              onChange={(event) =>
                setField(
                  'comprimento_centimetros',
                  event.target.value === '' ? null : Number(event.target.value),
                )
              }
              placeholder="Ex: 12.5"
              className={inputStyles}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700" htmlFor="altura_centimetros">
              Altura (cm)
            </label>
            <input
              id="altura_centimetros"
              type="number"
              min={0}
              step={0.1}
              value={values.altura_centimetros ?? ''}
              onChange={(event) =>
                setField(
                  'altura_centimetros',
                  event.target.value === '' ? null : Number(event.target.value),
                )
              }
              placeholder="Ex: 5.0"
              className={inputStyles}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700" htmlFor="largura_centimetros">
              Largura (cm)
            </label>
            <input
              id="largura_centimetros"
              type="number"
              min={0}
              step={0.1}
              value={values.largura_centimetros ?? ''}
              onChange={(event) =>
                setField(
                  'largura_centimetros',
                  event.target.value === '' ? null : Number(event.target.value),
                )
              }
              placeholder="Ex: 8.0"
              className={inputStyles}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        {onCancel ? (
          <Button type="button" variant="outline" size="md" onClick={onCancel} className="w-full sm:w-auto">
            Cancelar
          </Button>
        ) : null}

        <Button
          type="submit"
          variant="primary"
          size="md"
          loading={loading}
          className="w-full sm:w-auto"
          disabled={mode === 'create' ? !isCreateValid : false}
        >
          {label}
        </Button>
      </div>
    </form>
  )
}
