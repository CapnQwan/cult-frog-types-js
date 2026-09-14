/**
 * Resolves to `true` if types `A` and `B` are *exactly* equal, otherwise `false`.
 *
 * This is a type-level equality check for writing type tests. Unlike a naive
 * `A extends B ? ... : ...`, it distinguishes tricky cases such as `any` vs
 * `unknown` and readonly vs mutable, by comparing the two types through
 * identical generic function signatures. Pair it with {@link Expect} to assert
 * that a type behaves as intended.
 *
 * @template A The first type to compare.
 * @template B The second type to compare.
 *
 * @example
 * type T1 = Equals<{ a: number }, { a: number }>; // true
 * type T2 = Equals<string, number>;               // false
 * type T3 = Equals<any, unknown>;                  // false
 *
 * // As an assertion:
 * type _check = Expect<Equals<ReturnType<() => 1>, 1>>;
 */
export type Equals<A, B> =
  (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;
