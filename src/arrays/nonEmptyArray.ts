/**
 * An array that is guaranteed to contain at least one element.
 *
 * Encodes the "non-empty" invariant in the type system, so functions that
 * require at least one item (computing a maximum, picking a head element, etc.)
 * can accept a `NonEmptyArray<T>` and skip the empty-array check entirely — the
 * compiler proves it can never be `[]`.
 *
 * @template T The element type.
 *
 * @example
 * function first<T>(arr: NonEmptyArray<T>): T {
 *   return arr[0]; // safe: always present, no `undefined`
 * }
 * first([1, 2, 3]); // ok
 * // first([]);     // compile error: empty array not assignable
 */
export type NonEmptyArray<T> = [T, ...T[]];

/**
 * A `readonly` array that is guaranteed to contain at least one element.
 *
 * The immutable counterpart to {@link NonEmptyArray}. Prefer it for parameters:
 * a `readonly` tuple — including anything produced by `as const` — is *not*
 * assignable to the mutable `NonEmptyArray<T>`, so a function declared with the
 * mutable form will reject `["a", "b"] as const` at the call site.
 *
 * @template T The element type.
 *
 * @example
 * function first<T>(arr: ReadonlyNonEmptyArray<T>): T {
 *   return arr[0]; // safe: always present, no `undefined`
 * }
 *
 * const fruits = ["apple", "banana"] as const;
 * first(fruits); // ok — the mutable NonEmptyArray would reject this
 */
export type ReadonlyNonEmptyArray<T> = readonly [T, ...T[]];
