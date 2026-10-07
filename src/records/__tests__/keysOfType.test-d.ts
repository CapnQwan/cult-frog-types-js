import { describe, expectTypeOf, it } from 'vitest';

import type { KeysOfType } from '../index.js';

describe('KeysOfType', () => {
  it('selects keys by value type', () => {
    interface M {
      id: number;
      name: string;
      email: string;
      isActive: boolean;
    }
    expectTypeOf<KeysOfType<M, string>>().toEqualTypeOf<'name' | 'email'>();
  });

  it('excludes union-valued keys that are not wholly assignable', () => {
    expectTypeOf<KeysOfType<{ a: string | number; b: string }, string>>().toEqualTypeOf<'b'>();
  });
});
