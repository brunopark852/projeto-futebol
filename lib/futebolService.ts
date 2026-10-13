import { getCachedData } from './cacheStore';

/**
 * Lê a tabela do cache persistente/memória (suporta Série A: 10 e Série B: 14)
 */
export async function getTabela(campeonatoId = 10) {
  const cache = getCachedData();
  if (Number(campeonatoId) === 14) {
    return cache.tabela_14 || [];
  }
  return cache.tabela || [];
}

/**
 * Lê os artilheiros do cache persistente/memória (suporta Série A: 10 e Série B: 14)
 */
export async function getArtilheiros(campeonatoId = 10) {
  const cache = getCachedData();
  if (Number(campeonatoId) === 14) {
    return cache.artilheiros_14 || [];
  }
  return cache.artilheiros || [];
}

/**
 * Lê partidas ao vivo ou recentes do cache persistente/memória
 */
export async function getAoVivo() {
  const cache = getCachedData();
  if (Array.isArray(cache.aoVivo) && cache.aoVivo.length > 0) {
    return cache.aoVivo;
  }
  return cache.partidas || [];
}

/**
 * Lê as partidas do campeonato do cache persistente/memória
 */
export async function getPartidas(campeonatoId = 10) {
  const cache = getCachedData();
  if (Number(campeonatoId) === 14) {
    return cache.partidas_14 || [];
  }
  return cache.partidas || [];
}
