import type { Simplify } from './simplify.js';

/**
 * Makes the selected keys `K` of `T` required while leaving the rest unchanged.
 *
 * The counterpart to {@link SetOptional}. Where TypeScript's built-in
 * `Required<T>` makes *every* property required, this type lets you tighten only
 * the specific keys you name — useful for narrowing a broadly-optional type once
 * you know certain fields are guaranteed to be present.
 *
 * Uses `Omit` + `Required<Pick<…>>` rather than intersecting with `T`, and wraps
 * the result in {@link Simplify}, so what you get is a single flat object type
 * rather than an intersection that has to be unpicked in hover text and error
 * messages.
 *
 * Note the naming convention: `SetRequired` *transforms* a type, whereas
 * {@link RequiredKeys} *extracts* the names of the keys that are already
 * required.
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
 * type PersistedUser = SetRequired<User, "id">;
 */
export type SetRequired<T, K extends keyof T> = Simplify<Omit<T, K> & Required<Pick<T, K>>>;
