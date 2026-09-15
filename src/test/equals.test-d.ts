import { describe, expectTypeOf, it } from 'vitest';

import type { Equals, Expect, IsAny, IsNever } from './index.js';

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

describe('Expect', () => {
  it('accepts true and rejects false', () => {
    type _Pass = Expect<Equals<1 & 2, never>>;
    // @ts-expect-error `false` is not assignable to the `true` constraint.
    type _Fail = Expect<Equals<string, number>>;
  });
});

describe('IsAny', () => {
  it('detects any and nothing else', () => {
    expectTypeOf<IsAny<any>>().toEqualTypeOf<true>();
    expectTypeOf<IsAny<unknown>>().toEqualTypeOf<false>();
    expectTypeOf<IsAny<never>>().toEqualTypeOf<false>();
    expectTypeOf<IsAny<string>>().toEqualTypeOf<false>();
  });
});

describe('IsNever', () => {
  it('detects never without distributing over unions', () => {
    expectTypeOf<IsNever<never>>().toEqualTypeOf<true>();
    expectTypeOf<IsNever<'a' & 'b'>>().toEqualTypeOf<true>();
    expectTypeOf<IsNever<string>>().toEqualTypeOf<false>();
    expectTypeOf<IsNever<string | never>>().toEqualTypeOf<false>();
  });
});
