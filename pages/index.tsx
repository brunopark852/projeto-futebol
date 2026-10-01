import { useEffect, useState } from 'react';
import React from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import api from '@/lib/api';

interface Partida {
  id: number;
  data_hora: string;
  estadio: { nome: string };
  placar_mandante: number | null;
  placar_visitante: number | null;
  status: string;
  time_mandante: { id: number; nome: string; sigla: string; escudo: string };
  time_visitante: { id: number; nome: string; sigla: string; escudo: string };
  campeonato: { nome: string };
}

export default function Home() {
  const [jogosHoje, setJogosHoje] = useState<Partida[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAoVivo() {
      try {
        const response = await api.get('/ao-vivo');
        const hoje = new Date().toISOString().split('T')[0];
        const jogos = response.data
          .filter((j: Partida) => j.data_hora && j.data_hora.startsWith(hoje));
        setJogosHoje(jogos.slice(0, 5));
      } catch (err) {
        console.error('Erro ao buscar jogos:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchAoVivo();
  }, []);

  const formatarHora = (iso: string) => {
    return new Date(iso).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, { label: string; class: string }> = {
      'não iniciado': { label: 'Não iniciado', class: 'bg-gray-100 text-gray-700' },
      'ao vivo': { label: 'AO VIVO', class: 'bg-red-600 text-white animate-pulse' },
      'intervalo': { label: 'Intervalo', class: 'bg-yellow-600 text-white' },
      'encerrado': { label: 'Encerrado', class: 'bg-emerald-600 text-white' },
      'adiado': { label: 'Adiado', class: 'bg-gray-400 text-gray-800' },
      'cancelado': { label: 'Cancelado', class: 'bg-gray-400 text-gray-800' },
    };
    return labels[status.toLowerCase()] || { label: status, class: 'bg-gray-100 text-gray-700' };
  };

  return (
    <Layout title="Projeto Futebol - Acompanhamento em tempo real" description="Portal de estatísticas e acompanhamento de futebol brasileiro em tempo real. Tabela, artilheiros, jogos ao vivo e detalhes das partidas.">
      {/* Hero Section */}
      <section className="mb-10">
        <div className="bg-emerald-700 rounded-xl p-6 sm:p-10 text-white text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Projeto Futebol</h1>
          <p className="text-emerald-100 text-lg sm:text-xl max-w-2xl mx-auto">
            Acompanhe o futebol brasileiro em tempo real: tabelas, artilheiros, jogos ao vivo e estatísticas completas.
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Principais Acessos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/tabela" className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-emerald-300 hover:shadow-lg transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                <svg className="w-6 h-6 text-emerald-700 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">Tabela do Brasileirão</h3>
                <p className="text-sm text-slate-500 mt-1">Classificação completa da Série A</p>
              </div>
            </div>
          </Link>
          <Link href="/ao-vivo" className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-emerald-300 hover:shadow-lg transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors">
                <svg className="w-6 h-6 text-red-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">Jogos Ao Vivo</h3>
                <p className="text-sm text-slate-500 mt-1">Placares e eventos em tempo real</p>
              </div>
            </div>
          </Link>
          <Link href="/artilheiros" className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-emerald-300 hover:shadow-lg transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center group-hover:bg-yellow-600 group-hover:text-white transition-colors">
                <svg className="w-6 h-6 text-yellow-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /></svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">Artilheiros</h3>
                <p className="text-sm text-slate-500 mt-1">Ranking de goleadores da competição</p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Jogos de Hoje */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Jogos de Hoje</h2>
          <Link href="/ao-vivo" className="text-sm text-emerald-700 hover:underline font-medium">
            Ver todos →
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : jogosHoje.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <p className="text-slate-600">Nenhum jogo programado para hoje.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {jogosHoje.map((jogo) => (
              <Link key={jogo.id} href={`/partida/${jogo.id}`} className="block bg-white rounded-lg border border-gray-200 p-4 hover:border-emerald-300 hover:shadow-md transition-all">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 text-right mr-4">
                    <img src={jogo.time_mandante.escudo} alt={jogo.time_mandante.nome} className="escudo-medio mx-auto object-contain" loading="lazy" />
                    <p className="font-medium text-slate-900 text-sm mt-1">{jogo.time_mandante.nome}</p>
                    <p className="text-xs text-slate-400 uppercase">{jogo.time_mandante.sigla}</p>
                  </div>
                  <div className="flex flex-col items-center min-w-[100px]">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusLabel(jogo.status).class}`}>
                      {getStatusLabel(jogo.status).label}
                    </span>
                    {jogo.placar_mandante !== null && jogo.placar_visitante !== null && (
                      <div className="text-2xl font-bold text-slate-900 mt-1 font-mono">
                        {jogo.placar_mandante} x {jogo.placar_visitante}
                      </div>
                    )}
                    <p className="text-xs text-slate-500 mt-1">{formatarHora(jogo.data_hora)}</p>
                    <p className="text-xs text-slate-400">{jogo.estadio.nome}</p>
                  </div>
                  <div className="flex-1 text-left ml-4">
                    <img src={jogo.time_visitante.escudo} alt={jogo.time_visitante.nome} className="escudo-medio mx-auto object-contain" loading="lazy" />
                    <p className="font-medium text-slate-900 text-sm mt-1">{jogo.time_visitante.nome}</p>
                    <p className="text-xs text-slate-400 uppercase">{jogo.time_visitante.sigla}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 text-center mt-3">{jogo.campeonato.nome}</p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}