import React from 'react';
import Layout from '@/components/Layout';
import AdSlot from '@/components/AdSlot';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getArtilheiros } from '@/lib/futebolService';

interface ArtilheiroAPI {
  atleta: {
    atleta_id: number;
    nome_popular: string;
    foto?: string;
    posicao?: { nome: string; sigla: string } | [];
  };
  time: {
    time_id: number;
    nome_popular: string;
    sigla: string;
    escudo: string;
  };
  gols: number;
}

interface ArtilheirosPageProps {
  artilheiros: ArtilheiroAPI[];
  campeonatoId: number;
  campeonato: {
    nome: string;
    edicao_atual: string;
  };
}

export default function ArtilheirosPage({ artilheiros, campeonato, campeonatoId }: ArtilheirosPageProps) {
  const isSerieB = campeonatoId === 14;

  return (
    <Layout title={`Artilheiros ${campeonato.nome} ${campeonato.edicao_atual} - Futebol`} description={`Ranking de artilheiros do ${campeonato.nome} ${campeonato.edicao_atual}`}>
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Artilheiros - {campeonato.nome} {campeonato.edicao_atual}</h1>
            <p className="text-slate-600 mt-1">Ranking de goleadores atualizado</p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/artilheiros?id=10"
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                !isSerieB
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-slate-700 hover:bg-gray-50'
              }`}
            >
              Série A
            </Link>
            <Link
              href="/artilheiros?id=14"
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

      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[520px] text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-3 py-3 text-left font-semibold text-slate-700 w-10">Pos</th>
                <th className="px-3 py-3 text-left font-semibold text-slate-700">Jogador</th>
                <th className="px-3 py-3 text-left font-semibold text-slate-700">Time</th>
                <th className="px-3 py-3 text-right font-semibold text-slate-700 w-12">Gols</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {artilheiros.map((artilheiro, index) => (
                <React.Fragment key={`desktop-${artilheiro.atleta.atleta_id || index}`}>
                  {index === 5 && <tr><td colSpan={4} className="px-3 py-2"><AdSlot slot="table" /></td></tr>}
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-3 font-semibold text-slate-900">{index + 1}º</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-3">
                        {artilheiro.atleta.foto && <Image src={artilheiro.atleta.foto} alt={artilheiro.atleta.nome_popular} className="escudo-medio shrink-0 rounded-full object-cover" loading="lazy" width={50} height={50} />}
                        <span className="font-medium text-slate-900">{artilheiro.atleta.nome_popular}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <Image src={artilheiro.time.escudo} alt={artilheiro.time.nome_popular} className="escudo-pequeno shrink-0" loading="lazy" width={30} height={30} />
                        <span className="text-slate-600 text-sm">{artilheiro.time.sigla}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-right font-bold text-emerald-700 text-lg">{artilheiro.gols}</td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <ol className="divide-y divide-gray-100 md:hidden" aria-label="Ranking de artilheiros">
          {artilheiros.map((artilheiro, index) => (
            <React.Fragment key={`mobile-${artilheiro.atleta.atleta_id || index}`}>
              <li className="flex items-center gap-3 p-4">
                <span className="w-8 shrink-0 text-center text-sm font-bold text-slate-500">
                  {index + 1}º{index < 3 && <span className="block text-base leading-none" aria-label={['ouro', 'prata', 'bronze'][index]}>{['🥇', '🥈', '🥉'][index]}</span>}
                </span>
                {artilheiro.atleta.foto ? (
                  <Image src={artilheiro.atleta.foto} alt="" aria-hidden="true" className="h-11 w-11 shrink-0 rounded-full object-cover" loading="lazy" width={44} height={44} />
                ) : (
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-sm font-bold text-emerald-700" aria-hidden="true">{artilheiro.atleta.nome_popular.slice(0, 1)}</span>
                )}
                <div className="min-w-0 flex-1">
                  <span className="block truncate font-semibold text-slate-900">{artilheiro.atleta.nome_popular}</span>
                  <span className="mt-1 flex items-center gap-1.5 text-xs text-slate-600">
                    <Image src={artilheiro.time.escudo} alt="" aria-hidden="true" className="escudo-pequeno shrink-0" loading="lazy" width={24} height={24} />
                    {artilheiro.time.sigla}
                  </span>
                </div>
                <div className="shrink-0 text-right">
                  <span className="block text-xl font-bold leading-tight text-emerald-700">{artilheiro.gols}</span>
                  <span className="text-[10px] font-semibold uppercase text-slate-500">gols</span>
                </div>
              </li>
            </React.Fragment>
          ))}
        </ol>
      </div>

      <p className="mt-6 text-xs text-slate-500 text-center">
        Dados fornecidos por fontes oficiais do futebol brasileiro.
      </p>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<ArtilheirosPageProps> = async ({ query, res }) => {
  res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=86400');
  const campeonatoId = Number(query.id) === 14 ? 14 : 10;
  const isSerieB = campeonatoId === 14;

  try {
    const artilheiros = await getArtilheiros(campeonatoId);
    return {
      props: {
        artilheiros,
        campeonatoId,
        campeonato: {
          nome: isSerieB ? 'Brasileirão Série B' : 'Brasileirão Série A',
          edicao_atual: '2026',
        },
      },
    };
  } catch (error: unknown) {
    const err = error as { message?: string };
    console.error('Erro ao buscar artilheiros:', err.message);
    const artilheiros = await getArtilheiros(campeonatoId);
    return {
      props: {
        artilheiros,
        campeonatoId,
        campeonato: {
          nome: isSerieB ? 'Brasileirão Série B' : 'Brasileirão Série A',
          edicao_atual: '2026',
        },
      },
    };
  }
};
