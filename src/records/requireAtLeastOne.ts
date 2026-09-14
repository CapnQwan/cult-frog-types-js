/**
 * Requires that at least one of the keys `K` in `T` is provided, while keeping
 * them all individually optional.
 *
 * This models the common "you must supply one of these, but we don't care which"
 * constraint — for example an update payload that must change *something*, or a
 * config that accepts either an `id` or a `slug`. It expands to a union of
 * variants, each of which makes exactly one key required and the others optional.
 *
 * @template T The object type to transform.
 * @template K The set of keys among which at least one is required. Defaults to
 * all keys of `T`.
 *
 * @example
 * interface UpdatePayload {
 *   name?: string;
 *   email?: string;
 *   age?: number;
 * }
 * type Update = RequireAtLeastOne<UpdatePayload>;
 * const ok: Update = { name: "Ada" }; // valid: at least one key present
 * // const bad: Update = {};          // compile error: needs at least one key
 */
export type RequireAtLeastOne<T, K extends keyof T = keyof T> = K extends keyof T
  ? Required<Pick<T, K>> & Partial<Omit<T, K>>
  : never;
