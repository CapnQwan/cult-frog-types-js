import type { Brand } from './brand.js';

/**
 * Recovers the underlying base type from a {@link Brand}, stripping the marker.
 *
 * If `T` is not branded it is returned unchanged, so this is safe to apply
 * generically.
 *
 * @template T The (possibly branded) type to unwrap.
 *
 * @example
 * type UserId = Brand<string, "UserId">;
 * type Raw = Unbrand<UserId>; // string
 */
export type Unbrand<T> = T extends Brand<infer U, string> ? U : T;
