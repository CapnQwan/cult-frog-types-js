import { describe, expectTypeOf, it } from 'vitest';

import type {
  ArrayElement,
  Awaitable,
  Brand,
  BrandOf,
  DeepImmutable,
  DeepMutable,
  Entries,
  Equals,
  Expect,
  Flavor,
  Immutable,
  IsAny,
  IsNever,
  Json,
  JsonArray,
  JsonObject,
  JsonPrimitive,
  KeysOfType,
  Listener,
  LooseAutocomplete,
  Mutable,
  NonEmptyArray,
  OmitStrict,
  OptionalKeys,
  ReadonlyNonEmptyArray,
  RequireAtLeastOne,
  RequiredKeys,
  Serializable,
  SetOptional,
  SetRequired,
  Simplify,
  TaggedUnion,
  Unbrand,
  Unsubscribe,
  ValueOf,
} from './index.js';

/**
 * Guards the package's public surface.
 *
 * Every type below must be reachable from the package root. Adding a type to a
 * folder without wiring it through that folder's barrel — or adding a folder
 * without wiring it into `src/index.ts` — leaves it unreachable for consumers,
 * since `exports` publishes no subpaths. This test turns that into a failure.
 */
describe('public API surface', () => {
  it('exports every type from the package root', () => {
    type Surface = [
      ArrayElement<string[]>,
      NonEmptyArray<1>,
      ReadonlyNonEmptyArray<1>,
      Brand<string, 'B'>,
      BrandOf<Brand<string, 'B'>>,
      Flavor<number, 'F'>,
      Unbrand<Brand<string, 'B'>>,
      Awaitable<1>,
      Listener<1>,
      Unsubscribe,
      Immutable<{ a: 1 }>,
      DeepImmutable<{ a: 1 }>,
      Mutable<{ a: 1 }>,
      DeepMutable<{ a: 1 }>,
      Entries<{ a: 1 }>,
      KeysOfType<{ a: 1 }, 1>,
      LooseAutocomplete<'a'>,
      OmitStrict<{ a: 1; b: 2 }, 'b'>,
      OptionalKeys<{ a?: 1 }>,
      RequiredKeys<{ a: 1 }>,
      SetOptional<{ a: 1 }, 'a'>,
      SetRequired<{ a?: 1 }, 'a'>,
      Simplify<{ a: 1 }>,
      RequireAtLeastOne<{ a?: 1; b?: 2 }>,
      ValueOf<{ a: 1 }>,
      Json,
      JsonArray,
      JsonObject,
      JsonPrimitive,
      Serializable<{ a: 1 }>,
      Equals<1, 1>,
      Expect<true>,
      IsAny<any>,
      IsNever<never>,
      TaggedUnion<'t'>,
    ];
    expectTypeOf<Surface['length']>().toEqualTypeOf<35>();
  });
});
