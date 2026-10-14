import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import axios from 'axios';
import { setCachedData } from '@/lib/cacheStore';

const API_BASE = 'https://api.api-futebol.com.br/v1';

function isAuthorized(authHeader?: string, cronSecret?: string): boolean {
  if (!cronSecret) return true;
  if (!authHeader) return false;

  const expected = `Bearer ${cronSecret}`;
  if (expected.length !== authHeader.length) return false;

  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(authHeader));
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  if (!isAuthorized(req.headers.authorization, process.env.CRON_SECRET)) {
    return res.status(401).json({ error: 'Não autorizado' });
  }

  const apiKey = process.env.API_FUTEBOL_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: 'API_FUTEBOL_KEY não configurada' });
  }

  try {
    const response = await axios.get(`${API_BASE}/ao-vivo`, {
      headers: { Authorization: `Bearer ${apiKey}` },
      timeout: 8000,
    });

    const aoVivo = Array.isArray(response.data) ? response.data : [];
    const saved = await setCachedData({ aoVivo });

    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({
      success: true,
      matches: aoVivo.length,
      lastUpdated: saved.lastUpdated,
    });
  } catch (error: unknown) {
    const err = axios.isAxiosError(error)
      ? error.response?.data?.message || error.message
      : error instanceof Error
        ? error.message
        : 'Erro desconhecido';

    console.error('[Cron Live] Falha ao atualizar jogos ao vivo:', err);
    return res.status(502).json({ error: 'Falha ao atualizar jogos ao vivo' });
  }
}
