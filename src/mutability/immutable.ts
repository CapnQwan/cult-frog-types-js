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
 * // state.user.name = "x"; // compile error at the top level only
 */
export type Immutable<T> = {
  readonly [K in keyof T]: T[K];
};

/**
 * Recursively marks every property of `T` as `readonly`, producing a deeply
 * immutable version of the type.
 *
 * Unlike {@link Immutable} (and the built-in `Readonly<T>`), which only freeze
 * the top level, this type descends into nested objects so the entire structure
 * is protected from mutation at compile time. Reach for it when modelling frozen
 * configuration, state snapshots, or any value that must not change after
 * creation.
 *
 * Function types are passed through untouched: mapping over a function would
 * strip its call signature and leave an uncallable object. Class instances with
 * mutating methods (`Date`, `Map`, `Set`) are still descended into, so their
 * methods survive as `readonly` properties and can continue to mutate the value
 * — deep immutability here is about property assignment, not method calls.
 *
 * @template T The type to make deeply immutable.
 *
 * @example
 * interface State {
 *   user: { name: string; roles: string[] };
 * }
 * const state: DeepImmutable<State> = getState();
 * // state.user.name = "x";     // compile error: readonly all the way down
 * // state.user.roles.push("x"); // compile error: readonly array
 */
export type DeepImmutable<T> = T extends (...args: never[]) => unknown
  ? T
  : T extends object
    ? {
        readonly [K in keyof T]: T[K] extends object ? DeepImmutable<T[K]> : T[K];
      }
    : T;
