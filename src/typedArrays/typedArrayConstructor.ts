import type { TypedArrayView } from './typedArrayView.js';

/**
 * A typed array constructor that builds a `T` over an existing buffer `B`.
 *
 * Pass the built-in constructors (`Float32Array`, `Uint16Array`, …) where this
 * is expected to let generic code allocate views of the caller's chosen element
 * type. A constructor whose instances don't match `T` is rejected, so an
 * `Int32Array` can't stand in for a `Float32Array`.
 *
 * `B` defaults to `T`'s own buffer type, so generic code needs only one type
 * parameter: take the constructor as `TypedArrayConstructor<T>` and the buffer
 * as `T['buffer']`.
 *
 * Inference caveat: the built-in constructors are generic over their buffer with
 * a default of `ArrayBuffer`. When a generic function infers `T` from one of
 * them, TypeScript instantiates that default, so `T` is always inferred over an
 * `ArrayBuffer`. With the pattern above, passing any other buffer is a compile
 * error rather than a silently wrong type. For a `SharedArrayBuffer` (or an
 * `ArrayBufferLike`), name the array type explicitly.
 *
 * @template T The typed array instance the constructor produces.
 * @template B The buffer type the constructor accepts. Defaults to
 * `T['buffer']`.
 *
 * @example
 * function view<T extends TypedArrayView<T>>(
 *   ctor: TypedArrayConstructor<T>,
 *   buffer: T['buffer'],
 * ): T {
 *   return new ctor(buffer);
 * }
 *
 * view(Float32Array, new ArrayBuffer(16)); // Float32Array<ArrayBuffer>
 *
 * // SharedArrayBuffer: name the array type rather than relying on inference.
 * view<Uint16Array<SharedArrayBuffer>>(Uint16Array, new SharedArrayBuffer(16));
 * // view(Uint16Array, new SharedArrayBuffer(16)); // compile error
 */
export interface TypedArrayConstructor<
  T extends TypedArrayView<T, B>,
  B extends ArrayBufferLike = T['buffer'],
> {
  readonly BYTES_PER_ELEMENT: number;
  new (buffer: B, byteOffset?: number, length?: number): T;
}
