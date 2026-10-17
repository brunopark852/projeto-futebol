import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-emerald-700 text-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold" aria-label="Futebol - Início">
            Futebol
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
            <Link href="/noticias" className="text-sm font-medium hover:text-emerald-200 transition-colors">
              Notícias
            </Link>
          </nav>
        </div>
        <nav className="md:hidden -mx-4 flex items-center gap-5 overflow-x-auto border-t border-emerald-600 px-4 py-3 whitespace-nowrap" aria-label="Navegação principal móvel">
          <Link href="/tabela" className="text-sm font-semibold hover:text-emerald-200">Tabela</Link>
          <Link href="/ao-vivo" className="text-sm font-semibold hover:text-emerald-200">Ao Vivo</Link>
          <Link href="/artilheiros" className="text-sm font-semibold hover:text-emerald-200">Artilheiros</Link>
          <Link href="/noticias" className="text-sm font-semibold hover:text-emerald-200">Notícias</Link>
        </nav>
      </div>
    </header>
  );
}