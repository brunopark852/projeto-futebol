import assert from 'node:assert/strict';
import test from 'node:test';
import nextConfig from '../next.config.ts';

test('allows the official football-data crest host through Next Image', () => {
  const allowed = nextConfig.images?.remotePatterns?.some(
    (pattern) => pattern.protocol === 'https' && pattern.hostname === 'crests.football-data.org' && pattern.pathname === '/**',
  );
  assert.equal(allowed, true, 'crests.football-data.org must be allowed by images.remotePatterns');
});
