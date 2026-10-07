import { describe, expectTypeOf, it } from 'vitest';

import type { Listener } from '../index.js';

describe('Listener', () => {
  it('is a one-argument void callback', () => {
    const onMessage: Listener<string> = (msg) => {
      expectTypeOf(msg).toEqualTypeOf<string>();
    };
    expectTypeOf<Listener<string>>().toEqualTypeOf<(payload: string) => void>();
  });
});
