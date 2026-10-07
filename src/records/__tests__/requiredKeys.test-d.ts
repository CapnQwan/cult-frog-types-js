import { describe, expectTypeOf, it } from 'vitest';

import type { OptionalKeys, RequiredKeys } from '../index.js';

interface User {
  id: string;
  name?: string;
  email?: string;
}

describe('RequiredKeys', () => {
  it('extracts key names by the ? modifier, not the value type', () => {
    expectTypeOf<RequiredKeys<User>>().toEqualTypeOf<'id'>();
  });

  it('treats an explicitly-undefined-valued key as required', () => {
    interface Explicit {
      a: string | undefined;
      b?: string;
    }
    expectTypeOf<RequiredKeys<Explicit>>().toEqualTypeOf<'a'>();
  });

  it('partitions keyof T together with OptionalKeys', () => {
    expectTypeOf<OptionalKeys<User> | RequiredKeys<User>>().toEqualTypeOf<keyof User>();
  });
});
