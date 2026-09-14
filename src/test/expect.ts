/**
 * A compile-time assertion that its argument type is exactly `true`.
 *
 * Because the parameter is constrained to `extends true`, passing a type that
 * resolves to `false` (or `boolean`) is a compile error. This turns type-level
 * checks into tests that fail your build when an assumption breaks — the
 * foundation of type testing when combined with {@link Equals}, {@link IsAny},
 * {@link IsNever}, and friends.
 *
 * @template T A boolean type that must be `true` for the assertion to pass.
 *
 * @example
 * type _pass = Expect<Equals<1 & 2, never>>; // ok
 * // type _fail = Expect<Equals<string, number>>; // compile error
 */
export type Expect<T extends true> = T;
