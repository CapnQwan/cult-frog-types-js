/**
 * Resolves to `true` if `T` is the `any` type, otherwise `false`.
 *
 * `any` is contagious and silently disables type checking, so it's valuable to
 * be able to detect it — for guarding against accidental `any` leaks in type
 * tests, or for building conditional types that need to treat `any` specially.
 * The check relies on the quirk that `1 & any` collapses to `any`, so
 * `0 extends (1 & T)` only holds when `T` is `any`.
 *
 * @template T The type to test.
 *
 * @example
 * type A = IsAny<any>;     // true
 * type B = IsAny<unknown>; // false
 * type C = IsAny<string>;  // false
 *
 * // Assert a value is NOT any:
 * type _check = Expect<Equals<IsAny<string>, false>>;
 */
export type IsAny<T> = 0 extends 1 & T ? true : false;
