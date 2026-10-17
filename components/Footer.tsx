import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">
              Futebol
            </h3>
            <p className="text-sm text-slate-600">
              Portal de estatísticas e acompanhamento de futebol brasileiro em tempo real.
            </p>
          </div>
          <nav aria-label="Links úteis">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">
              Navegação
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/sobre" className="hover:text-emerald-700 transition-colors">Sobre o projeto</Link></li>
              <li><Link href="/guia-do-futebol" className="hover:text-emerald-700 transition-colors">Guia do futebol</Link></li>
              <li><Link href="/tabela" className="hover:text-emerald-700 transition-colors">Tabela do Brasileirão</Link></li>
              <li><Link href="/ao-vivo" className="hover:text-emerald-700 transition-colors">Jogos Ao Vivo</Link></li>
              <li><Link href="/artilheiros" className="hover:text-emerald-700 transition-colors">Artilheiros</Link></li>
            </ul>
          </nav>
          <nav aria-label="Institucional">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">
              Institucional
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/privacidade" className="hover:text-emerald-700 transition-colors">Política de Privacidade</Link></li>
              <li><Link href="/termos" className="hover:text-emerald-700 transition-colors">Termos de Uso</Link></li>
              <li><Link href="/contato" className="hover:text-emerald-700 transition-colors">Contato</Link></li>
            </ul>
          </nav>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Futebol. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}