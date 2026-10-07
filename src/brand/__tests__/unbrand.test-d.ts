import { describe, expectTypeOf, it } from 'vitest';

import type { Brand, Unbrand } from '../index.js';

type UserId = Brand<string, 'UserId'>;

describe('Unbrand', () => {
  it('strips the marker and passes unbranded types through', () => {
    expectTypeOf<Unbrand<UserId>>().toEqualTypeOf<string>();
    expectTypeOf<Unbrand<Brand<number, 'Count'>>>().toEqualTypeOf<number>();
    expectTypeOf<Unbrand<{ a: 1 }>>().toEqualTypeOf<{ a: 1 }>();
  });
});
