/**
 * Makes the selected keys `K` of `T` required while leaving the rest unchanged.
 *
 * The counterpart to {@link OptionalKeys}. Where TypeScript's built-in
 * `Required<T>` makes *every* property required, this type lets you tighten only
 * the specific keys you name — useful for narrowing a broadly-optional type once
 * you know certain fields are guaranteed to be present.
 *
 * @template T The object type to transform.
 * @template K The keys of `T` to make required.
 *
 * @example
 * interface User {
 *   id?: string;
 *   name?: string;
 *   email?: string;
 * }
 * // `id` is now required; `name` and `email` stay optional.
 * type PersistedUser = RequiredKeys<User, "id">;
 */
export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;
