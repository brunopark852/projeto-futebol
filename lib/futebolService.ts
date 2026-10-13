import { getCachedData } from './cacheStore';
import { getEscudoClube, getFotoArtilheiro } from './data/clubesMap';

/**
 * Lê a tabela do cache persistente/memória e garante escudos oficiais de alta resolução
 */
export async function getTabela(campeonatoId = 10) {
  const cache = getCachedData();
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
  const cache = getCachedData();
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
  const cache = getCachedData();
  const raw = Array.isArray(cache.aoVivo) && cache.aoVivo.length > 0 ? cache.aoVivo : cache.partidas;

  return (raw || []).map((p: any) => ({
    ...p,
    time_mandante: {
      ...p.time_mandante,
      escudo: getEscudoClube(p.time_mandante?.nome_popular, p.time_mandante?.escudo),
    },
    time_visitante: {
      ...p.time_visitante,
      escudo: getEscudoClube(p.time_visitante?.nome_popular, p.time_visitante?.escudo),
    },
  }));
}

/**
 * Lê partidas do campeonato com escudos enriquecidos
 */
export async function getPartidas(campeonatoId = 10) {
  const cache = getCachedData();
  const raw = Number(campeonatoId) === 14 ? cache.partidas_14 : cache.partidas;

  return (raw || []).map((p: any) => ({
    ...p,
    time_mandante: {
      ...p.time_mandante,
      escudo: getEscudoClube(p.time_mandante?.nome_popular, p.time_mandante?.escudo),
    },
    time_visitante: {
      ...p.time_visitante,
      escudo: getEscudoClube(p.time_visitante?.nome_popular, p.time_visitante?.escudo),
    },
  }));
}
