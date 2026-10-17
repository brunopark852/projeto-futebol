// Mapeamento oficial dos 40 clubes do Brasileirão (Série A e Série B)
// e fotos dos principais artilheiros

export const ESCUDOS_CLUBES: Record<string, string> = {
  // Série A
  'Botafogo': '/escudos/botafogo.png',
  'Palmeiras': '/escudos/palmeiras.png',
  'Fortaleza': '/escudos/fortaleza.png',
  'Flamengo': '/escudos/flamengo.png',
  'São Paulo': '/escudos/sao-paulo.png',
  'Internacional': '/escudos/internacional.png',
  'Bahia': '/escudos/bahia.png',
  'Cruzeiro': '/escudos/cruzeiro.png',
  'Vasco da Gama': '/escudos/vasco.png',
  'Vasco': '/escudos/vasco.png',
  'Atlético-MG': '/escudos/atletico-mg.png',
  'Grêmio': '/escudos/gremio.png',
  'Criciúma': '/escudos/criciuma.png',
  'Red Bull Bragantino': '/escudos/red-bull-bragantino.png',
  'Bragantino': '/escudos/red-bull-bragantino.png',
  'Juventude': '/escudos/juventude.png',
  'Athletico-PR': '/escudos/athletico-pr.png',
  'Fluminense': '/escudos/fluminense.png',
  'Vitória': '/escudos/vitoria.png',
  'Corinthians': '/escudos/corinthians.png',
  'Cuiabá': '/escudos/cuiaba.png',
  'Atlético-GO': '/escudos/atletico-go.png',
  'Remo': '/escudos/remo.png',

  // Série B
  'Santos': '/escudos/santos.png',
  'Novorizontino': '/escudos/novorizontino.png',
  'Sport': '/escudos/sport.png',
  'Mirassol': '/escudos/mirassol.png',
  'Ceará': '/escudos/ceara.png',
  'Vila Nova': '/escudos/vila-nova.png',
  'América-MG': '/escudos/america-mg.png',
  'Coritiba': '/escudos/coritiba.png',
  'Amazonas': '/escudos/amazonas.png',
  'Operário-PR': '/escudos/operario-pr.png',
  'Goiás': '/escudos/goias.png',
  'Avaí': '/escudos/avai.png',
  'Ponte Preta': '/escudos/ponte-preta.png',
  'Botafogo-SP': '/escudos/botafogo-sp.png',
  'Chapecoense': '/escudos/chapecoense.png',
  'CRB': '/escudos/crb.png',
  'Paysandu': '/escudos/paysandu.png',
  'Ituano': '/escudos/ituano.png',
  'Brusque': '/escudos/brusque.png',
  'Guarani': '/escudos/guarani.png',
};

export const FOTOS_ARTILHEIROS: Record<string, string> = {
  'Pedro': '/artilheiros/pedro.jpg',
  'Estêvão': '/artilheiros/estevao.jpg',
  'Pablo Vegetti': '/artilheiros/vegetti.jpg',
  'Yuri Alberto': '/artilheiros/yuri-alberto.jpg',
  'Hulk': '/artilheiros/hulk.jpg',
  'Luciano': '/artilheiros/luciano.jpg',
  'Lucas Moura': '/artilheiros/lucas-moura.jpg',
  'Guilherme': '/artilheiros/guilherme.jpg',
  'Anselmo Ramon': '/artilheiros/anselmo-ramon.jpg',
};

/**
 * Retorna o caminho do escudo local do clube ou o fallback informado
 */
export function getEscudoClube(nomePopular?: string, fallback = '/escudos/flamengo.png'): string {
  if (!nomePopular) return fallback;
  return ESCUDOS_CLUBES[nomePopular] || fallback;
}

/**
 * Retorna a foto do jogador ou, se não houver foto individual, o escudo do clube
 */
export function getFotoArtilheiro(nomePopular?: string, timeNome?: string): string {
  if (nomePopular && FOTOS_ARTILHEIROS[nomePopular]) {
    return FOTOS_ARTILHEIROS[nomePopular];
  }
  if (timeNome && ESCUDOS_CLUBES[timeNome]) {
    return ESCUDOS_CLUBES[timeNome];
  }
  return '/escudos/flamengo.png';
}
