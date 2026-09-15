/**
 * Any value that is valid JSON.
 *
 * This is a recursive type covering the full JSON grammar: the primitives
 * (`null`, `boolean`, `number`, `string`), arrays of JSON, and objects whose
 * values are themselves JSON. Use it to constrain data that must be safe to pass
 * through `JSON.stringify`/`JSON.parse` without loss — for example API payloads,
 * cache entries, or persisted config.
 *
 * @example
 * const payload: Json = {
 *   id: 1,
 *   tags: ["a", "b"],
 *   meta: { active: true, note: null },
 * };
 * // const bad: Json = { fn: () => {} }; // compile error: functions aren't JSON
 */
export type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

/**
 * A JSON value that is specifically an object (a key/value map of {@link Json}).
 *
 * A convenience alias for the common case where you want to accept a JSON object
 * but not a bare primitive or array — such as a settings blob or a record of
 * fields.
 *
 * @example
 * function merge(base: JsonObject, patch: JsonObject): JsonObject {
 *   return { ...base, ...patch };
 * }
 */
export type JsonObject = { [key: string]: Json };

/**
 * A JSON value that is specifically an array of {@link Json}.
 *
 * The array counterpart to {@link JsonObject}, for the cases where a payload
 * must be a list rather than a map or a bare primitive.
 *
 * @example
 * const rows: JsonArray = [{ id: 1 }, { id: 2 }];
 */
export type JsonArray = Json[];

/**
 * Any JSON value that is not a container — `null`, `boolean`, `number` or
 * `string`.
 *
 * Useful as a constraint for leaf values, such as query-string parameters or
 * flat key/value metadata where nesting is not allowed.
 *
 * @example
 * type Meta = Record<string, JsonPrimitive>;
 */
export type JsonPrimitive = null | boolean | number | string;
