/**
 * Extracts the union of key names in `T` that are declared optional (`?`).
 *
 * The test works by asking whether the empty object `{}` satisfies a one-key
 * slice of `T`: that only holds when the key may be absent, which is exactly
 * what "optional" means. Note that this is about the `?` modifier, not the value
 * type — a key declared `a: string | undefined` is *required* and will not be
 * included, while `a?: string` will.
 *
 * Pairs with {@link RequiredKeys}, which returns the complement. If you want to
 * *make* keys optional rather than list them, use {@link SetOptional}.
 *
 * @template T The object type to inspect.
 *
 * @example
 * interface User {
 *   id: string;
 *   name?: string;
 *   email?: string;
 * }
 * type Opt = OptionalKeys<User>; // "name" | "email"
 */
export type OptionalKeys<T> = {
  // biome-ignore lint/complexity/noBannedTypes: `{} extends Pick<T, K>` is the canonical test for the `?` modifier and `Record<string, never>` does not behave the same way.
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];
