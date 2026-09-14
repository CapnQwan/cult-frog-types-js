/**
 * Resolves to `true` if `T` is the `never` type, otherwise `false`.
 *
 * `never` behaves specially in conditional types because it distributes over
 * unions, so a plain `T extends never` gives surprising results. Wrapping both
 * sides in a tuple (`[T] extends [never]`) disables that distribution and yields
 * a reliable check — useful for detecting empty unions, unreachable branches, or
 * exhaustiveness in type tests.
 *
 * @template T The type to test.
 *
 * @example
 * type A = IsNever<never>;          // true
 * type B = IsNever<string>;         // false
 * type C = IsNever<"a" & "b">;      // true (impossible intersection)
 *
 * // Assert a union member was fully handled:
 * type _check = Expect<IsNever<Exclude<"a", "a">>>;
 */
export type IsNever<T> = [T] extends [never] ? true : false;
