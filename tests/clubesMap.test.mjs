import assert from 'node:assert/strict';
import test from 'node:test';
import { getEscudoClube } from '../lib/data/clubesMap.ts';

test('uses local club crests for official football-data aliases', () => {
  assert.equal(getEscudoClube('Botafogo FR'), '/escudos/botafogo.png');
  assert.equal(getEscudoClube('Chapecoense AF'), '/escudos/chapecoense.png');
  assert.equal(getEscudoClube('CA Mineiro'), '/escudos/atletico-mg.png');
  assert.equal(getEscudoClube('Coritiba FBC'), '/escudos/coritiba.png');
});
