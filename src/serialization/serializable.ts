/**
 * Resolves the JSON shape that `T` becomes once it is serialized.
 *
 * Mirrors how `JSON.stringify` actually treats a value, recursively:
 *
 * - a type with a `toJSON()` method resolves to that method's return type,
 *   serialized in turn (so `Date` becomes `string`);
 * - `undefined`, functions and symbols are dropped from objects and become
 *   `null` inside arrays, matching the runtime;
 * - arrays and tuples map element-wise, objects map property-wise, and keys
 *   whose values disappear entirely are removed rather than left `undefined`;
 * - anything with no JSON representation at the top level resolves to `never`.
 *
 * The `toJSON` check comes first because it takes precedence at runtime, and the
 * whole type recurses, so nested `Date`s and nested non-serializable fields are
 * handled rather than collapsing the entire result to `never`.
 *
 * Note that a `T extends Json` shortcut is deliberately *not* used: an
 * `interface` has no implicit index signature and therefore never satisfies the
 * `Json` type, so testing against it would resolve every interface — including
 * plainly serializable ones — to `never`.
 *
 * @template T The value type being serialized.
 *
 * @example
 * interface User { id: number; createdAt: Date }
 * type A = Serializable<User>;            // { id: number; createdAt: string }
 * type B = Serializable<Date>;            // string
 * type C = Serializable<() => void>;      // never
 * type D = Serializable<{ a: 1; fn: () => void }>; // { a: 1 }
 */
export type Serializable<T> = T extends { toJSON(): infer R }
  ? Serializable<R>
  : T extends string | number | boolean | null
    ? T
    : T extends undefined | ((...args: never[]) => unknown) | symbol
      ? never
      : T extends readonly (infer _E)[]
        ? { [I in keyof T]: SerializableElement<T[I]> }
        : T extends object
          ? SerializableObject<T>
          : never;

/**
 * Serializes one array element, mapping non-serializable slots to `null` the way
 * `JSON.stringify` does inside arrays (rather than dropping them, which would
 * change the array's length).
 *
 * @template T The element type.
 */
type SerializableElement<T> = [Serializable<T>] extends [never] ? null : Serializable<T>;

/**
 * Serializes an object type, dropping keys whose values have no JSON
 * representation and making every surviving key optional if it was optional
 * before.
 *
 * @template T The object type.
 */
type SerializableObject<T> = {
  [K in keyof T as [Serializable<T[K]>] extends [never] ? never : K]: Serializable<T[K]>;
};
