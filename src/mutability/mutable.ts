/**
 * Removes the `readonly` modifier from every property of `T`, producing a
 * mutable (writable) version of the type.
 *
 * The inverse of `Readonly<T>`. It's most useful when building up an object
 * locally before exposing it as immutable, or when you need a writable working
 * copy of a type that was derived with `as const` or otherwise frozen.
 *
 * @template T The type to make mutable.
 *
 * @example
 * const frozen = { a: 1, b: 2 } as const; // { readonly a: 1; readonly b: 2 }
 * type Writable = Mutable<typeof frozen>; // { a: 1; b: 2 }
 * const draft: Writable = { a: 1, b: 2 };
 * draft.a = 10; // ok
 */
export type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};
