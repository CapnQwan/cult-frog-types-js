import type { BrandKey, BrandMarker } from './symbol.js';

/**
 * A weaker, opt-in variant of {@link Brand}.
 *
 * Because the marker is *optional*, a plain `T` is still assignable to a
 * `Flavor<T, F>` (and vice versa), but two differently-flavored types are not
 * freely interchangeable. This gives you gentle, documentation-style nominal
 * hints without the friction of always constructing a fully branded value —
 * useful when you want guidance rather than hard enforcement.
 *
 * @template T The underlying runtime type.
 * @template F A unique string tag identifying the flavor.
 *
 * Because it shares a marker key with {@link Brand}, a `Brand<T, B>` is
 * assignable to a `Flavor<T, B>` — you can hand a fully branded value to an API
 * that only asks for the flavored form, but not the other way around.
 *
 * @example
 * type Meters = Flavor<number, "Meters">;
 * const distance: Meters = 5; // ok: plain numbers are still accepted
 *
 * type Feet = Flavor<number, "Feet">;
 * // const wrong: Feet = distance; // compile error: flavors don't mix
 */
export type Flavor<T, F extends string> = T & { readonly [K in BrandKey]?: BrandMarker<T, F> };
