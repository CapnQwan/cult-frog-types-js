import { describe, expectTypeOf, it } from 'vitest';

import type { IsNever } from '../index.js';

describe('IsNever', () => {
  it('detects never without distributing over unions', () => {
    expectTypeOf<IsNever<never>>().toEqualTypeOf<true>();
    expectTypeOf<IsNever<'a' & 'b'>>().toEqualTypeOf<true>();
    expectTypeOf<IsNever<string>>().toEqualTypeOf<false>();
    expectTypeOf<IsNever<string | never>>().toEqualTypeOf<false>();
  });
});
