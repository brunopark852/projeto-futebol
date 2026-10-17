import { getCachedData } from './cacheStore';
import { getFallbackPartidas, getFallbackPartidasSerieB } from './data/brasileiraoFallback';
import { getEscudoClube, getFotoArtilheiro } from './data/clubesMap';

/**
 * Lê a tabela do cache persistente/memória e garante escudos oficiais de alta resolução
 */
export async function getTabela(campeonatoId = 10) {
  const cache = await getCachedData();
  const rawList = Number(campeonatoId) === 14 ? cache.tabela_14 : cache.tabela;

  return (rawList || []).map((t: any) => ({
    ...t,
    time: {
      ...t.time,
      escudo: getEscudoClube(t.time?.nome_popular, t.time?.escudo),
    },
  }));
}

/**
 * Lê os artilheiros do cache persistente/memória com fotos e escudos reais
 */
export async function getArtilheiros(campeonatoId = 10) {
  const cache = await getCachedData();
  const rawList = Number(campeonatoId) === 14 ? cache.artilheiros_14 : cache.artilheiros;

  return (rawList || []).map((a: any) => ({
    ...a,
    atleta: {
      ...a.atleta,
      foto: getFotoArtilheiro(a.atleta?.nome_popular, a.time?.nome_popular),
    },
    time: {
      ...a.time,
      escudo: getEscudoClube(a.time?.nome_popular, a.time?.escudo),
    },
  }));
}

/**
 * Lê partidas ao vivo ou recentes com escudos enriquecidos
 */
export async function getAoVivo() {
  const cache = await getCachedData();
  const raw = Array.from(
    new Map(
      [...(cache.partidas || []), ...(cache.partidas_14 || []), ...(cache.aoVivo || [])].map((partida: any) => [partida.partida_id, partida]),
    ).values(),
  );

  return (raw || []).map((p: any) => ({
    ...p,
    status: p.status?.toLowerCase() === 'finalizado' ? 'encerrado' : p.status?.toLowerCase() === 'agendado' ? 'nao_iniciado' : p.status,
    // A API/cache pode devolver partidas incompletas. Sempre forneça objetos seguros para a renderização SSR.
    time_mandante: {
      ...p.time_mandante,
      time_id: p.time_mandante?.time_id ?? 0,
      nome_popular: p.time_mandante?.nome_popular ?? 'Time não informado',
      sigla: p.time_mandante?.sigla ?? '—',
      escudo: getEscudoClube(p.time_mandante?.nome_popular, p.time_mandante?.escudo),
    },
    time_visitante: {
      ...p.time_visitante,
      time_id: p.time_visitante?.time_id ?? 0,
      nome_popular: p.time_visitante?.nome_popular ?? 'Time não informado',
      sigla: p.time_visitante?.sigla ?? '—',
      escudo: getEscudoClube(p.time_visitante?.nome_popular, p.time_visitante?.escudo),
    },
    estadio: {
      ...p.estadio,
      estadio_id: p.estadio?.estadio_id ?? 0,
      nome_popular: p.estadio?.nome_popular ?? 'Estádio não informado',
    },
    campeonato: {
      ...p.campeonato,
      campeonato_id: p.campeonato?.campeonato_id ?? 0,
      nome: p.campeonato?.nome ?? 'Campeonato não informado',
      slug: p.campeonato?.slug ?? '',
    },
  }));
}

/**
 * Lê partidas do campeonato com escudos enriquecidos
 */
export async function getPartidas(campeonatoId = 10) {
  const cache = await getCachedData();
  const isSerieB = Number(campeonatoId) === 14;
  const raw = isSerieB ? cache.partidas_14 : cache.partidas;
  const agora = Date.now();
  const temPartidaFutura = (raw || []).some((p: any) => {
    const data = new Date(p.data_realizacao_iso || p.data_hora).getTime();
    return data >= agora && !['finalizado', 'encerrado', 'cancelado'].includes(String(p.status || '').toLowerCase());
  });
  const partidas = temPartidaFutura ? raw : (isSerieB ? getFallbackPartidasSerieB() : getFallbackPartidas());

  return (partidas || []).map((p: any) => ({
    ...p,
    // Evita que uma partida incompleta da API derrube a página inicial durante SSR.
    time_mandante: {
      ...p.time_mandante,
      time_id: p.time_mandante?.time_id ?? 0,
      nome_popular: p.time_mandante?.nome_popular ?? 'Time não informado',
      sigla: p.time_mandante?.sigla ?? '—',
      escudo: getEscudoClube(p.time_mandante?.nome_popular, p.time_mandante?.escudo),
    },
    time_visitante: {
      ...p.time_visitante,
      time_id: p.time_visitante?.time_id ?? 0,
      nome_popular: p.time_visitante?.nome_popular ?? 'Time não informado',
      sigla: p.time_visitante?.sigla ?? '—',
      escudo: getEscudoClube(p.time_visitante?.nome_popular, p.time_visitante?.escudo),
    },
    estadio: {
      ...p.estadio,
      estadio_id: p.estadio?.estadio_id ?? 0,
      nome_popular: p.estadio?.nome_popular ?? 'Estádio não informado',
    },
    campeonato: {
      ...p.campeonato,
      campeonato_id: p.campeonato?.campeonato_id ?? 0,
      nome: p.campeonato?.nome ?? 'Campeonato não informado',
      slug: p.campeonato?.slug ?? '',
    },
  }));
}
