import { describe, expectTypeOf, it } from 'vitest';

import type { ValueOf } from '../index.js';

describe('ValueOf', () => {
  it('unions the value types', () => {
    const Roles = { admin: 'ADMIN', user: 'USER' } as const;
    expectTypeOf<ValueOf<typeof Roles>>().toEqualTypeOf<'ADMIN' | 'USER'>();
  });
});
