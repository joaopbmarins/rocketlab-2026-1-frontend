import { useNavigate } from 'react-router-dom'
import { Button } from '../components/atom/Button'
import './Home.css'

export default function Home() {
  const navigate = useNavigate()

  return (
    <main className="home">
      
      {/* Gradiente principal */}
      <div className="home__gradient" />

      {/* Glows */}
      <div className="home__glow home__glow--blue" />
      <div className="home__glow home__glow--pink" />

      {/* Overlay */}
      <div className="home__overlay" />

      {/* Conteúdo placeholder */}
      <div className="home__content">
        <div>
          <h1>Sua Loja Online</h1>
          <p>Os melhores produtos em um só lugar</p>
          <Button variant="secondary" onClick={() => navigate('/catalog')}>
            Explore Agora
          </Button>
        </div>
      </div>

    </main>
  );
}

