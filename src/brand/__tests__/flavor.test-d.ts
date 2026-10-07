import { describe, expectTypeOf, it } from 'vitest';

import type { Brand, Flavor } from '../index.js';

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
