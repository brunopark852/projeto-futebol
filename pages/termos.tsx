import React from 'react';
import Layout from '@/components/Layout';

export default function TermosPage() {
  return (
    <Layout title="Termos de Uso - Projeto Futebol" description="Termos de uso do Projeto Futebol - regras e condições para uso do portal.">
      <div className="max-w-3xl mx-auto prose prose-slate">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Termos de Uso</h1>
        <p className="text-slate-600 mb-6"><strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}</p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">1. Aceitação dos Termos</h2>
          <p className="text-slate-700 mb-4">
            Ao acessar e usar o Projeto Futebol ("site", "portal", "nós"), você concorda em cumprir estes Termos de Uso
            e nossa <a href="/privacidade" className="text-emerald-700 hover:underline">Política de Privacidade</a>.
            Se não concordar com qualquer parte, não utilize o site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">2. Descrição do Serviço</h2>
          <p className="text-slate-700 mb-4">
            O Projeto Futebol é um portal de estatísticas e acompanhamento de futebol brasileiro em tempo real.
            Fornecemos tabelas de classificação, artilheiros, jogos ao vivo e detalhes de partidas, utilizando dados
            da <a href="https://api-futebol.com.br" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">API Futebol</a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">3. Uso Permitido</h2>
          <p className="text-slate-700 mb-4">Você concorda em usar o site apenas para fins legais e de acordo com estes termos. É proibido:</p>
          <ul className="list-disc list-inside text-slate-700 mb-4 space-y-1">
            <li>Raspagem (scraping) automatizada de dados sem autorização</li>
            <li>Tentativas de burlar medidas de segurança ou limitação de taxa</li>
            <li>Uso comercial dos dados sem licença adequada</li>
            <li>Qualquer atividade que sobrecarregue ou prejudique o funcionamento do site</li>
            <li>Redistribuição do conteúdo como se fosse seu</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">4. Propriedade Intelectual</h2>
          <p className="text-slate-700 mb-4">
            O design, layout, código e apresentação do Projeto Futebol são de nossa propriedade.
            Os dados esportivos (tabelas, gols, escalações) pertencem às respectivas entidades organizadoras
            e são licenciados via API Futebol. Você não adquire direitos de propriedade ao acessar o site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">5. Isenção de Garantias</h2>
          <p className="text-slate-700 mb-4">
            O site é fornecido "como está" e "conforme disponível". Não garantimos que:
          </p>
          <ul className="list-disc list-inside text-slate-700 mb-4 space-y-1">
            <li>O site estará sempre disponível ou livre de erros</li>
            <li>Os dados estarão sempre precisos, completos ou atualizados em tempo real</li>
            <li>Defeitos serão corrigidos imediatamente</li>
          </ul>
          <p className="text-slate-700 mb-4">
            Os dados são fornecidos por terceiros (API Futebol) e podem conter atrasos ou imprecisões.
            Não nos responsabilizamos por decisões baseadas nas informações do site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">6. Limitação de Responsabilidade</h2>
          <p className="text-slate-700 mb-4">
            Em nenhuma hipótese seremos responsáveis por danos diretos, indiretos, incidentais, consequenciais
            ou punitivos decorrentes do uso ou impossibilidade de uso do site, incluindo perda de dados,
            lucros cessantes ou interrupção de negócios.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">7. Publicidade e Links de Terceiros</h2>
          <p className="text-slate-700 mb-4">
            Exibimos anúncios via Google AdSense e links para sites de terceiros. Não endossamos,
            controlamos ou nos responsabilizamos pelo conteúdo, precisão ou práticas de privacidade
            de anunciantes ou sites vinculados.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">8. Modificações no Serviço</h2>
          <p className="text-slate-700 mb-4">
            Podemos modificar, suspender ou descontinuar o site (ou partes dele) a qualquer momento,
            com ou sem aviso prévio. Não seremos responsáveis por quaisquer modificações, suspensões
            ou descontinuações.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">9. Lei Aplicável e Foro</h2>
          <p className="text-slate-700 mb-4">
            Estes termos são regidos pelas leis da República Federativa do Brasil. Quaisquer disputas
            serão resolvidas no foro da comarca de São Paulo/SP, com renúncia a qualquer outro.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">10. Contato</h2>
          <p className="text-slate-700 mb-4">
            Dúvidas sobre estes Termos de Uso? Entre em contato através da nossa página de
            <a href="/contato" className="text-emerald-700 hover:underline">Contato</a>.
          </p>
        </section>
      </div>
    </Layout>
  );
}