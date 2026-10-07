import { describe, expectTypeOf, it } from 'vitest';

import type { Entries } from '../index.js';

describe('Entries', () => {
  it('preserves the key/value pairing', () => {
    expectTypeOf<Entries<{ id: number; name: string }>>().toEqualTypeOf<
      (['id', number] | ['name', string])[]
    >();
  });

  it('stringifies numeric keys to match Object.entries at runtime', () => {
    expectTypeOf<Entries<{ 1: string }>>().toEqualTypeOf<['1', string][]>();
  });
});
