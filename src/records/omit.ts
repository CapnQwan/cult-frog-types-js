/**
 * A stricter version of the built-in `Omit` that only permits removing keys that
 * actually exist on `T`.
 *
 * The standard `Omit<T, K>` accepts *any* string for `K`, so a typo like
 * `Omit<User, "nmae">` silently compiles and removes nothing. By constraining
 * `K extends keyof T`, this type turns those mistakes into compile-time errors,
 * keeping your omissions honest as the underlying type evolves.
 *
 * @template T The object type to omit keys from.
 * @template K The keys of `T` to remove (must exist on `T`).
 *
 * @example
 * interface User {
 *   id: string;
 *   name: string;
 *   password: string;
 * }
 * type PublicUser = OmitStrict<User, "password">; // { id: string; name: string }
 * // type Broken = OmitStrict<User, "passwrd">; // compile error: not a key of User
 */
export type OmitStrict<T, K extends keyof T> = Omit<T, K>;
