import { describe, expectTypeOf, it } from 'vitest';

import type { OmitStrict } from '../index.js';

interface User {
  id: string;
  name?: string;
  email?: string;
}

describe('OmitStrict', () => {
  it('removes a real key and rejects a typo', () => {
    expectTypeOf<OmitStrict<User, 'email'>>().toEqualTypeOf<{ id: string; name?: string }>();
    // @ts-expect-error "passwrd" is not a key of User.
    type _Bad = OmitStrict<User, 'passwrd'>;
  });
});
