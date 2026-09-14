/**
 * Builds a single member of a discriminated (tagged) union: an object with a
 * literal `type` discriminant and an optional `payload`.
 *
 * Discriminated unions are the idiomatic way to model "one of several shapes" in
 * TypeScript. Each variant shares a common `type` field that the compiler uses to
 * narrow the union inside `switch`/`if` blocks, giving you exhaustive,
 * type-safe handling. Compose several `TaggedUnion` members with `|` to form the
 * full union.
 *
 * When `P` is left as `undefined` the variant has no `payload` field at all;
 * otherwise `payload` is required and typed as `P`.
 *
 * @template T The string literal that discriminates this variant.
 * @template P The payload type carried by this variant. Omit for a payload-less
 * variant.
 *
 * @example
 * type Result =
 *   | TaggedUnion<"success", { value: number }>
 *   | TaggedUnion<"failure", { error: Error }>
 *   | TaggedUnion<"loading">; // no payload
 *
 * function handle(r: Result) {
 *   switch (r.type) {
 *     case "success": return r.payload.value; // narrowed
 *     case "failure": throw r.payload.error;
 *     case "loading": return null;
 *   }
 * }
 */
export type TaggedUnion<T extends string, P = undefined> = P extends undefined
  ? { readonly type: T }
  : { readonly type: T; readonly payload: P };
