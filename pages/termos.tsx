import React from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';

export default function TermosPage() {
  return (
    <Layout title="Termos de Uso - Futebol" description="Termos de uso do Futebol - regras e condições para uso do portal.">
      <div className="max-w-3xl mx-auto prose prose-slate">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Termos de Uso</h1>
        <p className="text-slate-600 mb-6"><strong>Última atualização:</strong> 10/10/2026</p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">1. Aceitação dos Termos</h2>
          <p className="text-slate-700 mb-4">
            Ao acessar ou utilizar o site Projeto Futebol ("nós", "nosso", "plataforma"), você concorda expressamente em cumprir e estar vinculado aos seguintes Termos de Uso e à nossa <Link href="/privacidade" className="text-emerald-700 hover:underline">Política de Privacidade</Link>. Se você não concordar com qualquer parte destes termos, não deverá acessar nem utilizar nossos serviços.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">2. Descrição dos Serviços</h2>
          <p className="text-slate-700 mb-4">
            O Projeto Futebol é um portal informativo dedicado à disponibilização de estatísticas, dados, classificações, métricas e análises sobre o futebol.
          </p>
          <ul className="list-disc list-inside text-slate-700 mb-4 space-y-1">
            <li>As informações exibidas possuem caráter meramente informativo e de entretenimento.</li>
            <li>Empenhamo-nos em manter as informações atualizadas e precisas, mas não garantimos que todo o conteúdo esteja isento de falhas, erros ortográficos, divergências de horários ou atrasos no processamento de dados esportivos.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">3. Uso Aceitável da Plataforma</h2>
          <p className="text-slate-700 mb-4">
            Ao utilizar nossa plataforma, você se compromete a:
          </p>
          <ul className="list-disc list-inside text-slate-700 mb-4 space-y-1">
            <li>Uso Pessoal e Não Comercial: Utilizar as informações e conteúdos disponibilizados exclusivamente para fins pessoais e não comerciais.</li>
            <li>Integridade do Sistema: Não realizar qualquer conduta que possa danificar, sobrecarregar, desabilitar ou prejudicar os servidores ou redes conectadas à plataforma.</li>
            <li>Extração Não Autorizada de Dados: É proibido o uso de bots, crawlers, scrapers ou quaisquer ferramentas automatizadas para extração sistemática de dados do site sem prévia autorização por escrito.</li>
            <li>Respeito à Legislação: Não utilizar o site para finalidades ilícitas, fraudulentas ou contrárias às leis brasileiras vigentes.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">4. Propriedade Intelectual</h2>
          <p className="text-slate-700 mb-4">
            Todo o conteúdo disponível no site — incluindo textos, estruturas de dados, elementos gráficos, logotipos, layout e código-fonte — é de propriedade do Projeto Futebol ou de seus parceiros e licenciantes, sendo protegido pelas leis brasileiras de propriedade intelectual e direitos autorais.
          </p>
          <ul className="list-disc list-inside text-slate-700 mb-4 space-y-1">
            <li>Nenhuma parte do site pode ser copiada, reproduzida, republicada, modificada ou distribuída sem autorização prévia por escrito.</li>
            <li>Nomes, marcas e escudos de clubes, federações e campeonatos mencionados no site pertencem aos seus respectivos titulares de direitos e são utilizados estritamente para fins identificativos e informativos.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">5. Isenção e Limitação de Responsabilidade</h2>
          <ul className="list-disc list-inside text-slate-700 mb-4 space-y-1">
            <li><strong>Natureza Informativa:</strong> O Projeto Futebol não é uma casa de apostas nem oferece serviços de jogos de azar. O conteúdo estatístico não constitui conselho financeiro, garantia de resultados ou recomendação para apostas.</li>
            <li><strong>Disponibilidade do Serviço:</strong> Não garantimos que a plataforma estará disponível de forma contínua, ininterrupta ou livre de erros. Reservamo-nos o direito de alterar, suspender ou descontinuar qualquer aspecto do site a qualquer momento, sem aviso prévio.</li>
            <li><strong>Danos Diretos ou Indiretos:</strong> Na extensão máxima permitida por lei, não seremos responsáveis por quaisquer danos diretos, indiretos, incidentais ou consequentes resultantes do uso ou da impossibilidade de uso de nossa plataforma.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">6. Links para Sites e Conteúdos de Terceiros</h2>
          <p className="text-slate-700 mb-4">
            Nosso site pode conter hiperlinks para sites de terceiros, incluindo anunciantes, parceiros comerciais ou redes sociais.
          </p>
          <ul className="list-disc list-inside text-slate-700 mb-4 space-y-1">
            <li>Não exercemos controle sobre o conteúdo, políticas ou práticas de privacidade desses sites externos.</li>
            <li>A inclusão de qualquer link não implica endosso ou responsabilidade do Projeto Futebol pelos produtos, serviços ou conteúdos oferecidos nesses locais.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">7. Proteção de Dados Pessoais</h2>
          <p className="text-slate-700 mb-4">
            O tratamento de dados pessoais dos usuários decorrente da utilização deste site é regido pela nossa Política de Privacidade, em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">8. Modificações nos Termos de Uso</h2>
          <p className="text-slate-700 mb-4">
            Reservamo-nos o direito de revisar e alterar estes Termos de Uso a qualquer momento. Quaisquer alterações entram em vigor imediatamente após sua publicação no site, acompanhadas da data da "Última atualização". Recomenda-se a revisão periódica deste documento.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">9. Legislação Aplicável e Foro</h2>
          <p className="text-slate-700 mb-4">
            Estes Termos de Uso são regidos e interpretados de acordo com as leis da República Federativa do Brasil. Fica eleito o Foro do domicílio do usuário para dirimir quaisquer controvérsias decorrentes destes termos ou do uso da plataforma.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">10. Contato</h2>
          <p className="text-slate-700 mb-4">
            Caso tenha dúvidas, comentários ou sugestões referentes a estes Termos de Uso, entre em contato conosco por meio da nossa página de Contato.
          </p>
        </section>
      </div>
    </Layout>
  );
}