import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-emerald-700 text-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold" aria-label="Projeto Futebol - Início">
            Projeto Futebol
          </Link>
          <nav className="hidden md:flex items-center space-x-6" aria-label="Navegação principal">
            <Link href="/tabela" className="text-sm font-medium hover:text-emerald-200 transition-colors">
              Tabela
            </Link>
            <Link href="/ao-vivo" className="text-sm font-medium hover:text-emerald-200 transition-colors">
              Ao Vivo
            </Link>
            <Link href="/artilheiros" className="text-sm font-medium hover:text-emerald-200 transition-colors">
              Artilheiros
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}