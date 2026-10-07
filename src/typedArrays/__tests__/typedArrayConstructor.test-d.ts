import { describe, expectTypeOf, it } from 'vitest';

import type { TypedArrayConstructor, TypedArrayView } from '../index.js';

function view<T extends TypedArrayView<T>>(ctor: TypedArrayConstructor<T>, buffer: T['buffer']): T {
  return new ctor(buffer);
}

describe('TypedArrayConstructor', () => {
  it('accepts the built-in constructors for each buffer type', () => {
    const plain: TypedArrayConstructor<Float32Array<ArrayBuffer>, ArrayBuffer> = Float32Array;
    const shared: TypedArrayConstructor<
      Float32Array<SharedArrayBuffer>,
      SharedArrayBuffer
    > = Float32Array;
    const either: TypedArrayConstructor<Float32Array> = Float32Array;
  });

  it("defaults the buffer type to T's buffer", () => {
    expectTypeOf<TypedArrayConstructor<Float32Array<SharedArrayBuffer>>>().toEqualTypeOf<
      TypedArrayConstructor<Float32Array<SharedArrayBuffer>, SharedArrayBuffer>
    >();
    expectTypeOf<TypedArrayConstructor<Float32Array>>().toEqualTypeOf<
      TypedArrayConstructor<Float32Array, ArrayBufferLike>
    >();
  });

  it('rejects a constructor for a different element type', () => {
    // @ts-expect-error an Int32Array constructor does not produce a Float32Array.
    const _bad: TypedArrayConstructor<Float32Array<ArrayBuffer>, ArrayBuffer> = Int32Array;
  });

  it('rejects an instance type that is not a typed array', () => {
    // @ts-expect-error `Date` does not satisfy the TypedArrayView constraint.
    type _Bad = TypedArrayConstructor<Date, ArrayBuffer>;
  });

  it('infers the concrete array type over an ArrayBuffer', () => {
    expectTypeOf(view(Float32Array, new ArrayBuffer(16))).toEqualTypeOf<
      Float32Array<ArrayBuffer>
    >();
  });

  it('produces the concrete array type over a SharedArrayBuffer with an explicit type argument', () => {
    expectTypeOf(
      view<Uint16Array<SharedArrayBuffer>>(Uint16Array, new SharedArrayBuffer(16))
    ).toEqualTypeOf<Uint16Array<SharedArrayBuffer>>();
  });

  it('rejects a SharedArrayBuffer when the array type is left to inference', () => {
    // @ts-expect-error inference lands on Uint16Array<ArrayBuffer>, which needs an ArrayBuffer.
    view(Uint16Array, new SharedArrayBuffer(16));
  });

  it('rejects a buffer that does not match the named array type', () => {
    // @ts-expect-error a Uint16Array<SharedArrayBuffer> cannot be built over an ArrayBuffer.
    view<Uint16Array<SharedArrayBuffer>>(Uint16Array, new ArrayBuffer(16));
  });
});
