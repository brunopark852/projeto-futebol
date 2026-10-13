import type { NextApiRequest, NextApiResponse } from 'next';
import { syncFutebolData } from '@/lib/syncService';
import { syncNoticiasLive } from '@/lib/noticiasSync';
import crypto from 'crypto';

// Prevenção contra Timing Attacks na validação de segredo do cron
function isAuthorized(authHeader?: string, cronSecret?: string): boolean {
  if (!cronSecret) return true; // Se não houver segredo configurado no ambiente, permite execução local
  if (!authHeader) return false;

  const expected = `Bearer ${cronSecret}`;
  const actual = authHeader;

  if (expected.length !== actual.length) {
    return false;
  }

  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(actual));
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.authorization;

  if (!isAuthorized(authHeader, cronSecret)) {
    return res.status(401).json({ error: 'Não autorizado' });
  }

  try {
    const [futebolResult, noticiasResult] = await Promise.allSettled([
      syncFutebolData(),
      syncNoticiasLive(),
    ]);

    return res.status(200).json({
      message: 'Sincronização agendada concluída com sucesso',
      futebol: futebolResult.status === 'fulfilled' ? futebolResult.value : { error: (futebolResult as any).reason?.message },
      noticias: noticiasResult.status === 'fulfilled' ? noticiasResult.value : { error: (noticiasResult as any).reason?.message },
    });
  } catch (error: any) {
    console.error('[Cron Sync] Erro na sincronização:', error);
    return res.status(500).json({
      error: 'Erro interno durante sincronização',
      details: error.message,
    });
  }
}
