import type { Json } from './json.js';

/**
 * Resolves the JSON shape that `T` becomes once it is serialized.
 *
 * Mirrors how `JSON.stringify` treats a value: if `T` is already valid
 * {@link Json} it is returned unchanged; if `T` defines a `toJSON()` method its
 * return type is used instead (matching the runtime behaviour where
 * `JSON.stringify` calls `toJSON`); otherwise the type resolves to `never` to
 * flag that the value cannot be serialized safely.
 *
 * This lets you type the *result* of serialization accurately — for instance a
 * `Date` serializes to the `string` produced by its `toJSON`.
 *
 * @template T The value type being serialized.
 *
 * @example
 * type A = Serializable<{ id: number }>; // { id: number }
 * type B = Serializable<Date>;           // string (Date#toJSON returns string)
 * type C = Serializable<() => void>;     // never (not serializable)
 */
export type Serializable<T> = T extends Json ? T : T extends { toJSON(): infer R } ? R : never;
