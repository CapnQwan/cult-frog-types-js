import type { Simplify } from '../records/simplify.js';

/**
 * Builds a single member of a discriminated (tagged) union: an object with a
 * literal discriminant and an optional `payload`.
 *
 * Discriminated unions are the idiomatic way to model "one of several shapes" in
 * TypeScript. Each variant shares a common discriminant field that the compiler
 * uses to narrow the union inside `switch`/`if` blocks, giving you exhaustive,
 * type-safe handling. Compose several `TaggedUnion` members with `|` to form the
 * full union.
 *
 * When `P` is left as `undefined` the variant has no `payload` field at all;
 * otherwise `payload` is required and typed as `P`. The `[P] extends [undefined]`
 * form is deliberate: a naked `P extends undefined` would distribute, splitting a
 * union payload into several variants and collapsing a `never` payload to `never`.
 *
 * The discriminant key defaults to `"type"` but can be changed via `D` for
 * codebases that prefer `kind`, `_tag`, or similar.
 *
 * The result is wrapped in {@link Simplify} so each variant displays as a single
 * object literal in hover text and error messages rather than as an intersection.
 * Note that `never` is assignable to `undefined`, so a `never` payload yields the
 * payload-less variant rather than collapsing the whole member to `never`.
 *
 * @template T The string literal that discriminates this variant.
 * @template P The payload type carried by this variant. Omit for a payload-less
 * variant.
 * @template D The name of the discriminant property. Defaults to `"type"`.
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
 *
 * @example
 * // A union payload stays one variant rather than splitting in two:
 * type Evt = TaggedUnion<"change", { a: 1 } | { b: 2 }>;
 * //   => { readonly type: "change"; readonly payload: { a: 1 } | { b: 2 } }
 *
 * @example
 * // A different discriminant key:
 * type Action = TaggedUnion<"reset", undefined, "kind">; // { readonly kind: "reset" }
 */
export type TaggedUnion<T extends string, P = undefined, D extends string = 'type'> = [P] extends [
  undefined,
]
  ? Simplify<{ readonly [K in D]: T }>
  : Simplify<{ readonly [K in D]: T } & { readonly payload: P }>;
