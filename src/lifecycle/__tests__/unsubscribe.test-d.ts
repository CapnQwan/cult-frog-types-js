import { describe, expectTypeOf, it } from 'vitest';

import type { Unsubscribe } from '../index.js';

describe('Unsubscribe', () => {
  it('is a zero-argument void callback', () => {
    const stop: Unsubscribe = () => {};
    expectTypeOf<Unsubscribe>().toEqualTypeOf<() => void>();
  });
});
