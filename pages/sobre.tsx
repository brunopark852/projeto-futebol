import Layout from '@/components/Layout';
import Link from 'next/link';

export default function SobrePage() {
  return (
    <Layout
      title="Sobre o Projeto Futebol Hoje"
      description="Conheça o Projeto Futebol Hoje, sua proposta editorial, como apresenta dados esportivos e como entrar em contato."
    >
      <article className="mx-auto max-w-3xl rounded-xl border border-gray-200 bg-white p-6 sm:p-10">
        <h1 className="mb-4 text-3xl font-bold text-slate-900">Sobre o Projeto Futebol Hoje</h1>
        <p className="mb-5 text-lg leading-8 text-slate-700">
          O Projeto Futebol Hoje é um portal independente para acompanhar partidas, placares, tabelas e informações do futebol brasileiro em um só lugar.
          A proposta é facilitar a consulta de dados esportivos e ajudar o leitor a entender o contexto das competições.
        </p>

        <h2 className="mb-2 mt-8 text-xl font-semibold text-slate-900">O que você encontra aqui</h2>
        <ul className="list-disc space-y-2 pl-6 leading-7 text-slate-700">
          <li>Calendário de partidas, horários e status dos jogos.</li>
          <li>Resultados e classificações conforme os dados disponíveis das competições.</li>
          <li>Estatísticas de equipes e artilheiros, quando disponibilizadas pelas fontes de dados.</li>
          <li>Uma seleção de manchetes esportivas com links para as publicações originais.</li>
          <li>Guias explicativos sobre tabelas, resultados e leitura de estatísticas.</li>
        </ul>

        <h2 className="mb-2 mt-8 text-xl font-semibold text-slate-900">Fontes e atualização</h2>
        <p className="mb-4 leading-7 text-slate-700">
          Os dados de partidas e competições são obtidos de serviços de dados esportivos integrados ao projeto. A disponibilidade e a frequência de atualização dependem dessas fontes e da cobertura contratada.
          Por esse motivo, podem ocorrer atrasos, alterações de horário ou informações incompletas. Em caso de divergência, consulte os canais oficiais da competição ou do clube.
        </p>
        <p className="mb-4 leading-7 text-slate-700">
          Na seção de notícias, os títulos identificam a fonte e direcionam o leitor ao conteúdo original. O Projeto Futebol Hoje não se apresenta como autor de matérias publicadas por outros veículos.
        </p>

        <h2 className="mb-2 mt-8 text-xl font-semibold text-slate-900">Independência e transparência</h2>
        <p className="mb-4 leading-7 text-slate-700">
          O site pode exibir publicidade para ajudar a financiar sua manutenção. A publicidade não deve ser interpretada como endosso editorial de um clube, serviço ou produto.
          Informações sobre o uso de dados e cookies estão disponíveis na Política de Privacidade.
        </p>

        <h2 className="mb-2 mt-8 text-xl font-semibold text-slate-900">Fale conosco</h2>
        <p className="leading-7 text-slate-700">
          Encontrou um erro, tem uma sugestão ou precisa entrar em contato sobre privacidade? Visite nossa página de <Link href="/contato" className="font-semibold text-emerald-700 hover:underline">Contato</Link>.
        </p>
      </article>
    </Layout>
  );
}
