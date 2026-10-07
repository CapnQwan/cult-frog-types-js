import { describe, expectTypeOf, it } from 'vitest';

import type { NonEmptyArray, ReadonlyNonEmptyArray } from '../index.js';

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
