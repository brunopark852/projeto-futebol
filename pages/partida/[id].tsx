import React from 'react';
import Layout from '@/components/Layout';
import AdSlot from '@/components/AdSlot';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

interface PartidaDetalheAPI {
  partida_id: number;
  data_hora: string;
  estadio: { nome: string; cidade: string; uf: string };
  placar_mandante: number | null;
  placar_visitante: number | null;
  status: string;
  tempo: string;
  time_mandante: { 
    time_id: number; 
    nome_popular: string; 
    sigla: string; 
    escudo: string;
    tecnico: string;
  };
  time_visitante: { 
    time_id: number; 
    nome_popular: string; 
    sigla: string; 
    escudo: string;
    tecnico: string;
  };
  campeonato: { nome: string; edicao_atual: string; slug: string };
  eventos: Array<{
    tipo: string;
    minuto: number;
    atleta: { nome_popular: string };
    time: { sigla: string };
    descricao: string;
  }>;
  escalação_mandante: Array<{
    posicao: string;
    atleta: { nome_popular: string; foto: string };
    numero: number;
  }>;
  escalação_visitante: Array<{
    posicao: string;
    atleta: { nome_popular: string; foto: string };
    numero: number;
  }>;
}

interface PartidaPageProps {
  partida: PartidaDetalheAPI | null;
  notFound?: boolean;
}

export default function PartidaPage({ partida, notFound }: PartidaPageProps) {
  if (notFound || !partida) {
    return (
      <Layout title="Partida não encontrada - Projeto Futebol">
        <div className="text-center py-16">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Partida não encontrada</h1>
          <p className="text-slate-600 mb-6">A partida solicitada não existe ou não está disponível.</p>
          <Link href="/ao-vivo" className="text-emerald-700 hover:underline font-medium">Voltar para jogos ao vivo</Link>
        </div>
      </Layout>
    );
  }

  const formatarDataHora = (iso: string) => {
    return new Date(iso).toLocaleString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { label: string; class: string }> = {
      'não iniciado': { label: 'Não iniciado', class: 'bg-gray-100 text-gray-700' },
      'ao vivo': { label: 'AO VIVO', class: 'bg-red-600 text-white animate-pulse' },
      'intervalo': { label: 'Intervalo', class: 'bg-yellow-600 text-white' },
      'encerrado': { label: 'Encerrado', class: 'bg-emerald-600 text-white' },
      'adiado': { label: 'Adiado', class: 'bg-gray-400 text-gray-800' },
      'cancelado': { label: 'Cancelado', class: 'bg-gray-400 text-gray-800' },
    };
    return configs[status.toLowerCase()] || { label: status, class: 'bg-gray-100 text-gray-700' };
  };

  const agruparEventos = (eventos: PartidaDetalheAPI['eventos']) => {
    const grupos: Record<string, typeof eventos> = {};
    eventos?.forEach((e) => {
      if (!grupos[e.tipo]) grupos[e.tipo] = [];
      grupos[e.tipo].push(e);
    });
    return grupos;
  };

  const agruparEscalacao = (escalacao: PartidaDetalheAPI['escalação_mandante']) => {
    const grupos: Record<string, typeof escalacao> = {};
    escalacao?.forEach((e) => {
      if (!grupos[e.posicao]) grupos[e.posicao] = [];
      grupos[e.posicao].push(e);
    });
    return grupos;
  };

  const eventosAgrupados = agruparEventos(partida.eventos);
  const escalacaoMandante = agruparEscalacao(partida.escalação_mandante);
  const escalacaoVisitante = agruparEscalacao(partida.escalação_visitante);

  const ordemPosicoes = ['Goleiro', 'Zagueiro', 'Lateral', 'Volante', 'Meia', 'Atacante'];

  return (
    <Layout title={`${partida.time_mandante.nome_popular} x ${partida.time_visitante.nome_popular} - Projeto Futebol`} description={`${partida.time_mandante.nome_popular} ${partida.placar_mandante ?? '-'} x ${partida.placar_visitante ?? '-'} ${partida.time_visitante.nome_popular} - ${partida.campeonato.nome}`}>
      {/* Cabeçalho da Partida */}
      <div className="mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
            <div className="text-center md:mr-auto">
              <p className="text-sm text-slate-500 mb-1">{partida.campeonato.nome} {partida.campeonato.edicao_atual}</p>
              <p className="text-xs text-slate-400">{partida.estadio.nome} - {partida.estadio.cidade}/{partida.estadio.uf}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusConfig(partida.status).class}`}>
                {getStatusConfig(partida.status).label}
              </span>
              {partida.status.toLowerCase() === 'ao vivo' && (
                <span className="text-sm font-mono font-bold text-red-600 animate-pulse">{partida.tempo}</span>
              )}
            </div>
            <div className="text-center md:ml-auto">
              <p className="text-sm text-slate-500 mb-1">{formatarDataHora(partida.data_hora)}</p>
              <p className="text-xs text-slate-400">Data e hora</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 sm:gap-8">
            <div className="flex-1 text-right">
              <img src={partida.time_mandante.escudo} alt={partida.time_mandante.nome_popular} className="escudo-grande mx-auto object-contain mb-2" loading="lazy" />
              <h2 className="text-xl font-bold text-slate-900">{partida.time_mandante.nome_popular}</h2>
              <p className="text-sm text-slate-400 uppercase">{partida.time_mandante.sigla}</p>
              {partida.time_mandante.tecnico && <p className="text-xs text-slate-500 mt-1">Técnico: {partida.time_mandante.tecnico}</p>}
            </div>
            <div className="flex flex-col items-center text-slate-900">
              {partida.placar_mandante !== null && partida.placar_visitante !== null ? (
                <div className="text-4xl sm:text-5xl font-bold font-mono">
                  {partida.placar_mandante} x {partida.placar_visitante}
                </div>
              ) : (
                <div className="text-4xl sm:text-5xl font-bold font-mono text-slate-300">- x -</div>
              )}
              <p className="text-xs text-slate-400 mt-1">Placar</p>
            </div>
            <div className="flex-1 text-left">
              <img src={partida.time_visitante.escudo} alt={partida.time_visitante.nome_popular} className="escudo-grande mx-auto object-contain mb-2" loading="lazy" />
              <h2 className="text-xl font-bold text-slate-900">{partida.time_visitante.nome_popular}</h2>
              <p className="text-sm text-slate-400 uppercase">{partida.time_visitante.sigla}</p>
              {partida.time_visitante.tecnico && <p className="text-xs text-slate-500 mt-1">Técnico: {partida.time_visitante.tecnico}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Escalações */}
      {(Object.keys(escalacaoMandante).length > 0 || Object.keys(escalacaoVisitante).length > 0) && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Escalações</h2>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-0">
              <div className="p-4 border-r border-gray-200 md:border-r-0">
                <h3 className="font-semibold text-slate-900 mb-3 pb-2 border-b border-gray-100 text-center md:text-right pr-4 md:pr-0">{partida.time_mandante.nome_popular}</h3>
                <div className="space-y-2">
                  {ordemPosicoes.map((pos) => {
                    const jogadores = escalacaoMandante[pos];
                    if (!jogadores) return null;
                    return (
                      <div key={pos} className="flex flex-row-reverse gap-2 justify-end">
                        <span className="text-xs text-slate-400 whitespace-nowrap mt-1">{pos}</span>
                        <div className="flex-1 flex flex-col items-end gap-1">
                          {jogadores.map((j) => (
                            <div key={j.atleta.nome_popular} className="flex items-center gap-2 w-full justify-end">
                              <span className="text-xs font-medium text-slate-600 w-6 text-right">{j.numero}</span>
                              <span className="text-sm text-slate-900 truncate">{j.atleta.nome_popular}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="hidden md:block w-24 flex flex-col items-center justify-center bg-gray-50 border-x border-gray-200 px-2">
                <AdSlot slot="match" className="w-full" />
              </div>

              <div className="p-4 border-l border-gray-200 md:border-l-0">
                <h3 className="font-semibold text-slate-900 mb-3 pb-2 border-b border-gray-100 text-center md:text-left pl-4 md:pl-0">{partida.time_visitante.nome_popular}</h3>
                <div className="space-y-2">
                  {ordemPosicoes.map((pos) => {
                    const jogadores = escalacaoVisitante[pos];
                    if (!jogadores) return null;
                    return (
                      <div key={pos} className="flex gap-2">
                        <span className="text-xs text-slate-400 whitespace-nowrap mt-1">{pos}</span>
                        <div className="flex-1 flex flex-col gap-1">
                          {jogadores.map((j) => (
                            <div key={j.atleta.nome_popular} className="flex items-center gap-2">
                              <span className="text-xs font-medium text-slate-600 w-6">{j.numero}</span>
                              <span className="text-sm text-slate-900 truncate">{j.atleta.nome_popular}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Eventos da Partida */}
      {partida.eventos && partida.eventos.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Eventos da Partida</h2>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-100">
              {Object.entries(eventosAgrupados).map(([tipo, eventos]) => (
                <div key={tipo} className="p-4">
                  <h3 className="font-semibold text-slate-700 mb-3 capitalize">{tipo}s</h3>
                  <div className="space-y-2">
                    {eventos.map((evento, idx) => (
                      <div key={`${tipo}-${idx}`} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 text-right text-sm font-medium text-slate-600 pt-0.5">
                          {evento.minuto}'
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-slate-900">
                            <span className="font-medium">{evento.atleta.nome_popular}</span>
                            {' '}
                            <span className="text-slate-500">({evento.time.sigla})</span>
                          </p>
                          <p className="text-xs text-slate-500">{evento.descricao}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <p className="mt-6 text-xs text-slate-500 text-center">
        Dados fornecidos por <a href="https://api-futebol.com.br" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">API Futebol</a>. Atualizado em {new Date().toLocaleDateString('pt-BR')}.
      </p>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<PartidaPageProps> = async ({ params }) => {
  const id = params?.id as string;
  if (!id) {
    return {
      props: {
        partida: null,
        notFound: true,
      },
    };
  }

  try {
    const apiKey = process.env.API_FUTEBOL_KEY;
    if (!apiKey) {
      throw new Error('API_FUTEBOL_KEY não configurada');
    }
    const response = await axios.get(`https://api.api-futebol.com.br/v1/partidas/${id}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    return {
      props: {
        partida: response.data,
      },
    };
  } catch (error: any) {
    console.error('Erro ao buscar partida:', error.response?.data || error.message);
    if (error.response?.status === 404) {
      return {
        props: {
          partida: null,
          notFound: true,
        },
      };
    }
    return {
      props: {
        partida: null,
        notFound: true,
      },
    };
  }
};