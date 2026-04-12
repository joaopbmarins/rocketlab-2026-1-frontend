import { SearchBar } from '../molecules/Searchbar'
import "./Header.css";

export default function Header() {
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