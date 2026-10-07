import { describe, expectTypeOf, it } from 'vitest';

import type { Equals } from '../index.js';

describe('Equals', () => {
  it('distinguishes identical from differing types', () => {
    expectTypeOf<Equals<{ a: number }, { a: number }>>().toEqualTypeOf<true>();
    expectTypeOf<Equals<string, number>>().toEqualTypeOf<false>();
  });

  it('distinguishes any from unknown, and readonly from mutable', () => {
    expectTypeOf<Equals<any, unknown>>().toEqualTypeOf<false>();
    expectTypeOf<Equals<readonly string[], string[]>>().toEqualTypeOf<false>();
  });
});
