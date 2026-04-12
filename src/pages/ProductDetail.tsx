import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../components/atom/Button'
import { ImagePlaceholder } from '../components/atom/Imageplaceholder'
import { useProdutosDetails } from '../hooks/useProdutosDetails'

export default function ProductDetail() {
  const navigate = useNavigate()
  const { id } = useParams<{ id?: string }>()
  const { data: produto, loading, error } = useProdutosDetails(id)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Detalhes do produto</p>
            <h1 className="mt-2 text-3xl font-semibold text-zinc-900">Informações do produto</h1>
          </div>

          <Button variant="secondary" onClick={() => navigate('/catalog')}>
            Voltar ao catálogo
          </Button>
        </div>

        {loading && <p className="text-zinc-600">Carregando informações...</p>}

        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && !produto && (
          <p className="text-zinc-600">Produto não encontrado.</p>
        )}

        {produto && (
          <section className="grid gap-8 lg:grid-cols-[360px_minmax(0,1fr)]">
            <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
              <ImagePlaceholder
                src={produto.link_categoria_imagem}
                alt={produto.categoria || 'Imagem do produto'}
                variant="card"
                ratio="4/3"
                className="w-full"
              />
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">{produto.categoria}</p>
                <h2 className="mt-4 text-2xl font-semibold text-zinc-900">{produto.nome}</h2>
                <p className="mt-4 text-zinc-600">ID do produto: {produto.id}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Peso</p>
                  <p className="mt-2 text-zinc-900">
                    {produto.peso_gramas ? `${produto.peso_gramas} g` : 'Não informado'}
                  </p>
                </div>
                <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Dimensões</p>
                  <p className="mt-2 text-zinc-900">
                    {produto.comprimento_centimetros ?? produto.altura_centimetros ?? produto.largura_centimetros
                      ? `${produto.comprimento_centimetros ?? '-'} x ${produto.altura_centimetros ?? '-'} x ${produto.largura_centimetros ?? '-'} cm`
                      : 'Não informado'}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
