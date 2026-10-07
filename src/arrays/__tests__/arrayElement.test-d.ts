import { describe, expectTypeOf, it } from 'vitest';

import type { ArrayElement } from '../index.js';

describe('ArrayElement', () => {
  it('unwraps mutable, readonly and tuple types', () => {
    expectTypeOf<ArrayElement<number[]>>().toEqualTypeOf<number>();
    expectTypeOf<ArrayElement<readonly string[]>>().toEqualTypeOf<string>();
    expectTypeOf<ArrayElement<readonly ['a', 'b']>>().toEqualTypeOf<'a' | 'b'>();
  });

  it('derives a union from a const array', () => {
    const fruits = ['apple', 'banana', 'cherry'] as const;
    expectTypeOf<ArrayElement<typeof fruits>>().toEqualTypeOf<'apple' | 'banana' | 'cherry'>();
  });

  it('rejects non-array types instead of resolving to never', () => {
    // @ts-expect-error `string` does not satisfy the `readonly unknown[]` constraint.
    type _Bad = ArrayElement<string>;
  });
});
