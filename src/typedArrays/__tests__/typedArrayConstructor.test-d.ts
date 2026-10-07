import { describe, expectTypeOf, it } from 'vitest';

import type { TypedArrayConstructor, TypedArrayView } from '../index.js';

function view<T extends TypedArrayView<T, B>, B extends ArrayBufferLike>(
  ctor: TypedArrayConstructor<T, B>,
  buffer: B
): T {
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

  it('produces the concrete array type over a SharedArrayBuffer with explicit type arguments', () => {
    expectTypeOf(
      view<Uint16Array<SharedArrayBuffer>, SharedArrayBuffer>(
        Uint16Array,
        new SharedArrayBuffer(16)
      )
    ).toEqualTypeOf<Uint16Array<SharedArrayBuffer>>();
  });
});
