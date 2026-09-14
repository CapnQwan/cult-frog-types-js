/**
 * A strongly-typed representation of the array returned by `Object.entries` for
 * an object of type `T`.
 *
 * `Object.entries` is typed by the standard library as `[string, any][]`, which
 * throws away the relationship between each key and its value. `Entries<T>`
 * preserves it, producing a union of `[key, value]` tuples so you can iterate
 * over entries without losing type information.
 *
 * @template T The object type whose entries are being described.
 *
 * @example
 * interface User {
 *   id: number;
 *   name: string;
 * }
 * type UserEntries = Entries<User>; // ([ "id", number ] | [ "name", string ])[]
 *
 * // Handy as a typed cast for Object.entries:
 * const entries = Object.entries(user) as Entries<User>;
 */
export type Entries<T> = { [K in keyof T]-?: [K, T[K]] }[keyof T][];
