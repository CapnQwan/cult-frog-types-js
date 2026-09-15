import type { Simplify } from './simplify.js';

/**
 * Makes the selected keys `K` of `T` optional while leaving the rest unchanged.
 *
 * TypeScript's built-in `Partial<T>` makes *every* property optional. This type
 * lets you loosen only the specific keys you name, which is ideal for shapes
 * where some fields have defaults or are filled in later.
 *
 * Note the naming convention: `SetOptional` *transforms* a type, whereas
 * {@link OptionalKeys} *extracts* the names of the keys that are already
 * optional.
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
 * type PartialConfig = SetOptional<Config, "port" | "timeout">;
 */
export type SetOptional<T, K extends keyof T> = Simplify<Omit<T, K> & Partial<Pick<T, K>>>;
