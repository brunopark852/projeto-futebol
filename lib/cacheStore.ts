import cache from 'memory-cache';
import fs from 'fs';
import path from 'path';
import {
  FALLBACK_TABELA,
  FALLBACK_ARTILHEIROS,
  getFallbackPartidas,
} from './data/brasileiraoFallback';

const CACHE_FILE_PATH = path.join('/tmp', 'futebol_cache.json');

interface CacheData {
  tabela: any[];
  artilheiros: any[];
  partidas: any[];
  aoVivo: any[];
  lastUpdated: string;
}

// Inicializa ou recupera dados do cache persistente
function getInitialData(): CacheData {
  try {
    if (fs.existsSync(CACHE_FILE_PATH)) {
      const raw = fs.readFileSync(CACHE_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.tabela)) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('[CacheStore] Não foi possível ler arquivo de cache temporário:', err);
  }

  // Baseline inicial seguro
  return {
    tabela: FALLBACK_TABELA,
    artilheiros: FALLBACK_ARTILHEIROS,
    partidas: getFallbackPartidas(),
    aoVivo: [],
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Retorna todos os dados atualmente em cache
 */
export function getCachedData(): CacheData {
  const inMemory = cache.get('futebol_full_cache');
  if (inMemory) {
    return inMemory;
  }

  const data = getInitialData();
  // Mantém em memória por tempo indefinido (atualizado apenas pelo cron/sync)
  cache.put('futebol_full_cache', data);
  return data;
}

/**
 * Salva novos dados no cache (em memória e em disco)
 */
export function setCachedData(partial: Partial<CacheData>): CacheData {
  const current = getCachedData();
  const updated: CacheData = {
    ...current,
    ...partial,
    lastUpdated: new Date().toISOString(),
  };

  // Salva em memória
  cache.put('futebol_full_cache', updated);

  // Salva em disco em /tmp para sobrevivência entre execuções de lambdas quentes
  try {
    fs.writeFileSync(CACHE_FILE_PATH, JSON.stringify(updated), 'utf-8');
  } catch (err) {
    console.warn('[CacheStore] Falha ao escrever cache no disco:', err);
  }

  return updated;
}
