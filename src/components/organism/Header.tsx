import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { SearchBar } from '../molecules/Searchbar'

export default function Header() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const query = searchParams.get('nome') ?? ''
  const [searchValue, setSearchValue] = useState(query)

  useEffect(() => {
    setSearchValue(query)
  }, [query])

  const handleSearch = (value: string) => {
    const trimmed = value.trim()
    setSearchValue(trimmed)
    if (trimmed) {
      navigate(`/catalog?nome=${encodeURIComponent(trimmed)}`)
    } else {
      navigate('/catalog')
    }
  }

  const handleClear = () => {
    setSearchValue('')
    navigate('/catalog')
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-4 py-4">
        <div className="flex items-center gap-8">
          <div className="text-white text-xl font-bold">Shop</div>

          <nav className="hidden items-center gap-8 md:flex">
            <button type="button" className="text-white/80 transition hover:text-white" onClick={() => navigate('/')}>Início</button>
            <button type="button" className="text-white/80 transition hover:text-white" onClick={() => navigate('/catalog')}>Produtos</button>
          </nav>
        </div>

        <div className="min-w-[220px] max-w-[420px] flex-1">
          <SearchBar
            placeholder="Buscar produtos..."
            variant="filled"
            size="md"
            fullWidth
            value={searchValue}
            onChange={setSearchValue}
            onSearch={handleSearch}
            onClear={handleClear}
          />
        </div>

        <div className="flex items-center gap-2">
          <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10">Carrinho</button>
        </div>
      </div>
    </header>
  );
}