import { describe, expectTypeOf, it } from 'vitest';

import type { IsAny } from '../index.js';

describe('IsAny', () => {
  it('detects any and nothing else', () => {
    expectTypeOf<IsAny<any>>().toEqualTypeOf<true>();
    expectTypeOf<IsAny<unknown>>().toEqualTypeOf<false>();
    expectTypeOf<IsAny<never>>().toEqualTypeOf<false>();
    expectTypeOf<IsAny<string>>().toEqualTypeOf<false>();
  });
});
