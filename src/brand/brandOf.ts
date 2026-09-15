import type { BrandKey, BrandMarker } from './symbol.js';

/**
 * Extracts the brand tag string from a {@link Brand}.
 *
 * Resolves to `never` when `T` is not branded, which can be used to detect
 * whether a type carries a brand.
 *
 * @template T The branded type to inspect.
 *
 * @example
 * type UserId = Brand<string, "UserId">;
 * type Tag = BrandOf<UserId>; // "UserId"
 */
export type BrandOf<T> = T extends { readonly [K in BrandKey]: BrandMarker<unknown, infer B> }
  ? B
  : never;
