import type { OptionalKeys } from './optionalKeys.js';

/**
 * Extracts the union of key names in `T` that are *not* declared optional.
 *
 * The exact complement of {@link OptionalKeys}, so the two always partition
 * `keyof T`. As with `OptionalKeys`, this reflects the `?` modifier rather than
 * the value type: a key declared `a: string | undefined` is required and appears
 * here, while `a?: string` does not.
 *
 * If you want to *make* keys required rather than list them, use
 * {@link SetRequired}.
 *
 * @template T The object type to inspect.
 *
 * @example
 * interface User {
 *   id: string;
 *   name?: string;
 *   email?: string;
 * }
 * type Req = RequiredKeys<User>; // "id"
 */
export type RequiredKeys<T> = Exclude<keyof T, OptionalKeys<T>>;
