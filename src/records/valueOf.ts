/**
 * Extracts the union of all value types from an object type `T`.
 *
 * This is the value-side counterpart to `keyof`. Where `keyof T` gives you the
 * union of keys, `ValueOf<T>` gives you the union of the corresponding values.
 * It's especially handy for deriving a value type from a `const` object instead
 * of maintaining a separate, hand-written union that can drift out of sync.
 *
 * @template T The object type to read values from.
 *
 * @example
 * const Roles = { admin: "ADMIN", user: "USER" } as const;
 * type Role = ValueOf<typeof Roles>; // "ADMIN" | "USER"
 */
export type ValueOf<T> = T[keyof T];
