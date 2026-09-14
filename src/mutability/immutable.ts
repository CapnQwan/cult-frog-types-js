/**
 * Recursively marks every property of `T` as `readonly`, producing a deeply
 * immutable version of the type.
 *
 * Unlike the built-in `Readonly<T>`, which only freezes the top level, this type
 * descends into nested objects so the entire structure is protected from
 * mutation at compile time. Reach for it when modelling frozen configuration,
 * state snapshots, or any value that must not change after creation.
 *
 * @template T The type to make deeply immutable.
 *
 * @example
 * interface State {
 *   user: { name: string; roles: string[] };
 * }
 * const state: Immutable<State> = getState();
 * // state.user.name = "x"; // compile error: readonly all the way down
 */
export type Immutable<T> = {
  readonly [K in keyof T]: T[K] extends object ? Immutable<T[K]> : T[K];
};
