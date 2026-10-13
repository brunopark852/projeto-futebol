import cache from 'memory-cache';
import fs from 'fs';
import path from 'path';
import {
  FALLBACK_TABELA,
  FALLBACK_ARTILHEIROS,
  getFallbackPartidas,
  FALLBACK_TABELA_SERIE_B,
  FALLBACK_ARTILHEIROS_SERIE_B,
  getFallbackPartidasSerieB,
} from './data/brasileiraoFallback';

const CACHE_FILE_PATH = path.join('/tmp', 'futebol_cache.json');

export interface CacheData {
  tabela: any[];
  tabela_14: any[];
  artilheiros: any[];
  artilheiros_14: any[];
  partidas: any[];
  partidas_14: any[];
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
        return {
          tabela: parsed.tabela || FALLBACK_TABELA,
          tabela_14: parsed.tabela_14 || FALLBACK_TABELA_SERIE_B,
          artilheiros: parsed.artilheiros || FALLBACK_ARTILHEIROS,
          artilheiros_14: parsed.artilheiros_14 || FALLBACK_ARTILHEIROS_SERIE_B,
          partidas: parsed.partidas || getFallbackPartidas(),
          partidas_14: parsed.partidas_14 || getFallbackPartidasSerieB(),
          aoVivo: parsed.aoVivo || [],
          lastUpdated: parsed.lastUpdated || new Date().toISOString(),
        };
      }
    }
  } catch (err) {
    console.warn('[CacheStore] Não foi possível ler arquivo de cache temporário:', err);
  }

  // Baseline inicial seguro
  return {
    tabela: FALLBACK_TABELA,
    tabela_14: FALLBACK_TABELA_SERIE_B,
    artilheiros: FALLBACK_ARTILHEIROS,
    artilheiros_14: FALLBACK_ARTILHEIROS_SERIE_B,
    partidas: getFallbackPartidas(),
    partidas_14: getFallbackPartidasSerieB(),
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

  cache.put('futebol_full_cache', updated);

  try {
    fs.writeFileSync(CACHE_FILE_PATH, JSON.stringify(updated), 'utf-8');
  } catch (err) {
    console.warn('[CacheStore] Falha ao escrever cache no disco:', err);
  }

  return updated;
}
