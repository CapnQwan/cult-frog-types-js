/**
 * The compile-time-only marker key shared by {@link Brand} and {@link Flavor}.
 *
 * Both types tag their base type with this same `unique symbol`, which is what
 * makes a `Brand<T, B>` assignable to a `Flavor<T, B>`: the branded type carries
 * a required marker, the flavored type an optional one, so the stronger form
 * satisfies the weaker. Keeping the symbol in one module is what guarantees that
 * relationship — two separately declared `unique symbol`s would never match.
 *
 * It is never exported from the package root and has no runtime representation.
 */
declare const brand: unique symbol;

export type BrandKey = typeof brand;

/**
 * The phantom payload stored under {@link BrandKey}.
 *
 * It records the base type alongside the tag, which is what lets {@link Unbrand}
 * recover the base type. Inferring through an intersection member directly —
 * `T extends Base & Marker ? Base : T` — does not work: TypeScript cannot
 * reliably assign an inference candidate to a naked member of an intersection,
 * so such a conditional silently falls through to its false branch. Reading the
 * base type out of a *property* position is reliable.
 *
 * @template T The underlying runtime type.
 * @template B The tag identifying the brand or flavor.
 */
export interface BrandMarker<T, B extends string> {
  readonly base: T;
  readonly tag: B;
}
