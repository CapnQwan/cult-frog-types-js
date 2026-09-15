/**
 * Flattens a type into a single object literal, collapsing intersections and
 * resolving aliases.
 *
 * Purely cosmetic — `Simplify<T>` is always assignable to and from `T` — but the
 * difference in developer experience is large. Types built by intersecting
 * `Omit`, `Pick` and `Partial` display in hover text and error messages as the
 * raw expression (`Omit<User, "name"> & Required<Pick<User, "name">>`) rather
 * than as the object they describe. Mapping over the keys forces the compiler to
 * evaluate the intersection eagerly and print the result.
 *
 * The `& {}` is what triggers that eager evaluation; without it the mapped type
 * can still be displayed lazily.
 *
 * @template T The type to flatten.
 *
 * @example
 * type Raw = Omit<{ a: 1; b: 2 }, "b"> & { b: 3 };
 * //   => Omit<{ a: 1; b: 2 }, "b"> & { b: 3 }
 * type Nice = Simplify<Raw>;
 * //   => { a: 1; b: 3 }
 */
export type Simplify<T> = { [K in keyof T]: T[K] } & {};
