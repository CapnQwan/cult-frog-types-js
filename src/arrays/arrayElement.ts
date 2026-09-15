/**
 * Extracts the element type from an array or tuple type `T`.
 *
 * Saves you from writing `T[number]` by hand and works with both mutable and
 * `readonly` arrays. Combined with `typeof`, it's a clean way to derive a union
 * from a `const` array without duplicating the values.
 *
 * `T` is constrained to an array type so that passing a non-array is a compile
 * error rather than resolving silently to `never`.
 *
 * @template T The array (or `readonly` array) type to unwrap.
 *
 * @example
 * const fruits = ["apple", "banana", "cherry"] as const;
 * type Fruit = ArrayElement<typeof fruits>; // "apple" | "banana" | "cherry"
 *
 * type N = ArrayElement<number[]>; // number
 * // type Bad = ArrayElement<string>; // compile error: not an array type
 */
export type ArrayElement<T extends readonly unknown[]> = T[number];
