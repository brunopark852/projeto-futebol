import type { NextApiRequest, NextApiResponse } from 'next';
import { Redis } from '@upstash/redis';

const getRedis = () => {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? new Redis({ url, token }) : null;
};

const keyFor = (id: string) => `futebol:poll:${id}`;
const emptyVotes = { mandante: 0, empate: 0, visitante: 0, total: 0 };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
  if (!id || !/^\d+$/.test(id)) return res.status(400).json({ error: 'ID inválido' });

  const redis = getRedis();
  if (!redis) return res.status(503).json({ error: 'Votação indisponível' });

  try {
    if (req.method === 'GET') {
      const values = await redis.hgetall<Record<string, string | number>>(keyFor(id));
      const votes = {
        mandante: Number(values?.mandante || 0),
        empate: Number(values?.empate || 0),
        visitante: Number(values?.visitante || 0),
        total: Number(values?.total || 0),
      };
      return res.status(200).json(votes);
    }

    if (req.method === 'POST') {
      const choice = req.body?.choice;
      if (!['mandante', 'empate', 'visitante'].includes(choice)) {
        return res.status(400).json({ error: 'Opção de voto inválida' });
      }
      const key = keyFor(id);
      await redis.hincrby(key, choice, 1);
      await redis.hincrby(key, 'total', 1);
      const values = await redis.hgetall<Record<string, string | number>>(key);
      return res.status(200).json({
        mandante: Number(values?.mandante || 0),
        empate: Number(values?.empate || 0),
        visitante: Number(values?.visitante || 0),
        total: Number(values?.total || 0),
      });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Método não permitido' });
  } catch (error) {
    console.error('[Polls] Erro:', error);
    return res.status(500).json(emptyVotes);
  }
}
