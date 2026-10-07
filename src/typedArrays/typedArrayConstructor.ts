import type { TypedArrayView } from './typedArrayView.js';

/**
 * A typed array constructor that builds a `T` over an existing buffer `B`.
 *
 * Pass the built-in constructors (`Float32Array`, `Uint16Array`, …) where this
 * is expected to let generic code allocate views of the caller's chosen element
 * type. A constructor whose instances don't match `T` is rejected, so an
 * `Int32Array` can't stand in for a `Float32Array`.
 *
 * Inference caveat: the built-in constructors are generic over their buffer with
 * a default of `ArrayBuffer`. When a generic function infers `T` from one of
 * them, TypeScript instantiates that default, so inference only lands on the
 * concrete array type for `ArrayBuffer`. For a `SharedArrayBuffer`, supply the
 * type arguments explicitly.
 *
 * @template T The typed array instance the constructor produces.
 * @template B The buffer type the constructor accepts. Defaults to
 * `ArrayBufferLike`.
 *
 * @example
 * function view<T extends TypedArrayView<T, B>, B extends ArrayBufferLike>(
 *   ctor: TypedArrayConstructor<T, B>,
 *   buffer: B,
 * ): T {
 *   return new ctor(buffer);
 * }
 *
 * view(Float32Array, new ArrayBuffer(16)); // Float32Array<ArrayBuffer>
 *
 * // SharedArrayBuffer: spell the types out rather than relying on inference.
 * view<Uint16Array<SharedArrayBuffer>, SharedArrayBuffer>(
 *   Uint16Array,
 *   new SharedArrayBuffer(16),
 * );
 */
export interface TypedArrayConstructor<
  T extends TypedArrayView<T, B>,
  B extends ArrayBufferLike = ArrayBufferLike,
> {
  readonly BYTES_PER_ELEMENT: number;
  new (buffer: B, byteOffset?: number, length?: number): T;
}
