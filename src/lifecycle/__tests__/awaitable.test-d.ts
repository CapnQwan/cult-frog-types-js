import { describe, expectTypeOf, it } from 'vitest';

import type { Awaitable } from '../index.js';

describe('Awaitable', () => {
  it('accepts both sync values and promises', () => {
    const sync: Awaitable<number> = 1;
    const async: Awaitable<number> = Promise.resolve(1);
    expectTypeOf<Awaitable<number>>().toEqualTypeOf<number | PromiseLike<number>>();
  });

  it('awaits to the resolved type either way', async () => {
    const load = (): Awaitable<string> => 'x';
    expectTypeOf(await load()).toEqualTypeOf<string>();
  });
});
