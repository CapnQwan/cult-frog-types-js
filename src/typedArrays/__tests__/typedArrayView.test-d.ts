import { describe, expectTypeOf, it } from 'vitest';

import type { TypedArrayView } from '../index.js';

type Fits<T extends TypedArrayView<T>> = T;

function head<T extends TypedArrayView<T>>(array: T, count: number): T {
  return array.subarray(0, count);
}

describe('TypedArrayView', () => {
  it('is satisfied by the number typed arrays', () => {
    expectTypeOf<Fits<Float32Array>>().toEqualTypeOf<Float32Array>();
    expectTypeOf<Fits<Float64Array>>().toEqualTypeOf<Float64Array>();
    expectTypeOf<Fits<Int8Array>>().toEqualTypeOf<Int8Array>();
    expectTypeOf<Fits<Int16Array>>().toEqualTypeOf<Int16Array>();
    expectTypeOf<Fits<Int32Array>>().toEqualTypeOf<Int32Array>();
    expectTypeOf<Fits<Uint8Array>>().toEqualTypeOf<Uint8Array>();
    expectTypeOf<Fits<Uint8ClampedArray>>().toEqualTypeOf<Uint8ClampedArray>();
    expectTypeOf<Fits<Uint16Array>>().toEqualTypeOf<Uint16Array>();
    expectTypeOf<Fits<Uint32Array>>().toEqualTypeOf<Uint32Array>();
  });

  it('rejects the bigint typed arrays', () => {
    // @ts-expect-error BigInt64Array elements are bigint, not number.
    type _Bad = Fits<BigInt64Array>;
    // @ts-expect-error BigUint64Array elements are bigint, not number.
    type _AlsoBad = Fits<BigUint64Array>;
  });

  it('returns the concrete array type from generic code', () => {
    expectTypeOf(head(new Float32Array(8), 2)).toEqualTypeOf<Float32Array<ArrayBuffer>>();
    expectTypeOf(head(new Uint8Array(8), 2)).toEqualTypeOf<Uint8Array<ArrayBuffer>>();
  });

  it('types the buffer by B', () => {
    expectTypeOf<TypedArrayView<Float32Array>['buffer']>().toEqualTypeOf<ArrayBufferLike>();
    expectTypeOf<
      TypedArrayView<Float32Array<SharedArrayBuffer>, SharedArrayBuffer>['buffer']
    >().toEqualTypeOf<SharedArrayBuffer>();
  });

  it('reads elements as possibly undefined under noUncheckedIndexedAccess', () => {
    const view: TypedArrayView<Float32Array> = new Float32Array(4);
    expectTypeOf(view[0]).toEqualTypeOf<number | undefined>();
  });
});
