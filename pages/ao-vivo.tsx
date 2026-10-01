import React from 'react';
import Layout from '@/components/Layout';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

interface PartidaAPI {
  partida_id: number;
  data_hora: string;
  estadio: { nome: string; cidade: string };
  placar_mandante: number | null;
  placar_visitante: number | null;
  status: string;
  time_mandante: { time_id: number; nome_popular: string; sigla: string; escudo: string };
  time_visitante: { time_id: number; nome_popular: string; sigla: string; escudo: string };
  campeonato: { nome: string; edicao_atual: string; slug: string };
}

interface AoVivoPageProps {
  partidas: PartidaAPI[];
}

export default function AoVivoPage({ partidas }: AoVivoPageProps) {
  const formatarDataHora = (iso: string) => {
    return new Date(iso).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { label: string; class: string; dotClass: string }> = {
      'não iniciado': { label: 'Não iniciado', class: 'bg-gray-100 text-gray-700', dotClass: 'bg-gray-400' },
      'ao vivo': { label: 'AO VIVO', class: 'bg-red-600 text-white animate-pulse', dotClass: 'bg-red-400 animate-pulse' },
      'intervalo': { label: 'Intervalo', class: 'bg-yellow-600 text-white', dotClass: 'bg-yellow-400' },
      'encerrado': { label: 'Encerrado', class: 'bg-emerald-600 text-white', dotClass: 'bg-emerald-400' },
      'adiado': { label: 'Adiado', class: 'bg-gray-400 text-gray-800', dotClass: 'bg-gray-500' },
      'cancelado': { label: 'Cancelado', class: 'bg-gray-400 text-gray-800', dotClass: 'bg-gray-500' },
    };
    return configs[status.toLowerCase()] || { label: status, class: 'bg-gray-100 text-gray-700', dotClass: 'bg-gray-400' };
  };

  const partidasHoje = partidas.filter((p) => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const partidaDate = new Date(p.data_hora);
    partidaDate.setHours(0, 0, 0, 0);
    return partidaDate.getTime() === hoje.getTime();
  });

  const partidasFuturas = partidas.filter((p) => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const partidaDate = new Date(p.data_hora);
    partidaDate.setHours(0, 0, 0, 0);
    return partidaDate > hoje;
  }).slice(0, 10);

  const partidasPassadas = partidas.filter((p) => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const partidaDate = new Date(p.data_hora);
    partidaDate.setHours(0, 0, 0, 0);
    return partidaDate < hoje && p.status.toLowerCase() === 'encerrado';
  }).slice(-5).reverse();

  return (
    <Layout title="Jogos Ao Vivo - Projeto Futebol" description="Acompanhe os jogos de futebol ao vivo: placares, tempo real e estatísticas das partidas.">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Jogos Ao Vivo</h1>
        <p className="text-slate-600 mt-1">Placares e eventos em tempo real</p>
      </div>

      {/* Jogos de Hoje */}
      {partidasHoje.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
            Jogos de Hoje ({new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })})
          </h2>
          <div className="space-y-3">
            {partidasHoje.map((partida) => (
              <Link key={partida.partida_id} href={`/partida/${partida.partida_id}`} className="block bg-white rounded-lg border border-gray-200 p-4 hover:border-emerald-300 hover:shadow-md transition-all">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 text-right mr-4 min-w-0">
                    <img src={partida.time_mandante.escudo} alt={partida.time_mandante.nome_popular} className="escudo-medio mx-auto object-contain" loading="lazy" />
                    <p className="font-medium text-slate-900 text-sm mt-1 truncate">{partida.time_mandante.nome_popular}</p>
                    <p className="text-xs text-slate-400 uppercase">{partida.time_mandante.sigla}</p>
                  </div>
                  <div className="flex flex-col items-center min-w-[110px]">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusConfig(partida.status).class}`}>
                      {getStatusConfig(partida.status).label}
                    </span>
                    {partida.placar_mandante !== null && partida.placar_visitante !== null && (
                      <div className="text-2xl font-bold text-slate-900 mt-1 font-mono">
                        {partida.placar_mandante} x {partida.placar_visitante}
                      </div>
                    )}
                    <p className="text-xs text-slate-500 mt-1">{formatarDataHora(partida.data_hora)}</p>
                    <p className="text-xs text-slate-400 truncate w-full text-center">{partida.estadio.nome}</p>
                  </div>
                  <div className="flex-1 text-left ml-4 min-w-0">
                    <img src={partida.time_visitante.escudo} alt={partida.time_visitante.nome_popular} className="escudo-medio mx-auto object-contain" loading="lazy" />
                    <p className="font-medium text-slate-900 text-sm mt-1 truncate">{partida.time_visitante.nome_popular}</p>
                    <p className="text-xs text-slate-400 uppercase">{partida.time_visitante.sigla}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 text-center mt-3">{partida.campeonato.nome}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Próximos Jogos */}
      {partidasFuturas.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-700 rounded-full"></span>
            Próximos Jogos
          </h2>
          <div className="space-y-3">
            {partidasFuturas.map((partida) => (
              <Link key={partida.partida_id} href={`/partida/${partida.partida_id}`} className="block bg-white rounded-lg border border-gray-200 p-4 hover:border-emerald-300 hover:shadow-md transition-all">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 text-right mr-4 min-w-0">
                    <img src={partida.time_mandante.escudo} alt={partida.time_mandante.nome_popular} className="escudo-medio mx-auto object-contain" loading="lazy" />
                    <p className="font-medium text-slate-900 text-sm mt-1 truncate">{partida.time_mandante.nome_popular}</p>
                    <p className="text-xs text-slate-400 uppercase">{partida.time_mandante.sigla}</p>
                  </div>
                  <div className="flex flex-col items-center min-w-[110px]">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusConfig(partida.status).class}`}>
                      {getStatusConfig(partida.status).label}
                    </span>
                    <div className="text-lg font-medium text-slate-400 mt-1 font-mono">- x -</div>
                    <p className="text-xs text-slate-500 mt-1">{formatarDataHora(partida.data_hora)}</p>
                    <p className="text-xs text-slate-400 truncate w-full text-center">{partida.estadio.nome}</p>
                  </div>
                  <div className="flex-1 text-left ml-4 min-w-0">
                    <img src={partida.time_visitante.escudo} alt={partida.time_visitante.nome_popular} className="escudo-medio mx-auto object-contain" loading="lazy" />
                    <p className="font-medium text-slate-900 text-sm mt-1 truncate">{partida.time_visitante.nome_popular}</p>
                    <p className="text-xs text-slate-400 uppercase">{partida.time_visitante.sigla}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 text-center mt-3">{partida.campeonato.nome}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Jogos Recentes */}
      {partidasPassadas.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
            Jogos Recentes
          </h2>
          <div className="space-y-3">
            {partidasPassadas.map((partida) => (
              <Link key={partida.partida_id} href={`/partida/${partida.partida_id}`} className="block bg-white rounded-lg border border-gray-200 p-4 hover:border-emerald-300 hover:shadow-md transition-all">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 text-right mr-4 min-w-0">
                    <img src={partida.time_mandante.escudo} alt={partida.time_mandante.nome_popular} className="escudo-medio mx-auto object-contain" loading="lazy" />
                    <p className="font-medium text-slate-900 text-sm mt-1 truncate">{partida.time_mandante.nome_popular}</p>
                    <p className="text-xs text-slate-400 uppercase">{partida.time_mandante.sigla}</p>
                  </div>
                  <div className="flex flex-col items-center min-w-[110px]">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusConfig(partida.status).class}`}>
                      {getStatusConfig(partida.status).label}
                    </span>
                    {partida.placar_mandante !== null && partida.placar_visitante !== null && (
                      <div className="text-2xl font-bold text-slate-900 mt-1 font-mono">
                        {partida.placar_mandante} x {partida.placar_visitante}
                      </div>
                    )}
                    <p className="text-xs text-slate-500 mt-1">{formatarDataHora(partida.data_hora)}</p>
                    <p className="text-xs text-slate-400 truncate w-full text-center">{partida.estadio.nome}</p>
                  </div>
                  <div className="flex-1 text-left ml-4 min-w-0">
                    <img src={partida.time_visitante.escudo} alt={partida.time_visitante.nome_popular} className="escudo-medio mx-auto object-contain" loading="lazy" />
                    <p className="font-medium text-slate-900 text-sm mt-1 truncate">{partida.time_visitante.nome_popular}</p>
                    <p className="text-xs text-slate-400 uppercase">{partida.time_visitante.sigla}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 text-center mt-3">{partida.campeonato.nome}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {partidasHoje.length === 0 && partidasFuturas.length === 0 && partidasPassadas.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          <p className="text-slate-600">Nenhum jogo encontrado.</p>
        </div>
      )}

      <p className="mt-6 text-xs text-slate-500 text-center">
        Dados fornecidos por <a href="https://api-futebol.com.br" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">API Futebol</a>. Atualizado em {new Date().toLocaleDateString('pt-BR')}.
      </p>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<AoVivoPageProps> = async () => {
  try {
    const apiKey = process.env.API_FUTEBOL_KEY;
    if (!apiKey) {
      throw new Error('API_FUTEBOL_KEY não configurada');
    }
    const response = await axios.get('https://api.api-futebol.com.br/v1/ao-vivo', {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    return {
      props: {
        partidas: response.data,
      },
    };
  } catch (error: any) {
    console.error('Erro ao buscar jogos ao vivo:', error.response?.data || error.message);
    return {
      props: {
        partidas: [],
      },
    };
  }
};