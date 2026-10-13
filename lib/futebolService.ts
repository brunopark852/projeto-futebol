import { getCachedData } from './cacheStore';

/**
 * Lê a tabela do cache persistente/memória
 * Nunca faz chamadas síncronas à API externa durante o acesso do usuário.
 */
export async function getTabela(campeonatoId = 10) {
  const cache = getCachedData();
  return cache.tabela;
}

/**
 * Lê os artilheiros do cache persistente/memória
 */
export async function getArtilheiros(campeonatoId = 10) {
  const cache = getCachedData();
  return cache.artilheiros;
}

/**
 * Lê partidas ao vivo ou recentes do cache persistente/memória
 */
export async function getAoVivo() {
  const cache = getCachedData();
  if (Array.isArray(cache.aoVivo) && cache.aoVivo.length > 0) {
    return cache.aoVivo;
  }
  return cache.partidas;
}

/**
 * Lê as partidas do campeonato do cache persistente/memória
 */
export async function getPartidas(campeonatoId = 10) {
  const cache = getCachedData();
  return cache.partidas;
}
