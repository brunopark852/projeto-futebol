import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getEscudoClube } from '@/lib/data/clubesMap';

export interface PollMatch {
  partida_id: number;
  campeonato?: { nome?: string; nome_popular?: string };
  data_realizacao?: string;
  hora_realizacao?: string;
  data_realizacao_iso?: string;
  data_hora?: string;
  time_mandante: { nome_popular: string; sigla: string; escudo: string };
  time_visitante: { nome_popular: string; sigla: string; escudo: string };
}

interface VoteState {
  mandante: number;
  empate: number;
  visitante: number;
  total: number;
  userChoice?: 'mandante' | 'empate' | 'visitante';
}

const DEFAULT_POLL_MATCHES: PollMatch[] = [
  {
    partida_id: 9101,
    campeonato: { nome: 'Brasileirão Série A' },
    hora_realizacao: '19:00',
    data_realizacao: 'Hoje',
    time_mandante: {
      nome_popular: 'Flamengo',
      sigla: 'FLA',
      escudo: '/escudos/flamengo.png',
    },
    time_visitante: {
      nome_popular: 'Corinthians',
      sigla: 'COR',
      escudo: '/escudos/corinthians.png',
    },
  },
  {
    partida_id: 9102,
    campeonato: { nome: 'Brasileirão Série A' },
    hora_realizacao: '21:30',
    data_realizacao: 'Hoje',
    time_mandante: {
      nome_popular: 'Palmeiras',
      sigla: 'PAL',
      escudo: '/escudos/palmeiras.png',
    },
    time_visitante: {
      nome_popular: 'Atlético-MG',
      sigla: 'CAM',
      escudo: '/escudos/atletico-mg.png',
    },
  },
  {
    partida_id: 9103,
    campeonato: { nome: 'Brasileirão Série A' },
    hora_realizacao: '16:00',
    data_realizacao: 'Amanhã',
    time_mandante: {
      nome_popular: 'São Paulo',
      sigla: 'SAO',
      escudo: '/escudos/sao-paulo.png',
    },
    time_visitante: {
      nome_popular: 'Vasco da Gama',
      sigla: 'VAS',
      escudo: '/escudos/vasco.png',
    },
  },
  {
    partida_id: 9201,
    campeonato: { nome: 'Brasileirão Série B' },
    hora_realizacao: '20:00',
    data_realizacao: 'Hoje',
    time_mandante: {
      nome_popular: 'Santos',
      sigla: 'SAN',
      escudo: '/escudos/sao-paulo.png', // ajustado pelo getEscudoClube para santos
    },
    time_visitante: {
      nome_popular: 'Ceará',
      sigla: 'CEA',
      escudo: '/escudos/ceara.png',
    },
  },
  {
    partida_id: 9104,
    campeonato: { nome: 'Brasileirão Série A' },
    hora_realizacao: '18:30',
    data_realizacao: 'Amanhã',
    time_mandante: {
      nome_popular: 'Botafogo',
      sigla: 'BOT',
      escudo: '/escudos/botafogo.png',
    },
    time_visitante: {
      nome_popular: 'Internacional',
      sigla: 'INT',
      escudo: '/escudos/internacional.png',
    },
  },
];

// Dados realistas de votos e odds por partida
const INITIAL_VOTES: Record<number, { m: number; e: number; v: number; oddM: string; oddE: string; oddV: string }> = {
  9101: { m: 14200, e: 4100, v: 11857, oddM: '1.91', oddE: '3.76', oddV: '3.76' },
  9102: { m: 13540, e: 5200, v: 8930, oddM: '2.10', oddE: '3.40', oddV: '3.50' },
  9103: { m: 11200, e: 6800, v: 7400, oddM: '2.05', oddE: '3.30', oddV: '3.80' },
  9201: { m: 16800, e: 3900, v: 6200, oddM: '1.75', oddE: '3.60', oddV: '4.50' },
  9104: { m: 15300, e: 4900, v: 8100, oddM: '1.95', oddE: '3.50', oddV: '3.90' },
};

export default function MatchPollWidget({ matches }: { matches?: PollMatch[] }) {
  const list = matches ?? [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [votesMap, setVotesMap] = useState<Record<number, VoteState>>({});
  const [isVotedFeedback, setIsVotedFeedback] = useState<string | null>(null);

  const match = list[currentIndex] || list[0];
  const partidaId = match?.partida_id || 9101;

  // Carregar votos salvos no localStorage
  useEffect(() => {
    const loaded: Record<number, VoteState> = {};
    list.forEach((m) => {
      const pid = m.partida_id;
      const base = INITIAL_VOTES[pid] || { m: 12000, e: 4000, v: 9000 };
      const stored = typeof window !== 'undefined' ? localStorage.getItem(`poll_vote_${pid}`) : null;
      let userChoice: 'mandante' | 'empate' | 'visitante' | undefined = undefined;

      let mCount = base.m;
      let eCount = base.e;
      let vCount = base.v;

      if (stored === 'mandante' || stored === 'empate' || stored === 'visitante') {
        userChoice = stored;
        if (stored === 'mandante') mCount += 1;
        if (stored === 'empate') eCount += 1;
        if (stored === 'visitante') vCount += 1;
      }

      loaded[pid] = {
        mandante: mCount,
        empate: eCount,
        visitante: vCount,
        total: mCount + eCount + vCount,
        userChoice,
      };
    });
    setVotesMap(loaded);
  }, [list]);

  if (!match) return null;

  const currentVotes = votesMap[partidaId] || {
    mandante: 14200,
    empate: 4100,
    visitante: 11857,
    total: 30157,
  };

  const total = currentVotes.total || 1;
  const pctMandante = Math.round((currentVotes.mandante / total) * 100);
  const pctEmpate = Math.round((currentVotes.empate / total) * 100);
  const pctVisitante = Math.max(0, 100 - pctMandante - pctEmpate);

  const oddsConfig = INITIAL_VOTES[partidaId] || { oddM: '1.91', oddE: '3.76', oddV: '3.76' };

  const handleVote = (choice: 'mandante' | 'empate' | 'visitante') => {
    if (currentVotes.userChoice) return; // Já votou nesta partida

    const updated: VoteState = {
      ...currentVotes,
      [choice]: currentVotes[choice] + 1,
      total: currentVotes.total + 1,
      userChoice: choice,
    };

    setVotesMap((prev) => ({
      ...prev,
      [partidaId]: updated,
    }));

    if (typeof window !== 'undefined') {
      localStorage.setItem(`poll_vote_${partidaId}`, choice);
    }

    setIsVotedFeedback(choice);
    setTimeout(() => setIsVotedFeedback(null), 2500);
  };

  const prevMatch = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : list.length - 1));
  };

  const nextMatch = () => {
    setCurrentIndex((prev) => (prev < list.length - 1 ? prev + 1 : 0));
  };

  const mandanteEscudo = getEscudoClube(match.time_mandante?.nome_popular, match.time_mandante?.escudo);
  const visitanteEscudo = getEscudoClube(match.time_visitante?.nome_popular, match.time_visitante?.escudo);

  const horaFormatada = match.hora_realizacao || '19:00';
  const dataFormatada = match.data_realizacao || 'Hoje';
  const competicaoNome = match.campeonato?.nome_popular || match.campeonato?.nome || 'Brasileirão';

  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      {/* Container Principal idêntico ao layout da captura de tela */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0f1923] border border-slate-800/80 shadow-2xl text-white select-none">
        {/* Faixa Superior: Competição */}
        <div className="pt-5 pb-2 text-center text-xs sm:text-sm font-medium text-slate-400 tracking-wider">
          {competicaoNome}
        </div>

        {/* Confronto e Horário */}
        <div className="px-6 py-2">
          <div className="flex items-center justify-center gap-3 sm:gap-8 max-w-xl mx-auto">
            {/* Time Mandante */}
            <div className="flex-1 flex items-center justify-end gap-3 text-right">
              <span className="text-sm sm:text-lg font-bold text-white truncate">
                {match.time_mandante?.nome_popular}
              </span>
              <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 relative flex items-center justify-center">
                <Image
                  src={mandanteEscudo}
                  alt={match.time_mandante?.nome_popular}
                  width={36}
                  height={36}
                  className="object-contain"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Horário Central */}
            <div className="flex flex-col items-center shrink-0 px-2 min-w-[70px]">
              <span className="text-[11px] text-slate-400 font-medium">{dataFormatada}</span>
              <span className="text-sm sm:text-base font-bold text-white tracking-wide">{horaFormatada}</span>
            </div>

            {/* Time Visitante */}
            <div className="flex-1 flex items-center justify-start gap-3 text-left">
              <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 relative flex items-center justify-center">
                <Image
                  src={visitanteEscudo}
                  alt={match.time_visitante?.nome_popular}
                  width={36}
                  height={36}
                  className="object-contain"
                  loading="lazy"
                />
              </div>
              <span className="text-sm sm:text-lg font-bold text-white truncate">
                {match.time_visitante?.nome_popular}
              </span>
            </div>
          </div>
        </div>

        {/* Pergunta em Destaque */}
        <div className="text-center my-3 sm:my-5 px-4">
          <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
            Quem vai ganhar?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
            Total de votos: {currentVotes.total.toLocaleString('pt-BR')}
          </p>
        </div>

        {/* Barra de Porcentagem Segmentada */}
        <div className="px-6 sm:px-14 max-w-2xl mx-auto my-3">
          <div className="h-1.5 sm:h-2 w-full flex rounded-full overflow-hidden bg-slate-800">
            {/* Segmento Mandante (Branco / Gelo) */}
            <div
              style={{ width: `${pctMandante}%` }}
              className="bg-slate-200 transition-all duration-500 ease-out"
            />
            {/* Segmento Empate (Cinza / Grafite) */}
            <div
              style={{ width: `${pctEmpate}%` }}
              className="bg-slate-500 transition-all duration-500 ease-out"
            />
            {/* Segmento Visitante (Azul Royal) */}
            <div
              style={{ width: `${pctVisitante}%` }}
              className="bg-[#0088ff] transition-all duration-500 ease-out"
            />
          </div>
        </div>

        {/* Botões Interativos de Opções e Odds */}
        <div className="px-4 sm:px-12 max-w-2xl mx-auto pb-6 pt-2">
          <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
            {/* Opção 1: Mandante */}
            <button
              type="button"
              onClick={() => handleVote('mandante')}
              disabled={Boolean(currentVotes.userChoice)}
              className={`p-2 sm:p-3 rounded-xl transition-all flex flex-col items-center justify-between cursor-pointer ${
                currentVotes.userChoice === 'mandante'
                  ? 'bg-slate-800/90 ring-2 ring-emerald-400'
                  : 'hover:bg-slate-800/50'
              }`}
            >
              <span className="text-sm sm:text-base font-bold text-slate-200">
                {pctMandante}%
              </span>
              <span className="text-xs sm:text-sm font-medium text-slate-300 truncate w-full px-1 my-1">
                {match.time_mandante?.nome_popular}
              </span>
              {/* Badge de Odd com indicador ▲ */}
              <div
                className={`mt-1 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition ${
                  currentVotes.userChoice === 'mandante'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-black/60 text-slate-200 border border-slate-700 hover:border-slate-500'
                }`}
              >
                <span className="text-emerald-400 text-[10px]">▲</span>
                <span>{oddsConfig.oddM}</span>
              </div>
            </button>

            {/* Opção 2: Empate */}
            <button
              type="button"
              onClick={() => handleVote('empate')}
              disabled={Boolean(currentVotes.userChoice)}
              className={`p-2 sm:p-3 rounded-xl transition-all flex flex-col items-center justify-between cursor-pointer ${
                currentVotes.userChoice === 'empate'
                  ? 'bg-slate-800/90 ring-2 ring-amber-400'
                  : 'hover:bg-slate-800/50'
              }`}
            >
              <span className="text-sm sm:text-base font-bold text-slate-200">
                {pctEmpate}%
              </span>
              <span className="text-xs sm:text-sm font-medium text-slate-300 truncate w-full px-1 my-1">
                Empate
              </span>
              {/* Badge de Odd com indicador ▲ */}
              <div
                className={`mt-1 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition ${
                  currentVotes.userChoice === 'empate'
                    ? 'bg-amber-500 text-white'
                    : 'bg-black/60 text-slate-200 border border-slate-700 hover:border-slate-500'
                }`}
              >
                <span className="text-emerald-400 text-[10px]">▲</span>
                <span>{oddsConfig.oddE}</span>
              </div>
            </button>

            {/* Opção 3: Visitante */}
            <button
              type="button"
              onClick={() => handleVote('visitante')}
              disabled={Boolean(currentVotes.userChoice)}
              className={`p-2 sm:p-3 rounded-xl transition-all flex flex-col items-center justify-between cursor-pointer ${
                currentVotes.userChoice === 'visitante'
                  ? 'bg-slate-800/90 ring-2 ring-[#0088ff]'
                  : 'hover:bg-slate-800/50'
              }`}
            >
              <span className="text-sm sm:text-base font-bold text-slate-200">
                {pctVisitante}%
              </span>
              <span className="text-xs sm:text-sm font-medium text-slate-300 truncate w-full px-1 my-1">
                {match.time_visitante?.nome_popular}
              </span>
              {/* Badge de Odd com indicador ▼ (idêntico à captura) */}
              <div
                className={`mt-1 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition ${
                  currentVotes.userChoice === 'visitante'
                    ? 'bg-[#0088ff] text-white'
                    : 'bg-[#0088ff] text-white hover:brightness-110'
                }`}
              >
                <span className="text-red-300 text-[10px]">▼</span>
                <span>{oddsConfig.oddV}</span>
              </div>
            </button>
          </div>

          {/* Feedback de voto registrado */}
          {currentVotes.userChoice && (
            <p className="text-xs text-center text-emerald-400 font-semibold mt-3 animate-fade-in">
              ✓ Seu palpite foi computado com sucesso!
            </p>
          )}
        </div>

        {/* Setas Laterais de Navegação (< e >) */}
        <button
          type="button"
          onClick={prevMatch}
          aria-label="Partida anterior"
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-900/80 border border-slate-700/80 text-white flex items-center justify-center hover:bg-slate-800 hover:scale-105 active:scale-95 transition shadow-lg cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          type="button"
          onClick={nextMatch}
          aria-label="Próxima partida"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-900/80 border border-slate-700/80 text-white flex items-center justify-center hover:bg-slate-800 hover:scale-105 active:scale-95 transition shadow-lg cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Indicadores de Paginação no Rodapé (Bolinhas) */}
        <div className="pb-4 flex items-center justify-center gap-1.5">
          {list.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Ir para jogo ${idx + 1}`}
              onClick={() => setCurrentIndex(idx)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                idx === currentIndex
                  ? 'w-4 h-1.5 bg-white'
                  : 'w-1.5 h-1.5 bg-slate-600 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
