import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/Layout';
import AdSlot from '@/components/AdSlot';
import { GetServerSideProps } from 'next';
import axios from 'axios';

// ============================
// Types — espelham a API Futebol
// ============================
interface PartidaAPI {
  partida_id: number;
  status: 'andamento' | 'nao_iniciado' | 'encerrado' | 'intervalo' | 'adiado' | 'cancelado' | string;
  data_realizacao_iso: string;
  hora_realizacao: string;
  data_realizacao: string;
  placar: string;
  placar_mandante: number | null;
  placar_visitante: number | null;
  cronometro?: number;
  periodo?: string;
  time_mandante: { time_id: number; nome_popular: string; sigla: string; escudo: string };
  time_visitante: { time_id: number; nome_popular: string; sigla: string; escudo: string };
  campeonato: { campeonato_id: number; nome: string; slug: string };
  estadio: { estadio_id: number; nome_popular: string };
}

interface TimeAPI {
  posicao: number;
  pontos: number;
  time: { time_id: number; nome_popular: string; sigla: string; escudo: string };
  jogos: number;
  vitorias: number;
  empates: number;
  derrotas: number;
  gols_pro: number;
  gols_contra: number;
  saldo_gols: number;
  aproveitamento: number;
}

interface CampeonatoPopular {
  id: number;
  nome: string;
  slug: string;
  destaque: TimeAPI;
  top3: TimeAPI[];
  timeUsuario: TimeAPI | null;
}

interface HomeProps {
  jogosHoje: PartidaAPI[];
  jogosAoVivo: PartidaAPI[];
  oddsEmDestaque: PartidaAPI[];
  campeonatosPopulares: CampeonatoPopular[];
  temJogosHoje: boolean;
  diaFormatado: string;
  atualizadoEm: string;
}

// ============================
// Helpers visuais
// ============================
function formatarHora(iso: string): string {
  // iso ex.: "2026-01-28T19:00:00-0300"
  try {
    return new Date(iso).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  } catch {
    return '';
  }
}

function formatarDiaSemana(): string {
  return new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  });
}

function getStatusConfig(status: string): { label: string; class: string; dotClass: string } {
  const s = status?.toLowerCase() ?? '';
  const map: Record<string, { label: string; class: string; dotClass: string }> = {
    andamento: { label: 'AO VIVO', class: 'bg-red-600 text-white', dotClass: 'bg-red-400 animate-pulse' },
    'ao vivo': { label: 'AO VIVO', class: 'bg-red-600 text-white', dotClass: 'bg-red-400 animate-pulse' },
    intervalo: { label: 'INTERVALO', class: 'bg-yellow-500 text-white', dotClass: 'bg-yellow-400' },
    nao_iniciado: { label: 'Não iniciado', class: 'bg-gray-100 text-gray-700', dotClass: 'bg-gray-400' },
    'não iniciado': { label: 'Não iniciado', class: 'bg-gray-100 text-gray-700', dotClass: 'bg-gray-400' },
    encerrado: { label: 'Encerrado', class: 'bg-emerald-600 text-white', dotClass: 'bg-emerald-400' },
    adiado: { label: 'Adiado', class: 'bg-gray-300 text-gray-800', dotClass: 'bg-gray-500' },
    cancelado: { label: 'Cancelado', class: 'bg-gray-300 text-gray-800', dotClass: 'bg-gray-500' },
  };
  return map[s] || { label: status, class: 'bg-gray-100 text-gray-700', dotClass: 'bg-gray-400' };
}

// Função auxiliar para geração determinística de números "aleatórios"
// baseada em semente (partida_id + minuto atual) para garantir hidratação consistente.
function seededRandom(partidaId: number, minute: number, max = 1): number {
  // xorshift32 simples
  let seed = partidaId ^ minute;
  seed = ((seed >> 16) ^ seed) * 0x45d9f3b;
  seed = ((seed >> 15) ^ seed) * 0x45d9f3b;
  seed = (seed >> 16) ^ seed;
  return (seed & 0xfffffff) / 0x1000000 * max;
}

// Odds sintéticas plausíveis — calculadas a partir do estado real da partida.
// Em produção, este card receberia odds de uma casa de apostas via API dedicada.
// Usa semente determinística (partida_id + minuto) para evitar mismatch de hidratação.
function calcularOdds(partida: PartidaAPI): { mandante: number; empate: number; visitante: number } {
  const ehAoVivo = partida.status?.toLowerCase() === 'andamento';
  const placarM = partida.placar_mandante ?? 0;
  const placarV = partida.placar_visitante ?? 0;
  const minuto = Math.floor(Date.now() / 60000); // muda a cada minuto

  if (ehAoVivo) {
    // Mandante ganhando: sua odd cai; visitante sobe.
    if (placarM > placarV) {
      return { 
        mandante: round(1.4 + (placarM - placarV) * 0.15), 
        empate: round(3.6 + seededRandom(partida.partida_id, minuto, 0.4)), 
        visitante: round(5.5 + (placarM - placarV) * 0.6) 
      };
    }
    if (placarV > placarM) {
      return { 
        mandante: round(5.0 + (placarV - placarM) * 0.5), 
        empate: round(3.6 + seededRandom(partida.partida_id, minuto, 0.4)), 
        visitante: round(1.5 + (placarV - placarM) * 0.2) 
      };
    }
    // Empate no placar.
    return { 
      mandante: round(2.4 + seededRandom(partida.partida_id, minuto, 0.3)), 
      empate: round(2.1 + seededRandom(partida.partida_id, minuto, 0.2)), 
      visitante: round(3.2 + seededRandom(partida.partida_id, minuto, 0.3)) 
    };
  }

  // Pré-jogo: odds "abertas" clássicas para Brasileirão, com leve viés mandante.
  const baseMandante = 2.0 + seededRandom(partida.partida_id, minuto, 0.6); // ~2.0–2.6
  const baseEmpate = 3.0 + seededRandom(partida.partida_id, minuto, 0.4);    // ~3.0–3.4
  const baseVisitante = 3.0 + seededRandom(partida.partida_id, minuto, 0.8); // ~3.0–3.8
  return { mandante: round(baseMandante), empate: round(baseEmpate), visitante: round(baseVisitante) };
}

function round(n: number): number {
  return Math.round(n * 100) / 100;
}

// ============================
// Sub-componentes
// ============================
function MatchCard({ jogo, compacto = false }: { jogo: PartidaAPI; compacto?: boolean }) {
  const statusCfg = getStatusConfig(jogo.status);
  const isLive = jogo.status?.toLowerCase() === 'andamento';
  const mostraPlacar =
    jogo.placar_mandante !== null && jogo.placar_visitante !== null && jogo.placar_mandante !== undefined;

  return (
    <Link
      href={`/partida/${jogo.partida_id}`}
      className="block bg-white rounded-lg border border-gray-200 p-4 hover:border-emerald-300 hover:shadow-md transition-all"
      aria-label={`${jogo.time_mandante.nome_popular} vs ${jogo.time_visitante.nome_popular}`}
    >
      <div className="flex items-center justify-between gap-4">
        {/* Mandante */}
        <div className="flex-1 text-right min-w-0">
          <Image
            src={jogo.time_mandante.escudo}
            alt={jogo.time_mandante.nome_popular}
            className="escudo-medio mx-auto object-contain"
            loading="lazy"
            width={40}
            height={40}
          />
          <p className="font-medium text-slate-900 text-sm mt-1 truncate">{jogo.time_mandante.nome_popular}</p>
          <p className="text-xs text-slate-400 uppercase tracking-wide">{jogo.time_mandante.sigla}</p>
        </div>

        {/* Centro: status + placar + hora */}
        <div className="flex flex-col items-center min-w-[112px]">
          <span className={`px-2 py-1 rounded text-xs font-semibold ${statusCfg.class}`}>
            {statusCfg.label}
          </span>

          {mostraPlacar ? (
            <div className={`mt-1 font-bold text-slate-900 font-mono ${compacto ? 'text-xl' : 'text-2xl'}`}>
              {jogo.placar_mandante} <span className="text-slate-400 mx-0.5">x</span> {jogo.placar_visitante}
            </div>
          ) : (
            <div className={`mt-1 text-slate-400 font-mono ${compacto ? 'text-base' : 'text-lg'}`}>– x –</div>
          )}

          {isLive && typeof jogo.cronometro === 'number' ? (
            <p className="text-xs text-red-600 font-semibold mt-1">
              {jogo.cronometro}&apos; • {jogo.periodo?.replace('-', ' ') ?? ''}
            </p>
          ) : (
            <p className="text-xs text-slate-500 mt-1">{formatarHora(jogo.data_realizacao_iso)}</p>
          )}

          <p className="text-xs text-slate-400 truncate w-full text-center">{jogo.estadio.nome_popular}</p>
        </div>

        {/* Visitante */}
        <div className="flex-1 text-left min-w-0">
          <Image
            src={jogo.time_visitante.escudo}
            alt={jogo.time_visitante.nome_popular}
            className="escudo-medio mx-auto object-contain"
            loading="lazy"
            width={40}
            height={40}
          />
          <p className="font-medium text-slate-900 text-sm mt-1 truncate">{jogo.time_visitante.nome_popular}</p>
          <p className="text-xs text-slate-400 uppercase tracking-wide">{jogo.time_visitante.sigla}</p>
        </div>
      </div>

      <p className="text-xs text-slate-500 text-center mt-3 pt-3 border-t border-gray-100">
        {jogo.campeonato.nome}
      </p>
    </Link>
  );
}

function EmptyState({ mensagem, iconeCalendario = true }: { mensagem: string; iconeCalendario?: boolean }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
      <svg
        className="w-12 h-12 text-gray-300 mx-auto mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        {iconeCalendario ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        )}
      </svg>
      <p className="text-slate-600">{mensagem}</p>
    </div>
  );
}

function SectionHeader({
  titulo,
  subtitulo,
  link,
  accent = 'emerald',
}: {
  titulo: string;
  subtitulo?: string;
  link?: { href: string; label: string };
  accent?: 'emerald' | 'red' | 'amber';
}) {
  const dotColor =
    accent === 'red' ? 'bg-red-600' : accent === 'amber' ? 'bg-amber-500' : 'bg-emerald-700';
  const accentText =
    accent === 'red' ? 'text-red-600' : accent === 'amber' ? 'text-amber-600' : 'text-emerald-700';

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className={`w-2 h-2 ${dotColor} rounded-full ${accent === 'red' ? 'animate-pulse' : ''}`} aria-hidden="true" />
          {titulo}
        </h2>
        {subtitulo && <p className="text-sm text-slate-500 mt-1">{subtitulo}</p>}
      </div>
      {link && (
        <Link href={link.href} className={`text-sm ${accentText} hover:underline font-medium whitespace-nowrap`}>
          {link.label} →
        </Link>
      )}
    </div>
  );
}

function OddsCard({ jogo }: { jogo: PartidaAPI }) {
  const odds = calcularOdds(jogo);
  const isLive = jogo.status?.toLowerCase() === 'andamento';
  const statusCfg = getStatusConfig(jogo.status);

  return (
    <Link
      href={`/partida/${jogo.partida_id}`}
      className="block bg-white rounded-lg border border-gray-200 p-4 hover:border-emerald-300 hover:shadow-md transition-all"
    >
      {/* Cabeçalho: times */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <Image
            src={jogo.time_mandante.escudo}
            alt={jogo.time_mandante.nome_popular}
            className="escudo-pequeno"
            loading="lazy"
            width={24}
            height={24}
          />
          <span className="font-medium text-slate-900 text-sm truncate">{jogo.time_mandante.sigla}</span>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded font-medium ${statusCfg.class} mx-2 shrink-0`}>
          {isLive ? 'LIVE' : formatarHora(jogo.data_realizacao_iso)}
        </span>
        <div className="flex items-center gap-2 min-w-0 flex-1 justify-end">
          <span className="font-medium text-slate-900 text-sm truncate">{jogo.time_visitante.sigla}</span>
          <Image
            src={jogo.time_visitante.escudo}
            alt={jogo.time_visitante.nome_popular}
            className="escudo-pequeno"
            loading="lazy"
            width={24}
            height={24}
          />
        </div>
      </div>

      {/* Placar central */}
      {jogo.placar_mandante !== null && jogo.placar_visitante !== null ? (
        <div className="text-center mb-3 font-mono text-lg font-bold text-slate-900">
          {jogo.placar_mandante} <span className="text-slate-400 mx-1">x</span> {jogo.placar_visitante}
        </div>
      ) : (
        <div className="text-center mb-3 text-xs text-slate-500">
          {jogo.campeonato.nome}
        </div>
      )}

      {/* Odds 1X2 */}
      <div className="grid grid-cols-3 gap-2">
        <div className="text-center bg-gray-50 border border-gray-200 rounded-md py-2">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">1</div>
          <div className="text-sm font-bold text-emerald-700 font-mono">{odds.mandante.toFixed(2)}</div>
        </div>
        <div className="text-center bg-gray-50 border border-gray-200 rounded-md py-2">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">X</div>
          <div className="text-sm font-bold text-slate-700 font-mono">{odds.empate.toFixed(2)}</div>
        </div>
        <div className="text-center bg-gray-50 border border-gray-200 rounded-md py-2">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">2</div>
          <div className="text-sm font-bold text-emerald-700 font-mono">{odds.visitante.toFixed(2)}</div>
        </div>
      </div>
    </Link>
  );
}

function CampeonatoCard({ camp }: { camp: CampeonatoPopular }) {
  return (
    <Link
      href={`/tabela?id=${camp.id}`}
      className="block bg-white rounded-lg border border-gray-200 p-5 hover:border-emerald-300 hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="min-w-0">
          <h3 className="font-bold text-slate-900 text-base truncate">{camp.nome}</h3>
          {camp.timeUsuario && (
            <p className="text-xs text-slate-500 mt-0.5">
              Seu time: {camp.timeUsuario.time.nome_popular} • {camp.timeUsuario.posicao}º lugar
            </p>
          )}
        </div>
        {camp.destaque.time && (
          <Image
            src={camp.destaque.time.escudo}
            alt={camp.destaque.time.nome_popular}
            className="escudo-pequeno shrink-0 ml-3"
            loading="lazy"
            width={32}
            height={32}
          />
        )}
      </div>

      {/* Mini-tabela top 3 */}
      <ol className="space-y-2">
        {camp.top3.map((t, idx) => (
          <li key={t.time.time_id} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 min-w-0 flex-1">
              <span className={`text-xs font-bold w-5 ${idx === 0 ? 'text-emerald-700' : 'text-slate-400'}`}>
                {t.posicao}º
              </span>
              <Image
                src={t.time.escudo}
                alt={t.time.nome_popular}
                className="escudo-pequeno"
                loading="lazy"
                width={20}
                height={20}
              />
              <span className="text-slate-700 truncate">{t.time.nome_popular}</span>
            </span>
            <span className="font-bold text-slate-900 font-mono">{t.pontos} pts</span>
          </li>
        ))}
      </ol>

      <p className="text-xs text-emerald-700 mt-4 pt-3 border-t border-gray-100 text-center font-medium">
        Ver classificação completa →
      </p>
    </Link>
  );
}

// ============================
// Página
// ============================
export default function Home({
  jogosHoje,
  jogosAoVivo,
  oddsEmDestaque,
  campeonatosPopulares,
  temJogosHoje,
  diaFormatado,
  atualizadoEm,
}: HomeProps & {
  diaFormatado: string;
  atualizadoEm: string;
}) {

  return (
    <Layout
      title="Futebol - Acompanhamento em tempo real"
      description="Portal de estatísticas e acompanhamento de futebol brasileiro em tempo real. Tabela, artilheiros, jogos ao vivo e odds por hora."
    >
      {/* HERO compacto */}
      <section className="mb-8">
        <div className="bg-emerald-700 rounded-xl p-6 sm:p-8 text-white">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Futebol em tempo real</h1>
          <p className="text-emerald-100 text-sm sm:text-base max-w-2xl">
            Acompanhe jogos, placares, odds e classificação dos principais campeonatos do Brasil.
          </p>
          <p className="text-emerald-200 text-xs mt-3 capitalize">{diaFormatado}</p>
        </div>
      </section>

      {/* GRID principal: 2 colunas em desktop, 1 em mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna principal: ocupa 2/3 */}
        <div className="lg:col-span-2 space-y-10">
          {/* 1. JOGOS DE HOJE */}
          <section aria-labelledby="sec-jogos-hoje">
            <SectionHeader
              titulo="Jogos de Hoje"
              subtitulo={temJogosHoje ? `Partidas de ${diaFormatado}` : jogosHoje.length > 0 ? 'Próximos jogos' : 'Sem partidas agendadas para hoje'}
              link={{ href: '/ao-vivo', label: 'Ver todos' }}
              accent="emerald"
            />

            {!temJogosHoje && jogosHoje.length > 0 && (
              <p className="text-xs text-slate-500 text-center mb-3">Exibindo próximos jogos (não há jogos hoje)</p>
            )}
            {jogosHoje.length === 0 ? (
              <EmptyState mensagem="Nenhum jogo programado para hoje." />
            ) : (
              <div className="space-y-3">
                {jogosHoje.slice(0, 5).map((jogo) => (
                  <MatchCard key={jogo.partida_id} jogo={jogo} />
                ))}
                {jogosHoje.length > 5 && (
                  <Link
                    href="/ao-vivo"
                    className="block text-center text-sm text-emerald-700 hover:underline font-medium py-3"
                  >
                    Ver mais {jogosHoje.length - 5} jogos de hoje →
                  </Link>
                )}
              </div>
            )}

            <div className="mt-4">
              <AdSlot slot="table" />
            </div>
          </section>

          {/* 2. AO VIVO */}
          <section aria-labelledby="sec-ao-vivo">
            <SectionHeader
              titulo="Ao Vivo"
              subtitulo={
                jogosAoVivo.length > 0
                  ? `${jogosAoVivo.length} ${jogosAoVivo.length === 1 ? 'partida em andamento' : 'partidas em andamento'}`
                  : 'Nenhuma partida em andamento no momento'
              }
              link={{ href: '/ao-vivo', label: 'Página ao vivo' }}
              accent="red"
            />

            {jogosAoVivo.length === 0 ? (
              <EmptyState
                mensagem="Não há jogos acontecendo agora. Confira os jogos de hoje."
                iconeCalendario={false}
              />
            ) : (
              <div className="space-y-3">
                {jogosAoVivo.slice(0, 4).map((jogo) => (
                  <MatchCard key={jogo.partida_id} jogo={jogo} />
                ))}
              </div>
            )}
          </section>

          {/* 3. ODDS POR HORA */}
          <section aria-labelledby="sec-odds-hora">
            <SectionHeader
              titulo="Odds Por Hora"
              subtitulo="Probabilidades 1X2 em jogos de destaque (ao vivo e próximos)"
              accent="amber"
            />

            {oddsEmDestaque.length === 0 ? (
              <EmptyState mensagem="Sem odds em destaque no momento." />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {oddsEmDestaque.slice(0, 6).map((jogo) => (
                  <OddsCard key={jogo.partida_id} jogo={jogo} />
                ))}
              </div>
            )}
            <p className="text-xs text-slate-400 mt-3 text-center">
              Odds ilustrativas calculadas a partir do estado da partida. Atualizadas a cada requisição.
            </p>
          </section>
        </div>

        {/* Sidebar: Campeonatos Populares */}
        <aside className="space-y-10" aria-labelledby="sec-campeonatos">
          <section>
            <SectionHeader titulo="Campeonatos Populares" accent="emerald" />
            <div className="space-y-3">
              {campeonatosPopulares.map((camp) => (
                <CampeonatoCard key={camp.id} camp={camp} />
              ))}
            </div>
          </section>

          {/* Quick links na sidebar */}
          <section>
            <SectionHeader titulo="Principais Acessos" accent="emerald" />
            <div className="space-y-2">
              <Link
                href="/tabela"
                className="flex items-center gap-3 bg-white rounded-lg border border-gray-200 p-3 hover:border-emerald-300 hover:shadow-sm transition-all"
              >
                <div className="w-9 h-9 bg-emerald-100 rounded-md flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900 text-sm">Tabela</p>
                  <p className="text-xs text-slate-500">Classificação completa</p>
                </div>
              </Link>
              <Link
                href="/artilheiros"
                className="flex items-center gap-3 bg-white rounded-lg border border-gray-200 p-3 hover:border-emerald-300 hover:shadow-sm transition-all"
              >
                <div className="w-9 h-9 bg-yellow-100 rounded-md flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                    />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900 text-sm">Artilheiros</p>
                  <p className="text-xs text-slate-500">Ranking de goleadores</p>
                </div>
              </Link>
              <Link
                href="/noticias"
                className="flex items-center gap-3 bg-white rounded-lg border border-gray-200 p-3 hover:border-emerald-300 hover:shadow-sm transition-all"
              >
                <div className="w-9 h-9 bg-blue-100 rounded-md flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 01-2-2V9a2 2 0 012-2h2a2 2 0 012 2v9a2 2 0 01-2 2h-2z"
                    />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900 text-sm">Notícias</p>
                  <p className="text-xs text-slate-500">Últimas do futebol</p>
                </div>
              </Link>
            </div>
          </section>
        </aside>
      </div>

      <div class="af-widget" data-af-widget="wgt_d82b7870f50777fd0eaac7e2ed86d8da" data-af-height="900">
        <a href="https://api-futebol.com.br/?utm_source=widget&amp;utm_medium=embed&amp;utm_campaign=wgt_d82b">Tabela + Rodadas · Brasileirão Série A — dados por API Futebol</a>
      </div>
      <script src="https://cdn.api-futebol.com.br/widgets/v3.js" async></script>

     </Layout>
   );

}

// ============================
// SSR — combina dados das APIs
// ============================
export const getServerSideProps: GetServerSideProps<HomeProps & {
  diaFormatado: string;
  atualizadoEm: string;
}> = async () => {
  const CAMPEONATO_PRINCIPAL_ID = 10; // Brasileirão Série A

  try {
    // 1. Buscar jogos ao vivo
    const aoVivoResp = await axios.get('http://localhost:3000/api/ao-vivo', {
      // Em prod absoluto este servidor não chama a si mesmo;
      // mas como getServerSideProps roda no mesmo processo, podemos
      // chamar a URL interna. Em deploy Vercel, o host difere.
      // Para robustez, usamos a chamada direta à API externa aqui também.
      timeout: 8000,
    }).catch(() => null);

    const todasPartidasAoVivo: PartidaAPI[] = aoVivoResp?.data ?? [];

    // Fallback: chamar a API externa direto (caso o proxy interno falhe)
    let partidasAoVivo: PartidaAPI[] = todasPartidasAoVivo;
    if (partidasAoVivo.length === 0) {
      const directResp = await axios
        .get('https://api.api-futebol.com.br/v1/ao-vivo', {
          headers: { Authorization: `Bearer ${process.env.API_FUTEBOL_KEY}` },
          timeout: 8000,
        })
        .catch(() => null);
      partidasAoVivo = directResp?.data ?? [];
    }

    // 2. Buscar partidas do Brasileirão (próximas + recentes)
    let partidasCampeonato: PartidaAPI[] = [];
    try {
      const campResp = await axios.get(
        `https://api.api-futebol.com.br/v1/campeonatos/${CAMPEONATO_PRINCIPAL_ID}/partidas`,
        {
          headers: { Authorization: `Bearer ${process.env.API_FUTEBOL_KEY}` },
          timeout: 8000,
        },
      );
      // API retorna { campeonato: {...}, partidas: { "fase-unica": { "1a-rodada": [...], ... } } }
      const partidasData = campResp.data?.partidas;
      if (partidasData) {
        Object.values(partidasData).forEach((fase: any) => {
          Object.values(fase).forEach((rodada: unknown) => {
            if (Array.isArray(rodada)) {
              partidasCampeonato.push(...rodada);
            }
          });
        });
      }
    } catch (err) {
      console.error('Erro ao buscar partidas do campeonato:', (err as Error).message);
    }

    // 3. Buscar tabela do Brasileirão (para Campeonatos Populares)
    let tabela: TimeAPI[] = [];
    try {
      const tabelaResp = await axios.get(
        `https://api.api-futebol.com.br/v1/campeonatos/${CAMPEONATO_PRINCIPAL_ID}/tabela`,
        {
          headers: { Authorization: `Bearer ${process.env.API_FUTEBOL_KEY}` },
          timeout: 8000,
        },
      );
      tabela = tabelaResp.data ?? [];
    } catch (err) {
      console.error('Erro ao buscar tabela:', (err as Error).message);
    }

    // ===== Computar seções =====

    // "Jogos de hoje" = partidas cuja data_realizacao_iso é HOJE (independente de status)
    // Se não houver jogos hoje, mostra os próximos jogos (até 2 dias)
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const amanha = new Date(hoje);
    amanha.setDate(amanha.getDate() + 1);
    const depoisDeAmanha = new Date(hoje);
    depoisDeAmanha.setDate(depoisDeAmanha.getDate() + 2);

    const todasPartidas = [...partidasAoVivo, ...partidasCampeonato];
    let jogosHoje = todasPartidas
      .filter((p) => {
        try {
          const d = new Date(p.data_realizacao_iso);
          return d >= hoje && d < amanha;
        } catch {
          return false;
        }
      })
      .sort((a, b) => new Date(a.data_realizacao_iso).getTime() - new Date(b.data_realizacao_iso).getTime());

    // Se não houver jogos hoje, buscar próximos (amanhã e depois)
    let temJogosHojeReal = jogosHoje.length > 0;
    if (!temJogosHojeReal) {
      jogosHoje = todasPartidas
        .filter((p) => {
          try {
            const d = new Date(p.data_realizacao_iso);
            return d >= amanha && d < depoisDeAmanha;
          } catch {
            return false;
          }
        })
        .sort((a, b) => new Date(a.data_realizacao_iso).getTime() - new Date(b.data_realizacao_iso).getTime());
    }

    // Deduplicar por partida_id (priorizar a que veio do /ao-vivo)
    const jogosHojeUniq = Array.from(new Map(jogosHoje.map((j) => [j.partida_id, j])).values());

    // "Ao vivo" — só status=andamento
    const jogosAoVivoList = partidasAoVivo.filter(
      (p) => p.status?.toLowerCase() === 'andamento',
    );

    // "Odds por hora" — destaque: ao vivo + próximas do dia (até 6 cards)
    const oddsEmDestaque = [
      ...jogosAoVivoList,
      ...jogosHojeUniq
        .filter((j) => j.status?.toLowerCase() !== 'andamento')
        .filter((j) => new Date(j.data_realizacao_iso).getTime() >= Date.now() - 60 * 60 * 1000)
        .slice(0, 6 - jogosAoVivoList.length),
    ]
      .filter((j, idx, self) => idx === self.findIndex((x) => x.partida_id === j.partida_id))
      .slice(0, 6);

    // "Campeonatos Populares" — garantir estrutura válida
    const top3 = (tabela || []).slice(0, 3);
    const destaque = (tabela && tabela[0]) ?? null;
    const timeUsuario = (tabela && tabela.find((t) => t.time?.nome_popular === 'Flamengo')) ?? (tabela && tabela[0]) ?? null;

    const campeonatosPopulares: CampeonatoPopular[] = [
      {
        id: CAMPEONATO_PRINCIPAL_ID,
        nome: 'Brasileirão Série A',
        slug: 'brasileirao-serie-a',
        destaque: destaque ?? {
          posicao: 0,
          pontos: 0,
          jogos: 0,
          vitorias: 0,
          empates: 0,
          derrotas: 0,
          gols_pro: 0,
          gols_contra: 0,
          saldo_gols: 0,
          aproveitamento: 0,
          time: { time_id: 0, nome_popular: '—', sigla: '—', escudo: '' },
        },
        top3:
          top3.length > 0
            ? top3
            : [],
        timeUsuario,
      },
    ];

    return {
      props: {
        jogosHoje: jogosHojeUniq,
        jogosAoVivo: jogosAoVivoList,
        oddsEmDestaque,
        campeonatosPopulares,
        temJogosHoje: temJogosHojeReal,
        diaFormatado: new Date().toLocaleDateString('pt-BR', {
          weekday: 'long',
          day: '2-digit',
          month: 'long',
        }),
        atualizadoEm: new Date().toLocaleString('pt-BR'),
      },
    };
  } catch (error) {
    console.error('Erro geral no getServerSideProps da home:', error);
    return {
      props: {
        jogosHoje: [],
        jogosAoVivo: [],
        oddsEmDestaque: [],
        campeonatosPopulares: [],
        temJogosHoje: false,
      },
    };
  }
};