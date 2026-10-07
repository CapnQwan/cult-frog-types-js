/**
 * The parts of a number typed array (`Float32Array`, `Int32Array`, …) that
 * generic storage code needs, typed so methods like `subarray` return the
 * concrete array type `Self` rather than a widened view.
 *
 * Constrain a type parameter against itself — `T extends TypedArrayView<T>` —
 * to write one function that works for every number typed array while still
 * handing back the caller's exact type. `Uint8ClampedArray` fits; the bigint
 * arrays (`BigInt64Array`, `BigUint64Array`) do not, since their elements are
 * `bigint`.
 *
 * Indexing is typed as `number` so, under `noUncheckedIndexedAccess`, reads come
 * back as `number | undefined` just as they do on the built-in arrays.
 *
 * @template Self The concrete typed array type, returned by `subarray`,
 * `copyWithin` and `fill`.
 * @template B The backing buffer type. Defaults to `ArrayBufferLike`; narrow it
 * to `ArrayBuffer` or `SharedArrayBuffer` when the distinction matters.
 *
 * @example
 * function head<T extends TypedArrayView<T>>(array: T, count: number): T {
 *   return array.subarray(0, count);
 * }
 *
 * head(new Float32Array(8), 2); // Float32Array, not TypedArrayView<…>
 * // head(new BigInt64Array(8), 2); // compile error: elements are bigint
 */
export interface TypedArrayView<Self, B extends ArrayBufferLike = ArrayBufferLike> {
  [index: number]: number;
  readonly buffer: B;
  readonly byteOffset: number;
  readonly byteLength: number;
  readonly length: number;
  readonly BYTES_PER_ELEMENT: number;
  subarray(begin?: number, end?: number): Self;
  set(array: ArrayLike<number>, offset?: number): void;
  copyWithin(target: number, start: number, end?: number): Self;
  fill(value: number, start?: number, end?: number): Self;
}
