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

/**
 * Recursively removes the `readonly` modifier from every property of `T`,
 * producing a deeply mutable version of the type.
 *
 * The inverse of {@link DeepImmutable}, and the deep counterpart to
 * {@link Mutable}. Most useful for turning a deeply frozen value — anything
 * derived with `as const`, or a `DeepImmutable<T>` — back into a writable
 * working copy.
 *
 * As with `DeepImmutable`, function types are passed through untouched so their
 * call signatures survive.
 *
 * @template T The type to make deeply mutable.
 *
 * @example
 * const frozen = { a: { b: 1 } } as const;
 * type Draft = DeepMutable<typeof frozen>; // { a: { b: 1 } }
 * const draft: Draft = { a: { b: 1 } };
 * draft.a.b = 10; // ok: writable all the way down
 */
export type DeepMutable<T> = T extends (...args: never[]) => unknown
  ? T
  : T extends object
    ? {
        -readonly [K in keyof T]: T[K] extends object ? DeepMutable<T[K]> : T[K];
      }
    : T;
