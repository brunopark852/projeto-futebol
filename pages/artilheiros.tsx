import React from 'react';
import Layout from '@/components/Layout';
import AdSlot from '@/components/AdSlot';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

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
  campeonato: {
    nome: string;
    edicao_atual: string;
  };
}

export default function ArtilheirosPage({ artilheiros, campeonato }: ArtilheirosPageProps) {
  return (
    <Layout title={`Artilheiros ${campeonato.nome} ${campeonato.edicao_atual} - Projeto Futebol`} description={`Ranking de artilheiros do ${campeonato.nome} ${campeonato.edicao_atual}`}>
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Artilheiros - {campeonato.nome} {campeonato.edicao_atual}</h1>
        <p className="text-slate-600 mt-1">Ranking de goleadores atualizado</p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-sm">
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
              <React.Fragment key={artilheiro.atleta.atleta_id}>
                {index === 5 && (
                  <tr>
                    <td colSpan={4} className="px-3 py-2">
                      <AdSlot slot="table" />
                    </td>
                  </tr>
                )}
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-3 font-semibold text-slate-900">
                    {index + 1}º
                    {index === 0 && <span className="ml-1 text-yellow-500">🥇</span>}
                    {index === 1 && <span className="ml-1 text-gray-400">🥈</span>}
                    {index === 2 && <span className="ml-1 text-amber-700">🥉</span>}
                  </td>
                  <td className="px-3 py-3 flex items-center gap-3">
                    {artilheiro.atleta.foto && (
                      <img src={artilheiro.atleta.foto} alt={artilheiro.atleta.nome_popular} className="escudo-medio rounded-full object-cover" loading="lazy" />
                    )}
                    <span className="font-medium text-slate-900">{artilheiro.atleta.nome_popular}</span>
                  </td>
                  <td className="px-3 py-3 flex items-center gap-2">
                    <img src={artilheiro.time.escudo} alt={artilheiro.time.nome_popular} className="escudo-pequeno" loading="lazy" />
                    <span className="text-slate-600 text-sm">{artilheiro.time.sigla}</span>
                  </td>
                  <td className="px-3 py-3 text-right font-bold text-emerald-700 text-lg">{artilheiro.gols}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-xs text-slate-500 text-center">
        Dados fornecidos por <a href="https://api-futebol.com.br" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">API Futebol</a>. Atualizado em {new Date().toLocaleDateString('pt-BR')}.
      </p>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<ArtilheirosPageProps> = async () => {
  try {
    const apiKey = process.env.API_FUTEBOL_KEY;
    if (!apiKey) {
      throw new Error('API_FUTEBOL_KEY não configurada');
    }
    const response = await axios.get('https://api.api-futebol.com.br/v1/campeonatos/10/artilharia', {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    return {
      props: {
        artilheiros: response.data,
        campeonato: {
          nome: 'Brasileirão Série A',
          edicao_atual: '2024',
        },
      },
    };
  } catch (error: any) {
    console.error('Erro ao buscar artilheiros:', error.response?.data || error.message);
    return {
      props: {
        artilheiros: [],
        campeonato: { nome: 'Brasileirão Série A', edicao_atual: '2024' },
      },
    };
  }
};