import { useState } from 'react';

export interface LineupPlayer {
  atleta: { atleta_id: number; nome_popular: string };
  camisa?: string;
  ordem?: number;
  posicao?: { nome?: string; sigla?: string } | [];
}

export interface LineupTeam {
  esquema_tatico?: string;
  tecnico?: { nome_popular?: string };
  titulares?: LineupPlayer[];
  reservas?: LineupPlayer[];
}

interface TacticalLineupProps {
  homeName: string;
  awayName: string;
  home: LineupTeam;
  away: LineupTeam;
}

const positions: Record<string, Record<string, [number, number][]>> = {
  '4-3-3': {
    GOL: [[50, 90]], DEF: [[18, 70], [38, 76], [62, 76], [82, 70]], MEI: [[28, 52], [50, 58], [72, 52]], ATA: [[22, 24], [50, 16], [78, 24]],
  },
  '4-4-2': {
    GOL: [[50, 90]], DEF: [[18, 70], [38, 76], [62, 76], [82, 70]], MEI: [[18, 50], [40, 55], [60, 55], [82, 50]], ATA: [[38, 23], [62, 23]],
  },
  '4-2-3-1': {
    GOL: [[50, 90]], DEF: [[18, 70], [38, 76], [62, 76], [82, 70]], VOL: [[36, 58], [64, 58]], MEI: [[22, 38], [50, 32], [78, 38]], ATA: [[50, 16]],
  },
};

function normalizedPosition(player: LineupPlayer): string {
  const sigla = Array.isArray(player.posicao) ? '' : String(player.posicao?.sigla || player.posicao?.nome || '').toUpperCase();
  if (sigla.includes('GOL')) return 'GOL';
  if (sigla.includes('ZAG') || sigla.includes('LAT') || sigla.includes('DEF')) return 'DEF';
  if (sigla.includes('VOL')) return 'VOL';
  if (sigla.includes('MEI') || sigla.includes('ARM')) return 'MEI';
  if (sigla.includes('ATA') || sigla.includes('PON')) return 'ATA';
  return 'MEI';
}

function Field({ team, teamName }: { team: LineupTeam; teamName: string }) {
  const formation = positions[team.esquema_tatico || ''] ? team.esquema_tatico as string : '4-3-3';
  const slots = positions[formation];
  const used: Record<string, number> = {};
  const players = (team.titulares || []).map((player, index) => {
    const group = normalizedPosition(player);
    const list = slots[group] || slots.MEI;
    const slotIndex = used[group] || 0;
    used[group] = slotIndex + 1;
    const [x, y] = list[slotIndex] || [50, 15 + index * 8];
    return { player, x, y };
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-slate-900">{teamName}</h3>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">{formation}</span>
      </div>
      {team.tecnico?.nome_popular && <p className="text-xs text-slate-500 mb-3">Técnico: {team.tecnico.nome_popular}</p>}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border-4 border-white bg-gradient-to-b from-emerald-500 to-emerald-700 shadow-inner">
        <div className="absolute inset-3 border-2 border-white/70" />
        <div className="absolute left-3 right-3 top-1/2 border-t-2 border-white/70" />
        <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/70" />
        <div className="absolute left-1/2 top-3 h-16 w-32 -translate-x-1/2 border-2 border-t-0 border-white/70" />
        <div className="absolute bottom-3 left-1/2 h-16 w-32 -translate-x-1/2 border-2 border-b-0 border-white/70" />
        {players.map(({ player, x, y }, index) => (
          <div key={`${player.atleta.atleta_id}-${index}`} className="absolute -translate-x-1/2 -translate-y-1/2 text-center" style={{ left: `${x}%`, top: `${y}%` }}>
            <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-slate-900 text-xs font-bold text-white shadow-lg">{player.camisa || '?'}</div>
            <span className="mt-1 block max-w-20 truncate rounded bg-slate-950/75 px-1 text-[10px] font-semibold text-white">{player.atleta.nome_popular}</span>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h4 className="mb-2 text-sm font-semibold text-slate-700">Reservas</h4>
        <div className="grid grid-cols-1 gap-1 text-xs text-slate-600 sm:grid-cols-2">
          {(team.reservas || []).map((player, index) => <span key={`${player.atleta.atleta_id}-r-${index}`} className="rounded bg-slate-50 px-2 py-1">{player.camisa || '—'} · {player.atleta.nome_popular}</span>)}
          {(team.reservas || []).length === 0 && <span className="text-slate-400">Reservas não publicados.</span>}
        </div>
      </div>
    </div>
  );
}

export default function TacticalLineup({ homeName, awayName, home, away }: TacticalLineupProps) {
  const [side, setSide] = useState<'home' | 'away'>('home');
  const selected = side === 'home' ? home : away;
  const selectedName = side === 'home' ? homeName : awayName;
  const hasPlayers = (home.titulares?.length || 0) + (away.titulares?.length || 0) > 0;
  if (!hasPlayers) return <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600">Escalação ainda não publicada para esta partida.</p>;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5 flex flex-wrap gap-2" role="tablist" aria-label="Selecionar equipe">
        <button type="button" onClick={() => setSide('home')} className={`rounded-lg px-4 py-2 text-sm font-semibold ${side === 'home' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700'}`} aria-pressed={side === 'home'}>{homeName}</button>
        <button type="button" onClick={() => setSide('away')} className={`rounded-lg px-4 py-2 text-sm font-semibold ${side === 'away' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700'}`} aria-pressed={side === 'away'}>{awayName}</button>
      </div>
      <p className="mb-4 text-xs text-slate-500">Escalação oficial recebida da API Futebol. Fotografias não disponibilizadas pela API.</p>
      <Field team={selected} teamName={selectedName} />
    </div>
  );
}
