export const BRAZIL_TIME_ZONE = 'America/Sao_Paulo';

export interface MatchDateFields {
  data_realizacao_iso?: string | null;
  data_hora?: string | null;
  data_realizacao?: string | null;
  hora_realizacao?: string | null;
}

function parseProviderTimestamp(value?: string | null): Date | null {
  if (!value?.trim()) return null;

  const raw = value.trim();
  const localTimestamp = raw.match(/^(\d{4}-\d{2}-\d{2})[T ](\d{2}:\d{2})(?::\d{2})?$/);
  const normalized = localTimestamp ? `${localTimestamp[1]}T${localTimestamp[2]}:00-03:00` : raw;
  const parsed = new Date(normalized);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function parseProviderDateAndHour(dateValue?: string | null, hourValue?: string | null): Date | null {
  if (!dateValue?.trim()) return null;

  const rawDate = dateValue.trim();
  const brazilian = rawDate.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  const isoDate = rawDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const [, day, month, year] = brazilian ?? [];
  const [, isoYear, isoMonth, isoDay] = isoDate ?? [];
  if (!brazilian && !isoDate) return parseProviderTimestamp(rawDate);

  const dateParts = brazilian
    ? { year, month: month.padStart(2, '0'), day: day.padStart(2, '0') }
    : { year: isoYear, month: isoMonth, day: isoDay };
  const hour = hourValue?.trim().match(/^(\d{1,2}):(\d{2})/);
  const hours = hour ? hour[1].padStart(2, '0') : '00';
  const minutes = hour ? hour[2] : '00';
  const parsed = new Date(`${dateParts.year}-${dateParts.month}-${dateParts.day}T${hours}:${minutes}:00-03:00`);

  if (Number.isNaN(parsed.getTime())) return null;
  const check = new Intl.DateTimeFormat('en-CA', {
    timeZone: BRAZIL_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(parsed);
  const values = Object.fromEntries(check.map(({ type, value }) => [type, value]));
  if (values.year !== dateParts.year || values.month !== dateParts.month || values.day !== dateParts.day) return null;
  return parsed;
}

export function getMatchInstant(match: MatchDateFields): Date | null {
  for (const candidate of [match.data_realizacao_iso, match.data_hora]) {
    if (candidate?.trim() && /^\d{4}-\d{2}-\d{2}$/.test(candidate.trim())) continue;
    const parsed = parseProviderTimestamp(candidate);
    if (parsed) return parsed;
  }
  return (
    parseProviderDateAndHour(match.data_realizacao_iso, match.hora_realizacao)
    ?? parseProviderDateAndHour(match.data_realizacao, match.hora_realizacao)
  );
}

export function getSaoPauloDateKey(value: Date): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: BRAZIL_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(value);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}

export function formatMatchDateTime(match: MatchDateFields): string {
  const instant = getMatchInstant(match);
  if (!instant) return 'Data a definir';

  const parts = new Intl.DateTimeFormat('pt-BR', {
    timeZone: BRAZIL_TIME_ZONE,
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(instant);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.day}/${values.month}/${values.year} às ${values.hour}:${values.minute}`;
}
