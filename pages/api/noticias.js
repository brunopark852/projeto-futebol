import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  // Prevenção de DoS e Parameter Pollution: validação estrita de tipos
  const { limit, time, competicao } = req.query;

  // Sanitização de limit (máximo 50 itens)
  let parsedLimit = 20;
  if (limit) {
    const num = parseInt(Array.isArray(limit) ? limit[0] : limit, 10);
    if (!isNaN(num) && num > 0) {
      parsedLimit = Math.min(num, 50);
    }
  }

  // Sanitização de filtros textuais (apenas caracteres seguros)
  const sanitizeFilter = (val) => {
    if (!val) return null;
    const str = Array.isArray(val) ? val[0] : String(val);
    return str.slice(0, 50).replace(/[^\w\sÀ-ÿ-]/gi, '').trim();
  };

  const safeTime = sanitizeFilter(time);
  const safeCompeticao = sanitizeFilter(competicao);

  try {
    const dataFilePath = path.join(process.cwd(), 'data', 'noticias.json');
    if (!fs.existsSync(dataFilePath)) {
      return res.status(200).json({ total: 0, items: [] });
    }

    const raw = fs.readFileSync(dataFilePath, 'utf-8');
    const parsed = JSON.parse(raw);
    let items = Array.isArray(parsed.items) ? parsed.items : [];

    if (safeTime) {
      const q = safeTime.toLowerCase();
      items = items.filter((n) => n.time && n.time.toLowerCase().includes(q));
    }

    if (safeCompeticao) {
      const q = safeCompeticao.toLowerCase();
      items = items.filter((n) => n.competicao && n.competicao.toLowerCase().includes(q));
    }

    const results = items.slice(0, parsedLimit);

    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=86400');
    return res.status(200).json({
      total: results.length,
      lastUpdated: parsed.lastUpdated,
      items: results,
    });
  } catch (error) {
    console.error('[API Noticias] Erro ao servir notícias:', error.message);
    return res.status(500).json({ error: 'Erro ao carregar notícias' });
  }
}
