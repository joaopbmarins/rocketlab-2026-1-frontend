import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">

        <div className="footer__top">
          <div>
            <h3>Shop</h3>
            <p>Sua loja online de confiança</p>
          </div>

          <div className="footer__links">
            <a href="#">Sobre</a>
            <a href="#">Ajuda</a>
            <a href="#">Privacidade</a>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© 2026 Shop. Todos os direitos reservados.</p>
        </div>

      </div>
    </footer>
  );
}