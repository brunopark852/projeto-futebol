import cache from 'memory-cache';
import axios from 'axios';
import {
  FALLBACK_TABELA,
  FALLBACK_ARTILHEIROS,
  getFallbackPartidas,
} from './data/brasileiraoFallback';

const CACHE_TTL_TABELA = 60 * 60 * 1000; // 1 hora
const CACHE_TTL_ARTILHEIROS = 60 * 60 * 1000; // 1 hora
const CACHE_TTL_PARTIDAS = 30 * 60 * 1000; // 30 minutos
const CACHE_TTL_AO_VIVO = 5 * 60 * 1000; // 5 minutos

const BASE_URL = 'https://api.api-futebol.com.br/v1';

function getAuthHeaders() {
  const apiKey = process.env.API_FUTEBOL_KEY;
  if (!apiKey) return null;
  return { Authorization: `Bearer ${apiKey}` };
}

/**
 * Busca a tabela de classificação com cache em memória e fallback seguro
 */
export async function getTabela(campeonatoId = 10) {
  const cacheKey = `tabela_${campeonatoId}`;
  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const headers = getAuthHeaders();
  if (headers) {
    try {
      const resp = await axios.get(`${BASE_URL}/campeonatos/${campeonatoId}/tabela`, {
        headers,
        timeout: 6000,
      });
      if (Array.isArray(resp.data) && resp.data.length > 0) {
        cache.put(cacheKey, resp.data, CACHE_TTL_TABELA);
        return resp.data;
      }
    } catch (err: any) {
      console.warn(`[getTabela] API externa falhou (${err?.response?.status || err?.message}). Usando fallback com cache.`);
    }
  }

  // Fallback seguro: armazena no cache por 1 hora para evitar novas requisições
  cache.put(cacheKey, FALLBACK_TABELA, CACHE_TTL_TABELA);
  return FALLBACK_TABELA;
}

/**
 * Busca artilheiros com cache em memória e fallback seguro
 */
export async function getArtilheiros(campeonatoId = 10) {
  const cacheKey = `artilheiros_${campeonatoId}`;
  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const headers = getAuthHeaders();
  if (headers) {
    try {
      const resp = await axios.get(`${BASE_URL}/campeonatos/${campeonatoId}/artilharia`, {
        headers,
        timeout: 6000,
      });
      if (Array.isArray(resp.data) && resp.data.length > 0) {
        cache.put(cacheKey, resp.data, CACHE_TTL_ARTILHEIROS);
        return resp.data;
      }
    } catch (err: any) {
      console.warn(`[getArtilheiros] API externa falhou (${err?.response?.status || err?.message}). Usando fallback com cache.`);
    }
  }

  cache.put(cacheKey, FALLBACK_ARTILHEIROS, CACHE_TTL_ARTILHEIROS);
  return FALLBACK_ARTILHEIROS;
}

/**
 * Busca jogos ao vivo ou próximos com cache em memória e fallback seguro
 */
export async function getAoVivo() {
  const cacheKey = 'ao_vivo';
  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const headers = getAuthHeaders();
  if (headers) {
    try {
      const resp = await axios.get(`${BASE_URL}/ao-vivo`, {
        headers,
        timeout: 6000,
      });
      if (Array.isArray(resp.data)) {
        cache.put(cacheKey, resp.data, CACHE_TTL_AO_VIVO);
        return resp.data;
      }
    } catch (err: any) {
      console.warn(`[getAoVivo] API externa falhou (${err?.response?.status || err?.message}).`);
    }
  }

  const fallback = getFallbackPartidas();
  cache.put(cacheKey, fallback, CACHE_TTL_AO_VIVO);
  return fallback;
}

/**
 * Busca partidas do campeonato com cache
 */
export async function getPartidas(campeonatoId = 10) {
  const cacheKey = `partidas_${campeonatoId}`;
  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const headers = getAuthHeaders();
  if (headers) {
    try {
      const resp = await axios.get(`${BASE_URL}/campeonatos/${campeonatoId}/partidas`, {
        headers,
        timeout: 6000,
      });
      const partidasData = resp.data?.partidas;
      if (partidasData) {
        const partidas: any[] = [];
        Object.values(partidasData).forEach((fase: any) => {
          Object.values(fase).forEach((rodada: unknown) => {
            if (Array.isArray(rodada)) {
              partidas.push(...rodada);
            }
          });
        });
        if (partidas.length > 0) {
          cache.put(cacheKey, partidas, CACHE_TTL_PARTIDAS);
          return partidas;
        }
      }
    } catch (err: any) {
      console.warn(`[getPartidas] API externa falhou (${err?.response?.status || err?.message}). Usando fallback.`);
    }
  }

  const fallback = getFallbackPartidas();
  cache.put(cacheKey, fallback, CACHE_TTL_PARTIDAS);
  return fallback;
}
