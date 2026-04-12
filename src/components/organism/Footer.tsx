export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-slate-950 text-white">
      <div className="absolute -top-36 left-[-6rem] h-[400px] w-[400px] rounded-full bg-sky-500/15 blur-[120px]" />
      <div className="relative mx-auto max-w-[1200px] px-4 py-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-semibold">Shop</h3>
            <p className="mt-2 text-sm text-white/70">Sua loja online de confiança</p>
          </div>

          <div className="flex flex-col gap-2 text-sm text-white/70 md:flex-row md:gap-6">
            <a href="#" className="transition hover:text-white">Sobre</a>
            <a href="#" className="transition hover:text-white">Ajuda</a>
            <a href="#" className="transition hover:text-white">Privacidade</a>
          </div>
        </div>

        <div className="mt-8 text-sm text-white/60 md:mt-10">
          © 2026 Shop. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}