/**
 * Extracts the union of keys from `T` whose values are assignable to `V`.
 *
 * Useful for selecting a subset of properties by their value type — for example
 * finding every string field on a model, or every method on a class. Keys whose
 * value type does not match `V` are filtered out (mapped to `never` and dropped).
 *
 * Two caveats follow from using `extends`: a property typed `any` matches every
 * `V` (so `KeysOfType<{ a: any }, string>` includes `"a"`), and a property typed
 * as a union only matches when the *whole* union is assignable to `V` (so
 * `KeysOfType<{ a: string | number }, string>` excludes `"a"`).
 *
 * @template T The object type to inspect.
 * @template V The value type to match against.
 *
 * @example
 * interface User {
 *   id: number;
 *   name: string;
 *   email: string;
 *   isActive: boolean;
 * }
 * type StringKeys = KeysOfType<User, string>; // "name" | "email"
 */
export type KeysOfType<T, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T];
