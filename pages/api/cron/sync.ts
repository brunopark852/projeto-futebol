import type { NextApiRequest, NextApiResponse } from 'next';
import { syncFutebolData } from '@/lib/syncService';
import { syncNoticiasLive } from '@/lib/noticiasSync';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.authorization;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
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
