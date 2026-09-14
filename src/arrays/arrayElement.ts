/**
 * Extracts the element type from an array or tuple type `T`.
 *
 * Saves you from writing `T[number]` by hand and works with both mutable and
 * `readonly` arrays. Combined with `typeof`, it's a clean way to derive a union
 * from a `const` array without duplicating the values.
 *
 * @template T The array (or `readonly` array) type to unwrap.
 *
 * @example
 * const fruits = ["apple", "banana", "cherry"] as const;
 * type Fruit = ArrayElement<typeof fruits>; // "apple" | "banana" | "cherry"
 *
 * type N = ArrayElement<number[]>; // number
 */
export type ArrayElement<T> = T extends readonly (infer U)[] ? U : never;
