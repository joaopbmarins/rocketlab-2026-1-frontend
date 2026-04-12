import { useNavigate } from 'react-router-dom'
import { Button } from '../components/atom/Button'

export default function Home() {
  const navigate = useNavigate()

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.15),_transparent_30%),linear-gradient(to_bottom_right,_#0f172a,_#1e293b,_#000)]" />
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-sky-500/30 blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-pink-500/20 blur-[120px]" />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 text-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">Sua Loja Online</h1>
          <p className="mt-4 text-lg text-white/80 sm:text-xl">Os melhores produtos em um só lugar</p>
          <Button variant="secondary" onClick={() => navigate('/catalog')} className="mt-8">
            Explore Agora
          </Button>
        </div>
      </div>
    </main>
  );
}

