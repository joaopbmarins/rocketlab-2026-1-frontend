import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../components/atom/Button'
import { ImagePlaceholder } from '../components/atom/Imageplaceholder'
import { useProdutosDetails } from '../hooks/useProdutosDetails'
import { useProdutoAvaliacoes } from '../hooks/useProdutoAvaliacoes'

export default function ProductDetail() {
  const navigate = useNavigate()
  const { id } = useParams<{ id?: string }>()
  const { data: produto, loading, error } = useProdutosDetails(id)
  const {
    data: avaliacoes,
    loading: avaliacoesLoading,
    error: avaliacoesError,
    loadAvaliacoes,
  } = useProdutoAvaliacoes()

  const handleLoadAvaliacoes = () => {
    loadAvaliacoes(id)
  }

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

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
                <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Vendas</p>
                  <p className="mt-2 text-zinc-900">{produto.total_vendas.toLocaleString()}</p>
                </div>
                <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Avaliação média</p>
                  <p className="mt-2 text-zinc-900">{produto.media_avaliacoes.toFixed(1)} / 5</p>
                  <p className="mt-1 text-sm text-zinc-500">{produto.total_avaliacoes} avaliações</p>
                </div>
              </div>

              <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Avaliações</p>
                    <p className="mt-2 text-zinc-600">Veja os comentários reais dos clientes sobre este produto.</p>
                  </div>
                  <Button
                    variant="secondary"
                    onClick={handleLoadAvaliacoes}
                    loading={avaliacoesLoading}
                  >
                    Carregar avaliações
                  </Button>
                </div>

                {avaliacoesError && <p className="mt-4 text-red-600">{avaliacoesError}</p>}

                {avaliacoes && avaliacoes.length === 0 && (
                  <p className="mt-4 text-zinc-600">Nenhuma avaliação disponível para este produto.</p>
                )}

                {avaliacoes && avaliacoes.length > 0 && (
                  <div className="mt-6 space-y-4">
                    {avaliacoes.map((avaliacao) => (
                      <div
                        key={avaliacao.id_avaliacao}
                        className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <p className="font-semibold text-zinc-900">Pedido #{avaliacao.id_pedido}</p>
                          <span className="text-sm font-semibold text-zinc-700">
                            {avaliacao.avaliacao.toFixed(1)} / 5
                          </span>
                        </div>
                        {avaliacao.titulo_comentario ? (
                          <p className="mt-3 text-lg font-semibold text-zinc-900">
                            {avaliacao.titulo_comentario}
                          </p>
                        ) : null}
                        <p className="mt-2 text-zinc-600">
                          {avaliacao.comentario || 'Nenhum comentário disponível.'}
                        </p>
                        <p className="mt-3 text-sm text-zinc-500">
                          {avaliacao.data_comentario
                            ? new Date(avaliacao.data_comentario).toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                              })
                            : 'Data não informada'}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
