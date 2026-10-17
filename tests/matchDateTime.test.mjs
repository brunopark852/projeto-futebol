import assert from 'node:assert/strict';
import test from 'node:test';
import { formatMatchDateTime, getSaoPauloDateKey } from '../lib/matchDateTime.ts';

test('formats UTC kickoff using the Brazilian match date and time', () => {
  assert.equal(
    formatMatchDateTime({ data_realizacao_iso: '2026-10-18T01:30:00Z' }),
    '17/10/2026 às 22:30',
  );
});

test('builds a kickoff instant from provider date and hour when ISO is absent', () => {
  assert.equal(
    formatMatchDateTime({ data_realizacao: '17/10/2026', hora_realizacao: '16:30' }),
    '17/10/2026 às 16:30',
  );
});

test('uses provider hour when the ISO field contains only a calendar date', () => {
  assert.equal(
    formatMatchDateTime({ data_realizacao_iso: '2026-10-17', hora_realizacao: '16:30' }),
    '17/10/2026 às 16:30',
  );
});

test('derives today in Sao Paulo even when UTC has crossed midnight', () => {
  assert.equal(getSaoPauloDateKey(new Date('2026-10-18T01:30:00Z')), '2026-10-17');
});

test('uses an explicit empty-date label for malformed provider values', () => {
  assert.equal(formatMatchDateTime({ data_realizacao_iso: 'not-a-date' }), 'Data a definir');
});
