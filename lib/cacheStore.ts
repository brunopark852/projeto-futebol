import cache from 'memory-cache';
import fs from 'fs';
import path from 'path';
import { Redis } from '@upstash/redis';
import {
  FALLBACK_ARTILHEIROS,
  getFallbackPartidas,
  FALLBACK_TABELA_SERIE_B,
  FALLBACK_ARTILHEIROS_SERIE_B,
  getFallbackPartidasSerieB,
} from './data/brasileiraoFallback';
import { FALLBACK_TABELA_SERIE_A_2026 } from './data/serie-a-2026';

const CACHE_FILE_PATH = path.join('/tmp', 'futebol_cache.json');
const KV_CACHE_KEY = 'futebol:cache:v1';

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
          tabela: parsed.tabela || FALLBACK_TABELA_SERIE_A_2026,
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
    tabela: FALLBACK_TABELA_SERIE_A_2026,
    tabela_14: FALLBACK_TABELA_SERIE_B,
    artilheiros: FALLBACK_ARTILHEIROS,
    artilheiros_14: FALLBACK_ARTILHEIROS_SERIE_B,
    partidas: getFallbackPartidas(),
    partidas_14: getFallbackPartidasSerieB(),
    aoVivo: [],
    lastUpdated: new Date().toISOString(),
  };
}
function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? new Redis({ url, token }) : null;
}

/**
 * Retorna todos os dados atualmente em cache.
 */
export async function getCachedData(): Promise<CacheData> {
  const inMemory = cache.get('futebol_full_cache') as CacheData | null;
  const redis = getRedis();
  if (inMemory && !redis) {
    return inMemory;
  }

  if (redis) {
    try {
      const persisted = await redis.get<CacheData>(KV_CACHE_KEY);
      if (persisted && Array.isArray(persisted.tabela)) {
        cache.put('futebol_full_cache', persisted);
        return persisted;
      }
    } catch (err) {
      console.warn('[CacheStore] Falha ao ler cache persistente; usando fallback local:', err);
    }
  }

  const data = getInitialData();
  cache.put('futebol_full_cache', data);
  return data;
}

/**
 * Salva novos dados no cache persistente e mantém o fallback local.
 */
export async function setCachedData(partial: Partial<CacheData>): Promise<CacheData> {
  const current = await getCachedData();
  const updated: CacheData = {
    ...current,
    ...partial,
    lastUpdated: new Date().toISOString(),
  };

  cache.put('futebol_full_cache', updated);

  const redis = getRedis();
  if (redis) {
    try {
      await redis.set(KV_CACHE_KEY, updated);
    } catch (err) {
      console.warn('[CacheStore] Falha ao escrever cache persistente; mantendo fallback local:', err);
    }
  }

  try {
    fs.writeFileSync(CACHE_FILE_PATH, JSON.stringify(updated), 'utf-8');
  } catch (err) {
    console.warn('[CacheStore] Falha ao escrever cache local:', err);
  }

  return updated;
}
