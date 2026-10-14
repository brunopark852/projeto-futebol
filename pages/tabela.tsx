import React from 'react';
import Layout from '@/components/Layout';
import AdSlot from '@/components/AdSlot';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getTabela } from '@/lib/futebolService';

interface TimeAPI {
  posicao: number;
  pontos: number;
  time: {
    time_id: number;
    nome_popular: string;
    sigla: string;
    escudo: string;
  };
  jogos: number;
  vitorias: number;
  empates: number;
  derrotas: number;
  gols_pro: number;
  gols_contra: number;
  saldo_gols: number;
  aproveitamento: number;
  variacao_posicao: number;
  ultimos_jogos: string[];
  faixa_classificacao: string | null;
}

interface TabelaPageProps {
  tabela: TimeAPI[];
  campeonatoId: number;
}

export default function TabelaPage({ tabela, campeonatoId }: TabelaPageProps) {
  const isSerieB = campeonatoId === 14;
  const campeonatoNome = isSerieB ? 'Brasileirão Série B' : 'Brasileirão Série A';
  const edicaoAtual = '2026';

  return (
    <Layout title={`Tabela ${campeonatoNome} ${edicaoAtual} - Futebol`} description={`Classificação completa do ${campeonatoNome} ${edicaoAtual}`}>
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">{campeonatoNome} {edicaoAtual}</h1>
            <p className="text-slate-600 mt-1">Classificação oficial atualizada</p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/tabela?id=10"
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                !isSerieB
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-slate-700 hover:bg-gray-50'
              }`}
            >
              Série A
            </Link>
            <Link
              href="/tabela?id=14"
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                isSerieB
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-slate-700 hover:bg-gray-50'
              }`}
            >
              Série B
            </Link>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-3 py-3 text-left font-semibold text-slate-700 w-10">Pos</th>
              <th className="px-3 py-3 text-left font-semibold text-slate-700">Time</th>
              <th className="px-3 py-3 text-right font-semibold text-slate-700 w-16">Pts</th>
              <th className="px-3 py-3 text-right font-semibold text-slate-700 w-12">J</th>
              <th className="px-3 py-3 text-right font-semibold text-slate-700 w-12">V</th>
              <th className="px-3 py-3 text-right font-semibold text-slate-700 w-12">E</th>
              <th className="px-3 py-3 text-right font-semibold text-slate-700 w-12">D</th>
              <th className="px-3 py-3 text-right font-semibold text-slate-700 w-16">GP</th>
              <th className="px-3 py-3 text-right font-semibold text-slate-700 w-16">GC</th>
              <th className="px-3 py-3 text-right font-semibold text-slate-700 w-16">SG</th>
              <th className="px-3 py-3 text-right font-semibold text-slate-700 w-24">%</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tabela.map((time, index) => (
              <React.Fragment key={time.time.time_id || index}>
                {index === 10 && (
                  <tr>
                    <td colSpan={11} className="px-3 py-2">
                      <AdSlot slot="table" />
                    </td>
                  </tr>
                )}
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-3 font-semibold text-slate-900">{time.posicao}º</td>
                  <td className="px-3 py-3 flex items-center gap-3">
                    <Image src={time.time.escudo} alt={time.time.nome_popular} className="escudo-pequeno" loading="lazy" width={30} height={30} />
                    <Link href={`/times/${time.time.time_id}`} className="font-medium text-slate-900 hover:text-emerald-700 hover:underline">{time.time.nome_popular}</Link>
                    <span className="text-xs text-slate-400 font-semibold uppercase">{time.time.sigla}</span>
                  </td>
                  <td className="px-3 py-3 text-right font-bold text-slate-900">{time.pontos}</td>
                  <td className="px-3 py-3 text-right text-slate-600">{time.jogos}</td>
                  <td className="px-3 py-3 text-right text-emerald-700 font-medium">{time.vitorias}</td>
                  <td className="px-3 py-3 text-right text-slate-500">{time.empates}</td>
                  <td className="px-3 py-3 text-right text-red-600 font-medium">{time.derrotas}</td>
                  <td className="px-3 py-3 text-right text-slate-600">{time.gols_pro}</td>
                  <td className="px-3 py-3 text-right text-slate-600">{time.gols_contra}</td>
                  <td className={`px-3 py-3 text-right font-medium ${time.saldo_gols >= 0 ? 'text-emerald-700' : 'text-red-600'}`}>{time.saldo_gols >= 0 ? '+' : ''}{time.saldo_gols}</td>
                  <td className="px-3 py-3 text-right text-slate-600">{time.aproveitamento}%</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-xs text-slate-500 text-center">
        Dados fornecidos por fontes oficiais do futebol brasileiro.
      </p>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<TabelaPageProps> = async ({ query, res }) => {
  res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=86400');
  const campeonatoId = Number(query.id) === 14 ? 14 : 10;
  try {
    const tabela = await getTabela(campeonatoId);
    return {
      props: {
        tabela,
        campeonatoId,
      },
    };
  } catch (error: unknown) {
    const err = error as { message?: string };
    console.error('Erro ao buscar tabela:', err.message);
    const tabela = await getTabela(campeonatoId);
    return {
      props: {
        tabela,
        campeonatoId,
      },
    };
  }
};
