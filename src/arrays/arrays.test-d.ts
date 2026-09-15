import { describe, expectTypeOf, it } from 'vitest';

import type { ArrayElement, NonEmptyArray, ReadonlyNonEmptyArray } from './index.js';

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

describe('NonEmptyArray', () => {
  it('accepts a populated array and rejects an empty one', () => {
    const ok: NonEmptyArray<number> = [1, 2, 3];
    expectTypeOf(ok[0]).toEqualTypeOf<number>();
    // @ts-expect-error an empty array has no first element.
    const _bad: NonEmptyArray<number> = [];
  });

  it('indexes the head without undefined under noUncheckedIndexedAccess', () => {
    expectTypeOf<NonEmptyArray<string>[0]>().toEqualTypeOf<string>();
  });

  it('does not accept readonly arrays', () => {
    const frozen = ['a', 'b'] as const;
    // @ts-expect-error a readonly tuple is not assignable to the mutable form.
    const _bad: NonEmptyArray<string> = frozen;
  });
});

describe('ReadonlyNonEmptyArray', () => {
  it('accepts const arrays that the mutable form rejects', () => {
    const frozen = ['a', 'b'] as const;
    const ok: ReadonlyNonEmptyArray<string> = frozen;
    expectTypeOf(ok[0]).toEqualTypeOf<string>();
    // @ts-expect-error still rejects empty.
    const _bad: ReadonlyNonEmptyArray<string> = [] as const;
  });
});
