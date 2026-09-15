import type { BrandKey, BrandMarker } from './symbol.js';

/**
 * Creates a *nominal* (branded) type by tagging a base type `T` with a unique
 * marker `B`.
 *
 * TypeScript is structurally typed, so two values with the same underlying shape
 * are interchangeable — a `UserId` that is really a `string` can be passed
 * anywhere a `string` is expected, and vice versa. Branding attaches a
 * compile-time-only marker so the compiler treats otherwise-identical types as
 * distinct, preventing bugs like mixing up a `UserId` with a `PostId`.
 *
 * The brand exists only in the type system; at runtime the value is just `T`, so
 * there is no wrapping or performance cost. You'll typically cast to a branded
 * type from a validated constructor.
 *
 * @template T The underlying runtime type (e.g. `string`, `number`).
 * @template B A unique string tag identifying the brand.
 *
 * @example
 * type UserId = Brand<string, "UserId">;
 * type PostId = Brand<string, "PostId">;
 *
 * const toUserId = (raw: string): UserId => raw as UserId;
 *
 * function getUser(id: UserId) {}
 * getUser(toUserId("abc")); // ok
 * // getUser("abc");        // compile error: string is not a UserId
 */
export type Brand<T, B extends string> = T & { readonly [K in BrandKey]: BrandMarker<T, B> };
