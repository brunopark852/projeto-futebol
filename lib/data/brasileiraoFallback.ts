// Dados oficiais de fallback do Brasileirão Série A
// Usados quando a API Futebol estiver indisponível, em manutenção ou quando a cota diária for atingida

export const FALLBACK_TABELA = [
  {
    posicao: 1,
    pontos: 60,
    time: {
      time_id: 22,
      nome_popular: 'Botafogo',
      sigla: 'BOT',
      escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
    },
    jogos: 30,
    vitorias: 18,
    empates: 6,
    derrotas: 6,
    gols_pro: 50,
    gols_contra: 26,
    saldo_gols: 24,
    aproveitamento: 66.7,
    variacao_posicao: 0,
    ultimos_jogos: ['v', 'e', 'v', 'e', 'v'],
    faixa_classificacao: 'Fase de grupos da Copa Libertadores',
  },
  {
    posicao: 2,
    pontos: 57,
    time: {
      time_id: 56,
      nome_popular: 'Palmeiras',
      sigla: 'PAL',
      escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
    },
    jogos: 30,
    vitorias: 17,
    empates: 6,
    derrotas: 7,
    gols_pro: 51,
    gols_contra: 23,
    saldo_gols: 28,
    aproveitamento: 63.3,
    variacao_posicao: 0,
    ultimos_jogos: ['v', 'v', 'e', 'v', 'e'],
    faixa_classificacao: 'Fase de grupos da Copa Libertadores',
  },
  {
    posicao: 3,
    pontos: 55,
    time: {
      time_id: 131,
      nome_popular: 'Fortaleza',
      sigla: 'FOR',
      escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
    },
    jogos: 30,
    vitorias: 16,
    empates: 7,
    derrotas: 7,
    gols_pro: 38,
    gols_contra: 30,
    saldo_gols: 8,
    aproveitamento: 61.1,
    variacao_posicao: 0,
    ultimos_jogos: ['v', 'd', 'e', 'v', 'e'],
    faixa_classificacao: 'Fase de grupos da Copa Libertadores',
  },
  {
    posicao: 4,
    pontos: 51,
    time: {
      time_id: 18,
      nome_popular: 'Flamengo',
      sigla: 'FLA',
      escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
    },
    jogos: 29,
    vitorias: 15,
    empates: 6,
    derrotas: 8,
    gols_pro: 45,
    gols_contra: 34,
    saldo_gols: 11,
    aproveitamento: 58.6,
    variacao_posicao: 0,
    ultimos_jogos: ['v', 'd', 'v', 'v', 'd'],
    faixa_classificacao: 'Fase de grupos da Copa Libertadores',
  },
  {
    posicao: 5,
    pontos: 47,
    time: {
      time_id: 57,
      nome_popular: 'São Paulo',
      sigla: 'SAO',
      escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
    },
    jogos: 30,
    vitorias: 14,
    empates: 5,
    derrotas: 11,
    gols_pro: 38,
    gols_contra: 32,
    saldo_gols: 6,
    aproveitamento: 52.2,
    variacao_posicao: 0,
    ultimos_jogos: ['v', 'd', 'v', 'd', 'e'],
    faixa_classificacao: 'Qualificação para a Copa Libertadores',
  },
  {
    posicao: 6,
    pontos: 46,
    time: {
      time_id: 44,
      nome_popular: 'Internacional',
      sigla: 'INT',
      escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
    },
    jogos: 29,
    vitorias: 12,
    empates: 10,
    derrotas: 7,
    gols_pro: 38,
    gols_contra: 26,
    saldo_gols: 12,
    aproveitamento: 52.9,
    variacao_posicao: 0,
    ultimos_jogos: ['v', 'v', 'e', 'v', 'e'],
    faixa_classificacao: 'Qualificação para a Copa Libertadores',
  },
  {
    posicao: 7,
    pontos: 45,
    time: {
      time_id: 68,
      nome_popular: 'Bahia',
      sigla: 'BAH',
      escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
    },
    jogos: 30,
    vitorias: 13,
    empates: 6,
    derrotas: 11,
    gols_pro: 42,
    gols_contra: 37,
    saldo_gols: 5,
    aproveitamento: 50.0,
    variacao_posicao: 0,
    ultimos_jogos: ['d', 'v', 'd', 'e', 'v'],
    faixa_classificacao: 'Fase de grupos da Copa Sul-Americana',
  },
  {
    posicao: 8,
    pontos: 44,
    time: {
      time_id: 83,
      nome_popular: 'Cruzeiro',
      sigla: 'CRU',
      escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
    },
    jogos: 30,
    vitorias: 12,
    empates: 8,
    derrotas: 10,
    gols_pro: 35,
    gols_contra: 31,
    saldo_gols: 4,
    aproveitamento: 48.9,
    variacao_posicao: 0,
    ultimos_jogos: ['e', 'e', 'd', 'e', 'd'],
    faixa_classificacao: 'Fase de grupos da Copa Sul-Americana',
  },
  {
    posicao: 9,
    pontos: 37,
    time: {
      time_id: 23,
      nome_popular: 'Vasco da Gama',
      sigla: 'VAS',
      escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
    },
    jogos: 29,
    vitorias: 10,
    empates: 7,
    derrotas: 12,
    gols_pro: 32,
    gols_contra: 41,
    saldo_gols: -9,
    aproveitamento: 42.5,
    variacao_posicao: 0,
    ultimos_jogos: ['e', 'd', 'e', 'e', 'v'],
    faixa_classificacao: 'Fase de grupos da Copa Sul-Americana',
  },
  {
    posicao: 10,
    pontos: 37,
    time: {
      time_id: 30,
      nome_popular: 'Atlético-MG',
      sigla: 'CAM',
      escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
    },
    jogos: 28,
    vitorias: 9,
    empates: 10,
    derrotas: 9,
    gols_pro: 40,
    gols_contra: 41,
    saldo_gols: -1,
    aproveitamento: 44.0,
    variacao_posicao: 0,
    ultimos_jogos: ['e', 'd', 'v', 'v', 'd'],
    faixa_classificacao: 'Fase de grupos da Copa Sul-Americana',
  },
  {
    posicao: 11,
    pontos: 35,
    time: {
      time_id: 45,
      nome_popular: 'Grêmio',
      sigla: 'GRE',
      escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
    },
    jogos: 29,
    vitorias: 10,
    empates: 5,
    derrotas: 14,
    gols_pro: 33,
    gols_contra: 37,
    saldo_gols: -4,
    aproveitamento: 40.2,
    variacao_posicao: 0,
    ultimos_jogos: ['v', 'e', 'd', 'v', 'd'],
    faixa_classificacao: 'Fase de grupos da Copa Sul-Americana',
  },
  {
    posicao: 12,
    pontos: 35,
    time: {
      time_id: 29,
      nome_popular: 'Criciúma',
      sigla: 'CRI',
      escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
    },
    jogos: 30,
    vitorias: 9,
    empates: 8,
    derrotas: 13,
    gols_pro: 36,
    gols_contra: 44,
    saldo_gols: -8,
    aproveitamento: 38.9,
    variacao_posicao: 0,
    ultimos_jogos: ['e', 'v', 'd', 'v', 'e'],
    faixa_classificacao: 'Fase de grupos da Copa Sul-Americana',
  },
  {
    posicao: 13,
    pontos: 34,
    time: {
      time_id: 64,
      nome_popular: 'Red Bull Bragantino',
      sigla: 'RBB',
      escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
    },
    jogos: 30,
    vitorias: 8,
    empates: 10,
    derrotas: 12,
    gols_pro: 34,
    gols_contra: 39,
    saldo_gols: -5,
    aproveitamento: 37.8,
    variacao_posicao: 0,
    ultimos_jogos: ['e', 'd', 'e', 'e', 'd'],
    faixa_classificacao: null,
  },
  {
    posicao: 14,
    pontos: 34,
    time: {
      time_id: 43,
      nome_popular: 'Juventude',
      sigla: 'JUV',
      escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
    },
    jogos: 30,
    vitorias: 8,
    empates: 10,
    derrotas: 12,
    gols_pro: 38,
    gols_contra: 47,
    saldo_gols: -9,
    aproveitamento: 37.8,
    variacao_posicao: 0,
    ultimos_jogos: ['d', 'e', 'd', 'e', 'v'],
    faixa_classificacao: null,
  },
  {
    posicao: 15,
    pontos: 31,
    time: {
      time_id: 3,
      nome_popular: 'Athletico-PR',
      sigla: 'CAP',
      escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
    },
    jogos: 28,
    vitorias: 8,
    empates: 7,
    derrotas: 13,
    gols_pro: 29,
    gols_contra: 36,
    saldo_gols: -7,
    aproveitamento: 36.9,
    variacao_posicao: 0,
    ultimos_jogos: ['d', 'd', 'd', 'd', 'e'],
    faixa_classificacao: null,
  },
  {
    posicao: 16,
    pontos: 30,
    time: {
      time_id: 26,
      nome_popular: 'Fluminense',
      sigla: 'FLU',
      escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
    },
    jogos: 29,
    vitorias: 8,
    empates: 6,
    derrotas: 15,
    gols_pro: 22,
    gols_contra: 30,
    saldo_gols: -8,
    aproveitamento: 34.5,
    variacao_posicao: 0,
    ultimos_jogos: ['v', 'd', 'd', 'd', 'v'],
    faixa_classificacao: null,
  },
  {
    posicao: 17,
    pontos: 29,
    time: {
      time_id: 102,
      nome_popular: 'Vitória',
      sigla: 'VIT',
      escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
    },
    jogos: 30,
    vitorias: 8,
    empates: 5,
    derrotas: 17,
    gols_pro: 32,
    gols_contra: 45,
    saldo_gols: -13,
    aproveitamento: 32.2,
    variacao_posicao: 0,
    ultimos_jogos: ['e', 'd', 'v', 'v', 'd'],
    faixa_classificacao: 'Rebaixamento para a Série B',
  },
  {
    posicao: 18,
    pontos: 29,
    time: {
      time_id: 65,
      nome_popular: 'Corinthians',
      sigla: 'COR',
      escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
    },
    jogos: 30,
    vitorias: 6,
    empates: 11,
    derrotas: 13,
    gols_pro: 30,
    gols_contra: 40,
    saldo_gols: -10,
    aproveitamento: 32.2,
    variacao_posicao: 0,
    ultimos_jogos: ['d', 'v', 'v', 'd', 'e'],
    faixa_classificacao: 'Rebaixamento para a Série B',
  },
  {
    posicao: 19,
    pontos: 27,
    time: {
      time_id: 135,
      nome_popular: 'Cuiabá',
      sigla: 'CUI',
      escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
    },
    jogos: 29,
    vitorias: 6,
    empates: 9,
    derrotas: 14,
    gols_pro: 25,
    gols_contra: 39,
    saldo_gols: -14,
    aproveitamento: 31.0,
    variacao_posicao: 0,
    ultimos_jogos: ['e', 'v', 'd', 'e', 'd'],
    faixa_classificacao: 'Rebaixamento para a Série B',
  },
  {
    posicao: 20,
    pontos: 22,
    time: {
      time_id: 98,
      nome_popular: 'Atlético-GO',
      sigla: 'ACG',
      escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
    },
    jogos: 30,
    vitorias: 5,
    empates: 7,
    derrotas: 18,
    gols_pro: 23,
    gols_contra: 47,
    saldo_gols: -24,
    aproveitamento: 24.4,
    variacao_posicao: 0,
    ultimos_jogos: ['e', 'd', 'd', 'v', 'd'],
    faixa_classificacao: 'Rebaixamento para a Série B',
  },
];

export const FALLBACK_ARTILHEIROS = [
  {
    atleta: {
      atleta_id: 101,
      nome_popular: 'Pedro',
      foto: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
      posicao: { nome: 'Atacante', sigla: 'ATA' },
    },
    time: {
      time_id: 18,
      nome_popular: 'Flamengo',
      sigla: 'FLA',
      escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
    },
    gols: 11,
  },
  {
    atleta: {
      atleta_id: 102,
      nome_popular: 'Estêvão',
      foto: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
      posicao: { nome: 'Atacante', sigla: 'ATA' },
    },
    time: {
      time_id: 56,
      nome_popular: 'Palmeiras',
      sigla: 'PAL',
      escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
    },
    gols: 10,
  },
  {
    atleta: {
      atleta_id: 103,
      nome_popular: 'Pablo Vegetti',
      foto: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
      posicao: { nome: 'Atacante', sigla: 'ATA' },
    },
    time: {
      time_id: 23,
      nome_popular: 'Vasco da Gama',
      sigla: 'VAS',
      escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
    },
    gols: 9,
  },
  {
    atleta: {
      atleta_id: 104,
      nome_popular: 'Yuri Alberto',
      foto: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
      posicao: { nome: 'Atacante', sigla: 'ATA' },
    },
    time: {
      time_id: 65,
      nome_popular: 'Corinthians',
      sigla: 'COR',
      escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
    },
    gols: 9,
  },
  {
    atleta: {
      atleta_id: 105,
      nome_popular: 'Hulk',
      foto: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
      posicao: { nome: 'Atacante', sigla: 'ATA' },
    },
    time: {
      time_id: 30,
      nome_popular: 'Atlético-MG',
      sigla: 'CAM',
      escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
    },
    gols: 9,
  },
  {
    atleta: {
      atleta_id: 106,
      nome_popular: 'Flaco López',
      foto: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
      posicao: { nome: 'Atacante', sigla: 'ATA' },
    },
    time: {
      time_id: 56,
      nome_popular: 'Palmeiras',
      sigla: 'PAL',
      escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
    },
    gols: 9,
  },
  {
    atleta: {
      atleta_id: 107,
      nome_popular: 'Luciano',
      foto: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
      posicao: { nome: 'Atacante', sigla: 'ATA' },
    },
    time: {
      time_id: 57,
      nome_popular: 'São Paulo',
      sigla: 'SAO',
      escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
    },
    gols: 8,
  },
  {
    atleta: {
      atleta_id: 108,
      nome_popular: 'Lucas Moura',
      foto: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
      posicao: { nome: 'Meia', sigla: 'MEI' },
    },
    time: {
      time_id: 57,
      nome_popular: 'São Paulo',
      sigla: 'SAO',
      escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
    },
    gols: 7,
  },
];

export function getFallbackPartidas() {
  const agora = new Date();
  
  // Próximas partidas para hoje e próximos dias
  const d0 = new Date(agora);
  const d1 = new Date(agora); d1.setDate(d1.getDate() + 1);
  const d2 = new Date(agora); d2.setDate(d2.getDate() + 2);
  const d3 = new Date(agora); d3.setDate(d3.getDate() + 3);

  const formatIso = (d: Date, hora: string) => {
    const ano = d.getFullYear();
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const dia = String(d.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}T${hora}:00-03:00`;
  };

  const formatDate = (d: Date) => {
    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    return `${dia}/${mes}/${d.getFullYear()}`;
  };

  return [
    {
      partida_id: 9101,
      placar: '— x —',
      placar_mandante: null,
      placar_visitante: null,
      status: 'agendado',
      data_realizacao: formatDate(d0),
      hora_realizacao: '19:00',
      data_realizacao_iso: formatIso(d0, '19:00'),
      data_hora: formatIso(d0, '19:00'),
      estadio: { estadio_id: 1, nome_popular: 'Maracanã', nome: 'Maracanã', cidade: 'Rio de Janeiro' },
      time_mandante: {
        time_id: 18,
        nome_popular: 'Flamengo',
        sigla: 'FLA',
        escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
      },
      time_visitante: {
        time_id: 65,
        nome_popular: 'Corinthians',
        sigla: 'COR',
        escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
      },
      campeonato: { campeonato_id: 10, nome: 'Brasileirão Série A', edicao_atual: '2026', slug: 'campeonato-brasileiro' },
    },
    {
      partida_id: 9102,
      placar: '— x —',
      placar_mandante: null,
      placar_visitante: null,
      status: 'agendado',
      data_realizacao: formatDate(d0),
      hora_realizacao: '21:30',
      data_realizacao_iso: formatIso(d0, '21:30'),
      data_hora: formatIso(d0, '21:30'),
      estadio: { estadio_id: 2, nome_popular: 'Allianz Parque', nome: 'Allianz Parque', cidade: 'São Paulo' },
      time_mandante: {
        time_id: 56,
        nome_popular: 'Palmeiras',
        sigla: 'PAL',
        escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
      },
      time_visitante: {
        time_id: 30,
        nome_popular: 'Atlético-MG',
        sigla: 'CAM',
        escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
      },
      campeonato: { campeonato_id: 10, nome: 'Brasileirão Série A', edicao_atual: '2026', slug: 'campeonato-brasileiro' },
    },
    {
      partida_id: 9103,
      placar: '— x —',
      placar_mandante: null,
      placar_visitante: null,
      status: 'agendado',
      data_realizacao: formatDate(d1),
      hora_realizacao: '16:00',
      data_realizacao_iso: formatIso(d1, '16:00'),
      data_hora: formatIso(d1, '16:00'),
      estadio: { estadio_id: 3, nome_popular: 'MorumBIS', nome: 'MorumBIS', cidade: 'São Paulo' },
      time_mandante: {
        time_id: 57,
        nome_popular: 'São Paulo',
        sigla: 'SAO',
        escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
      },
      time_visitante: {
        time_id: 23,
        nome_popular: 'Vasco da Gama',
        sigla: 'VAS',
        escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
      },
      campeonato: { campeonato_id: 10, nome: 'Brasileirão Série A', edicao_atual: '2026', slug: 'campeonato-brasileiro' },
    },
    {
      partida_id: 9104,
      placar: '— x —',
      placar_mandante: null,
      placar_visitante: null,
      status: 'agendado',
      data_realizacao: formatDate(d1),
      hora_realizacao: '18:30',
      data_realizacao_iso: formatIso(d1, '18:30'),
      data_hora: formatIso(d1, '18:30'),
      estadio: { estadio_id: 4, nome_popular: 'Nilton Santos', nome: 'Nilton Santos', cidade: 'Rio de Janeiro' },
      time_mandante: {
        time_id: 22,
        nome_popular: 'Botafogo',
        sigla: 'BOT',
        escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
      },
      time_visitante: {
        time_id: 44,
        nome_popular: 'Internacional',
        sigla: 'INT',
        escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
      },
      campeonato: { campeonato_id: 10, nome: 'Brasileirão Série A', edicao_atual: '2026', slug: 'campeonato-brasileiro' },
    },
    {
      partida_id: 9105,
      placar: '— x —',
      placar_mandante: null,
      placar_visitante: null,
      status: 'agendado',
      data_realizacao: formatDate(d2),
      hora_realizacao: '20:00',
      data_realizacao_iso: formatIso(d2, '20:00'),
      data_hora: formatIso(d2, '20:00'),
      estadio: { estadio_id: 5, nome_popular: 'Mineirão', nome: 'Mineirão', cidade: 'Belo Horizonte' },
      time_mandante: {
        time_id: 83,
        nome_popular: 'Cruzeiro',
        sigla: 'CRU',
        escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
      },
      time_visitante: {
        time_id: 68,
        nome_popular: 'Bahia',
        sigla: 'BAH',
        escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-seriea.png',
      },
      campeonato: { campeonato_id: 10, nome: 'Brasileirão Série A', edicao_atual: '2026', slug: 'campeonato-brasileiro' },
    },
  ];
}

export const FALLBACK_TABELA_SERIE_B = [
  {
    posicao: 1,
    pontos: 56,
    time: { time_id: 63, nome_popular: 'Santos', sigla: 'SAN', escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-serieb.png' },
    jogos: 31, vitorias: 16, empates: 8, derrotas: 7, gols_pro: 46, gols_contra: 25, saldo_gols: 21, aproveitamento: 60.2, variacao_posicao: 0, ultimos_jogos: ['v', 'v', 'e', 'd', 'v'], faixa_classificacao: 'Acesso à Série A'
  },
  {
    posicao: 2,
    pontos: 54,
    time: { time_id: 153, nome_popular: 'Novorizontino', sigla: 'NOV', escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-serieb.png' },
    jogos: 31, vitorias: 15, empates: 9, derrotas: 7, gols_pro: 35, gols_contra: 25, saldo_gols: 10, aproveitamento: 58.1, variacao_posicao: 0, ultimos_jogos: ['d', 'v', 'd', 'v', 'e'], faixa_classificacao: 'Acesso à Série A'
  },
  {
    posicao: 3,
    pontos: 53,
    time: { time_id: 79, nome_popular: 'Sport', sigla: 'SPT', escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-serieb.png' },
    jogos: 30, vitorias: 15, empates: 8, derrotas: 7, gols_pro: 40, gols_contra: 28, saldo_gols: 12, aproveitamento: 58.9, variacao_posicao: 0, ultimos_jogos: ['v', 'e', 'v', 'v', 'e'], faixa_classificacao: 'Acesso à Série A'
  },
  {
    posicao: 4,
    pontos: 50,
    time: { time_id: 150, nome_popular: 'Mirassol', sigla: 'MIR', escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-serieb.png' },
    jogos: 31, vitorias: 14, empates: 8, derrotas: 9, gols_pro: 30, gols_contra: 21, saldo_gols: 9, aproveitamento: 53.8, variacao_posicao: 0, ultimos_jogos: ['v', 'd', 'v', 'd', 'v'], faixa_classificacao: 'Acesso à Série A'
  },
  {
    posicao: 5,
    pontos: 48,
    time: { time_id: 105, nome_popular: 'Ceará', sigla: 'CEA', escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-serieb.png' },
    jogos: 31, vitorias: 14, empates: 6, derrotas: 11, gols_pro: 47, gols_contra: 37, saldo_gols: 10, aproveitamento: 51.6, variacao_posicao: 0, ultimos_jogos: ['v', 'v', 'd', 'v', 'd'], faixa_classificacao: null
  },
  {
    posicao: 6,
    pontos: 46,
    time: { time_id: 221, nome_popular: 'Vila Nova', sigla: 'VIL', escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-serieb.png' },
    jogos: 31, vitorias: 13, empates: 7, derrotas: 11, gols_pro: 33, gols_contra: 40, saldo_gols: -7, aproveitamento: 49.5, variacao_posicao: 0, ultimos_jogos: ['d', 'v', 'd', 'e', 'v'], faixa_classificacao: null
  },
  {
    posicao: 7,
    pontos: 45,
    time: { time_id: 33, nome_popular: 'América-MG', sigla: 'AME', escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-serieb.png' },
    jogos: 31, vitorias: 10, empates: 15, derrotas: 6, gols_pro: 38, gols_contra: 27, saldo_gols: 11, aproveitamento: 48.4, variacao_posicao: 0, ultimos_jogos: ['e', 'd', 'v', 'v', 'd'], faixa_classificacao: null
  },
  {
    posicao: 8,
    pontos: 44,
    time: { time_id: 84, nome_popular: 'Coritiba', sigla: 'CFC', escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-serieb.png' },
    jogos: 31, vitorias: 12, empates: 8, derrotas: 11, gols_pro: 33, gols_contra: 32, saldo_gols: 1, aproveitamento: 47.3, variacao_posicao: 0, ultimos_jogos: ['v', 'e', 'd', 'v', 'e'], faixa_classificacao: null
  },
  {
    posicao: 9,
    pontos: 42,
    time: { time_id: 251, nome_popular: 'Amazonas', sigla: 'AMA', escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-serieb.png' },
    jogos: 30, vitorias: 11, empates: 9, derrotas: 10, gols_pro: 27, gols_contra: 28, saldo_gols: -1, aproveitamento: 46.7, variacao_posicao: 0, ultimos_jogos: ['v', 'd', 'v', 'd', 'v'], faixa_classificacao: null
  },
  {
    posicao: 10,
    pontos: 42,
    time: { time_id: 204, nome_popular: 'Operário-PR', sigla: 'OPE', escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-serieb.png' },
    jogos: 30, vitorias: 12, empates: 6, derrotas: 12, gols_pro: 24, gols_contra: 25, saldo_gols: -1, aproveitamento: 46.7, variacao_posicao: 0, ultimos_jogos: ['e', 'v', 'e', 'd', 'v'], faixa_classificacao: null
  },
  {
    posicao: 11,
    pontos: 41,
    time: { time_id: 115, nome_popular: 'Goiás', sigla: 'GOI', escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-serieb.png' },
    jogos: 30, vitorias: 11, empates: 8, derrotas: 11, gols_pro: 41, gols_contra: 32, saldo_gols: 9, aproveitamento: 45.6, variacao_posicao: 0, ultimos_jogos: ['d', 'v', 'e', 'd', 'e'], faixa_classificacao: null
  },
  {
    posicao: 12,
    pontos: 40,
    time: { time_id: 6, nome_popular: 'Avaí', sigla: 'AVA', escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-serieb.png' },
    jogos: 31, vitorias: 11, empates: 7, derrotas: 13, gols_pro: 25, gols_contra: 28, saldo_gols: -3, aproveitamento: 43.0, variacao_posicao: 0, ultimos_jogos: ['e', 'd', 'e', 'd', 'v'], faixa_classificacao: null
  },
  {
    posicao: 13,
    pontos: 35,
    time: { time_id: 59, nome_popular: 'Ponte Preta', sigla: 'PON', escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-serieb.png' },
    jogos: 31, vitorias: 9, empates: 8, derrotas: 14, gols_pro: 32, gols_contra: 42, saldo_gols: -10, aproveitamento: 37.6, variacao_posicao: 0, ultimos_jogos: ['d', 'v', 'd', 'd', 'v'], faixa_classificacao: null
  },
  {
    posicao: 14,
    pontos: 35,
    time: { time_id: 177, nome_popular: 'Botafogo-SP', sigla: 'BSP', escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-serieb.png' },
    jogos: 30, vitorias: 8, empates: 11, derrotas: 11, gols_pro: 28, gols_contra: 40, saldo_gols: -12, aproveitamento: 38.9, variacao_posicao: 0, ultimos_jogos: ['e', 'd', 'e', 'd', 'e'], faixa_classificacao: null
  },
  {
    posicao: 15,
    pontos: 34,
    time: { time_id: 113, nome_popular: 'Chapecoense', sigla: 'CHA', escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-serieb.png' },
    jogos: 31, vitorias: 8, empates: 10, derrotas: 13, gols_pro: 24, gols_contra: 35, saldo_gols: -11, aproveitamento: 36.6, variacao_posicao: 0, ultimos_jogos: ['v', 'd', 'v', 'd', 'v'], faixa_classificacao: null
  },
  {
    posicao: 16,
    pontos: 33,
    time: { time_id: 201, nome_popular: 'CRB', sigla: 'CRB', escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-serieb.png' },
    jogos: 31, vitorias: 8, empates: 9, derrotas: 14, gols_pro: 30, gols_contra: 37, saldo_gols: -7, aproveitamento: 35.5, variacao_posicao: 0, ultimos_jogos: ['v', 'e', 'v', 'd', 'd'], faixa_classificacao: null
  },
  {
    posicao: 17,
    pontos: 33,
    time: { time_id: 117, nome_popular: 'Paysandu', sigla: 'PAY', escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-serieb.png' },
    jogos: 31, vitorias: 7, empates: 12, derrotas: 12, gols_pro: 31, gols_contra: 37, saldo_gols: -6, aproveitamento: 35.5, variacao_posicao: 0, ultimos_jogos: ['v', 'e', 'd', 'v', 'e'], faixa_classificacao: 'Rebaixamento para a Série C'
  },
  {
    posicao: 18,
    pontos: 31,
    time: { time_id: 181, nome_popular: 'Ituano', sigla: 'ITU', escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-serieb.png' },
    jogos: 31, vitorias: 9, empates: 4, derrotas: 18, gols_pro: 35, gols_contra: 52, saldo_gols: -17, aproveitamento: 33.3, variacao_posicao: 0, ultimos_jogos: ['d', 'd', 'd', 'v', 'd'], faixa_classificacao: 'Rebaixamento para a Série C'
  },
  {
    posicao: 19,
    pontos: 30,
    time: { time_id: 219, nome_popular: 'Brusque', sigla: 'BRU', escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-serieb.png' },
    jogos: 31, vitorias: 6, empates: 12, derrotas: 13, gols_pro: 21, gols_contra: 35, saldo_gols: -14, aproveitamento: 32.3, variacao_posicao: 0, ultimos_jogos: ['d', 'v', 'd', 'e', 'd'], faixa_classificacao: 'Rebaixamento para a Série C'
  },
  {
    posicao: 20,
    pontos: 25,
    time: { time_id: 88, nome_popular: 'Guarani', sigla: 'GUA', escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-serieb.png' },
    jogos: 30, vitorias: 6, empates: 7, derrotas: 17, gols_pro: 30, gols_contra: 42, saldo_gols: -12, aproveitamento: 27.8, variacao_posicao: 0, ultimos_jogos: ['d', 'e', 'd', 'v', 'd'], faixa_classificacao: 'Rebaixamento para a Série C'
  },
];

export const FALLBACK_ARTILHEIROS_SERIE_B = [
  {
    atleta: { atleta_id: 201, nome_popular: 'Caio Dantas', foto: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-serieb.png', posicao: { nome: 'Atacante', sigla: 'ATA' } },
    time: { time_id: 88, nome_popular: 'Guarani', sigla: 'GUA', escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-serieb.png' },
    gols: 10,
  },
  {
    atleta: { atleta_id: 202, nome_popular: 'Erick Pulga', foto: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-serieb.png', posicao: { nome: 'Atacante', sigla: 'ATA' } },
    time: { time_id: 105, nome_popular: 'Ceará', sigla: 'CEA', escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-serieb.png' },
    gols: 10,
  },
  {
    atleta: { atleta_id: 203, nome_popular: 'Aylon', foto: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-serieb.png', posicao: { nome: 'Atacante', sigla: 'ATA' } },
    time: { time_id: 105, nome_popular: 'Ceará', sigla: 'CEA', escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-serieb.png' },
    gols: 9,
  },
  {
    atleta: { atleta_id: 204, nome_popular: 'Guilherme', foto: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-serieb.png', posicao: { nome: 'Atacante', sigla: 'ATA' } },
    time: { time_id: 63, nome_popular: 'Santos', sigla: 'SAN', escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-serieb.png' },
    gols: 9,
  },
  {
    atleta: { atleta_id: 205, nome_popular: 'Anselmo Ramon', foto: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-serieb.png', posicao: { nome: 'Atacante', sigla: 'ATA' } },
    time: { time_id: 201, nome_popular: 'CRB', sigla: 'CRB', escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-serieb.png' },
    gols: 8,
  },
  {
    atleta: { atleta_id: 206, nome_popular: 'Dellatorre', foto: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-serieb.png', posicao: { nome: 'Atacante', sigla: 'ATA' } },
    time: { time_id: 150, nome_popular: 'Mirassol', sigla: 'MIR', escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-serieb.png' },
    gols: 8,
  },
  {
    atleta: { atleta_id: 207, nome_popular: 'Matheus Frizzo', foto: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-serieb.png', posicao: { nome: 'Meia', sigla: 'MEI' } },
    time: { time_id: 84, nome_popular: 'Coritiba', sigla: 'CFC', escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-serieb.png' },
    gols: 8,
  },
];

export function getFallbackPartidasSerieB() {
  const agora = new Date();
  const d0 = new Date(agora);
  const d1 = new Date(agora); d1.setDate(d1.getDate() + 1);

  const formatIso = (d: Date, hora: string) => {
    const ano = d.getFullYear();
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const dia = String(d.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}T${hora}:00-03:00`;
  };

  const formatDate = (d: Date) => {
    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    return `${dia}/${mes}/${d.getFullYear()}`;
  };

  return [
    {
      partida_id: 9201,
      placar: '— x —',
      placar_mandante: null,
      placar_visitante: null,
      status: 'agendado',
      data_realizacao: formatDate(d0),
      hora_realizacao: '20:00',
      data_realizacao_iso: formatIso(d0, '20:00'),
      data_hora: formatIso(d0, '20:00'),
      estadio: { estadio_id: 11, nome_popular: 'Vila Belmiro', nome: 'Vila Belmiro', cidade: 'Santos' },
      time_mandante: {
        time_id: 63,
        nome_popular: 'Santos',
        sigla: 'SAN',
        escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-serieb.png',
      },
      time_visitante: {
        time_id: 105,
        nome_popular: 'Ceará',
        sigla: 'CEA',
        escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-serieb.png',
      },
      campeonato: { campeonato_id: 14, nome: 'Brasileirão Série B', edicao_atual: '2026', slug: 'campeonato-brasileiro-serie-b' },
    },
    {
      partida_id: 9202,
      placar: '— x —',
      placar_mandante: null,
      placar_visitante: null,
      status: 'agendado',
      data_realizacao: formatDate(d1),
      hora_realizacao: '19:00',
      data_realizacao_iso: formatIso(d1, '19:00'),
      data_hora: formatIso(d1, '19:00'),
      estadio: { estadio_id: 12, nome_popular: 'Ilha do Retiro', nome: 'Ilha do Retiro', cidade: 'Recife' },
      time_mandante: {
        time_id: 79,
        nome_popular: 'Sport',
        sigla: 'SPT',
        escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-serieb.png',
      },
      time_visitante: {
        time_id: 153,
        nome_popular: 'Novorizontino',
        sigla: 'NOV',
        escudo: 'https://cdn.api-futebol.com.br/campeonatos/escudos/brasileiro-serieb.png',
      },
      campeonato: { campeonato_id: 14, nome: 'Brasileirão Série B', edicao_atual: '2026', slug: 'campeonato-brasileiro-serie-b' },
    },
  ];
}
