/**
 * Makes the selected keys `K` of `T` optional while leaving the rest unchanged.
 *
 * TypeScript's built-in `Partial<T>` makes *every* property optional. This type
 * lets you loosen only the specific keys you name, which is ideal for shapes
 * where some fields have defaults or are filled in later.
 *
 * @template T The object type to transform.
 * @template K The keys of `T` to make optional.
 *
 * @example
 * interface Config {
 *   host: string;
 *   port: number;
 *   timeout: number;
 * }
 * // `port` and `timeout` are optional; `host` stays required.
 * type PartialConfig = OptionalKeys<Config, "port" | "timeout">;
 */
export type OptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
