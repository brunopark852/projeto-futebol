import React from 'react';
import Layout from '@/components/Layout';
import AdSlot from '@/components/AdSlot';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';

interface PartidaDetalheAPI {
  partida_id: number;
  campeonato: {
    campeonato_id: number;
    nome: string;
    slug: string;
    nome_popular: string;
    fase_atual: {
      fase_id: number;
      nome: string;
      slug: string;
      tipo: string;
      _link: string;
    };
    rodada_atual: {
      nome: string;
      slug: string;
      rodada: number;
      status: string;
    } | null;
    edicao: {
      edicao_id: number;
      temporada: string;
      nome: string;
      nome_popular: string;
      slug: string;
    };
  };
  placar: string;
  time_mandante: {
    time_id: number;
    nome_popular: string;
    sigla: string;
    escudo: string;
  };
  time_visitante: {
    time_id: number;
    nome_popular: string;
    sigla: string;
    escudo: string;
  };
  placar_mandante: number | null;
  placar_visitante: number | null;
  disputa_penalti: boolean | {
    placar_penalti_mandante: number;
    placar_penalti_visitante: number;
    cobrancas: Array<{
      atleta: { atleta_id: number; nome_popular: string };
      time: { time_id: number; nome_popular: string; sigla: string; escudo: string };
      status: 'converteu' | 'perdeu';
    }>;
  };
  status: 'agendado' | 'pre-jogo' | 'andamento' | 'finalizado' | 'adiado' | 'suspensa';
  periodo: 'primeiro-tempo' | 'intervalo' | 'segundo-tempo' | 'primeiro-tempo-prorrogacao' | 'intervalo-prorrogacao' | 'segundo-tempo-prorrogacao' | 'disputa-penalti' | 'fim-de-jogo' | null;
  data_hora: string;
  estadio: {
    estadio_id: number;
    nome_popular: string;
  };
  grupo: string | null;
  rodada: string | null;
  fase: {
    fase_id: number;
    nome: string;
    slug: string;
    tipo: string;
    _link: string;
  };
  estatisticas?: {
    mandante: {
      posse_de_bola: string;
      escanteios: number;
      impedimentos: number;
      faltas: number;
      passes: { total: number; completos: number; errados: number; precisao: string };
      finalizacao: { total: number; no_gol: number; pra_fora: number; na_trave: number; bloqueado: number; precisao: string };
      defensivo: { defesas: number };
      desarmes: number;
    };
    visitante: {
      posse_de_bola: string;
      escanteios: number;
      impedimentos: number;
      faltas: number;
      passes: { total: number; completos: number; errados: number; precisao: string };
      finalizacao: { total: number; no_gol: number; pra_fora: number; na_trave: number; bloqueado: number; precisao: string };
      defensivo: { defesas: number };
      desarmes: number;
    };
  };
  escalacoes?: {
    mandante: {
      esquema_tatico: string;
      tecnico: { tecnico_id: number; nome_popular: string };
      titulares: Array<{
        atleta: { atleta_id: number; nome_popular: string };
        camisa: string;
        ordem: number;
        posicao: { nome: string; sigla: string } | [];
      }>;
      reservas: Array<{
        atleta: { atleta_id: number; nome_popular: string };
        camisa: string;
        ordem: number;
        posicao: { nome: string; sigla: string } | [];
      }>;
    };
    visitante: {
      esquema_tatico: string;
      tecnico: { tecnico_id: number; nome_popular: string };
      titulares: Array<{
        atleta: { atleta_id: number; nome_popular: string };
        camisa: string;
        ordem: number;
        posicao: { nome: string; sigla: string } | [];
      }>;
      reservas: Array<{
        atleta: { atleta_id: number; nome_popular: string };
        camisa: string;
        ordem: number;
        posicao: { nome: string; sigla: string } | [];
      }>;
    };
  };
  gols?: {
    mandante: Array<{
      atleta: { atleta_id: number; nome_popular: string };
      minuto: string;
      periodo: string;
      periodo_slug: string;
      penalti: boolean;
      gol_contra: boolean;
    }>;
    visitante: Array<{
      atleta: { atleta_id: number; nome_popular: string };
      minuto: string;
      periodo: string;
      periodo_slug: string;
      penalti: boolean;
      gol_contra: boolean;
    }>;
  };
  substituicoes?: {
    mandante: Array<{
      saiu: { atleta_id: number; nome_popular: string };
      entrou: { atleta_id: number; nome_popular: string };
      periodo: string;
      periodo_slug: string;
      minuto: string;
    }>;
    visitante: Array<{
      saiu: { atleta_id: number; nome_popular: string };
      entrou: { atleta_id: number; nome_popular: string };
      periodo: string;
      periodo_slug: string;
      minuto: string;
    }>;
  };
  cartoes?: {
    amarelo: {
      mandante: Array<{ cartao_id: number; atleta: { atleta_id: number; nome_popular: string } | null; minuto: string | null; periodo: string; periodo_slug: string }>;
      visitante: Array<{ cartao_id: number; atleta: { atleta_id: number; nome_popular: string } | null; minuto: string | null; periodo: string; periodo_slug: string }>;
    };
    vermelho: {
      mandante: Array<{ cartao_id: number; atleta: { atleta_id: number; nome_popular: string } | null; minuto: string | null; periodo: string; periodo_slug: string }>;
      visitante: Array<{ cartao_id: number; atleta: { atleta_id: number; nome_popular: string } | null; minuto: string | null; periodo: string; periodo_slug: string }>;
    };
  };
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
      'agendado': { label: 'Agendado', class: 'bg-gray-100 text-gray-700' },
      'pre-jogo': { label: 'Pré-jogo', class: 'bg-blue-100 text-blue-700' },
      'andamento': { label: 'AO VIVO', class: 'bg-red-600 text-white animate-pulse' },
      'intervalo': { label: 'Intervalo', class: 'bg-yellow-600 text-white' },
      'finalizado': { label: 'Encerrado', class: 'bg-emerald-600 text-white' },
      'adiado': { label: 'Adiado', class: 'bg-gray-400 text-gray-800' },
      'suspensa': { label: 'Suspensa', class: 'bg-gray-400 text-gray-800' },
    };
    return configs[status.toLowerCase()] || { label: status, class: 'bg-gray-100 text-gray-700' };
  };

  const getPeriodoLabel = (periodo: string | null) => {
    const labels: Record<string, string> = {
      'primeiro-tempo': '1º Tempo',
      'intervalo': 'Intervalo',
      'segundo-tempo': '2º Tempo',
      'primeiro-tempo-prorrogacao': '1º Tempo Prorrogação',
      'intervalo-prorrogacao': 'Intervalo Prorrogação',
      'segundo-tempo-prorrogacao': '2º Tempo Prorrogação',
      'disputa-penalti': 'Pênaltis',
      'fim-de-jogo': 'Fim de Jogo',
    };
    return periodo ? labels[periodo] : '';
  };

  const agruparGols = (gols?: PartidaDetalheAPI['gols']) => {
    const grupos: Record<string, typeof gols> = { mandante: [], visitante: [] };
    if (!gols) return grupos;
    gols.mandante?.forEach((g) => { if (!grupos.mandante) grupos.mandante = []; grupos.mandante!.push({...g, lado: 'mandante'}); });
    gols.visitante?.forEach((g) => { if (!grupos.visitante) grupos.visitante = []; grupos.visitante!.push({...g, lado: 'visitante'}); });
    return grupos;
  };

  const agruparEscalacao = (escalacao?: PartidaDetalheAPI['escalacoes']) => {
    if (!escalacao) return { mandante: {} as Record<string, Array<{ atleta: { atleta_id: number; nome_popular: string }; camisa: string; ordem: number; posicao: { nome: string; sigla: string } | [] }>>, visitante: {} as Record<string, Array<{ atleta: { atleta_id: number; nome_popular: string }; camisa: string; ordem: number; posicao: { nome: string; sigla: string } | [] }>> };
    const grupos: Record<string, { mandante: Record<string, Array<{ atleta: { atleta_id: number; nome_popular: string }; camisa: string; ordem: number; posicao: { nome: string; sigla: string } | [] }>>; visitante: Record<string, Array<{ atleta: { atleta_id: number; nome_popular: string }; camisa: string; ordem: number; posicao: { nome: string; sigla: string } | [] }>> }> = { mandante: {}, visitante: {} };
    const ordemPosicoes = ['Goleiro', 'Zagueiro', 'Lateral', 'Volante', 'Meia', 'Atacante'];
    
    escalacao.mandante.titulares?.forEach((j) => {
      const pos = j.posicao && !Array.isArray(j.posicao) && j.posicao.nome ? j.posicao.nome : 'Outros';
      if (!grupos.mandante[pos]) grupos.mandante[pos] = [];
      grupos.mandante[pos].push(j);
    });
    escalacao.visitante.titulares?.forEach((j) => {
      const pos = j.posicao && !Array.isArray(j.posicao) && j.posicao.nome ? j.posicao.nome : 'Outros';
      if (!grupos.visitante[pos]) grupos.visitante[pos] = [];
      grupos.visitante[pos].push(j);
    });
    return grupos;
  };

  const golsAgrupados = agruparGols(partida.gols);
  const escalacaoAgrupada = agruparEscalacao(partida.escalacoes);
  const ordemPosicoes = ['Goleiro', 'Zagueiro', 'Lateral', 'Volante', 'Meia', 'Atacante'];

  const campeonatoNome = partida.campeonato.edicao?.nome_popular || partida.campeonato.nome_popular || partida.campeonato.nome;
  const temporada = partida.campeonato.edicao?.temporada || '';

  return (
    <Layout title={`${partida.time_mandante.nome_popular} x ${partida.time_visitante.nome_popular} - Projeto Futebol`} description={`${partida.time_mandante.nome_popular} ${partida.placar_mandante ?? '-'} x ${partida.placar_visitante ?? '-'} ${partida.time_visitante.nome_popular} - ${campeonatoNome} ${temporada}`}>
      {/* Cabeçalho da Partida */}
      <div className="mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
            <div className="text-center md:mr-auto">
              <p className="text-sm text-slate-500 mb-1">{campeonatoNome} {temporada}</p>
              <p className="text-xs text-slate-400">{partida.estadio.nome_popular}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusConfig(partida.status).class}`}>
                {getStatusConfig(partida.status).label}
              </span>
              {partida.status.toLowerCase() === 'andamento' && partida.periodo && (
                <span className="text-sm font-mono font-bold text-red-600 animate-pulse">{getPeriodoLabel(partida.periodo)}</span>
              )}
            </div>
            <div className="text-center md:ml-auto">
              <p className="text-sm text-slate-500 mb-1">{partida.data_hora ? formatarDataHora(partida.data_hora) : 'A definir'}</p>
              <p className="text-xs text-slate-400">Data e hora</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 sm:gap-8">
            <div className="flex-1 text-right">
              <Image src={partida.time_mandante.escudo} alt={partida.time_mandante.nome_popular} className="escudo-grande mx-auto object-contain mb-2" loading="lazy" width={80} height={80} />
              <h2 className="text-xl font-bold text-slate-900">{partida.time_mandante.nome_popular}</h2>
              <p className="text-sm text-slate-400 uppercase">{partida.time_mandante.sigla}</p>
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
              {partida.disputa_penalti && typeof partida.disputa_penalti === 'object' && (
                <p className="text-xs text-slate-500 mt-1">({partida.disputa_penalti.placar_penalti_mandante} x {partida.disputa_penalti.placar_penalti_visitante} pen.)</p>
              )}
            </div>
            <div className="flex-1 text-left">
              <Image src={partida.time_visitante.escudo} alt={partida.time_visitante.nome_popular} className="escudo-grande mx-auto object-contain mb-2" loading="lazy" width={80} height={80} />
              <h2 className="text-xl font-bold text-slate-900">{partida.time_visitante.nome_popular}</h2>
              <p className="text-sm text-slate-400 uppercase">{partida.time_visitante.sigla}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gols */}
      {partida.gols && (partida.gols.mandante.length > 0 || partida.gols.visitante.length > 0) && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Gols da Partida</h2>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden divide-y divide-gray-100">
            {['mandante', 'visitante'].map((lado) => {
              const siglaTime = lado === 'mandante' ? partida.time_mandante.sigla : partida.time_visitante.sigla;
              const gols = partida.gols![lado as keyof typeof partida.gols];
              if (!gols || gols.length === 0) return null;
              return (
                <div key={lado} className="p-4">
                  <h3 className="font-semibold text-slate-700 mb-3 capitalize">{lado === 'mandante' ? partida.time_mandante.nome_popular : partida.time_visitante.nome_popular}</h3>
                  <div className="space-y-2">
                    {gols.map((gol, idx) => (
                      <div key={`${lado}-${idx}`} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 text-right text-sm font-medium text-slate-600 pt-0.5">
                          {gol.minuto + "'"}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-slate-900">
                            <span className="font-medium">{gol.atleta.nome_popular}</span>
                            {' '}
                            <span className="text-slate-500">({siglaTime})</span>
                            {gol.penalti && <span className="text-emerald-600 ml-1">(pen.)</span>}
                            {gol.gol_contra && <span className="text-red-600 ml-1">(g.c.)</span>}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Escalações */}
      {partida.escalacoes && (Object.keys(partida.escalacoes.mandante.titulares).length > 0 || Object.keys(partida.escalacoes.visitante.titulares).length > 0) && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Escalações</h2>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-0">
              <div className="p-4 border-r border-gray-200 md:border-r-0">
                <h3 className="font-semibold text-slate-900 mb-3 pb-2 border-b border-gray-100 text-center md:text-right pr-4 md:pr-0">{partida.time_mandante.nome_popular}</h3>
                <div className="space-y-2">
                  {ordemPosicoes.map((pos) => {
                    const jogadores = partida.escalacoes?.mandante.titulares.filter((j) => j.posicao && !Array.isArray(j.posicao) && j.posicao.nome === pos);
                    if (!jogadores || jogadores.length === 0) return null;
                    return (
                      <div key={pos} className="flex flex-row-reverse gap-2 justify-end">
                        <span className="text-xs text-slate-400 whitespace-nowrap mt-1">{pos}</span>
                        <div className="flex-1 flex flex-col items-end gap-1">
                          {jogadores.map((j) => (
                            <div key={j.atleta.nome_popular} className="flex items-center gap-2 w-full justify-end">
                              <span className="text-xs font-medium text-slate-600 w-6 text-right">{j.camisa}</span>
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
                    const jogadores = partida.escalacoes?.visitante.titulares.filter((j) => j.posicao && !Array.isArray(j.posicao) && j.posicao.nome === pos);
                    if (!jogadores || jogadores.length === 0) return null;
                    return (
                      <div key={pos} className="flex gap-2">
                        <span className="text-xs text-slate-400 whitespace-nowrap mt-1">{pos}</span>
                        <div className="flex-1 flex flex-col gap-1">
                          {jogadores.map((j) => (
                            <div key={j.atleta.nome_popular} className="flex items-center gap-2">
                              <span className="text-xs font-medium text-slate-600 w-6">{j.camisa}</span>
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

      {/* Eventos (Substituições + Cartões) */}
      {(partida.substituicoes && (partida.substituicoes.mandante.length > 0 || partida.substituicoes.visitante.length > 0)) ||
       (partida.cartoes && ((partida.cartoes.amarelo.mandante.length > 0 || partida.cartoes.amarelo.visitante.length > 0) ||
                          (partida.cartoes.vermelho.mandante.length > 0 || partida.cartoes.vermelho.visitante.length > 0))) && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Eventos da Partida</h2>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-100">
              {/* Substituições */}
              {partida.substituicoes && (partida.substituicoes.mandante.length > 0 || partida.substituicoes.visitante.length > 0) && (
                <div className="p-4">
                  <h3 className="font-semibold text-slate-700 mb-3">Substituições</h3>
                  <div className="space-y-2">
                    {['mandante', 'visitante'].map((lado) => {
                      const subs = partida.substituicoes![lado as keyof typeof partida.substituicoes];
                      if (!subs || subs.length === 0) return null;
                      const siglaTime = lado === 'mandante' ? partida.time_mandante.sigla : partida.time_visitante.sigla;
                      return subs.map((sub, idx) => {
                      const minutoFormatado = `${sub.minuto}'`;
                      return (
                        <div key={`${lado}-sub-${idx}`} className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-10 text-right text-sm font-medium text-slate-600 pt-0.5">
                            {minutoFormatado}
                          </div>
                          <div className="flex-1 flex items-center gap-2">
                            <span className="text-sm text-slate-900">{sub.saiu.nome_popular}</span>
                            <span className="text-slate-400">→</span>
                            <span className="text-sm text-slate-900">{sub.entrou.nome_popular}</span>
                            <span className="text-slate-500">({siglaTime})</span>
                          </div>
                        </div>
                      );
                    );
                  </div>
                </div>
              )}
              {/* Cartões amarelos */}
              {partida.cartoes && (partida.cartoes.amarelo.mandante.length > 0 || partida.cartoes.amarelo.visitante.length > 0) && (
                <div className="p-4">
                  <h3 className="font-semibold text-slate-700 mb-3">Cartões Amarelos</h3>
                  <div className="space-y-2">
                    {['mandante', 'visitante'].map((lado) => {
                      const cards = partida.cartoes!.amarelo[lado as keyof typeof partida.cartoes.amarelo];
                      if (!cards || cards.length === 0) return null;
                      const siglaTime = lado === 'mandante' ? partida.time_mandante.sigla : partida.time_visitante.sigla;
                      return cards.map((card, idx) => {
                      const minutoFormatado = card.minuto ? `${card.minuto}'` : "'";
                      return (
                        <div key={`${lado}-amarelo-${idx}`} className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-10 text-right text-sm font-medium text-slate-600 pt-0.5">
                            {minutoFormatado}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-slate-900">
                              {card.atleta?.nome_popular || 'Comissão técnica'}
                              <span className="text-slate-500 ml-1">({siglaTime})</span>
                            </p>
                          </div>
                        </div>
                      );
                    );
                  </div>
                </div>
              )}
              {/* Cartões vermelhos */}
              {partida.cartoes && (partida.cartoes.vermelho.mandante.length > 0 || partida.cartoes.vermelho.visitante.length > 0) && (
                <div className="p-4">
                  <h3 className="font-semibold text-slate-700 mb-3">Cartões Vermelhos</h3>
                  <div className="space-y-2">
                    {['mandante', 'visitante'].map((lado) => {
                      const cards = partida.cartoes!.vermelho[lado as keyof typeof partida.cartoes.vermelho];
                      if (!cards || cards.length === 0) return null;
                      const siglaTime = lado === 'mandante' ? partida.time_mandante.sigla : partida.time_visitante.sigla;
                      return cards.map((card, idx) => {
                      const minutoFormatado = card.minuto ? `${card.minuto}'` : "'";
                      return (
                        <div key={`${lado}-vermelho-${idx}`} className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-10 text-right text-sm font-medium text-slate-600 pt-0.5">
                            {minutoFormatado}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-slate-900">
                              {card.atleta?.nome_popular || 'Comissão técnica'}
                              <span className="text-red-600 ml-1">({siglaTime})</span>
                            </p>
                          </div>
                        </div>
                      );
                    );
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Estatísticas */}
      {partida.estatisticas && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Estatísticas</h2>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              <div className="p-4 text-right border-r border-gray-200">
                <h3 className="font-semibold text-slate-900 mb-3">{partida.time_mandante.nome_popular}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-end gap-4"><span className="text-slate-600">Posse</span> <span className="font-semibold">{partida.estatisticas.mandante.posse_de_bola}</span></div>
                  <div className="flex justify-end gap-4"><span className="text-slate-600">Finalizações</span> <span className="font-semibold">{partida.estatisticas.mandante.finalizacao.total} ({partida.estatisticas.mandante.finalizacao.no_gol} no gol)</span></div>
                  <div className="flex justify-end gap-4"><span className="text-slate-600">Escanteios</span> <span className="font-semibold">{partida.estatisticas.mandante.escanteios}</span></div>
                  <div className="flex justify-end gap-4"><span className="text-slate-600">Passes</span> <span className="font-semibold">{partida.estatisticas.mandante.passes.completos}/{partida.estatisticas.mandante.passes.total} ({partida.estatisticas.mandante.passes.precisao})</span></div>
                  <div className="flex justify-end gap-4"><span className="text-slate-600">Faltas</span> <span className="font-semibold">{partida.estatisticas.mandante.faltas}</span></div>
                  <div className="flex justify-end gap-4"><span className="text-slate-600">Desarmes</span> <span className="font-semibold">{partida.estatisticas.mandante.desarmes}</span></div>
                </div>
              </div>
              <div className="hidden md:block w-24 flex flex-col items-center justify-center bg-gray-50 border-x border-gray-200 px-2">
                <AdSlot slot="match" className="w-full" />
              </div>
              <div className="p-4 text-left border-l border-gray-200">
                <h3 className="font-semibold text-slate-900 mb-3">{partida.time_visitante.nome_popular}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-4"><span className="text-slate-600">Posse</span> <span className="font-semibold">{partida.estatisticas.visitante.posse_de_bola}</span></div>
                  <div className="flex gap-4"><span className="text-slate-600">Finalizações</span> <span className="font-semibold">{partida.estatisticas.visitante.finalizacao.total} ({partida.estatisticas.visitante.finalizacao.no_gol} no gol)</span></div>
                  <div className="flex gap-4"><span className="text-slate-600">Escanteios</span> <span className="font-semibold">{partida.estatisticas.visitante.escanteios}</span></div>
                  <div className="flex gap-4"><span className="text-slate-600">Passes</span> <span className="font-semibold">{partida.estatisticas.visitante.passes.completos}/{partida.estatisticas.visitante.passes.total} ({partida.estatisticas.visitante.passes.precisao})</span></div>
                  <div className="flex gap-4"><span className="text-slate-600">Faltas</span> <span className="font-semibold">{partida.estatisticas.visitante.faltas}</span></div>
                  <div className="flex gap-4"><span className="text-slate-600">Desarmes</span> <span className="font-semibold">{partida.estatisticas.visitante.desarmes}</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
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

  if (!/^\d+$/.test(id)) {
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
  } catch (error: unknown) {
    const err = error as { response?: { status?: number; data?: unknown }; message?: string };
    console.error('Erro ao buscar partida:', err.response?.data || err.message);
    if (err.response?.status === 404) {
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
