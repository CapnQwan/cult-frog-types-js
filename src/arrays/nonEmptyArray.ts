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
