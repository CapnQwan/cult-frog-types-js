import { describe, expectTypeOf, it } from 'vitest';

import type { OptionalKeys } from '../index.js';

interface User {
  id: string;
  name?: string;
  email?: string;
}

describe('OptionalKeys', () => {
  it('extracts key names by the ? modifier, not the value type', () => {
    expectTypeOf<OptionalKeys<User>>().toEqualTypeOf<'name' | 'email'>();
  });

  it('does not treat an explicitly-undefined-valued key as optional', () => {
    interface Explicit {
      a: string | undefined;
      b?: string;
    }
    expectTypeOf<OptionalKeys<Explicit>>().toEqualTypeOf<'b'>();
  });
});
