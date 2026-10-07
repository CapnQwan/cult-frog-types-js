import { describe, expectTypeOf, it } from 'vitest';

import type { Brand, BrandOf } from '../index.js';

type UserId = Brand<string, 'UserId'>;

describe('BrandOf', () => {
  it('extracts the tag and resolves to never when unbranded', () => {
    expectTypeOf<BrandOf<UserId>>().toEqualTypeOf<'UserId'>();
    expectTypeOf<BrandOf<string>>().toEqualTypeOf<never>();
  });
});
