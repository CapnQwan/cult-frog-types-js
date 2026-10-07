import { describe, it } from 'vitest';

import type { Equals, Expect } from '../index.js';

describe('Expect', () => {
  it('accepts true and rejects false', () => {
    type _Pass = Expect<Equals<1 & 2, never>>;
    // @ts-expect-error `false` is not assignable to the `true` constraint.
    type _Fail = Expect<Equals<string, number>>;
  });
});
