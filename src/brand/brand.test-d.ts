import { describe, expectTypeOf, it } from 'vitest';

import type { Brand, BrandOf, Flavor, Unbrand } from './index.js';

type UserId = Brand<string, 'UserId'>;
type PostId = Brand<string, 'PostId'>;

describe('Brand', () => {
  it('keeps distinct brands over the same base type apart', () => {
    const id = 'abc' as UserId;
    // @ts-expect-error a UserId is not a PostId despite both being strings.
    const _bad: PostId = id;
    // @ts-expect-error a plain string is not a UserId.
    const _alsoBad: UserId = 'abc';
  });

  it('still behaves as its base type', () => {
    const id = 'abc' as UserId;
    expectTypeOf(id.toUpperCase()).toEqualTypeOf<string>();
    expectTypeOf<UserId>().toExtend<string>();
  });
});

describe('BrandOf', () => {
  it('extracts the tag and resolves to never when unbranded', () => {
    expectTypeOf<BrandOf<UserId>>().toEqualTypeOf<'UserId'>();
    expectTypeOf<BrandOf<string>>().toEqualTypeOf<never>();
  });
});

describe('Unbrand', () => {
  it('strips the marker and passes unbranded types through', () => {
    expectTypeOf<Unbrand<UserId>>().toEqualTypeOf<string>();
    expectTypeOf<Unbrand<Brand<number, 'Count'>>>().toEqualTypeOf<number>();
    expectTypeOf<Unbrand<{ a: 1 }>>().toEqualTypeOf<{ a: 1 }>();
  });
});

describe('Flavor', () => {
  type Meters = Flavor<number, 'Meters'>;
  type Feet = Flavor<number, 'Feet'>;

  it('accepts plain values but keeps flavors apart', () => {
    const distance: Meters = 5;
    // @ts-expect-error differently-flavored types do not mix.
    const _bad: Feet = distance;
  });

  it('accepts a matching Brand, since both share one marker key', () => {
    const branded = 5 as Brand<number, 'Meters'>;
    const ok: Meters = branded;
    expectTypeOf(ok).toExtend<number>();
  });

  it('does not accept a Brand with a different tag', () => {
    const branded = 5 as Brand<number, 'Feet'>;
    // @ts-expect-error the brand tag must match the flavor tag.
    const _bad: Meters = branded;
  });
});
