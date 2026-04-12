import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '../components/atom/Button'
import { ProductCard } from '../components/molecules/ProductCard'
import { ProdutoForm } from '../components/molecules/ProdutoForm'
import type { ProdutoCreate } from '../types/Produto'
import { useCreateProduto } from '../hooks/useProdutoMutations'
import { useProdutos } from '../hooks/useProdutos'

export default function Catalog() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const nome = searchParams.get('nome') ?? ''
  const [offset, setOffset] = useState(0)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const { createProduto, loading: createLoading, error: createError } = useCreateProduto()
  const limit = 24
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setOffset(0)
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [nome])

  const { data, loading, error } = useProdutos({ limit, offset, nome: nome || undefined })
  const produtos = data?.data ?? []
  const hasMore = Boolean(data && produtos.length < data.total)
  const isLoadingMore = loading && offset > 0

  const handleCreateProduct = (payload: ProdutoCreate | any) => {
    createProduto(payload as ProdutoCreate)
    setIsFormOpen(false)
  }

  useEffect(() => {
    const node = sentinelRef.current
    if (!node || loading || !hasMore) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOffset((previousOffset) => previousOffset + limit)
        }
      },
      {
        rootMargin: '200px',
      }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [hasMore, limit, loading, nome])

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Catálogo</p>
            <h1 className="mt-2 text-3xl font-semibold text-zinc-900">Produtos em destaque</h1>
            <p className="mt-3 max-w-2xl text-zinc-600">
              Explore nossa seleção de produtos com descrições rápidas e acesso rápido às ações.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button variant="primary" onClick={() => setIsFormOpen(true)}>
              Novo produto
            </Button>
            <Button variant="secondary" onClick={() => navigate('/') }>
              Voltar para início
            </Button>
          </div>
        </div>

        {loading && offset === 0 && (
          <p className="mb-6 text-zinc-600">Carregando produtos...</p>
        )}

        {error && (
          <p className="mb-6 text-red-600">{error}</p>
        )}

        {!loading && !error && produtos.length === 0 && (
          <p className="mb-6 text-zinc-600">
            {nome
              ? `Nenhum produto encontrado para "${nome}".`
              : 'Nenhum produto encontrado.'}
          </p>
        )}

        {isFormOpen && (
          <div className="mb-10 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
            <ProdutoForm
              onSubmit={handleCreateProduct}
              onCancel={() => setIsFormOpen(false)}
              loading={createLoading}
            />
            {createError ? (
              <p className="mt-4 text-sm text-red-600">{createError}</p>
            ) : null}
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {produtos.map((produto) => (
            <ProductCard
              key={produto.id_produto}
              title={produto.nome_produto}
              imageAlt={produto.categoria_produto || 'Produto sem imagem'}
              imageSrc={produto.link_categoria_imagem}
              onViewProduct={() => navigate(`/produtos/${produto.id_produto}`)}
            />
          ))}
        </div>

        <div ref={sentinelRef} className="h-8" />

        {isLoadingMore && (
          <p className="mt-6 text-zinc-600">Carregando mais produtos...</p>
        )}

        {!loading && !error && !hasMore && produtos.length > 0 && (
          <p className="mt-6 text-zinc-600">Você chegou ao fim do catálogo.</p>
        )}
      </div>
    </main>
  )
}
