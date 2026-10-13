import https from 'https';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const OUTPUT_FILE = path.join(DATA_DIR, 'noticias.json');

const CLUBES = [
  { nome: 'Flamengo', keywords: ['flamengo', 'mengo', 'rubro-negro'] },
  { nome: 'Palmeiras', keywords: ['palmeiras', 'verdão', 'alviverde'] },
  { nome: 'São Paulo', keywords: ['são paulo', 'tricolor paulista', 'soberano', 'morumbis'] },
  { nome: 'Corinthians', keywords: ['corinthians', 'timão', 'alvinegro paulista', 'neo química'] },
  { nome: 'Santos', keywords: ['santos', 'peixe', 'vila belmiro'] },
  { nome: 'Botafogo', keywords: ['botafogo', 'glorioso', 'alvinegro carioca', 'nilton santos'] },
  { nome: 'Vasco', keywords: ['vasco', 'cruzmaltino', 'gigante da colina', 'são januário'] },
  { nome: 'Fluminense', keywords: ['fluminense', 'tricolor das laranjeiras', 'flu'] },
  { nome: 'Grêmio', keywords: ['grêmio', 'tricolor gaúcho', 'imortal'] },
  { nome: 'Internacional', keywords: ['internacional', 'colorado', 'beira-rio'] },
  { nome: 'Cruzeiro', keywords: ['cruzeiro', 'raposa', 'mineirão'] },
  { nome: 'Atlético-MG', keywords: ['atlético-mg', 'galo', 'alvinegro mineiro', 'arena mrv'] },
  { nome: 'Bahia', keywords: ['bahia', 'tricolor de aço', 'fonte nova'] },
  { nome: 'Fortaleza', keywords: ['fortaleza', 'leão do pici', 'castelão'] },
  { nome: 'Athletico-PR', keywords: ['athletico-pr', 'furacão', 'ligga arena'] },
  { nome: 'Sport', keywords: ['sport', 'leão da ilha', 'ilha do retiro'] },
  { nome: 'Ceará', keywords: ['ceará', 'vozão'] },
  { nome: 'Coritiba', keywords: ['coritiba', 'coxa', 'couto pereira'] },
  { nome: 'Novorizontino', keywords: ['novorizontino', 'tigre do vale'] },
  { nome: 'Mirassol', keywords: ['mirassol', 'leão'] },
  { nome: 'Vila Nova', keywords: ['vila nova', 'tigre'] },
  { nome: 'América-MG', keywords: ['américa-mg', 'coelho', 'independência'] },
  { nome: 'Goiás', keywords: ['goiás', 'esmeraldino', 'serrinha'] },
  { nome: 'Cuiabá', keywords: ['cuiabá', 'dourado', 'arena pantanal'] },
  { nome: 'Criciúma', keywords: ['criciúma', 'tigre', 'heriberto hülse'] },
  { nome: 'Red Bull Bragantino', keywords: ['bragantino', 'massa bruta'] },
  { nome: 'Juventude', keywords: ['juventude', 'papo', 'alfredo jaconi'] },
  { nome: 'Vitória', keywords: ['vitória', 'leão da barra', 'barradão'] },
];

const COMPETICOES = [
  { nome: 'Brasileirão Série B', keywords: ['série b', 'serie b', 'segunda divisão'] },
  { nome: 'Brasileirão Série A', keywords: ['brasileirão', 'brasileirao', 'série a', 'serie a'] },
  { nome: 'Copa do Brasil', keywords: ['copa do brasil'] },
  { nome: 'Libertadores', keywords: ['libertadores', 'conmebol'] },
  { nome: 'Sul-Americana', keywords: ['sul-americana', 'sulamericana'] },
  { nome: 'Seleção Brasileira', keywords: ['seleção', 'selecao', 'cbf', 'dorival'] },
];

const ASSUNTOS = [
  { nome: 'Mercado da Bola', keywords: ['contrat', 'reforço', 'reforco', 'negocia', 'proposta', 'vai e vem', 'anuncia', 'acerta', 'saída', 'compra', 'venda'] },
  { nome: 'Jogos e Resultados', keywords: ['onde assistir', 'escalação', 'escalacao', 'ao vivo', 'placar', 'gols', 'vitória', 'derrota', 'empate', 'rodada', 'confronto', 'melhores momentos'] },
  { nome: 'Bastidores e Arbitragem', keywords: ['árbitro', 'arbitro', 'var', 'stjd', 'pênalti', 'penalti', 'polêmica', 'polemica', 'demissão', 'demissao', 'técnico', 'tecnico', 'crise'] },
];

function fetchFeed(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; FutebolFeed/1.0)' } }, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function parseXmlItems(xml: string) {
  const items: any[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    const rawTitle = (block.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
    const link = (block.match(/<link>([\s\S]*?)<\/link>/) || [])[1] || '';
    const pubDate = (block.match(/<pubDate>([\s\S]*?)<\/pubDate>/) || [])[1] || '';
    const source = (block.match(/<source[^>]*>([\s\S]*?)<\/source>/) || [])[1] || 'Futebol';

    let title = rawTitle.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
    const lastDash = title.lastIndexOf(' - ');
    if (lastDash > 15) {
      title = title.substring(0, lastDash).trim();
    }

    if (title && link) {
      items.push({
        id: Buffer.from(link).toString('base64').substring(0, 16),
        title,
        url: link,
        publishedAt: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
        source: { name: source },
      });
    }
  }
  return items;
}

function classifyNews(item: any) {
  const text = (item.title + ' ' + (item.description || '')).toLowerCase();

  let time: string | null = null;
  for (const c of CLUBES) {
    if (c.keywords.some((kw) => text.includes(kw))) {
      time = c.nome;
      break;
    }
  }

  let competicao = 'Futebol Brasileiro';
  for (const comp of COMPETICOES) {
    if (comp.keywords.some((kw) => text.includes(kw))) {
      competicao = comp.nome;
      break;
    }
  }

  let assunto = 'Geral';
  for (const ass of ASSUNTOS) {
    if (ass.keywords.some((kw) => text.includes(kw))) {
      assunto = ass.nome;
      break;
    }
  }

  const sLower = item.source.name.toLowerCase();
  let sourceBadge = { label: item.source.name, color: 'bg-slate-700 text-white' };
  if (sLower.includes('ge') || sLower.includes('globo')) {
    sourceBadge = { label: 'ge.globo', color: 'bg-emerald-600 text-white' };
  } else if (sLower.includes('uol')) {
    sourceBadge = { label: 'UOL Esporte', color: 'bg-amber-600 text-white' };
  } else if (sLower.includes('lance')) {
    sourceBadge = { label: 'LANCE!', color: 'bg-blue-600 text-white' };
  } else if (sLower.includes('espn')) {
    sourceBadge = { label: 'ESPN', color: 'bg-red-600 text-white' };
  } else if (sLower.includes('cbf') || sLower.includes('federação')) {
    sourceBadge = { label: 'Oficial', color: 'bg-green-700 text-white' };
  }

  return {
    ...item,
    time,
    competicao,
    assunto,
    sourceBadge,
  };
}

export async function syncNoticiasLive() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const urls = [
    'https://news.google.com/rss/search?q=futebol+brasileirao+serie+a&hl=pt-BR&gl=BR&ceid=BR:pt-419',
    'https://news.google.com/rss/search?q=futebol+brasileirao+serie+b&hl=pt-BR&gl=BR&ceid=BR:pt-419',
    'https://news.google.com/rss/search?q=copa+do+brasil+futebol&hl=pt-BR&gl=BR&ceid=BR:pt-419',
  ];

  const allRaw: any[] = [];
  for (const url of urls) {
    try {
      const xml = await fetchFeed(url);
      const parsed = parseXmlItems(xml);
      allRaw.push(...parsed);
    } catch (err: any) {
      console.warn(`[SyncNoticias] Erro no feed ${url}:`, err.message);
    }
  }

  const seenTitles = new Set<string>();
  const uniqueItems: any[] = [];

  for (const item of allRaw) {
    const cleanKey = item.title.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 40);
    if (!seenTitles.has(cleanKey)) {
      seenTitles.add(cleanKey);
      uniqueItems.push(classifyNews(item));
    }
  }

  uniqueItems.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  const finalNews = uniqueItems.slice(0, 60);

  fs.writeFileSync(
    OUTPUT_FILE,
    JSON.stringify(
      {
        lastUpdated: new Date().toISOString(),
        total: finalNews.length,
        items: finalNews,
      },
      null,
      2
    ),
    'utf-8'
  );

  return { total: finalNews.length, lastUpdated: new Date().toISOString() };
}
