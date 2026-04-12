import { useNavigate } from 'react-router-dom'
import { Button } from '../components/atom/Button'
import { ProductCard } from '../components/molecules/ProductCard'

const products = [
  {
    id: '1',
    title: 'Fone de ouvido sem fio',
    imageSrc: 'https://images.unsplash.com/photo-1513708928670-6701c9152cc8?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Fone de ouvido premium',
  },
  {
    id: '2',
    title: 'Teclado mecânico RGB',
    imageSrc: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Teclado mecânico elegante',
  },
  {
    id: '3',
    title: 'Mouse gamer ergonômico',
    imageSrc: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Mouse para jogos',
  },
  {
    id: '4',
    title: 'Smartwatch moderno',
    imageSrc: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Relógio inteligente',
  },
  {
    id: '5',
    title: 'Câmera de ação à prova d’água',
    imageSrc: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Câmera de ação',
  },
  {
    id: '6',
    title: 'Alto-falante Bluetooth portátil',
    imageSrc: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1c?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Alto-falante bluetooth moderno',
  },
]

export default function Catalog() {
  const navigate = useNavigate()

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

          <Button variant="secondary" onClick={() => navigate('/') }>
            Voltar para início
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              imageSrc={product.imageSrc}
              imageAlt={product.imageAlt}
              title={product.title}
              onViewProduct={() => alert(`Abrir página do produto: ${product.title}`)}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
