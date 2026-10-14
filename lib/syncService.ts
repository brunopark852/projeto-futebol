import axios from 'axios';
import { setCachedData, CacheData } from './cacheStore';

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

  if (!headers) {
    console.warn('[SyncService] API_FUTEBOL_KEY não configurada. Mantendo cache existente.');
    return { success: false, reason: 'Chave não configurada' };
  }

  const updates: Partial<CacheData> = {};

  // Sincroniza Série A (ID 10) e Série B (ID 14)
  const campeonatos = [
    { id: 10, tabelaKey: 'tabela' as const, artilheirosKey: 'artilheiros' as const, partidasKey: 'partidas' as const },
    { id: 14, tabelaKey: 'tabela_14' as const, artilheirosKey: 'artilheiros_14' as const, partidasKey: 'partidas_14' as const },
  ];

  for (const camp of campeonatos) {
    // 1. Tabela
    try {
      const resp = await axios.get(`${BASE_URL}/campeonatos/${camp.id}/tabela`, {
        headers,
        timeout: 8000,
      });
      if (Array.isArray(resp.data) && resp.data.length > 0) {
        updates[camp.tabelaKey] = resp.data;
      }
    } catch (err: any) {
      console.warn(`[SyncService] Tabela ${camp.id} falhou (${err?.response?.status || err?.message}). Mantendo dados anteriores.`);
    }

    // 2. Artilharia
    try {
      const resp = await axios.get(`${BASE_URL}/campeonatos/${camp.id}/artilharia`, {
        headers,
        timeout: 8000,
      });
      if (Array.isArray(resp.data) && resp.data.length > 0) {
        updates[camp.artilheirosKey] = resp.data;
      }
    } catch (err: any) {
      console.warn(`[SyncService] Artilharia ${camp.id} falhou (${err?.response?.status || err?.message}). Mantendo dados anteriores.`);
    }

    // 3. Partidas
    try {
      const resp = await axios.get(`${BASE_URL}/campeonatos/${camp.id}/partidas`, {
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
          updates[camp.partidasKey] = partidas;
        }
      }
    } catch (err: any) {
      console.warn(`[SyncService] Partidas ${camp.id} falhou (${err?.response?.status || err?.message}). Mantendo dados anteriores.`);
    }
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

  // Grava todas as atualizações no cache
  const saved = await setCachedData(updates);
  return {
    success: true,
    updatedKeys: Object.keys(updates),
    lastUpdated: saved.lastUpdated,
  };
}
