import { describe, expectTypeOf, it } from 'vitest';

import type { Simplify } from '../index.js';

describe('Simplify', () => {
  it('flattens an intersection into one object literal', () => {
    type Raw = Omit<{ a: 1; b: 2 }, 'b'> & { b: 3 };
    expectTypeOf<Simplify<Raw>>().toEqualTypeOf<{ a: 1; b: 3 }>();
  });

  it('preserves optionality', () => {
    expectTypeOf<Simplify<{ a: string; b?: number }>>().toEqualTypeOf<{
      a: string;
      b?: number;
    }>();
  });
});
