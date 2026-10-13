import axios from 'axios';
import { setCachedData, getCachedData } from './cacheStore';

const BASE_URL = 'https://api.api-futebol.com.br/v1';

function getAuthHeaders() {
  const apiKey = process.env.API_FUTEBOL_KEY;
  if (!apiKey) return null;
  return { Authorization: `Bearer ${apiKey}` };
}

/**
 * Função executada pelo Cron Job para sincronizar a API Futebol
 * Atualiza o cache local sem que visitantes precisem tocar na API.
 */
export async function syncFutebolData() {
  const headers = getAuthHeaders();
  const current = getCachedData();

  if (!headers) {
    console.warn('[SyncService] API_FUTEBOL_KEY não configurada. Mantendo cache existente.');
    return { success: false, reason: 'Chave não configurada' };
  }

  const updates: Partial<typeof current> = {};
  const CAMPEONATO_ID = 10; // Brasileirão Série A

  // 1. Tabela
  try {
    const resp = await axios.get(`${BASE_URL}/campeonatos/${CAMPEONATO_ID}/tabela`, {
      headers,
      timeout: 8000,
    });
    if (Array.isArray(resp.data) && resp.data.length > 0) {
      updates.tabela = resp.data;
    }
  } catch (err: any) {
    console.warn(`[SyncService] Tabela falhou (${err?.response?.status || err?.message}). Mantendo dados anteriores.`);
  }

  // 2. Artilharia
  try {
    const resp = await axios.get(`${BASE_URL}/campeonatos/${CAMPEONATO_ID}/artilharia`, {
      headers,
      timeout: 8000,
    });
    if (Array.isArray(resp.data) && resp.data.length > 0) {
      updates.artilheiros = resp.data;
    }
  } catch (err: any) {
    console.warn(`[SyncService] Artilharia falhou (${err?.response?.status || err?.message}). Mantendo dados anteriores.`);
  }

  // 3. Partidas
  try {
    const resp = await axios.get(`${BASE_URL}/campeonatos/${CAMPEONATO_ID}/partidas`, {
      headers,
      timeout: 8000,
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
        updates.partidas = partidas;
      }
    }
  } catch (err: any) {
    console.warn(`[SyncService] Partidas falhou (${err?.response?.status || err?.message}). Mantendo dados anteriores.`);
  }

  // 4. Ao Vivo
  try {
    const resp = await axios.get(`${BASE_URL}/ao-vivo`, {
      headers,
      timeout: 8000,
    });
    if (Array.isArray(resp.data)) {
      updates.aoVivo = resp.data;
    }
  } catch (err: any) {
    console.warn(`[SyncService] Ao Vivo falhou (${err?.response?.status || err?.message}).`);
  }

  // Grava todas as atualizações no cache se houver novos dados
  const saved = setCachedData(updates);
  return {
    success: true,
    updatedKeys: Object.keys(updates),
    lastUpdated: saved.lastUpdated,
  };
}
