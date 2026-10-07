import { describe, expectTypeOf, it } from 'vitest';

import type { SetRequired } from '../index.js';

interface User {
  id: string;
  name?: string;
  email?: string;
}

describe('SetRequired', () => {
  it('tightens only the named keys', () => {
    const ok: SetRequired<User, 'name'> = { id: 'x', name: 'n' };
    // @ts-expect-error `name` is now required.
    const _bad: SetRequired<User, 'name'> = { id: 'x' };
  });

  it('produces a flat object rather than an intersection', () => {
    expectTypeOf<SetRequired<User, 'name'>>().toEqualTypeOf<{
      id: string;
      name: string;
      email?: string;
    }>();
  });
});
