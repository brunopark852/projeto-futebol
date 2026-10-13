import type { GetServerSideProps, NextPage } from 'next';
import Layout from '@/components/Layout';
import AdSlot from '@/components/AdSlot';
import { useState, useMemo } from 'react';
import fs from 'fs';
import path from 'path';

export type NewsItem = {
  id: string;
  title: string;
  url: string;
  publishedAt: string;
  source: {
    name: string;
  };
  time: string | null;
  competicao: string;
  assunto: string;
  sourceBadge: {
    label: string;
    color: string;
  };
};

interface NoticiasProps {
  initialNews: NewsItem[];
  lastUpdated: string;
}

const Noticias: NextPage<NoticiasProps> = ({ initialNews, lastUpdated }) => {
  const [search, setSearch] = useState('');
  const [selectedCompeticao, setSelectedCompeticao] = useState('Todas');
  const [selectedAssunto, setSelectedAssunto] = useState('Todos');
  const [selectedTime, setSelectedTime] = useState('Todos');

  // Lista de competições disponíveis nos dados
  const competicoes = useMemo(() => {
    const list = Array.from(new Set(initialNews.map((n) => n.competicao).filter(Boolean)));
    return ['Todas', ...list];
  }, [initialNews]);

  // Lista de assuntos disponíveis
  const assuntos = useMemo(() => {
    const list = Array.from(new Set(initialNews.map((n) => n.assunto).filter(Boolean)));
    return ['Todos', ...list];
  }, [initialNews]);

  // Lista de clubes disponíveis
  const clubes = useMemo(() => {
    const list = Array.from(new Set(initialNews.map((n) => n.time).filter((t): t is string => Boolean(t))));
    return ['Todos', ...list.sort()];
  }, [initialNews]);

  // Filtragem combinada
  const filteredNews = useMemo(() => {
    return initialNews.filter((item) => {
      if (selectedCompeticao !== 'Todas' && item.competicao !== selectedCompeticao) {
        return false;
      }
      if (selectedAssunto !== 'Todos' && item.assunto !== selectedAssunto) {
        return false;
      }
      if (selectedTime !== 'Todos' && item.time !== selectedTime) {
        return false;
      }
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesSource = item.source.name.toLowerCase().includes(query);
        const matchesTime = item.time ? item.time.toLowerCase().includes(query) : false;
        if (!matchesTitle && !matchesSource && !matchesTime) {
          return false;
        }
      }
      return true;
    });
  }, [initialNews, selectedCompeticao, selectedAssunto, selectedTime, search]);

  const formatTimeAgo = (dateStr: string) => {
    try {
      const diffMs = Date.now() - new Date(dateStr).getTime();
      const diffMins = Math.floor(diffMs / (1000 * 60));
      if (diffMins < 60) return `há ${diffMins} min`;
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `há ${diffHours}h`;
      const diffDays = Math.floor(diffHours / 24);
      return `há ${diffDays} dia${diffDays > 1 ? 's' : ''}`;
    } catch {
      return '';
    }
  };

  // Prevenção rigorosa contra links maliciosos (javascript:, data:, vbscript:)
  const getSafeUrl = (url?: string): string => {
    if (!url) return '#';
    try {
      const parsed = new URL(url);
      if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
        return url;
      }
    } catch {
      return '#';
    }
    return '#';
  };

  return (
    <Layout
      title="Notícias do Futebol Brasileiro - ge, UOL, Lance, ESPN - Futebol"
      description="Acompanhe as últimas notícias do futebol brasileiro e internacional com curadoria em tempo real de grandes portais como ge.globo, UOL, Lance! e ESPN."
    >
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Notícias do Futebol</h1>
              <p className="text-slate-600 mt-1">
                Feed em tempo real com as principais notícias de fontes oficiais (ge, UOL, Lance!, ESPN e federações).
              </p>
            </div>
            {lastUpdated && (
              <span className="text-xs text-slate-400 bg-white border border-gray-200 px-3 py-1.5 rounded-full shadow-xs">
                Atualizado: {new Date(lastUpdated).toLocaleDateString('pt-BR')} às {new Date(lastUpdated).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
          </div>

          {/* Barra de Busca e Filtros */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-xs space-y-4">
            {/* Campo de Busca com limite seguro de caracteres */}
            <div className="relative">
              <input
                type="text"
                maxLength={80}
                placeholder="Buscar notícias por time, jogador ou palavra-chave..."
                value={search}
                onChange={(e) => setSearch(e.target.value.slice(0, 80))}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-3 top-3 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Filtros em linha */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Filtro por Competição */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Competição</label>
                <select
                  value={selectedCompeticao}
                  onChange={(e) => setSelectedCompeticao(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {competicoes.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Filtro por Assunto */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Assunto</label>
                <select
                  value={selectedAssunto}
                  onChange={(e) => setSelectedAssunto(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {assuntos.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>

              {/* Filtro por Clube */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Clube</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {clubes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Publicidade Topo */}
        <div className="mb-8">
          <AdSlot slot="header" />
        </div>

        {/* Lista de Notícias */}
        {filteredNews.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 01-2-2V9a2 2 0 012-2h2a2 2 0 012 2v9a2 2 0 01-2 2h-2z" />
            </svg>
            <p className="text-slate-600 font-medium">Nenhuma notícia encontrada para os filtros selecionados.</p>
            <button
              onClick={() => {
                setSearch('');
                setSelectedCompeticao('Todas');
                setSelectedAssunto('Todos');
                setSelectedTime('Todos');
              }}
              className="mt-4 text-sm text-emerald-700 hover:underline font-semibold"
            >
              Limpar todos os filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item, index) => (
              <div key={item.id} className="contents">
                {/* Bloco de anúncio intercalado a cada 6 notícias */}
                {index > 0 && index % 6 === 0 && (
                  <div className="col-span-full my-2">
                    <AdSlot slot="table" />
                  </div>
                )}

                <article className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    {/* Topo do card: Fonte + Tempo */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${item.sourceBadge.color}`}>
                        {item.sourceBadge.label}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {formatTimeAgo(item.publishedAt)}
                      </span>
                    </div>

                    {/* Tags: Competição e Clube */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-3">
                      {item.time && (
                        <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md">
                          {item.time}
                        </span>
                      )}
                      <span className="text-[11px] font-medium bg-gray-100 text-slate-600 px-2 py-0.5 rounded-md">
                        {item.competicao}
                      </span>
                      {item.assunto !== 'Geral' && (
                        <span className="text-[11px] font-medium bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md">
                          {item.assunto}
                        </span>
                      )}
                    </div>

                    {/* Título da Notícia */}
                    <h2 className="text-base font-bold text-slate-900 leading-snug line-clamp-3 mb-4">
                      {item.title}
                    </h2>
                  </div>

                  {/* Botão de Ação Externo Sanitizado */}
                  <div className="pt-3 border-t border-gray-100 mt-auto">
                    <a
                      href={getSafeUrl(item.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between w-full text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline transition"
                    >
                      <span>Ler no {item.source.name}</span>
                      <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </article>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<NoticiasProps> = async ({ res }) => {
  res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=86400');

  try {
    const dataFilePath = path.join(process.cwd(), 'data', 'noticias.json');
    if (fs.existsSync(dataFilePath)) {
      const raw = fs.readFileSync(dataFilePath, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.items)) {
        return {
          props: {
            initialNews: parsed.items,
            lastUpdated: parsed.lastUpdated || new Date().toISOString(),
          },
        };
      }
    }
  } catch (err) {
    console.error('[Noticias SSR] Erro ao ler noticias.json:', err);
  }

  return {
    props: {
      initialNews: [],
      lastUpdated: new Date().toISOString(),
    },
  };
};

export default Noticias;
