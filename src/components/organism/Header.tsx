import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { SearchBar } from '../molecules/Searchbar'
import "./Header.css";

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
    <header className="header">
      <div className="header__container">
        
        <div className="header__brand">
          <div className="header__logo">Shop</div>

          <nav className="header__nav">
            <a href="#">Início</a>
            <a href="#">Produtos</a>
          </nav>
        </div>

        <div className="header__search">
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

        {/* Ações */}
        <div className="header__actions">
          <button className="header__btn header__btn--primary">Carrinho</button>
        </div>

      </div>
    </header>
  );
}